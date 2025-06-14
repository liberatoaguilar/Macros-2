<script setup lang="ts">
import { ref } from 'vue'
import { Menu as MenuIcon, X as CloseIcon } from 'lucide-vue-next'

const mobileOpen = ref(false)
</script>

<template>
  <div class="min-h-screen bg-background text-foreground dark">
    <header class="bg-secondary text-secondary-foreground">
      <div class="flex items-center justify-between max-w-md mx-auto p-4">
        <NuxtLink to="/" class="font-semibold">Macros 2</NuxtLink>
        <button
          class="md:hidden"
          @click="mobileOpen = !mobileOpen"
          aria-label="Toggle Navigation"
        >
          <MenuIcon v-if="!mobileOpen" class="size-6" />
          <CloseIcon v-else class="size-6" />
        </button>
        <nav class="hidden md:flex gap-4">
          <NuxtLink to="/meal-logging" class="hover:underline">Log</NuxtLink>
          <NuxtLink to="/calendar-history" class="hover:underline">Calendar</NuxtLink>
          <NuxtLink to="/foods-recipes" class="hover:underline">Foods</NuxtLink>
          <NuxtLink to="/profile-settings" class="hover:underline">Profile</NuxtLink>
        </nav>
      </div>
      <nav
        v-if="mobileOpen"
        class="md:hidden bg-secondary text-secondary-foreground px-4 pb-4"
      >
        <ul class="space-y-2 max-w-md mx-auto">
          <li>
            <NuxtLink @click="mobileOpen = false" to="/meal-logging" class="block py-1">Log</NuxtLink>
          </li>
          <li>
            <NuxtLink @click="mobileOpen = false" to="/calendar-history" class="block py-1">Calendar</NuxtLink>
          </li>
          <li>
            <NuxtLink @click="mobileOpen = false" to="/foods-recipes" class="block py-1">Foods</NuxtLink>
          </li>
          <li>
            <NuxtLink @click="mobileOpen = false" to="/profile-settings" class="block py-1">Profile</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>
    <main class="p-4 max-w-md mx-auto">
      <NuxtPage />
    </main>
  </div>
</template>
