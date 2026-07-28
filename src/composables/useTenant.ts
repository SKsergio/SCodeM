import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PutRecord,
    GetAllRecords
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";
//interfaces de maestros
import { TenantResponse, TenantRequest, TenantSimpleResponse } from "@/interfaces/templates/TenantInterface";

export function useTenants() {
    const endpoint = 'core/tenants';
    const records = ref<TenantResponse[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await GetRecords<TenantResponse>(endpoint, {
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
    const createRecord = async (data: TenantRequest) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: TenantRequest): Promise<TenantResponse> => {
        try {
            const record = await PutRecord<TenantRequest, TenantResponse>(idRecord, data, endpoint);
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
    // const getDetail = async (idRecord: number): Promise<TeacherFullResponse> => {
    //     loading.value = true;
    //     try {
    //         const record = await GetOneRecord<TeacherFullResponse>(endpoint, idRecord);
    //         return record;
    //     } catch (e) {
    //         console.error('Error al obtener:', e);
    //         throw e;
    //     } finally {
    //         loading.value = false;
    //     }
    // }


    const getSelects = async (): Promise<TenantSimpleResponse[]> => {
            try {
                const urlFinal = endpoint + "/all"
                const records = await GetAllRecords<TenantSimpleResponse>(urlFinal);
                return records;
            } catch (e) {
                console.error('Error al obtener:', e);
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
        createRecord,
        updateRecord,
        deleteRecord,
        getSelects
    };
}