<template>
    <div class="input__ct">
        <label :for="id">{{ label }}</label>
        <input :id="id" class="input_st" type="text" placeholder="12345678-9" maxlength="10" :value="modelValue"
            @input="handleInput" :class="{ 'input-error': hasError }">
        <span v-if="hasError" class="error-msg">{{ errorMessage }}</span>
    </div>
</template>

<script setup lang="ts">
import { PropsDui } from '@/interfaces/templates/DuiComponentInterface';

const props = withDefaults(defineProps < PropsDui > (), {
    modelValue: '',
    id: 'DUI',
    label: 'DUI',
    hasError: false,
    errorMessage: 'Formato de DUI inválido'
});

const emit = defineEmits < {
  (e: 'update:modelValue', value: string): void;
}> ();

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    // Quitamos todo lo que no sea número
    let rawValue = target.value.replace(/\D/g, '');

    // Limitamos a 9 dígitos máximo
    if (rawValue.length > 9) {
        rawValue = rawValue.substring(0, 9);
    }

    // Aplicamos formato 12345678-9
    let formattedValue = rawValue;
    if (rawValue.length > 8) {
        formattedValue = `${rawValue.substring(0, 8)}-${rawValue.substring(8)}`;
    }

    target.value = formattedValue;
    emit('update:modelValue', formattedValue);
};
</script>