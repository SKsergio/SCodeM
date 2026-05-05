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
import { EvaluationEditResponse, EvaluationFullResponse, EvaluationRequest, EvaluationResponse, EvaluationSimpleResponse } from "@/interfaces/evaluations/EvaluationInterface";
import { statusRequest } from "@/interfaces/StatusRequest";

export function useEvaluations() {
    const endpoint = 'core/evaluations';
    const records = ref<EvaluationResponse[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await GetRecords<EvaluationResponse>(endpoint, {
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
    const createRecord = async (data: EvaluationRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: EvaluationRequest): Promise<EvaluationResponse> => {
        try {
            const record = await PatchRecord<EvaluationRequest, EvaluationResponse>(idRecord, data, endpoint);
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
    const getDetail = async (idRecord: number): Promise<EvaluationFullResponse> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<EvaluationFullResponse>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    // //obtener para eidcion
    const getOntetoEdit = async (idRecord: number): Promise<EvaluationEditResponse> => {
        loading.value = true;
        try {
            const fullUrl = endpoint + "/edit";
            const record = await GetOneRecord<EvaluationEditResponse>(fullUrl, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    const getSelects = async (): Promise<EvaluationSimpleResponse[]> => {
        const urlFinal = endpoint + "/all"
        try {
            const records = await GetAllRecords<EvaluationSimpleResponse>(urlFinal);
            return records;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        }
    }

    const changeStatus = async (idRecord: number, status: statusRequest): Promise<EvaluationResponse> => {
        try {
            const urlFinal = endpoint + "/status"
            const record = await PatchRecord<statusRequest, EvaluationResponse>(idRecord, status, urlFinal);
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