<template>
    <div>
        <HeaderComponent :title="'Degrees'"></HeaderComponent>
        <div class="conatiner_crud">
            <SlideComponent :algo="'jijija'"></SlideComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue'; 
    import SlideComponent from '@/components/generics/SlideComponent.vue';
</script>

<style scoped>
    .conatiner_crud{
        width: 94%;
        margin: 0 auto;
        margin-top: -16px;
    }
</style>
