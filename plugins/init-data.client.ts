import { initData } from '@/lib/db'
export default defineNuxtPlugin(() => {
  if (process.client) {
    initData()
  }
})
