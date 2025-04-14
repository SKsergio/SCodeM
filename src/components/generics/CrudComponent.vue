<template>
    <div class="container">
        <div class="header__general">
            <h1>Degreess</h1>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
    @import url('../../css/globalClases.css');
    @import url('../../css/variables.css');
    .header__general{
        background-color: var(--color-sixth);
        width: 100%;
        height: 145px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        > h1{
            color: rgb(236, 232, 225);
            margin-left: 30px;
        }
    }
</style>