<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { useRouter } from "vue-router";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem('token');
  
  router.push('/');
};
</script>

<template>
  <button
    @click="handleLogout"
    class="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-100 hover:text-gray-900 rounded-lg transition-colors"
  >
    <Icon icon="material-symbols:logout" class="w-5 h-5" />
    <span class="font-medium">Se déconnecter</span>
  </button>
</template>
