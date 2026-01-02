import { AttachmentInterfaceResponse } from "../Catalogues/FileInterface";

export interface StudentManagerResponse{
    readonly id:number;
    DUI?:string;
    passport?:string | null;
    first_name:string ;
    seccond_name:string;
    first_last_name:string;
    second_last_name?:string;
    married_surname?:string | null;
    direction:string;
    nationality?:string;
    birthdate: Date;
    email:string;
    age:number;
    readonly deleted_at:string | null;
    readonly created_at:string;
    readonly updated_at:string;
    file_type_id:number,
    file: AttachmentInterfaceResponse;
}

export interface StudentManagerRequest extends Omit<StudentManagerResponse, 'file' | 'deleted_at' | 'created_at' | 'updated_at'>{
}

// Esta es tu nueva interfaz para enviar el formulario con la imagen
export interface StudentManagerPayload extends StudentManagerRequest {
    photo?: File | null; 
}