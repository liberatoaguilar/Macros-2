export const mockUser = {
  user_id: 'user1',
  name: 'Default User',
  email: 'user@example.com',
  daily_calorie_goal: 2000,
  protein_goal: 150, // grams
  carbs_goal: 200, // grams
  fat_goal: 67, // grams
  preferred_units: 'g',
};

export const mockFoods = [
  {
    food_id: 'food1',
    name: 'Chicken Breast',
    protein_per_unit: 31,
    carbs_per_unit: 0,
    fat_per_unit: 3.6,
    calories_per_unit: 165,
    unit: '100g',
  },
  {
    food_id: 'food2',
    name: 'Brown Rice',
    protein_per_unit: 2.6,
    carbs_per_unit: 23,
    fat_per_unit: 0.9,
    calories_per_unit: 111,
    unit: '100g',
  },
  {
    food_id: 'food3',
    name: 'Olive Oil',
    protein_per_unit: 0,
    carbs_per_unit: 0,
    fat_per_unit: 100,
    calories_per_unit: 884,
    unit: '100g', // ~109ml
  },
  {
    food_id: 'food4',
    name: 'Apple',
    protein_per_unit: 0.3,
    carbs_per_unit: 14,
    fat_per_unit: 0.2,
    calories_per_unit: 52,
    unit: '100g', // medium apple ~182g
  },
];

export const mockRecipes = [
  {
    recipe_id: 'recipe1',
    name: 'Chicken & Rice Bowl',
    user_id: 'user1',
    foods: [
      { food_id: 'food1', quantity: 150, unit: 'g' }, // 150g Chicken
      { food_id: 'food2', quantity: 200, unit: 'g' }, // 200g Cooked Brown Rice
    ],
  },
];

// Simple structure for daily logs, storing consumed items directly for now
// Key: YYYY-MM-DD
export const mockDailyLogs = {
  // Example entry for today - adjust date as needed
  // '2024-07-27': [
  //   { type: 'food', id: 'food1', quantity: 150, unit: 'g' },
  //   { type: 'food', id: 'food2', quantity: 200, unit: 'g' },
  //   { type: 'food', id: 'food4', quantity: 180, unit: 'g' }, // 1 medium apple
  // ]
};

// Helper function to get today's date string
function getTodayDateString() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Add an example log for today if it doesn't exist
const todayStr = getTodayDateString();
if (!mockDailyLogs[todayStr]) {
  mockDailyLogs[todayStr] = [
      // Store type, food id, and quantity in grams
      { type: 'food', id: 'food1', quantity: 150 }, // 150g Chicken
      { type: 'food', id: 'food4', quantity: 180 }, // ~1 medium apple (180g)
  ];
} 