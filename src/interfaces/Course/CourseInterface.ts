import { StatusEnum } from "@/enum/StatusEnum"
import { CatalogueSimpleResponse } from "../Catalogues/CataloguesInterface"
import { DegreeDetailSimpleResponse } from "../DegreeDetail/DegreeDetailInterface"
import { PeriodSimpleResponse } from "../Period/periodInterface"
import { TeacherSimpleResponse } from "../Teacher/TeacherInterface"

//interfaz de request
export interface CourseRequest {
    valorityUnity: number,
    gradeDetailId: number | null,
    periodId: number | null,
    teacherId: number | null,
    subjectId: number | null,
}

//interfaz para response
export interface CourseResoponse{
    id:number,
    name: string,
    code: string,
    teacherName: string,
    gradeDetailName: string,
    subjectName: string,
    totalStudents: number,
    status: StatusEnum,
    year:number,
    valorityUnity: number  
}

//interfaz para response simple
export interface CourseSimpleResponse extends Omit<CourseResoponse, "teacherName, gradeDetailName, subjectName, status, valorityUnity">{
}

export interface CourseFullResponse{
    id:number,
    name: string,
    code: string,
    teacher: TeacherSimpleResponse,
    gradeDetail: DegreeDetailSimpleResponse,
    subject: CatalogueSimpleResponse,
    period: PeriodSimpleResponse,
    totalStudents: number,
    availableSlots: number
    status: StatusEnum,
    year:number,
    valorityUnity: number
}

export interface CourseEditResponse extends CourseRequest{
    id: number;
}


export interface CourseTableRow{
    id:number,
    name: string,
    code: string,
    gradeDetailName: string,
    teacherName: string,
    subjectName: string,
    totalStudents: number,
    status: StatusEnum,
    year:number,
    actions?: string
}