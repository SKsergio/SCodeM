import { defineStore } from 'pinia';
import { ref } from 'vue';
//importamos las funciones del crud
import {
    GetAllManagers,
    GetFilterManagers,
    DeleteManager,
    PatchManager,
    CreateManager
} from '@/services/Students/StudentManagerService';

//importando tipos
import {
    StudentManagerPayload,
    StudentManagerResponse
} from "@/interfaces/students/StudentManagers";


export const useStudentManagerStore = defineStore('studentManager', () => {
    const managers = ref<StudentManagerResponse[]>([]);
    const lengthRecords = ref(0)
    let loading = ref(false);

    const fetchManagers = async (): Promise<void> => {
        try {
            loading.value = true;
            managers.value = await GetAllManagers();
            lengthRecords.value = managers.value.length
        } catch (error) {
            console.error(`Error fetching in studenManagers:`, error);
            throw error;
        } finally {
            loading.value = false
        }
    }

    return{
        fetchManagers,
        managers,
        loading
    }

})

