<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <Skeleton width="w-32" height="h-5" />
      <Skeleton width="w-24" height="h-8" />
    </div>
    
    <div class="h-48 bg-gray-200 rounded animate-pulse"></div>
  </div>
</template>
