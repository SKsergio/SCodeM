<template>
    <div class="table_section">
        <table class="table-outline">
            <thead>
                <tr>
                    <th v-for="col in columns" :key="String(col.key)">
                        {{ col.label }}
                    </th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(row, i) in rows" :key="row.id ?? i">
                    <td v-for="col in columns" :key="String(col.key)">
                        <slot name="cell" :row="row" :column="col">
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
    .table_section{
        display: flex;
        height: 100%;
        width: 100%;
        flex-direction: column;

    }
.table-outline {
    width: 100%;
    font-size: 14px;
    font-family: var(--font-v2);
    border: 3px solid var(--color-fourth);
    border-radius: 8px;
    overflow: hidden;
}

.table-outline thead {
    background-color: var(--color-fourth);

}

/* encabezados */
.table-outline thead th {
    padding: 5px 12px;
    text-align: left;
    font-weight: 600;
    color: var(--color-primary);
}

/* celdas */
.table-outline td {
    padding: 10px 12px;
}


.table-outline th:last-child,
.table-outline td:last-child {
    border-right: none;
}

.table-outline tbody tr:hover {
    background-color: var(--table-hover);
}

/* última fila sin borde inferior */
.table-outline tbody tr:last-child td {
    border-bottom: none;
}


/* Responsive */
@media (max-width: 768px) {
    .table {
        font-size: 13px;
    }

    .table th,
    .table td {
        padding: 10px;
    }
}
</style>