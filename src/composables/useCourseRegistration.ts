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
import { BatchRegistrationRequestDTO, CourseRegistrationFullResponse, CourseRegistrationRequest, CourseRegistrationResponse, CourseRegistrationSimpleResponse } from "@/interfaces/CourseRegistration/courseRegistrationInterface";

export function useRegistrationCourses() {
    const endpoint = 'core/course-registrations';
    const records = ref<CourseRegistrationResponse[]>([]);
    const recordSelect = ref<CourseRegistrationSimpleResponse[]>([]);
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
            const response = await GetRecords<CourseRegistrationResponse>(endpoint, {
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

    //obtener por curso id
    const fetchByCourseId = async (courseId: number) => {
        loading.value = true;
        error.value = null;
        const finalUrl = endpoint + `/course/${courseId}`
        try {
            const response = await GetRecords<CourseRegistrationSimpleResponse>(finalUrl, {
                page: paginationPreInscription.page.value,
                size: paginationPreInscription.size.value
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
    const createRecord = async (data: CourseRegistrationRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }
    
    //crear
    const createBatchRegistration = async (data: BatchRegistrationRequestDTO) => {
        try {
            const finalUrl = endpoint + '/batch'
            await SaveRecord(data, finalUrl);
            await fetchByCourseId(data.courseId);
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: CourseRegistrationRequest): Promise<CourseRegistrationResponse> => {
        try {
            const record = await PatchRecord<CourseRegistrationRequest, CourseRegistrationResponse>(idRecord, data, endpoint);
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

    const deleteSpecificRecord = async (idRecord: number, courseId:number) => {
        loading.value = true;
        try {
            await DeleteRecords(idRecord, endpoint);
            await fetchByCourseId(courseId);
        } catch (e) {
            console.error('Error al eliminar:', e);
            throw e;
        }finally {
            loading.value = false;
        }
    };

    //obtener detalle
    const getDetail = async (idRecord: number): Promise<CourseRegistrationFullResponse> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<CourseRegistrationFullResponse>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    // //obtener para eidcion
    const getOntetoEdit = async (idRecord: number): Promise<CourseRegistrationSimpleResponse> => {
        loading.value = true;
        try {
            const fullUrl = endpoint + "/edit";
            const record = await GetOneRecord<CourseRegistrationSimpleResponse>(fullUrl, idRecord);
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

    //ARREGLAR ESTOOOOOO
    // watch([paginationPreInscription.page, paginationPreInscription.size], () => {
    //     fetchByCourseId( courseId:number);
    // });
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
        fetchByCourseId,
        recordSelect,
        createBatchRegistration,
        paginationPreInscription,
        deleteSpecificRecord
    };
}