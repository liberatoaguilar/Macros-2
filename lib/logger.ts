export interface LogEntry {
  id: string
  type: string
  data: any
  time: string
}

const LOG_KEY = 'appLogs'

export function getLogs(): LogEntry[] {
  const raw = localStorage.getItem(LOG_KEY)
  return raw ? JSON.parse(raw) : []
}

export function addLog(type: string, data: any) {
  const logs = getLogs()
  logs.push({
    id: 'l' + Date.now(),
    type,
    data,
    time: new Date().toISOString()
  })
  localStorage.setItem(LOG_KEY, JSON.stringify(logs))
}

export function clearLogs() {
  localStorage.removeItem(LOG_KEY)
}
