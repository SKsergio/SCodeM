<template>
    <div>
        <HeaderComponent :title="'Degrees'"></HeaderComponent>
        <div class="conatiner_crud">
            <SlideComponent :items="Degrees"></SlideComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue'; 
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { onMounted } from 'vue';
    import { GetAllDegrees } from '@/services/Catalogues/DegreeService';

    onMounted(async()=>{
        try {
            const Degrees = await GetAllDegrees();
            console.log(Degrees);
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
        }
    })


</script>

<style scoped>
    .conatiner_crud{
        width: 94%;
        margin: 0 auto;
        margin-top: -16px;
    }
</style>
