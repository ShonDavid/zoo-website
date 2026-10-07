import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

export function useFocusTrap(active: boolean, ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!active) return
    const root = ref.current
    if (!root) return

    const items = () =>
      [...root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((el) => el.offsetParent !== null || el === document.activeElement)

    const initial = items()
    initial[0]?.focus()

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return
      const list = items()
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (!first || !last) return
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    root.addEventListener('keydown', onKey)
    return () => root.removeEventListener('keydown', onKey)
  }, [active, ref])
}

export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    const previousBody = document.body.style.overflow
    const previousHtml = document.documentElement.style.overflow
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousBody
      document.documentElement.style.overflow = previousHtml
    }
  }, [active])
}
