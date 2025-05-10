<template>
    <button class="btn_delete" @click="mostrarAlerta()">Cancel</button>
</template>

<script setup lang="ts">
    import Swal from 'sweetalert2'

    const emits = defineEmits<{
        (e:'cancel_click'):void
    }>()

    const mostrarAlerta = () => {
        Swal.fire({
            title: '¿Estás seguro de cancelar esta accion?',
            text: 'No se guardaran los datos',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'quedarse',
            customClass:{
                popup:'cont_pop',
                title:'title_alert',
                icon:'icon_alert'
            }
        }).then((result) => {
            if (result.isConfirmed) {
               emits('cancel_click')
            }
        })
    }
</script>

<style scoped>
    .btn_delete {
        background: var(--color-delete);
        border-radius: 7px;
        border: 2px solid #00000040;
        text-shadow: 1px 1px 1px #00000040;
        box-shadow: 8px 8px 20px 0px #45090059;
        padding: 8px 30px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: white;
        font-size: 15px;
        font-weight: 500;
        min-width: 50px;
    }
    .btn_delete:hover {
        box-shadow: none;
        opacity: 80%;
    }
</style>