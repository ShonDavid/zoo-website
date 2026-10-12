import { useEffect, useRef, useState } from 'react'
import { useI18n } from '../i18n/context.tsx'
import type { Locale } from '../i18n/locale.ts'
import { Icon } from './Icon.tsx'

const options: { id: Locale; label: string; short: string }[] = [
  { id: 'he', label: 'עברית', short: 'עב' },
  { id: 'en', label: 'English', short: 'EN' },
]

export function LanguageMenu() {
  const { t, locale, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const current = options.find((option) => option.id === locale) ?? options[0]

  useEffect(() => {
    if (!open) return
    const onPointer = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false)
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return
      setOpen(false)
      trigger.current?.focus()
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    root.current?.querySelector<HTMLButtonElement>('[aria-checked="true"]')?.focus()
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  function choose(next: Locale) {
    setOpen(false)
    trigger.current?.focus()
    if (next !== locale) setLocale(next)
  }

  return (
    <div className="lang-menu" ref={root}>
      <button
        ref={trigger}
        type="button"
        className="lang-menu__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={`${t('language')}: ${current.label}`}
        onClick={() => setOpen((value) => !value)}
      >
        <Icon name="language" size={20} />
        <span lang={current.id}>{current.short}</span>
      </button>
      {open ? (
        <div className="lang-menu__list" role="menu" aria-label={t('language')}>
          {options.map((option) => (
            <button
              key={option.id}
              type="button"
              role="menuitemradio"
              aria-checked={option.id === locale}
              lang={option.id}
              dir={option.id === 'he' ? 'rtl' : 'ltr'}
              className="lang-menu__item"
              onClick={() => choose(option.id)}
            >
              <span>{option.label}</span>
              {option.id === locale ? <Icon name="check" size={18} /> : null}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
