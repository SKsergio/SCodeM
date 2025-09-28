import Swal from 'sweetalert2'
import { SuccesAlert } from './successAlert';
import { ErrorAlert } from './ErrorAlert';
import { ApiError } from '@/interfaces/ApiError';

export const ShowCreateAlert = async(fn: () => Promise<void>): Promise<boolean> => {
    return Swal.fire({
        title: '¿Estás seguro de crear el registro?',
        text: 'Se creara un regsitro permanente en la Base de Datos',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'Cancelar',
        customClass: {
            popup: 'cont_pop',
            title: 'title_alert',
            icon: 'icon_alert'
        }
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                await fn();
                SuccesAlert('creado correctamente')
                return true;
            } catch (e) {
                const err = e as ApiError;//casteandolo
                ErrorAlert(err);
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
        return false;
    });
};

//si haces algo tan bien, hazlo tantas veces hasta que te parezca que lo haces mal, 
//y si haces algo tan mal, hazlo tantas veces hasta que te parezca que lo haces bien