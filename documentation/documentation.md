# SCodeM (Notesystem) — Documentación General

## 1. ¿Qué es el sistema?

**Notesystem (SCodeM)** es un sistema de gestión académica / notas para instituciones educativas, con soporte **multi-tenant** (varias instituciones pueden usar la misma plataforma de forma aislada, identificadas por `tenantId` dentro del token de autenticación).

Permite administrar el ciclo académico completo: maestros, estudiantes, encargados (padres/tutores), grados/secciones/aulas, materias, periodos, cursos, matrículas y evaluaciones (notas).

Es una aplicación **SPA (Single Page Application)** hecha en **Vue 3 + TypeScript**, que consume una API REST externa (backend en `http://127.0.0.1:8080/api/` en desarrollo).

## 2. Módulos actuales

La navegación vive bajo `/dashboard` (protegido por login) y se organiza así (ver [src/router/index.ts](../src/router/index.ts)):

- **Auth**
  - Login (`/login`)
  - Cambio de contraseña obligatorio en primer login (`/change-password`)
- **General**
  - Home / Dashboard (`/dashboard/home`)
  - Perfil de usuario
- **Administración**
  - Tipos de archivo (`type_file`)
  - Maestros / Teachers (`teachers`)
- **Estudiantes**
  - Estudiantes (`students`)
  - Encargados / Managers (`managers`)
  - Ficha completa de encargado (`managerFull`)
- **Grados (degrees)**
  - Grados (`degrees`)
  - Secciones (`section`)
  - Matrícula por grado / Enrollment (`enrollment`)
  - Detalle específico de grado (`degreeDetail`)
  - Aulas / Classrooms (`classroom`)
  - Materias / Subjects (`subject`)
- **Cursos (courses)**
  - Periodos (`periods`)
  - Inscripción a cursos (`registrationCourses`)
  - Cursos (`courses`)
- **Evaluaciones (evaluations)**
  - Evaluaciones / notas (`evaluations`)

Cada módulo sigue, en general, el mismo patrón de pantallas: una **vista principal** (listado + filtros + paginación), un **modal de crear/editar**, y a veces un **modal de detalle**.

## 3. Arquitectura técnica

### Stack principal
- **Vue 3** (Composition API, `<script setup>`) + **TypeScript**
- **Vite** como bundler/dev server
- **Vue Router 4** con guards de autenticación
- **Pinia** para estado global (uso puntual, no todo pasa por store)
- **ky** como cliente HTTP (wrapper sobre `fetch`)
- **vue-i18n** para internacionalización (`src/locals/es.json`, `en.json`)
- **sweetalert2** para alertas/confirmaciones
- **@vueform/multiselect**, **@vuepic/vue-datepicker**, **@headlessui/vue**, **vue-awesome-paginate** como librerías de UI
- **unplugin-icons** (set `ri` de Iconify) para iconos

### Estructura de carpetas (`src/`)
```
components/     -> componentes reutilizables (botones, inputs, modales, tablas, loaders, alerts...)
composables/    -> lógica de negocio por módulo (useTeachers, useStudent, useAuth, etc.)
services/       -> llamadas HTTP crudas (genéricas + específicas)
store/          -> stores de Pinia (Modal, Theme, CatalogueStore, RecordCatalog)
interfaces/     -> tipados TS de requests/responses por módulo
enum/           -> enumeraciones (estados, género, tipo de encargado...)
utils/          -> helpers (fechas, JWT, FormData, menú)
error/          -> manejo/normalización de errores
views/          -> páginas, organizadas por módulo (Auth/, Users/<modulo>/<submodulo>/)
router/         -> definición de rutas y guard de autenticación
```

### Autenticación y multi-tenant

