<template>
    <div v-if="metaDataClassrooms">
        <HeaderComponent :meta-data="metaDataClassrooms"></HeaderComponent>
        <div class="conatiner_crud">
            <SlideComponent :meta-data="metaDataClassrooms!" @refresh_records="refresh"></SlideComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import HeaderComponent from '@/components/templates/HeaderComponent.vue'; 
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { GetAllRecords } from '@/services/Catalogues/DegreeService';
    import { ClassromInterface } from '@/interfaces/Catalogues/CataloguesInterface';
    import { AssambleMetaData } from '@/utils/MetaDataProcess';
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';

    //store records of degrees
    const classrooms = ref<ClassromInterface[]>([])

    //declare the reactive var
    const metaDataClassrooms = ref<CatalogMetaData<ClassromInterface>>()

    const refresh = ()=>{
        callRecords()
    }

    onMounted(()=>{
        callRecords()
    })

    const callRecords = async()=>{
        try {
            //set the records of data and asign to the reactive var
            classrooms.value = await GetAllRecords<ClassromInterface>('classrooms');
    
            //call the funcion to assmable our structure
            metaDataClassrooms.value = AssambleMetaData<ClassromInterface>(
                classrooms.value,
                'Classrooms',
                'classrooms',
                'Teacher',
                ['code','name',]
            )
            console.log(metaDataClassrooms.value.records);
        } catch (error) {
            console.error("No se pudieron cargar los salones académicos.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
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
