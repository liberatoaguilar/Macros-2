<template>
  <div class="min-h-screen bg-background text-foreground">
    <header class="p-4 bg-primary text-primary-foreground flex gap-4">
      <NuxtLink to="/">Dashboard</NuxtLink>
      <NuxtLink to="/meal-logging">Meal Logging</NuxtLink>
      <NuxtLink to="/calendar-history">Calendar</NuxtLink>
      <NuxtLink to="/foods-recipes">Foods & Recipes</NuxtLink>
      <NuxtLink to="/profile-settings">Profile</NuxtLink>
    </header>
    <main class="p-4">
      <NuxtPage />
    </main>
  </div>
</template>
