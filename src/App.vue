<template>
  <v-app>
    <v-app-bar app class="gradient-navbar">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-btn text @click="goTo('/home')">
        <v-toolbar-title>RoomEase</v-toolbar-title>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn text @click="goTo('/home')" class="d-none d-md-flex">Dashboard</v-btn>
      <v-btn text @click="goTo('/chores')" class="d-none d-md-flex">Chores</v-btn>
      <v-btn text @click="goTo('/expense')" class="d-none d-md-flex">Expense</v-btn>
      <v-btn text @click="goTo('/login')" class="d-none d-md-flex">Login</v-btn>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" app temporary class="gradient-navbar">
      <v-list>
        <v-list-item @click="goTo('/home')">Dashboard</v-list-item>
        <v-list-item @click="goTo('/chores')">Chores</v-list-item>
        <v-list-item @click="goTo('/expense')">Expense</v-list-item>
        <v-list-item @click="goTo('/login')">Login</v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();
    const drawer = ref(false);

    function goTo(route) {
      router.push(route);
      drawer.value = false; // Close the drawer after navigation
    }

    function signOut() {
      // Implement your sign out logic here
      console.log("Signing out...");
      // Potentially redirect to home or login page
      router.push('/signin');
    }

    return { goTo, signOut, drawer };
  }
})
</script>

<style>
.gradient-navbar {
  background: linear-gradient(to right, #c2d6a9, #a4ec83) !important;
}
</style>