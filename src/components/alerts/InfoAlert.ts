import Swal from 'sweetalert2'

export const InfoMessageAlert = (tipo:string) => Swal.fire({
    title: 'El '+tipo+' es exactamente igual',
    text: 'No se puede actualizar',
    icon: 'info',
    customClass: {
        popup: 'cont_pop',
        title: 'title_alert',
        icon: 'icon_alert'
    }
})