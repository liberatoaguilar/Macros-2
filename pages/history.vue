<template>
  <div>
    <h1 class="text-3xl font-bold text-primary mb-6">History</h1>
    <p class="mb-4">Review your past macro intake. Select a date below.</p>

    <!-- Date Selector -->
     <div class="mb-6">
        <label for="history-date" class="block text-sm font-medium text-neutral-300 mb-1">Select Date:</label>
        <!-- Prevent selecting future dates -->
        <input
            type="date"
            id="history-date"
            v-model="selectedDate"
            :max="todayDateString"
            class="w-full md:w-auto p-2 bg-neutral-800 text-neutral-100 rounded-md focus:ring-primary focus:border-primary"
        />
    </div>

    <!-- Log Display for Selected Date -->
    <div v-if="selectedLog && selectedLog.length > 0" class="space-y-4">
        <div class="bg-neutral-950 p-4 rounded-lg shadow">
            <h2 class="text-xl font-semibold text-primary mb-2">{{ formatDate(selectedDate) }}</h2>
            <div class="mb-2">
                <p><span class="font-medium">Total Calories:</span> {{ selectedMacros.calories }} kcal</p>
                <p><span class="font-medium">Protein:</span> {{ selectedMacros.protein }}g</p>
                <p><span class="font-medium">Carbs:</span> {{ selectedMacros.carbs }}g</p>
                <p><span class="font-medium">Fat:</span> {{ selectedMacros.fat }}g</p>
            </div>
            <details class="text-sm">
                <summary class="cursor-pointer text-neutral-400 hover:text-neutral-200">View Logged Items ({{ selectedLog.length }})</summary>
                <ul class="mt-2 space-y-1 pl-4 list-disc list-inside text-neutral-300">
                    <li v-for="(item, index) in selectedLog" :key="index">
                        <span v-if="item.type === 'food'">{{ getFoodName(item.id) }}: {{ item.quantity }}g</span>
                        <span v-else-if="item.type === 'recipe'">{{ getRecipeName(item.id) }} (Recipe)</span>
                        <span v-else-if="item.type === 'quicklog'" class="italic">{{ item.name }}: {{ item.macros?.calories }} kcal</span>
                        <span v-else>Unknown Item Type</span>
                    </li>
                </ul>
            </details>
        </div>
    </div>
    <p v-else-if="selectedDate" class="text-neutral-400">No log data found for {{ formatDate(selectedDate) }}.</p>
     <p v-else class="text-neutral-400">Select a date to view history.</p>

  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'; // Added watch
import { useDailyLog } from '~/composables/useDailyLog';
import { useFoods } from '~/composables/useFoods';
import { useRecipes } from '~/composables/useRecipes';

const { getLogForDate, getMacrosForDate, todayDateString } = useDailyLog();
const { getFoodById } = useFoods();
const { getRecipeById } = useRecipes();

const selectedDate = ref(todayDateString.value); // Default to today

// Reactive references for selected date's data
const selectedLog = ref([]);
const selectedMacros = ref({ calories: 0, protein: 0, carbs: 0, fat: 0 });

// Function to fetch and update data for the selected date
const updateHistoryData = (dateStr) => {
    selectedLog.value = getLogForDate(dateStr);
    selectedMacros.value = getMacrosForDate(dateStr);
};

// Watch for changes in selectedDate and update the displayed data
watch(selectedDate, (newDate) => {
    if (newDate) {
        updateHistoryData(newDate);
    }
}, { immediate: true }); // immediate: true runs the watcher on component load


const getFoodName = (foodId) => {
  const food = getFoodById(foodId);
  return food ? food.name : 'Unknown Food';
};

const getRecipeName = (recipeId) => {
    const recipe = getRecipeById(recipeId);
    return recipe ? recipe.name : 'Unknown Recipe';
};

// Basic date formatting
const formatDate = (dateStr) => {
    if (!dateStr) return '';
    // Add timeZone option to mitigate potential off-by-one day errors
    const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
};

</script>
