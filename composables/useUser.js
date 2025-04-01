import { ref } from 'vue';
import { mockUser } from '../data/mockData';

// For simplicity, we'll use a single global state for the user.
// In a real app, this might involve fetching from an API or local storage.
const user = ref(mockUser);

export function useUser() {
  // Function to update user profile data (goals, name, etc.)
  const updateUserProfile = (newProfileData) => {
    user.value = { ...user.value, ...newProfileData };
    // Persist changes (e.g., to local storage) if needed
    console.log('User profile updated:', user.value);
  };

  // Function to update user goals (example)
  const updateUserGoals = (newGoals) => {
    user.value = { ...user.value, ...newGoals };
    // Persist changes (e.g., to local storage) if needed
    console.log('User goals updated:', user.value);
  };

  return {
    user,
    updateUserGoals,
    updateUserProfile,
  };
} 