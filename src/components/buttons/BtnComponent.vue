<template>
    <button class="button">{{name}}</button>
</template>

<script setup lang="ts">
    defineProps<{
        name:string
    }>()
</script>

<style scoped>
.button {
    background: var(--color-eight);
    border-radius: 7px;
    border: 2px solid #00000040;
    text-shadow: 1px 1px 1px #00000040;
    box-shadow: 8px 8px 20px 0px #45090059;
    padding: 8px 30px;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.3s;
    color: white;
    font-size: 15px;
    font-weight: 500;
    min-width: 50px;
}
.button:hover {
  box-shadow: none;
  opacity: 80%;
}

</style>