<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
  actionText?: string;
  actionIcon?: string;
  variant?: "default" | "success" | "warning" | "info";
}

const props = withDefaults(defineProps<EmptyStateProps>(), {
  variant: "default",
  actionText: "",
  actionIcon: "",
});

const emit = defineEmits<{
  action: [];
}>();

const variantClasses = {
  default: {
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
    actionBg: "bg-blue-600 hover:bg-blue-700",
    actionText: "text-white",
  },
  success: {
    iconBg: "bg-green-50",
    iconColor: "text-green-600",
    actionBg: "bg-green-600 hover:bg-green-700",
    actionText: "text-white",
  },
  warning: {
    iconBg: "bg-yellow-50",
    iconColor: "text-yellow-600",
    actionBg: "bg-yellow-600 hover:bg-yellow-700",
    actionText: "text-white",
  },
  info: {
    iconBg: "bg-indigo-50",
    iconColor: "text-indigo-600",
    actionBg: "bg-indigo-600 hover:bg-indigo-700",
    actionText: "text-white",
  },
};

const currentVariant = variantClasses[props.variant];
</script>

<template>
  <div class="text-center py-12 px-6">
    <div class="max-w-md mx-auto">
      <div
        :class="`w-20 h-20 ${currentVariant.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`"
      >
        <Icon :icon="icon" :class="`w-10 h-10 ${currentVariant.iconColor}`" />
      </div>

      <h3 class="text-xl font-semibold text-gray-900 mb-3">{{ title }}</h3>
      <p class="text-gray-600 mb-6 leading-relaxed">{{ description }}</p>

      <button
        v-if="actionText"
        @click="emit('action')"
        :class="`inline-flex items-center gap-2 px-6 py-3 ${currentVariant.actionBg} ${currentVariant.actionText} rounded-lg font-medium transition-all duration-200 transform hover:scale-105 hover:shadow-lg`"
      >
        <Icon v-if="actionIcon" :icon="actionIcon" class="w-5 h-5" />
        {{ actionText }}
      </button>
    </div>
  </div>
</template>
