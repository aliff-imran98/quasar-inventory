<!-- src/pages/CreateCpuPage.vue -->
<template>
  <q-page class="q-pa-md">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 800px; max-width: 800px">
        <q-card-section>
          <div class="text-h6 text-center q-ma-md">Create CPU</div>
          <q-form @submit="createCpu">
            <q-input v-model="cpuData.cpu_name" label="CPU Name" />
            <q-input v-model="cpuData.cpu_brand" label="CPU Brand" />
            <q-input v-model="cpuData.cpu_serial" label="CPU Serial" />
            <q-input
              v-model="cpuData.cpu_cost"
              label="CPU Cost"
              type="number"
            />
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Create CPU"
              color="primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import { ref } from "vue";
import supabaseInit from "src/boot/supabase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const cpuData = ref({
      cpu_name: "",
      cpu_brand: "",
      cpu_serial: "",
      cpu_cost: 0,
    });

    const supabase = supabaseInit;
    const router = useRouter();

    const createCpu = async () => {
      try {
        const { data, error } = await supabase
          .from("Cpu")
          .insert([cpuData.value]);

        if (error) {
          console.error("Error creating CPU:", error.message);
        } else {
          console.log("CPU created successfully:", data);
          router.push({ name: "cpu" });
          // Redirect to another page or update the current page as needed
        }
      } catch (error) {
        console.error("Create error:", error.message);
      }
    };

    return {
      cpuData,
      createCpu,
    };
  },
};
</script>
