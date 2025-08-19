<script setup lang="ts">
import { Icon } from "@iconify/vue";

interface PopularTag {
  name: string;
  count: number;
  icon: string;
  color: string;
}

interface Props {
  tags: PopularTag[];
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'viewAll': [],
  'manageTags': []
}>();
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm p-6">
    <div class="flex items-center justify-between mb-6">
      <h3 class="text-lg font-semibold text-gray-900">Popular Tags</h3>
      <button
        @click="emit('viewAll')"
        class="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors"
      >
        View All
      </button>
    </div>

    <div class="space-y-4 mb-6">
      <div
        v-for="tag in props.tags"
        :key="tag.name"
        class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div class="flex items-center space-x-3">
          <div :class="`w-8 h-8 ${tag.color} rounded-lg flex items-center justify-center`">
            <Icon :icon="tag.icon" class="w-4 h-4 text-white" />
          </div>
          <span class="font-medium text-gray-900">{{ tag.name }}</span>
        </div>
        <span class="text-sm font-semibold text-gray-600">{{ tag.count }}</span>
      </div>
    </div>

    <button
      @click="emit('manageTags')"
      class="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
    >
      Manage Tags
    </button>
  </div>
</template>
