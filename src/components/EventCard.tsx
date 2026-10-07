import { Link } from 'react-router-dom'
import { getLocation } from '../data/locations.ts'
import { localizeEvent, localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatDuration, formatTime } from '../lib/format.ts'
import type { ZooEvent } from '../types.ts'
import { Badge } from './ui.tsx'

export function EventCard({ event, highlighted = false }: { event: ZooEvent; highlighted?: boolean }) {
  const { t, locale, eventTypeLabel } = useI18n()
  const shown = localizeEvent(event, locale)
  const raw = getLocation(event.locationId)
  const location = raw ? localizeLocation(raw, locale) : undefined
  return (
    <article className={`event-card ${highlighted ? 'is-next' : ''}`}>
      <div className="event-card__time">
        <time dateTime={event.time}>{formatTime(event.time)}</time>
        <span>{formatDuration(event.durationMinutes)}</span>
      </div>
      <div className="event-card__body">
        <div className="event-card__tags">
          <Badge tone="ember">{eventTypeLabel(event.type)}</Badge>
          {highlighted ? <Badge tone="forest">{t('upNextBadge')}</Badge> : null}
        </div>
        <h3>
          <Link to={`/events/${event.slug}`}>{shown.title}</Link>
        </h3>
        <p>{shown.summary}</p>
        <p className="meta">{location?.name}</p>
        <div className="event-card__actions">
          <Link className="text-link" to={`/events/${event.slug}`}>{t('eventDetails')}</Link>
          <Link className="text-link" to={`/map?place=${event.locationId}`}>{t('viewOnMap')}</Link>
        </div>
      </div>
    </article>
  )
}
