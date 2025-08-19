<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ActivityChart from "../../components/charts/ActivityChart.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
    <StatCard
      title="Total Bookmarks"
      icon="material-symbols:bookmark"
      :value="248"
      color="blue"
      :percentage="12"
    />

    <StatCard
      title="Read vs Unread"
      icon="tabler:book-filled"
      :value="183"
      color="green"
      type="dual-metric"
      :secondValue="65"
      firstLabel="Read"
      secondLabel="Unread"
      secondColor="red"
      :percentage="74"
    />

    <div class="bg-white rounded-xl shadow-sm p-6">
      <div class="flex items-center justify-between mb-4">
        <h3 class="text-sm font-semibold text-gray-900">Recent Activity</h3>
        <div
          class="w-10 h-10 bg-p rounded-full flex items-center justify-center bg-purple-100"
        >
          <Icon icon="mdi:clock-arrow" class="w-6 h-6 text-purple-600" />
        </div>
      </div>

      <div class="mb-4">
        <div class="text-lg font-semibold text-gray-900 mb-3">
          37 bookmarks this week
        </div>

        <ActivityChart :data="[12, 19, 8, 15, 22, 18, 25]" />
      </div>
    </div>
  </div>
</template>
