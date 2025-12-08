import { httpGet, httpDelete, httpPatch, httPost } from "../api";

//function to get all records generic
export async function GetAllRecords<T>(url: string): Promise<T[]> {
    
    try {
        const response = await httpGet<T[]>(`${url}`)
        return response
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}

export async function GetOneRecord<T>(url: string, idRecord: number): Promise<T> {
    try {
        const response = await httpGet<T>(`${url}/${idRecord}`)
        return response
    } catch (error) {
        throw error;
    }
}

//function to get records with filters aplicate
export async function GetFilterRecords<T>(url: string,
        params?: { search?: string; fromDate?: string; untilDate?: string }
    ): Promise<T[]> {
    try {
        const query = new URLSearchParams()

        if (params?.search) query.append('search', params.search)
        if (params?.fromDate) query.append('from_date', params.fromDate)
        if (params?.untilDate) query.append('until_date', params.untilDate)

        const response = await httpGet<T[]>(`${url}?${query.toString()}`)
        return response
    } catch (error) {
        console.error('Error al obtener datos:', error)
        throw error
    }
}


//function to delete one record generic
export async function DeleteRecords(recordID: number, url: string): Promise<void> {
    try {
        await httpDelete(`${url}/${recordID}/`)
    } catch (error) {
        console.log('Error al eliminar el registro:', error);
        throw error
    }
}

//function to update one record generic
export async function PatchRecord<T>(recordID: number, data: T, url: string): Promise<T> {
    try {
        const response = await httpPatch<T, T>(`${url}/${recordID}/`, data);
        return response;
    } catch (error) {
        console.log(`Error al actualizar el registro ${recordID} en ${url}:`, error);
        throw error;
    }
}

//function to create a new record 
export async function CreateRecord<T>(data: T, url: string): Promise<boolean> {
    try {
        await httPost(`${url}/`, data);
        return true
    } catch (error) {
        console.log(`Error al crear el registro ${data} en ${url}:`, error);
        throw error;
    }
}