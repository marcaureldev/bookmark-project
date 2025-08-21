<script setup lang="ts">
import { Icon } from "@iconify/vue";

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
  bookmark: Bookmark;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  toggleStar: [id: string];
  openMenu: [bookmark: any, event: Event];
  visit: [id: string];
}>();

const handleToggleStar = () => {
  emit("toggleStar", props.bookmark.id);
};

const handleOpenMenu = (event: Event) => {
  emit("openMenu", props.bookmark, event);
};

</script>

<template>
  <div
    class="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
  >
    <div class="flex items-start justify-between mb-3">
      <div
        :class="`w-10 h-10 ${props.bookmark.iconColor} rounded-lg flex items-center justify-center`"
      >
        <Icon :icon="props.bookmark.icon" class="w-5 h-5 text-white" />
      </div>

      <div class="flex items-center gap-2">
        <button
          @click="handleToggleStar"
          class="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Icon
            :icon="
              props.bookmark.isStarred
                ? 'material-symbols:star'
                : 'material-symbols:star-outline'
            "
            :class="[
              'w-5 h-5',
              props.bookmark.isStarred ? 'text-yellow-400' : 'text-gray-400',
            ]"
          />
        </button>
        <button
          @click="handleOpenMenu"
          class="p-1 hover:bg-gray-100 rounded transition-colors"
        >
          <Icon
            icon="material-symbols:more-vert"
            class="w-5 h-5 text-gray-400"
          />
        </button>
      </div>
    </div>

    <div class="space-y-2">
      <h3 class="font-semibold text-gray-900 text-sm leading-tight">
        {{ props.bookmark.title }}
      </h3>

      <p class="text-xs text-gray-500">
        {{ props.bookmark.domain }}
      </p>

      <p class="text-xs text-gray-700 leading-relaxed line-clamp-2">
        {{ props.bookmark.description }}
      </p>
    </div>

    <div class="mt-4 flex items-center justify-between">
      <div class="space-y-2">
        <div class="flex flex-wrap gap-1">
          <span
            v-for="tag in props.bookmark.tags.slice(0, 2)"
            :key="tag"
            class="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-700 rounded-full"
          >
            {{ tag }}
          </span>
        </div>

        <p class="text-xs text-gray-500">
          Ajouté {{ props.bookmark.addedDate }}
        </p>
      </div>

      <div class="text-right">
        <p class="text-xs text-gray-500">{{ props.bookmark.visits }} visites</p>
      </div>
    </div>
  </div>
</template>
