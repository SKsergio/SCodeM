<template>
    <button class="btn_save" @click="emits('save_click')">Save
        <SaveIcon></SaveIcon>
    </button>
</template>

<script setup lang="ts">
    import SaveIcon from '~icons/ri/save-line';
    const emits = defineEmits<{
        (e:'save_click'):void
    }>()
</script>

<style scoped>
    .btn_save {
        background: var(--color-save);
        border-radius: 4px;
        border: 2px solid var(--color-save);
        padding:8px 20px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: white;
        font-size: 15px;
        font-weight: 500;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .btn_save:hover {
        opacity: 80%;
    }
</style>