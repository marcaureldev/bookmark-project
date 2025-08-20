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

// État pour les bookmarks (pour calculer l'activité réelle)
const bookmarks = ref<any[]>([]);

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
    
    // Récupérer les stats et les bookmarks en parallèle
    const [statsResponse, bookmarksResponse] = await Promise.all([
      bookmarksService.getStats(),
      bookmarksService.getAll()
    ]);
    
    stats.value = statsResponse;
    bookmarks.value = bookmarksResponse;
  } catch (err) {
    error.value = "Erreur lors du chargement des données";
  } finally {
    isLoading.value = false;
  }
};

onMounted(async () => {
  await fetchStats();
});


// Données calculées à partir des stats de l'API
const tagDistributionData = computed(() => {
  return stats.value.byCategory.map(category => {
    const tags = category.category.includes(',') 
      ? category.category.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [category.category];
    
    // Créer une entrée pour chaque tag individuel
    return tags.map(tag => ({
      tag: tag,
      count: category.count,
      // Pour l'instant, on utilise le count total car l'API ne fournit pas read/unread par tag
      read: Math.floor(category.count * 0.6), 
      unread: Math.floor(category.count * 0.4)
    }));
  }).flat();
});

const popularTags = computed(() => {
  const colors = ["bg-blue-500", "bg-green-500", "bg-yellow-500", "bg-red-500", "bg-purple-500", "bg-indigo-500", "bg-pink-500"];
  const icons = ["material-symbols:code", "material-symbols:work", "material-symbols:description", "material-symbols:school", "material-symbols:lightbulb", "material-symbols:design", "material-symbols:person"];

  // Créer un Map pour agréger les counts par tag individuel
  const tagCounts = new Map<string, number>();
  
  stats.value.byCategory.forEach((category, _index) => {
    // Parser les tags multiples
    const tags = category.category.includes(',') 
      ? category.category.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
      : [category.category];
    
    // Ajouter le count pour chaque tag
    tags.forEach(tag => {
      tagCounts.set(tag, (tagCounts.get(tag) || 0) + category.count);
    });
  });
  
  // Convertir en tableau et trier par count décroissant
  return Array.from(tagCounts.entries())
    .sort(([,a], [,b]) => b - a)
    .slice(0, 7) // Limiter à 7 tags les plus populaires
    .map(([tag, count], index) => ({
      name: tag,
      count: count,
      icon: icons[index % icons.length],
      color: colors[index % colors.length]
    }));
});

// Données d'activité pour le graphique basées sur les bookmarks existants
const activityData = computed(() => {
  if (bookmarks.value.length === 0) return [0, 0, 0, 0, 0, 0, 0];
  
  const now = new Date();
  const activityByDay = new Array(7).fill(0);
  
  // Calculer l'activité pour les 7 derniers jours
  bookmarks.value.forEach(bookmark => {
    const createdDate = new Date(bookmark.created_at);
    const daysDiff = Math.floor((now.getTime() - createdDate.getTime()) / (1000 * 60 * 60 * 24));
    
    // Si le bookmark a été créé dans les 7 derniers jours
    if (daysDiff >= 0 && daysDiff < 7) {
      const dayIndex = 6 - daysDiff; // Inverser l'index (0 = aujourd'hui, 6 = il y a 6 jours)
      if (dayIndex >= 0 && dayIndex < 7) {
        activityByDay[dayIndex]++;
      }
    }
  });
  
  return activityByDay;
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
