import { httpGet } from "../api";
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
