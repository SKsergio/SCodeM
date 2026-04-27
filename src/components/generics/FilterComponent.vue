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

    <section>
        <component v-for="filter in props.config" :key="filter.key" :is="resolveComponent(filter.type)"
            v-model="filters[filter.key]" v-bind="omitKey(filter)" @update:model-value="aplicarFiltros" />
    </section>
</template>

<script setup lang="ts" generic="T">
import VueDatePicker from '@vuepic/vue-datepicker'
import BtnSearchComponent from '../buttons/BtnSearchComponent.vue'
import '@vuepic/vue-datepicker/dist/main.css'
import { reactive } from 'vue'
import { FilterConfig } from '@/interfaces/templates/FilterInterface'
import { FilterType } from '@/interfaces/templates/FilterInterface';
import selectInputComponent from '../buttons/selectInputComponent.vue'

const componentMap: Record<FilterType, any> = {
    search: BtnSearchComponent,
    date: VueDatePicker,
    select: selectInputComponent
}

const resolveComponent = (type: FilterType) => {
  return componentMap[type] ?? BtnSearchComponent
}

const props = defineProps<{
    config?: FilterConfig[]
}>();

const emit = defineEmits<{
    (e: 'apply-filters', filters: Record<string, any>): void
}>();

const omitKey = (filter: any) => {
    const { key, ...rest } = filter
    return rest
}

const filters = reactive<Record<string, any>>({
    search: '',
    startDate: null,
    endDate: null
})

props.config?.forEach(filter => {
    filters[filter.key] = null
})

const onSearchInput = (value: string) => {
    filters.search = value
    aplicarFiltros()
}

const aplicarFiltros = () => {

    const payload: Record<string, any> ={
        search: filters.search,
        fromDate: filters.startDate,
        toDate: filters.endDate,
    }

    //los dinamicos
    props.config?.forEach(filter => {
        const paramKey = filter.param || filter.key
        payload[paramKey] = filters[filter.key]
    })

   const cleanedPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== null && value !== '' && value !== undefined)
    );

    // 3. Emitimos el objeto limpio
    emit('apply-filters', cleanedPayload);
}

</script>

<style scoped>
.inputs__continer {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    overflow: visible;
    align-items: center;
}

.datepicker_st {
    flex: 1 1 200px;
}

.datepicker_st input {
    background-color: transparent;
    color: wheat;
}
</style>