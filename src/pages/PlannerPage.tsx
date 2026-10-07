import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { buildItinerary, saveItinerary } from '../lib/itinerary.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { ItineraryView } from '../components/ItineraryView.tsx'
import { PageHero } from '../components/PageHero.tsx'
import type { InterestOption, PartyOption, SavedItinerary, TimeOption } from '../types.ts'
import type { MessageKey } from '../i18n/messages.ts'

export function PlannerPage() {
  const { t } = useI18n()
  useDocumentTitle(t('docPlan'))
  const navigate = useNavigate()
  const [time, setTime] = useState<TimeOption | null>(null)
  const [party, setParty] = useState<PartyOption | null>(null)
  const [interest, setInterest] = useState<InterestOption | null>(null)
  const [plan, setPlan] = useState<SavedItinerary | null>(null)

  const times: { id: TimeOption; label: MessageKey; detail: MessageKey }[] = [
    { id: '1h', label: 'time1', detail: 'time1d' },
    { id: '2h', label: 'time2', detail: 'time2d' },
    { id: '4h', label: 'time4', detail: 'time4d' },
    { id: 'full', label: 'timeFull', detail: 'timeFulld' },
  ]
  const parties: { id: PartyOption; label: MessageKey; detail: MessageKey }[] = [
    { id: 'couple', label: 'partyCouple', detail: 'partyCoupled' },
    { id: 'family', label: 'partyFamily', detail: 'partyFamilyd' },
    { id: 'friends', label: 'partyFriends', detail: 'partyFriendsd' },
    { id: 'solo', label: 'partySolo', detail: 'partySolod' },
  ]
  const interests: { id: InterestOption; label: MessageKey }[] = [
    { id: 'big-cats', label: 'interestCats' },
    { id: 'elephants', label: 'interestElephants' },
    { id: 'primates', label: 'interestPrimates' },
    { id: 'birds', label: 'interestBirds' },
    { id: 'reptiles', label: 'interestReptiles' },
    { id: 'kids', label: 'interestKids' },
    { id: 'conservation', label: 'interestConservation' },
  ]

  function createPlan() {
    if (!time || !party || !interest) return
    const next = buildItinerary(time, party, interest)
    saveItinerary(next)
    setPlan(next)
  }

  return (
    <>
      <PageHero eyebrow={t('plannerEyebrow')} title={t('plannerTitle')} lede={t('plannerLede')} image="/images/giraffe.jpg" imageAlt={t('giraffeAlt')} />
      <section className="section">
        <div className="wrap">
          <fieldset className="choice-grid">
            <legend>{t('timeLegend')}</legend>
            {times.map((item) => (
              <button key={item.id} type="button" className={time === item.id ? 'is-on' : ''} aria-pressed={time === item.id} onClick={() => setTime(item.id)}>
                <strong>{t(item.label)}</strong>
                <span>{t(item.detail)}</span>
              </button>
            ))}
          </fieldset>
          <fieldset className="choice-grid choice-grid--4">
            <legend>{t('partyLegend')}</legend>
            {parties.map((item) => (
              <button key={item.id} type="button" className={party === item.id ? 'is-on' : ''} aria-pressed={party === item.id} onClick={() => setParty(item.id)}>
                <strong>{t(item.label)}</strong>
                <span>{t(item.detail)}</span>
              </button>
            ))}
          </fieldset>
          <fieldset className="choice-grid">
            <legend>{t('interestLegend')}</legend>
            {interests.map((item) => (
              <button key={item.id} type="button" className={interest === item.id ? 'is-on' : ''} aria-pressed={interest === item.id} onClick={() => setInterest(item.id)}>
                <strong>{t(item.label)}</strong>
              </button>
            ))}
          </fieldset>
          <button type="button" className="btn btn-primary" disabled={!time || !party || !interest} onClick={createPlan}>
            {t('createPlan')}
          </button>
          {plan ? (
            <div className="plan-result">
              <h2>{t('yourRoute')}</h2>
              <p>{plan.summary}</p>
              <ItineraryView stops={plan.stops} />
              <div className="hero__actions">
                <button type="button" className="btn btn-primary" onClick={() => navigate('/map?route=1')}>{t('showRoute')}</button>
                <Link className="btn btn-dark" to="/tickets">{t('buyTicketsLower')}</Link>
              </div>
            </div>
          ) : null}
        </div>
      </section>
    </>
  )
}
