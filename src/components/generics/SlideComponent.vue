<template>    
    <div class="slide__cotainer">
        <section class="slide_content" v-for="(item, index) in elements" :key="index">
            <CardRecordsComponent :name="item"></CardRecordsComponent>
        </section>
    </div>
</template>

<script setup lang="ts">
    import CardRecordsComponent from './CardRecordsComponent.vue';
    import { DegreeInterface } from '@/interfaces/Catalogues/CataloguesInterface';
    defineProps<{
        items:DegreeInterface
    }>()

    const elements = [
        'kinder',
        'Preparatoria',
        'Primer grado',
        'Segundo Grado',
        'Tercer Grado',
        'Cuarto Grado',
        'Quinto Grado',
        'Sexto Grado',
        'Seprimo Grado',
        'Octavo Grado',
        'Noveno Grado'
    ]
</script>

<style scoped>
    @import url('@/css/variables.css');
    .slide__cotainer{
        background: var(--color-third);  
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 30px;
        border-radius: 25px 5px 25px 5px;
    }
    .slide_content{
        /* margin: 0 40px; */
    }
    .btn_linker{
        background-color: rgb(30, 6, 54);
        width: 100%;
        height: 100%;
    }
</style>