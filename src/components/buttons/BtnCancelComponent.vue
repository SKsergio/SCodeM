<template>
    <button type="button" class="btn_cancel" @click="mostrarAlerta()">Cancel
        <CancelIcon></CancelIcon>
    </button>
</template>

<script setup lang="ts">
    import Swal from 'sweetalert2'
    import CancelIcon from '~icons/ri/close-large-line';

    const emits = defineEmits<{
        (e:'cancel_click'):void
    }>()

    const mostrarAlerta = () => {
        Swal.fire({
            title: '¿Estás seguro de cancelar esta accion?',
            text: 'No se guardaran los datos',
            icon: 'info',
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
    .btn_cancel {
        background: var(--color-cancel);
        border-radius: 7px;
        border: 2px solid var(--color-cancel);
        padding: 8px 20px;
        line-height: 20px;
        cursor: pointer;
        transition: all 0.3s;
        color: #e2d2d5;
        font-size: 15px;
        font-weight: 500;
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .btn_cancel:hover {
        box-shadow: none;
        opacity: 80%;
    }
    .btn_cancel:hover {
        background-color: var(--color-cancel);
    }
</style>