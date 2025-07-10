<template>    
    <div class="slide__cotainer" v-if="actionRecords">
        <section class="slide_content" v-for="(item) in actionRecords[0].records" :key="item.id">
            <CardRecordsComponent 
                :records="item" 
                :edit-files="actionRecords[0].editableFields"
                :name-catalogue="metaData.api_name"
                @delete_record="(HandleDelete)"
            />
        </section>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import {computed } from 'vue';
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';
    import { RecordsActionData } from '@/interfaces/templates/CatalogDataInterface';
    import { DeleteCatalog } from '@/services/Catalogues/CatalogueServices';
    import { ShowDeleteAlert } from '../alerts/DeleteAlertComponent';
    import CardRecordsComponent from './CardRecordsComponent.vue';
    
    //PROPS
    const props = defineProps<{
        metaData:CatalogMetaData<T>
    }>()
    //EMITS
    const emit = defineEmits<{
        (e:'refresh_records'):void
    }>()

    //desuctructurar los componentes de metaData
    let actionRecords = computed<RecordsActionData<T>[]>(()=>[{
        records:props.metaData.records,
        editableFields: props.metaData.editableFields//editable fields to metaData
    }]);


    //Create delete function
    const DeleteRecord = async(id:number) =>{
        await DeleteCatalog(id, props.metaData.api_name);
        emit('refresh_records'); 
    }

    //Call delete function
    const HandleDelete=(id:number)=>{
        ShowDeleteAlert(()=>DeleteRecord(id))
    }

</script>

<style>
    @import url('@/css/variables.css');
    .slide__cotainer{
        background: var(--color-third);  
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 30px;
        border-radius: 25px 5px 25px 5px;
    }
  
</style>