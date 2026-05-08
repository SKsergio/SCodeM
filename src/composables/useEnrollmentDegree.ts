import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PatchRecord,
    GetOneRecord,
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
//interfaces de maestros
import { BatchEnrollmentRequestDTO, EnrollmentDegreeFullResponse, EnrollmentDegreeRequest, EnrollmentDegreeResponse, EnrollmentDegreeSimpleResponse } from "@/interfaces/EnrollmentDegree/EnrollmentDegreeInterface";

export function useEnrollmentDegrees() {
    const endpoint = 'core/enrollment-degrees';
    const records = ref<EnrollmentDegreeResponse[]>([]);
    const recordSelect = ref<EnrollmentDegreeSimpleResponse[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();
    const paginationPreInscription = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await GetRecords<EnrollmentDegreeResponse>(endpoint, {
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

    //obtener por grado id
    const fetcByGradeId = async (degreeDetailId: number) => {
        loading.value = true;
        error.value = null;
        const finalUrl = endpoint + `/grade-detail/${degreeDetailId}`
        try {
            const response = await GetRecords<EnrollmentDegreeSimpleResponse>(finalUrl, {
                page: pagination.page.value,
                size: pagination.size.value
            });

            recordSelect.value = response.content;
            paginationPreInscription.setPaginationData(response.totalElements, response.totalPages);
        } catch (e) {
            error.value = `Error obteniendo datos de ${endpoint}`;
            console.error(e);
        } finally {
            loading.value = false;
        }
    }

    //crear
    const createRecord = async (data: EnrollmentDegreeRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }
    
    //crear
    const createBatchEnrolls = async (data: BatchEnrollmentRequestDTO) => {
        try {
            const finalUrl = endpoint + '/batch'
            await SaveRecord(data, finalUrl);
            await fetcByGradeId(data.gradeDetailId);
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: EnrollmentDegreeRequest): Promise<EnrollmentDegreeResponse> => {
        try {
            const record = await PatchRecord<EnrollmentDegreeRequest, EnrollmentDegreeResponse>(idRecord, data, endpoint);
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
        }finally {
            loading.value = false;
        }
    };

    const deleteSpecificRecord = async (idRecord: number, gradeDetailId:number) => {
        loading.value = true;
        try {
            await DeleteRecords(idRecord, endpoint);
            await fetcByGradeId(gradeDetailId);
        } catch (e) {
            console.error('Error al eliminar:', e);
            throw e;
        }finally {
            loading.value = false;
        }
    };

    //obtener detalle
    const getDetail = async (idRecord: number): Promise<EnrollmentDegreeFullResponse> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<EnrollmentDegreeFullResponse>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    // //obtener para eidcion
    const getOntetoEdit = async (idRecord: number): Promise<EnrollmentDegreeSimpleResponse> => {
        loading.value = true;
        try {
            const fullUrl = endpoint + "/edit";
            const record = await GetOneRecord<EnrollmentDegreeSimpleResponse>(fullUrl, idRecord);
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
        getOntetoEdit,
        fetcByGradeId,
        recordSelect,
        createBatchEnrolls,
        paginationPreInscription,
        deleteSpecificRecord
    };
}