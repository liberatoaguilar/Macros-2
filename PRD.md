# Product Requirements Document (PRD)

---

## 1. Overview

### Project Name:

**Macros 2**

### Purpose:

A macronutrient tracking app designed for science-based bodybuilders and gym-goers aiming to precisely meet their fitness goals. Macros 2 simplifies and accelerates food logging and tracking compared to traditional solutions.

### Key Features:

- **Rapid Food Input:** Quickly input food macronutrients.
- **Recipes:** Save foods and food combinations as reusable recipes.
- **Today's Macros & Historical Tracking:** Visualize daily macro consumption and historical data.
- **Calorie & Macro Goals:** Customize daily calorie and macronutrient goals.
- **Progress Indicators:** Display daily percentage completion visuals.
- **Data Export and Charts:** Export data and visualize progress.
- **Multi-unit Support:** Manage different measurement units (g, oz, fl oz, etc.).
- **Profile Customization:** User preferences and goal management.

---

## 2. Tech Stack

- **Frontend:** Nuxt/Vue.js, Tailwind CSS
- **Backend:** Mock JSON backend (temporary)
- **Database:** Local Storage (browser-based)
- **Local Storage / Additional:** Temporary mock data stored locally in the browser.

---

## 3. Database Schema and SQL Files

### 3.1 Entities and Relations

- **User:** Unique user profiles with goal management.
- **Food:** Individual foods with standardized macronutrient data.
- **Recipe:** Collections of foods saved by users.
- **Meal:** Daily logs of foods or recipes consumed.
- **DailyLog:** Historical records of meals logged by date.

### 3.2 Database Schema Overview

**User**
- `user_id`
- `name`
- `email`
- `daily_calorie_goal`
- `protein_goal`
- `carbs_goal`
- `fat_goal`
- `preferred_units`

**Food**
- `food_id`
- `name`
- `protein_per_unit`
- `carbs_per_unit`
- `fat_per_unit`
- `calories_per_unit`
- `unit` (g, oz, ml, etc.)

**Recipe**
- `recipe_id`
- `name`
- `user_id`
- Relation to Foods (quantity per food)

**Meal**
- `meal_id`
- `user_id`
- `meal_date`
- Relation to Foods or Recipes (with quantities)

**DailyLog**
- `log_id`
- `user_id`
- `date`
- Relation to Meals

---

## 4. Application Pages and UI Requirements

### 4.1 Dashboard
- **Purpose:** Quick overview of macro progress.
- **Features:** Progress visuals (% completed), shortcuts to Meal Logging.
- **UI:** Simple dark mode, orange highlights.

### 4.2 Meal Logging
- **Purpose:** Efficient input for logging foods and meals.
- **Features:** Food search, unit and quantity selection, quick add recipes.
- **UI:** User-friendly, fast input workflow.

### 4.3 Calendar History
- **Purpose:** View historical logged macros.
- **Features:** Interactive calendar, historical data viewing.
- **UI:** Minimalistic with easy navigation.

### 4.4 Foods & Recipes
- **Purpose:** Manage personal foods and recipes.
- **Features:** CRUD operations, search/filter.
- **UI:** Clearly structured, easy management.

### 4.5 Profile Settings
- **Purpose:** Customize goals and preferences.
- **Features:** Update goals, preferred units.
- **UI:** Straightforward, easy form interactions.

### 4.6 Reports & Data Export (Optional)
- **Purpose:** Data export and visual reports.
- **Features:** CSV/PDF export, visual charts.
- **UI:** Clear visuals, simple export controls.

---

## 5. Non-functional Requirements

- **Performance:** Basic load times appropriate for local storage usage.
- **Security:** Minimal requirements due to local storage implementation.
- **Responsiveness:** Compatible across desktop and mobile browsers.
- **Theming:** Dark mode theme with strategic orange highlights.

---

## 6. Final Notes

- **Data Seeding:** Hardcoded mock data for initial testing.
- **Testing:** Manual testing sufficient for initial MVP.
- **Integration:** No third-party APIs or external integrations initially.

