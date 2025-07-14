import Swal from 'sweetalert2'

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
                Swal.fire('Error', 'No se pudo editar el elemento.', 'error');
                console.error('Error al editar:', e);
                return false;
            }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
            return false;
        }
        return false;
    });
};