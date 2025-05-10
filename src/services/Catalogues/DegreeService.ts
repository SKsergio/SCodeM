import { httpGet, deleteRecord } from "../api";
import { DegreeInterface } from "@/interfaces/Catalogues/CataloguesInterface";

//function to get all records of Degrees
export async function GetAllDegrees():Promise<DegreeInterface[]>{
    try {
        const response = await httpGet<DegreeInterface[]>('catalog/degree')
        return response
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}


export async function GetAllRecords<T>(url:string):Promise<T[]>{
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
        await deleteRecord(`catalog/${url}/${recordID}/`)
    } catch (error) {
        console.log('Error al eliminar el registro:', error);
        throw error
    }
}
