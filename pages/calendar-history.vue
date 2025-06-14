<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getMeals } from '@/lib/db'

const grouped = ref<Record<string, number>>({})
const mealsData = ref([])

onMounted(() => {
  const meals = getMeals()
  mealsData.value = meals
  const g: Record<string, number> = {}
  meals.forEach(m => {
    g[m.meal_date] = (g[m.meal_date] || 0) + 1
  })
  grouped.value = g
})

function exportData() {
  const blob = new Blob([JSON.stringify(mealsData.value, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'meals.json'
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Calendar History</h1>
    <button @click="exportData" class="bg-primary text-white px-2 py-1 rounded mb-2">Export</button>
    <ul>
      <li v-for="(count, date) in grouped" :key="date">
        {{ date }}: {{ count }} meal(s)
      </li>
    </ul>
  </div>
</template>
