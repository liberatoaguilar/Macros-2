<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers, saveUsers, type User } from '@/lib/db'

const user = ref<User | null>(null)

function save() {
  if (!user.value) return
  saveUsers([user.value])
}

onMounted(() => {
  const users = getUsers()
  if (users.length) user.value = { ...users[0] }
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Profile Settings</h1>
    <div v-if="user" class="space-y-2">
      <input v-model="user.name" placeholder="Name" class="border p-1" />
      <input v-model.number="user.daily_calorie_goal" type="number" placeholder="Calories" class="border p-1" />
      <input v-model.number="user.protein_goal" type="number" placeholder="Protein" class="border p-1" />
      <input v-model.number="user.carbs_goal" type="number" placeholder="Carbs" class="border p-1" />
      <input v-model.number="user.fat_goal" type="number" placeholder="Fat" class="border p-1" />
      <button @click="save" class="bg-primary text-white px-2 py-1 rounded">Save</button>
    </div>
  </div>
</template>
