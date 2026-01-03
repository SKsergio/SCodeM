import { httpGet, httpDelete, httpPatch, httPost } from "../api";
import { StudentManagerPayload, StudentManagerResponse } from "@/interfaces/students/StudentManagers";
const url = 'students/studentsManagers'

export async function GetAllManagers(): Promise<StudentManagerResponse[]> {
    try {
        const response = await httpGet<StudentManagerResponse[]>(url)
        return response
    } catch (error) {
        console.error('Error al obtener datos:', error);
        throw error;
    }
}

export async function GetOneManager<StudentManagerResponse>(idManager: number): Promise<StudentManagerResponse> {
    try {
        const response = await httpGet<StudentManagerResponse>(`${url}/${idManager}`)
        return response
    } catch (error) {
        throw error;
    }
}

//function to get mangaers with filters aplicate
export async function GetFilterManagers<T>(
    params?: { search?: string; fromDate?: string; untilDate?: string }
): Promise<StudentManagerResponse[]> {
    try {
        const query = new URLSearchParams()

        if (params?.search) query.append('search', params.search)
        if (params?.fromDate) query.append('from_date', params.fromDate)
        if (params?.untilDate) query.append('until_date', params.untilDate)

        const response = await httpGet<StudentManagerResponse[]>(`${url}?${query.toString()}`)
        return response
    } catch (error) {
        console.error('Error al obtener datos:', error)
        throw error
    }
}


//function to delete one manager
export async function DeleteManager(idManager: number): Promise<void> {
    try {
        await httpDelete(`${url}/${idManager}/`)
    } catch (error) {
        console.log('Error al eliminar el registro:', error);
        throw error
    }
}

//function to update one manager
export async function PatchManager
    <StudentManagerPayload>(
        idManager: number, data: StudentManagerPayload
    ): Promise<StudentManagerResponse> {
    try {
        const response = await httpPatch<StudentManagerPayload, StudentManagerResponse>(`${url}/${idManager}/`, data);
        return response;
    } catch (error) {
        console.log(`Error al actualizar el registro ${idManager} en ${url}:`, error);
        throw error;
    }
}

//function to create a new record 
export async function CreateManager(data: StudentManagerPayload): Promise<boolean> {
    try {
        const formData = new FormData();
        
        // Agregar todos los campos
        Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
                if (key === 'photo' && value instanceof File) {
                    formData.append(key, value);
                }else {
                    formData.append(key, String(value));
                }
            }
        });
        
        await httPost<FormData, StudentManagerResponse>(`${url}`, formData);
        return true
    } catch (error) {
        console.log(`Error al crear el registro:`, error);
        throw error;
    }
}