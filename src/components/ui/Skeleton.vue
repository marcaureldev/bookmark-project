<script setup lang="ts">
interface SkeletonProps {
  width?: string;
  height?: string;
  className?: string;
}

withDefaults(defineProps<SkeletonProps>(), {
  width: 'w-full',
  height: 'h-4',
  className: ''
});
</script>

<template>
  <div 
    :class="`bg-gray-200 rounded animate-pulse ${width} ${height} ${className}`"
  ></div>
</template>
