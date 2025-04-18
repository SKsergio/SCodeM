<template>
    <section class="header__general">
        <h1>{{title}}</h1>
    </section>
</template>

<script setup lang="ts">
    //defind our props
    defineProps<{
        title:string
    }>()

</script>

<style scoped>
    @import url('../../css/variables.css'); /*importamos las variables*/
    .header__general{
        background-color: var(--color-fifth);
        width: 100%;
        height: 145px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        border-radius: 0 0 10px 10px;
        > h1{
            font-family: var(--font-decoration1);
            font-weight: 400;
            font-size: 2.9rem;
            font-style: normal;
            color: rgb(236, 232, 225);
            margin-left: 30px;
        }
    }
</style>