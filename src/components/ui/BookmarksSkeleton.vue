<template>
  <div class="space-y-6">
    <!-- Header skeleton -->
    <div class="flex items-center justify-between">
      <div class="space-y-2">
        <div class="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
        <div class="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
      </div>
      <div class="h-12 w-40 bg-gray-200 rounded-lg animate-pulse"></div>
    </div>

    <!-- Search and filters skeleton -->
    <div class="space-y-4">
      <div class="h-12 w-full bg-gray-200 rounded-lg animate-pulse"></div>
      <div class="flex gap-3">
        <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-8 w-20 bg-gray-200 rounded animate-pulse"></div>
      </div>
    </div>

    <!-- Bookmarks grid skeleton -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="i in 6" :key="i" class="bg-white border border-gray-200 rounded-lg p-4 space-y-3">
        <div class="flex items-start justify-between">
          <div class="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-6 w-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        <div class="h-3 w-full bg-gray-200 rounded animate-pulse"></div>
        <div class="flex gap-2">
          <div class="h-6 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-6 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div class="flex items-center justify-between">
          <div class="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div class="h-3 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Composant skeleton pour BookMarksView
</script>
