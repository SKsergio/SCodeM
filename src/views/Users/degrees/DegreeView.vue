<template>
    <div v-if="metaDataDegree">
        <HeaderComponent :meta-data="metaDataDegree"></HeaderComponent>
        <div class="conatiner_crud">
            <SlideComponent :meta-data="metaDataDegree!" @refresh_records="refresh"></SlideComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue'; 
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { onMounted, ref } from 'vue';
    import { GetAllRecordsCatalogues } from '@/services/Catalogues/CatalogueServices';
    import { DegreeInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { AssambleMetaData } from '@/utils/MetaDataProcess';
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';

    //store records of degrees
    const degrees = ref<DegreeInterface[]>([])

    //declare the reactive var
    const metaDataDegree = ref<CatalogMetaData<DegreeInterface>>()

    const refresh = ()=>{
        callRecords()
    }

    onMounted(()=>{
        callRecords()
    })

    const callRecords = async()=>{
        try {
            //set the records of data and asign to the reactive var
            degrees.value = await GetAllRecordsCatalogues<DegreeInterface>('degrees');
    
            //call the funcion to assmable our structure
            metaDataDegree.value = AssambleMetaData<DegreeInterface>(
                degrees.value,
                'Degrees',
                'degrees',
                'Teacher',
                ['code','name']
            )
            console.log(metaDataDegree.value.records);
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
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
