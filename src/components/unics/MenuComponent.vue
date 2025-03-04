<template>
    <div class="menu_bar" ref="sidebar">
        <!-- first section -->
        <div class="name_institution">
            <AcademicCapIcon class="icon_main_menu" @click="sickMenu"></AcademicCapIcon>
            <span class="name_span" :ref="el => setRef(el as HTMLElement | null)">Instiu Nuevo</span> 
        </div>

        <!-- navegation menu -->
        <nav class="navegation">
            <ul class="list_navegation">
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span :ref="el => setRef(el as HTMLElement | null)" class="list_span">Administration</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Students</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Teachers</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Assists</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Courses</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <!-- <UserIcon class="svg_item"></UserIcon> -->
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Administration</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Assists</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Assists</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Assists</span>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <BeakerIcon class="size-6 text-blue-500" />
                        <span class="list_span" :ref="el => setRef(el as HTMLElement | null)">Assists</span>
                    </a>
                </li>
            </ul>
        </nav>

        <!-- third section-->
        <div class="section_footer">
            <!-- line -->
            <div class="line"></div>

            <!--container to dark mode -->
            <div class="dark_mode_container">
                <div class="info_mode">
                    <IconMoon class="icon-dark" stroke={1} />
                    <span>Dark Mode</span>
                </div>

                <div class="switch_container">
                    <label class="switch">
                        <input type="checkbox" v-model="isChecked">
                        <span class="slider"></span>
                    </label>
                </div>
            </div>

            <div class="user_profile">
                <img src="../../assets/images/bwthuke.jpg" alt="avatar">
                <section class="info_user">
                    <span class="name_user">Sergio Quintnilla</span>
                    <span class="email_user">otrocorreorandom.quintanilla@geeks.lol</span>
                </section>
            </div>

        </div>
    </div>
</template>

<script setup lang="ts">
    import { useThemeStore } from '@/store/Theme';
    import { watch, ref, Ref,onMounted } from 'vue';
    import { BeakerIcon } from '@heroicons/vue/24/solid';

    //variables and consts
    const sidebar: Ref<HTMLElement | null> = ref(null)//manejando tipos del DOM con ts
    const SpanRefs:Ref<Array<HTMLElement | null>> = ref([])//Dom elements array

    //function to asigne one space to objects in array 
    const setRef = (element: HTMLElement | null) => {
        if (element && !SpanRefs.value.includes(element)) { // 💡 Evita duplicados
            SpanRefs.value.push(element);
        }
    };
    
    //function to use in the Botton
    const sickMenu = () => {
        sidebar.value?.classList.toggle('mini_barra');
        
        // Si los spans se están acumulando, reinicia el array
        SpanRefs.value = SpanRefs.value.filter((span, index, self) => 
            span && self.indexOf(span) === index // 💡 Filtra duplicados
        );

        SpanRefs.value.forEach((span) => {
            if (span) {
                span.classList.toggle('hide_sick');
            }
        });

        console.log("SpanRefs después de toggle:", SpanRefs.value);
    };

    //cambiar a modoOscuro
    //utilizando el store de pinia
    const themeStore = useThemeStore();

    const isChecked = ref<boolean>(false);
    watch(isChecked, (newVal, OldVal)=>{
        let bodyElement = document.body
        bodyElement.classList.toggle('dark_mode')
    })

</script>

