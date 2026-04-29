import { InstitutionarPersonInterface } from "../InstitutionalPerson";

//interfaz para request
export interface TeacherRequest extends Omit<InstitutionarPersonInterface, 'id'>{
    firstName: string,
    secondName: string,
    firstLastName: string,
    secondLastName: string,
    photo: File | null,
    speciality: string,
    dui: string
} 
//imterfaz para obtener un registro a editar
export interface TeacherEditResponse extends Omit<TeacherRequest, "photo">{
    id:number,
    routePhoto: string | null;
}

//interfaz para response
export interface TeacherResponse extends InstitutionarPersonInterface{
    fullName: string,
    routePhoto: string,
    age: number,
    speciality: string,
    readonly createdAt: string,
    dui: string
}

//interfaz para simpleResponse
export interface TeacherSimpleResponse{
    readonly id: number
    fullName: string,
    routePhoto: string,
    email: string,
    age: number,
    dui: string,
    readonly createdAt: string 
}
//interfaz para fullResponse
export interface TeacherFullResponse extends TeacherResponse{
   assignedGrades: []//aaca luego ira el tipo de simpleResponseDegreeDetail,
   assignedCourses: []//aca tambien ira luego la interfaz correcta.
}

//interfaz para tabla
export interface TeacherTableRow extends TeacherSimpleResponse{
    actions?: string; 
}