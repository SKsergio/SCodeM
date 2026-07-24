import { httPost } from '@/services/api';
import { decodeJwt } from '@/utils/jwt';
import type { LoginRequest, LoginResponse, JwtPayload, AuthUser } from '@/interfaces/Auth/LoginInterface';

export const useAuth = () => {

    const login = async (credentials: LoginRequest): Promise<boolean> => {
        try {
            // Mandamos el email y password, esperamos el token y el user
            const response = await httPost<LoginRequest, LoginResponse>('auth/login', credentials);

            if (response.token) {

                // token (fuente de verdad para rol/permisos/tenant)
                localStorage.setItem(
                    'auth_token',
                    response.token
                );

                // identidad global (solo id/email, tal como la manda el backend)
                localStorage.setItem(
                    'auth_user',
                    JSON.stringify(response.user)
                );

                // primer login
                localStorage.setItem(
                    'must_change_password',
                    String(response.firstLogin)
                );

                return true;
            }
            return false;
        } catch (error) {
            console.error("Error al iniciar sesión:", error);
            throw error; // Lo lanzamos para que el formulario muestre el error
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
        localStorage.removeItem('must_change_password');
        window.location.href = '/login';
    };

    // Claims vigentes del token (rol, permisos, tenant). Se leen directo del JWT
    // para que nunca queden desincronizados de lo que el backend realmente firmó.
    const getTokenClaims = (): JwtPayload | null => {
        const token = localStorage.getItem('auth_token');
        if (!token) return null;
        return decodeJwt<JwtPayload>(token);
    };

    const isAuthenticated = (): boolean => {
        const claims = getTokenClaims();
        if (!claims) return false;
        return claims.exp * 1000 > Date.now();
    };

    // Usuario actual = identidad global (id/email) + claims del token (role/permissions/tenantId)
    const getCurrentUser = (): AuthUser | null => {
        const userStr = localStorage.getItem('auth_user');
        const claims = getTokenClaims();
        if (!userStr || !claims) return null;

        const globalUser = JSON.parse(userStr);

        return {
            ...globalUser,
            role: claims.role,
            permissions: claims.permissions,
            tenantId: claims.tenantId
        };
    };

    const hasPermission = (permission: string): boolean => {
        const claims = getTokenClaims();
        return !!claims?.permissions.includes(permission);
    };

    const hasRole = (role: string): boolean => {
        const claims = getTokenClaims();
        return claims?.role === role;
    };

    return { login, logout, isAuthenticated, getCurrentUser, hasPermission, hasRole };
};
