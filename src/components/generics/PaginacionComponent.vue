<template>
    <div class="conatiner__paginate">
        <VueAwesomePaginate :total-items="totalItems" :items-per-page="itemsPerPage" :max-pages-shown="maxPagesShown"
            v-model="internalPage" pagination-container-class="pagination" paginate-buttons-class="btn-page"
            active-page-class="active-page" />

        <section>
        </section>
    </div>
</template>


<script setup lang="ts">
import { computed } from 'vue';
const props = defineProps<{
    page: number,
    size?: number,
    totalItems: number,
    itemsPerPage: number,
    maxPagesShown?: number
}>();

const emit = defineEmits<{
    (e: 'change', page: number): void
}>();

const internalPage = computed({
    get: () => props.page + 1,
    set: (value: number) => emit('change', value - 1)
})


</script>

<style>
.conatiner__paginate{
    display: flex;
    margin-top: 20px;
    gap: 20px;
    margin-bottom: 10px;
}
.pagination {
    display: flex;
    gap: 8px;
    justify-content: center;
    margin-top: 20px;
}

.btn-page {
    border: 1px solid var(--color-fifth);
    background: var(--color-text-hover);
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
}

.active-page {
    background: var(--color-fourth);
    color: white;
}
</style>
