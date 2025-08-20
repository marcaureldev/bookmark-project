<script setup lang="ts">
import { RouterView } from "vue-router";
import Sidebar from "../components/dashboard/Sidebar.vue";
import Header from "../components/dashboard/Header.vue";
</script>

<template>
  <div class="flex h-screen bg-gray-50 text-black">
    <Sidebar class="fixed" />
    <div class="flex-1 flex flex-col ml-64">
            <Header class="sticky top-0 z-10" />
              <div class="flex-1 p-5">
          <RouterView />
        </div>
    </div>
  </div>
</template>
