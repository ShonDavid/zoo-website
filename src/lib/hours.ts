import { localeNow } from '../i18n/locale.ts'
import { formatTime } from './format.ts'

export interface HoursInfo {
  closed: boolean
  open: string | null
  close: string | null
  label: string
  note?: string
}

function at(date: Date, hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  const next = new Date(date)
  next.setHours(h || 0, m || 0, 0, 0)
  return next
}

function rangeLabel(open: string, close: string) {
  if (localeNow() === 'he') return `${open}–${close}`
  return `${formatTime(open)} – ${formatTime(close)}`
}

/** Sunday–Thursday and Saturday 09:00–18:00. Friday and holiday eves 09:00–15:00. */
export function getHours(date: Date): HoursInfo {
  const weekday = date.getDay()
  if (weekday === 5) {
    const note = localeNow() === 'he' ? 'שישי וערבי חג.' : 'Friday and holiday eves.'
    return { closed: false, open: '09:00', close: '15:00', label: rangeLabel('09:00', '15:00'), note }
  }
  return { closed: false, open: '09:00', close: '18:00', label: rangeLabel('09:00', '18:00') }
}

export function visitStatus(now = new Date()) {
  const hours = getHours(now)
  if (hours.closed || !hours.open || !hours.close) {
    return { state: 'closed' as const, message: localeNow() === 'he' ? 'הגן סגור היום' : 'Closed today', hours }
  }
  const openAt = at(now, hours.open)
  const closeAt = at(now, hours.close)
  if (now < openAt) {
    const message = localeNow() === 'he' ? `נפתח ב-${hours.open}` : `Opens at ${formatTime(hours.open)}`
    return { state: 'before' as const, message, hours }
  }
  if (now >= closeAt) {
    return { state: 'closed' as const, message: localeNow() === 'he' ? 'הגן נסגר להיום' : 'Closed for the day', hours }
  }
  const message = localeNow() === 'he' ? `פתוח היום עד ${hours.close}` : `Open today until ${formatTime(hours.close)}`
  return { state: 'open' as const, message, hours }
}

export const regularHours = [
  { daysHe: 'ראשון–חמישי', daysEn: 'Sunday – Thursday', hours: '09:00–18:00' },
  { daysHe: 'שישי וערבי חג', daysEn: 'Friday and holiday eves', hours: '09:00–15:00' },
  { daysHe: 'שבת וחג', daysEn: 'Saturday and holidays', hours: '09:00–18:00' },
]
