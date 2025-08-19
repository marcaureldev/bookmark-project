<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface StatCardProps {
  title: string;
  icon: string;
  value: number;
  color: "blue" | "green" | "purple" | "red";
  percentage?: number;
  trend?: "up" | "down";
  subtitle?: string;
  type?: "simple" | "dual-metric";
  secondValue?: number;
  firstLabel?: string;
  secondLabel?: string;
  secondColor?: "green" | "red";
}

const props = withDefaults(defineProps<StatCardProps>(), {
  percentage: 0,
  trend: "up",
  subtitle: "",
  type: "simple",
  secondValue: 0,
  firstLabel: "",
  secondLabel: "",
  secondColor: "green",
});

const colorClasses = {
  blue: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    progress: "bg-blue-600",
    trend: "text-green-600",
  },
  green: {
    bg: "bg-green-100",
    text: "text-green-600",
    progress: "bg-green-600",
    trend: "text-green-600",
  },
  purple: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    progress: "bg-purple-600",
    trend: "text-green-600",
  },
  red: {
    bg: "bg-red-100",
    text: "text-red-600",
    progress: "bg-red-600",
    trend: "text-red-600",
  },
};

const currentColor = colorClasses[props.color];
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-4">
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-sm font-semibold text-gray-900">{{ title }}</h3>
      <div
        :class="`w-10 h-10 ${currentColor.bg} rounded-full flex items-center justify-center`"
      >
        <Icon :icon="icon" :class="`w-5 h-5 ${currentColor.text}`" />
      </div>
    </div>

    <div class="mb-4">
      <div v-if="type === 'dual-metric'">
        <div class="flex items-center justify-between">
          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 mb-1">
              {{ value.toLocaleString() }}
            </div>
            <div class="flex items-center justify-center">
              <div class="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">{{ firstLabel }}</span>
            </div>
          </div>

          <div class="text-center">
            <div class="text-2xl font-bold text-gray-900 mb-1">
              {{ secondValue.toLocaleString() }}
            </div>
            <div class="flex items-center justify-center">
              <div class="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
              <span class="text-sm text-gray-600">{{ secondLabel }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="percentage !== 0"
          class="flex items-center text-sm mt-4"
          :class="currentColor.trend"
        >
          <Icon
            :icon="
              trend === 'up'
                ? 'material-symbols:trending-up'
                : 'material-symbols:trending-down'
            "
            class="w-4 h-4 mr-1"
          />
          <span
            >{{ trend === "up" ? "↑" : "↓" }} {{ percentage }}% vs last
            month</span
          >
        </div>
      </div>

      <div v-else>
        <div class="text-3xl font-bold text-gray-900 mb-2">
          {{ value.toLocaleString() }}
        </div>
        <div
          v-if="percentage !== 0"
          class="flex items-center text-sm"
          :class="currentColor.trend"
        >
          <Icon
            :icon="
              trend === 'up'
                ? 'material-symbols:trending-up'
                : 'material-symbols:trending-down'
            "
            class="w-4 h-4 mr-1"
          />
          <span
            >{{ trend === "up" ? "↑" : "↓" }} {{ percentage }}% vs last
            month</span
          >
        </div>
        <div v-if="subtitle" class="text-sm text-gray-600">{{ subtitle }}</div>
      </div>
    </div>

    <div v-if="percentage !== 0" class="w-full bg-gray-200 rounded-full h-2">
      <div
        :class="`${currentColor.progress} h-2 rounded-full transition-all duration-500`"
        :style="`width: ${Math.min(percentage, 100)}%`"
      ></div>
    </div>
  </div>
</template>
