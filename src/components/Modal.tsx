import { useEffect, useRef, type ReactNode } from 'react'
import { useFocusTrap, useScrollLock } from '../lib/a11y.ts'
import { Icon } from './Icon.tsx'

export function Modal({
  title,
  titleId,
  onClose,
  children,
  className = '',
}: {
  title: string
  titleId: string
  onClose: () => void
  children: ReactNode
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useFocusTrap(true, ref)
  useScrollLock(true)

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <div
        ref={ref}
        className={`modal ${className}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal__bar">
          <h2 id={titleId}>{title}</h2>
          <button type="button" className="icon-btn" onClick={onClose} aria-label="Close">
            <Icon name="close" />
          </button>
        </div>
        <div className="modal__body">{children}</div>
      </div>
    </div>
  )
}
