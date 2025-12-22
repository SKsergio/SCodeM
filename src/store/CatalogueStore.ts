import { defineStore } from 'pinia';
import { ref } from 'vue';
import {//importamos las funciones del crud
    GetAllRecords,
    GetRecords,
    DeleteRecords,
    CreateRecord,
    PatchRecord
} from '@/services/Catalogues/GenericServices';

export function useCatalogueStore<T>(store_id: string, endpoint: string, defaultParams: Record<string, any> = {}) {
    return defineStore(store_id, () => {
        const records = ref<T[]>([]);
        const lengthRecords = ref(0)
        const editableFields = ref<(keyof T)[]>([]);
        const title = ref(endpoint);
        let loading = ref(false);
        const params = ref<Record<string, any>>({ ...defaultParams });

        const fetchAll = async (): Promise<void> => {
            try {
                loading.value = true;
                records.value = await GetRecords<T>(endpoint, params.value);
                lengthRecords.value = records.value.length;
            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
                throw error;
            } finally {
                loading.value = false
            }
        };

        const updateRecord = async (idRecord: number, data: T, url: string): Promise<T> => {
            try {
                let record = await PatchRecord<T>(idRecord, data, url);
                await fetchAll();
                return record
            } catch (error) {
                throw error;
            }
        };

        const DeleteRecord = async (idRecord: number, url: string): Promise<void> => {
            try {
                await DeleteRecords(idRecord, url);
                await fetchAll();
            } catch (error) {
                throw error;
            }
        };

        const createRecord = async (data: T): Promise<void> => {
            try {
                await CreateRecord(data, endpoint);
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
            fetchAll,
            params,
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
