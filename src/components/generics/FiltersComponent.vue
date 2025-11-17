<template>
    <section class="inputs__continer">
        <VueDatePicker v-model="filters.startDate" :enable-time-picker="false" :auto-apply="true" locale="es"
            format="yyyy-MM-dd" model-type="yyyy-MM-dd" placeholder="Fecha inicio" class="datepicker_st"/>

        <VueDatePicker v-model="filters.endDate" :enable-time-picker="false" :auto-apply="true" locale="es"
            format="yyyy-MM-dd" model-type="yyyy-MM-dd" placeholder="Fecha fin" class="datepicker_st" />

        <BtnSearchComponent @search_input="onSearchInput" />
        <BtnAddComponent />
    </section>
</template>

<script setup lang="ts" generic="T">
import VueDatePicker from '@vuepic/vue-datepicker'
import BtnAddComponent from '../buttons/BtnAddComponent.vue'
import BtnSearchComponent from '../buttons/BtnSearchComponent.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { reactive, watch } from 'vue'
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

watch(
    [() => filters.search, () => filters.startDate, () => filters.endDate],
    ([search, startDate, endDate]) => {
        const hasSearch = !!search && search.trim() !== ''
        const hasDates = !!startDate && !!endDate

        if (hasSearch) {
            debouncedFilter(search, startDate ?? null, endDate ?? null)
            return
        }else{
            store.fetchAll()
        }

        if (hasDates) {
            debouncedFilter(search, startDate, endDate)
        }else{
            store.fetchAll()
        }

    }
)

const onSearchInput = (value: string) => {
    filters.search = value
}

const filterData = async (search: string, startDate?: string | null, endDate?: string | null) => {
    try {
        const payload: any = { search }
        if (startDate) payload.fromDate = startDate
        if (endDate) payload.untilDate = endDate

        await store.searchRecords(props.endpoint, payload)
    } catch (error) {
        console.error('No se pudieron cargar los registros académicos.', error)
    }
}


let debounceTimer: ReturnType<typeof setTimeout> | null = null
const debouncedFilter = (search: string, startDate?: string | null, endDate?: string | null, wait = 100) => {
    if (debounceTimer) clearTimeout(debounceTimer)
    debounceTimer = setTimeout(() => {
        filterData(search, startDate, endDate)
    }, wait)
}
</script>

<style>
.datepicker_st{
    width: 27%;
}
</style>