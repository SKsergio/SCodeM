import Swal from 'sweetalert2'

export const InfoMessageAlert = (titleMessage:string, func:string) => Swal.fire({
    title: 'El '+titleMessage,
    text: func,
    icon: 'info',
    customClass: {
        popup: 'cont_pop',
        title: 'title_alert',
        icon: 'icon_alert'
    }
})