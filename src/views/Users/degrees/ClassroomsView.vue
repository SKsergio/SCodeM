<template>
    <div class="conatiner__data_load">
        <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div>
        <div>
            <HeaderComponent 
                :endpoint="'catalog/classrooms'" 
                :store_id="'catalogue-classrooms'"
                :title="'classrooms'"
                >
            </HeaderComponent>
            <div class="conatiner_crud">
                <SlideComponent :endpoint="'catalog/classrooms'" :store_id="'catalogue-classrooms'"></SlideComponent>
            </div>
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import SlideComponent from '@/components/generics/SlideComponent.vue';
    import { ClassromInterface } from '@/interfaces/Catalogues/CataloguesInterface';//specific degree interface
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import Load2Component from '@/components/loaders/Load2Component.vue';
    import { onMounted } from 'vue';
    const store = useCatalogueStore<ClassromInterface>('catalogue-classrooms', 'catalog/classrooms')()


    onMounted(() => {
        store.loadEditableFields(['name', 'code'])
        callRecords()
    })

    const callRecords = async () => {
        try {
            await store.fetchAll()
        } catch (error) {
            console.error("No se pudieron cargar los grados académicos.");
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
