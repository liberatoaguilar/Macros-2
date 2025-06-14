<script setup lang="ts">
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import type { LogEntry } from '@/lib/logger'
import { getLogs, clearLogs } from '@/lib/logger'

const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const logs = ref<LogEntry[]>([])

function refresh() {
  logs.value = getLogs().reverse()
}

watch(() => props.modelValue, (val) => {
  if (val) {
    refresh()
  }
})

function close() {
  emit('update:modelValue', false)
}

function clearAll() {
  clearLogs()
  refresh()
}
</script>

<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div class="bg-background text-foreground max-w-md w-full p-4 rounded-lg shadow-lg">
      <h2 class="text-lg font-semibold mb-4">Logs</h2>
      <div class="max-h-60 overflow-y-auto mb-4 text-sm space-y-2">
        <div v-for="log in logs" :key="log.id" class="border-b pb-1">
          <div class="text-xs text-muted-foreground">{{ log.time }} - {{ log.type }}</div>
          <pre class="whitespace-pre-wrap">{{ JSON.stringify(log.data, null, 2) }}</pre>
        </div>
        <div v-if="!logs.length" class="text-center text-muted-foreground">No logs</div>
      </div>
      <div class="flex justify-end gap-2">
        <Button @click="clearAll">Clear</Button>
        <Button @click="close">Close</Button>
      </div>
    </div>
  </div>
</template>
