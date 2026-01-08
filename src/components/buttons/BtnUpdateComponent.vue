<template>
    <button class="btn_update" @click="emits('update_click')">Update
        <EditIcon></EditIcon>
    </button>
</template>

<script setup lang="ts">
    import EditIcon from '~icons/ri/edit-line'
    
    const emits = defineEmits<{
        (e:'update_click'):void
    }>()
</script>

<style scoped>
    .btn_update {
        background: transparent;
        border-radius: 4px;
        border: 2px solid var(--color-update);
        padding: 8px 20px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: white;
        font-size: 15px;
        font-weight: 500;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .btn_update:hover {
        box-shadow: none;
        opacity: 80%;
    }
    .btn_update:hover {
        background-color: var(--color-update);
    }
</style>