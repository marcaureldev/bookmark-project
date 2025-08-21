<script setup lang="ts">
import { ref, reactive, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { bookmarksService } from '../../api/api';

interface Props {
  isOpen: boolean;
  bookmark: {
    id: string;
    title: string;
    url: string;
    description?: string;
    category?: string;
    status: string;
  } | null;
}

interface Emits {
  (e: 'close'): void;
  (e: 'updated', bookmark: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const isLoading = ref(false);
const newTag = ref('');
const errors = reactive({
  title: '',
  url: ''
});

const formData = reactive({
  title: '',
  url: '',
  description: '',
  tags: [] as string[],
  status: 'unread'
});

watch(() => props.bookmark, (newBookmark) => {
  if (newBookmark) {
    formData.title = newBookmark.title;
    formData.url = newBookmark.url;
    formData.description = newBookmark.description || '';
    formData.status = newBookmark.status;
    
    if (newBookmark.category) {
      formData.tags = newBookmark.category.includes(',')
        ? newBookmark.category.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0)
        : [newBookmark.category];
    } else {
      formData.tags = [];
    }
  }
}, { immediate: true });

const addTag = () => {
  const tag = newTag.value.trim();
  if (tag && !formData.tags.includes(tag)) {
    formData.tags.push(tag);
    newTag.value = '';
  }
};

const removeTag = (tagToRemove: string) => {
  formData.tags = formData.tags.filter(tag => tag !== tagToRemove);
};

const validateForm = (): boolean => {
  errors.title = '';
  errors.url = '';
  
  if (!formData.title.trim()) {
    errors.title = 'Le titre est requis';
    return false;
  }
  
  if (!formData.url.trim()) {
    errors.url = 'L\'URL est requise';
    return false;
  }
  
  try {
    new URL(formData.url);
  } catch {
    errors.url = 'L\'URL n\'est pas valide';
    return false;
  }
  
  return true;
};

const transformForAPI = () => {
  const category = formData.tags.length > 0 
    ? formData.tags.join(', ')
    : 'general';
    
  return {
    title: formData.title.trim(),
    url: formData.url.trim(),
    description: formData.description.trim(),
    category,
    status: formData.status
  };
};

const handleSubmit = async () => {
  if (!validateForm() || !props.bookmark) return;
  
  try {
    isLoading.value = true;
    
    const updateData = transformForAPI();
    const updatedBookmark = await bookmarksService.update(props.bookmark.id, updateData);
    
    emit('updated', updatedBookmark);
    handleClose();
  } catch (error: any) {
    console.error('Erreur lors de la modification:', error);
  } finally {
    isLoading.value = false;
  }
};

const handleClose = () => {
  emit('close');
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black/80 transition-opacity" @click="handleClose"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-xl">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 class="text-lg font-semibold text-gray-900">Modifier le bookmark</h3>
          <button
            @click="handleClose"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon icon="material-symbols:close" class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <div>
            <label for="title" class="block text-sm font-medium text-gray-700 mb-2">
              Titre *
            </label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.title }"
            />
            <p v-if="errors.title" class="mt-1 text-sm text-red-600">{{ errors.title }}</p>
          </div>

          <div>
            <label for="url" class="block text-sm font-medium text-gray-700 mb-2">
              URL *
            </label>
            <input
              id="url"
              v-model="formData.url"
              type="url"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              :class="{ 'border-red-500': errors.url }"
            />
            <p v-if="errors.url" class="mt-1 text-sm text-red-600">{{ errors.url }}</p>
          </div>

          <div>
            <label for="description" class="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div class="space-y-2">
              <div class="flex flex-wrap gap-2">
                <div
                  v-for="tag in formData.tags"
                  :key="tag"
                  class="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                >
                  <span>{{ tag }}</span>
                  <button
                    type="button"
                    @click="removeTag(tag)"
                    class="text-blue-600 hover:text-blue-800"
                  >
                    <Icon icon="material-symbols:close" class="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div class="flex gap-2">
                <input
                  v-model="newTag"
                  type="text"
                  placeholder="Ajouter un tag"
                  class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  @keydown.enter.prevent="addTag"
                />
                <button
                  type="button"
                  @click="addTag"
                  class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Ajouter
                </button>
              </div>
            </div>
          </div>

          <div>
            <label for="status" class="block text-sm font-medium text-gray-700 mb-2">
              Statut
            </label>
            <select
              id="status"
              v-model="formData.status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="unread">Non lu</option>
              <option value="reading">En cours de lecture</option>
              <option value="read">Lu</option>
            </select>
          </div>

          <div class="flex gap-3 pt-4">
            <button
              type="button"
              @click="handleClose"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading">Modification...</span>
              <span v-else>Modifier</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
