import { addLog, getLogs, clearLogs } from '@/lib/logger'

export default defineNuxtPlugin(() => {
  if (!process.client) return

  const wrap = (type: string, fn: (...args: any[]) => void) => {
    return (...args: any[]) => {
      addLog(type, args)
      fn(...args)
    }
  }

  console.log = wrap('log', console.log.bind(console))
  console.warn = wrap('warn', console.warn.bind(console))
  console.error = wrap('error', console.error.bind(console))

  return {
    provide: {
      logger: {
        log: addLog,
        getLogs,
        clearLogs,
      },
    },
  }
})
