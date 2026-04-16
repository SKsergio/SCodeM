import { defineStore } from 'pinia';
import { ref } from 'vue';
import {//importamos las funciones del crud
    GetRecords,
    DeleteRecords,
    SaveRecord,
    PatchRecord
} from '@/services/Catalogues/GenericServices';

export function useCatalogueStore<T>(
    store_id: string,
    endpoint: string,
    defaultParams: Record<string, any> = {}
    ){
    return defineStore(store_id, () => {

        const records = ref<T[]>([]);
        const lengthRecords = ref(0)
        const params = ref<Record<string, any>>({ ...defaultParams });

        const editableFields = ref<(keyof T)[]>([]);
        const title = ref(endpoint);
        let loading = ref(false);

        //datos de paginacion
        const page = ref(0);
        const size = ref(10);
        const totalElements = ref(0);
        const totalPages = ref(0);

        const fetchAll = async (): Promise<void> => {
            try {
                loading.value = true;

                const response = await GetRecords<T>(endpoint, {
                    ...params.value,
                    page: page.value,
                    size: size.value
                });

                records.value = response.content.map((item: any) => ({
                    ...item,
                    created_at: item.created_at ?? item.createdAt
                }));
                lengthRecords.value = records.value.length;
                totalElements.value = response.totalElements;
                totalPages.value = response.totalPages;

            } catch (error) {
                console.error(`Error fetching ${endpoint}:`, error);
                throw error;
            } finally {
                loading.value = false;
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
                await SaveRecord(data, endpoint);
                await fetchAll();
            } catch (error) {
                throw error;
            }
        };

        const changePage = async(newPage:number)=>{
            page.value = newPage;
            await fetchAll()
        }

        const changeSize = async(newSize:number)=>{
            size.value = newSize;
            await fetchAll();
        }

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
            loading,
            size,
            page,
            totalElements,
            changePage,
            changeSize
        };
    });
}
