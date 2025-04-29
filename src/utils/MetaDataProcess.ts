import { CatalogMetaData } from "@/interfaces/templates/CatalogDataInterface";
import { AbstractCatalog } from "@/interfaces/Catalogues/CataloguesInterface";


export function AssambleMetaData <T extends AbstractCatalog>(
    //they are the params to recibe out funcion
    data:T[],
    title:string,
    api_name: string,
    type_user: string,
):CatalogMetaData<T>{
    //values to return of function
    return {
        title,
        api_name,
        records: data,
        type_user,
        actions:['delete', 'add', 'update']
    }
}