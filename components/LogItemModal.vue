<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-neutral-950 p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-primary mb-4">Log Item</h2>
      <form @submit.prevent="handleLogItem" class="space-y-4">
        <!-- Type Selection -->
        <div class="mb-4">
            <label class="block text-sm font-medium text-neutral-300 mb-1">Item Type:</label>
            <select v-model="logType" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
                <option value="food">Food</option>
                <option value="recipe">Recipe</option>
            </select>
        </div>

        <!-- Food Selection -->
        <div v-if="logType === 'food'">
          <label for="food-select-modal" class="block text-sm font-medium text-neutral-300 mb-1">Select Food:</label>
          <select
            id="food-select-modal"
            v-model="selectedFoodId"
            :required="logType === 'food'"
            class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary"
          >
            <option disabled value="">Please select one</option>
            <option v-for="food in availableFoods" :key="food.food_id" :value="food.food_id">
              {{ food.name }} ({{ food.calories_per_unit }} kcal / {{ food.unit }})
            </option>
          </select>
        </div>

        <!-- Recipe Selection -->
         <div v-if="logType === 'recipe'">
          <label for="recipe-select-modal" class="block text-sm font-medium text-neutral-300 mb-1">Select Recipe:</label>
          <select
            id="recipe-select-modal"
            v-model="selectedRecipeId"
            :required="logType === 'recipe'"
            class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary"
          >
            <option disabled value="">Please select one</option>
            <option v-for="recipe in availableRecipes" :key="recipe.recipe_id" :value="recipe.recipe_id">
              {{ recipe.name }}
            </option>
          </select>
        </div>

        <!-- Quantity (Only for Food) -->
        <div v-if="logType === 'food'">
          <label for="quantity-modal" class="block text-sm font-medium text-neutral-300 mb-1">Quantity (g):</label>
          <input
            type="number"
            id="quantity-modal"
            v-model.number="quantity"
            :required="logType === 'food'"
            min="1"
            class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary"
            placeholder="Enter amount in grams"
          />
        </div>

        <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeModal" class="bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Cancel
            </button>
            <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                Log Item
            </button>
        </div>
      </form>
      <div v-if="logSuccessMessage" class="mt-4 p-3 bg-green-600 text-white rounded-md text-center">
        {{ logSuccessMessage }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useFoods } from '~/composables/useFoods';
import { useRecipes } from '~/composables/useRecipes';
import { useDailyLog } from '~/composables/useDailyLog';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'itemLogged']);

const { foods: availableFoods } = useFoods();
const { recipes: availableRecipes, getRecipeById } = useRecipes();
const { addItemToLog } = useDailyLog();

const logType = ref('food');
const selectedFoodId = ref('');
const selectedRecipeId = ref('');
const quantity = ref(null);
const logSuccessMessage = ref('');

const closeModal = () => {
    emit('close');
    resetForm();
};

const resetForm = () => {
    logType.value = 'food';
    selectedFoodId.value = '';
    selectedRecipeId.value = '';
    quantity.value = null;
    logSuccessMessage.value = '';
}

const handleLogItem = () => {
  let newItem = null;
  let itemName = '';

  if (logType.value === 'food') {
    if (!selectedFoodId.value || !quantity.value || quantity.value <= 0) {
      alert('Please select a food and enter a valid quantity.');
      return;
    }
    itemName = availableFoods.value.find(f => f.food_id === selectedFoodId.value)?.name || 'Food';
    newItem = {
      type: 'food',
      id: selectedFoodId.value,
      quantity: quantity.value,
    };
  } else if (logType.value === 'recipe') {
    if (!selectedRecipeId.value) {
      alert('Please select a recipe.');
      return;
    }
    const recipe = getRecipeById(selectedRecipeId.value);
    itemName = recipe ? recipe.name : 'Recipe';
    newItem = {
        type: 'recipe',
        id: selectedRecipeId.value,
    };
  }

  if (newItem) {
    addItemToLog(newItem);
    emit('itemLogged');
    logSuccessMessage.value = `Successfully logged ${itemName}!`;
    setTimeout(() => closeModal(), 1500);
  } else {
      alert('Invalid item type selected.');
  }
};

watch(() => props.show, (newVal) => {
    if (newVal) resetForm();
});

watch(logType, () => {
    selectedFoodId.value = '';
    selectedRecipeId.value = '';
    quantity.value = null;
});

</script> 