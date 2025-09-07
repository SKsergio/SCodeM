import ky, { HTTPError } from "ky";

const api = ky.create({
    prefixUrl: 'http://127.0.0.1:8000/api/',
    headers:{
        'Content-Type':'application/json'
        //Authentication but in this moments she is not here with us
    },
})

//get generic function
export async function httpGet<T>(endpoint:string):Promise<T>{
    try {
        return await api.get(endpoint).json<T>()
    } catch (error) {
        console.log(`Error en GET ${endpoint}:`, error);
        throw error
    }
}

//delete generic function 
export async function httpDelete(endpoint:string):Promise<void> {
    try {
        const response =  await api.delete(endpoint)
        if (response.status === 204) {
            //la eliminacion fue correcta
            return
        }
    } catch (error) {
        console.log(`Error en DELETE ${endpoint}:`, error);
        throw error
    }
}

//Update generic function type PATCH
export async function httpPatch<T>(endpoint:string, data:T):Promise<T>{
    try {
        const response = await api.patch(`${endpoint}`, {json: data})
        return response.json<T>()
    } catch (error) {
        if(error instanceof HTTPError){
            const backendError = await error.response.json();
            console.log(`Error PATCH ${endpoint}:`, backendError);
            throw backendError
        }
        console.log(`Error en PATCH ${endpoint}:`, error);
        throw error //el throw basicamente escala el error a quien hace uso de la funcion
    }
}

//update generic funcion tyoe PUT
export async function httpPut<T>(endpoint:string, data:T, id:number):Promise<void>{
    try {
        alert('la data es'+JSON.stringify(data)) 
    } catch (error) {
        console.log(`Error en update ${endpoint}:`, error);
    }
}

//create new record function
export async function httPost<T>(endpoint:string, data:T):Promise<void>{
    try {
        const response = await api.post(`${endpoint}`,{json:data})
        
    } catch (error) {
        console.log(`Error en POST ${endpoint}:`, error);
        throw error
    }
}