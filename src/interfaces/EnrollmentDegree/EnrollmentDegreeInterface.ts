import { StatusEnum } from "@/enum/StatusEnum"

export interface EnrollmentDegreeRequest {
    studentId: number,
    gradeDetailId: number
}

export interface EnrollmentDegreeResponse {
    id: number,
    studentName: string,
    degreeName: string,
    status: StatusEnum
}

export interface EnrollmentDegreeSimpleResponse extends EnrollmentDegreeResponse {
}

export interface EnrollmentDegreeFullResponse extends EnrollmentDegreeResponse{
}

export interface EnrollmentDegreeTableRow extends EnrollmentDegreeResponse{
    actions?: string
}