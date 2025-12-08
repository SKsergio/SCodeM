<template>
    <div class="conatiner__data_load">
        <!-- <div class="loadeer_container" v-if="store.loading">
            <Load2Component></Load2Component>
        </div> -->
        <div>
            <HeaderComponent :endpoint="'students/studentsManagers'" :store_id="'catalogue-studentsManagers'"
                :title="'Students Manager'">
            </HeaderComponent>
            <div class="conatiner_crud">
                <TableGridComponent>
                    :rows="students"
                    :columns="[
                        { key: 'first_name', label: 'Nombre' },
                        { key: 'first_last_name', label: 'Apellido' },
                        { key: 'email', label: 'Correo' },
                        { key: 'age', label: 'Edad' },
                        { key: 'file', label: 'Foto' },
                    ]"
                    >
                    <template #cell="{ row, column }">

                        <!-- ejemplo: columna Foto -->
                        <img v-if="column.key === 'file'" :src="row.file.url" width="50" />

                        <!-- Default -->
                        <template v-else>
                            {{ row[column.key] }}
                        </template>

                    </template>
                </TableGridComponent>

            </div>

        </div>
    </div>

</template>

<script setup lang="ts">
import HeaderComponent from '@/components/templates/HeaderComponent.vue';
import { onMounted, ref } from 'vue';
import TableGridComponent from '@/components/templates/TableGridComponent.vue';
// import { StudentManagerResponse } from '@/interfaces/students/StudentManagers';
import 
// let managers = ref([])<>

// onMounted(()=>{

// })


</script>

<style scoped>
.conatiner_crud {
    width: 94%;
    margin: 0 auto;
    margin-top: -16px;
}

.conatiner__data_load {
    display: flex;
    flex-direction: column;
    position: relative;
}

.loadeer_container {
    position: fixed;
    top: 0;
    height: 100%;
    left: 0;
    right: 0;
    background-color: rgba(48, 46, 46, 0.822);
    z-index: 99;
}
</style>
