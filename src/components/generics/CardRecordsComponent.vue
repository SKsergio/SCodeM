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
                <div class="inputs__ct" v-for="(fields, index) in editFiles" :key="index">
                    <InputComponent :field="records[fields]" :label="String(fields)" :editable="flag"></InputComponent>
                 </div>
                <h4>Created at: {{ records.created_at}}</h4>
                <!-- nota: convertir las fehcas a formatos de dias exactos, con horas pero sin milisegundos -->

                <section class="actions">
                    <BtnUpdateComponent @update_click="(onUpdateClick)"></BtnUpdateComponent>
                    <BtnDeleteComponent @delete_click="(onDeleteClick)"></BtnDeleteComponent>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import BtnDeleteComponent from '../buttons/BtnDeleteComponent.vue';
    import BtnUpdateComponent from '../buttons/BtnUpdateComponent.vue';
    import InputComponent from '../inputs/InputComponent.vue';
    import { ref, Ref } from 'vue';

    let flag : Ref<boolean> = ref(true)

    //define emits
    const emit  = defineEmits<{
        (e:'delete_record', id:number):void
    }>()

    //define props
    const props = defineProps<{
        records: T,
        editFiles: (keyof T)[]
    }>()

    //delete event
    const onDeleteClick = ()=>{
        emit('delete_record', props.records.id)
    }

    //update event
    const onUpdateClick = ()=>{
        flag.value = false
        console.log(flag.value);
    }


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