<script setup lang="ts">
import { Icon } from "@iconify/vue";
import ActivityChart from "../../components/charts/ActivityChart.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
import TagDistributionPanel from "../../components/dashboard/TagDistributionPanel.vue";
import PopularTagsList from "../../components/dashboard/PopularTagsList.vue";
import { ref } from "vue";

const tagDistributionData = ref([
  { tag: "Development", read: 42, unread: 10 },
  { tag: "Work", read: 32, unread: 10 },
  { tag: "Research", read: 28, unread: 10 },
  { tag: "Learning", read: 22, unread: 7 },
  { tag: "Inspiration", read: 18, unread: 6 },
  { tag: "Design", read: 14, unread: 8 },
  { tag: "Personal", read: 12, unread: 5 },
]);

const popularTags = ref([
  {
    name: "Development",
    count: 53,
    icon: "material-symbols:code",
    color: "bg-blue-500",
  },
  {
    name: "Work",
    count: 42,
    icon: "material-symbols:work",
    color: "bg-green-500",
  },
  {
    name: "Research",
    count: 38,
    icon: "material-symbols:description",
    color: "bg-yellow-500",
  },
  {
    name: "Learning",
    count: 29,
    icon: "material-symbols:school",
    color: "bg-red-500",
  },
  {
    name: "Inspiration",
    count: 24,
    icon: "material-symbols:lightbulb",
    color: "bg-purple-500",
  },
]);

const handleViewAllTags = () => {
  console.log("View all tags clicked");
};

const handleManageTags = () => {
  console.log("Manage tags clicked");
};
</script>

<template>
  <div class="flex-1 flex flex-col">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
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
          secondLabel="Read"
          secondColor="red"
          :percentage="74"
        />

        <div class="bg-white rounded-xl shadow-sm p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-sm font-semibold text-gray-900">Recent Activity</h3>
            <div
              class="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center"
            >
              <Icon
                icon="material-symbols:schedule"
                class="w-5 h-5 text-purple-600"
              />
            </div>
          </div>

          <div class="mb-4">
            <div class="text-lg font-semibold text-gray-900 mb-3">
              37 bookmarks this week
            </div>

            <ActivityChart :data="[12, 19, 8, 15, 22, 18, 25]" />
          </div>

          <div class="text-right">
            <a
              href="#"
              class="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All →
            </a>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TagDistributionPanel :data="tagDistributionData" />

        <PopularTagsList
          :tags="popularTags"
          @viewAll="handleViewAllTags"
          @manageTags="handleManageTags"
        />
    </div>
  </div>
</template>
