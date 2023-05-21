<script setup lang="ts">
import type { ChartData, ChartOptions } from 'chart.js'

import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  RadialLinearScale,
  Filler,
  LineElement
} from 'chart.js'

import { Line } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement,PointElement ,RadialLinearScale, LineElement, Filler, Title, Tooltip, Legend)

const props = defineProps<{
  data: ChartData<'line'>
}>()

const options:ChartOptions<'line'> = {
  responsive: true,
  maintainAspectRatio: false
}

</script>

<template>
  <Line :data="props.data" :options="options"/>
</template>
