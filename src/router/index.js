import { createRouter, createWebHistory } from 'vue-router';
import HomeView from "../Views/HomeView.vue";
import LoginView from "../Views/LoginView.vue";
import SignUpView from "../Views/SignupView.vue";
import ChoresView from "../Views/ChoresView.vue";
import ExpenseView from "../Views/ExpenseView.vue";

const routes = [
  {
    path: "/",
    name: "HomeView",
    component: HomeView,
  },

    {
        path: "/home",
        name: "Dashboard",
        component: HomeView,
    },

    {
      path: "/chores",
      name: "Chores",
      component: ChoresView,
  },
  
  {
    path: "/expense",
    name: "Expense",
    component: ExpenseView,
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
