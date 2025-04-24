//interface to metaData
export interface CatalogMetaData<T>{
    title: string;
    api_name:string;
    records: T[];
    type_user:string; //de momento va asi, luego se creara un tipo para ella, esto nos servira para identificar el tipo de usuario y saber qie vistas mostrar
    actions: []//de igual manera luego se creara un tipo para las acciones, con la intencion de restringir permisos
}