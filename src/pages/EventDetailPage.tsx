import { Link, useParams } from 'react-router-dom'
import { getAnimalById } from '../data/animals.ts'
import { getEvent } from '../data/events.ts'
import { getLocation } from '../data/locations.ts'
import { localizeAnimal, localizeEvent, localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatDuration, formatTime } from '../lib/format.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { Breadcrumb, Badge } from '../components/ui.tsx'
import { NotFoundPage } from './NotFoundPage.tsx'

export function EventDetailPage() {
  const { slug = '' } = useParams()
  const { t, locale, eventTypeLabel } = useI18n()
  const raw = getEvent(slug)
  const event = raw ? localizeEvent(raw, locale) : undefined
  useDocumentTitle(event?.title ?? t('docEvent'))
  if (!raw || !event) return <NotFoundPage />
  const place = getLocation(event.locationId)
  const location = place ? localizeLocation(place, locale) : undefined
  const animalRaw = event.animalId ? getAnimalById(event.animalId) : undefined
  const animal = animalRaw ? localizeAnimal(animalRaw, locale) : undefined

  return (
    <article className="section">
      <div className="wrap detail-layout">
        <div>
          <Breadcrumb items={[{ label: t('home'), to: '/' }, { label: t('navEvents'), to: '/events' }, { label: event.title }]} />
          <p className="eyebrow">{raw.days ? t('saturdayOnly') : t('daily')}</p>
          <h1>{event.title}</h1>
          <div className="event-meta">
            <Badge tone="ember">{eventTypeLabel(raw.type)}</Badge>
            <span>{formatTime(raw.time)}</span>
            <span>{formatDuration(raw.durationMinutes)}</span>
            {location ? <span>{location.name}</span> : null}
          </div>
          {event.description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <div className="hero__actions">
            {location ? <Link className="btn btn-primary" to={`/map?place=${location.id}`}>{t('viewOnMap')}</Link> : null}
            {animal ? <Link className="btn btn-dark" to={`/animals/${animal.slug}`}>{t('meetThe')} {animal.name}</Link> : null}
          </div>
        </div>
        {location?.image ? <img className="detail-photo" src={location.image} alt={location.imageAlt ?? ''} /> : null}
      </div>
    </article>
  )
}
