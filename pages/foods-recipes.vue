<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getFoods, saveFoods, type Food } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const foods = ref<Food[]>([])
const newFood = ref({ name: '', unit: 'g', protein: 0, carbs: 0, fat: 0, calories: 0 })

function addFood() {
  const item: Food = {
    food_id: 'f' + Date.now(),
    name: newFood.value.name,
    protein_per_unit: Number(newFood.value.protein),
    carbs_per_unit: Number(newFood.value.carbs),
    fat_per_unit: Number(newFood.value.fat),
    calories_per_unit: Number(newFood.value.calories),
    unit: newFood.value.unit
  }
  const list = [...foods.value, item]
  saveFoods(list)
  foods.value = list
  newFood.value = { name: '', unit: 'g', protein: 0, carbs: 0, fat: 0, calories: 0 }
}

onMounted(() => {
  foods.value = getFoods()
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Foods &amp; Recipes</h1>
    <div class="mb-4">
      <Input v-model="newFood.name" placeholder="Name" class="mr-2" />
      <Input v-model.number="newFood.protein" type="number" placeholder="Protein" class="mr-2 w-20" />
      <Input v-model.number="newFood.carbs" type="number" placeholder="Carbs" class="mr-2 w-20" />
      <Input v-model.number="newFood.fat" type="number" placeholder="Fat" class="mr-2 w-20" />
      <Input v-model.number="newFood.calories" type="number" placeholder="Calories" class="mr-2 w-20" />
      <Button @click="addFood">Add</Button>
    </div>
    <ul>
      <li v-for="f in foods" :key="f.food_id">{{ f.name }} ({{ f.unit }})</li>
    </ul>
  </div>
</template>
