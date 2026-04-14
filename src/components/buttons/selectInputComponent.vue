<template>
  <select v-model="model">
    <option 
      v-for="opt in options" 
      :key="opt.value" 
      :value="opt.value"
    >
      {{ opt.label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  modelValue: any
  options: { label: string; value: any }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: any): void
}>()

const model = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
})
</script>