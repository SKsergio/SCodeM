import { InstitutionarPersonInterface } from "../InstitutionalPerson";

//interfaz para request
export interface ManagerRequest extends Omit<InstitutionarPersonInterface, 'id'>{
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    photo: File | null,
    dui: string
} 
//imterfaz para obtener un registro a editar
export interface ManagerEditResponse extends Omit<ManagerRequest, "photo">{
    id:number,
    routePhoto: string | null;
}

//interfaz para response
export interface ManagerResponse extends InstitutionarPersonInterface{
    fullName: string,
    routePhoto: string,
    age: number,
    dui: string,
    readonly createdAt: string,
}

//interfaz para simpleResponse
export interface ManagerSimpleResponse{
    readonly id: number
    fullName: string,
    routePhoto: string,
    email: string,
    age: number,
    dui: string,
    readonly createdAt: string 
}

//interfaz de estuiantes asignados
export interface AssignedStudentResponse {
    readonly studentId: number,
    fullName: string,
    carnet: string,
    relationType: string,
    emergencyContact: boolean
}
       
//interfaz para fullResponse
export interface ManagerFullResponse extends ManagerResponse{
   assignedStudents: AssignedStudentResponse[],
}

//interfaz para tabla
export interface ManagerTableRow extends ManagerSimpleResponse{
    actions?: string; 
}