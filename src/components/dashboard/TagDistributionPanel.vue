<script setup lang="ts">
import TagDistributionChart from '../charts/TagDistributionChart.vue';
import TimePeriodSelector from './TimePeriodSelector.vue';
import { ref } from 'vue';

interface TagData {
  tag: string;
  read: number;
  unread: number;
}

interface Props {
  data: TagData[];
}

const props = defineProps<Props>();
const timePeriod = ref<'weekly' | 'monthly' | 'yearly'>('monthly');

const handlePeriodChange = (period: 'weekly' | 'monthly' | 'yearly') => {
  timePeriod.value = period;
};
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Tag Distribution</h3>
      <TimePeriodSelector
        v-model="timePeriod"
        @update:modelValue="handlePeriodChange"
      />
    </div>

    <TagDistributionChart
      :data="props.data"
      :timePeriod="timePeriod"
    />
  </div>
</template>
