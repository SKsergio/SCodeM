import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PatchRecord
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
//interfaces de maestros
import { TeacherRequest, TeacherFullResponse, TeacherResponse, TeacherSimpleResponse } from "@/interfaces/Teacher/TeacherInterface";
import { PaginateResponse } from "@/interfaces/paginateResponse";
import { buildFormData } from "@/utils/buildFormData";

export function useTeachers(){
    const endpoint = 'core/teacher';
    const records = ref<TeacherResponse[]>([]);
    const loading = ref(false);
    const error = ref<String| null>(null);

    //instanciando la paginacion
    const pagination = usePagination();

    const fetchAll = async(extraParams: Record<string, any> = {}) =>{
        loading.value = true;
        error.value = null;
        
        try {
            const response = await GetRecords<TeacherResponse>(endpoint, {
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

    const createRecord = async ( data:TeacherRequest) =>{
        try {
            const dataSend = buildFormData(data)
            await SaveRecord(dataSend, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    const updateRecord = async (idRecord: number, data:TeacherRequest): Promise<TeacherResponse> =>{
         try {
            const record = await PatchRecord<TeacherRequest, TeacherResponse>(idRecord, data, endpoint);
            await fetchAll();
            return record;
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    const deleteRecord = async (idRecord: number) => {
        try {
            await DeleteRecords(idRecord, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al eliminar:', e);
            throw e;
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
        deleteRecord
    };
}