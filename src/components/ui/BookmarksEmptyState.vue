<script setup lang="ts">
import { Icon } from '@iconify/vue';

defineEmits<{
  addBookmark: []
  importBookmarks: []
}>();
</script>


<template>
  <div class="flex flex-col items-center justify-center py-16 px-4">
    <div class="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6">
      <Icon icon="material-symbols:bookmark-outline" class="w-12 h-12 text-blue-600" />
    </div>
    
    <h3 class="text-2xl font-bold text-gray-900 mb-3 text-center">
      Aucun bookmark pour le moment
    </h3>
    <p class="text-gray-600 text-center mb-8 max-w-md">
      Commencez à organiser vos liens favoris en ajoutant votre premier bookmark. 
      Vous pourrez ensuite les organiser par tags et les retrouver facilement.
    </p>
    
    <div class="flex flex-col sm:flex-row gap-3">
      <button
        @click="$emit('addBookmark')"
        class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
      >
        <Icon icon="material-symbols:add" class="w-5 h-5" />
        Ajouter votre premier bookmark
      </button>
      
      <button
        @click="$emit('importBookmarks')"
        class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center gap-2"
      >
        <Icon icon="material-symbols:upload" class="w-5 h-5" />
        Importer des bookmarks
      </button>
    </div>
  </div>
</template>