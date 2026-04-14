<template>
    <div class="filters__wrapper">
        <slot />
    </div>
</template>

<style scoped>
.filters__wrapper {
    width: 100%;
    padding: 15px 40px;
    background-color: var(--color-fifth);
    border-bottom: 1px solid var(--color-lines);
    position: relative;
    overflow: visible;

    display: flex;
    justify-content: center;
    align-items: center;
}
</style>