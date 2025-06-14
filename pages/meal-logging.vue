<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getFoods, getMeals, saveMeals, type Food } from '@/lib/db'

const foods = ref<Food[]>([])
const query = ref('')
const quantities = ref<Record<string, number>>({})

const results = computed(() => {
  const q = query.value.toLowerCase()
  return foods.value.filter(f => f.name.toLowerCase().includes(q))
})

function addToLog(food: Food) {
  const qty = quantities.value[food.food_id] || 1
  const meals = getMeals()
  meals.push({
    meal_id: 'm' + Date.now(),
    user_id: 'u1',
    meal_date: new Date().toISOString().slice(0, 10),
    items: [{ type: 'food', id: food.food_id, quantity: qty }]
  })
  saveMeals(meals)
  quantities.value[food.food_id] = 1
}

onMounted(() => {
  foods.value = getFoods()
  foods.value.forEach(f => quantities.value[f.food_id] = 1)
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Meal Logging</h1>
    <input v-model="query" placeholder="Search foods" class="border p-2 mb-4 w-full" />
    <ul>
      <li v-for="food in results" :key="food.food_id" class="mb-2 flex items-center gap-2">
        <span class="flex-1">{{ food.name }}</span>
        <input type="number" min="1" v-model.number="quantities[food.food_id]" class="w-16 border p-1" />
        <button @click="addToLog(food)" class="bg-primary text-white px-2 py-1 rounded">Add</button>
      </li>
    </ul>
  </div>
</template>
