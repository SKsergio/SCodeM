import { ParentType } from "@/enum/ParentType"

//crear
export interface ManagerStudentRequest{
    studentId: number,
    managerId: number,
    relationType: ParentType,
    emergencyContact: boolean
}

//editar
export interface ManagerStudentRequestEdit {
    relationType: ParentType,
    emergencyContact: boolean
}

//batch aun dudoso
export interface BatchEnrollmentRequestDTO{
    managerId: number,
    studentIds: number[]
}


export interface managerStudentResponseDTO {
    id: number,
    studentName: string,
    managerName: string,
    relationType: ParentType
}

export interface AssignedStudentDetailResponse {
    id: number,
    studentId: number,
    fullName: string,
    carnet: string,
    relationType: ParentType,
    emergencyContact: boolean,
    routePhoto: string,
    age: number,
}

export interface AssignedStudentsTableRow extends AssignedStudentDetailResponse{
    actions?: string
}


export interface EnrollmentDegreeTableRow extends managerStudentResponseDTO{
    actions?: string
}