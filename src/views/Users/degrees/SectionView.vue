<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="loadSpinner">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent :endpoint="'sections'" :store_id="'catalogue-sections'"></HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :endpoint="'sections'" :store_id="'catalogue-sections'"></SlideComponent>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { onMounted, ref } from 'vue';
    import { SectionInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    //spinner
    const loadSpinner = ref(false)
    const store = useCatalogueStore<SectionInterface>('catalogue-sections', 'sections')()
    

    onMounted(() => {
        store.loadEditableFields(['name', 'code'])
        callRecords()
    })

    const callRecords = async () => {
        try {
            loadSpinner.value = true;
            await store.fetchAll()
        } catch (error) {
            console.error("No se pudieron cargar las secciones académicos.");
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
