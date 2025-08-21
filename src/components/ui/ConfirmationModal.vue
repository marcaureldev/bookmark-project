<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  isOpen: boolean;
  title: string;
  message: string;
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  loadingText?: string;
  isLoading?: boolean;
}

interface Emits {
  (e: 'confirm'): void;
  (e: 'cancel'): void;
}

withDefaults(defineProps<Props>(), {
  icon: 'material-symbols:warning',
  confirmText: 'Confirmer',
  cancelText: 'Annuler',
  loadingText: 'Chargement...',
  isLoading: false
});

const emit = defineEmits<Emits>();

const handleConfirm = () => {
  emit('confirm');
};

const handleCancel = () => {
  emit('cancel');
};
</script>


<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 overflow-y-auto">
    <div class="fixed inset-0 bg-black/80 transition-opacity"></div>
    
    <div class="flex min-h-full items-center justify-center p-4">
      <div class="relative w-full max-w-md bg-white rounded-xl shadow-xl">
        <div class="flex items-center justify-between p-6 border-b border-gray-200">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
              <Icon :icon="icon" class="w-5 h-5 text-red-600" />
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ title }}</h3>
          </div>
          <button
            @click="handleCancel"
            class="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon icon="material-symbols:close" class="w-6 h-6" />
          </button>
        </div>

        <div class="p-6">
          <p class="text-gray-600 mb-6">{{ message }}</p>
          
          <div class="flex gap-3">
            <button
              @click="handleCancel"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              {{ cancelText }}
            </button>
            <button
              @click="handleConfirm"
              :disabled="isLoading"
              class="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <span v-if="isLoading">{{ loadingText }}</span>
              <span v-else>{{ confirmText }}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
