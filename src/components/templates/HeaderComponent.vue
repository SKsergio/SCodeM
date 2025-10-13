<template>
    <div class="header__general">
        <h1>{{ props.endpoint }}</h1>
        <div class="action_filters">
            <section class="inputs__continer">
                <VueDatePicker v-model="startDate" :enable-time-picker="false" :auto-apply="true" locale="es"
                    format="yyyy-MM-dd" model-type="yyyy-MM-dd" placeholder="Fecha inicio" class="datepicker-sm" />

                <VueDatePicker v-model="endDate" :enable-time-picker="false" :auto-apply="true" locale="es"
                    format="yyyy-MM-dd" model-type="yyyy-MM-dd" placeholder="Fecha fin" class="datepicker-sm" />

                <BtnSearchComponent :endpoint="props.endpoint" :store_id="props.store_id" />
                <BtnAddComponent />
            </section>
        </div>
    </div>
</template>

<script setup lang="ts" generic="T">
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import BtnAddComponent from '../buttons/BtnAddComponent.vue';
import BtnSearchComponent from '../buttons/BtnSearchComponent.vue';
import { ref } from 'vue';

//filtros de fechas
let startDate = ref<string | null>(null)
let endDate = ref<string | null>(null)

const props = defineProps<{
    store_id: string,
    endpoint: string
}>()
</script>

<style scoped>
@import url('../../css/variables.css');

/*importamos las variables*/
.header__general {
    background-color: var(--color-fifth);
    width: 100%;
    height: 145px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-radius: 0 0 10px 10px;
    flex-wrap: wrap;
    align-content: center;

    >h1 {
        font-family: var(--font-decoration1);
        font-weight: 400;
        font-size: 2.9rem;
        font-style: normal;
        color: rgb(236, 232, 225);
        margin-left: 40px;
    }

    .inputs__continer {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-right: 50px;
        gap: 20px;
    }
}

.action_filters {
    position: relative;
    z-index: 10;
}

.datepicker-sm {
    width: 210px;
    font-size: 1.9rem;
    padding: 4px 8px;
}
</style>