<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import LogoutButton from "./LogoutButton.vue";

const route = useRoute();
const router = useRouter();

const currentPage = ref(route.path);

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "streamline:dashboard-3",
    section: "main",
    path: "/dashboard",
  },
  {
    id: "bookmarks",
    label: "My Bookmarks",
    icon: "material-symbols:bookmark-outline",
    section: "main",
    path: "/bookmarks",
  },
];

const sections = [
  {
    id: "main",
    title: "MAIN",
    items: navigationItems,
  },
];

const user = {
  name: "John Doe",
  email: "test@email.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
};

const navigateTo = (path: string) => {
  currentPage.value = path;
  router.push(path);
};
</script>

<template>
  <div class="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
    <div class="flex-1 py-4 space-y-8">
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center"
          >
            <Icon icon="material-symbols:bookmark" class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-900">Bookmarks</span>
        </div>
      </div>

      <nav class="space-y-1">
        <div v-for="section in sections" :key="section.id">
          <h3 class="px-4 text-xs font-semibold text-gray-500 uppercase tracking-wider">
            {{ section.title }}
          </h3>
          <div class="mt-2 space-y-1">
            <button
              v-for="item in section.items"
              :key="item.id"
               @click="navigateTo(item.path)"
              :class="[
                'w-full flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors',
                currentPage === item.path
                  ? 'bg-blue-50 text-blue-700 border-r-4 border-blue-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              ]"
            >
              <Icon :icon="item.icon" class="w-5 h-5" />
              <span>{{ item.label }}</span>
            </button>
          </div>
        </div>
      </nav>
    </div>

    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center space-x-3 mb-4">
        <img
          :src="user.avatar"
          :alt="user.name"
          class="w-10 h-10 rounded-full"
        />
        <div class="flex-1 min-w-0">
          <p class="text-sm font-medium text-gray-900 truncate">
            {{ user.name }}
          </p>
          <p class="text-xs text-gray-500 truncate">
            {{ user.email }}
          </p>
        </div>
      </div>
      
      <LogoutButton />
    </div>
  </div>
</template>