- Login (`useAuth().login`) llama a `auth/login`, recibe un **JWT** y datos de usuario.
- Se guardan en `localStorage`: `auth_token` (fuente de verdad de rol/permisos/tenant), `auth_user` (identidad básica: id/email) y `must_change_password`.
- El JWT se decodifica con [src/utils/jwt.ts](../src/utils/jwt.ts) y sus claims (`role`, `permissions`, `tenantId`, `exp`) se leen "al vuelo" en vez de duplicarse en el store, para evitar desincronización.
- [src/composables/useAuth.ts](../src/composables/useAuth.ts) expone: `login`, `logout`, `isAuthenticated`, `getCurrentUser`, `hasPermission`, `hasRole`.
- El **router guard** (`router.beforeEach` en [src/router/index.ts](../src/router/index.ts)) protege rutas con `meta.requiresAuth` / `meta.requiresGuest`, validando expiración del token.
- El cliente HTTP ([src/services/api.ts](../src/services/api.ts)) inyecta automáticamente el `Bearer token` en cada request y, si el backend responde `401`, limpia sesión y redirige a `/login`.

### Capa de llamadas a la API

Hay dos niveles:

1. **`src/services/api.ts`** — wrapper base sobre `ky` con funciones genéricas por verbo HTTP:
   - `httpGet<T>(endpoint)`
   - `httPost<TReq, TRes>(endpoint, data)`
   - `httpPut<TReq, TRes>(endpoint, data)`
   - `httpPatch<TReq, TRes>(endpoint, data)`
   - `httpDelete(endpoint)`
   
   Todas manejan errores HTTP normalizando la respuesta de error del backend, y soportan `FormData` (para módulos que suben archivos, como fotos de maestros/estudiantes).

2. **`src/services/Catalogues/GenericServices.ts`** — capa CRUD genérica construida sobre la anterior, reutilizada por casi todos los módulos:
   - `GetRecords<T>(url, params)` → paginado (`PaginateResponse<T>`)
   - `GetAllRecords<T>(url, params)` → listado completo (para selects)
   - `GetOneRecord<T>(url, id)`
   - `SaveRecord<T>(data, url)`
   - `PutRecord<TReq, TRes>(id, data, url)`
   - `PatchRecord<TReq, TRes>(id, data, url)`
   - `DeleteRecords(id, url)`

   Los filtros/paginación se serializan como query params automáticamente (omitiendo `null`/`undefined`/`''`).

Algunos módulos con necesidades particulares tienen su propio servicio dedicado (ej. `src/services/Students/StudentManagerService.ts`).

### Patrón de trabajo por módulo (composables)

Cada módulo define un **composable** en `src/composables/` (ej. `useTeachers.ts`, `useStudent.ts`, `useEvaluations.ts`) que encapsula todo su estado y lógica:

- Estado reactivo: `records`, `loading`, `error`
- Paginación vía `usePagination()` (composable reutilizable con `page`, `size`, `totalElements`, `changePage`, `changeSize`)
- Acciones CRUD: `fetchAll`, `createRecord`, `updateRecord`, `deleteRecord`, `getDetail`, `getOntetoEdit` (datos para el modal de edición), `getSelects` (listado simple para combos)
- Un `watch` sobre `page`/`size` para refrescar automáticamente al paginar

Los composables usan las interfaces TS del módulo correspondiente en `src/interfaces/<Modulo>/` (Request, Response, EditResponse, TableRow, SimpleResponse, etc.) para tipar entradas y salidas.

### Patrón de trabajo por vista

Cada vista principal (`views/Users/<area>/<modulo>/<Modulo>View.vue`) sigue esta estructura:

1. Instancia el composable del módulo (ej. `useTeachers()`).
2. Lo provee a sus hijos vía `provide('xContext', state)` (evita prop-drilling con el listado/tabla y el modal).
3. Contiene:
   - `HeaderComponent` (título + botón "agregar", controlado por permisos/rol)
   - Un componente `slideX.vue` propio del módulo, que renderiza filtros + paginación + `TableGridComponent`
   - Un modal `modalCrearEditar.vue` propio del módulo para alta/edición
   - Loader (`Load2Component`) mientras `loading` es `true`
