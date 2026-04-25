<template>
    <div class="header__general">
        <h1>{{ title }}</h1>
        <BtnAddComponent @open-modal-click="(clickModalOpen)" />
    </div>
</template>

<script setup lang="ts" generic="T">
import BtnAddComponent from '../buttons/BtnAddComponent.vue'

//PROPS
const props = defineProps<{
    store_id?: string,
    endpoint?: string, //esto lo vamos a quitar de todas partes
    title: string
}>()

//EMITS
const emits = defineEmits<{
    (e: 'open-modal'): void
}>()

//emision de evento para abrir modal
const clickModalOpen = () => {
    emits('open-modal')
}
</script>

<style scoped>
@import url('../../css/variables.css');

/*importamos las variables*/
.header__general {
    background-color: var(--color-fifth);
    width: 100%;
    height: 145px;
    display: flex;
    flex-direction: row;
    border-radius: 0 0 10px 10px;
    align-items: center; 
    justify-content: space-between;
    padding-right: 40px; 
    flex-wrap: wrap;
    border-bottom: 2px solid var(--color-lines);

    >h1 {
        font-family: var(--font-decoration1);
        font-weight: 400;
        font-size: 2.9rem;
        font-style: normal;
        color: rgb(236, 232, 225);
        margin-left: 40px;
    }
}

.datepicker-sm {
    width: 210px;
    font-size: 1.9rem;
    padding: 4px 8px;
}
</style>