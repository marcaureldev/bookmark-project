<script setup lang="ts">
import { computed } from "vue";
import { Icon } from "@iconify/vue";

interface Props {
  readingCount: number;
  completedCount: number;
  totalCount: number;
  activeTags: Array<{
    name: string;
    count: number;
    icon: string;
  }>;
}

const props = defineProps<Props>();

const progressPercentage = computed(() => {
  if (props.totalCount === 0) return 0;
  return Math.round((props.completedCount / props.totalCount) * 100);
});
</script>

<template>
  <div class="bg-white rounded-xl border border-gray-200 p-6">
    <div v-if="readingCount > 0">
      <div class="flex items-center justify-between mb-4">
        <div>
          <h3 class="text-lg font-semibold text-gray-900">
            En cours de lecture
          </h3>
          <p class="text-sm text-gray-600">
            Vos bookmarks actuellement consultés
          </p>
        </div>
        <div
          class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center"
        >
          <Icon
            icon="material-symbols:schedule"
            class="w-5 h-5 text-purple-600"
          />
        </div>
      </div>

      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="text-center">
          <div class="text-2xl font-bold text-purple-600">
            {{ readingCount }}
          </div>
          <div class="text-sm text-gray-600">En cours</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-green-600">
            {{ completedCount }}
          </div>
          <div class="text-sm text-gray-600">Terminés</div>
        </div>
        <div class="text-center">
          <div class="text-2xl font-bold text-blue-600">{{ totalCount }}</div>
          <div class="text-sm text-gray-600">Total</div>
        </div>
      </div>

      <div class="mb-4">
        <div class="flex justify-between text-sm text-gray-600 mb-2">
          <span>Progression globale</span>
          <span>{{ progressPercentage }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2">
          <div
            class="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full transition-all duration-300"
            :style="{ width: `${progressPercentage}%` }"
          ></div>
        </div>
      </div>
    </div>

    <div v-else>
      <div class="text-center py-4">
        <Icon
          icon="material-symbols:bookmark-outline"
          class="w-8 h-8 text-gray-400 mx-auto mb-2"
        />
        <p class="text-sm text-gray-500">Aucun bookmark en cours de lecture</p>
      </div>
    </div>
  </div>
</template>
