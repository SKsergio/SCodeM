<template>
   <article @click="deploy__options">
        <Component :is="itemMenu.icon" class="svg_item" />
        <span class="list_span">{{itemMenu.label}}</span>
        <ul class="nav__inner" :class="{'open':open_SubMenu}" v-if="(itemMenu.soons)">
              <li class="drop__down">
                <a href="https://codepen.io/trending"  class="nav-link" target="_blank">
                  todo list
                </a>
              </li>

              <li class="drop__down">
                <a href="https://www.youtube.com/"  class="nav-link" target="_blank">
                  Calendar
                </a>
              </li>

              <li class="drop__down">
                <a href="#"  class="nav-link">
                  Remainder
                </a>
              </li>

              <li class="drop__down">
                <a href="#"  class="nav-link">
                  Planing
                </a>
              </li>  
          </ul>
    </article>

</template>

<script setup lang="ts">
    import { MenuItems, SoonsItems } from '@/interfaces/MenuInterFace';//importando la interfaz del Menu
    import { ref, Ref } from 'vue';

    let open_SubMenu: Ref<boolean> = ref(false)


    //DEFINIENDO LOS PROPS
    defineProps<{
        itemMenu:MenuItems
    }>();


    const deploy__options=()=>{
        open_SubMenu.value = !open_SubMenu.value 
    }

</script>

<style scoped>
    /* disign to the links */
    article{
        cursor: pointer;
        position: relative;
        width: 100%;
        height: 48px;
        display: flex;
        align-items: center;
        text-decoration: none;
        border-radius: 10px;
        color: var(--color-text1);
        gap: 12px;
    }
    article:hover{
        background: var(--color-text-hover);
    }
    /* design to the icons */
    .svg_item{
        min-width: 30px;
        width: 30px;
        margin-left: 4px;
    }
    .list_span{
        font-size: 25px;
        margin-left: 7px;
        opacity: 1;
        font-size: 17px;
        transition: opacity .5s ease;
    }
    .hide_sick{
        opacity: 0;
    }
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
    .nav-link{
        text-decoration: none;
        color: var(--Almost-Black);
    }
</style>