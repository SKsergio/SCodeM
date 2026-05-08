import { PaginateResponse } from "@/interfaces/paginateResponse";
import { httpGet, httpDelete, httpPatch, httPost, httpPut } from "../api";

//function to get all records generic
export async function GetAllRecords<T>(url: string, params: Record<string, any> = {}): Promise<T[]> {

    try {
        const query = new URLSearchParams();
        Object.keys(params).forEach(key => {
            const value = params[key];
            if (value !== null && value !== undefined && value !== '') {
                query.append(key, String(value));
            }
        });

        const queryString = query.toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;
        const response = await httpGet<T[]>(finalUrl);
        return response;
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

export async function GetRecords<T>(
    url: string,
    params: Record<string, any> = {}
): Promise<PaginateResponse<T>> {
    try {
        const query = new URLSearchParams();

        Object.keys(params).forEach(key => {
            const value = params[key];
            if (value !== null && value !== undefined && value !== '') {
                query.append(key, String(value));
            }
        });

        const queryString = query.toString();
        const finalUrl = queryString ? `${url}?${queryString}` : url;

        const response = await httpGet<PaginateResponse<T>>(finalUrl);
        return response;

    } catch (error) {
        console.error(`Error al obtener datos de ${url}:`, error);
        throw error;
    }
}

//function to delete one record generic
export async function DeleteRecords(recordID: number, url: string): Promise<void> {
    try {
        await httpDelete(`${url}/${recordID}`)
    } catch (error) {
        console.log('Error al eliminar el registro:', error);
        throw error
    }
}

//function to update one record generic
export async function PatchRecord<TReq, TRes>(recordID: number, data: TReq, url: string): Promise<TRes> {
    try {
        console.log(recordID);
        const response = await httpPatch<TReq, TRes>(`${url}/${recordID}`, data);
        return response;
    } catch (error) {
        console.log(`Error al actualizar el registro ${recordID} en ${url}:`, error);
        throw error;
    }
}

//PUT RECORD
export async function PutRecord<TReq, TRes>(recordID: number, data: TReq, url: string): Promise<TRes> {
    try {
        console.log(recordID);
        const response = await httpPut<TReq, TRes>(`${url}/${recordID}`, data);
        return response;
    } catch (error) {
        console.log(`Error al actualizar el registro ${recordID} en ${url}:`, error);
        throw error;
    }
}


//function to create a new record 
export async function SaveRecord<T>(data: T, url: string): Promise<boolean> {
    try {
        await httPost(`${url}`, data);
        return true
    } catch (error) {
        console.log(`Error al crear el registro ${data} en ${url}:`, error);
        throw error;
    }
}