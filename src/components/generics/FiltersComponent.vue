<template>
    <section class="inputs__continer">
        <VueDatePicker v-model="filters.startDate" :enable-time-picker="false" :auto-apply="true" locale="es"
            format="yyyy-MM-dd" model-type="yyyy-MM-dd" placeholder="Fecha inicio" class="datepicker_st"
            @update:model-value="aplicarFiltros" />

        <VueDatePicker v-model="filters.endDate" :enable-time-picker="false" :auto-apply="true" locale="es"
            format="yyyy-MM-dd" model-type="yyyy-MM-dd" placeholder="Fecha fin" class="datepicker_st"
            @update:model-value="aplicarFiltros" />

        <BtnSearchComponent @search_input="onSearchInput" />
    </section>
</template>

<script setup lang="ts" generic="T">
import VueDatePicker from '@vuepic/vue-datepicker'
import BtnSearchComponent from '../buttons/BtnSearchComponent.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { reactive } from 'vue'
import { useCatalogueStore } from '@/store/CatalogueStore'

const props = defineProps<{
    store_id: string
    endpoint: string
}>()

const store = useCatalogueStore<T>(props.store_id, props.endpoint)()

const filters = reactive({
    search: '',
    startDate: null as string | null,
    endDate: null as string | null,
})


const onSearchInput = (value: string) => {
    filters.search = value
    aplicarFiltros() 
}

const aplicarFiltros = () => {

    store.params = {
        ...store.params, 
        search: filters.search,
        from_date: filters.startDate, 
        until_date: filters.endDate
    }
    store.fetchAll()
}

</script>

<style>
.datepicker_st {
    width: 27%;
}
</style>