import { StatusEnum } from "@/enum/StatusEnum";


export interface PeriodRequest {
    startDate: string;
    endDate: string;
}

//para periodso utilizamos la misma en fullResponse y reponse de paginacion, para editar tambien usamos esta
export interface PeriodResponse {
    id: number;
    startDate: string;
    endDate: string;
    status: StatusEnum;
    createdAt: string;
}

export interface PeriodSimpleResponse extends Omit<PeriodResponse, "status"> {}

export interface PeriodTableRow extends PeriodResponse {
    actions?: string; 
}