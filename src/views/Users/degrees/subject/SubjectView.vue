<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent :show-add="canEdit" :endpoint="endpoint" :store_id="storeId" :title="'Asignaturas'"
                @open-modal="isModalOpen = true">
            </HeaderComponent>

             <!-- filtros -->
            <BtnFilterComponent @click="showFilters = !showFilters" />
            <FilterWrapper :show="showFilters" >
                <filters-component :endpoint="endpoint" :store_id="storeId" :config="degreeFilters"></filters-component>
            </FilterWrapper>

            <div class="conatiner_crud">
                <SlideComponent :endpoint="endpoint" :store_id="storeId"></SlideComponent>
            </div>
            <CreateModalComponent v-model="isModalOpen" :store_id="storeId" :endpoint="endpoint"
                :title="'Registrar Nueva Materia'" />
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { SubjectInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted, ref } from 'vue';
    import CreateModalComponent from '@/components/modals/CreateModalComponent.vue';
    import FilterWrapper from '@/components/templates/FilterWrapper.vue';
    import BtnFilterComponent from '@/components/buttons/BtnFilterComponent.vue';
    import FiltersComponent from '@/components/generics/FiltersComponent.vue';
    import { degreeFilters } from './filter';
    import { useAuth } from '@/composables/useAuth';
    
    const { getCurrentUser } = useAuth();
    const currentUser = getCurrentUser();

    const canEdit =
    currentUser?.role === 'ADMIN' ||
    currentUser?.role === 'TEACHER';


    const showFilters = ref(false);


    //VARIABLES
    const isModalOpen = ref(false)
    const storeId = 'catalogue-subjects';
    const endpoint = 'catalogue/subjects';

    const store = useCatalogueStore<SubjectInterface>(storeId, endpoint)()


    onMounted(() => {
        store.loadEditableFields(['name', 'code', 'description'])
        callRecords()
    })

    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            console.error("No se pudieron cargar las materias académicas.");
            alert("¡Ups! Algo salió mal al obtener los datos.");
        }
    }
</script>
