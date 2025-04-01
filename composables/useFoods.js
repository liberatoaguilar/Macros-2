import { ref } from 'vue';
import { mockFoods } from '../data/mockData';

const foods = ref(mockFoods);

export function useFoods() {
  // Function to add a new food (example)
  const addFood = (newFood) => {
    // Basic validation/ID generation needed in a real app
    foods.value.push({ food_id: `food${Date.now()}`, ...newFood });
    console.log('Food added:', newFood);
    // Persist changes if needed
  };

  // Function to find a food by ID
  const getFoodById = (id) => {
      return foods.value.find(food => food.food_id === id);
  };

  return {
    foods,
    addFood,
    getFoodById,
    deleteFood: deleteFoodById,
  };
}

// Function to delete a food by ID
function deleteFoodById(id) {
    const index = foods.value.findIndex(food => food.food_id === id);
    if (index !== -1) {
        foods.value.splice(index, 1);
        console.log(`Food with ID ${id} deleted.`);
        // Persist changes if needed
    } else {
        console.warn(`Food with ID ${id} not found for deletion.`);
    }
} 