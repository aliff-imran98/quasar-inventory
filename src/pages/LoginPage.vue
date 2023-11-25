<template>
  <q-page>
    <q-container>
      <q-form @submit="login">
        <q-input v-model="email" label="Email" />
        <q-input v-model="password" label="Password" type="password" />
        <q-btn type="submit" label="Login" color="primary" />
        <q-btn @click="registerPage" label="Register Page" color="primary" />
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

    const login = async () => {
      try {
        const { user, error } = await supabase.auth.signInWithPassword({
          email: email.value,
          password: password.value,
        });

        if (error) {
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
