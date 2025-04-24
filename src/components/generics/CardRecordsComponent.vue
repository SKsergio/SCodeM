<template>
    <div class="card__wrapper">
        <div class="card">
            <div class="header_card">
                <h1>{{ records.code  }}</h1>
            </div>
            <span class="overlay">

            </span>
            <div class="card_content">
                <!-- estos seran emplazados con los datos que recibamos del registro -->
                <h2>Code: {{records.code}}</h2>
                <h2>Name: {{ records.name }}</h2>
                <h4>Created at:{{ records.created_at }}</h4>
                <!-- nota: convertir las fehcas a formatos de dias exactos, con horas pero sin milisegundos -->

                <section class="actions">
                    <BtnUpdateComponent></BtnUpdateComponent>
                    <BtnDeleteComponent></BtnDeleteComponent>
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import BtnDeleteComponent from '../buttons/BtnDeleteComponent.vue';
    import BtnUpdateComponent from '../buttons/BtnUpdateComponent.vue';
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';

    const props = defineProps<{
        records : AbstractCatalog
    }>()

</script>

<style scoped>
    @import url('@/css/variables.css');
    .card__wrapper{
        min-width: 300px;
        width: 300px;
        font-family: var( --font-v1);
        font-style:normal;
    }
    .card{
        color: white;
        display: flex;
        flex-direction: column;
        gap: 10px;
        border-radius: 25px;
        background: var(--color-seventh);
        padding-bottom: 10px;
    }
    .card_content{
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        gap: 9px;
        align-items: center;
        padding: 10px, 14px;
    }
    .header_card{
        display: flex;
        flex-direction: row;
        font-family: var( --font-decoration2);
        background: var( --color-sixth);
        > h1 {
            margin-left: 6px;
        }
    }
    .actions{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }
</style>