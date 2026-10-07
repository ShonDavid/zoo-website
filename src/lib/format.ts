import { localeNow } from '../i18n/locale.ts'

export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(' ')
}

export function formatMoney(cents: number) {
  const locale = localeNow() === 'he' ? 'he-IL' : 'en-IL'
  return new Intl.NumberFormat(locale, { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(cents / 100)
}

export function toISODate(date: Date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function parseISODate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y || 1970, (m || 1) - 1, d || 1)
}

export function formatLongDate(isoOrDate: string | Date) {
  const date = typeof isoOrDate === 'string' ? parseISODate(isoOrDate) : isoOrDate
  const locale = localeNow() === 'he' ? 'he-IL' : 'en-GB'
  return new Intl.DateTimeFormat(locale, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date)
}

export function formatShortDate(iso: string) {
  const locale = localeNow() === 'he' ? 'he-IL' : 'en-GB'
  return new Intl.DateTimeFormat(locale, { month: 'long', day: 'numeric', year: 'numeric' }).format(parseISODate(iso))
}

export function formatTime(hhmm: string) {
  const [hRaw, mRaw] = hhmm.split(':')
  const h = Number(hRaw)
  const m = Number(mRaw)
  if (Number.isNaN(h) || Number.isNaN(m)) return hhmm
  if (localeNow() === 'he') return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
  const suffix = h >= 12 ? 'PM' : 'AM'
  const hr = h % 12 || 12
  return `${hr}:${String(m).padStart(2, '0')} ${suffix}`
}

export function formatDuration(minutes: number) {
  const he = localeNow() === 'he'
  if (minutes < 60) return he ? `${minutes} דק׳` : `${minutes} min`
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  if (he) return rest ? `${hours} שע׳ ${rest} דק׳` : `${hours} שע׳`
  return rest ? `${hours} hr ${rest} min` : `${hours} hr`
}

export function timeToMinutes(hhmm: string) {
  const [h, m] = hhmm.split(':').map(Number)
  return (h || 0) * 60 + (m || 0)
}

export function minutesToTime(total: number) {
  const clamped = ((total % (24 * 60)) + 24 * 60) % (24 * 60)
  const h = Math.floor(clamped / 60)
  const m = clamped % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function statusSlug(status: string) {
  return status.toLowerCase().replace(/\s+/g, '-')
}
