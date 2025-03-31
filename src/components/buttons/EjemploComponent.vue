<template>
    <div>
        <h1>{{ store.count }} X 2 = {{ store.times2 }}</h1>
        <button @click="store.increment(1)">Incrementar</button>
        <h1>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus, necessitatibus, laudantium incidunt, omnis quis totam repellendus modi nulla ullam maiores delectus voluptates sed. Dolor, sequi quo! Exercitationem facilis et libero.
            Enim dicta magni, expedita praesentium dolorum alias nostrum, minima, vero quisquam at officiis. Nostrum, alias quam iusto omnis voluptatem numquam, repudiandae ipsum porro at molestias dolorem ipsam sed cum optio?
            Error nostrum adipisci nisi, aperiam saepe, quasi, quidem esse commodi quisquam sed magnam. Deserunt harum, totam iure ea dignissimos impedit quisquam incidunt perferendis hic quae veritatis maxime quo atque dolores!
            Deleniti expedita maxime impedit similique laudantium ipsa corporis blanditiis aut culpa voluptate, ut totam non tempora nam. Enim dignissimos at, veritatis, tenetur quod quo ducimus, aspernatur odio corporis fuga accusantium.
            Dolor architecto aliquid expedita dolorem, libero voluptatum ratione possimus, repellendus perferendis, laboriosam ab optio est nesciunt harum perspiciatis ipsa accusantium omnis. Assumenda accusantium cum odio similique deserunt iste necessitatibus laudantium!
            Molestias, reprehenderit eius non numquam obcaecati eos ut consequuntur fugit iusto officiis vero nostrum magni culpa nemo. Aspernatur id labore nemo cum esse dolorem tenetur, sed atque quaerat fugiat excepturi.
            Quas ratione incidunt sit commodi molestiae, aliquam velit, sapiente a assumenda harum reiciendis est maiores vel ad aut aliquid consequuntur odit reprehenderit. Dolor illo saepe veniam magnam perspiciatis pariatur quas.
            Cum id sint nihil, cumque veniam temporibus praesentium non ipsum repudiandae qui dolorem pariatur unde dicta, odit beatae. Illum sequi officiis fugit! Voluptatum fugit quas est laudantium dolorem qui nobis?
        </h1>
    </div>
</template>

<script setup lang="ts">
    // importando el store de pinia
    import { useEjemploStore } from '@/store/Ejemplo';
    const store = useEjemploStore()
</script>