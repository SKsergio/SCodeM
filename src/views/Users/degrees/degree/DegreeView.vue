<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent :endpoint="endpoint" :store_id="storeId" :title="'Degrees'"
                @open-modal="isModalOpen = true">
            </HeaderComponent>

            <!-- filtros -->
            <BtnFilterComponent @click="showFilters = !showFilters" />
            <FilterWrapper v-if="showFilters" >
                <filters-component :endpoint="endpoint" :store_id="storeId" :config="degreeFilters"></filters-component>
            </FilterWrapper>

            <div class="conatiner_crud">
                <SlideComponent :endpoint="endpoint" :store_id="storeId"></SlideComponent>
            </div>

        </div>
        <CreateModalComponent v-model="isModalOpen" :store_id="storeId" :endpoint="endpoint"
            :title="'Registrar Nuevo Grado'" />
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { DegreeInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted, ref } from 'vue';
    import CreateModalComponent from '@/components/modals/CreateModalComponent.vue';
    import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';
    import FiltersComponent from '@/components/generics/FiltersComponent.vue';
    import FilterWrapper from '@/components/templates/FilterWrapper.vue';
    import { degreeFilters } from './filters';

    //colapsar filtros
    const showFilters = ref(false);

    //VARIABLES
    const isModalOpen = ref(false)
    const storeId = 'catalogue-degrees';
    const endpoint = 'catalogue/degrees';

    const store = useCatalogueStore<DegreeInterface>(storeId, endpoint)()

    //MONTAJE
    onMounted(() => {
        store.loadEditableFields(['name', 'code']) //IMPORTANTYE CAMBIAR ESTO
        callRecords()
    })


    //FUNCIONES
    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
        }
    }

</script>