import { localizeTicket, ticketsIn } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { lineTotal } from '../data/tickets.ts'
import { formatMoney } from '../lib/format.ts'
import type { TicketLine, TicketType } from '../types.ts'
import { Icon } from './Icon.tsx'

export function TicketSelector({
  types,
  quantities,
  onChange,
}: {
  types: TicketType[]
  quantities: Record<string, number>
  onChange: (id: TicketType['id'], quantity: number) => void
}) {
  const { t, locale } = useI18n()
  return (
    <div className="ticket-list">
      {types.map((ticket) => {
        const shown = localizeTicket(ticket, locale)
        const quantity = quantities[ticket.id] ?? 0
        return (
          <div key={ticket.id} className="ticket-row">
            <div>
              <h3>{shown.name}</h3>
              <p>{shown.description}</p>
              <p className="ticket-row__price">{formatMoney(ticket.price)}</p>
            </div>
            <div className="qty" role="group" aria-label={`${shown.name} ${t('qtyOf')}`}>
              <button type="button" onClick={() => onChange(ticket.id, Math.max(0, quantity - 1))} aria-label={`${t('removeOne')} ${shown.name}`} disabled={quantity === 0}>
                <Icon name="minus" size={18} />
              </button>
              <span aria-live="polite">{quantity}</span>
              <button type="button" onClick={() => onChange(ticket.id, Math.min(8, quantity + 1))} aria-label={`${t('addOne')} ${shown.name}`} disabled={quantity >= 8}>
                <Icon name="plus" size={18} />
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export function TicketSummary({ lines, visitDate }: { lines: TicketLine[]; visitDate?: string }) {
  const { t, locale } = useI18n()
  const names = Object.fromEntries(ticketsIn(locale).map((ticket) => [ticket.id, ticket.name]))
  const total = lines.reduce((sum, line) => sum + lineTotal(line), 0)
  return (
    <aside className="ticket-summary" aria-label={t('orderSummary')}>
      <h2>{t('yourTickets')}</h2>
      {visitDate ? <p className="meta">{visitDate}</p> : null}
      {lines.length === 0 ? <p>{t('noTickets')}</p> : null}
      <ul>
        {lines.map((line) => (
          <li key={line.typeId}>
            <span>{line.quantity} × {names[line.typeId]}</span>
            <span>{formatMoney(lineTotal(line))}</span>
          </li>
        ))}
      </ul>
      <p className="ticket-summary__total">
        <span>{t('total')}</span>
        <strong>{formatMoney(total)}</strong>
      </p>
      <p className="fine">{t('ticketFine')}</p>
    </aside>
  )
}
