import { StatusEnum } from "@/enum/StatusEnum"
import { CatalogueSimpleResponse } from "../Catalogues/CataloguesInterface"
import { TeacherSimpleResponse } from "../Teacher/TeacherInterface"

//interfaz de request
export interface DegreeDetailRequest {
    ability: number,
    startDate: string;
    endDate: string;
    degreeId: number | null,
    tutorId: number | null,
    sectionId: number | null
}

//interfaz para response
export interface DegreeDetailResponse{
    id:number,
    ability: number,
    year: number,
    startDate: string;
    endDate: string;
    fullName: string,
    code: string,
    status: StatusEnum,
    sectionName: string,
    degreeName: string,
    tutorName: string
}

export interface DegreeDetailSimpleResponse extends Omit<DegreeDetailResponse, "ability, year">{
}

export interface DegreeDetailFullResponse{
    id:number,
    ability: number,
    totalStudents: number,
    code: string,
    availableSlots: number
    year: number,
    startDate: string;
    endDate: string;
    section: CatalogueSimpleResponse,
    degree: CatalogueSimpleResponse,
    tutor: TeacherSimpleResponse
}

export interface DegreeDetailEditResponse extends DegreeDetailRequest{
    id: number; 
}

export interface DegreeDetailTableRow extends Omit<DegreeDetailResponse, "sectionName, degreeName">{
    actions?: string; 
}