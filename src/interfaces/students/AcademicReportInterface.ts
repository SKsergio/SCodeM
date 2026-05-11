export interface CourseAverageResponse{
    courseId: number,
    courseName: string,
    finalScore: number,
    evaluatedPercentage: number,
    status: string // "APROBADO" o "REPROBAD
}

export interface ReportCardResponse{
    studentId: number,
    studentFullName: string,
    gradeName: string, 
    globalAverage: number,
    courses: CourseAverageResponse[]
}

export interface ReportCardTableRow extends CourseAverageResponse{
    id: number;
    actions?: string;
}