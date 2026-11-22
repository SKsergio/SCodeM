import Swal from 'sweetalert2'
import { ErrorAlert } from './ErrorAlert';
import { type ApiError } from '@/interfaces/ApiError';

export const ShowDeleteAlert = (fn:()=> Promise<void>) => { //pasamos la funcion como parametro
        return Swal.fire({
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
                    await fn(); // Espera a que la función asíncrona termine
                    return true;
                } catch (e) {
                    console.error('Error al eliminar:', e);
                    ErrorAlert(e as ApiError);
                    return false;
                }
            }
            return false;
        })
    }