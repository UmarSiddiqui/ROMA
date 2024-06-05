<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title>My Application</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text @click="goTo('/home')">Home</v-btn>
      <v-btn text @click="goTo('/about')">About</v-btn>
      <v-btn text @click="goTo('/contact')">Contact</v-btn>
      <v-btn text @click="goTo('/signin')">Sign In</v-btn>
      <v-btn text @click="signOut">Sign Out</v-btn>
    </v-app-bar>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter();

    function goTo(route) {
      router.push(route);
    }

    function signOut() {
      // Implement your sign out logic here
      console.log("Signing out...");
      // Potentially redirect to home or login page
      router.push('/signin');
    }

    return { goTo, signOut };
  }
})
</script>
