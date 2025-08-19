<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div>
    <header class="bg-white border-b border-gray-200 p-4 flex justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p class="text-gray-600">
          Welcome back! Here's what's happening with your bookmarks.
        </p>
      </div>
      <div class="flex items-center">
        <button
          class="bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
        >
          <Icon icon="material-symbols:add" />
          <span>Add Bookmark</span>
        </button>
      </div>
    </header>
  </div>
</template>
