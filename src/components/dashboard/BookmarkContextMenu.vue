<script setup lang="ts">
import { Icon } from '@iconify/vue';

interface Props {
  isOpen: boolean;
  bookmark: {
    id: string;
    title: string;
    url: string;
    status: string;
  };
  position: {
    x: number;
    y: number;
  };
}

interface Emits {
  (e: 'close'): void;
  (e: 'edit', bookmark: any): void;
  (e: 'statusChange', bookmark: any, status: string): void;
  (e: 'visit', url: string): void;
  (e: 'delete', bookmark: any): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const handleClose = () => {
  emit('close');
};

const handleEdit = () => {
  emit('edit', props.bookmark);
  handleClose();
};

const handleStatusChange = (status: string) => {
  emit('statusChange', props.bookmark, status);
  handleClose();
};

const handleVisit = () => {
  emit('visit', props.bookmark.url);
  handleClose();
};

const handleDelete = () => {
  emit('delete', props.bookmark);
  handleClose();
};
</script>

<template>
  <div v-if="isOpen" class="fixed inset-0 z-40" @click="handleClose">
    <div 
      class="absolute bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50"
      :style="{ top: `${position.y}px`, left: `${position.x}px` }"
      @click.stop
    >
      <button
        @click="handleEdit"
        class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
      >
        <Icon icon="material-symbols:edit" class="w-4 h-4" />
        <span>Modifier</span>
      </button>

      <div class="border-t border-gray-100">
        <div class="px-4 py-2 text-xs font-medium text-gray-500 uppercase tracking-wide">
          Changer le statut
        </div>
        <button
          @click="handleStatusChange('unread')"
          class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
          :class="{ 'bg-blue-50 text-blue-700': bookmark.status === 'unread' }"
        >
          <Icon icon="material-symbols:bookmark-outline" class="w-4 h-4" />
          <span>Non lu</span>
        </button>
        <button
          @click="handleStatusChange('reading')"
          class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
          :class="{ 'bg-blue-50 text-blue-700': bookmark.status === 'reading' }"
        >
          <Icon icon="material-symbols:schedule" class="w-4 h-4" />
          <span>En cours de lecture</span>
        </button>
        <button
          @click="handleStatusChange('read')"
          class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
          :class="{ 'bg-blue-50 text-blue-700': bookmark.status === 'read' }"
        >
          <Icon icon="material-symbols:bookmark" class="w-4 h-4" />
          <span>Lu</span>
        </button>
      </div>

      <div class="border-t border-gray-100">
        <button
          @click="handleVisit"
          class="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3"
        >
          <Icon icon="material-symbols:open-in-new" class="w-4 h-4" />
          <span>Ouvrir le lien</span>
        </button>
      </div>

      <div class="border-t border-gray-100">
        <button
          @click="handleDelete"
          class="w-full px-4 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-3"
        >
          <Icon icon="material-symbols:delete" class="w-4 h-4" />
          <span>Supprimer</span>
        </button>
      </div>
    </div>
  </div>
</template>
