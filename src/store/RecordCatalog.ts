import { defineStore } from 'pinia';
import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
import { updateRecord } from '@/services/api';

export const useEditRecordStore = defineStore('editRecord',{
    state: () => ({
        record: {} as Partial<AbstractCatalog>,
        editFiles: [] as (keyof AbstractCatalog)[]
    }),
    actions:{
        setRecord(newRecord:AbstractCatalog){
            this.record = newRecord
        },
        setEditFields(editFiles: (keyof AbstractCatalog)[]){
            this.editFiles = editFiles
        },
        async updateRecord(id:number, updateData:Partial<AbstractCatalog>, url:string){
            try {
                const response = await updateRecord(url,updateData, id)
                console.log(response);
            } catch (error) {
                
            }
        }
    }
});