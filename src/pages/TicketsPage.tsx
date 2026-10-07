import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getTicketType, orderTotal, ticketTypes } from '../data/tickets.ts'
import { localizeTicket } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatLongDate, formatMoney, toISODate } from '../lib/format.ts'
import { getHours } from '../lib/hours.ts'
import { createOrderId, saveOrder } from '../lib/orders.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { TicketSelector, TicketSummary } from '../components/TicketWidgets.tsx'
import type { MessageKey } from '../i18n/messages.ts'
import type { TicketTypeId } from '../types.ts'

export function TicketsPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t('docTickets'))
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [date, setDate] = useState(toISODate(new Date()))
  const [quantities, setQuantities] = useState<Record<string, number>>({ adult: 2 })
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [method, setMethod] = useState<'card' | 'arrival'>('card')
  const [cardName, setCardName] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')

  const hours = getHours(parseDate(date))
  const lines = useMemo(
    () =>
      ticketTypes
        .map((ticket) => ({
          typeId: ticket.id,
          quantity: quantities[ticket.id] ?? 0,
          unitPrice: ticket.price,
        }))
        .filter((line) => line.quantity > 0),
    [quantities],
  )
  const total = orderTotal(lines)

  function setQuantity(id: TicketTypeId, quantity: number) {
    setQuantities((current) => ({ ...current, [id]: quantity }))
  }

  function validateStep() {
    if (step === 0) {
      if (hours.closed) return t('errClosed')
      if (lines.length === 0) return t('errTickets')
      return ''
    }
    if (step === 2) {
      if (name.trim().length < 2) return t('errName')
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return t('errEmail')
      return ''
    }
    if (step === 3) {
      if (!agreed) return t('errAgree')
      if (method === 'arrival') return ''
      const digits = cardNumber.replace(/\s/g, '')
      if (cardName.trim().length < 2) return t('errCardName')
      if (!/^\d{16}$/.test(digits)) return t('errCard')
      if (!/^\d{2}\/\d{2}$/.test(expiry)) return t('errExpiry')
      const [month, year] = expiry.split('/').map(Number)
      const exp = new Date(2000 + (year || 0), (month || 1) - 1, 1)
      if (!month || month > 12 || exp < new Date(new Date().getFullYear(), new Date().getMonth(), 1)) return t('errExpiryFuture')
      if (!/^\d{3,4}$/.test(cvc)) return t('errCvc')
      return ''
    }
    return ''
  }

  function next() {
    const message = validateStep()
    setError(message)
    if (message) return
    if (step < 3) {
      setStep((value) => value + 1)
      return
    }
    const digits = cardNumber.replace(/\s/g, '')
    const order = {
      id: createOrderId(),
      createdAt: new Date().toISOString(),
      visitDate: date,
      tickets: lines,
      contact: { name: name.trim(), email: email.trim(), phone: phone.trim() },
      paymentMethod: method,
      cardLast4: method === 'card' ? digits.slice(-4) : undefined,
      total,
    }
    saveOrder(order)
    navigate(`/tickets/confirmation/${order.id}`)
  }

  const steps: MessageKey[] = ['stepTickets', 'stepReview', 'stepDetails', 'stepPayment']

  return (
    <section className="section tickets-page">
      <div className="wrap">
        <p className="eyebrow">{t('ticketsEyebrow')}</p>
        <h1>{t('docTickets')}</h1>
        <ol className="stepper" aria-label={t('checkoutSteps')}>
          {steps.map((label, index) => (
            <li key={label} className={index === step ? 'is-current' : index < step ? 'is-done' : ''} aria-current={index === step ? 'step' : undefined}>
              <span>{index + 1}</span>
              {t(label)}
            </li>
          ))}
        </ol>
        <div className="ticket-layout">
          <div className="ticket-main">
            {step === 0 ? (
              <>
                <div className="field">
                  <label htmlFor="visit-date">{t('visitDate')}</label>
                  <input id="visit-date" type="date" value={date} min={toISODate(new Date())} max={toISODate(addDays(new Date(), 120))} onChange={(event) => setDate(event.target.value)} />
                </div>
                <p className={hours.closed ? 'form-error' : 'meta'} role="status">
                  {hours.closed ? t('closedDate') : `${formatLongDate(date)} · ${hours.label}`}
                </p>
                <TicketSelector types={ticketTypes} quantities={quantities} onChange={setQuantity} />
              </>
            ) : null}
            {step === 1 ? (
              <div className="review-block">
                <h2>{t('reviewTitle')}</h2>
                <p>{formatLongDate(date)}</p>
                <ul>
                  {lines.map((line) => {
                    const ticket = getTicketType(line.typeId)
                    const shown = ticket ? localizeTicket(ticket, locale) : undefined
                    return (
                      <li key={line.typeId}>
                        {line.quantity} × {shown?.name} · {formatMoney(line.unitPrice * line.quantity)}
                      </li>
                    )
                  })}
                </ul>
                <p>{t('reviewNote')}</p>
              </div>
            ) : null}
            {step === 2 ? (
              <div className="form-grid">
                <div className="field">
                  <label htmlFor="visitor-name">{t('fullName')}</label>
                  <input id="visitor-name" value={name} onChange={(event) => setName(event.target.value)} autoComplete="name" required />
                </div>
                <div className="field">
                  <label htmlFor="visitor-email">{t('emailLabel')}</label>
                  <input id="visitor-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" required />
                </div>
                <div className="field">
                  <label htmlFor="visitor-phone">{t('phoneLabel')} <span className="optional">{t('optional')}</span></label>
                  <input id="visitor-phone" type="tel" value={phone} onChange={(event) => setPhone(event.target.value)} autoComplete="tel" />
                </div>
              </div>
            ) : null}
            {step === 3 ? (
              <div className="form-grid">
                <fieldset className="pay-methods">
                  <legend>{t('payMethod')}</legend>
                  <label><input type="radio" name="pay" checked={method === 'card'} onChange={() => setMethod('card')} /> {t('payCard')}</label>
                  <label><input type="radio" name="pay" checked={method === 'arrival'} onChange={() => setMethod('arrival')} /> {t('payGate')}</label>
                </fieldset>
                {method === 'card' ? (
                  <>
                    <div className="field">
                      <label htmlFor="card-name">{t('cardName')}</label>
                      <input id="card-name" value={cardName} onChange={(event) => setCardName(event.target.value)} autoComplete="cc-name" />
                    </div>
                    <div className="field">
                      <label htmlFor="card-number">{t('cardNumber')}</label>
                      <input id="card-number" inputMode="numeric" autoComplete="cc-number" placeholder={t('cardDigits')} value={cardNumber} onChange={(event) => setCardNumber(event.target.value)} />
                    </div>
                    <div className="split">
                      <div className="field">
                        <label htmlFor="card-expiry">{t('expiry')}</label>
                        <input id="card-expiry" placeholder="MM/YY" autoComplete="cc-exp" value={expiry} onChange={(event) => setExpiry(event.target.value)} />
                      </div>
                      <div className="field">
                        <label htmlFor="card-cvc">CVC</label>
                        <input id="card-cvc" inputMode="numeric" autoComplete="cc-csc" value={cvc} onChange={(event) => setCvc(event.target.value)} />
                      </div>
                    </div>
                  </>
                ) : (
                  <p>{t('payLater')}</p>
                )}
                <label className="check">
                  <input type="checkbox" checked={agreed} onChange={(event) => setAgreed(event.target.checked)} />
                  {t('demoCheck')}
                </label>
              </div>
            ) : null}
            {error ? <p className="form-error" role="alert">{error}</p> : null}
            <div className="ticket-nav">
              {step > 0 ? (
                <button type="button" className="btn btn-dark" onClick={() => { setError(''); setStep((value) => value - 1) }}>
                  {t('back')}
                </button>
              ) : null}
              <button type="button" className="btn btn-primary" onClick={next}>
                {step === 3 ? t('confirm') : t('continue')}
              </button>
            </div>
          </div>
          <TicketSummary lines={lines} visitDate={formatLongDate(date)} />
        </div>
      </div>
    </section>
  )
}

function parseDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y || 1970, (m || 1) - 1, d || 1)
}

function addDays(date: Date, days: number) {
  const next = new Date(date)
  next.setDate(next.getDate() + days)
  return next
}
