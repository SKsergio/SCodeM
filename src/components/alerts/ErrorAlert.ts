import Swal from 'sweetalert2'

export const ShowDeleteAlert = (fn:()=> Promise<void>) => { //pasamos la funcion como parametro
        Swal.fire({
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
                } catch (e) {
                    console.error('Error al eliminar:', e);
                    Swal.fire({
                        title:'Error al actualizar registro'
                    });
                }
            }
        })
    }