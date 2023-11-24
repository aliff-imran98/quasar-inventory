// src/pages/MyPage.vue
<template>
  <q-page>
    <q-btn
      @click="$router.push({ name: 'createCpu' })"
      label="Create CPU"
      color="primary"
    />
    <q-table :rows="tableData" :columns="columns" row-key="id"
      ><template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn icon="mode_edit" @click="editRow(props.row)"></q-btn>
          <q-btn icon="delete" @click="deleteRow(props.row)"></q-btn>
        </q-td> </template
    ></q-table>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabaseInit from "src/boot/supabase";
import { useRoute, useRouter } from "vue-router";

export default {
  setup() {
    const tableData = ref([]);
    const supabase = supabaseInit;
    const router = useRouter();

    const columns = [
      // Define your table columns here
      { name: "id", label: "ID", align: "left", field: "id", sortable: true },
      {
        name: "cpu_name",
        label: "CPU",
        align: "left",
        field: "cpu_name",
        sortable: true,
      },
      {
        name: "cpu_brand",
        label: "Brand",
        align: "left",
        field: "cpu_brand",
        sortable: true,
      },
      {
        name: "cpu_serial",
        label: "Serial Number",
        align: "left",
        field: "cpu_serial",
        sortable: true,
      },
      {
        name: "cpu_cost",
        label: "Cost",
        align: "left",
        field: "cpu_cost",
        sortable: true,
      },
      { name: "actions", label: "Action", align: "center" },

      // Add more columns as needed
    ];

    onMounted(async () => {
      // Fetch data from Supabase
      const { data, error } = await supabase.from("Cpu").select("*");

      if (error) {
        console.error("Error fetching data from Supabase:", error.message);
      } else {
        console.log("Data from Supabase:", data);
        tableData.value = data.map((row) => ({
          ...row,
        }));
      }
    });

    const editRow = (row) => {
      // Handle edit action, e.g., open a dialog for editing
      console.log("Editing row:", row);
      router.push({ name: "edit", params: { id: row.id } });
    };

    const deleteRow = async (row) => {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this row?"
      );

      if (confirmDelete) {
        // Perform the actual delete operation
        const { error } = await supabase.from("Cpu").delete().eq("id", row.id);

        if (error) {
          console.error("Error deleting row:", error.message);
        } else {
          // Update the tableData after successful deletion
          tableData.value = tableData.value.filter(
            (item) => item.id !== row.id
          );
        }
      }
    };

    return {
      tableData,
      columns,
      editRow,
      deleteRow,
    };
  },
};
</script>
