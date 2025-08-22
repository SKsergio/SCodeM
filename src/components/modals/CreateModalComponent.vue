<template>
    <div class="model_new_record" v-if="props.showModal">

        <XCircleIcon class="icon_close" @click="cancelAction()"></XCircleIcon>
        <form action="" method="post" class="form">

            <section class="input__ct" v-for="(field, index) in props.fields_create" :key="index">
                <!-- aca vamos a validar que el campo sea de tipo de fecha para mandar a traer otro input -->
                <InputComponent :field="field" v-model="createRecord[field as keyof typeof createRecord]" />

                <!-- <label :for="String(field)">{{ field }}</label>
                <input type="text" :id="String(field)"> -->
            </section>
            
            <section class="btn_sections">
                <button @click="saveData()">Save</button>
                <button>Clean</button>
                <button @click="cancelAction()">Cancelar</button>
            </section>
        </form>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import InputComponent from '../inputs/InputComponent.vue';
    import { XCircleIcon } from '@heroicons/vue/24/solid';
    import { onMounted, reactive } from 'vue';
    import { useModalStore } from '@/store/CreateModel';
    const ModelManage =  useModalStore();

    //lo que en verdad debo hacer es crear una instancia del objeto para luego solo actualizarlo con los campos de arriba 
    //y luego hacer ese envio con el boton de save
    const props = defineProps<{
        fields_create: (keyof T)[],
        showModal: Boolean
    }>()

    //lo inicializamos vacio para que solo tome el shape al momento de asignarle valores
    const createRecord = reactive({}) as T

    onMounted(()=>{
        console.log(createRecord);
    })

    const saveData=()=>{
        console.log(createRecord)
        alert(createRecord)
    }

    const cancelAction = () =>{
        ModelManage.HideCreateModal()
    }
</script>

<style scoped>
.model_new_record{
    position: fixed;
    right: 0;
    left: 0;
    width: 50%;
    min-height: 30%;
    margin: 0 auto;
    background: rgba(27, 88, 104, 0.993);
    border-radius: 30px;
    z-index: 30;
}
.form{
    padding: 40px;
    display: flex;
    flex-direction: column;    
    justify-content: center;
    align-items: center;
    gap: 15px;
}
.btn_sections{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}
.icon_close{
    width: 45px;
    position: absolute;
    right: 15px;
    top: 5px;
    cursor: pointer;
    color: rgb(70, 13, 13);
    transition: all .5s ease;
}
.icon_close:hover{
    transform: scale(1.1);
}
</style>