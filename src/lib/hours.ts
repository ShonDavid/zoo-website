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

/** Ticket desks stop selling this long before the gates close. */
const LAST_ENTRY_MINUTES = 120

export type VisitState = 'open' | 'last-entry' | 'before' | 'closed'

export interface VisitStatus {
  state: VisitState
  /** Short state word for the status pill, e.g. "פתוח עכשיו". */
  label: string
  /** What happens next, e.g. "עד 18:00" or "נפתח מחר ב-09:00". */
  detail: string
  /** Full sentence for headings. */
  message: string
  hours: HoursInfo
}

function nextOpening(now: Date) {
  for (let offset = 1; offset <= 7; offset += 1) {
    const day = new Date(now)
    day.setDate(day.getDate() + offset)
    const hours = getHours(day)
    if (!hours.closed && hours.open) return { offset, open: hours.open }
  }
  return undefined
}

function opensLabel(now: Date) {
  const he = localeNow() === 'he'
  const next = nextOpening(now)
  if (!next) return he ? 'בדקו את השעות לפני שמגיעים' : 'Check the hours before you come'
  if (next.offset === 1) return he ? `נפתח מחר ב-${next.open}` : `Opens tomorrow at ${formatTime(next.open)}`
  return he ? `נפתח שוב ב-${next.open}` : `Opens again at ${formatTime(next.open)}`
}

export function visitStatus(now = new Date()): VisitStatus {
  const he = localeNow() === 'he'
  const hours = getHours(now)
  const closedNow = he ? 'סגור עכשיו' : 'Closed now'
  if (hours.closed || !hours.open || !hours.close) {
    const detail = opensLabel(now)
    return { state: 'closed', label: he ? 'סגור היום' : 'Closed today', detail, message: he ? 'הגן סגור היום' : 'Closed today', hours }
  }
  const openAt = at(now, hours.open)
  const closeAt = at(now, hours.close)
  const lastEntryAt = new Date(closeAt.getTime() - LAST_ENTRY_MINUTES * 60_000)
  if (now < openAt) {
    const detail = he ? `נפתח היום ב-${hours.open}` : `Opens today at ${formatTime(hours.open)}`
    return { state: 'before', label: closedNow, detail, message: detail, hours }
  }
  if (now >= closeAt) {
    return { state: 'closed', label: closedNow, detail: opensLabel(now), message: he ? 'הגן נסגר להיום' : 'Closed for the day', hours }
  }
  if (now >= lastEntryAt) {
    const label = he ? 'הכניסה להיום נסגרה' : 'Entry closed for today'
    return { state: 'last-entry', label, detail: opensLabel(now), message: label, hours }
  }
  const lastEntry = `${String(lastEntryAt.getHours()).padStart(2, '0')}:${String(lastEntryAt.getMinutes()).padStart(2, '0')}`
  const detail = he ? `עד ${hours.close} · כניסה אחרונה ${lastEntry}` : `Until ${formatTime(hours.close)} · last entry ${formatTime(lastEntry)}`
  return { state: 'open', label: he ? 'פתוח עכשיו' : 'Open now', detail, message: he ? `פתוח היום עד ${hours.close}` : `Open today until ${formatTime(hours.close)}`, hours }
}

export const regularHours = [
  { daysHe: 'ראשון–חמישי', daysEn: 'Sunday – Thursday', hours: '09:00–18:00' },
  { daysHe: 'שישי וערבי חג', daysEn: 'Friday and holiday eves', hours: '09:00–15:00' },
  { daysHe: 'שבת וחג', daysEn: 'Saturday and holidays', hours: '09:00–18:00' },
]
