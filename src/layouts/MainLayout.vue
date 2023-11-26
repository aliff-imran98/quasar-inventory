<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-primary text-white">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />
        <q-toolbar-title> Computer Inventory </q-toolbar-title>

        <q-space />

        <q-btn flat @click="settingsPage"
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
            <q-icon name="home" size="md" />
          </q-item-section>

          <q-item-section>Home</q-item-section>
        </q-item>

        <q-separator />

        <q-item to="/cpu" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-microchip" size="md" />
          </q-item-section>

          <q-item-section>CPU</q-item-section>
        </q-item>

        <q-separator />

        <q-item to="/mobo" exact clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-desktop" size="md" />
          </q-item-section>

          <q-item-section>Motherboard</q-item-section>
        </q-item>

        <q-separator />

        <q-item to="/gpu" clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="fa-solid fa-image" size="md" />
          </q-item-section>
          <q-item-section>Graphic Card</q-item-section>
        </q-item>

        <q-separator />
      </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-4">
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

    const settingsPage = () => {
      router.push({ name: "Settings" });
    };

    return {
      logout,
      settingsPage,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
};
</script>
