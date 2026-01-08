<template>
    <button class="btn_Add" @click="emits('openModalClick')">Add
        <AddIcon class="icon__add"></AddIcon>
    </button>
</template>

<script setup lang="ts">
    import AddIcon from '~icons/ri/function-add-line'

    const emits = defineEmits<{
        (e:'openModalClick'):void
    }>()

</script>

<style scoped>
    .btn_Add {
        background: var( --color-eight);
        border-radius: 7px;
        border: 2px solid #00000040;
        text-shadow: 1px 1px 1px #00000040;
        box-shadow: 8px 8px 20px 0px rgba(12, 1, 43, 0.726);
        padding: 8px 30px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: white;
        font-size: 15px;
        font-weight: 500;
        min-width: 130px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .btn_Add:hover {
        box-shadow: none;
        opacity: 80%;
    }
    .icon__add{
        scale: 1.3;
    }
</style>