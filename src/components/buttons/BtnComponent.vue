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
    background: linear-gradient(140.14deg, #0e42ec 15.05%, #471fd6 114.99%)
    padding-box,
    linear-gradient(142.51deg, #3eb2c7 8.65%, #0a6488 88.82%) border-box;
    border-radius: 7px;
    border: 2px solid transparent;
    text-shadow: 1px 1px 1px #00000040;
    box-shadow: 8px 8px 20px 0px #45090059;
    padding: 10px 40px;
    line-height: 20px;
    cursor: pointer;
    transition: all 0.3s;
    color: white;
    font-size: 17px;
    font-weight: 500;
    min-width: 50px;
}

.button:hover {
  box-shadow: none;
  opacity: 80%;
}

</style>