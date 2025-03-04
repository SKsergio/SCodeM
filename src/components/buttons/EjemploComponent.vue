<template>
    <div>
        <h1>{{ store.count }} X 2 = {{ store.times2 }}</h1>
        <button @click="store.increment(1)">Incrementar</button>
        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolorum soluta eos eum eaque, dicta magnam quod aliquid inventore nisi neque ut at aperiam vero veritatis officiis totam, laudantium eligendi rem.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aut deleniti beatae praesentium ipsam optio quasi corporis? Nobis quo veniam quis odit eligendi nesciunt voluptatem nemo laudantium? Recusandae aperiam voluptates commodi.
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Labore nihil, velit magnam officiis, ab incidunt voluptatum asperiores corporis quas hic ad. Quisquam laudantium ipsam eos recusandae amet reiciendis unde explicabo.
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere cupiditate sint deserunt eligendi non exercitationem. Fugiat adipisci atque cupiditate quibusdam totam, natus nostrum saepe numquam, quos tempora veniam consectetur pariatur.
            Maiores quas iste nesciunt fugiat numquam aut dolores eos neque, qui vel pariatur voluptate quo deserunt officiis nam incidunt deleniti fugit ab praesentium libero quod? Nobis laudantium voluptatem accusantium tempora.
            Officiis repellat a repudiandae quasi saepe quidem deleniti pariatur, fugiat itaque. Dicta suscipit fugiat aspernatur, atque accusamus quam voluptates sequi placeat obcaecati rem illo nulla nam quae, iusto ut tempora?
            Ducimus perferendis dolore officia explicabo temporibus quas officiis! Quod reiciendis perferendis earum sequi ullam, dolores, delectus nihil veritatis unde dolorem vitae hic temporibus odio, explicabo impedit iste repudiandae! Vel, corrupti.
        </h1>
        <br>
        <br>
        
        <h2>afiodhfu uadfh Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis fuga ratione quam et nihil ab modi nulla quidem, iste, iusto sed sit maxime sequi aliquid a nobis tempore, aut velit.</h2>
        <h2>afiodhfu uadfh Lorem, ipsum dolor sit amet consectetur adipisicing elit. Officiis fuga ratione quam et nihil ab modi nulla quidem, iste, iusto sed sit maxime sequi aliquid a nobis tempore, aut velit.</h2>
        <h1>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nobis nemo officia quidem eos ex doloribus animi! Laboriosam alias voluptatem omnis, molestias, reiciendis voluptatibus consectetur recusandae ipsa eos vero optio sapiente.
        Quia quaerat voluptate tempore ipsa. Vitae reprehenderit accusamus quo quis assumenda rerum ullam mollitia facere consequuntur. Dolorum deleniti adipisci dicta illum eum dolorem ut amet! Ipsam quam rem veritatis a.
        Eveniet nulla accusamus atque esse! Nisi vitae eaque totam expedita maxime nihil explicabo labore aut doloremque impedit commodi molestias eos possimus tenetur at modi assumenda animi, ratione molestiae porro repellat.
        Nostrum eius at omnis. Quaerat consectetur nesciunt est autem recusandae magnam, corrupti consequuntur dolorum blanditiis necessitatibus temporibus. Fugit iste ipsa cumque, officia quod beatae ex doloribus, cupiditate neque exercitationem voluptatem?
        Possimus minus et modi corporis eos ullam, illum rem earum doloribus impedit fugit quos officiis dolor necessitatibus repudiandae, quis incidunt deserunt dignissimos aspernatur nihil. Culpa soluta tempore quas eius magni?
        Vero repudiandae reiciendis eos modi. Dolores mollitia quia facilis voluptas repellendus aut veritatis sequi reprehenderit eaque consequatur neque est corporis amet modi soluta blanditiis explicabo libero, ipsam reiciendis, ullam sapiente!</h1>        
    </div>
</template>

<script setup lang="ts">
    // importando el store de pinia
    import { useEjemploStore } from '@/store/Ejemplo';
    const store = useEjemploStore()
</script>