import { defineStore } from 'pinia';
import { ref } from 'vue';
import {//importamos las funciones del crud
    GetAllRecords,
    GetFilterRecords,
    DeleteRecords,
    CreateRecord,
    PatchRecord
} from '@/services/Catalogues/GenericServices';

export function useStudentManagerStore<T>(store_id: string, endpoint: string) {
    return defineStore(store_id, () => {
        const records = ref<T[]>([]);
        const lengthRecords = ref(0)
        const editableFields = ref<(keyof T)[]>([]);
        const title = ref(endpoint);
        let loading =  ref(false);


        const fetchAll = async (): Promise<void> => {
            try {
                loading.value = true;
                records.value = await GetAllRecords<T>(endpoint);
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
                records.value = await GetFilterRecords<T>(endpoint, params);
                lengthRecords.value = records.value.length
            } catch (error) {
                throw error;
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
