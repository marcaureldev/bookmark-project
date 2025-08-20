<script setup lang="ts">
interface Props {
  modelValue: 'weekly' | 'monthly' | 'yearly';
}

const props = defineProps<Props>();
const emit = defineEmits<{
  'update:modelValue': [value: 'weekly' | 'monthly' | 'yearly']
}>();

const periods = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' }
];

const selectPeriod = (period: 'weekly' | 'monthly' | 'yearly') => {
  emit('update:modelValue', period);
};
</script>

<template>
  <div class="flex space-x-1 bg-gray-100 rounded-lg p-1">
    <button
      v-for="period in periods"
      :key="period.value"
      @click="selectPeriod(period.value as 'weekly' | 'monthly' | 'yearly')"
      :class="[
        'px-3 py-1.5 text-sm font-medium rounded-md transition-all duration-200',
        props.modelValue === period.value
          ? 'bg-white text-gray-900 shadow-sm'
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      ]"
    >
      {{ period.label }}
    </button>
  </div>
</template>
