<template>
    <div>
        
    </div>
</template>

<script setup>

</script>

<style scoped>
    /* submenus styles */
    .nav__inner{
        list-style: none;
        padding: 0;
        width: 229%;
        margin: 0 auto;
        display: grid;
        gap: 1.5em;
        overflow: hidden;
        transform: scaleY(0);
        transform-origin: top;
        transition: transform 0.4s ease-in-out;
    }
    .nav__inner.open{
        transform: scaleY(1);
    }
</style>