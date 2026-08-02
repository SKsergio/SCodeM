<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent :endpoint="endpoint" :store_id="storeId" :title="'Classrooms'"
                @open-modal="isModalOpen = true">
            </HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :endpoint="endpoint" :store_id="storeId"></SlideComponent>
            </div>
            <CreateModalComponent v-model="isModalOpen" :store_id="storeId" :endpoint="endpoint"
                :title="'Registrar Nuevo Salón de Clases'" />
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { ClassromInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted, ref } from 'vue';
    import CreateModalComponent from '@/components/modals/CreateModalComponent.vue';
    import { ApiError } from '@/interfaces/ApiError';
    import { ErrorAlert } from '@/components/alerts/ErrorAlert';


    //VARIABLES
    const isModalOpen = ref(false)
    const storeId = 'catalogue-classrooms';
    const endpoint = 'catalogue/classrooms';

    const store = useCatalogueStore<ClassromInterface>(storeId, endpoint)()


    onMounted(() => {
        store.loadEditableFields(['name', 'code'])
        callRecords()
    })

    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            ErrorAlert({ status: 400, message: "Ocurrió un error al cargar los salones de clases." } as ApiError);
        }
    }
</script>

