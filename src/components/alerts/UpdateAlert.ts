import Swal from 'sweetalert2'
import { getErrorMessage } from '@/error/getError';

export const ShowUpdateAlert = (code: string, fn: () => Promise<void>): Promise<boolean> => {
    return Swal.fire({
        title: '¿Estás seguro de actualizar el registro?',
        text: 'El registro ' + code + ' cambiara permanentemente.',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, editar',
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
                return true;
            } catch (e) {
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
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
        return false;
    });
};

//si haces algo tan bien, hazlo tantas veces hasta que te parezca que lo haces mal, 
//y si haces algo tan mal, hazlo tantas veces hasta que te parezca que lo haces bien