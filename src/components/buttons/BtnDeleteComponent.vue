<template>
    <button class="btn_delete" @click="emits('delete_click')">Delete</button>
</template>

<script setup lang="ts">
    const emits = defineEmits<{
        (e:'delete_click'):void
    }>()  
</script>

<style scoped>
    .btn_delete {
        background: var(--color-delete);
        border-radius: 7px;
        border: 2px solid #00000040;
        text-shadow: 1px 1px 1px #00000040;
        box-shadow: 8px 8px 20px 0px #413a3559;
        padding: 8px 30px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: white;
        font-size: 15px;
        font-weight: 500;
        min-width: 50px;
    }
    .btn_delete:hover {
        box-shadow: none;
        opacity: 80%;
    }
</style>