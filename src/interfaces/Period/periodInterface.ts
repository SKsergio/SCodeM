import { StatusEnum } from "@/enum/StatusEnum";


export interface PeriodRequest {
    name: string;
    startDate: string;
    endDate: string;
    weight: number;
    courseId: number;
}

//para periodso utilizamos la misma en fullResponse y reponse de paginacion
export interface PeriodResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    courseName: string;
    status: StatusEnum;
    weight: number;
    createdAt: string;
}

export interface PeriodEditResponse extends PeriodRequest {
    id: number;
    status: StatusEnum;
    createdAt: string;
}

export interface PeriodSimpleResponse {
    id: number;
    name: string;
    startDate: string;
    endDate: string;
    courseId: number;
}

export interface PeriodTableRow extends PeriodResponse {
    actions?: string;
}
