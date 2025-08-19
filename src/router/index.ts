import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import LoginView from "../views/auth/LoginView.vue";
import DashboardLayout from "../layouts/dashboard-layout.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import BookMarksView from "../views/dashboard/BookMarksView.vue";

const routes = [
  { path: "/", component: HomeView },
  { path: "/auth/register", component: RegisterView },
  { path: "/auth/login", component: LoginView },
  {
    path: "",
    component: DashboardLayout,
    children: [
      { path: "/dashboard", component: DashboardView },
      { path: "/bookmarks", component: BookMarksView },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
