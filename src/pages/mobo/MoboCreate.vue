<!-- src/pages/CreateCpuPage.vue -->
<template>
  <q-page class="q-pa-md">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 800px; max-width: 800px">
        <q-card-section>
          <div class="text-h6 text-center q-ma-md">Create Motherboard</div>
          <q-form @submit="createMobo">
            <q-input v-model="moboData.mobo_name" label="Motherboard Name" />
            <q-input v-model="moboData.mobo_brand" label="Motherboard Brand" />
            <q-input
              v-model="moboData.mobo_serial"
              label="Motherboard Serial"
            />
            <q-input
              v-model="moboData.mobo_cost"
              label="Motherboard Cost"
              type="number"
            />
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Create Motherboard"
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
    const moboData = ref({
      mobo_name: "",
      mobo_brand: "",
      mobo_serial: "",
      mobo_cost: 0,
    });

    const supabase = supabaseInit;
    const router = useRouter();

    const createMobo = async () => {
      try {
        const { data, error } = await supabase
          .from("Mobo")
          .insert([moboData.value]);

        if (error) {
          console.error("Error creating mobo:", error.message);
        } else {
          console.log("Mobo created successfully:", data);
          router.push({ name: "mobo" });
          // Redirect to another page or update the current page as needed
        }
      } catch (error) {
        console.error("Create error:", error.message);
      }
    };

    return {
      moboData,
      createMobo,
    };
  },
};
</script>
