<script setup lang="ts">
import { Icon } from "@iconify/vue";
</script>

<template>
  <div class="flex-1 flex flex-col">
      <main class="flex-1 p-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <!-- Stats Cards -->
          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-blue-100 rounded-lg">
                <Icon
                  icon="material-symbols:bookmark"
                  class="w-6 h-6 text-blue-600"
                />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Total Bookmarks</p>
                <p class="text-2xl font-semibold text-gray-900">1,247</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-green-100 rounded-lg">
                <Icon
                  icon="material-symbols:local-offer"
                  class="w-6 h-6 text-green-600"
                />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Tags Used</p>
                <p class="text-2xl font-semibold text-gray-900">156</p>
              </div>
            </div>
          </div>

          <div class="bg-white rounded-lg shadow p-6">
            <div class="flex items-center">
              <div class="p-2 bg-purple-100 rounded-lg">
                <Icon
                  icon="material-symbols:folder"
                  class="w-6 h-6 text-purple-600"
                />
              </div>
              <div class="ml-4">
                <p class="text-sm font-medium text-gray-600">Collections</p>
                <p class="text-2xl font-semibold text-gray-900">23</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Recent Bookmarks -->
        <div class="mt-8">
          <h2 class="text-lg font-semibold text-gray-900 mb-4">
            Recent Bookmarks
          </h2>
          <div class="bg-white rounded-lg shadow">
            <div class="p-6">
              <p class="text-gray-500 text-center">
                Your recent bookmarks will appear here
              </p>
            </div>
          </div>
      </div>
    </main>
  </div>
</template>
