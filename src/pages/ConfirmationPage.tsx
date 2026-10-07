import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toDataURL } from 'qrcode'
import { getTicketType } from '../data/tickets.ts'
import { localizeTicket } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatLongDate, formatMoney } from '../lib/format.ts'
import { getOrder } from '../lib/orders.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { NotFoundPage } from './NotFoundPage.tsx'

export function ConfirmationPage() {
  const { orderId = '' } = useParams()
  const { t, locale } = useI18n()
  const order = getOrder(orderId)
  useDocumentTitle(order ? `${t('docOrder')} ${order.id}` : t('docTicket'))
  const [qr, setQr] = useState('')

  useEffect(() => {
    const current = getOrder(orderId)
    if (!current) return
    let cancel = false
    const payload = `CHAIKEF|${current.id}|${current.visitDate}|${current.total}`
    toDataURL(payload, { margin: 1, width: 240, color: { dark: '#10241e', light: '#fffdf8' } })
      .then((url: string) => {
        if (!cancel) setQr(url)
      })
      .catch(() => {
        if (!cancel) setQr('')
      })
    return () => {
      cancel = true
    }
  }, [orderId])

  if (!order) return <NotFoundPage />

  return (
    <section className="section">
      <div className="wrap confirm">
        <p className="eyebrow">{t('youreSet')}</p>
        <h1>{t('confirmed')}</h1>
        <p>{t('confirmCopy')}</p>
        <article className="ticket-pass">
          <div>
            <p className="meta">{t('orderNumber')}</p>
            <p className="order-id">{order.id}</p>
            <p className="meta">{t('visitDateLabel')}</p>
            <p>{formatLongDate(order.visitDate)}</p>
            <ul>
              {order.tickets.map((line) => {
                const ticket = getTicketType(line.typeId)
                const shown = ticket ? localizeTicket(ticket, locale) : undefined
                return <li key={line.typeId}>{line.quantity} × {shown?.name}</li>
              })}
            </ul>
            <p className="ticket-summary__total">
              <span>{t('total')}</span>
              <strong>{formatMoney(order.total)}</strong>
            </p>
            <p className="fine">
              {order.paymentMethod === 'card' ? `${t('cardEnding')} ${order.cardLast4}. ${t('noCharge')}` : t('payOnArrival')}
            </p>
            <p className="fine">{t('heldFor')} {order.contact.name} · {order.contact.email}</p>
          </div>
          <div className="ticket-pass__qr">
            {qr ? <img src={qr} alt={`${t('qrAlt')} ${order.id}`} width={220} height={220} /> : <div className="qr-skeleton" aria-hidden="true" />}
            <p>{t('scanGate')}</p>
          </div>
        </article>
        <div className="hero__actions no-print">
          <button type="button" className="btn btn-dark" onClick={() => window.print()}>{t('printTickets')}</button>
          <Link className="btn btn-primary" to="/map">{t('openMap')}</Link>
        </div>
      </div>
    </section>
  )
}
