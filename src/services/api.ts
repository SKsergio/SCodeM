import ky, { HTTPError } from "ky";

const api = ky.create({
    prefixUrl: 'http://127.0.0.1:8080/api/',
    hooks: {
        beforeRequest: [
            request => {
                const token = localStorage.getItem('auth_token');
                if (token) {
                    request.headers.set('Authorization', `Bearer ${token}`);
                }
            }
        ],
        afterResponse: [
            (_request, _options, response) => {
                if (response.status === 401) {
                    localStorage.removeItem('auth_token');
                    window.location.href = '/login';
                }
            }
        ]
    }
});

//get generic function
export async function httpGet<T>(endpoint: string): Promise<T> {
    try {
        return await api.get(endpoint, {
            headers: { 'Content-Type': 'application/json' }
        }).json<T>()
    } catch (error) {
        if (error instanceof HTTPError) {
            const backendError = await error.response.json();
            console.log(`Error en GET ${endpoint}:`, backendError);
            throw backendError
        }
        console.log(`Error en GET ${endpoint}:`, error);
        throw error
    }
}

//delete generic function 
export async function httpDelete(endpoint: string): Promise<void> {
    try {
        const response = await api.delete(endpoint)
        if (response.status === 204) {
            return
        }
    } catch (error) {
        console.log(`Error en DELETE ${endpoint}:`, error);
        throw error
    }
}

// TReq = Tipo del Request (Payload)
// TRes = Tipo del Response (Lo que devuelve el server)
export async function httpPatch<TReq, TRes>(endpoint: string, data: TReq): Promise<TRes> {
    try {
        const isFormData = data instanceof FormData;

        const options: any = {};
        
        if (isFormData) {
            options.body = data;
        } else {
            options.json = data;
            options.headers = { 'Content-Type': 'application/json' };
        }

        const response = await api.patch(`${endpoint}`, options);
        return response.json<TRes>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const backendError = await error.response.json();
            console.log(`Error PATCH ${endpoint}:`, backendError);
            throw backendError;
        }
        console.log(`Error en PATCH ${endpoint}:`, error);
        throw error;
    }
}

//update generic funcion tyoe PUT
export async function httpPut<TReq, TRes>(endpoint: string, data: TReq): Promise<TRes> {
    try {
        const isFormData = data instanceof FormData;

        const options: any = {};
        
        if (isFormData) {
            options.body = data;
        } else {
            options.json = data;
            options.headers = { 'Content-Type': 'application/json' };
        }

        const response = await api.put(`${endpoint}`, options);
        return response.json<TRes>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const backendError = await error.response.json();
            console.log(`Error POST ${endpoint}:`, backendError);
            throw backendError
        }
        console.log(`Error en POST ${endpoint}:`, error);
        throw error
    }
}

//create new record function
export async function httPost<TReq, TRes>(endpoint: string, data: TReq): Promise<TRes> {
    try {
        const isFormData = data instanceof FormData;

        const options: any = {};
        
        if (isFormData) {
            options.body = data;
        } else {
            options.json = data;
            options.headers = { 'Content-Type': 'application/json' };
        }

        console.log(endpoint);
        

        const response = await api.post(`${endpoint}`, options);
        return response.json<TRes>();
    } catch (error) {
        if (error instanceof HTTPError) {
            const backendError = await error.response.json();
            console.log(`Error POST ${endpoint}:`, backendError);
            throw backendError
        }
        console.log(`Error en POST ${endpoint}:`, error);
        throw error
    }
}