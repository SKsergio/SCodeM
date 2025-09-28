import Swal from 'sweetalert2'
import { getErrorMessage } from '@/error/getError';
import { ApiError } from '@/interfaces/ApiError';


export const ErrorAlert = (e: ApiError) => { //pasamos la funcion como parametro
     Swal.fire({
        title:'ERROR',
        text: getErrorMessage(e),
        icon:'error',
        customClass: {
            popup: 'cont_pop',
            title: 'title_alert',
            icon: 'icon_alert'
        }
    });
}