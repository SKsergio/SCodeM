import { CatalogMetaData } from "@/interfaces/templates/CatalogDataInterface";
import { AbstractCatalog } from "@/interfaces/Catalogues/CataloguesInterface";


export function AssambleMetaData <T extends AbstractCatalog>(
    //they are the params to recibe out funcion
    data:T[],
    title:string,
    api_name: string,
    type_user: string,
    editableields: (keyof T)[] = [] //es un array que solo puede contener los tipos de T<>
):CatalogMetaData<T>{
    //values to return of function
    return {
        title, //title to show in headers
        api_name, //names to use in the apis call
        records: data, //records of the apis
        type_user, //type user
        actions:['delete', 'add', 'update'],//action to stay 
        editableFields:editableields //fields to be a editable
    }
}