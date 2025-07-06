<template>
    <label>{{ field }}</label>
    <input type="text" :readonly="editable" :value="modelValue" @input="onInput" />
    <h1>{{ modelValue }}</h1>
</template>

<script setup lang="ts">
const props = defineProps<{
    field: string | number | symbol,
    editable?: boolean,
    modelValue: any
}>()
const emit = defineEmits(['update:modelValue'])

function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}
</script>

<style scoped>
    input{
        color: black; 
    }
</style>