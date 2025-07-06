<template>    
    <div class="slide__cotainer" v-if="actionRecords">
        <section class="slide_content" v-for="(item) in actionRecords[0].records" :key="item.id">
            <CardRecordsComponent 
                :records="item" 
                :edit-files="actionRecords[0].editableFields"
                @delete_record="(HandleDelete)"
            />
        </section>
    </div>
</template>

<script setup lang="ts" generic="T extends AbstractCatalog">
    import { AbstractCatalog } from '@/interfaces/Catalogues/CataloguesInterface';
    import { CatalogMetaData } from '@/interfaces/templates/CatalogDataInterface';
    import { RecordsActionData } from '@/interfaces/templates/CatalogDataInterface';
    import CardRecordsComponent from './CardRecordsComponent.vue';
    import { DeleteCatalog } from '@/services/Catalogues/DegreeService';
    import {computed } from 'vue';
    import Swal from 'sweetalert2'

    const emit = defineEmits<{
        (e:'refresh_records'):void
    }>()

    const mostrarAlerta = (id:number) => {
        Swal.fire({
            title: '¿Estás seguro de eliminar el registro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass:{
                popup:'cont_pop',
                title:'title_alert',
                icon:'icon_alert'
            }
        }).then(async(result) => {
            if (result.isConfirmed) {
                try {
                    await DeleteCatalog(id, props.metaData.api_name);
                    emit('refresh_records'); 
                    console.log('Elemento eliminado');
                } catch (e) {
                    console.error('Error al eliminar:', e);
                    Swal.fire('Error', 'No se pudo eliminar el elemento.', 'error');
                }
            }
        })
    }

    const props = defineProps<{
        metaData:CatalogMetaData<T>
    }>()

    //desuctructurar los componentes de metaData
    // let records: Ref<T[]> = ref([]);//asi le indicamos que no esta undefined al principio, sino que esta con un array vacio
    let actionRecords = computed<RecordsActionData<T>[]>(()=>[{
        records:props.metaData.records,
        editableFields: props.metaData.editableFields//editable fields to metaData
    }]);

    const HandleDelete=(id:number)=>{
        mostrarAlerta(id)
    }
</script>

<style>
    @import url('@/css/variables.css');
    .slide__cotainer{
        background: var(--color-third);  
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 25px;
        padding: 30px;
        border-radius: 25px 5px 25px 5px;
    }
    .btn_linker{
        background-color: rgb(30, 6, 54);
        width: 100%;
        height: 100%;
    }
    .cont_pop{
        font-family: var(--font-decoration2);
        background: var(--color-third);
        color: var(--color-text1);
        border-radius: 24px;
    }
    .title_alert{
        font-size: 22px;
    }
</style>