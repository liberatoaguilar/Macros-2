<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getUsers, saveUsers, type User } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
      <Input v-model="user.name" placeholder="Name" />
      <Input v-model.number="user.daily_calorie_goal" type="number" placeholder="Calories" />
      <Input v-model.number="user.protein_goal" type="number" placeholder="Protein" />
      <Input v-model.number="user.carbs_goal" type="number" placeholder="Carbs" />
      <Input v-model.number="user.fat_goal" type="number" placeholder="Fat" />
      <Button @click="save">Save</Button>
    </div>
  </div>
</template>
