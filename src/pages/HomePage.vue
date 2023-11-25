<template>
  <q-page class="q-ma-md">
    <q-container>
      <div class="flex flex-center full-width">
        <q-card class="q-ma-md">
          <q-card-section>
            <h2 class="text-h6">Number of CPUs: {{ cpuCount }}</h2>
          </q-card-section>
        </q-card>

        <q-card class="q-ma-md">
          <q-card-section>
            <h2 class="text-h6">Number of Motherboard: {{ moboCount }}</h2>
          </q-card-section>
        </q-card>

        <q-card class="q-ma-md">
          <q-card-section>
            <h2 class="text-h6">Number of Graphic Card: {{ gpuCount }}</h2>
          </q-card-section>
        </q-card>
      </div>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabaseInit from "src/boot/supabase";

export default {
  setup() {
    const cpuCount = ref(0);
    const moboCount = ref(0);
    const gpuCount = ref(0);
    //  const computerCount = ref(0);
    const supabase = supabaseInit;

    const fetchCpuCount = async () => {
      try {
        const { data, count, error } = await supabase
          .from("Cpu") // Replace with your CPU table name
          .select("*", { count: "exact" });

        if (error) {
          console.error("Error fetching CPU count:", error.message);
        } else {
          cpuCount.value = count;
        }
      } catch (error) {
        console.error("Fetch CPU count error:", error.message);
      }
    };

    const fetchMoboCount = async () => {
      try {
        const { data, count, error } = await supabase
          .from("Mobo") // Replace with your CPU table name
          .select("*", { count: "exact" });

        if (error) {
          console.error("Error fetching Mobo count:", error.message);
        } else {
          moboCount.value = count;
        }
      } catch (error) {
        console.error("Fetch Mobo count error:", error.message);
      }
    };

    const fetchGpuCount = async () => {
      try {
        const { data, count, error } = await supabase
          .from("Gpu") // Replace with your CPU table name
          .select("*", { count: "exact" });

        if (error) {
          console.error("Error fetching Gpu count:", error.message);
        } else {
          gpuCount.value = count;
        }
      } catch (error) {
        console.error("Fetch Gpu count error:", error.message);
      }
    };

    /* const fetchComputerCount = async () => {
      try {
        const { count, error } = await supabase
          .from('computers') // Replace with your computer table name
          .select('id', { count: 'exact' })
          .single();

        if (error) {
          console.error('Error fetching computer count:', error.message);
        } else {
          computerCount.value = count;
        }
      } catch (error) {
        console.error('Fetch computer count error:', error.message);
      }
    };*/

    onMounted(() => {
      fetchCpuCount();
      fetchMoboCount();
      fetchGpuCount();
      //  fetchComputerCount();
    });

    return {
      cpuCount,
      moboCount,
      gpuCount,
      //  computerCount,
    };
  },
};
</script>
