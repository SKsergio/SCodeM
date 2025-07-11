import ky from "ky";

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
        console.log(`Error en PATCH ${endpoint}:`, error);
        throw error
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