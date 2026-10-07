import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'
import { cx, statusSlug } from '../lib/format.ts'
import type { ConservationStatus } from '../types.ts'

type ButtonProps = {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'dark'
  to?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  className?: string
  disabled?: boolean
}

export function Button({ children, variant = 'primary', to, type = 'button', onClick, className, disabled }: ButtonProps) {
  const cls = cx('btn', `btn-${variant}`, className)
  if (to) return <Link to={to} className={cls}>{children}</Link>
  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export function Badge({ children, tone = 'neutral', status }: { children: ReactNode; tone?: string; status?: ConservationStatus }) {
  return <span className={cx('badge', status ? `badge-${statusSlug(status)}` : `badge-${tone}`)}>{children}</span>
}

export function SectionHeader({
  eyebrow,
  title,
  lede,
  action,
}: {
  eyebrow?: string
  title: string
  lede?: string
  action?: ReactNode
}) {
  return (
    <div className="section-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{title}</h2>
        {lede ? <p className="lede">{lede}</p> : null}
      </div>
      {action ? <div className="section-header__action">{action}</div> : null}
    </div>
  )
}

export function StatCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <article className="stat-card">
      <p className="stat-card__value">{value}</p>
      <h3>{label}</h3>
      <p>{detail}</p>
    </article>
  )
}

export function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`}>
            {item.to && index < items.length - 1 ? <Link to={item.to}>{item.label}</Link> : <span aria-current={index === items.length - 1 ? 'page' : undefined}>{item.label}</span>}
          </li>
        ))}
      </ol>
    </nav>
  )
}
