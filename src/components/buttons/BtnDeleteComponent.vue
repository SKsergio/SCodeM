<template>
    <button class="btn_delete" @click="emits('delete_click')">Delete
        <DeleteIcon></DeleteIcon>
    </button>
  
</template>

<script setup lang="ts">
    import DeleteIcon from '~icons/ri/delete-bin-line'

    const emits = defineEmits<{
        (e:'delete_click'):void
    }>()  
</script>

<style scoped>
    .btn_delete {
        background: var(--color-delete);
        border-radius: 4px;
        border: 2px solid var(--color-delete);
        padding: 8px 20px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s ease;
        color: #8A4856;
        font-size: 15px;
        font-weight: 500;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }

    .btn_delete:hover {
        background-color: var(--color-delete);
        opacity: 80%;
    }
</style>