import { useEffect, useState } from 'react'

/** Current time, refreshed at the start of every minute. */
export function useNow() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let timer = 0
    const schedule = () => {
      timer = window.setTimeout(() => {
        setNow(new Date())
        schedule()
      }, 60_000 - (Date.now() % 60_000) + 50)
    }
    schedule()
    return () => window.clearTimeout(timer)
  }, [])
  return now
}
