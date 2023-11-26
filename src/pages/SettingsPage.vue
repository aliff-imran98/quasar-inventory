<!-- src/pages/SettingsPage.vue -->
<template>
  <q-page class="q-pa-md">
    <q-container class="row wrap justify-center items-start content-start">
      <q-card style="overflow: auto; min-width: 800px; max-width: 800px">
        <q-card-section>
          <h2 class="text-h6 text-center q-ma-md">Change Password</h2>
          <q-form @submit="changePassword">
            <q-input
              v-model="oldPassword"
              label="Old Password"
              type="password"
              required
            />
            <q-input
              v-model="newPassword"
              label="New Password"
              type="password"
              required
            />
            <q-input
              v-model="confirmPassword"
              label="Confirm New Password"
              type="password"
              required
            />
            <q-btn
              class="q-ma-md"
              type="submit"
              label="Change Password"
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
import { useRouter } from "vue-router";
import supabaseInit from "src/boot/supabase";

export default {
  setup() {
    const router = useRouter();
    const supabase = supabaseInit;
    const oldPassword = ref("");
    const newPassword = ref("");
    const confirmPassword = ref("");

    const changePassword = async () => {
      // Add validation logic for password matching and strength as needed
      if (newPassword.value !== confirmPassword.value) {
        window.alert("Password not match");
        return;
      }

      try {
        // Implement your authentication library or API method to change the password
        // This is just a mock implementation using Supabase for illustration purposes
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user) {
          const { error: signInError } = await supabase.auth.signInWithPassword(
            {
              email: user.email, // Assuming email-based authentication
              password: oldPassword.value,
            }
          );

          if (signInError) {
            console.error(
              "Old password verification error:",
              signInError.message
            );
            window.alert("Incorrect old password");
            return;
          }

          const { error } = await supabase.auth.updateUser({
            password: newPassword.value,
          });

          if (error) {
            console.error("Change password error:", error.message);
            // Handle error, show error message, etc.
          } else {
            console.log("Password changed successfully.");
            router.push({ name: "HomePage" });
            // Show success message or navigate to another page
          }
        }
      } catch (error) {
        console.error("Change password error:", error.message);
        // Handle error, show error message, etc.
      }
    };

    return {
      oldPassword,
      newPassword,
      confirmPassword,
      changePassword,
    };
  },
};
</script>
