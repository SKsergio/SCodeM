# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SCodeM ("notesystem"): a multi-tenant academic management / grades SPA in Vue 3 (`<script setup>`) + TypeScript + Vite. It consumes an external REST backend (Spring) at `http://127.0.0.1:8080/api/`. That URL is hardcoded in `src/services/api.ts`; it is not read from `.env`. Code comments, UI text and commit messages are in Spanish. Extended project documentation (in Spanish) is in `documentation/documentation.md`.

## Commands

- `npm run dev`: Vite dev server on port 3000, opens the browser. The README says `npm run serve`, but that script does not exist.
- `npm run build`: production build.
- `npm run preview`: serve the built output.
- Type-check: `npx vue-tsc --noEmit`. `vue-tsc` is not in devDependencies, so npx fetches it. Vite itself does not type-check.

There is no test suite and no linter configured.

## Architecture

The data flow is layered, and each layer is reused across every module:

1. **`src/services/api.ts`**: a `ky` instance with the generic verb functions `httpGet`, `httPost` (spelled with one `t`), `httpPut`, `httpPatch` and `httpDelete`.
   - It injects the `Bearer` token from `localStorage.auth_token`.
   - On a 401 it clears the session and redirects to `/login`.
   - It sends `FormData` as the body and everything else as JSON.
   - On an `HTTPError` it throws the backend's parsed JSON error body, not the `HTTPError` itself.
2. **`src/services/Catalogues/GenericServices.ts`**: the generic CRUD functions `GetRecords` (paginated `PaginateResponse<T>`), `GetAllRecords` (plain list for selects), `GetOneRecord`, `SaveRecord`, `PutRecord`, `PatchRecord` and `DeleteRecords`. Params become query strings, and null, undefined and `''` values are dropped. Only special cases get their own service, for example `services/Students/StudentManagerService.ts`.
3. **`src/composables/use<Module>.ts`**: holds a module's business state. The rest of the app follows the same shape:
   - It sets an `endpoint` constant, usually `core/<resource>` (periods use `catalogue/periods`).
   - It exposes `records`, `loading` and `error`, plus `usePagination()`.
   - It provides `fetchAll`, `createRecord`, `updateRecord` (PATCH), `deleteRecord`, `getDetail`, `getOntetoEdit` (GET `<endpoint>/edit/:id`, the payload for the edit modal) and `getSelects` (GET `<endpoint>/all`).
   - Mutations re-run `fetchAll()`, and a watcher on page/size refetches.
4. **Views**: `src/views/Users/<area>/<module>/`.
   - The main `<Module>View.vue` creates the composable and `provide`s it to its children as context.
   - It renders `HeaderComponent`, a module-specific `components/slide<Module>.vue` (filters, `TableGridComponent` and pagination) and `components/modalCrearEditar.vue` (create/edit). Some modules also have a `modalDetail*.vue`.
   - Delete confirmation uses the SweetAlert2 helpers in `src/components/alerts/`. These are plain `.ts` functions, not components.

To add a module, copy an existing one end to end:
- the interfaces in `src/interfaces/<Module>/` (Request / Response / EditResponse / SimpleResponse ...)
- the composable
- the view, slide and modal
- the route in `src/router/index.ts`
- the menu entry in `src/utils/Menu.ts`
- i18n keys in `src/locals/es.json` and `src/locals/en.json`

### Cross-cutting

- **Auth**: `useAuth` stores `auth_token`, `auth_user` and `must_change_password` in localStorage.
  - Role, permissions, `tenantId` and `exp` are always decoded from the JWT on the fly (`utils/jwt.ts`) and never copied into a store.
  - `router.beforeEach` enforces `meta.requiresAuth` / `meta.requiresGuest`, and token expiry.
  - `hasRole` and `hasPermission` only show or hide UI. Authorization is enforced by the backend.
- **Multi-tenant**: the `tenantId` lives in the JWT and the backend filters by it. The frontend has no tenant logic of its own.
- **Errors**: use `getErrorMessage` (`src/error/getError.ts`) to turn backend error bodies (`erroresEspecificos`, `mensaje`, `message`, `errorDetail`) into display text.
- **State**: Pinia is only for cross-cutting state: theme, the generic create modal (`useModalStore`), and `CatalogueStore`, a store parametrized by id and endpoint that `FiltersComponent` uses. Business state stays in the composables.
- **Filters**: built from `FilterConfig[]` (search / date / select) through `FilterWrapper` + `FiltersComponent`, which render each filter with a dynamic `component :is`.
- **Table**: `TableGridComponent` is generic (`generic="T"`). It takes `columns` and `rows`, and per-cell slots named `#cell-<key>`.
- **Icons**: `unplugin-icons` with the Iconify `ri` set, imported as `~icons/ri/...`. `autoInstall` is on.
- **Path alias**: `@/` maps to `src/`.
- **Global CSS**: lives in `src/css/` and is imported in `main.ts`. The tooltip directive `v-tooltip` is registered globally.
