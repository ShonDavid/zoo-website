import { Link } from 'react-router-dom'
import { getLocation } from '../data/locations.ts'
import { playProfile } from '../data/play.ts'
import { localizeAnimal, localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import type { Animal } from '../types.ts'
import { Icon } from './Icon.tsx'
import { Badge } from './ui.tsx'

export function AnimalCard({ animal }: { animal: Animal }) {
  const { t, locale, categoryLabel, statusLabel } = useI18n()
  const shown = localizeAnimal(animal, locale)
  const image = shown.images[0]
  const mark = playProfile(animal.id)?.emoji ?? '🐾'
  const place = getLocation(animal.locationId)
  const where = place ? localizeLocation(place, locale).name : categoryLabel(shown.category)
  return (
    <article className="animal-card">
      <Link to={`/animals/${shown.slug}`} className="animal-card__media">
        {image ? <img src={image.src} alt={image.alt} loading="lazy" /> : <span className="animal-card__mark" aria-hidden="true">{mark}</span>}
        <Badge status={shown.conservationStatus}>{statusLabel(shown.conservationStatus)}</Badge>
      </Link>
      <div className="animal-card__body">
        <p className="meta animal-card__where">
          <Icon name="pin" size={15} />
          {where}
        </p>
        <h3>
          <Link to={`/animals/${shown.slug}`}>{shown.name}</Link>
        </h3>
        <p className="scientific">{shown.scientificName}</p>
        <p className="clamp">{shown.summary}</p>
        <Link className="text-link" to={`/animals/${shown.slug}`}>{t('learnMore')}</Link>
      </div>
    </article>
  )
}
