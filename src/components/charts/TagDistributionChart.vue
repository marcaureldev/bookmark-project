<script setup lang="ts">
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface TagData {
  tag: string;
  read: number;
  unread: number;
}

interface Props {
  data: TagData[];
  timePeriod: 'weekly' | 'monthly' | 'yearly';
}

const props = defineProps<Props>();

const chartData = {
  labels: props.data.map(item => item.tag),
  datasets: [
    {
      label: 'Read',
      data: props.data.map(item => item.read),
      backgroundColor: '#00a63e',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
      borderRadius: 4,
    },
    {
      label: 'Unread',
      data: props.data.map(item => item.unread),
      backgroundColor: '#fb2c36',
      borderColor: 'rgba(239, 68, 68, 1)',
      borderWidth: 1,
      borderRadius: 4,
    }
  ]
};

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom' as const,
      labels: {
        usePointStyle: true,
        padding: 20,
        font: {
          size: 12
        }
      }
    },
    tooltip: {
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      titleColor: 'white',
      bodyColor: 'white',
      borderColor: 'rgba(34, 197, 94, 1)',
      borderWidth: 1,
      cornerRadius: 8,
      displayColors: true,
      callbacks: {
        title: (context: any) => context[0].label,
        label: (context: any) => `${context.dataset.label}: ${context.parsed.y} bookmarks`
      }
    }
  },
  scales: {
    x: {
      type: 'category' as const,
      grid: {
        display: false
      },
      ticks: {
        font: {
          size: 11
        }
      }
    },
    y: {
      type: 'linear' as const,
      beginAtZero: true,
      max: 50,
      ticks: {
        stepSize: 10,
        font: {
          size: 11
        }
      },
      title: {
        display: true,
        text: 'Number of Bookmarks',
        font: {
          size: 12,
          weight: 'bold' as const
        }
      }
    }
  },
  elements: {
    bar: {
      borderRadius: 4
    }
  }
};
</script>

<template>
  <div class="h-80">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>
