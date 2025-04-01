<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-neutral-950 p-6 rounded-lg shadow-xl w-full max-w-lg">
      <h2 class="text-2xl font-bold text-primary mb-4">Create New Recipe</h2>
      <form @submit.prevent="handleAddRecipe" class="space-y-4">
        <div>
          <label for="recipe-name" class="block text-sm font-medium text-neutral-300 mb-1">Recipe Name:</label>
          <input type="text" id="recipe-name" v-model="recipeName" required class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
            <h3 class="text-lg font-semibold mb-2">Ingredients</h3>
            <div v-for="(ingredient, index) in ingredients" :key="index" class="flex items-center space-x-2 mb-2">
                 <select v-model="ingredient.food_id" required class="flex-grow p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
                    <option disabled value="">Select Food</option>
                    <option v-for="food in availableFoods" :key="food.food_id" :value="food.food_id">{{ food.name }}</option>
                </select>
                <input type="number" v-model.number="ingredient.quantity" placeholder="g" required min="1" class="w-24 p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
                <button type="button" @click="removeIngredient(index)" class="text-red-500 hover:text-red-400 p-1">✕</button>
            </div>
             <button type="button" @click="addIngredient" class="text-sm bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-1 px-3 rounded transition-colors">
                + Add Ingredient
            </button>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeModal" class="bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Cancel
            </button>
            <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                Create Recipe
            </button>
        </div>
        <div v-if="addSuccessMessage" class="mt-4 p-3 bg-green-600 text-white rounded-md text-center">
            {{ addSuccessMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useFoods } from '~/composables/useFoods';
import { useRecipes } from '~/composables/useRecipes';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'recipeAdded']);

const { foods: availableFoods } = useFoods();
const { addRecipe } = useRecipes();

const recipeName = ref('');
const ingredients = reactive([ { food_id: '', quantity: null } ]); // Start with one ingredient line
const addSuccessMessage = ref('');

const addIngredient = () => {
    ingredients.push({ food_id: '', quantity: null });
};

const removeIngredient = (index) => {
    ingredients.splice(index, 1);
    if (ingredients.length === 0) { // Ensure at least one ingredient line exists
        addIngredient();
    }
};

const closeModal = () => {
    emit('close');
    resetForm();
};

const resetForm = () => {
    recipeName.value = '';
    ingredients.splice(0, ingredients.length, { food_id: '', quantity: null }); // Reset array
    addSuccessMessage.value = '';
}

const handleAddRecipe = () => {
    if (!recipeName.value) {
        alert('Recipe name is required.');
        return;
    }
    const validIngredients = ingredients.filter(ing => ing.food_id && ing.quantity > 0);
    if (validIngredients.length === 0) {
        alert('Please add at least one valid ingredient.');
        return;
    }

    const newRecipeData = {
        name: recipeName.value,
        foods: validIngredients.map(ing => ({ // Structure as per mockData
            food_id: ing.food_id,
            quantity: ing.quantity,
            unit: 'g' // Assuming grams for now
        }))
    };

    addRecipe(newRecipeData);
    emit('recipeAdded');
    addSuccessMessage.value = `Recipe "${recipeName.value}" created successfully!`;

    setTimeout(() => {
      closeModal();
    }, 1500);
};

// Reset form when modal opens
watch(() => props.show, (newVal) => {
    if (newVal) {
        resetForm();
    }
});

</script> 