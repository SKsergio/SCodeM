import ky from "ky";

const api = ky.create({
    prefixUrl: 'http://127.0.0.1:8000/api/',
    headers:{
        'Content-Type':'application/json'
        //Authentication but in this moments she is not here with us
    },
})

export async function httpGet<T>(endpoint:string):Promise<T>{
    try {
        return await api.get(endpoint).json<T>()
    } catch (error) {
        console.log(`Error en GET ${endpoint}:`, error);
        throw error
    }
}

export async function deleteRecord(endpoint:string):Promise<void> {
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