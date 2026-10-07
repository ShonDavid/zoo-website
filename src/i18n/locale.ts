export type Locale = 'he' | 'en'

const STORAGE_KEY = 'chai-kef.locale'

let current: Locale = 'he'

export function localeNow() {
  return current
}

export function setLocaleNow(locale: Locale) {
  current = locale
}

export function readStoredLocale(): Locale {
  try {
    return localStorage.getItem(STORAGE_KEY) === 'en' ? 'en' : 'he'
  } catch {
    return 'he'
  }
}

export function storeLocale(locale: Locale) {
  try {
    localStorage.setItem(STORAGE_KEY, locale)
  } catch {
    /* ignore private-mode storage failures */
  }
}
