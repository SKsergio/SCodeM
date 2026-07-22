<template>
    <div class="table_section">
        <table class="table-outline">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="String(col.key)" :class="`col-${String(col.key)}`"
                        :style="col.width ? { width: col.width } : undefined">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, i) in rows" :key="row.id ?? i">
                    <td v-for="col in columns" :key="String(col.key)" :class="`col-${String(col.key)}`"
                        :style="col.width ? { width: col.width } : undefined">

                        <slot :name="`cell-${String(col.key)}`" :row="row" :column="col">
                            {{ row[col.key] }}
                        </slot>

                    </td>
                </tr>
            </tbody>
        </table>
        <div class="no_content" v-if="length == 0">
            <h1>NO HAY REGISTROS PARA MOSTRAR</h1>
            <img src="../../assets/images/404preview.png" alt="404" srcset="">
        </div>
    </div>

</template>
<script setup lang="ts" generic="T extends { id?: number | string }">
import { ColumnDefinition } from "@/interfaces/templates/TableInterface";

defineProps<{
    rows: T[];
    columns: ColumnDefinition<T>[];
    length: number
}>();

</script>

<style scoped>
.table_section {
    display: flex;
    width: 100%;
    flex-direction: column;
}

.table-outline {
    width: 100%;
    font-size: 14px;
    font-family: var(--font-v2, sans-serif);
    background-color: var(--color-sixth);
    color: #ffffff;
    border-collapse: separate; 
    border-spacing: 0;
    border: 1px solid var(--color-fourth);
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); 
    overflow: hidden;
}

/* Encabezados */
.table-outline thead th {
    background-color: var(--color-fourth);
    color: var(--color-text-line);
    padding: 14px 16px;
    text-align: left;
    font-weight: 600;
    text-transform: uppercase; 
    font-size: 12px;
    letter-spacing: 0.5px;
    border-bottom: 2px solid var(--color-primary); 
}

.table-outline tbody td {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.05); /* Línea divisoria muy suave entre filas */
    transition: background-color 0.2s ease; /* Hover suave */
}

.table-outline tbody tr:last-child td {
    border-bottom: none;
}

.table-outline tbody tr:hover td {
    background-color: var(--table-hover);
}

/* ESTADO: Sin Registros (404) */
.no_content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 40px 20px;
    margin-top: 15px;
    background-color: var(--color-sixth);
    border: 1px dashed var(--color-fourth);
    border-radius: 12px;
}

.no_content h1 {
    font-size: 16px;
    font-weight: 500;
    color: #a0a0a0; /* Texto grisáceo para no ser tan agresivo */
    margin-bottom: 20px;
    text-align: center;
}

.no_content img {
    max-width: 200px;
    opacity: 0.6; /* Un poco de opacidad para encajar en el tema oscuro */
    filter: grayscale(30%);
}

/* Responsive */
@media (max-width: 768px) {
    .table-outline {
        font-size: 13px;
    }

    /* Corregido: en tu código original decía .table en lugar de .table-outline */
    .table-outline th,
    .table-outline td {
        padding: 10px 12px;
    }
}
</style>