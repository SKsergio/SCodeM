import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PatchRecord
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
//interfaces de maestros
import { managerStudentResponseDTO, ManagerStudentRequest, ManagerStudentRequestEdit, AssignedStudentDetailResponse } from "@/interfaces/ManagerStudents/ManagerStudentsInterface";

export function useManagerStudents() {
    const endpoint = 'core/manager-student';
    const records = ref<managerStudentResponseDTO[]>([]);
    const studentsByManager = ref<AssignedStudentDetailResponse[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();
    const paginationPreAsociated = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await GetRecords<managerStudentResponseDTO>(endpoint, {
                ...extraParams,
                page: pagination.page.value,
                size: pagination.size.value
            });

            records.value = response.content;
            pagination.setPaginationData(response.totalElements, response.totalPages);
        } catch (e) {
            error.value = `Error obteniendo datos de ${endpoint}`;
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    //obtener por manager id
    const fetchByManagerId = async (managerId: number) => {
        loading.value = true;
        error.value = null;
        const finalUrl = endpoint + `/assignedStudents/${managerId}`
        try {
            const response = await GetRecords<AssignedStudentDetailResponse>(finalUrl, {
                page: paginationPreAsociated.page.value,
                size: paginationPreAsociated.size.value
            });
            console.log("llego hasta aca");
            

            studentsByManager.value = response.content;
            paginationPreAsociated.setPaginationData(response.totalElements, response.totalPages);
        } catch (e) {
            error.value = `Error obteniendo datos de ${endpoint}`;
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    //crear
    const createRecord = async (data: ManagerStudentRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: ManagerStudentRequestEdit): Promise<managerStudentResponseDTO> => {
        try {
            const record = await PatchRecord<ManagerStudentRequestEdit, managerStudentResponseDTO>(idRecord, data, endpoint);
            await fetchAll();
            return record;
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //eliminar
    const deleteRecord = async (idRecord: number) => {
        loading.value = true;
        try {
            await DeleteRecords(idRecord, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al eliminar:', e);
            throw e;
        }finally {
            loading.value = false;
        }
    };

    watch([pagination.page, pagination.size], () => {
        fetchAll();
    });

    return {
        records,
        loading,
        error,
        pagination,
        fetchAll,
        createRecord,
        updateRecord,
        deleteRecord,
        fetchByManagerId,
        studentsByManager,
        paginationPreAsociated
    };
}