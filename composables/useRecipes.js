import { ref } from 'vue';
import { mockRecipes } from '../data/mockData';

const recipes = ref(mockRecipes);

export function useRecipes() {
  // Function to add a new recipe (example)
  const addRecipe = (newRecipe) => {
    // Basic validation/ID generation needed
    recipes.value.push({ recipe_id: `recipe${Date.now()}`, user_id: 'user1', ...newRecipe });
    console.log('Recipe added:', newRecipe);
    // Persist changes if needed
  };

  // Function to find recipe by ID
  const getRecipeById = (id) => {
      return recipes.value.find(recipe => recipe.recipe_id === id);
  };

  return {
    recipes,
    addRecipe,
    getRecipeById,
    deleteRecipe: deleteRecipeById,
  };
}

// Function to delete a recipe by ID
function deleteRecipeById(id) {
    const index = recipes.value.findIndex(recipe => recipe.recipe_id === id);
    if (index !== -1) {
        recipes.value.splice(index, 1);
        console.log(`Recipe with ID ${id} deleted.`);
        // Persist changes if needed
    } else {
        console.warn(`Recipe with ID ${id} not found for deletion.`);
    }
} 