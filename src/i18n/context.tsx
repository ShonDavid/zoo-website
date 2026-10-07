import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { readStoredLocale, setLocaleNow, storeLocale, type Locale } from './locale.ts'
import {
  categoryLabel,
  continentLabel,
  eventTypeLabel,
  message,
  placeKindLabel,
  statusLabel,
  type MessageKey,
} from './messages.ts'
import type { AnimalCategory, ConservationStatus, Continent, EventType, LocationCategory } from '../types.ts'

setLocaleNow(readStoredLocale())

interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: MessageKey) => string
  categoryLabel: (value: AnimalCategory) => string
  statusLabel: (value: ConservationStatus) => string
  continentLabel: (value: Continent) => string
  eventTypeLabel: (value: EventType) => string
  placeKindLabel: (value: LocationCategory) => string
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => readStoredLocale())
  setLocaleNow(locale)

  useEffect(() => {
    document.documentElement.lang = locale
    document.documentElement.dir = locale === 'he' ? 'rtl' : 'ltr'
    storeLocale(locale)
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      setLocale,
      t: (key) => message(locale, key),
      categoryLabel: (item) => categoryLabel(locale, item),
      statusLabel: (item) => statusLabel(locale, item),
      continentLabel: (item) => continentLabel(locale, item),
      eventTypeLabel: (item) => eventTypeLabel(locale, item),
      placeKindLabel: (item) => placeKindLabel(locale, item),
    }),
    [locale],
  )

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}

export function useI18n() {
  const value = useContext(LocaleContext)
  if (!value) throw new Error('useI18n must be used within LocaleProvider')
  return value
}
