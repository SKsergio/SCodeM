import { ref, watch } from "vue";
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PutRecord,
    GetOneRecord,
    GetAllRecords
} from '@/services/Catalogues/GenericServices';
import { usePagination } from "./usePagination";


//interfaces de catalogues

export function useCatalogue<T>(prefix:string) {
    const endpoint = `catalogue/${prefix}`
    const records = ref<T[]>([]);
    const loading = ref(false);
    const error = ref<String | null>(null);

    //instanciando la paginacion
    const pagination = usePagination();

    //listar
    const fetchAll = async (extraParams: Record<string, any> = {}) => {
        loading.value = true;
        error.value = null;

        try {
            const response = await GetRecords<T>(endpoint, {
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
    const createRecord = async (data: T) => {
        try {
            await SaveRecord(data, endpoint);
            await fetchAll();
        } catch (e) {
            console.error('Error al crear:', e);
            throw e;
        }
    }

    //editar
    const updateRecord = async (idRecord: number, data: T): Promise<T> => {
        try {
            const record = await PutRecord<T, T>(idRecord, data, endpoint);
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
        }finally {
            loading.value = false;
        }
    };

    //obtener detalle
    const getDetail = async (idRecord: number): Promise<T> => {
        loading.value = true;
        try {
            const record = await GetOneRecord<T>(endpoint, idRecord);
            return record;
        } catch (e) {
            console.error('Error al obtener:', e);
            throw e;
        } finally {
            loading.value = false;
        }
    }

    //OBTENER PARA SELECTS
    const getSelects = async (): Promise<T[]> => {
        try {
            const urlFinal = endpoint + "/all"
            const records = await GetAllRecords<T>(urlFinal);
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
        getDetail,
        createRecord,
        updateRecord,
        deleteRecord,
        getSelects,
    };
}