import { ref, onMounted, watch } from 'vue';

const RECIPES_STORAGE_KEY = 'macrosRecipes';

// Initialize recipes with empty array, will be populated on mount
const recipes = ref([]);

// Function to delete a recipe by ID
function deleteRecipeById(id) {
    const index = recipes.value.findIndex(recipe => recipe.recipe_id === id);
    if (index !== -1) {
        recipes.value.splice(index, 1);
        console.log(`Recipe with ID ${id} deleted.`);
        // Watcher handles persistence
    } else {
        console.warn(`Recipe with ID ${id} not found for deletion.`);
    }
}

export function useRecipes() {

  // Load recipes from localStorage on component mount (client-side)
  onMounted(() => {
    if (process.client) { // Ensure this runs only on the client
        const storedRecipes = localStorage.getItem(RECIPES_STORAGE_KEY);
        if (storedRecipes) {
            try {
                recipes.value = JSON.parse(storedRecipes);
            } catch (e) {
                console.error('Error parsing recipes data from localStorage:', e);
                recipes.value = []; // Fallback to empty array
            }
        } else {
            recipes.value = []; // Initialize with empty array if nothing stored
        }
    }
  });

  // Watch for changes in recipes array and save to localStorage
  watch(recipes, (newRecipesValue) => {
    if (process.client) { // Ensure this runs only on the client
      localStorage.setItem(RECIPES_STORAGE_KEY, JSON.stringify(newRecipesValue));
      console.log('Recipes data saved to localStorage');
    }
  }, { deep: true }); // Use deep watch for array mutations

  // Function to add a new recipe
  const addRecipe = (newRecipe) => {
    // Basic validation/ID generation needed
    // Note: user_id might need to be dynamically obtained if using real auth
    recipes.value.push({ recipe_id: `recipe${Date.now()}`, user_id: 'localUser', ...newRecipe });
    console.log('Recipe added:', newRecipe);
    // Watcher handles persistence
  };

  // Function to find recipe by ID
  const getRecipeById = (id) => {
      return recipes.value.find(recipe => recipe.recipe_id === id);
  };

  return {
    recipes,
    addRecipe,
    getRecipeById,
    deleteRecipe: deleteRecipeById, // Expose the delete function
  };
} 