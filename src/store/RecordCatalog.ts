import { defineStore } from 'pinia';
import { Ref, ref } from 'vue';
import { httpPut } from '@/services/api';

export function useEditRecordStore<T>(){
    return defineStore('editRecord',()=>{
        const record : Ref<Partial<T>> = ref({})
        const editFields = ref<(keyof T)[]>([])

        const setRecord = (newRecords:T)=>{
            record.value = newRecords
        }

        const setEditableFields=(fields:(keyof T)[])=>{
            editFields.value = fields
        }

        async function updateRecord(id:number, updateData:Partial<T>, url:string){
            try {
                const response = await httpPut(url,updateData, id)
                console.log(response);
            } catch (error) {
                
            }
        }

        return {record, editFields, setRecord, setEditableFields, updateRecord}
    })()
}