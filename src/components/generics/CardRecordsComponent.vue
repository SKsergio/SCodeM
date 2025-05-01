<template>
    <div class="card__wrapper">
        <div class="card">
            <div class="header_card">
                <h1>{{'hola'}}</h1>
            </div>
            <span class="overlay">

            </span>
            <div class="card_content">
                <!-- estos seran emplazados con los datos que recibamos del registro -->
                 <!-- <div class="inputs__ct" v-for="(item) in records" :key="records.id">
                    <InputComponent ></InputComponent>

                 </div>
                <h2>Code: {{records.code}}</h2>
                <h2>Name: {{ records.name }}</h2>
                <h4>Created at: {{ records.created_at }}</h4> -->
                <!-- nota: convertir las fehcas a formatos de dias exactos, con horas pero sin milisegundos -->

                <section class="actions">
                    <BtnUpdateComponent></BtnUpdateComponent>
                    <BtnDeleteComponent></BtnDeleteComponent>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { RecordsActionData } from '@/interfaces/templates/CatalogDataInterface';
    import BtnDeleteComponent from '../buttons/BtnDeleteComponent.vue';
    import BtnUpdateComponent from '../buttons/BtnUpdateComponent.vue';
    import InputComponent from '../inputs/InputComponent.vue';
    import { onMounted,ref } from 'vue';

    let actionRecordsv = ref<RecordsActionData<T>>()

    // const props = defineProps<{
    //     actionsRecords : RecordsActionData<T>
    // }>()

    const props = defineProps<{
        records: T,
        editFiles: (keyof T)[]
    }>()


    // onMounted(()=>{
    //     actionRecordsv.value = props.actionsRecords
    //     console.log(actionRecordsv.value.records)
    //     console.log(actionRecordsv.value.editableFields)
       
    // })

    onMounted(()=>{
        console.log(props.records)
        console.log(props.editFiles)
    })

</script>

<style scoped>
    @import url('@/css/variables.css');
    .card__wrapper{
        font-family: var( --font-v1);
        font-style:normal;
    }
    .card{
        min-width: 300px;
        width: 300px;
        height: 260px;
        max-height: 270px;
        /* overflow-y: auto; */
        color: white;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 25px;
        background: var(--color-seventh);
        padding-bottom: 10px;
    }
    .card_content{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        text-align: center;
        gap: 12px;
        align-items: center;
        padding: 10px, 14px;
    }
    .header_card{
        display: flex;
        flex-direction: row;
        font-family: var( --font-decoration2);
        background: var( --color-sixth);
        > h1 {
            margin-left: 6px;
        }
    }
    .actions{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>