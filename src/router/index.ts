import { createWebHistory, createRouter } from "vue-router";
import HomeView from "../views/HomeView.vue";
import RegisterView from "../views/auth/RegisterView.vue";
import LoginView from "../views/auth/LoginView.vue";
import DashboardView from "../views/dashboard/DashboardView.vue";
import BookMarksView from "../views/dashboard/BookMarksView.vue";
import DashboardLayout from "../layouts/dashboard-layout.vue";

const routes = [
  {
    path: "/",
    component: HomeView,
    meta: { requiresGuest: true },
  },
  {
    path: "/auth/register",
    component: RegisterView,
    meta: { requiresGuest: true },
  },
  {
    path: "/auth/login",
    component: LoginView,
    meta: { requiresGuest: true },
  },
  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: DashboardView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/bookmarks",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "",
        component: BookMarksView,
        meta: { requiresAuth: true },
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: (_to: any) => {
      const token = localStorage.getItem("token");
      return token ? "/dashboard" : "/auth/login";
    },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation Guards
router.beforeEach((to, _from, next) => {
  const token = localStorage.getItem("token");
  const isAuthenticated = !!token;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next("/auth/login");
    return;
  }

  if (to.meta.requiresGuest === true && isAuthenticated) {
    next("/dashboard");
    return;
  }

  next();
});

export default router;
