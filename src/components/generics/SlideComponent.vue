<template>    
    <div class="slide__cotainer" v-if="actionRecords">
        <section class="slide_content" v-for="(item) in actionRecords[0].records" :key="item.id">
            <!-- <CardRecordsComponent :actions-records="actionRecords"></CardRecordsComponent> -->
            <CardRecordsComponent :records="item" :edit-files="actionRecords[0].editableFields"></CardRecordsComponent>

        </section>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';
    import { RecordsActionData } from '@/interfaces/templates/CatalogDataInterface';
    import CardRecordsComponent from './CardRecordsComponent.vue';
    import { ref, Ref ,onMounted } from 'vue';

    const props = defineProps<{
        metaData:CatalogMetaData<T>
    }>()

    //desuctructurar los componentes de metaData
    let records: Ref<T[]> = ref([]);//asi le indicamos que no esta undefined al principio, sino que esta con un array vacio

    let actionRecords = ref<RecordsActionData<T>[]>();

    onMounted(()=>{
        records.value = props.metaData.records
        actionRecords.value =[{
            records:records.value,
            editableFields: props.metaData.editableFields
        }]
        console.log(actionRecords.value);

    })
</script>

<style scoped>
    @import url('@/css/variables.css');
    .slide__cotainer{
        background: var(--color-third);  
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 30px;
        border-radius: 25px 5px 25px 5px;
    }
    .slide_content{
        /* margin: 0 40px; */
    }
    .btn_linker{
        background-color: rgb(30, 6, 54);
        width: 100%;
        height: 100%;
    }
</style>