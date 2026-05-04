import { StatusEnum } from "@/enum/StatusEnum"
import { CourseSimpleResponse } from "../Course/CourseInterface"

export interface EvaluationRequest{
    name: string,
    description: string,
    percentage: number | null,
    startDate:string,
    endDate:string,
    courseId: number
}

export interface EvaluationResponse{
    id: number,
    name: string,
    description: string,
    courseName:string
    percentage: number,
    endDate:string,
    status: StatusEnum,
    daysRemaning: number
}

export interface EvaluationSimpleResponse extends Omit<EvaluationResponse, "description, percentage, endDate">{
}

export interface EvaluationFullResponse extends Omit<EvaluationResponse, "courseName">{
    course: CourseSimpleResponse
}

export interface EvaluationEditResponse extends EvaluationRequest{
    id: number
}

export interface EvaluationTableRow extends Omit<EvaluationResponse, "description">{
    actions?: string
}