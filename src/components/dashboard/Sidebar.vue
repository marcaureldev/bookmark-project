<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const navigationItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "material-symbols:dashboard-outline",
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
  {
    id: "tags",
    label: "Tags",
    icon: "lucide:tag",
    section: "main",
    path: "/tags",
  },
  {
    id: "recent",
    label: "Recent",
    icon: "material-symbols:schedule-outline",
    section: "main",
    path: "/recent",
  },
  {
    id: "development",
    label: "Development",
    icon: "material-symbols:code",
    section: "collections",
    path: "/development",
  },
  {
    id: "reading",
    label: "Reading List",
    icon: "material-symbols:book-outline",
    section: "collections",
    path: "/reading",
  },
  {
    id: "inspiration",
    label: "Inspiration",
    icon: "material-symbols:lightbulb-outline",
    section: "collections",
    path: "/inspiration",
  },
  {
    id: "settings",
    label: "Settings",
    icon: "material-symbols:settings-outline",
    section: "settings",
    path: "/settings",
  },
  {
    id: "help",
    label: "Help & Support",
    icon: "material-symbols:help-outline",
    section: "settings",
    path: "/help",
  },
];

const sections = [
  { id: "main", title: "MAIN" },
  { id: "collections", title: "COLLECTIONS" },
  { id: "settings", title: "SETTINGS" },
];

const user = {
  name: "Alex Morgan",
  email: "alex@example.com",
  avatar: "/path/to/avatar.jpg",
};
</script>

<template>
  <div class="w-64 h-screen bg-white border-r border-gray-200 flex flex-col">
    <div class="flex-1 py-4 space-y-8">
      <div class="p-4 border-b border-gray-200">
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 bg-blue-700 rounded-lg flex items-center justify-center"
          >
            <Icon
              icon="material-symbols:bookmark-outline"
              class="w-6 h-6 text-white"
            />
          </div>
          <span class="text-xl font-bold text-black">BookMarker</span>
        </div>
      </div>

      <div v-for="section in sections" :key="section.id" class="space-y-3 px-2.5">
        <h3
          class="text-xs font-semibold text-gray-500 uppercase tracking-wider"
        >
          {{ section.title }}
        </h3>

        <div class="space-y-1">
          <span
            v-for="item in navigationItems.filter(
              (nav) => nav.section === section.id
            )"
            :key="item.id"
            :class="[
              'w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors',
              route.path === item.path
                ? 'bg-blue-100 text-blue-600'
                : 'text-gray-700 hover:bg-gray-50',
            ]"
            @click="router.push(item.path)"
          >
            <Icon
              :icon="item.icon"
              :class="[
                'w-5 h-5',
                route.path === item.path ? 'text-blue-600' : 'text-gray-500'
              ]"
            />
            <span class="font-medium">{{ item.label }}</span>
          </span>
        </div>
      </div>
    </div>

    <div class="border-t border-gray-200 p-4">
      <div class="flex items-center space-x-3">
        <div
          class="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center"
        >
          <Icon icon="material-symbols:person" class="w-6 h-6 text-gray-600" />
        </div>

        <div class="flex-1">
          <div class="font-semibold text-black text-sm">{{ user.name }}</div>
          <div class="text-gray-500 text-xs">{{ user.email }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
