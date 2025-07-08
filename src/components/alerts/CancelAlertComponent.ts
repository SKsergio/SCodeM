const mostrarAlerta = (id:number) => {
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
                    await DeleteCatalog(id, props.metaData.api_name);
                    emit('refresh_records'); 
                } catch (e) {
                    console.error('Error al eliminar:', e);
                    Swal.fire('Error', 'No se pudo eliminar el elemento.', 'error');
                }
            }
        })
    }