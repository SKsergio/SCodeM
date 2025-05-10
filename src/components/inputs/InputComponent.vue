<template>
    <label :for="lbl">{{ lbl }}</label>
    <input type="text" v-model="campo" :id="lbl" :readonly="props.editable">
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { ref, onMounted } from 'vue';

    const props = withDefaults(defineProps<{
        field: T[keyof T];
        label:string,
        editable?:boolean
    }>(),{
        editable:true
    })

    let campo = ref(props.field)
    let lbl = ref(props.label)

    onMounted(()=>{
        console.log('campos a editar:'+ props.label);
        console.log('dato del campo:'+ props.field);
    })

</script>

<style scoped>
    input{
        /* color: black; */
    }
</style>