4. Maneja `handleCreate`, `handleEdit`, `handleDelete` (este último con confirmación vía `ShowDeleteAlert`, basado en SweetAlert2).

Este patrón se repite casi idéntico en todos los módulos (Teachers, Students, Managers, Courses, Periods, Evaluations, etc.), lo que facilita crear un módulo nuevo copiando la estructura de uno existente.

### Componentes reutilizables clave (`src/components/`)

- **`templates/TableGridComponent.vue`** — tabla genérica y tipada (`generic="T"`), recibe `columns` (definición de columnas) y `rows`, permite personalizar celdas por slot (`#cell-<key>`). Muestra estado vacío ("NO HAY REGISTROS").
- **`templates/HeaderComponent.vue`** / **`HeaderDetailComponent.vue`** — cabecera de vista con título y botón de acción.
- **`templates/FilterWrapper.vue`** + **`generics/FilterComponent.vue`** / **`FiltersComponent.vue`** — panel de filtros colapsable, configurable por módulo mediante `FilterConfig[]` (soporta `search`, `date`, `select` dinámicamente vía `component :is`).
- **`generics/PaginacionComponent.vue`** — paginación reutilizable, controlada por el composable `usePagination`.
- **`modals/BaseModalComponent.vue`**, **`CreateModalComponent.vue`**, **`ModalProfileComponent.vue`** — bases de modal reutilizadas por los `modalCrearEditar.vue` de cada módulo.
- **`buttons/*`** — set de botones estandarizados (Add, Save, Update, Delete, Cancel, Filter, Search, Clean).
- **`inputs/*`** — inputs reutilizables (texto genérico, DUI con máscara, imagen).
- **`loaders/Load1Component.vue` / `Load2Component.vue`** — spinners de carga.
- **`alerts/*`** — helpers sobre SweetAlert2 para confirmaciones y notificaciones (`ShowDeleteAlert`, `ErrorAlert`, `InfoAlert`, `successAlert`, etc.), desacoplados de componentes Vue (funciones `.ts` puras).

### Estado global (Pinia)

- **`store/Theme.ts`** — tema visual (claro/oscuro).
- **`store/CreateModel.ts`** (`useModalStore`) — visibilidad genérica de modal de creación.
- **`store/CatalogueStore.ts`** — store genérico parametrizable por `id` y `endpoint`, usado por `FiltersComponent` para filtrar catálogos sin duplicar lógica.
- **`store/RecordCatalog.ts`** — manejo de catálogos/records auxiliares.

La mayoría del estado de negocio, sin embargo, vive en los **composables** (no en Pinia), reservando Pinia para estado transversal (tema, modales genéricos, catálogos compartidos).

### Utilidades (`src/utils/`)

- `jwt.ts` — decodificación de JWT sin librerías externas.
- `buildFormData.ts` — convierte objetos/DTOs a `FormData` (necesario para requests con archivos).
- `FormatDates.ts` — formateo de fechas para la UI.
- `MetaDataProcess.ts`, `Menu.ts` — construcción de menú lateral según rol/permisos.

## 4. Convenciones de trabajo

- Un módulo nuevo típicamente requiere: **interface** (`interfaces/<Modulo>/`) → **service** si necesita algo custom (si no, reutiliza `GenericServices.ts`) → **composable** (`composables/use<Modulo>.ts`) → **vista** + **slide** + **modal** en `views/Users/<area>/<modulo>/`.
- Los endpoints del backend siguen el patrón `core/<recurso>`, con variantes `/all` (listado simple) y `/edit` (payload para edición) además del CRUD estándar.
- Los permisos/roles se validan en el frontend con `useAuth().hasRole` / `hasPermission`, pero la autorización real se hace en el backend (el frontend solo oculta/muestra UI).
- Multi-tenant: el `tenantId` viaja dentro del JWT y el backend filtra los datos por tenant; el frontend no maneja lógica adicional de tenant más allá de leer el claim si se necesita mostrar info institucional.
