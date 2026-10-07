import { Link } from 'react-router-dom'
import { localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import type { ZooLocation } from '../types.ts'

export function LocationCard({ location }: { location: ZooLocation }) {
  const { t, locale, placeKindLabel } = useI18n()
  const shown = localizeLocation(location, locale)
  return (
    <article className="location-card">
      {shown.image ? (
        <img src={shown.image} alt={shown.imageAlt ?? ''} loading="lazy" />
      ) : (
        <div className={`location-card__fallback is-${shown.categories[0] ?? 'facilities'}`} aria-hidden="true" />
      )}
      <div>
        <p className="meta">{shown.foodType ?? placeKindLabel(shown.categories[0] ?? 'facilities')}</p>
        <h3>{shown.name}</h3>
        <p>{shown.description}</p>
        {shown.hours ? <p className="meta">{shown.hours}</p> : null}
        <Link className="text-link" to={`/map?place=${shown.id}`}>{t('showOnMap')}</Link>
      </div>
    </article>
  )
}
