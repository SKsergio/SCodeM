<template>
   <table>
      <thead>
         <tr>
            <th v-for="col in columns" :key="String(col.key)">
               {{ col.label }}
            </th>
         </tr>
      </thead>

      <tbody>
         <tr v-for="row in rows" :key="row.id ?? JSON.stringify(row)">
            <td v-for="col in columns" :key="String(col.key)">
               <slot name="cell" :row="row" :column="col">
                  <!-- fallback si no se usa slot -->
               {{ row[col.key] }}
          </slot>
            </td>
         </tr>
      </tbody>
   </table>
</template>

<script setup lang="ts" generic="T">
   import { PropType } from "vue";
   import { ColumnDefinition } from "@/interfaces/templates/TableInterface";

   const props = defineProps({
      rows: {
         type: Array as PropType<any[]>,
         required: true
      },
      columns: {
         type: Array as PropType<ColumnDefinition<any>[]>,
         required: true
      }
   });

</script>

<style scoped>

</style>