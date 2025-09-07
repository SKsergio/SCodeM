import Swal from 'sweetalert2'

export const SuccesAlert = (message:string) => Swal.fire({
    title: 'Registro '+ message,
    text: 'Accion ejecutada correctamente',
    icon: 'success',
    customClass: {
        popup: 'cont_pop',
        title: 'title_alert',
        icon: 'icon_alert'
    }
})