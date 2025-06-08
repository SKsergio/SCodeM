<template>
    <label>{{ field }}</label>
    <input type="text" v-model="campo" :readonly="props.editable">
    <h1>{{ campo }}</h1>
</template>

<script setup lang="ts" generic="T">
    import { useEditRecordStore } from '@/store/RecordCatalog';
    import {ref, onMounted} from 'vue';

    const editStore = useEditRecordStore<T>();

    const props = withDefaults(defineProps<{
        field: keyof T;
        editable?:boolean
    }>(),{
        editable:true
    })  
    //idea para arreglar esto
    /*TIPAR EL FIELD COMO UN T, PERO DE ALGUNA MANERA SACAR YA SEA LOS MEROS VALORES DE T O INCLUSIVE, SACAR EL 
    KEY DE T PARA QUE COINCIDAN CON EL TIPO DE ARRIBA*/

    let campo = ref(editStore.record[props.field]) //label

    onMounted(()=>{
        console.log('valor es '+ campo.value)
        console.log(props.field)
    })
</script>

<style scoped>
    input{
        color: black; 
    }
</style>