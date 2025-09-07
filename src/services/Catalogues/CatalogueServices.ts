import { httpGet, httpDelete, httpPatch, httPost} from "../api";
import { DegreeInterface } from "@/interfaces/Catalogues/CataloguesInterface";

//function to get all records generic
export async function GetAllRecordsCatalogues<T>(url:string):Promise<T[]>{
    try {
        const response = await httpGet<T[]>(`catalog/${url}`)
        return response
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}


//function to delete one record generic
export async function DeleteCatalog(recordID:number, url:string):Promise<void>{
    try {
        await httpDelete(`catalog/${url}/${recordID}/`)
    } catch (error) {
        console.log('Error al eliminar el registro:', error);
        throw error
    }
}

//function to update one record generic
export async function PatchCatalog<T>(recordID:number, data:T, url:string):Promise<T>{
    try {
        const response = await httpPatch<T>(`catalog/${url}/${recordID}/`, data);
        return response;
    } catch (error) {
        console.log(`Error al actualizar el registro ${recordID} en ${url}:`, error);
        throw error;
    }
}

//function to create a new record 
export async function CreateCatalogue<T>(data:T, url: string):Promise<void>{
    try {
        await httPost(`catalog/${url}/`, data);
    } catch (error) {
        console.log(`Error al crear el registro ${data} en ${url}:`, error);
        throw error;
    }
}