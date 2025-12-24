<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent 
                :endpoint="'catalog/sections'" 
                :store_id="'catalogue-sections'"
                :title="'Sections'">
            </HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :endpoint="'catalog/sections'" :store_id="'catalogue-sections'"></SlideComponent>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { SectionInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted } from 'vue';
    const store = useCatalogueStore<SectionInterface>('catalogue-sections', 'catalog/sections')()


    onMounted(() => {
        store.loadEditableFields(['name', 'code'])
        callRecords()
    })

    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            console.error("No se pudieron cargar las secciones académicas.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
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
   
</style>
