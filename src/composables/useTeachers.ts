import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PutRecord,
    GetOneRecord
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
//interfaces de maestros
import { TeacherRequest, TeacherFullResponse, TeacherResponse, TeacherSimpleResponse, TeacherEditResponse } from "@/interfaces/Teacher/TeacherInterface";
import { buildFormData } from "@/utils/buildFormData";

export function useTeachers() {
    const endpoint = 'core/teacher';
    const records = ref<TeacherResponse[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
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

    //crear
    const createRecord = async (data: TeacherRequest) => {
        try {
            const dataSend = buildFormData(data)
            await SaveRecord(dataSend, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: TeacherRequest): Promise<TeacherResponse> => {
        try {
            const dataSend = buildFormData(data)
            const record = await PutRecord<FormData, TeacherResponse>(idRecord, dataSend, endpoint);
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

    //obtener detalle
    const getDetail = async (idRecord: number): Promise<TeacherFullResponse> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<TeacherFullResponse>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    //obtener para eidcion
    const getOntetoEdit = async (idRecord: number): Promise<TeacherEditResponse> => {
        loading.value = true;
        try {
            const fullUrl = endpoint + "/edit";
            const record = await GetOneRecord<TeacherEditResponse>(fullUrl, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        }finally {
            loading.value = false;
        }
    }

    watch([pagination.page, pagination.size], () => {
        fetchAll();
    });

    return {
        records,
        loading,
        error,
        pagination,
        fetchAll,
        getDetail,
        createRecord,
        updateRecord,
        deleteRecord,
        getOntetoEdit
    };
}