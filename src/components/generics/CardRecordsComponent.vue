<template>
    <div class="card__wrapper">
        <div class="card">
            <div class="header_card">
                <h1>{{records.id}}</h1>
            </div>
            <span class="overlay">

            </span>
            <div class="card_content">
                <div class="inputs__ct" v-for="(field) in fields">
                    <InputComponent :editable="flag" :field="field" v-model="localRecord[field as keyof typeof localRecord]" />
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
    import { ShowUpdateAlert } from '../alerts/UpdateAlert';
    import { InfoMessageAlert } from '../alerts/InfoAlert';
    import { ref, Ref, computed, reactive} from 'vue';
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { PatchCatalog } from '@/services/Catalogues/CatalogueServices';
    import BtnDeleteComponent from '../buttons/BtnDeleteComponent.vue';
    import BtnUpdateComponent from '../buttons/BtnUpdateComponent.vue';
    import BtnCancelComponent from '../buttons/BtnCancelComponent.vue';
    import BtnSaveComponent from '../buttons/BtnSaveComponent.vue';
    import InputComponent from '../inputs/InputComponent.vue';

    let flag : Ref<boolean> = ref(true)

    //define emits
    const emit  = defineEmits<{
        (e:'delete_record', id:number):void
    }>()

    //define props
    const props = defineProps<{
        records: T,
        editFiles: (keyof T)[],
        nameCatalogue:string
    }>()

    // Estado local para el registro editable
    const localRecord = reactive({ ...props.records }) as T
    const fields = computed(() => props.editFiles)
    let originalRecord = {} as T;//copia del registro en caso que se cancele la accion

    //delete event(manda emit)
    const onDeleteClick = ()=>{
        emit('delete_record', props.records.id)
    }

    //update event(ejecuta la funcion aca)
    const onUpdateClick = ()=>{
        flag.value = false
        //creamos la copia del registro original
        originalRecord = {...localRecord}
    }

    //cancel event(ejecuta la funcion aca)
    const onCancelClick = ()=>{
        //devolver los valores antiguos
        Object.assign(localRecord, originalRecord)//sirve para restaurar los valores de un componente  
        flag.value = true;
    }

    //save event(ejeuta la funcion aca)
    const onSaveClick = () =>{
        //HACEMOS LA VALIDACION Y ES NECESARIO PASARLO A JSON  PARA QUE VALIDE BIEN
         if (JSON.stringify(localRecord) == JSON.stringify(originalRecord)) {
            InfoMessageAlert('Grado')
            return 0
        }else{
            ShowUpdateAlert(originalRecord.code , ()=>SaveRecord())//llamanos la funcion para actualizar
            flag.value = true
        }
    }

    //save function
    const SaveRecord = async() =>{
        PatchCatalog<T>(localRecord.id, localRecord ,props.nameCatalogue)
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