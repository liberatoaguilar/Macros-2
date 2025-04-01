<template>
  <div>
    <h1 class="text-3xl font-bold text-primary mb-6">Foods & Recipes</h1>
    <p class="mb-4">Browse available foods and your saved recipes. Add your own!</p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Foods List -->
      <div class="bg-neutral-950 p-4 rounded-lg shadow">
        <div class="flex justify-between items-center mb-3">
            <h2 class="text-xl font-semibold">Available Foods</h2>
            <button @click="showAddFoodModal = true" class="text-sm bg-primary hover:bg-primary-dark text-white font-bold py-1 px-3 rounded transition-colors">
                + Add Food
            </button>
        </div>
        <ul v-if="foods.length > 0" class="space-y-2 max-h-96 overflow-y-auto pr-2">
          <li v-for="food in foods" :key="food.food_id" class="p-2 bg-neutral-700 rounded flex justify-between items-center">
            <div>
                <span class="font-medium">{{ food.name }}</span>
                <span class="text-xs text-neutral-400 block">({{ food.calories_per_unit }} kcal, P:{{ food.protein_per_unit }}g, C:{{ food.carbs_per_unit }}g, F:{{ food.fat_per_unit }}g per {{ food.unit }})</span>
            </div>
            <!-- Delete Food Button -->
            <button @click="confirmDeleteFood(food)" class="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-neutral-600 transition-colors ml-2 flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
          </li>
        </ul>
        <p v-else class="text-neutral-400">No foods available.</p>
      </div>

      <!-- Recipes List -->
      <div class="bg-neutral-950 p-4 rounded-lg shadow">
        <div class="flex justify-between items-center mb-3">
            <h2 class="text-xl font-semibold">Saved Recipes</h2>
             <button @click="showAddRecipeModal = true" class="text-sm bg-primary hover:bg-primary-dark text-white font-bold py-1 px-3 rounded transition-colors">
                + Add Recipe
            </button>
        </div>
        <ul v-if="recipes.length > 0" class="space-y-2 max-h-96 overflow-y-auto pr-2">
          <li v-for="recipe in recipes" :key="recipe.recipe_id" class="p-2 bg-neutral-700 rounded flex justify-between items-start">
            <div class="flex-grow mr-2">
                <span class="font-medium">{{ recipe.name }}</span>
                 <details class="text-xs mt-1">
                    <summary class="cursor-pointer text-neutral-400 hover:text-neutral-200">Ingredients ({{ recipe.foods.length }})</summary>
                    <ul class="mt-1 space-y-0.5 pl-4 list-disc list-inside text-neutral-300">
                        <li v-for="(ing, index) in recipe.foods" :key="index">
                            {{ getFoodName(ing.food_id) }}: {{ ing.quantity }}g
                        </li>
                    </ul>
                </details>
            </div>
            <!-- Delete Recipe Button -->
            <button @click="confirmDeleteRecipe(recipe)" class="text-red-500 hover:text-red-400 p-1 rounded-full hover:bg-neutral-600 transition-colors mt-1 flex-shrink-0">
                 <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            </button>
          </li>
        </ul>
        <p v-else class="text-neutral-400">No recipes saved yet.</p>
      </div>
    </div>

    <!-- Modals -->
    <AddFoodModal :show="showAddFoodModal" @close="showAddFoodModal = false" @foodAdded="handleFoodAdded" />
    <AddRecipeModal :show="showAddRecipeModal" @close="showAddRecipeModal = false" @recipeAdded="handleRecipeAdded" />

  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useFoods } from '~/composables/useFoods';
import { useRecipes } from '~/composables/useRecipes';
import AddFoodModal from '~/components/AddFoodModal.vue';
import AddRecipeModal from '~/components/AddRecipeModal.vue';

const { foods, getFoodById, deleteFood } = useFoods();
const { recipes, deleteRecipe } = useRecipes();

const showAddFoodModal = ref(false);
const showAddRecipeModal = ref(false);

const getFoodName = (foodId) => {
  const food = getFoodById(foodId);
  return food ? food.name : 'Unknown Food';
};

// Confirmation logic for deleting food
const confirmDeleteFood = (food) => {
    if (confirm(`Are you sure you want to delete the food "${food.name}"?`)) {
        deleteFood(food.food_id);
    }
};

// Confirmation logic for deleting recipe
const confirmDeleteRecipe = (recipe) => {
    if (confirm(`Are you sure you want to delete the recipe "${recipe.name}"?`)) {
        deleteRecipe(recipe.recipe_id);
    }
};

const handleFoodAdded = () => {
    // Logic after food is added, if needed (e.g., confirmation)
    // List updates reactively
};

const handleRecipeAdded = () => {
    // Logic after recipe is added, if needed
    // List updates reactively
};

</script>
