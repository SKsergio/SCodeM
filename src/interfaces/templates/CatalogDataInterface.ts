import { AbstractCatalog } from './../Catalogues/CataloguesInterface';
//interface to metaData
export interface CatalogMetaData<T = AbstractCatalog>{
    title: string;
    api_name:string;
    records: T[];
    type_user:string; //de momento va asi, luego se creara un tipo para ella, esto nos servira para identificar el tipo de usuario y saber qie vistas mostrar
    actions: string[];//de igual manera luego se creara un tipo para las acciones, con la intencion de restringir permisos
    editableFields: (keyof T)[]
    // actionsmulti: (string|number)[]
}

//interface to we use in CardsComponent
//export interface RecordsActionData extends Omit<CatalogMetaData, 'title'| 'api_name' | 'type_user' | 'actions'>{}//omit omite todos los campos de la interfaz padre que le indiquemos
export interface RecordsActionData<T=AbstractCatalog> extends Pick<CatalogMetaData<T>, 'records'| 'editableFields'>{}//Pick solo devuelve todos los campos de la interfaz padre que le indiquemos

