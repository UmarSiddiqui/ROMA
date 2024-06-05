import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../Views/HomeView.vue";
import LoginView from "../Views/LoginView.vue";
import SignUpView from "../Views/SignupView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },

    {
        path: "/login",
        name: "Login",
        component: LoginView,
    },

    {
      path: "/signup",
      name: "Signup",
      component: SignUpView,
  },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
