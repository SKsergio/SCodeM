import { StatusEnum } from "@/enum/StatusEnum"
import { type CatalogueSimpleResponse } from "../Catalogues/CataloguesInterface"
import { type DegreeDetailSimpleResponse } from "../DegreeDetail/DegreeDetailInterface"
import { type TeacherSimpleResponse } from "../Teacher/TeacherInterface"

//interfaz de request
export interface CourseRequest {
    valorityUnity: number,
    gradeDetailId: number | null,
    teacherId: number | null,
    subjectId: number | null,
    startDate: string,
    endDate: string,
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
    valorityUnity: number,
    startDate: string,
    endDate: string
}

//interfaz para response simple
export interface CourseSimpleResponse extends Omit<CourseResoponse, "teacherName, gradeDetailName, subjectName, startDate, endDate, valorityUnity">{
    gradeDetailId: number | null,
}

export interface CourseFullResponse{
    id:number,
    name: string,
    code: string,
    teacher: TeacherSimpleResponse,
    gradeDetail: DegreeDetailSimpleResponse,
    subject: CatalogueSimpleResponse,
    totalStudents: number,
    availableSlots: number,
    evaluatedPercentage: number,
    status: StatusEnum,
    year:number,
    valorityUnity: number,
    startDate: string,
    endDate: string
}

export interface CourseEditResponse extends CourseRequest{
    id: number;
}


export interface CourseTableRow{
    id:number,
    name: string,
    code: string,
    teacherName: string,
    subjectName: string,
    totalStudents: number,
    status: StatusEnum,
    year:number,
    actions?: string
}