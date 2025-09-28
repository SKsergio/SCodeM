<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loadSpinner">
            <Load2Component></Load2Component>
        </div>
        <div v-if="metaDataDegree">
            <HeaderComponent :meta-data="metaDataDegree"></HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :meta-data="metaDataDegree!" @refresh_records="refresh"></SlideComponent>
            </div>
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
    import Load2Component from '@/components/loaders/Load2Component.vue';

    //store records of degrees
    const degrees = ref<DegreeInterface[]>([])
    //spinner
    const loadSpinner = ref(false)

    //declare the reactive var
    const metaDataDegree = ref<CatalogMetaData<DegreeInterface>>()

    const refresh = () => {
        callRecords()
    }

    onMounted(() => {
        callRecords()
    })

    const callRecords = async () => {
        try {
            loadSpinner.value = true;
            //set the records of data and asign to the reactive var
            degrees.value = await GetAllRecordsCatalogues<DegreeInterface>('degrees');

            //call the funcion to assmable our structure
            metaDataDegree.value = AssambleMetaData<DegreeInterface>(
                degrees.value,
                'Degrees',
                'degrees',
                'Teacher',
                ['code', 'name']
            )
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
        } finally {
            loadSpinner.value = false
        }
    }
</script>

<style scoped>
    .conatiner_crud {
        width: 94%;
        margin: 0 auto;
        margin-top: -16px;
    }
    .conatiner__data_load{
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .loadeer_container {
        position: fixed;
        top: 0;
        height: 100%;
        left: 0;
        right: 0;
        background-color: rgba(48, 46, 46, 0.822);
        z-index: 99;
    }
</style>
