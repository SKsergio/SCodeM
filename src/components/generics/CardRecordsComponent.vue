<template>
    <div class="card__wrapper">
        <div class="card">
            <div class="header_card">
                <h1>{{ name  }}</h1>
            </div>
            <span class="overlay">

            </span>
            <div class="card_content">
                <h2>Code: GRD001</h2>
                <h4>Created at: 10-04-2025</h4>

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
    defineProps<{
        name:string
    }>()
</script>

<style scoped>
    @import url('@/css/variables.css');
    .card__wrapper{
        min-width: 300px;
        /* width: 300px; */
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