import { httPost } from '@/services/api';
import type { LoginRequest, LoginResponse, AuthUser } from '@/interfaces/Auth/LoginInterface'; 

export const useAuth = () => {
    
    const login = async (credentials: LoginRequest): Promise<boolean> => {
        try {
            // Mandamos el email y password, esperamos el token y el user
            const response = await httPost<LoginRequest, LoginResponse>('auth/login', credentials);
            
            if (response.token) {

                // token
                localStorage.setItem(
                    'auth_token',
                    response.token
                );

                // usuario
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
        window.location.href = '/login';
    };

    const isAuthenticated = (): boolean => {
        return !!localStorage.getItem('auth_token');
    };

    // Función extra de regalo: para obtener el usuario actual en cualquier componente
    const getCurrentUser = (): AuthUser | null => {
        const userStr = localStorage.getItem('auth_user');
        if (userStr) {
            return JSON.parse(userStr) as AuthUser;
        }
        return null;
    };

    return { login, logout, isAuthenticated, getCurrentUser };
};