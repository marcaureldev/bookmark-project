<script setup lang="ts">
import TagDistributionChart from '../charts/TagDistributionChart.vue';
import TimePeriodSelector from './TimePeriodSelector.vue';
import { Icon } from '@iconify/vue';
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
defineEmits<{
  'addBookmark': []
}>();
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

    <div v-if="!props.data || props.data.length === 0" class="text-center py-8">
      <div class="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon icon="material-symbols:category-outline" class="w-8 h-8 text-gray-400" />
      </div>
      <h4 class="text-lg font-medium text-gray-900 mb-2">Aucune donnée disponible</h4>
      <p class="text-gray-600 mb-4">Ajoutez des bookmarks avec des tags pour voir la distribution</p>
      <button 
        @click="$emit('addBookmark')"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Ajouter un bookmark
      </button>
    </div>

    <TagDistributionChart
      v-else
      :data="props.data"
      :timePeriod="timePeriod"
    />
  </div>
</template>
