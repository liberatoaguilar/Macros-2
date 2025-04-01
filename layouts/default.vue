<template>
  <div class="dark bg-black text-neutral-100 min-h-screen">
    <header class="p-4 border-b border-neutral-800">
      <nav class="container mx-auto flex justify-between items-center">
        <NuxtLink to="/" class="text-xl md:text-2xl font-bold text-primary transition-colors">Macros 2</NuxtLink>
        <ul class="flex space-x-3 md:space-x-4 text-sm md:text-base">
          <li><NuxtLink to="/history" class="hover:text-primary-light transition-colors px-2 py-1 rounded" active-class="text-primary font-semibold">History</NuxtLink></li>
          <li><NuxtLink to="/foods-recipes" class="hover:text-primary-light transition-colors px-2 py-1 rounded" active-class="text-primary font-semibold">Foods</NuxtLink></li>
          <li><NuxtLink to="/profile" class="hover:text-primary-light transition-colors px-2 py-1 rounded" active-class="text-primary font-semibold">Profile</NuxtLink></li>
        </ul>
      </nav>
    </header>
    <main class="container mx-auto p-4">
      <slot />
    </main>
    <footer class="mt-8 p-4 text-center text-xs text-neutral-500 border-t border-neutral-800">
      Macros 2 - Simple Macro Tracking
    </footer>
  </div>
</template>

<script setup>
// No script needed for basic layout yet
</script>

<style scoped>
/* Removed old active class style, using Tailwind's active-class prop now */
</style> 