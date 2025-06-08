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
                <div class="inputs__ct" v-for="(field) in fields">
                    <InputComponent :editable="flag" :field="field"></InputComponent> <!--el problema es que si lo mandamos asi no llega tipado-->
                </div>
                <h4>Created at: {{ records.created_at}}</h4>

                <section class="actions" v-if="flag">
                    <BtnUpdateComponent @update_click="(onUpdateClick)"></BtnUpdateComponent>
                    <BtnDeleteComponent @delete_click="(onDeleteClick)"></BtnDeleteComponent>
                </section>
                <section class="actions" v-else>
                    <BtnSaveComponent @save_click="(onSaveClick)"></BtnSaveComponent>
                    <BtnCancelComponent @cancel_click="(onCancelClick)"></BtnCancelComponent>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import BtnDeleteComponent from '../buttons/BtnDeleteComponent.vue';
    import BtnUpdateComponent from '../buttons/BtnUpdateComponent.vue';
    import BtnCancelComponent from '../buttons/BtnCancelComponent.vue';
    import BtnSaveComponent from '../buttons/BtnSaveComponent.vue';
    import InputComponent from '../inputs/InputComponent.vue';
    import { useEditRecordStore } from '@/store/RecordCatalog';
    import { ref, Ref, computed } from 'vue';

    let flag : Ref<boolean> = ref(true)
    const editStore = useEditRecordStore<T>();

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
    }
    //delete event
    const onCancelClick = ()=>{
       flag.value = true
    }
    //save event
    const onSaveClick = ()=>{
        alert('vamos actualizar eto')
    }

    editStore.setRecord(props.records)
    editStore.setEditableFields(props.editFiles)

    const fields = computed(() => editStore.editFields as (keyof T)[]);
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
        /* height: 260px;
        max-height: 270px; */
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