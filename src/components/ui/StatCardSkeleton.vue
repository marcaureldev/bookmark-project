<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <Skeleton width="w-24" height="h-4" />
      <div class="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
    </div>
    
    <div class="mb-4">
      <Skeleton width="w-16" height="h-8" className="mb-2" />
      <Skeleton width="w-32" height="h-4" />
    </div>
    
    <Skeleton width="w-full" height="h-2" />
  </div>
</template>
