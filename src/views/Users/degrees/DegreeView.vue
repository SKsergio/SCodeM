<template>
    <div v-if="metaData">
        <HeaderComponent :meta-data="metaData"></HeaderComponent>
        <div class="conatiner_crud">
            <SlideComponent :meta-data="metaData"></SlideComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue'; 
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { onMounted, ref } from 'vue';
    import { GetAllDegrees } from '@/services/Catalogues/DegreeService';
    import { DegreeInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';//metadata interfaz

    //store records of degrees
    const degrees = ref<DegreeInterface[]>([])
    //store metaData
    const metaData = ref<CatalogMetaData<DegreeInterface>>()

    onMounted(async()=>{
        try {
            degrees.value = await GetAllDegrees();
            AssambleMetaData(degrees.value)
            console.log(degrees);
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
        }
    })

    //FUNCTION TO ASSAMBLE THE INTERFAZ
    const AssambleMetaData = (Data:DegreeInterface[])=>{
        metaData.value = {
            title:'Degrees',
            api_name: 'degree',
            records:Data,
            type_user:'Teacher',
            actions:[]
        }
    }


</script>

<style scoped>
    .conatiner_crud{
        width: 94%;
        margin: 0 auto;
        margin-top: -16px;
    }
</style>