<style>
@import url(../../css/variables.css);
    /* design to container */
    .menu_bar{
        width: 100%;
        height: 100%;
        padding: 20px 15px;
        background: var(--color-third);
        font-family: var(--font-v2);
        transition: width .5s ease, background-color 0.3s ease;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }
    .name_institution{
        width: 100%;
        height: 53px;
        display: flex;
        font-family: var(--font-v1);
        flex-direction: row;
        align-items: center;
    }
    /* icon menu disign */
    .icon_main_menu{
        width: 50px;
        min-width: 50px;
        cursor: pointer;
    }
    .name_span, .list_span{
        font-size: 25px;
        margin-left: 7px;
        opacity: 1;
        transition: opacity .5s ease;
    }
    .list_span{
        font-size: 17px;
    }
    .mini_barra{
        width: 85px;
    }
    .hide_sick{
        opacity: 0;
    }
    .navegation{
        height: 600px;
        overflow-y: auto;
        overflow-x: hidden;
    }
    .navegation::-webkit-scrollbar{
        width: 5px;
    }
    .navegation::-webkit-scrollbar-thumb{
        background-color: var(--scroll-color);
        border-radius: 5px;
    }
    .navegation::-webkit-scrollbar-thumb:hover{
        background-color: var(--scroll-color-hover);
        border-radius: 5px;
    }
    /* options menu design */
    .list_navegation li{
        list-style: none;
        display: flex;
        margin-bottom: 15px;
        margin-top: 15px;
        padding: 4px;
        
        /* disign to the links */
        >a{
            width: 100%;
            height: 48px;
            display: flex;
            align-items: center;
            text-decoration: none;
            border-radius: 10px;
            color: var(--color-text1);
            gap: 12px;
        }
        >a:hover{
            background: var(--color-text-hover);
        }
        /* design to the icons */
        .svg_item{
            font-size: 20px;
        }
    }
    .line{
        width: 100%;
        height: 3px;
        background: var(--color-lines);
    }
    /* dark mode design*/
    .dark_mode_container{
        margin-top: 15px;
        width: 100%;
        border-radius: 10px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .dark_mode_container .info_mode{
        width: 150px;
        height: 45px;
        display: flex;
        align-items: center;
        color: var(--color-text1);
        overflow: hidden;
        flex-wrap: wrap;
        gap: 5px;
    }
    .dark_mode_container .info_mode .icon-dark{
        width: 37px;
        min-width: 37px;
        font-size: 20px;
        margin-left: 5px;
    }
    /* switch */
    .switch_container{
        min-width: 50px;
        height: 45px;
        margin-right: 10px;
        margin-top: 6px;
    }
    /* The switch - the box around the slider */
    .switch {
        font-size: 16px;
        position: relative;
        display: inline-block;
        width: 3.4em;
        height: 2em;
    }
    .switch input {
        opacity: 0;
        width: 0;
        height: 0;
    }
    /* The slider */
    .slider {
        position: absolute;
        cursor: pointer;
        inset: 0;
        border: 2px solid #414141;
        border-radius: 50px;
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
    .slider:before {
        position: absolute;
        content: "";
        height: 1.4em;
        width: 1.4em;
        left: 0.2em;
        bottom: 0.2em;
        background-color: rgb(139, 136, 136);
        border-radius: inherit;
        transition: all 0.4s cubic-bezier(0.23, 1, 0.320, 1);
    }
    .switch input:checked + .slider {
        box-shadow: 0 0 20px rgba(9, 201, 2, 0.8);
        border: 2px solid #3eb818;
    }
    .switch input:checked + .slider:before {
        transform: translateX(1.5em);
    }
    /* third section of the menu */
    .section_footer{
        display: flex;
        flex-direction: column;
        gap: 22px;
    }
    /* usuario section*/
    .user_profile{
        display: flex;
        flex-direction: row;
        gap: 5px;
        width: 100%;
        >img{
            width: 50px;
            min-width: 50px;
            border-radius: 10px;
        }
    }
    .info_user{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-items: center;
        color: var(--color-text1);
        overflow: hidden;
        /* name and emial */
        > .name_user{
            font-size: 15px;
            font-weight: 600;
        }
        .email_user{
            font-size: 12px;
        }
    }
    /* ----------media querrys for responsive menu */
    @media (max-height:660px) {
        .navegation{
            height: 400px;
        }
        .section_footer{
            gap: 0;
        }
    }
</style>