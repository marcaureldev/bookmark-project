<script setup lang="ts">
import BookmarksSection from "../../components/dashboard/BookmarksSection.vue";
import AddBookmarkModal from "../../components/dashboard/AddBookmarkModal.vue";
import EditBookmarkModal from "../../components/dashboard/EditBookmarkModal.vue";
import BookmarksSkeleton from "../../components/ui/BookmarksSkeleton.vue";
import BookmarksEmptyState from "../../components/ui/BookmarksEmptyState.vue";
import ConfirmationModal from "../../components/ui/ConfirmationModal.vue";
import BookmarkContextMenu from "../../components/dashboard/BookmarkContextMenu.vue";
import { Icon } from "@iconify/vue";
import { ref, onMounted, computed } from "vue";
import { bookmarksService } from "../../api/api";

interface ApiBookmark {
  id: number;
  title: string;
  url: string;
  category: string;
  status: "unread" | "reading" | "read";
  created_at: string;
  updated_at: string;
  user_id: number;
}

interface DisplayBookmark {
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

const isAddBookmarkModalOpen = ref(false);
const apiBookmarks = ref<ApiBookmark[]>([]);
const displayBookmarks = ref<DisplayBookmark[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

const convertToDisplayBookmarks = (
  apiBookmarks: ApiBookmark[]
): DisplayBookmark[] => {
  return apiBookmarks.map((bookmark) => {
    const tags = bookmark.category
      ? bookmark.category
          .split(",")
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0)
      : [];

    // Utiliser le premier tag pour l'icône et la couleur
    const primaryTag = tags.length > 0 ? tags[0] : "general";

    return {
      id: bookmark.id.toString(),
      title: bookmark.title,
      domain: new URL(bookmark.url).hostname,
      description:
        tags.length > 0
          ? `Bookmark avec ${
              tags.length === 1 ? `le tag ${tags[0]}` : `${tags.length} tags`
            }`
          : "Bookmark sans tag",
      tags: tags,
      addedDate: formatDate(bookmark.created_at),
      visits: 0,
      isStarred: false,
      icon: getIconForCategory(primaryTag),
      iconColor: getColorForCategory(primaryTag),
    };
  });
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "il y a 1 jour";
  if (diffDays < 7) return `il y a ${diffDays} jours`;
  if (diffDays < 30) return `il y a ${Math.floor(diffDays / 7)} semaines`;
  return `il y a ${Math.floor(diffDays / 30)} mois`;
};

const getIconForCategory = (category: string): string => {
  const iconMap: Record<string, string> = {
    tech: "mdi:code",
    design: "mdi:palette",
    business: "mdi:briefcase",
    education: "mdi:school",
    entertainment: "mdi:movie",
    shopping: "mdi:cart",
    news: "mdi:newspaper",
    social: "mdi:account-group",
    general: "mdi:bookmark",
  };
  return iconMap[category] || "mdi:bookmark";
};

const getColorForCategory = (category: string): string => {
  const colorMap: Record<string, string> = {
    tech: "bg-blue-500",
    design: "bg-purple-500",
    business: "bg-green-500",
    education: "bg-yellow-500",
    entertainment: "bg-red-500",
    shopping: "bg-orange-500",
    news: "bg-indigo-500",
    social: "bg-pink-500",
    general: "bg-gray-500",
  };
  return colorMap[category] || "bg-gray-500";
};

const fetchBookmarks = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    const response = await bookmarksService.getAll();
    apiBookmarks.value = response;
    displayBookmarks.value = convertToDisplayBookmarks(response);
  } catch (err) {
    error.value = "Erreur lors du chargement des bookmarks";
    console.error("Erreur fetchBookmarks:", err);
  } finally {
    isLoading.value = false;
  }
};

const handleOpenAddBookmark = () => {
  isAddBookmarkModalOpen.value = true;
};

const handleCloseModal = () => {
  isAddBookmarkModalOpen.value = false;
  isEditBookmarkModalOpen.value = false;
};

// Nouvelles variables d'état pour les modals
const isEditBookmarkModalOpen = ref(false);
const isDeleteConfirmationOpen = ref(false);
const isContextMenuOpen = ref(false);

const selectedBookmark = ref<any>(null);
const contextMenuPosition = ref({ x: 0, y: 0 });
const bookmarkToDelete = ref<any>(null);

const handleBookmarkAdded = async () => {
  await fetchBookmarks();
  isAddBookmarkModalOpen.value = false;
};

onMounted(() => {
  fetchBookmarks();
});

const availableTags = computed(() => {
  const tags = new Set<string>();
  apiBookmarks.value.forEach((bookmark) => {
    if (bookmark.category) {
      // Parser les tags multiples séparés par des virgules
      const categoryTags = bookmark.category
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);
      categoryTags.forEach((tag) => tags.add(tag));
    }
  });
  return Array.from(tags).sort();
});


const handleImportBookmarks = () => {
  console.log("Import bookmarks clicked");
};

