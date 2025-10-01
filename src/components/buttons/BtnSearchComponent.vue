<style scoped>
.input-container {
    position: relative;
    display: flex;
    align-items: center;
}

.input {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 18px 16px;
    background-color: transparent;
    cursor: pointer;
    transition: all .5s ease-in-out;
}

.input::placeholder {
    color: transparent;
}

.input:focus::placeholder {
    color: rgb(131, 128, 128);
}

.input:focus,
.input:not(:placeholder-shown) {
    background-color: #fff;
    border: 1px solid rgb(91, 107, 255);
    width: 290px;
    cursor: none;
    padding: 18px 16px 18px 45px;
}

.icon {
    position: absolute;
    left: 0;
    height: 45px;
    width: 45px;
    background-color: #fff;
    border-radius: 99px;
    z-index: -1;
    fill: rgb(91, 107, 255);
    border: 1px solid rgb(91, 107, 255);
}

.input:focus+.icon,
.input:not(:placeholder-shown)+.icon {
    z-index: 0;
    background-color: transparent;
    border: none;
}
</style>

<template>
    <div class="input-container">
        <input type="text" name="text" class="input" placeholder="Search something..." v-model="search_input" @input="chagneSearch">
        <svg xmlns="http://www.w3.org/2000/svg" fill="" viewBox="0 0 24 24" class="icon">
            <g stroke-width="0" id="SVGRepo_bgCarrier"></g>
            <g stroke-linejoin="round" stroke-linecap="round" id="SVGRepo_tracerCarrier"></g>
            <g id="SVGRepo_iconCarrier">
                <rect fill="white" height="24" width="24"></rect>
                <path fill=""
                    d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM9 11.5C9 10.1193 10.1193 9 11.5 9C12.8807 9 14 10.1193 14 11.5C14 12.8807 12.8807 14 11.5 14C10.1193 14 9 12.8807 9 11.5ZM11.5 7C9.01472 7 7 9.01472 7 11.5C7 13.9853 9.01472 16 11.5 16C12.3805 16 13.202 15.7471 13.8957 15.31L15.2929 16.7071C15.6834 17.0976 16.3166 17.0976 16.7071 16.7071C17.0976 16.3166 17.0976 15.6834 16.7071 15.2929L15.31 13.8957C15.7471 13.202 16 12.3805 16 11.5C16 9.01472 13.9853 7 11.5 7Z"
                    clip-rule="evenodd" fill-rule="evenodd"></path>
            </g>
        </svg>
    </div>
</template>

<script setup lang="ts" generic="T">
    import { ref } from 'vue';
    import { useCatalogueStore } from '@/store/CatalogueStore';

    const props = defineProps<{
        store_id: string,
        endpoint: string
    }>()

    const store = useCatalogueStore<T>(props.store_id, props.endpoint)()
    

    let search_input = ref('')

    const chagneSearch = () =>{
        callApi()
        console.log(search_input.value);
    }


    const callApi = async() =>{
        try {
            let valores = await store.searchRecords(props.endpoint, search_input.value)
        } catch (error) {
            console.error("No se pudieron cargar los registros académicos.");
        }
    }

</script>
