<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-neutral-950 p-6 rounded-lg shadow-xl w-full max-w-lg">
      <h2 class="text-2xl font-bold text-primary mb-4">Add New Food</h2>
      <form @submit.prevent="handleAddFood" class="space-y-3">
        <div>
          <label for="food-name" class="block text-sm font-medium text-neutral-300 mb-1">Food Name:</label>
          <input type="text" id="food-name" v-model="newFood.name" required class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>
        <div class="grid grid-cols-2 gap-4">
            <div>
                <label for="calories" class="block text-sm font-medium text-neutral-300 mb-1">Calories:</label>
                <input type="number" id="calories" v-model.number="newFood.calories_per_unit" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
            <div>
                <label for="unit" class="block text-sm font-medium text-neutral-300 mb-1">Unit:</label>
                <input type="text" id="unit" v-model="newFood.unit" required disabled class="w-full p-2 border border-neutral-600 bg-neutral-600 text-neutral-400 rounded-md">
                 <!-- Forcing 100g for simplicity, could be dropdown later -->
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
            <div>
                <label for="protein" class="block text-sm font-medium text-neutral-300 mb-1">Protein (g):</label>
                <input type="number" id="protein" v-model.number="newFood.protein_per_unit" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
            <div>
                <label for="carbs" class="block text-sm font-medium text-neutral-300 mb-1">Carbs (g):</label>
                <input type="number" id="carbs" v-model.number="newFood.carbs_per_unit" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
            <div>
                <label for="fat" class="block text-sm font-medium text-neutral-300 mb-1">Fat (g):</label>
                <input type="number" id="fat" v-model.number="newFood.fat_per_unit" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
        </div>

        <div class="flex justify-end space-x-3 pt-4">
            <button type="button" @click="closeModal" class="bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded transition-colors">
                Cancel
            </button>
            <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                Add Food
            </button>
        </div>
         <div v-if="addSuccessMessage" class="mt-4 p-3 bg-green-600 text-white rounded-md text-center">
            {{ addSuccessMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import { useFoods } from '~/composables/useFoods';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'foodAdded']);

const { addFood } = useFoods();
const addSuccessMessage = ref('');

const initialFoodState = () => ({
    name: '',
    protein_per_unit: 0,
    carbs_per_unit: 0,
    fat_per_unit: 0,
    calories_per_unit: 0,
    unit: '100g', // Default unit
});

const newFood = reactive(initialFoodState());

const closeModal = () => {
    emit('close');
    resetForm();
};

const resetForm = () => {
    Object.assign(newFood, initialFoodState());
    addSuccessMessage.value = '';
}

const handleAddFood = () => {
    // Basic validation (more could be added)
    if (!newFood.name) {
        alert('Food name is required.');
        return;
    }
    addFood({ ...newFood });
    emit('foodAdded');
    addSuccessMessage.value = `Food "${newFood.name}" added successfully!`;

    setTimeout(() => {
      closeModal();
  }, 1500);
};

// Reset form when modal opens
watch(() => props.show, (newVal) => {
    if (newVal) {
        resetForm();
    }
});

</script> 