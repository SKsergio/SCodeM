import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PatchRecord,
    GetOneRecord,
    GetAllRecords
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
//interfaces de maestros
import { DegreeDetailRequest, DegreeDetailResponse, DegreeDetailSimpleResponse, DegreeDetailFullResponse, DegreeDetailEditResponse } from "@/interfaces/DegreeDetail/DegreeDetailInterface";
import { statusRequest } from "@/interfaces/StatusRequest";

export function useDegreeDetail() {
    const endpoint = 'core/grade-detail';
    const records = ref<DegreeDetailResponse[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await GetRecords<DegreeDetailResponse>(endpoint, {
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
    const createRecord = async (data: DegreeDetailRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: DegreeDetailRequest): Promise<DegreeDetailResponse> => {
        try {
            const record = await PatchRecord<DegreeDetailRequest, DegreeDetailResponse>(idRecord, data, endpoint);
            await fetchAll();
            return record;
        } catch (e) {
            console.error('Error al editar:', e);
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
        } finally {
            loading.value = false;
        }
    };

    //obtener detalle
    const getDetail = async (idRecord: number): Promise<DegreeDetailFullResponse> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<DegreeDetailFullResponse>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    // //obtener para eidcion
    const getOntetoEdit = async (idRecord: number): Promise<DegreeDetailEditResponse> => {
        loading.value = true;
        try {
            const fullUrl = endpoint + "/edit";
            const record = await GetOneRecord<DegreeDetailEditResponse>(fullUrl, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    const getSelects = async (): Promise<DegreeDetailSimpleResponse[]> => {
        const urlFinal = endpoint + "/all"
        try {
            const records = await GetAllRecords<DegreeDetailSimpleResponse>(urlFinal);
            return records;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        }
    }

    //cambiar estados
    const changeStatus = async (idRecord: number, status: statusRequest): Promise<DegreeDetailEditResponse> => {
        try {
            const urlFinal = endpoint + "/status"
            const record = await PatchRecord<statusRequest, DegreeDetailEditResponse>(idRecord, status, urlFinal);
            await fetchAll();
            return record;
        } catch (e) {
            console.error('Error al cambiar estado:', e);
            throw e;
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
        getOntetoEdit,
        changeStatus,
        getSelects
    };
}