<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
    <div class="bg-neutral-950 p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 class="text-2xl font-bold text-primary mb-4">Quick Log Item</h2>
      <p class="text-sm text-neutral-400 mb-4">Enter the total macros for the item you consumed.</p>
      <form @submit.prevent="handleQuickLog" class="space-y-3">
        <div>
          <label for="quick-name" class="block text-sm font-medium text-neutral-300 mb-1">Name:</label>
          <input type="text" id="quick-name" v-model="logEntry.name" placeholder="e.g., Protein Bar" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
        </div>
        <div class="grid grid-cols-2 gap-4">
             <div>
                <label for="quick-calories" class="block text-sm font-medium text-neutral-300 mb-1">Calories:</label>
                <input type="number" id="quick-calories" v-model.number="logEntry.macros.calories" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
            <div>
                <label for="quick-quantity" class="block text-sm font-medium text-neutral-300 mb-1">Quantity:</label>
                 <input type="text" id="quick-quantity" v-model="logEntry.quantity_description" placeholder="e.g., 50g" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
        </div>
        <div class="grid grid-cols-3 gap-4">
            <div>
                <label for="quick-protein" class="block text-sm font-medium text-neutral-300 mb-1">Protein (g):</label>
                <input type="number" id="quick-protein" v-model.number="logEntry.macros.protein" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
            <div>
                <label for="quick-carbs" class="block text-sm font-medium text-neutral-300 mb-1">Carbs (g):</label>
                <input type="number" id="quick-carbs" v-model.number="logEntry.macros.carbs" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
            <div>
                <label for="quick-fat" class="block text-sm font-medium text-neutral-300 mb-1">Fat (g):</label>
                <input type="number" id="quick-fat" v-model.number="logEntry.macros.fat" required min="0" step="any" class="w-full p-2 border border-neutral-600 bg-neutral-700 text-neutral-100 rounded-md focus:ring-primary focus:border-primary">
            </div>
        </div>

        <div class="flex justify-between items-center pt-4">
            <button type="button" @click="saveAsFood" :disabled="!canSaveAsFood" class="bg-teal-600 hover:bg-teal-500 disabled:bg-neutral-600 disabled:cursor-not-allowed disabled:text-neutral-400 text-white font-bold py-2 px-3 rounded transition-colors">
                Save
            </button>
            <div class="space-x-3">
                <button type="button" @click="closeModal" class="bg-neutral-600 hover:bg-neutral-500 text-white font-bold py-2 px-4 rounded transition-colors">
                    Cancel
                </button>
                <button type="submit" class="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition-colors">
                    Log Item
                </button>
            </div>
        </div>
        <div v-if="logSuccessMessage" class="mt-4 p-3 bg-green-600 text-white rounded-md text-center">
            {{ logSuccessMessage }}
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, computed } from 'vue';
import { useDailyLog } from '~/composables/useDailyLog';
import { useFoods } from '~/composables/useFoods';

const props = defineProps({ show: Boolean });
const emit = defineEmits(['close', 'itemLogged']);

const { addItemToLog } = useDailyLog();
const { addFood } = useFoods();
const logSuccessMessage = ref('');

const initialLogState = () => ({
    type: 'quicklog', // Differentiate from regular food logs
    name: '',
    quantity_description: '', // User-input description like "1 scoop" or "50g"
    macros: {
        calories: null,
        protein: null,
        carbs: null,
        fat: null,
    }
});

const logEntry = reactive(initialLogState());

const closeModal = () => {
    emit('close');
    resetForm();
};

const resetForm = () => {
    Object.assign(logEntry, initialLogState());
    // Need to specifically reset nested objects
    logEntry.macros = initialLogState().macros;
    logSuccessMessage.value = '';
}

const canSaveAsFood = computed(() => {
    return logEntry.name &&
           logEntry.macros.calories !== null &&
           logEntry.macros.protein !== null &&
           logEntry.macros.carbs !== null &&
           logEntry.macros.fat !== null;
});

const handleQuickLog = () => {
    // Basic validation
    if (logEntry.macros.calories === null || logEntry.macros.calories < 0) {
        alert('Please enter a valid total calorie amount.');
        return;
    }
    // Ensure other macros are at least 0 if null
    if (logEntry.macros.protein === null) logEntry.macros.protein = 0;
    if (logEntry.macros.carbs === null) logEntry.macros.carbs = 0;
    if (logEntry.macros.fat === null) logEntry.macros.fat = 0;

    // Use default name if none provided
    const entryName = logEntry.name || `Quick Log (${new Date().toLocaleTimeString()})`;

    const itemToLog = {
        type: 'quicklog',
        name: entryName,
        quantity_description: logEntry.quantity_description,
        // Store the actual macro values entered by the user
        macros: { ...logEntry.macros }
    };

    addItemToLog(itemToLog);
    emit('itemLogged');
    logSuccessMessage.value = `"${entryName}" logged successfully!`;

    setTimeout(() => {
      closeModal();
    }, 1500);
};

const saveAsFood = () => {
    if (!canSaveAsFood.value) {
        alert('Please fill in the name and all macro fields to save as a new food.');
        return;
    }

    // Construct the food object (assuming values are per serving/item described)
    const newFoodData = {
        name: logEntry.name,
        protein_per_unit: logEntry.macros.protein,
        carbs_per_unit: logEntry.macros.carbs,
        fat_per_unit: logEntry.macros.fat,
        calories_per_unit: logEntry.macros.calories,
        // Unit needs careful consideration - how to represent the logged item?
        // Using the quantity description or a generic 'serving' might be options.
        // For now, let's default to 'serving' but this needs refinement.
        unit: logEntry.quantity_description || '1 serving' // Or maybe force user input?
    };

    addFood(newFoodData);
    alert(`Food "${logEntry.name}" saved successfully!`);
    // Keep the modal open so the user can still log the item if they wish
    // Or potentially close and log automatically?
};

// Reset form when modal opens
watch(() => props.show, (newVal) => {
    if (newVal) {
        resetForm();
    }
});

</script> 