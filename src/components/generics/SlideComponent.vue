<template>    
    <div class="slide__cotainer" v-if="store.records">
        <CreateModalComponent 
            :store_id="props.store_id" 
            :show-modal="showModal" 
            :endpoint="props.endpoint">
        </CreateModalComponent>
        <section class="slide_content" v-for="(item) in store.records" :key="item.id"> <!--Esto hay que mejorarlo :/-->
            <CardRecordsComponent 
                :records="item" 
                :store_id="props.store_id"
                :endpoint="props.endpoint"
            />
        </section>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import CardRecordsComponent from './CardRecordsComponent.vue';
    import CreateModalComponent from '../modals/CreateModalComponent.vue';
    import { useModalStore } from '@/store/CreateModel';
    import { useCatalogueStore } from '@/store/CatalogueStore';
    import { storeToRefs } from 'pinia'

    const ModelManage =  useModalStore();
    const {showModal} = storeToRefs(ModelManage)

    
    //PROPS
    const props = defineProps<{
        store_id: string,
        endpoint: string
    }>()

    const store = useCatalogueStore<T>(props.store_id, props.endpoint)()

</script>

<style>
    @import url('@/css/variables.css');
    .slide__cotainer{
        background: var(--color-third);  
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 30px;
        border-radius: 25px 5px 25px 5px;
    }
  
</style>