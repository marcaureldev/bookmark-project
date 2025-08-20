<script setup lang="ts">
import { ref, computed } from "vue";
import { Icon } from "@iconify/vue";
import { bookmarksService } from "../../api/api";

interface BookmarkInput {
  title: string;
  url: string;
  tags: string[];
  status: "unread" | "reading" | "read";
}

interface ApiBookmarkInput {
  title: string;
  url: string;
  category: string;
  status: "unread" | "reading" | "read";
}

interface Props {
  isOpen: boolean;
}

interface Emits {
  (e: "close"): void;
  (e: "bookmark-added"): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const formData = ref<BookmarkInput>({
  title: "",
  url: "",
  tags: [],
  status: "unread",
});

const isLoading = ref(false);
const errors = ref<Partial<BookmarkInput>>({});
const newTag = ref("");
const suggestedTags = ref([
  "tech",
  "design",
  "business",
  "education",
  "entertainment",
  "shopping",
  "news",
  "social",
]);

const isValid = computed(() => {
  return (
    formData.value.title.trim() !== "" &&
    formData.value.url.trim() !== "" &&
    isValidUrl(formData.value.url)
  );
});

const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const isUrlDuplicate = (url: string): boolean => {
  url.toLowerCase().trim();
  return false;
};

const validateForm = (): boolean => {
  errors.value = {};

  if (!formData.value.title.trim()) {
    errors.value.title = "Le titre est requis";
  }

  if (!formData.value.url.trim()) {
    errors.value.url = "L'URL est requise";
  } else if (!isValidUrl(formData.value.url)) {
    errors.value.url = "Veuillez entrer une URL valide";
  } else if (isUrlDuplicate(formData.value.url)) {
    errors.value.url = "Cette URL existe déjà dans vos favoris";
  }

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async (retryCount = 0) => {
  if (!validateForm()) return;

  try {
    isLoading.value = true;

    if (retryCount > 0) {
      await new Promise((resolve) => setTimeout(resolve, 2000 * retryCount));
    } else {
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    await bookmarksService.create(transformForAPI());

    formData.value = {
      title: "",
      url: "",
      tags: [],
      status: "unread",
    };

    emit("bookmark-added");
    emit("close");
  } catch (error: any) {
    if (error.code === "ECONNABORTED" && retryCount < 2) {
      isLoading.value = false;
      await handleSubmit(retryCount + 1);
      return;
    }
    console.error("Erreur lors de l'ajout du bookmark:", error);

    if (error.response) {
      const status = error.response.status;
      const message = error.response.data?.message || "Erreur inconnue";

      if (status === 400) {
        errors.value.url = "URL invalide ou déjà existante";
      } else if (status === 401) {
        errors.value.url = "Non autorisé. Veuillez vous reconnecter.";
      } else if (status === 422) {
        errors.value.url = "Données invalides. Vérifiez vos informations.";
      } else {
        errors.value.url = `Erreur serveur: ${message}`;
      }
    } else if (error.request) {
      if (error.code === "ECONNABORTED") {
        errors.value.url =
          "L'opération prend trop de temps. L'API est peut-être lente ou la base de données est occupée.";
      } else {
        errors.value.url = "Erreur de connexion. Vérifiez votre internet.";
      }
    } else {
      errors.value.url = "Erreur inattendue. Réessayez plus tard.";
    }
  } finally {
    isLoading.value = false;
  }
};

// Fonctions de gestion des tags
const addTag = () => {
  const tag = newTag.value.trim();
  if (tag && !formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag);
    newTag.value = "";
  }
};

const removeTag = (index: number) => {
  formData.value.tags.splice(index, 1);
};

const addSuggestedTag = (tag: string) => {
  if (!formData.value.tags.includes(tag)) {
    formData.value.tags.push(tag);
  }
};

const transformForAPI = (): ApiBookmarkInput => {
  // Si aucun tag, utiliser 'general'
  if (formData.value.tags.length === 0) {
    return {
      title: formData.value.title,
      url: formData.value.url,
      category: "general",
      status: formData.value.status,
    };
  }

  // Si un seul tag, l'utiliser directement
  if (formData.value.tags.length === 1) {
    return {
      title: formData.value.title,
      url: formData.value.url,
      category: formData.value.tags[0],
      status: formData.value.status,
    };
  }

  // Si plusieurs tags, les joindre avec des virgules
  return {
    title: formData.value.title,
    url: formData.value.url,
    category: formData.value.tags.join(", "),
    status: formData.value.status,
  };
};

const handleClose = () => {
  if (!isLoading.value) {
    emit("close");
  }
};

const handleCloseModal = () => {
  formData.value = {
    title: "",
    url: "",
    tags: [],
    status: "unread",
  };
  errors.value = {};
  emit("close");
};
</script>

<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
    @click="handleClose"
  >
    <div
      class="bg-white rounded-xl shadow-xl w-full max-w-md mx-auto"
      @click.stop
    >
      <div
        class="flex items-center justify-between p-6 border-b border-gray-200"
      >
        <h2 class="text-xl font-semibold text-gray-900">Ajouter un bookmark</h2>
        <button
          @click="handleCloseModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
          :disabled="isLoading"
        >
          <Icon icon="material-symbols:close" class="w-6 h-6" />
        </button>
      </div>

      <form @submit.prevent="() => handleSubmit()" class="p-6 space-y-6">
        <div>
          <label
            for="title"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Titre *
          </label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            :class="{ 'border-red-500': errors.title }"
            placeholder="Titre du bookmark"
          />
          <p v-if="errors.title" class="mt-1 text-sm text-red-600">
            {{ errors.title }}
          </p>
        </div>

        <div>
          <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
            URL *
          </label>
          <input
            id="url"
            v-model="formData.url"
            type="url"
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
            :class="{ 'border-red-500': errors.url }"
            placeholder="https://example.com"
          />
          <p v-if="errors.url" class="mt-1 text-sm text-red-600">
            {{ errors.url }}
          </p>
        </div>

        <div>
          <label
            for="tags"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Tags
          </label>
          <div class="space-y-3">
            <div class="flex gap-2">
              <input
                id="tagInput"
                v-model="newTag"
                @keyup.enter="addTag"
                type="text"
                :disabled="isLoading"
                class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
                placeholder="Ajouter un tag..."
              />
              <button
                @click="addTag"
                type="button"
                :disabled="!newTag.trim() || isLoading"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon icon="material-symbols:add" class="w-4 h-4" />
              </button>
            </div>

            <div v-if="formData.tags.length > 0" class="flex flex-wrap gap-2">
              <div
                v-for="(tag, index) in formData.tags"
                :key="index"
                class="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
              >
                <span>{{ tag }}</span>
                <button
                  @click="removeTag(index)"
                  type="button"
                  class="text-blue-600 hover:text-blue-800 transition-colors"
                >
                  <Icon icon="material-symbols:close" class="w-4 h-4" />
                </button>
              </div>
            </div>

            <div v-if="suggestedTags.length > 0" class="space-y-2">
              <p class="text-xs text-gray-500">Tags suggérés :</p>
              <div class="flex flex-wrap gap-2">
                <button
                  v-for="tag in suggestedTags"
                  :key="tag"
                  @click="addSuggestedTag(tag)"
                  type="button"
                  class="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  {{ tag }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <label
            for="status"
            class="block text-sm font-medium text-gray-700 mb-2"
          >
            Statut
          </label>
          <select
            id="status"
            v-model="formData.status"
            :disabled="isLoading"
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
          >
            <option value="unread">Non lu</option>
            <option value="reading">En cours de lecture</option>
            <option value="read">Lu</option>
          </select>
        </div>

        <div class="flex gap-3 pt-4">
          <button
            type="button"
            @click="handleCloseModal"
            :disabled="isLoading"
            class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Annuler
          </button>
          <button
            type="submit"
            :disabled="!isValid || isLoading"
            class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Icon
              v-if="isLoading"
              icon="material-symbols:sync"
              class="w-4 h-4 animate-spin"
            />
            {{ isLoading ? "Ajout en cours..." : "Ajouter" }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
