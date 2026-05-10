import { StatusEnum } from "@/enum/StatusEnum"

export interface CourseRegistrationRequest {
    studentId: number,
    courseId: number
}

export interface BatchRegistrationRequestDTO{
    courseId: number,
    studentIds: number[]
}

export interface CourseRegistrationResponse {
    id: number,
    studentName: string,
    courseName: string,
    status: StatusEnum
}

export interface CourseRegistrationSimpleResponse extends CourseRegistrationResponse {
}

export interface CourseRegistrationFullResponse extends CourseRegistrationResponse{
}

export interface CourseRegistrationTableRow extends CourseRegistrationResponse{
    actions?: string
}