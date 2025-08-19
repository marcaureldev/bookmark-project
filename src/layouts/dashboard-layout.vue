<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "../components/dashboard/Sidebar.vue";
import Header from "../components/dashboard/Header.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-50 text-black">
    <Sidebar />
    <div class="flex-1 flex flex-col">
      <Header />
      <div class="flex-1 p-4">
        <RouterView />
      </div>
    </div>
  </div>
</template>
