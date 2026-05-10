import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PatchRecord,
    GetOneRecord,
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
import { BatchEvaluationRequestDTO, EvaluationDetailFullResponse, EvaluationDetailRequest, EvaluationDetailResponse, EvaluationGradebook } from "@/interfaces/EvaluationDetail/evaluationDetailInterface";
//interfaces de maestros

export function useEvaluationDetail() {
    const endpoint = 'core/evaluation-details';
    const gradebookRecords = ref<EvaluationGradebook[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);
    const evaluationCurrentId = ref<number>(0);

    //instanciando la paginacion
    const paginationGradeBook = usePagination();


    //obtener por curso id
    const fetchGradeBook = async (evaluationId: number) => {
        loading.value = true;
        error.value = null;
        evaluationCurrentId.value = evaluationId;
        const finalUrl = endpoint + `/evaluation/${evaluationId}`
        try {
            const response = await GetRecords<EvaluationGradebook>(finalUrl, {
                page: paginationGradeBook.page.value,
                size: paginationGradeBook.size.value
            });

            gradebookRecords.value = response.content;
            paginationGradeBook.setPaginationData(response.totalElements, response.totalPages);
        } catch (e) {
            error.value = `Error obteniendo datos de ${endpoint}`;
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    //crear
    const createRecord = async (data: EvaluationDetailRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchGradeBook(data.evaluationId);
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }
    
    //crear
    const createBatchRegistration = async (data: BatchEvaluationRequestDTO) => {
        try {
            const finalUrl = endpoint + '/batch'
            await SaveRecord(data, finalUrl);
            await fetchGradeBook(data.evaluationId);
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }
   

    //eliminar
    const deleteSpecificRecord = async (idRecord: number, evaluationId:number) => {
        loading.value = true;
        try {
            await DeleteRecords(idRecord, endpoint);
            await fetchGradeBook(evaluationId);
        } catch (e) {
            console.error('Error al eliminar:', e);
            throw e;
        }finally {
            loading.value = false;
        }
    };

    //obtener detalle
    const getDetail = async (idRecord: number): Promise<EvaluationDetailFullResponse> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<EvaluationDetailFullResponse>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    // //obtener para eidcion
    const getOntetoEdit = async (idRecord: number): Promise<EvaluationDetailRequest> => {
        loading.value = true;
        try {
            const fullUrl = endpoint + "/edit";
            const record = await GetOneRecord<EvaluationDetailRequest>(fullUrl, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        }finally {
            loading.value = false;
        }
    }


    watch([paginationGradeBook.page, paginationGradeBook.size], () => {
        fetchGradeBook(evaluationCurrentId.value);
    });

    return {
        gradebookRecords,
        loading,
        error,
        paginationGradeBook,
        fetchGradeBook,
        getDetail,
        createRecord,
        getOntetoEdit,
        createBatchRegistration,
        deleteSpecificRecord
    };
}