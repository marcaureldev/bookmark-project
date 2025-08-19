<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex justify-between items-center mb-6">
    <div class="relative">
      <div
        class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"
      >
        <Icon icon="material-symbols:search" class="w-5 h-5 text-gray-400" />
      </div>
      <input
        type="text"
        placeholder="Search bookmarks..."
        class="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>

    <button
      class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
    >
      <Icon icon="material-symbols:add" class="w-5 h-5" />
      <span>Add Bookmark</span>
    </button>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div class="flex items-start justify-between mb-3">
        <div
          class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"
        >
          <Icon icon="material-symbols:code" class="w-6 h-6 text-blue-600" />
        </div>
        <div class="flex space-x-2">
          <button class="p-1 hover:bg-gray-100 rounded">
            <Icon icon="material-symbols:edit" class="w-4 h-4 text-gray-500" />
          </button>
          <button class="p-1 hover:bg-gray-100 rounded">
            <Icon
              icon="material-symbols:delete"
              class="w-4 h-4 text-gray-500"
            />
          </button>
        </div>
      </div>

      <h3 class="font-semibold text-gray-900 mb-2">Vue.js Documentation</h3>
      <p class="text-gray-600 text-sm mb-3">
        Official Vue.js documentation and API reference
      </p>

      <div class="flex items-center justify-between">
        <div class="flex space-x-2">
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >Vue.js</span
          >
          <span
            class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
            >Frontend</span
          >
        </div>
        <span class="text-xs text-gray-500">2 days ago</span>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div class="flex items-start justify-between mb-3">
        <div
          class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"
        >
          <Icon icon="material-symbols:book" class="w-6 h-6 text-green-600" />
        </div>
        <div class="flex space-x-2">
          <button class="p-1 hover:bg-gray-100 rounded">
            <Icon icon="material-symbols:edit" class="w-4 h-4 text-gray-500" />
          </button>
          <button class="p-1 hover:bg-gray-100 rounded">
            <Icon
              icon="material-symbols:delete"
              class="w-4 h-4 text-gray-500"
            />
          </button>
        </div>
      </div>

      <h3 class="font-semibold text-gray-900 mb-2">Tailwind CSS Guide</h3>
      <p class="text-gray-600 text-sm mb-3">
        Complete guide to utility-first CSS framework
      </p>

      <div class="flex items-center justify-between">
        <div class="flex space-x-2">
          <span
            class="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
            >CSS</span
          >
          <span class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full"
            >Design</span
          >
        </div>
        <span class="text-xs text-gray-500">1 week ago</span>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div class="flex items-start justify-between mb-3">
        <div
          class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"
        >
          <Icon
            icon="material-symbols:lightbulb"
            class="w-6 h-6 text-purple-600"
          />
        </div>
        <div class="flex space-x-2">
          <button class="p-1 hover:bg-gray-100 rounded">
            <Icon icon="material-symbols:edit" class="w-4 h-4 text-gray-500" />
          </button>
          <button class="p-1 hover:bg-gray-100 rounded">
            <Icon
              icon="material-symbols:delete"
              class="w-4 h-4 text-gray-500"
            />
          </button>
        </div>
      </div>

      <h3 class="font-semibold text-gray-900 mb-2">UI Design Inspiration</h3>
      <p class="text-gray-600 text-sm mb-3">
        Collection of beautiful UI designs and patterns
      </p>

      <div class="flex items-center justify-between">
        <div class="flex space-x-2">
          <span class="px-2 py-1 bg-pink-100 text-pink-700 text-xs rounded-full"
            >Design</span
          >
          <span
            class="px-2 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full"
            >Inspiration</span
          >
        </div>
        <span class="text-xs text-gray-500">3 days ago</span>
      </div>
    </div>
  </div>
</template>
