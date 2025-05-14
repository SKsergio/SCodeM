<template>
    <label>{{ field }}</label>
    <input type="text" v-model="campo" :readonly="props.editable">
    <h1>{{ campo }}</h1>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { useEditRecordStore } from '@/store/RecordCatalog';
    import {ref, onMounted} from 'vue';

    const editStore = useEditRecordStore<T>();

    const props = withDefaults(defineProps<{
        field: keyof T;
        editable?:boolean
    }>(),{
        editable:true
    })  

    let campo = ref(editStore.record[props.field]) //label
    let lbl = ref(editStore.editFields) //campo

    onMounted(()=>{
        console.log(lbl.value)
    })
</script>

<style scoped>
    input{
        /* color: black; */
    }
</style>