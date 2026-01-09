<template>
    <div class="input-container">
        <input type="text" :readonly="editable" :value="modelValue" @input="onInput" >
        <label class="label" >{{ field }}</label>
        <div class="underline"></div>
    </div>
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
    @import url('@/css/variables.css');

    .input-container {
        position: relative;
        margin: 10px auto;
        width: 200px;
    }

    .input-container input[type="text"] {
        font-size: 20px;
        width: 100%;
        border: none;
        border-bottom: 2px solid #ccc;
        padding: 5px 0;
        background-color: transparent;
        outline: none;
        color: var(--color-text-content);
    }

    .input-container .label {
        font-family: var(--font-v1);
        position: absolute;
        top: 0;
        left: 0;
        color: var(--color-text-content);
        transition: all 0.5s ease;
        pointer-events: none;
    }
    .label{
        opacity: 0;
        visibility: hidden;
    }

    .input-container input[type="text"]:focus~.label,
    .input-container input[type="text"]:valid~.label {
        top: -20px;
        font-size: 16px;
        color: var(--inputs--colors);
        opacity: 1;
        visibility: visible;
    }

    .input-container .underline {
        position: absolute;
        bottom: 0;
        left: 0;
        height: 2px;
        width: 100%;
        background:var(--color-lines);
        transform: scaleX(0);
        transition: all 0.3s ease;
    }

    .input-container input[type="text"]:focus~.underline,
    .input-container input[type="text"]:valid~.underline {
        transform: scaleX(1);
    }
</style>