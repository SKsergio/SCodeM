<template>
    
    <div class="slide__cotainer" v-if="lengthRecords > 0">
        <section class="slide_content" v-for="(item) in records" :key="item.id"> <!--Esto hay que mejorarlo :/-->
            <CardRecordsComponent :records="item" :store_id="props.store_id" :endpoint="props.endpoint" />
        </section>
    </div>

    <div class="no_content" v-else>
        <h1>NO HAY GRADOS PARA MOSTRAR</h1>
        <img src="../../assets/images/404preview.png" alt="404" srcset="">
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
import CardRecordsComponent from './CardRecordsComponent.vue';
import { useCatalogueStore } from '@/store/CatalogueStore';
import { storeToRefs } from 'pinia'


const props = defineProps<{ store_id: string, endpoint: string }>();
const store = useCatalogueStore<T>(props.store_id, props.endpoint)();

const { records, lengthRecords } = storeToRefs(store);

</script>

<style>
@import url('@/css/variables.css');

.slide__cotainer {
    background: var(--color-third);
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    padding: 30px;
    border-radius: 25px 5px 25px 5px;
}


.modal_creater{
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 30%;
}
</style>