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

//function to delete onre record
export async function DeleteCatalog(degreeId:number, url:string):Promise<void>{
    try {
        await deleteRecord(`catalog/${url}/${degreeId}/`)
    } catch (error) {
        console.log('Error al eliminar el grado:', error);
        throw error
    }
}
