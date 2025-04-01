<template>
  <div>
    <h1 class="text-3xl font-bold text-primary mb-6">Dashboard</h1>
    <div class="flex justify-between align-middle pl-1 pr-1 mb-4">
      <p>Welcome, <b>{{ user?.name || 'User' }}!</b></p>
      <p class="text-xl"><b class="text-primary">{{ todayDateString }}</b></p>
    </div>

    <!-- Macro Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
      <MacroCard label="Calories" :current="todayMacros.calories" :goal="user?.daily_calorie_goal" unit="kcal" />
      <MacroCard label="Protein" :current="todayMacros.protein" :goal="user?.protein_goal" unit="g" colorClass="bg-sky-600" />
      <MacroCard label="Carbs" :current="todayMacros.carbs" :goal="user?.carbs_goal" unit="g" colorClass="bg-rose-600" />
      <MacroCard label="Fat" :current="todayMacros.fat" :goal="user?.fat_goal" unit="g" colorClass="bg-amber-500" />
    </div>

    <!-- Today's Log Section -->
    <div class="bg-neutral-950 p-4 rounded-lg shadow">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-xl font-semibold">Today's Log</h2>
        <div class="space-x-2">
             <button @click="showQuickLogModal = true" class="bg-blue-600 hover:bg-blue-500 text-white font-bold py-2 px-4 rounded transition-colors text-sm">
                Quick Log
            </button>
            <button @click="showLogModal = true" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors text-sm">
                Log Item
            </button>
        </div>
      </div>
      <ul v-if="todayLog.length > 0" class="space-y-2 max-h-60 overflow-y-auto">
        <li v-for="(item, index) in todayLog" :key="index" class="flex justify-between items-center p-2 bg-neutral-700 rounded text-sm">
            <div class="flex-grow mr-2">
                <span v-if="item.type === 'food'">{{ getFoodName(item.id) }}</span>
                <span v-else-if="item.type === 'recipe'">{{ getRecipeName(item.id) }}</span>
                <span v-else-if="item.type === 'quicklog'" class="italic">{{ item.name }}</span>
                <span v-else>Unknown Item</span>
            </div>
            <div class="flex items-center flex-shrink-0">
                <span v-if="item.type === 'food'" class="text-neutral-300 mr-3">{{ item.quantity }}g</span>
                <span v-else-if="item.type === 'recipe'" class="text-neutral-300 mr-3">{{ getRecipeGrams(item.id) }}g</span>
                <span v-else-if="item.type === 'quicklog'" class="text-neutral-300 mr-3">{{ item.macros?.calories }} kcal</span>
                <!-- Delete Button -->
                <button @click="confirmDeleteItem(index)" class="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-neutral-600 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                </button>
            </div>
        </li>
      </ul>
      <p v-else class="text-neutral-400 text-sm italic">No items logged yet today.</p>
    </div>

    <!-- Modals -->
    <LogItemModal :show="showLogModal" @close="showLogModal = false" @itemLogged="handleItemLogged" />
    <QuickLogModal :show="showQuickLogModal" @close="showQuickLogModal = false" @itemLogged="handleItemLogged" />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUser } from '~/composables/useUser';
import { useDailyLog } from '~/composables/useDailyLog';
import { useFoods } from '~/composables/useFoods';
import { useRecipes } from '~/composables/useRecipes';
import MacroCard from '~/components/MacroCard.vue';
import LogItemModal from '~/components/LogItemModal.vue';
import QuickLogModal from '~/components/QuickLogModal.vue';

const { user } = useUser();
const { todayLog, todayMacros, todayDateString, removeItemFromLog } = useDailyLog();
const { getFoodById } = useFoods();
const { getRecipeById } = useRecipes();

const showLogModal = ref(false);
const showQuickLogModal = ref(false);

const getFoodName = (foodId) => {
  const food = getFoodById(foodId);
  return food ? food.name : 'Unknown Food';
};

const getRecipeName = (recipeId) => {
    const recipe = getRecipeById(recipeId);
    return recipe ? recipe.name : 'Unknown Recipe';
};

const getRecipeGrams = (recipeId) => {
  const recipe = getRecipeById(recipeId);
  return recipe.foods.reduce((total, food) => {
    return total + (food.quantity);
  }, 0);
};

const confirmDeleteItem = (index) => {
  if (confirm('Are you sure you want to delete this item?')) {
    removeItemFromLog(index);
  }
};

const handleItemLogged = () => {
  // Optional: Callback after any item is logged
};

</script>
