<script setup lang="ts">
import BookmarkCard from "./BookmarkCard.vue";

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
  hasMore: boolean;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  'toggleStar': [id: string];
  'openMenu': [id: string];
  'visit': [id: string];
  'loadMore': [];
}>();

// const handleLoadMore = () => {
//   emit('loadMore');
// };
</script>

<template>
  <div class="space-y-6">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <BookmarkCard
        v-for="bookmark in props.bookmarks"
        :key="bookmark.id"
        :bookmark="bookmark"
        @toggle-star="emit('toggleStar', $event)"
        @open-menu="emit('openMenu', $event)"
        @visit="emit('visit', $event)"
      />
    </div>
  </div>
</template>
