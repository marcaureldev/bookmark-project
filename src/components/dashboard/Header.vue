<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from "vue";

const searchQuery = ref("");
const notificationCount = ref(3);

const handleSearch = () => {

};

const handleNotificationClick = () => {

};
</script>

<template>
  <div>
    <header class="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div>
        <h1 class="text-xl font-semibold text-gray-900">Dashboard</h1>
        <p class="text-gray-600 text-sm">
          Overview of your bookmark statistics
        </p>
      </div>
      
      <div class="flex items-center space-x-4">
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon icon="material-symbols:search" class="h-5 w-5 text-gray-400" />
          </div>
          <input
            v-model="searchQuery"
            @keyup.enter="handleSearch"
            type="text"
            placeholder="Rechercher..."
            class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500 text-sm"
          />
        </div>

        <div class="relative">
          <button
            @click="handleNotificationClick"
            class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative"
          >
            <Icon icon="material-symbols:notifications-outline" class="h-6 w-6" />

            <span
              v-if="notificationCount > 0"
              class="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
            >
              {{ notificationCount > 9 ? '9+' : notificationCount }}
            </span>
          </button>
        </div>


      </div>
    </header>
  </div>
</template>
