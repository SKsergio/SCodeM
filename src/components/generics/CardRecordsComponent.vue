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
    import { ShowDeleteAlert } from '../alerts/DeleteAlert';
    import { ref, Ref, computed, reactive} from 'vue';
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import BtnDeleteComponent from '../buttons/BtnDeleteComponent.vue';
    import BtnUpdateComponent from '../buttons/BtnUpdateComponent.vue';
    import BtnCancelComponent from '../buttons/BtnCancelComponent.vue';
    import BtnSaveComponent from '../buttons/BtnSaveComponent.vue';
    import InputComponent from '../inputs/InputComponent.vue';

    let flag : Ref<boolean> = ref(true)

    //define props
    const props = defineProps<{
        records: T,
        store_id: string,
        endpoint: string
    }>()

    const store = useCatalogueStore<T>(props.store_id, props.endpoint)()

    // Estado local para el registro editable
    const localRecord = reactive({ ...props.records }) as T
    const fields = computed(() => store.editableFields)
    let originalRecord = {} as T;//copiando del registro en caso que se cancele la accion

    //delete event(manda emit)
    const onDeleteClick =()=>{
        //llamamos al store para eliminarlo
        ShowDeleteAlert(()=>store.DeleteRecord(props.records.id, props.endpoint))
    }

    //update event(ejecuta la funcion aca)
    const onUpdateClick = ()=>{
        flag.value = false
        //creamos la copia del registro original
        originalRecord = {...localRecord}
    }

    //cancel event(ejecuta la funcion aca)
    const onCancelClick = ()=>{
        Object.assign(localRecord, originalRecord)//sirve para restaurar los valores de un componente  
        flag.value = true;
    }

    //save event(ejeuta la funcion aca)
    const onSaveClick = async() =>{
        //HACEMSO LA VALIDACION Y ES NECESARIO PASARLO A JSON  PARA QUE VALIDE BIEN
        if (JSON.stringify(localRecord) == JSON.stringify(originalRecord)) {
            InfoMessageAlert('Los datos son excatamente iguales', 'no se puede actualizar el registro')
            return 0
        }else{
            const confirmed = await ShowUpdateAlert(originalRecord.code , ()=>SaveRecord())
            if (confirmed){
                flag.value = confirmed
            }
        }
    }

    //save function
    const SaveRecord = async() =>{
        let UpdateRecord
        try {
            UpdateRecord = await store.updateRecord(localRecord.id, localRecord ,props.endpoint)
            console.log(UpdateRecord);
            Object.assign(localRecord, UpdateRecord)
        } catch (error:any) {
            console.log('el erro e:', error);
            throw error
        }
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