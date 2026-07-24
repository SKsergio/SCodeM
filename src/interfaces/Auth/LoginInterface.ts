export interface LoginRequest {
    email: string;
    password: string;
}

// 2. Identidad Global (Refleja exactamente lo que manda el backend)
export interface GlobalUser {
    id: number;
    email: string;
}

export interface LoginResponse {
    token: string;
    tokenType: string;
    expiresInMs: number;
    user: GlobalUser;
    firstLogin: boolean;
}

export interface JwtPayload{
    sub: string;
    iss: string;
    iat: number;
    exp: number;
    permissions: string[];
    tenantId: number;
    role: string;
    uid: number;
}

// 3. Usuario resuelto en el frontend: identidad global + claims del token decodificado
export interface AuthUser extends GlobalUser {
    role: string;
    permissions: string[];
    tenantId: number;
}