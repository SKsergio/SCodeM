import { ref, computed } from 'vue';
import { httPost } from '@/services/api';
import { decodeJwt } from '@/utils/jwt';
import type { LoginRequest, LoginResponse, JwtPayload, AuthUser } from '@/interfaces/Auth/LoginInterface';
import { userTenantSummaryDTO } from '@/interfaces/templates/TenantInterface';
import { GetAllRecords } from '@/services/Catalogues/GenericServices';

// ============================================================================
// 1. ESTADO GLOBAL REACTIVO (SINGLETON)
// ============================================================================
const token = ref<string | null>(localStorage.getItem('auth_token'));
const globalIdentity = ref<any | null>(JSON.parse(localStorage.getItem('auth_user') || 'null'));
const role = ref<string | null>(null);
const permissions = ref<string[]>([]);
const tenantId = ref<number | null>(null);

// Hidratar estado en memoria desde el JWT al cargar la página por primera vez
if (token.value) {
    const claims = decodeJwt<JwtPayload>(token.value);
    if (claims) {
        role.value = claims.role;
        permissions.value = claims.permissions;
        tenantId.value = claims.tenantId;
    }
}

export const useAuth = () => {

    // ============================================================================
    // MUTACIONES (Acciones que modifican el estado)
    // ============================================================================

    const login = async (credentials: LoginRequest): Promise<boolean> => {
        try {
            const response = await httPost<LoginRequest, LoginResponse>('auth/login', credentials);

            if (response.token) {
                const claims = decodeJwt<JwtPayload>(response.token);
                if (!claims) throw new Error("Payload de JWT inválido");

                // 1. Actualizar estado reactivo
                token.value = response.token;
                globalIdentity.value = response.user;
                role.value = claims.role;
                permissions.value = claims.permissions;
                tenantId.value = claims.tenantId;

                // 2. Persistencia en disco
                localStorage.setItem('auth_token', response.token);
                localStorage.setItem('auth_user', JSON.stringify(response.user));
                localStorage.setItem('must_change_password', String(response.firstLogin));

                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error;
        }
    };

    const switchTenant = async (targetTenantId: number): Promise<boolean> => {
        // Ya estamos en ese tenant: no tiene sentido pegarle al backend de nuevo.
        if (targetTenantId === tenantId.value) {
            return true;
        }

        try {
            const payload = { targetTenantId };
            const response = await httPost<{ targetTenantId: number }, LoginResponse>('auth/switch-tenant', payload);

            if (response.token) {
                const decoded = decodeJwt<JwtPayload>(response.token);
                if (!decoded) throw new Error("Payload de JWT inválido");

                // Actualizamos la persistencia del token
                localStorage.setItem('auth_token', response.token);

                // (Esta recarga volverá a ejecutar el bloque superior que hidrata los refs)
                window.location.href = '/';
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al cambiar de tenant:", error);
            throw error;
        }
    };

    const logout = () => {
        // Limpiar estado reactivo
        token.value = null;
        globalIdentity.value = null;
        role.value = null;
        permissions.value = [];
        tenantId.value = null;

        // Limpiar persistencia
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('must_change_password');

        window.location.href = '/login';
    };

    // ============================================================================
    // GETTERS (Lecturas del estado reactivo)
    // ============================================================================

    const isAuthenticated = computed<boolean>(() => {
        if (!token.value) return false;
        const claims = decodeJwt<JwtPayload>(token.value);
        if (!claims) return false;
        return claims.exp * 1000 > Date.now();
    });

    const currentUser = computed<AuthUser | null>(() => {
        if (!globalIdentity.value || !role.value) return null;

        return {
            ...globalIdentity.value,
            role: role.value,
            permissions: permissions.value,
            tenantId: tenantId.value
        } as AuthUser;
    });

    const hasPermission = (permissionCode: string): boolean => {
        return permissions.value.includes(permissionCode);
    };

    const hasRole = (roleCode: string): boolean => {
        return role.value === roleCode;
    };

    const getTenantByUser = async (): Promise<userTenantSummaryDTO[]> => {
        try {
            const urlFinal:string = "auth/me/tenants"
            const records = await GetAllRecords<userTenantSummaryDTO>(urlFinal);
            return records;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        }
    }

    return {
        login,
        logout,
        switchTenant,

        isAuthenticated,
        currentUser,
        hasPermission,
        hasRole,
        getTenantByUser,
        currentTenantId: computed(() => tenantId.value)
    };
};