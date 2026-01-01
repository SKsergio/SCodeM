<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent :endpoint="endpoint" :store_id="storeId" :title="'Sections'"
                @open-modal="isModalOpen = true">
            </HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :endpoint="endpoint" :store_id="storeId"></SlideComponent>
            </div>
            <CreateModalComponent v-model="isModalOpen" :store_id="storeId" :endpoint="endpoint"
                :title="'Registrar Nueva Sección'" />
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { SectionInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted, ref } from 'vue';
    import CreateModalComponent from '@/components/modals/CreateModalComponent.vue';

    //VARIABLES
    const isModalOpen = ref(false)
    const storeId = 'catalogue-sections';
    const endpoint = 'catalog/sections';

    const store = useCatalogueStore<SectionInterface>(storeId, endpoint)()


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

.conatiner__data_load {
    display: flex;
    flex-direction: column;
    position: relative;
}
</style>
