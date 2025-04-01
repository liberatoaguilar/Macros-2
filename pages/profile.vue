<template>
  <div>
    <h1 class="text-3xl font-bold text-primary mb-6">Profile Settings</h1>
    <p class="mb-4">Manage your profile, daily goals, and preferences.</p>

    <form @submit.prevent="handleUpdateProfile" class="bg-neutral-950 p-6 rounded-lg shadow space-y-4 max-w-md mx-auto">
        <h2 class="text-xl font-semibold mb-3 text-center">Your Profile & Goals</h2>

        <div>
            <label for="name" class="block text-sm font-medium text-neutral-300 mb-1">Name:</label>
            <input type="text" id="name" v-model="editableUser.name" required class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
            <label for="calories" class="block text-sm font-medium text-neutral-300 mb-1">Daily Calories (kcal):</label>
            <input type="number" id="calories" v-model.number="editableUser.daily_calorie_goal" required min="0" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
            <label for="protein" class="block text-sm font-medium text-neutral-300 mb-1">Protein Goal (g):</label>
            <input type="number" id="protein" v-model.number="editableUser.protein_goal" required min="0" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
            <label for="carbs" class="block text-sm font-medium text-neutral-300 mb-1">Carbs Goal (g):</label>
            <input type="number" id="carbs" v-model.number="editableUser.carbs_goal" required min="0" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <div>
            <label for="fat" class="block text-sm font-medium text-neutral-300 mb-1">Fat Goal (g):</label>
            <input type="number" id="fat" v-model.number="editableUser.fat_goal" required min="0" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>

        <!-- Add other preferences like units later -->

        <button type="submit" class="w-full bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
            Save Changes
        </button>

        <div v-if="updateSuccess" class="mt-4 p-3 bg-green-600 text-white rounded-md text-center">
            Profile updated successfully!
        </div>
    </form>

  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useUser } from '~/composables/useUser';

const { user, updateUserProfile } = useUser();

const editableUser = reactive({
    name: '',
    daily_calorie_goal: 0,
    protein_goal: 0,
    carbs_goal: 0,
    fat_goal: 0,
});

const updateSuccess = ref(false);

watch(user, (newUser) => {
  if (newUser) {
    editableUser.name = newUser.name;
    editableUser.daily_calorie_goal = newUser.daily_calorie_goal;
    editableUser.protein_goal = newUser.protein_goal;
    editableUser.carbs_goal = newUser.carbs_goal;
    editableUser.fat_goal = newUser.fat_goal;
  }
}, { immediate: true });

const handleUpdateProfile = () => {
    // Simple validation
    if (!editableUser.name) {
        alert('Name cannot be empty.');
        return;
    }
    if (editableUser.daily_calorie_goal < 0 || editableUser.protein_goal < 0 || editableUser.carbs_goal < 0 || editableUser.fat_goal < 0) {
        alert('Goals cannot be negative.');
        return;
    }

    updateUserProfile({
        name: editableUser.name,
        daily_calorie_goal: editableUser.daily_calorie_goal,
        protein_goal: editableUser.protein_goal,
        carbs_goal: editableUser.carbs_goal,
        fat_goal: editableUser.fat_goal,
    });

    updateSuccess.value = true;
    setTimeout(() => { updateSuccess.value = false; }, 3000);
};

</script>
