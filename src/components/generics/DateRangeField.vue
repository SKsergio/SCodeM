<template>
    <div class="date_range_field">
        <div class="range_banner" :class="{ 'range_banner--empty': !range }">
            <CalendarIcon class="range_banner__icon" />
            <span v-if="loading">Loading available dates...</span>
            <span v-else-if="range">
                Available range:
                <strong>{{ range.startDate }}</strong>
                &rarr;
                <strong>{{ range.endDate }}</strong>
            </span>
            <span v-else>{{ emptyText }}</span>
        </div>

        <div class="row_2">
            <div class="input__ct">
                <label>{{ startLabel }}</label>
                <VueDatePicker v-model="startDate" locale="es" format="yyyy-MM-dd" model-type="yyyy-MM-dd"
                    :teleport="true" class="picker" :enable-time-picker="false" auto-apply
                    placeholder="yyyy-mm-dd" :disabled="!range" :min-date="minStartDate" :max-date="maxDate"
                    :start-date="minStartDate" prevent-min-max-navigation
                    :state="startInvalid ? false : undefined" />
            </div>

            <div class="input__ct">
                <label>{{ endLabel }}</label>
                <VueDatePicker v-model="endDate" locale="es" format="yyyy-MM-dd" model-type="yyyy-MM-dd"
                    :teleport="true" class="picker" :enable-time-picker="false" auto-apply
                    placeholder="yyyy-mm-dd" :disabled="!range" :min-date="minEndDate" :max-date="maxDate"
                    :start-date="minEndDate" prevent-min-max-navigation
                    :state="endInvalid ? false : undefined" />
            </div>
        </div>

        <p v-if="error" class="field_error">{{ error }}</p>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker'
import CalendarIcon from '~icons/ri/calendar-line'
import {
    type DateRange,
    toLocalDate,
    isDateOutOfRange,
    isEndBeforeStart,
    getDateRangeError
} from '@/utils/dateRange';

const startDate = defineModel<string>('startDate', { default: '' })
const endDate = defineModel<string>('endDate', { default: '' })

const props = withDefaults(defineProps<{
    range?: DateRange | null
    loading?: boolean
    emptyText?: string
    startLabel?: string
    endLabel?: string
}>(), {
    range: null,
    loading: false,
    emptyText: 'Select an option to see the available date range.',
    startLabel: 'Start Date',
    endLabel: 'End Date',
})

const minStartDate = computed(() => toLocalDate(props.range?.startDate))
const maxDate = computed(() => toLocalDate(props.range?.endDate))
const minEndDate = computed(() => toLocalDate(startDate.value) ?? minStartDate.value)

const startInvalid = computed(() => isDateOutOfRange(startDate.value, props.range))
const endInvalid = computed(() =>
    isDateOutOfRange(endDate.value, props.range) || isEndBeforeStart(startDate.value, endDate.value)
)

const error = computed(() => getDateRangeError(startDate.value, endDate.value, props.range))
</script>

<style scoped>
.date_range_field {
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.input__ct label {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-content);
}

.range_banner {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 6px;
    font-size: 13px;
    color: var(--color-text-content);
    background-color: rgba(59, 130, 246, 0.1);
    border: 1px solid rgba(59, 130, 246, 0.35);
}

.range_banner--empty {
    background-color: var(--color-menu);
    border-color: var(--color-seccundary);
    color: var(--color-text1);
}

.range_banner__icon {
    flex-shrink: 0;
    font-size: 18px;
}
</style>
