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