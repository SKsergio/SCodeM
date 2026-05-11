export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthUser {
    id: number;
    email: string;
    role: string;
    teacherId: number | null;
    studentId: number | null;
}

export interface LoginResponse {
    token: string;
    tokenType: string;
    expiresInMs: number;
    user: AuthUser;
}