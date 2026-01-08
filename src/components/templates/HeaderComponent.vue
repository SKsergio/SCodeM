<template>
    <div class="header__general">
        <h1>{{ title }}</h1>
        <div class="action_filters">
            <filters-component :endpoint="props.endpoint" :store_id="props.store_id"></filters-component>
        </div>
        <BtnAddComponent @open-modal-click="(clickModalOpen)" />
    </div>
</template>

<script setup lang="ts" generic="T">
import FiltersComponent from '../generics/FiltersComponent.vue';
import BtnAddComponent from '../buttons/BtnAddComponent.vue'

//PROPS
const props = defineProps<{
    store_id: string,
    endpoint: string,
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
    border-radius: 0 0 10px 10px;
    align-items: center; 
    gap: 15px; 
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

    .inputs__continer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }
}

.action_filters {
    position: relative;
    z-index: 10;
    margin-left: auto;
}

.datepicker-sm {
    width: 210px;
    font-size: 1.9rem;
    padding: 4px 8px;
}
</style>