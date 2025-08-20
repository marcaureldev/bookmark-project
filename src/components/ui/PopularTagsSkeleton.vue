<script setup lang="ts">
import Skeleton from './Skeleton.vue';
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <Skeleton width="w-24" height="h-5" />
      <Skeleton width="w-16" height="h-4" />
    </div>
    
    <div class="space-y-4 mb-6">
      <div v-for="i in 5" :key="i" class="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
        <div class="flex items-center space-x-3">
          <div class="w-8 h-8 bg-gray-200 rounded-lg animate-pulse"></div>
          <Skeleton width="w-20" height="h-4" />
        </div>
        <Skeleton width="w-8" height="h-4" />
      </div>
    </div>
    
    <Skeleton width="w-full" height="h-10" />
  </div>
</template>
