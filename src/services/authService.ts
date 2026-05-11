import { httPost } from './api'; // Asegúrate de que la ruta coincida

export const useAuth = () => {
    
    const login = async (credentials: any) => {
        try {
            const response = await httPost<any, any>('auth/login', credentials);
            
            const token = response.token; 
            
            if (token) {
                localStorage.setItem('auth_token', token);
                return true;
            }
            return false;
        } catch (error) {
            console.error("Error en login:", error);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_token');
        window.location.href = '/login';
    };

    const isAuthenticated = () => {
        return !!localStorage.getItem('auth_token');
    };

    return { login, logout, isAuthenticated };
};