<script setup lang="ts">
import { Icon } from "@iconify/vue";
import { ref } from 'vue';

interface Props {
  totalCount: number;
  readCount: number;
  unreadCount: number;
  tags: string[];
}

defineProps<Props>();
const emit = defineEmits<{
  'search': [query: string];
  'filterStatus': [status: 'all' | 'read' | 'unread'];
  'filterTag': [tag: string];
  'viewAllTags': [];
}>();

const searchQuery = ref('');
const activeStatus = ref<'all' | 'read' | 'unread'>('all');
const activeTag = ref('all');

const handleSearch = () => {
  emit('search', searchQuery.value);
};

const handleStatusFilter = (status: 'all' | 'read' | 'unread') => {
  activeStatus.value = status;
  emit('filterStatus', status);
};

const handleTagFilter = (tag: string) => {
  activeTag.value = tag;
  emit('filterTag', tag);
};
</script>

<template>
  <div class="space-y-4">
    <div class="flex flex-col sm:flex-row gap-4">
      <div class="flex-1 relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon icon="material-symbols:search" class="h-5 w-5 text-gray-400" />
        </div>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Rechercher dans vos favoris..."
          class="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 placeholder-gray-500"
        />
      </div>

      <div class="flex gap-2">
        <button
          @click="handleStatusFilter('all')"
          :class="[
            'px-4 py-2.5 rounded-lg font-medium transition-colors',
            activeStatus === 'all'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
          ]"
        >
          Tous ({{ totalCount }})
        </button>
        <button
          @click="handleStatusFilter('unread')"
          :class="[
            'px-4 py-2.5 rounded-lg font-medium transition-colors',
            activeStatus === 'unread'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
          ]"
        >
          Non lus ({{ unreadCount }})
        </button>
        <button
          @click="handleStatusFilter('read')"
          :class="[
            'px-4 py-2.5 rounded-lg font-medium transition-colors',
            activeStatus === 'read'
              ? 'bg-gray-900 text-white'
              : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
          ]"
        >
          Lus ({{ readCount }})
        </button>
      </div>
    </div>

    <div class="flex flex-wrap gap-2">
      <button
        @click="handleTagFilter('all')"
        :class="[
          'px-3 py-2 rounded-lg font-medium transition-colors flex items-center gap-2',
          activeTag === 'all'
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
        ]"
      >
        <Icon icon="material-symbols:filter-list" class="w-4 h-4" />
        Tous les tags
      </button>

      <button
        v-for="tag in tags"
        :key="tag"
        @click="handleTagFilter(tag)"
        :class="[
          'px-3 py-2 rounded-lg font-medium transition-colors',
          activeTag === tag
            ? 'bg-gray-900 text-white'
            : 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
        ]"
      >
        {{ tag }}
      </button>
    </div>
  </div>
</template>
