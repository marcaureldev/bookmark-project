<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ActivityChart from "../../components/charts/ActivityChart.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
import TagDistributionPanel from "../../components/dashboard/TagDistributionPanel.vue";
import PopularTagsList from "../../components/dashboard/PopularTagsList.vue";
import StatCardSkeleton from "../../components/ui/StatCardSkeleton.vue";
import TagDistributionSkeleton from "../../components/ui/TagDistributionSkeleton.vue";
import PopularTagsSkeleton from "../../components/ui/PopularTagsSkeleton.vue";
import { ref, onMounted, computed } from "vue";
import { bookmarksService } from "../../api/api";

interface Stats {
  total: number;
  read: number;
  reading: number;
  unread: number;
  byCategory: Array<{
    category: string;
    count: number;
  }>;
}

const stats = ref<Stats>({
  total: 0,
  read: 0,
  reading: 0,
  unread: 0,
  byCategory: [],
});

const isLoading = ref(true);
const error = ref<string | null>(null);

const fetchStats = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await bookmarksService.getStats();
    stats.value = response;
  } catch (err) {
    error.value = "Erreur lors du chargement des statistiques";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchStats();
});


// Données calculées à partir des stats de l'API
const tagDistributionData = computed(() => {
  return stats.value.byCategory.map(category => ({
    tag: category.category,
    read: Math.floor(category.count * 0.7),
    unread: Math.floor(category.count * 0.3)
  }));
});

const popularTags = computed(() => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500", "bg-indigo-500", "bg-pink-500"];
  const icons = ["material-symbols:code", "material-symbols:work", "material-symbols:description", "material-symbols:school", "material-symbols:lightbulb", "material-symbols:design", "material-symbols:person"];

  return stats.value.byCategory.map((category, index) => ({
    name: category.category,
    count: category.count,
    icon: icons[index % icons.length],
    color: colors[index % colors.length]
  }));
});

// Données d'activité pour le graphique (simulation basée sur les stats)
const activityData = computed(() => {
  if (stats.value.total === 0) return [0, 0, 0, 0, 0, 0, 0];
  
  // Générer des données réalistes basées sur le total
  const baseValue = Math.max(1, Math.floor(stats.value.total / 7));
  return [
    baseValue + Math.floor(Math.random() * 3),
    baseValue + Math.floor(Math.random() * 3),
    baseValue + Math.floor(Math.random() * 3),
    baseValue + Math.floor(Math.random() * 3),
    baseValue + Math.floor(Math.random() * 3),
    baseValue + Math.floor(Math.random() * 3),
    baseValue + Math.floor(Math.random() * 3)
  ];
});

const handleViewAllTags = () => {
  // TODO: Implémenter la vue de tous les tags
};

const handleManageTags = () => {
  // TODO: Implémenter la gestion des tags
};

const handleAddBookmark = () => {
  // TODO: Implémenter l'ajout de bookmark
};
</script>

<template>
  <div class="flex-1 flex flex-col">
    <div v-if="isLoading" class="space-y-8">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <StatCardSkeleton v-for="i in 3" :key="i" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TagDistributionSkeleton />
        <PopularTagsSkeleton />
      </div>
    </div>

    <div v-else-if="error" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <Icon icon="material-symbols:error-outline" class="w-12 h-12 text-red-500 mx-auto mb-4" />
      <p class="text-red-700 font-medium">{{ error }}</p>
      <button @click="fetchStats"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
        Réessayer
      </button>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      <StatCard title="Total Bookmarks" icon="material-symbols:bookmark" :value="stats.total" color="blue"
        :percentage="stats.total > 0 ? Math.round((stats.read / stats.total) * 100) : 0" />

      <StatCard title="Read vs Unread" icon="tabler:book-filled" :value="stats.read" color="green" type="dual-metric"
        :secondValue="stats.unread" firstLabel="Read" secondLabel="Unread" secondColor="red"
        :percentage="stats.total > 0 ? Math.round((stats.read / stats.total) * 100) : 0" />

      <div class="bg-white rounded-xl border border-gray-200 p-6">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h3 class="text-lg font-semibold text-gray-900">Activité Récente</h3>
            <p class="text-sm text-gray-600">Bookmarks ajoutés cette semaine</p>
          </div>
          <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
            <Icon icon="material-symbols:trending-up" class="w-5 h-5 text-purple-600" />
          </div>
        </div>
        <ActivityChart :data="activityData" />
      </div>
    </div>

    <div v-if="!isLoading && !error" class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <TagDistributionPanel :data="tagDistributionData" @addBookmark="handleAddBookmark" />

      <PopularTagsList :tags="popularTags" @viewAll="handleViewAllTags" @manageTags="handleManageTags" />
    </div>
  </div>
</template>
