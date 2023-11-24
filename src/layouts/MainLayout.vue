<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Title </q-toolbar-title>

        <q-space />

        <q-btn flat @click="onClick"
          ><q-icon name="fa-solid fa-gear" class="q-px-md" />Settings</q-btn
        >
        <q-btn flat @click="logout"
          ><q-icon
            name="fa-solid fa-arrow-right-from-bracket"
            class="q-px-md"
          />Logout</q-btn
        >
      </q-toolbar>
    </q-header>

    <!--Drawer-->

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" elevated>
      <q-list>
        <q-item to="/" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="home" size="md" />
          </q-item-section>

          <q-item-section>Home</q-item-section>
        </q-item>

        <q-separator />

        <q-item to="/cpu" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="home" size="md" />
          </q-item-section>

          <q-item-section>CPU</q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="home" size="md" />
          </q-item-section>

          <q-item-section>Rounded avatar-type icon</q-item-section>
        </q-item>

        <q-separator />

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon color="primary" name="home" size="md" />
          </q-item-section>

          <q-item-section>Letter avatar-type</q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from "vue";
import supabaseInit from "src/boot/supabase";
import { useRouter } from "vue-router";

export default {
  setup() {
    const supabase = supabaseInit;
    const router = useRouter();
    const leftDrawerOpen = ref(false);
    const logout = async () => {
      await supabase.auth.signOut();
      router.push({ name: "LoginPage" });
    };

    return {
      logout,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
