<script setup lang="ts">
import BookmarksSection from "../../components/dashboard/BookmarksSection.vue";
import { ref } from 'vue';

const bookmarks = ref([
  {
    id: '1',
    title: 'GitHub',
    domain: 'github.com',
    description: 'Plateforme de développement où les développeurs façonnent l\'avenir du logiciel',
    tags: ['Development', 'Code'],
    addedDate: 'il y a 2 jours',
    visits: 32,
    isStarred: false,
    icon: 'mdi:github',
    iconColor: 'bg-gray-800'
  },
  {
    id: '2',
    title: 'Figma Design System',
    domain: 'figma.com',
    description: 'Système de design complet pour refaire le design de votre application web',
    tags: ['Design', 'UI/UX'],
    addedDate: 'il y a 1 semaine',
    visits: 17,
    isStarred: true,
    icon: 'ph:figma-logo-thin',
    iconColor: 'bg-green-500'
  },
  {
    id: '3',
    title: 'Tutoriel Web Development',
    domain: 'youtube.com',
    description: 'Tutoriel complet couvrant HTML, CSS, JavaScript et les frameworks modernes',
    tags: ['Video', 'Tutorial'],
    addedDate: 'il y a 3 jours',
    visits: 8,
    isStarred: false,
    icon: 'mdi:youtube',
    iconColor: 'bg-red-500'
  },
  {
    id: '4',
    title: 'Principes UX Design',
    domain: 'medium.com',
    description: 'Guide complet sur les principes de design d\'expérience utilisateur',
    tags: ['Article', 'Design'],
    addedDate: 'il y a 5 jours',
    visits: 24,
    isStarred: true,
    icon: 'mdi:file-document',
    iconColor: 'bg-purple-500'
  },
  {
    id: '5',
    title: 'Amazon - Page Produit',
    domain: 'amazon.com',
    description: 'Casque sans fil avec réduction de bruit active pour une expérience immersive',
    tags: ['Shopping', 'Wishlist'],
    addedDate: 'il y a 1 jour',
    visits: 3,
    isStarred: false,
    icon: 'mdi:cart',
    iconColor: 'bg-orange-500'
  },
  {
    id: '6',
    title: 'Générateur Palette Couleurs',
    domain: 'coolors.co',
    description: 'Créez la palette de couleurs parfaite pour votre projet de design',
    tags: ['Tool', 'Design'],
    addedDate: 'il y a 2 semaines',
    visits: 41,
    isStarred: false,
    icon: 'mdi:palette',
    iconColor: 'bg-pink-500'
  }
]);

const availableTags = ref([
  'react', 'documentation', 'frontend', 'css', 'tailwind', 
  'design', 'typescript', 'programming', 'figma', 'ui/ux'
]);

const handleSearch = (query: string) => {
  console.log('Search:', query);
};

const handleFilterStatus = (status: 'all' | 'read' | 'unread') => {
  console.log('Filter status:', status);
};

const handleFilterTag = (tag: string) => {
  console.log('Filter tag:', tag);
};

const handleToggleStar = (id: string) => {
  const bookmark = bookmarks.value.find(b => b.id === id);
  if (bookmark) {
    bookmark.isStarred = !bookmark.isStarred;
  }
};

const handleOpenMenu = (id: string) => {
  console.log('Open menu for bookmark:', id);
};

const handleVisit = (id: string) => {
  console.log('Visit bookmark:', id);
};

const handleLoadMore = () => {
  console.log('Load more bookmarks');
};
</script>

<template>
  <div class="flex-1 flex flex-col">

      <BookmarksSection
        :bookmarks="bookmarks"
        :tags="availableTags"
        :has-more="true"
        @search="handleSearch"
        @filter-status="handleFilterStatus"
        @filter-tag="handleFilterTag"
        @toggle-star="handleToggleStar"
        @open-menu="handleOpenMenu"
        @visit="handleVisit"
        @load-more="handleLoadMore"
      />
  </div>
</template>
