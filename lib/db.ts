export interface User {
  user_id: string
  name: string
  email: string
  daily_calorie_goal: number
  protein_goal: number
  carbs_goal: number
  fat_goal: number
  preferred_units: string
}

export interface Food {
  food_id: string
  name: string
  protein_per_unit: number
  carbs_per_unit: number
  fat_per_unit: number
  calories_per_unit: number
  unit: string
}

export interface Recipe {
  recipe_id: string
  name: string
  user_id: string
  foods: { food_id: string; quantity: number }[]
}

export interface Meal {
  meal_id: string
  user_id: string
  meal_date: string
  items: { type: 'food' | 'recipe'; id: string; quantity: number }[]
}

export interface DailyLog {
  log_id: string
  user_id: string
  date: string
  meals: string[]
}

const keys = {
  users: 'users',
  foods: 'foods',
  recipes: 'recipes',
  meals: 'meals',
  logs: 'dailyLogs'
}

function load<T>(key: string): T[] {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : []
}

function save<T>(key: string, data: T[]) {
  localStorage.setItem(key, JSON.stringify(data))
}

export function initData() {
  if (!localStorage.getItem(keys.users)) {
    seedData()
  }
}

export function getUsers() {
  return load<User>(keys.users)
}

export function saveUsers(users: User[]) {
  save(keys.users, users)
}

export function getFoods() {
  return load<Food>(keys.foods)
}

export function saveFoods(foods: Food[]) {
  save(keys.foods, foods)
}

export function getRecipes() {
  return load<Recipe>(keys.recipes)
}

export function saveRecipes(recipes: Recipe[]) {
  save(keys.recipes, recipes)
}

export function getMeals() {
  return load<Meal>(keys.meals)
}

export function saveMeals(meals: Meal[]) {
  save(keys.meals, meals)
}

export function getDailyLogs() {
  return load<DailyLog>(keys.logs)
}

export function saveDailyLogs(logs: DailyLog[]) {
  save(keys.logs, logs)
}

export function seedData() {
  const users: User[] = [
    {
      user_id: 'u1',
      name: 'Test User',
      email: 'user@example.com',
      daily_calorie_goal: 2500,
      protein_goal: 180,
      carbs_goal: 250,
      fat_goal: 70,
      preferred_units: 'g'
    }
  ]

  const foods: Food[] = [
    {
      food_id: 'f1',
      name: 'Chicken Breast',
      protein_per_unit: 31,
      carbs_per_unit: 0,
      fat_per_unit: 3.6,
      calories_per_unit: 165,
      unit: 'g'
    }
  ]

  const recipes: Recipe[] = [
    {
      recipe_id: 'r1',
      name: 'Chicken Bowl',
      user_id: 'u1',
      foods: [
        { food_id: 'f1', quantity: 200 }
      ]
    }
  ]

  const meals: Meal[] = []
  const logs: DailyLog[] = []

  save(keys.users, users)
  save(keys.foods, foods)
  save(keys.recipes, recipes)
  save(keys.meals, meals)
  save(keys.logs, logs)
}
