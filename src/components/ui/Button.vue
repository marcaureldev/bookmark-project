<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface Props {
  icon: string;
  label: string;
}

const props = withDefaults(defineProps<Props>(), {
  icon: "material-symbols:login",
  label: "Login",
});
</script>

<template>
  <button
    class="px-4 py-2 bg-gray-800/80 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700/80 transition-colors flex items-center space-x-2 pointer-events-auto cursor-pointer"
  >
    <Icon :icon="props.icon" width="24" height="24" />
    <span>{{ props.label }}</span>
  </button>
</template>
