<template>
    <TransitionRoot appear :show="modelValue" as="template">
        <Dialog as="div" class="modal_root" @close="close">
            <TransitionChild as="template" enter="ease-out duration-500" enter-from="opacity-0" enter-to="opacity-100"
                leave="ease-in duration-500" leave-from="opacity-100" leave-to="opacity-0">
                <div class="modal_overlay" />
            </TransitionChild>

            <div class="modal_scroll_container">
                <div class="modal_flex_wrapper">

                    <TransitionChild as="template" enter="ease-out duration-500" enter-from="opacity-0 scale-90"
                        enter-to="opacity-100 scale-100" leave="ease-in duration-300" leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-90">

                        <DialogPanel class="model_panel" :class="customClass">
                            <DialogTitle v-if="title" class="modal_title">
                                {{ title }}
                            </DialogTitle>

                            <slot />
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
<script setup lang="ts">
import {
    Dialog,
    DialogPanel,
    DialogTitle,
    TransitionRoot,
    TransitionChild
} from '@headlessui/vue'

const props = defineProps<{
    modelValue: boolean
    title?: string
    customClass?: string
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', value: boolean): void
}>()

const close = () => emit('update:modelValue', false)
</script>


<style scoped>
@import url(../../css/transitions.css);
.modal_root {
    position: relative;
    z-index: 50;
}

.modal_overlay {
    position: fixed;
    inset: 0;
    z-index: 11;
    background-color: rgba(0, 0, 0, 0.5);
}

.modal_scroll_container {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    z-index: 51;
}

.modal_flex_wrapper {
    display: flex;
    min-height: 100%;
    align-items: center;
    justify-content: center;
    padding: 16px;
    text-align: center;
}

.model_panel {
    position: relative;
    width: 100%;
    border-radius: 20px;
    padding: 32px;
    display: flex;
    justify-content: center;
    flex-direction: column;
    box-shadow: 0 20px 25px -5px rgba(19, 18, 18, 0.1);
    text-align: left;
    overflow: hidden;
}

.modal_title {
    font-family: var(--font-v1);
    font-size: 20px;
    font-weight: 600;
    color: var(--color-lines);
    font-size: 30px;
    margin-bottom: 16px;
    text-align: center;
}
</style>