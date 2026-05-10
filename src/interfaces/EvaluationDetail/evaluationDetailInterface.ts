import { EvaluationResponse } from "../evaluations/EvaluationInterface";
import { StudentSimpleResponse } from "../students/studentInterface";

export interface EvaluationDetailRequest {
    evaluationId: number;
    studentId: number;
    grade: number;
    feedback: string;
}

export interface EvaluationDetailResponse {
    id: number;
    grade:number;
    feedback: string;
    evaluationName: string;
    studentName: string;
    carnet: string;
    courseName: string;
}

export interface EvaluationSimpleResponse {
    id: number;
    grade:number;
    studentId: number ;
    evaluationId: number;
}

export interface EvaluationDetailEditResponse extends EvaluationDetailRequest {
    id: number;
}


export interface EvaluationDetailFullResponse extends EvaluationDetailRequest {
    id: number;
    grade: number;
    feedback: string;
    student: StudentSimpleResponse;
    evaluation: EvaluationResponse;
}


export interface BatchEvaluationRequestDTO{
    evaluationId: number,
    grades: studentGradeRequest[]
}

export interface studentGradeRequest {
    evaluationDetailId: number | null;
    studentId: number;
    grade: number;
    feedback: string | null; 
}

export interface EvaluationGradebook{
    studentId: number,
    studentFullName: string,
    studentCode: string,

    // Datos de la Nota (Pueden ser null)
    evaluationDetailId: number | null,
    grade: number | null,
    feedback: string | null
}

export interface EvaluationGradebookTableRow {
    id: number; // Obligatorio para el generic de tu TableGridComponent
    studentId: number;
    studentFullName: string;
    studentCode: string; // Faltaba
    evaluationDetailId: number | null; // Faltaba
    grade: number | null;
    feedback: string | null;
    actions?: string;
}