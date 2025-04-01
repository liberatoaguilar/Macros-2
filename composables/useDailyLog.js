import { ref, computed, onMounted, watch } from 'vue';
import { useFoods } from './useFoods';
import { useRecipes } from './useRecipes';

const DAILY_LOG_STORAGE_KEY = 'macrosDailyLogs';

// Daily logs keyed by date (YYYY-MM-DD)
// Initialize with empty object, will be populated on mount
const dailyLogs = ref({});
const { getFoodById } = useFoods();
const { getRecipeById } = useRecipes();

// Helper to get today's date string
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Function to remove an item by index from a specific date's log
function removeItemByIndex(dateStr, index) {
    if (dailyLogs.value[dateStr] && dailyLogs.value[dateStr][index] !== undefined) {
        dailyLogs.value[dateStr].splice(index, 1);
        console.log(`Item at index ${index} removed from log for ${dateStr}.`);
        // Watcher handles persistence
    } else {
        console.warn(`Could not remove item at index ${index} for date ${dateStr}.`);
    }
}

export function useDailyLog() {

  // Load daily logs from localStorage on component mount (client-side)
  onMounted(() => {
    if (process.client) { // Ensure this runs only on the client
        const storedLogs = localStorage.getItem(DAILY_LOG_STORAGE_KEY);
        if (storedLogs) {
            try {
                dailyLogs.value = JSON.parse(storedLogs);
            } catch (e) {
                console.error('Error parsing daily logs data from localStorage:', e);
                dailyLogs.value = {}; // Fallback to empty object
            }
        } else {
            dailyLogs.value = {}; // Initialize with empty object if nothing stored
        }
    }
  });

  // Watch for changes in dailyLogs object and save to localStorage
  watch(dailyLogs, (newLogsValue) => {
    if (process.client) { // Ensure this runs only on the client
      localStorage.setItem(DAILY_LOG_STORAGE_KEY, JSON.stringify(newLogsValue));
      console.log('Daily logs data saved to localStorage');
    }
  }, { deep: true }); // Use deep watch for object mutations

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
    dailyLogs.value[dateStr].push(item);
    console.log(`Item added to log for ${dateStr}:`, item);
    // Watcher handles persistence
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
    removeItemFromLog: (index, dateStr = todayDateString.value) => {
        removeItemByIndex(dateStr, index);
    },
  };
} 