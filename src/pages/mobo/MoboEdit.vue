<template>
  <q-page class="q-pa-md">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 800px; max-width: 800px">
        <div class="text-h6 text-center q-ma-md">Edit CPU</div>
        <q-card-section>
          <q-form @submit="updateMobo">
            <q-input v-model="moboData.mobo_name" label="Motherboard Name" />
            <q-input v-model="moboData.mobo_brand" label="Motherboard Brand" />
            <q-input
              v-model="moboData.mobo_cost"
              label="Motherboard Cost"
              type="number"
            />
            <q-input
              v-model="moboData.mobo_serial"
              label="Motherboard Serial"
            />
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Update Motherboard"
              color="primary"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import { ref, onMounted } from "vue";
import supabaseInit from "src/boot/supabase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const moboData = ref({
      mobo_name: "",
      mobo_brand: "",
      mobo_cost: 0,
      mobo_serial: "",
    });

    const supabase = supabaseInit;
    const router = useRouter();
    const moboId = router.currentRoute.value.params.id;
    console.log("Mobo ID:", moboId);

    onMounted(async () => {
      // Fetch CPU data based on the ID from the route parameter
      const { data, error } = await supabase
        .from("Mobo")
        .select("*")
        .eq("id", moboId)
        .single();

      if (error) {
        console.error("Error fetching Mobo data:", error.message);
      } else {
        console.log("Fetched Mobo data:", data);
        moboData.value = data;
      }
    });

    const updateMobo = async () => {
      try {
        console.log("Updating CPU with data:", moboData.value);
        const { data, error } = await supabase
          .from("Mobo")
          .update({
            mobo_name: moboData.value.mobo_name,
            mobo_brand: moboData.value.mobo_brand,
            mobo_cost: moboData.value.mobo_cost,
            mobo_serial: moboData.value.mobo_serial,
          })
          .eq("id", moboId);

        if (error) {
          console.error("Error updating Mobo:", error.message);
        } else {
          console.log("Mobo updated successfully:", data);
          // Redirect to the home page
          router.push({ name: "mobo" });
        }
      } catch (error) {
        console.error("Update error:", error.message);
      }
    };

    return {
      moboData,
      updateMobo,
    };
  },
};
</script>
