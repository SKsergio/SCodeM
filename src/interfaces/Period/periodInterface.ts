import { StatusEnum } from "@/enum/StatusEnum";


export interface PeriodRequest {
    startDate: string;
    endDate: string;
    weight: number;
    courseId: number;
}

//para periodso utilizamos la misma en fullResponse y reponse de paginacion, para editar tambien usamos esta
export interface PeriodResponse {
    id: number;
    startDate: string;
    endDate: string;
    courseName: string;
    status: StatusEnum;
    weight: number;
    createdAt: string;
}

export interface PeriodEditResponse extends PeriodRequest{
    id: number; 
}

export interface PeriodSimpleResponse extends Omit<PeriodResponse, "status, weight, createdAt, courseName"> {}

export interface PeriodTableRow extends PeriodResponse {
    actions?: string; 
}