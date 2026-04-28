<template>
    <button class="btn_save" @click="emits('clean_click')">Clean
        <CleanIcon></CleanIcon>
    </button>
</template>

<script setup lang="ts">
    import CleanIcon from '~icons/ri/hand-sanitizer-line';
    const emits = defineEmits<{
        (e:'clean_click'):void
    }>()
</script>

<style scoped>
    .btn_save {
        background: var(--color-clear);
        border-radius: 4px;
        border: 2px solid var(--color-clear);
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