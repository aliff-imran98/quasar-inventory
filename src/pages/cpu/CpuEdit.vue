<template>
  <q-page>
    <q-container>
      <div class="full-width" style="max-width: 900px">
        <div class="text-h6 text-center q-ma-md">Edit CPU</div>
        <q-card class="q-ma-sm">
          <q-card-section>
            <q-form @submit="updateCpu">
              <q-input v-model="cpuData.cpu_name" label="CPU Name" />
              <q-input v-model="cpuData.cpu_brand" label="CPU Brand" />
              <q-input
                v-model="cpuData.cpu_cost"
                label="CPU Cost"
                type="number"
              />
              <q-input v-model="cpuData.cpu_serial" label="CPU Serial" />
              <q-btn
                class="q-ma-md"
                type="submit"
                label="Update CPU"
                color="primary"
              />
            </q-form>
          </q-card-section>
        </q-card>
      </div>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabaseInit from "src/boot/supabase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const cpuData = ref({
      cpu_name: "",
      cpu_brand: "",
      cpu_cost: 0,
      cpu_serial: "",
    });

    const supabase = supabaseInit;
    const router = useRouter();
    const cpuId = router.currentRoute.value.params.id;
    console.log("CPU ID:", cpuId);

    onMounted(async () => {
      // Fetch CPU data based on the ID from the route parameter
      const { data, error } = await supabase
        .from("Cpu")
        .select("*")
        .eq("id", cpuId)
        .single();

      if (error) {
        console.error("Error fetching CPU data:", error.message);
      } else {
        console.log("Fetched CPU data:", data);
        cpuData.value = data;
      }
    });

    const updateCpu = async () => {
      try {
        console.log("Updating CPU with data:", cpuData.value);
        const { data, error } = await supabase
          .from("Cpu")
          .update({
            cpu_name: cpuData.value.cpu_name,
            cpu_brand: cpuData.value.cpu_brand,
            cpu_cost: cpuData.value.cpu_cost,
            cpu_serial: cpuData.value.cpu_serial,
          })
          .eq("id", cpuId);

        if (error) {
          console.error("Error updating CPU:", error.message);
        } else {
          console.log("CPU updated successfully:", data);
          // Redirect to the home page
          router.push({ name: "cpu" });
        }
      } catch (error) {
        console.error("Update error:", error.message);
      }
    };

    return {
      cpuData,
      updateCpu,
    };
  },
};
</script>
