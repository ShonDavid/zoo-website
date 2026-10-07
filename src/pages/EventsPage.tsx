import { events, eventsOn } from '../data/events.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatLongDate } from '../lib/format.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { EventCard } from '../components/EventCard.tsx'
import { PageHero } from '../components/PageHero.tsx'

export function EventsPage() {
  const { t } = useI18n()
  useDocumentTitle(t('docEvents'))
  const today = new Date()
  const todays = eventsOn(today)
  const saturdayOnly = events.filter((event) => event.days && !event.days.includes(today.getDay()))

  return (
    <>
      <PageHero eyebrow={t('eventsEyebrow')} title={t('eventsTitle')} lede={t('eventsLede')} image="/images/penguin.jpg" imageAlt={t('penguinAlt')} />
      <section className="section">
        <div className="wrap">
          <h2>{t('today')} · {formatLongDate(today)}</h2>
          <div className="event-list">
            {todays.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          {saturdayOnly.length > 0 ? (
            <>
              <h2 className="section-gap">{t('saturdayOnly')}</h2>
              <div className="event-list">
                {saturdayOnly.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </>
          ) : null}
        </div>
      </section>
    </>
  )
}
