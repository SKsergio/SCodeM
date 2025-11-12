import { defineStore } from 'pinia';
import { ref } from 'vue';
import {//importamos las funciones del crud
    GetAllRecordsCatalogues,
    GetFilterCatalogues,
    DeleteCatalog,
    CreateCatalogue,
    PatchCatalog
} from '@/services/Catalogues/CatalogueServices';

export function useCatalogueStore<T>(store_id: string, endpoint: string) {
    return defineStore(store_id, () => {
        const records = ref<T[]>([]);
        const lengthRecords = ref(0)
        const editableFields = ref<(keyof T)[]>([]);
        const title = ref(endpoint);
        let loading =  ref(false)

        const fetchAll = async (): Promise<void> => {
            try {
                loading.value = true;
                records.value = await GetAllRecordsCatalogues<T>(endpoint);
                lengthRecords.value = records.value.length
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
                throw error;
            }finally{
                loading.value = false
            }
        };

        const searchRecords = async (
                endpoint: string, 
                params?: {
                    search?: string
                    fromDate?: string
                    untilDate?: string
                }
            ): Promise<void> => {
            try {
                records.value = await GetFilterCatalogues<T>(endpoint, params);
                lengthRecords.value = records.value.length
                // if (lengthRecords.value == 0) {
                //     fetchAll()
                // }
            } catch (error) {
                throw error;
            }
        };

        const updateRecord = async (idRecord: number, data: T, url: string): Promise<T> => {
            try {
                let record = await PatchCatalog<T>(idRecord, data, url);
                await fetchAll();
                return record
            } catch (error) {
                throw error;
            }
        };

        const DeleteRecord = async (idRecord: number, url: string): Promise<void> => {
            try {
                await DeleteCatalog(idRecord, url);
                await fetchAll();
            } catch (error) {
                throw error;
            }
        };

        const createRecord = async (data: T): Promise<void> => {
            try {
                await CreateCatalogue(data, endpoint);
                await fetchAll();
            } catch (error) {
                throw error;
            }
        };

        const loadEditableFields = (fields: (keyof T)[]) => {
            editableFields.value = fields;
        };

        return {
            records,
            editableFields,
            searchRecords,
            fetchAll,
            updateRecord,
            DeleteRecord,
            createRecord,
            loadEditableFields,
            title,
            lengthRecords,
            loading
        };
    });
}
