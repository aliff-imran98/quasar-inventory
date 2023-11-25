<!-- src/pages/RegisterPage.vue -->
<template>
  <q-page>
    <q-container>
      <q-form @submit="register">
        <q-input v-model="email" label="Email" />
        <q-input v-model="password" label="Password" type="password" />
        <q-btn type="submit" label="Register" color="primary" />
        <q-btn @click="loginPage" label="Login Page" color="primary" />
      </q-form>
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

    const register = async () => {
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
    };
  },
};
</script>
