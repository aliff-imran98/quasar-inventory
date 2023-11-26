<template>
  <q-page class="q-pa-md bg-grey-4">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 500px; max-width: 500px">
        <q-card-section>
          <div class="text-h6 text-center q-ma-md">Register</div>
          <q-form @submit="register">
            <!-- Your login form fields go here -->
            <q-input v-model="email" label="Email" />
            <q-input v-model="password" label="Password" type="password" />
            <q-input
              v-model="confirmPassword"
              label="Confirm Password"
              type="password"
              required
            >
            </q-input>
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Register"
              color="primary"
            />
            <div class="text-subtitle1">
              Already have an account?
              <router-link to="/auth/login">Login here.</router-link>
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
    const confirmPassword = ref("");

    const register = async () => {
      if (password.value !== confirmPassword.value) {
        window.alert("Password not match");
        return;
      }

      try {
        const { user, error } = await supabase.auth.signUp({
          email: email.value,
          password: password.value,
        });

        if (error) {
          console.error("Registration error:", error.message);
        } else {
          console.log("User registered:", user);
          router.push({ name: "LoginPage" });
          // Redirect to another page or update the current page as needed
        }
      } catch (error) {
        console.error("Registration error:", error.message);
      }
    };

    const loginPage = () => {
      router.push({ name: "LoginPage" });
    };

    return {
      email,
      password,
      register,
      loginPage,
      confirmPassword,
    };
  },
};
</script>