const handleEditBookmark = (bookmark: any) => {
  selectedBookmark.value = bookmark;
  isEditBookmarkModalOpen.value = true;
};

const handleBookmarkUpdated = async (updatedBookmark: any) => {
  const index = apiBookmarks.value.findIndex(b => b.id.toString() === updatedBookmark.id.toString());
  if (index !== -1) {
    apiBookmarks.value[index] = updatedBookmark;
    displayBookmarks.value = convertToDisplayBookmarks(apiBookmarks.value);
  }
  
  await fetchBookmarks();
};

const handleStatusChange = async (bookmark: any, newStatus: string) => {
  try {
    await bookmarksService.updateStatus(bookmark.id.toString(), newStatus);
    await fetchBookmarks();
  } catch (error) {
    console.error('Erreur lors du changement de statut:', error);
  }
};

const handleVisitBookmark = (url: string) => {
  window.open(url, '_blank');
};

const handleDeleteBookmark = (bookmark: any) => {
  bookmarkToDelete.value = bookmark;
  isDeleteConfirmationOpen.value = true;
};

const confirmDeleteBookmark = async () => {
  if (!bookmarkToDelete.value) return;
  
  try {
    await bookmarksService.delete(bookmarkToDelete.value.id.toString());
    await fetchBookmarks();
    isDeleteConfirmationOpen.value = false;
    bookmarkToDelete.value = null;
  } catch (error) {
    console.error('Erreur lors de la suppression:', error);
  }
};

const handleOpenContextMenu = (bookmark: any, event: Event) => {
  event.preventDefault();
  selectedBookmark.value = bookmark;
  contextMenuPosition.value = {
    x: (event as MouseEvent).clientX,
    y: (event as MouseEvent).clientY
  };
  isContextMenuOpen.value = true;
};

const handleCloseContextMenu = () => {
  isContextMenuOpen.value = false;
};

const handleSearch = (query: string) => {
  console.log('Recherche:', query);
};

const handleFilterStatus = (status: 'all' | 'read' | 'unread') => {
  console.log('Filtre statut:', status);
};

const handleFilterTag = (tag: string) => {
  console.log('Filtre tag:', tag);
};

const handleToggleStar = (id: string) => {
  console.log('Toggle star:', id);
};

const handleLoadMore = () => {
  console.log('Load more');
};
</script>

<template>
  <div class="flex-1 flex flex-col">
    <BookmarksSkeleton v-if="isLoading" />

    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-lg p-6 text-center"
    >
      <p class="text-red-700 font-medium">{{ error }}</p>
      <button
        @click="fetchBookmarks"
        class="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
      >
        Réessayer
      </button>
    </div>

    <div v-else>
      <BookmarksEmptyState
        v-if="displayBookmarks.length === 0"
        @addBookmark="handleOpenAddBookmark"
        @importBookmarks="handleImportBookmarks"
      />

      <div v-else>
        <div class="mb-6 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Mes Favoris</h1>
            <p class="text-gray-600 mt-1">
              {{ displayBookmarks.length }} bookmark{{
                displayBookmarks.length > 1 ? "s" : ""
              }}
              sauvegardé{{ displayBookmarks.length > 1 ? "s" : "" }}
            </p>
          </div>

          <button
            @click="handleOpenAddBookmark"
            class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <Icon icon="material-symbols:add" class="w-5 h-5" />
            Ajouter un bookmark
          </button>
        </div>

        <BookmarksSection
          :bookmarks="displayBookmarks"
          :tags="availableTags"
          :has-more="true"
          @search="handleSearch"
          @filter-status="handleFilterStatus"
          @filter-tag="handleFilterTag"
          @toggle-star="handleToggleStar"
          @open-menu="handleOpenContextMenu"
          @visit="handleVisitBookmark"
          @load-more="handleLoadMore"
        />
      </div>
    </div>

    <AddBookmarkModal
      :is-open="isAddBookmarkModalOpen"
      @close="handleCloseModal"
      @bookmark-added="handleBookmarkAdded"
    />

    <EditBookmarkModal
      :is-open="isEditBookmarkModalOpen"
      :bookmark="selectedBookmark"
      @close="handleCloseModal"
      @updated="handleBookmarkUpdated"
    />

    <ConfirmationModal
      :is-open="isDeleteConfirmationOpen"
      title="Supprimer le bookmark"
      message="Êtes-vous sûr de vouloir supprimer ce bookmark ? Cette action est irréversible."
      confirm-text="Supprimer"
      cancel-text="Annuler"
      @confirm="confirmDeleteBookmark"
      @cancel="() => { isDeleteConfirmationOpen = false; bookmarkToDelete = null; }"
    />

    <BookmarkContextMenu
      :is-open="isContextMenuOpen"
      :bookmark="selectedBookmark"
      :position="contextMenuPosition"
      @close="handleCloseContextMenu"
      @edit="handleEditBookmark"
      @status-change="handleStatusChange"
      @visit="handleVisitBookmark"
      @delete="handleDeleteBookmark"
    />
  </div>
</template>
