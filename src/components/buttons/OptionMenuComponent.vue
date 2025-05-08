<template>
   <article @click="deploy__options">
        <Component :is="itemMenu.icon" class="svg_item" />
        <span class="list_span">{{itemMenu.label}}</span>
    </article>
    <ul class="nav__inner" :class="{'open':open_SubMenu}" v-if="(itemMenu.hadSoons)">

        <li v-for="(submenus, index) in itemMenu.soons" :key="index" class="drop__down">
            <a href="#" class="nav-link" @click="goTo(submenus.name)">
                {{ submenus.label }}
            </a>
        </li>
        
    </ul>
</template>

<script setup lang="ts">
    import { MenuItems} from '@/interfaces/templates/MenuInterFace';//importando la interfaz del Menu
    import { ref, Ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter()
    let open_SubMenu: Ref<boolean> = ref(false)

    //DEFINIENDO LOS PROPS
    defineProps<{
        itemMenu:MenuItems
    }>();

    const deploy__options=()=>{
        open_SubMenu.value = !open_SubMenu.value 
    }
    //redirect to new urls
    const goTo = (name:string) =>{
        router.push({name})
    }

</script>

<style scoped>
    @import url(../../css/variables.css);
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
    .nav__inner {
        padding: 0;
        width: 75%;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 0.5em;
        overflow: hidden;
        transform-origin: top;
        transition: max-height 0.4s ease-in-out;
        max-height: 0;
    }
    .nav__inner.open {
        max-height: 400px;
    }
    .nav-link{
        text-decoration: none;
        color: var(--color-text1);
    }
    .drop__down{
        padding: 8px 0;
        margin: 0;
        margin-top: 3px;
        transform: translateX(-70px);
        transition: all .5s ease-in-out;
    }
    .nav__inner.open .drop__down {
        opacity: 1;
        transform: translateX(0);
    }
    .nav-link::after{
        content: '';
        height: 4px;
        width: 0;
        background-color: var(--color-fifth);
        border-radius: 10px;
        display: block;
        transition: all 600ms;
    }
    .nav-link:hover::after{
        width: 100%;
    }
    .nav-link:hover{
        color: var(--color-text-line);
    }
</style>