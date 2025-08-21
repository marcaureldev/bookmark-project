<script setup lang="ts">
import SearchAndFilters from './SearchAndFilters.vue';
import BookmarksGrid from './BookmarksGrid.vue';

interface Bookmark {
  id: string;
  title: string;
  domain: string;
  description: string;
  tags: string[];
  addedDate: string;
  visits: number;
  isStarred: boolean;
  icon: string;
  iconColor: string;
}

interface Props {
  bookmarks: Bookmark[];
  tags: string[];
  hasMore: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'search': [query: string];
  'filterStatus': [status: 'all' | 'read' | 'unread'];
  'filterTag': [tag: string];
  'toggleStar': [id: string];
  'openMenu': [bookmark: Bookmark, event: Event];
  'visit': [id: string];
  'loadMore': [];
}>();

const totalCount = props.bookmarks.length;
const readCount = props.bookmarks.filter(b => b.isStarred).length;
const unreadCount = totalCount - readCount;
</script>

<template>
  <div class="space-y-6">
    <SearchAndFilters
      :total-count="totalCount"
      :read-count="readCount"
      :unread-count="unreadCount"
      :tags="props.tags"
      @search="emit('search', $event)"
      @filter-status="emit('filterStatus', $event)"
      @filter-tag="emit('filterTag', $event)"
    />

    <BookmarksGrid
      :bookmarks="props.bookmarks"
      :has-more="props.hasMore"
      @toggle-star="emit('toggleStar', $event)"
      @open-menu="(bookmark, event) => emit('openMenu', bookmark, event)"
      @visit="emit('visit', $event)"
      @load-more="emit('loadMore')"
    />
  </div>
</template>
