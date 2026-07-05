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
//interfaz para fullResponse
export interface ManagerFullResponse extends ManagerResponse{
   assignedGrades: []//aaca luego ira el tipo de simpleResponseDegreeDetail,
   assignedCourses: []//aca tambien ira luego la interfaz correcta.
}

//interfaz para tabla
export interface ManagerTableRow extends ManagerSimpleResponse{
    actions?: string; 
}