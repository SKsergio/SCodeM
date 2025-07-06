<template>
    <div v-if="metaDataPeriods">
        <HeaderComponent :meta-data="metaDataPeriods"></HeaderComponent>
        <div class="conatiner_crud">
            <SlideComponent :meta-data="metaDataPeriods!" @refresh_records="refresh"></SlideComponent>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, ref } from 'vue';

    import HeaderComponent from '@/components/templates/HeaderComponent.vue'; 
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { GetAllRecordsCatalogues } from '@/services/Catalogues/CatalogueServices';
    import { PeriodInterface } from '@/interfaces/Catalogues/CataloguesInterface';
    import { AssambleMetaData } from '@/utils/MetaDataProcess';
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';

    //store records of degrees
    const periods = ref<PeriodInterface[]>([])

    //declare the reactive var
    const metaDataPeriods = ref<CatalogMetaData<PeriodInterface>>()

    const refresh = ()=>{
        callRecords()
    }

    onMounted(()=>{
        callRecords()
    })

    const callRecords = async()=>{
        try {
            //set the records of data and asign to the reactive var
            periods.value = await GetAllRecordsCatalogues<PeriodInterface>('periods');
    
            //call the funcion to assmable our structure
            metaDataPeriods.value = AssambleMetaData<PeriodInterface>(
                periods.value,
                'Periods',
                'periods',
                'Teacher',
                ['code','name','date_from','date_until']
            )
            console.log(metaDataPeriods.value.records);
        } catch (error) {
            console.error("No se pudieron cargar los periodos académicos.");
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
