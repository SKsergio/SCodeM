<template>
    <div class="conatiner__data_load">
        <!-- <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div> -->
        <div>
            <HeaderComponent :endpoint="'studentsManagers'" :store_id="'catalogue-studentsManagers'"></HeaderComponent>
           
        </div>
    </div>

</template>

<script setup lang="ts">
    import HeaderComponent from '@/components/templates/HeaderComponent.vue';
    import Load2Component from '@/components/loaders/Load2Component.vue';


</script>

<style scoped>
    .conatiner_crud {
        width: 94%;
        margin: 0 auto;
        margin-top: -16px;
    }
    .conatiner__data_load{
        display: flex;
        flex-direction: column;
        position: relative;
    }
    .loadeer_container {
        position: fixed;
        top: 0;
        height: 100%;
        left: 0;
        right: 0;
        background-color: rgba(48, 46, 46, 0.822);
        z-index: 99;
    }
</style>
