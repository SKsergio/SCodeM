<template>
    <div>
        <h1>{{ store.count }} X 2 = {{ store.times2 }}</h1>
        <button @click="store.increment(1)">Incrementar</button>
    </div>
</template>

<script setup lang="ts">
    // importando el store de pinia
    import { useEjemploStore } from '@/store/Ejemplo';
    const store = useEjemploStore()
</script>