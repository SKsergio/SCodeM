<template>
    <label>{{ lbl }}</label>
    <input type="text" v-model="campo" :readonly="props.editable">
    <h1>{{ campo }}</h1>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { useEditRecordStore } from '@/store/RecordCatalog';
    import {ref, onMounted} from 'vue';

    const editStore = useEditRecordStore();

    const props = withDefaults(defineProps<{
        // field: T[keyof T];
        // label:string,
        editable?:boolean
    }>(),{
        editable:true
    })

    let campo = ref(editStore.record.code) //label
    let lbl = ref(editStore.editFiles) //campo

    onMounted(()=>{
        console.log(lbl.value)
    })
</script>

<style scoped>
    input{
        /* color: black; */
    }
</style>