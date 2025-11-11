<template>
    <div class="header__general">
        <h1>{{ props.endpoint }}</h1>
        <div class="action_filters">
            <filters-component :endpoint="props.endpoint" :store_id="props.store_id"></filters-component>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
    import FiltersComponent from '../generics/FiltersComponent.vue';

    const props = defineProps<{
        store_id: string,
        endpoint: string
    }>()
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
    justify-content: space-between;
    border-radius: 0 0 10px 10px;
    flex-wrap: wrap;
    align-content: center;

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
        margin-right: 50px;
        gap: 20px;
    }
}

.action_filters {
    position: relative;
    z-index: 10;
}

.datepicker-sm {
    width: 210px;
    font-size: 1.9rem;
    padding: 4px 8px;
}
</style>