<template>
  <q-page>
    <q-container>
      <q-form @submit="updateGpu">
        <q-input v-model="gpuData.gpu_name" label="Graphic Card Name" />
        <q-input v-model="gpuData.gpu_brand" label="Graphic Card Brand" />
        <q-input
          v-model="gpuData.gpu_cost"
          label="Graphic Card Cost"
          type="number"
        />
        <q-input v-model="gpuData.gpu_serial" label="Graphic Card Serial" />
        <q-btn type="submit" label="Update Graphic Card" color="primary" />
      </q-form>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabaseInit from "src/boot/supabase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const gpuData = ref({
      gpu_name: "",
      gpu_brand: "",
      gpu_cost: 0,
      gpu_serial: "",
    });

    const supabase = supabaseInit;
    const router = useRouter();
    const gpuId = router.currentRoute.value.params.id;
    console.log("Gpu ID:", gpuId);

    onMounted(async () => {
      // Fetch CPU data based on the ID from the route parameter
      const { data, error } = await supabase
        .from("Gpu")
        .select("*")
        .eq("id", gpuId)
        .single();

      if (error) {
        console.error("Error fetching Gpu data:", error.message);
      } else {
        console.log("Fetched Gpu data:", data);
        gpuData.value = data;
      }
    });

    const updateGpu = async () => {
      try {
        console.log("Updating GpuS with data:", gpuData.value);
        const { data, error } = await supabase
          .from("Gpu")
          .update({
            gpu_name: gpuData.value.gpu_name,
            gpu_brand: gpuData.value.gpu_brand,
            gpu_cost: gpuData.value.gpu_cost,
            gpu_serial: gpuData.value.gpu_serial,
          })
          .eq("id", gpuId);

        if (error) {
          console.error("Error updating Gpu:", error.message);
        } else {
          console.log("Gpu updated successfully:", data);
          // Redirect to the home page
          router.push({ name: "gpu" });
        }
      } catch (error) {
        console.error("Update error:", error.message);
      }
    };

    return {
      gpuData,
      updateGpu,
    };
  },
};
</script>
