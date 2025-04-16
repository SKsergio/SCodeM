<template>
    <div class="slide">
        <section class="slide_items" v-for="(item, index) in elements" :key="index">
            <BtnComponent :name="item"></BtnComponent>
        </section>
    </div>
</template>

<script setup lang="ts">
    import BtnComponent from '../buttons/BtnComponent.vue';
    defineProps<{
        algo:string
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
        'Seprimo Grado'
    ]
</script>

<style scoped>
    @import url('@/css/variables.css');
    .slide{
        background: var(--color-eight);  
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 38px;
        padding: 30px;
        border-radius: 20px 5px 20px 5px;
    }
    .slide_items{
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        height: 50px;
    }
    .btn_linker{
        background-color: rgb(30, 6, 54);
        width: 100%;
        height: 100%;
    }
</style>