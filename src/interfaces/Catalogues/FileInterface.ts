import { TypeFileInterface } from "./CataloguesInterface";

export interface AttachmentInterfaceResponse{
    readonly id:number;
    url: string;
    file_type_id: number | null;
    type_fyle?:TypeFileInterface;
    extension:string;
    name:string;
    readonly created_at:string;
    readonly updated_at:string
}