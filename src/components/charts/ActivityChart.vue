<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const props = defineProps<{
  data?: number[];
}>();

const chartData = {
  labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
  datasets: [
    {
      label: 'Bookmarks',
      data: props.data || [12, 19, 8, 15, 22, 18, 25],
      backgroundColor: [
        'rgba(147, 51, 234, 0.9)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(147, 51, 234, 0.7)',
        'rgba(147, 51, 234, 0.9)',
        'rgba(147, 51, 234, 0.8)',
        'rgba(147, 51, 234, 0.7)',
        'rgba(147, 51, 234, 0.9)'
      ],
      borderRadius: 6,
      borderSkipped: false,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      enabled: true,
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(147, 51, 234, 1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: false,
      callbacks: {
        title: () => '',
        label: (context: any) => `${context.parsed.y} bookmarks`
      }
    }
  },
  scales: {
    x: {
      display: false,
      grid: {
        display: false
      }
    },
    y: {
      display: false,
      grid: {
        display: false
      }
    }
  },
  elements: {
    bar: {
      borderRadius: 6
    }
  }
};
</script>

<template>
  <div class="h-20">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
