import { StatusEnum } from "@/enum/StatusEnum"
import { CatalogueSimpleResponse } from "../Catalogues/CataloguesInterface"
import { TeacherSimpleResponse } from "../Teacher/TeacherInterface"

//interfaz de request
export interface DegreeDetailRequest {
    ability: number,
    year: number,
    degreeId: number | null,
    tutorId: number | null,
    sectionId: number | null
}

//interfaz para response
export interface DegreeDetailResponse{
    id:number,
    ability: number,
    year: number,
    fullName: string,
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
    year: number,
    section: CatalogueSimpleResponse,
    degree: CatalogueSimpleResponse,
    tutor: TeacherSimpleResponse
}

export interface DegreeDetailEditResponse extends DegreeDetailRequest{
    id: number; 
}

export interface DegreeDetailTableRow extends DegreeDetailResponse{
    actions?: string; 
}