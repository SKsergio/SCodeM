<template>
    <label for="">{{ lbl }}</label>
    <input type="text" v-model="campo">
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { ref } from 'vue';

    const props = defineProps<{
        field: T[keyof T];
        label:string
    }>()

    let campo = ref(props.field)
    let lbl = ref(props.label)

</script>

<style scoped>
    input{
        /* color: black; */
    }
</style>