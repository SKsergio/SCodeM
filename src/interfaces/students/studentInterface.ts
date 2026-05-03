import { InstitutionarPersonInterface } from "../InstitutionalPerson";

//interfaz para request
export interface StudentRequest extends Omit<InstitutionarPersonInterface, 'id'>{
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    carnet: string,
    photo: File | null,
} 
//imterfaz para obtener un registro a editar
export interface StudentEditResponse extends Omit<StudentRequest, "photo">{
    id:number,
    routePhoto: string | null;
}

//interfaz para response
export interface StudentResponse extends InstitutionarPersonInterface{
    fullName: string,
    carnet: string,
    routePhoto: string,
    age: number,
}

//interfaz para simpleResponse
export interface StudentSimpleResponse{
    readonly id: number
    fullName: string,
    carnet: string,
    routePhoto: string,
    email: string,
    age: number,
}
//interfaz para fullResponse
export interface StudentFullResponse extends StudentResponse{
   
}

//interfaz para tabla
export interface StudentTableRow extends StudentSimpleResponse{
    actions?: string; 
}