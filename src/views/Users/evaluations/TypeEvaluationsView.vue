<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <!-- <HeaderComponent
                :show-add="true"
                :title="'Evaluations'"
                @open-modal="handleCreate()">
            </HeaderComponent> -->
            <div class="conatiner_crud">
                <SlideComponent :endpoint="endpoint" :store_id="storeId"></SlideComponent>
            </div>
            <CreateModalComponent v-model="isModalOpen" :store_id="storeId" :endpoint="endpoint"
                :title="'Registrar Nuevo Tipo de Evaluación'" />
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { TypeEvaluationsInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted, ref } from 'vue';
    import CreateModalComponent from '@/components/modals/CreateModalComponent.vue';
    import { ApiError } from '@/interfaces/ApiError';
    import { ErrorAlert } from '@/components/alerts/ErrorAlert';

    //VARIABLES
    const isModalOpen = ref(false)
    const storeId = 'catalogue-evaluationTypes';
    const endpoint = 'catalogue/evaluationTypes';

    const store = useCatalogueStore<TypeEvaluationsInterface>(storeId, endpoint)()


    onMounted(() => {
        store.loadEditableFields(['name', 'code'])
        callRecords()
    })

    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            ErrorAlert({ status: 400, message: "Ocurrió un error al cargar los tipos de evaluaciones." } as ApiError);
        }
    }
</script>

