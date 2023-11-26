<!-- src/pages/CreateCpuPage.vue -->
<template>
  <q-page class="q-pa-md">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 800px; max-width: 800px">
        <q-card-section>
          <div class="text-h6 text-center q-ma-md">Create GPU</div>
          <q-form @submit="createGpu">
            <q-input v-model="gpuData.gpu_name" label="Graphic Card Name" />
            <q-input v-model="gpuData.gpu_brand" label="Graphic Card Brand" />
            <q-input v-model="gpuData.gpu_serial" label="Graphic Card Serial" />
            <q-input
              v-model="gpuData.gpu_cost"
              label="Graphic Card Cost"
              type="number"
            />
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Create Graphic Card"
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
    const gpuData = ref({
      gpu_name: "",
      gpu_brand: "",
      gpu_serial: "",
      gpu_cost: 0,
    });

    const supabase = supabaseInit;
    const router = useRouter();

    const createGpu = async () => {
      try {
        const { data, error } = await supabase
          .from("Gpu")
          .insert([gpuData.value]);

        if (error) {
          console.error("Error creating Gpu:", error.message);
        } else {
          console.log("Gpu created successfully:", data);
          router.push({ name: "gpu" });
          // Redirect to another page or update the current page as needed
        }
      } catch (error) {
        console.error("Create error:", error.message);
      }
    };

    return {
      gpuData,
      createGpu,
    };
  },
};
</script>
