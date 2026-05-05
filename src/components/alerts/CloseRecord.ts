import Swal from 'sweetalert2'
import { SuccesAlert } from './successAlert';
import { ErrorAlert } from './ErrorAlert';
import { ApiError } from '@/interfaces/ApiError';

export const CloseRecordAlert = <T = void>(fn: () => Promise<T>, tipo: string, context: string): Promise<T | false> => { //pasamos la funcion como parametro
    return Swal.fire({
        title: `¿Estás seguro de cerrar el ${tipo}?`,
        text: context,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, Cerrar',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'cont_pop',
            title: 'title_alert',
            icon: 'icon_alert'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const response = await fn();
                SuccesAlert(`${tipo} cerrado correctamente.`)
                return response;
            } catch (e) {
                const err = e as ApiError;//casteandolo
                ErrorAlert(err);
                return false;
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
        return false;
    })
}