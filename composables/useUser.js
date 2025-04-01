import { ref, onMounted, watch } from 'vue';

const USER_STORAGE_KEY = 'macrosUser';

// Default user structure if nothing in localStorage
const defaultUser = {
  user_id: 'localUser',
  name: 'Macro Tracker User',
  email: '', // Email might not be needed/stored locally
  daily_calorie_goal: 2000,
  protein_goal: 150, // grams
  carbs_goal: 200, // grams
  fat_goal: 67, // grams
  preferred_units: 'g',
};

// Initialize user with null or default, will be populated on mount
const user = ref(null);

export function useUser() {
  // Load user data from localStorage on component mount (client-side)
  onMounted(() => {
    if (process.client) { // Ensure this runs only on the client
        const storedUser = localStorage.getItem(USER_STORAGE_KEY);
        if (storedUser) {
            try {
                user.value = JSON.parse(storedUser);
            } catch (e) {
                console.error('Error parsing user data from localStorage:', e);
                user.value = { ...defaultUser }; // Fallback to default if parsing fails
            }
        } else {
            user.value = { ...defaultUser }; // Use default if nothing stored
        }
    }
  });

  // Watch for changes in user data and save to localStorage
  watch(user, (newUserValue) => {
    if (process.client && newUserValue) { // Ensure this runs only on the client and user is not null
      localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(newUserValue));
      console.log('User data saved to localStorage');
    }
  }, { deep: true }); // Use deep watch to detect nested changes

  // Function to update user profile data (goals, name, etc.)
  const updateUserProfile = (newProfileData) => {
    if (user.value) {
      user.value = { ...user.value, ...newProfileData };
      // No need to explicitly save here, the watcher handles it
      console.log('User profile updated:', user.value);
    } else {
        console.warn('User data not loaded yet, cannot update profile.');
    }
  };

  // Function to update user goals (example) - can be merged into updateUserProfile
  // Keeping it separate for now if specific goal logic was intended
  const updateUserGoals = (newGoals) => {
     if (user.value) {
        user.value = { ...user.value, ...newGoals };
        // Watcher handles saving
        console.log('User goals updated:', user.value);
    } else {
        console.warn('User data not loaded yet, cannot update goals.');
    }
  };

  return {
    user, // Note: user might be null initially until mounted
    updateUserGoals,
    updateUserProfile,
  };
} 