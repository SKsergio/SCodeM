<template>
    <div class="conatiner__data_load">
        <!-- loader -->
        <div class="loadeer_container" v-if="loading">
            <Load2Component></Load2Component>
        </div>

        <!-- cabecera -->
        <HeaderComponent :show-add="canEdit" :title="'Encargados'" @open-modal="handleCreate()">
        </HeaderComponent>

        <!-- contendedor -->
        <slideManager @edit="handleEdit" @delete="handleDelete"></slideManager>

        <!-- modal de editar y crear -->
        <modalCrearEditar v-model="isModalOpen" @emitido="fetchAll()" :manager-data="requestManagerData">
        </modalCrearEditar>

    </div>
</template>

<script lang="ts" setup>
    import { onMounted, provide, ref } from 'vue';
    import slideManager from './components/slideManager.vue';
    import modalCrearEditar from './components/modalCrearEditar.vue';
    import { useManagers } from '@/composables/useManagers';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import { ShowDeleteAlert } from '@/components/alerts/DeleteAlert';
    import { ManagerEditResponse, ManagerFullResponse } from '@/interfaces/managers/ManagerInterface';
    import { useAuth } from '@/composables/useAuth';

    const isModalOpen = ref(false);
    const managerState = useManagers();
    const requestManagerData = ref<ManagerEditResponse>();
    const fullManagerData = ref<ManagerFullResponse>();
    const { getCurrentUser } = useAuth();

    const currentUser = getCurrentUser();



    const canEdit =
        currentUser?.role === 'ADMIN';
    // 2. Proveemos ese estado exacto al hijo
    provide("managerContext", managerState);
    const { loading, fetchAll, getOntetoEdit, deleteRecord, getDetail } = managerState;

    const handleCreate = () => {
        requestManagerData.value = undefined;

        isModalOpen.value = true;
    }

    //manejar edicion
    const handleEdit = async (id: number) => {
        try {
            const data = await getOntetoEdit(id);
            requestManagerData.value = data;
            console.log(requestManagerData.value);

            isModalOpen.value = true;
        } catch (error) {
            console.error("No se pudo cargar la información para editar");
            console.error(error);
        }
    }

    //manjear eliminacion
    const handleDelete = async (id: number) => {
        try {
            ShowDeleteAlert(() => deleteRecord(id));
        } catch (error) {
            console.error("No se pudo cargar la información para editar");
            console.error(error);
        }
    }

    onMounted(async () => {
        try {
            await fetchAll();
        } catch (e) {
            console.error('Falló la carga inicial', e);
        }
    })
</script>