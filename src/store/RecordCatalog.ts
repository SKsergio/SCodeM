import { defineStore } from 'pinia';
import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
import { updateRecord } from '@/services/api';

export const useEditRecordStore = defineStore('editRecord',{
    state:():{record:AbstractCatalog}=>({
        record:{
            id:0,
            name:'',
            code:'',
            description:'',
            created_at:'',
            updated_at:''
        }
    }),
    actions:{
        setRecord(newRecord:AbstractCatalog){
            this.record = newRecord
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