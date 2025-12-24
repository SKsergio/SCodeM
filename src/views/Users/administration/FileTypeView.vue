<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent
                :endpoint="'catalog/type_files'" 
                :store_id="'catalogue-type_files'"
                :title="'Type Files'">
            </HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :endpoint="'catalog/type_files'" :store_id="'catalogue-type_files'"></SlideComponent>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { TypeFileInterface } from '@/interfaces/Catalogues/CataloguesInterface';
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted } from 'vue';
    const store = useCatalogueStore<TypeFileInterface>('catalogue-type_files', 'catalog/type_files')()


    onMounted(() => {
        store.loadEditableFields(['name', 'code']) //IMPORTANTYE CAMBIAR ESTO
        callRecords()
    })

    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            console.error("No se pudieron los tipos de archivos.");
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
