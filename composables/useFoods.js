import { ref, onMounted, watch } from 'vue';

const FOODS_STORAGE_KEY = 'macrosFoods';

// Initialize foods with empty array, will be populated on mount
const foods = ref([]);

// Function to delete a food by ID (moved inside setup scope for consistency)
function deleteFoodById(id) {
    const index = foods.value.findIndex(food => food.food_id === id);
    if (index !== -1) {
        foods.value.splice(index, 1);
        console.log(`Food with ID ${id} deleted.`);
        // Watcher will handle persistence
    } else {
        console.warn(`Food with ID ${id} not found for deletion.`);
    }
}

export function useFoods() {

  // Load foods from localStorage on component mount (client-side)
  onMounted(() => {
    if (process.client) { // Ensure this runs only on the client
        const storedFoods = localStorage.getItem(FOODS_STORAGE_KEY);
        if (storedFoods) {
            try {
                foods.value = JSON.parse(storedFoods);
            } catch (e) {
                console.error('Error parsing foods data from localStorage:', e);
                foods.value = []; // Fallback to empty array
            }
        } else {
             foods.value = []; // Initialize with empty array if nothing stored
        }
    }
  });

  // Watch for changes in foods array and save to localStorage
  watch(foods, (newFoodsValue) => {
    if (process.client) { // Ensure this runs only on the client
      localStorage.setItem(FOODS_STORAGE_KEY, JSON.stringify(newFoodsValue));
      console.log('Foods data saved to localStorage');
    }
  }, { deep: true }); // Use deep watch for array mutations

  // Function to add a new food
  const addFood = (newFood) => {
    // Basic validation/ID generation needed in a real app
    foods.value.push({ food_id: `food${Date.now()}`, ...newFood });
    console.log('Food added:', newFood);
    // Watcher handles persistence
  };

  // Function to find a food by ID
  const getFoodById = (id) => {
      return foods.value.find(food => food.food_id === id);
  };

  return {
    foods,
    addFood,
    getFoodById,
    deleteFood: deleteFoodById, // Expose the delete function
  };
} 