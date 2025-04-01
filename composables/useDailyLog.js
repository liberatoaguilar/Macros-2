import { ref, computed } from 'vue';
import { mockDailyLogs } from '../data/mockData';
import { useFoods } from './useFoods'; // Assuming you might need food details
import { useRecipes } from './useRecipes'; // Import recipes composable

// Daily logs keyed by date (YYYY-MM-DD)
const dailyLogs = ref(mockDailyLogs);
const { getFoodById } = useFoods();
const { getRecipeById } = useRecipes(); // Get recipe finder

// Helper to get today's date string
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function useDailyLog() {

  const todayDateString = computed(() => getTodayDateString());

  // Get log for a specific date, defaulting to today
  const getLogForDate = (dateStr = todayDateString.value) => {
    return dailyLogs.value[dateStr] || [];
  };

  // Add an item (food or recipe) to a specific date's log
  const addItemToLog = (item, dateStr = todayDateString.value) => {
    if (!dailyLogs.value[dateStr]) {
      dailyLogs.value[dateStr] = [];
    }
    // In a real app, you'd add more details, maybe a unique log entry ID
    dailyLogs.value[dateStr].push(item);
    console.log(`Item added to log for ${dateStr}:`, item);
    // Persist changes if needed
  };

  // Calculate total macros for a specific date
  const getMacrosForDate = (dateStr = todayDateString.value) => {
    const log = getLogForDate(dateStr);
    let totalProtein = 0;
    let totalCarbs = 0;
    let totalFat = 0;
    let totalCalories = 0;

    log.forEach(entry => {
      if (entry.type === 'food') {
        const foodDetails = getFoodById(entry.id);
        if (foodDetails) {
          // Assumes entry.quantity is in grams and foodDetails is per 100g
          const quantityMultiplier = entry.quantity / 100;
          totalProtein += foodDetails.protein_per_unit * quantityMultiplier;
          totalCarbs += foodDetails.carbs_per_unit * quantityMultiplier;
          totalFat += foodDetails.fat_per_unit * quantityMultiplier;
          totalCalories += foodDetails.calories_per_unit * quantityMultiplier;
        }
      } else if (entry.type === 'recipe') {
        const recipeDetails = getRecipeById(entry.id);
        if (recipeDetails && recipeDetails.foods) {
          // Calculate macros by summing up ingredients
          // Assuming quantity multiplier for recipe is 1 (can be adjusted later)
          recipeDetails.foods.forEach(ingredient => {
            const foodDetails = getFoodById(ingredient.food_id);
            if (foodDetails) {
              // Assumes ingredient.quantity is grams and foodDetails is per 100g
              const quantityMultiplier = ingredient.quantity / 100;
              totalProtein += foodDetails.protein_per_unit * quantityMultiplier;
              totalCarbs += foodDetails.carbs_per_unit * quantityMultiplier;
              totalFat += foodDetails.fat_per_unit * quantityMultiplier;
              totalCalories += foodDetails.calories_per_unit * quantityMultiplier;
            }
          });
        }
      } else if (entry.type === 'quicklog') {
          // Add macros directly from the quick log entry
          if (entry.macros) {
              totalProtein += entry.macros.protein || 0;
              totalCarbs += entry.macros.carbs || 0;
              totalFat += entry.macros.fat || 0;
              totalCalories += entry.macros.calories || 0;
          }
      }
    });

    return {
      protein: Math.round(totalProtein),
      carbs: Math.round(totalCarbs),
      fat: Math.round(totalFat),
      calories: Math.round(totalCalories),
    };
  };

  // Computed property for today's log
  const todayLog = computed(() => getLogForDate(todayDateString.value));

  // Computed property for today's total macros
  const todayMacros = computed(() => getMacrosForDate(todayDateString.value));


  return {
    dailyLogs,
    todayLog,
    todayMacros,
    getLogForDate,
    addItemToLog,
    getMacrosForDate,
    todayDateString,
    // Expose the removal function, wrapping it slightly
    removeItemFromLog: (index, dateStr = todayDateString.value) => {
        removeItemByIndex(dateStr, index);
    },
  };
}

// Function to remove an item by index from a specific date's log
function removeItemByIndex(dateStr, index) {
    if (dailyLogs.value[dateStr] && dailyLogs.value[dateStr][index] !== undefined) {
        dailyLogs.value[dateStr].splice(index, 1);
        console.log(`Item at index ${index} removed from log for ${dateStr}.`);
        // Persist changes if needed
    } else {
        console.warn(`Could not remove item at index ${index} for date ${dateStr}.`);
    }
} 