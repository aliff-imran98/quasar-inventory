<template>
  <q-page class="q-pa-md bg-grey-4">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 300px; max-width: 500px">
        <q-card-section>
          <div class="text-h6 text-center q-ma-md">Login</div>
          <q-form @submit="login">
            <!-- Your login form fields go here -->
            <q-input v-model="email" label="Email" />
            <q-input v-model="password" label="Password" type="password" />
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Login"
              color="primary"
            />
            <div class="text-subtitle1">
              Don't have an account?
              <router-link to="/auth/register">Register here.</router-link>
            </div>
          </q-form>
        </q-card-section>
      </q-card>
    </q-container>
  </q-page>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import supabaseInit from "src/boot/supabase";

export default {
  setup() {
    const router = useRouter();
    const supabase = supabaseInit;
    const email = ref("");
    const password = ref("");

    const login = async () => {
      try {
        const { user, error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        if (error) {
          window.alert(error.message);
          console.error("Login error:", error.message);
        } else {
          console.log("User logged in:", user);
          router.push({ name: "HomePage" });
        }
      } catch (error) {
        console.error("Login error:", error.message);
      }
    };

    const registerPage = () => {
      router.push({ name: "RegisterPage" });
    };

    return {
      email,
      password,
      login,
      registerPage,
    };
  },
};
</script>
