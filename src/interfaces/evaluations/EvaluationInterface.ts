import { StatusEnum } from "@/enum/StatusEnum"
import { type CourseSimpleResponse } from "../Course/CourseInterface"
import { type PeriodSimpleResponse } from "../Period/periodInterface"

export interface EvaluationRequest{
    name: string,
    description: string,
    percentage: number | null,
    periodId: number | null,
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
    period: PeriodSimpleResponse
}

export interface EvaluationEditResponse extends Omit<EvaluationRequest, "courseId">{
    id: number
}

export interface EvaluationTableRow extends Omit<EvaluationResponse, "description">{
    actions?: string
}