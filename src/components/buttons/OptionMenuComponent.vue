<template>
   <article>
        <component :is="icon" class="svg_item"/>
        <span class="list_span">Degrees</span>
    </article>
</template>

<script setup lang="ts">
    import type { Component } from 'vue';

    //DEFINIENDO LOS PROPS
    defineProps<{
        icon:Component,
    }>();


</script>

<style scoped>
    /* disign to the links */
    article{
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        text-decoration: none;
        border-radius: 10px;
        color: var(--color-text1);
        gap: 12px;
    }
    article:hover{
        background: var(--color-text-hover);
    }
    /* design to the icons */
    .svg_item{
        min-width: 30px;
        width: 30px;
        margin-left: 4px;
    }
</style>