<template>
  <div class="bg-neutral-950 p-4 rounded-lg shadow text-center">
    <h3 class="text-lg font-semibold mb-2 text-neutral-300">{{ label }}</h3>
    <p class="text-3xl font-bold text-primary">{{ current }}<span class="text-xl text-neutral-400">{{ unit }}</span></p>
    <p class="text-sm text-neutral-500 mb-3">Goal: {{ goal }} {{ unit }}</p>
    <div class="w-full bg-neutral-700 rounded-full h-2.5 dark:bg-neutral-700">
      <div
        :class="[colorClass ? colorClass : 'bg-primary', 'h-2.5 rounded-full']"
        :style="{ width: percentage + '%' }"
      ></div>
    </div>
    <p class="text-xs text-neutral-400 mt-1">{{ percentage }}% Complete</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  current: {
    type: Number,
    required: true,
  },
  goal: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    default: 'g',
  },
  colorClass: {
      type: String,
      default: '' // Default uses primary color
  }
});

const percentage = computed(() => {
  if (!props.goal || props.goal === 0) return 0;
  const perc = Math.round((props.current / props.goal) * 100);
  return Math.min(perc, 100); // Cap at 100%
});

</script>

<style scoped>
/* Add any specific styles for MacroCard if needed */
</style>
