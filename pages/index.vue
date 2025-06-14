<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { User } from '@/lib/db'
import { getUsers } from '@/lib/db'
import { Button } from '@/components/ui/button'

const user = ref<User | null>(null)
const progress = ref(0)

onMounted(() => {
  const users = getUsers()
  if (users.length) user.value = users[0]
})
</script>

<template>
  <div>
    <h1 class="text-xl font-bold mb-4">Dashboard</h1>
    <div v-if="user">
      <p class="mb-2">Calories Goal: {{ user.daily_calorie_goal }}</p>
      <div class="w-full bg-muted rounded h-3 overflow-hidden mb-4">
        <div class="bg-primary h-full" :style="{ width: progress + '%' }"></div>
      </div>
      <Button as="NuxtLink" to="/meal-logging" class="mt-2">Log a meal</Button>
    </div>
  </div>
</template>
