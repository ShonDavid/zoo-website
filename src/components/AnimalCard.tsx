import { Link } from 'react-router-dom'
import { localizeAnimal } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import type { Animal } from '../types.ts'
import { Badge } from './ui.tsx'

export function AnimalCard({ animal }: { animal: Animal }) {
  const { t, locale, categoryLabel, statusLabel } = useI18n()
  const shown = localizeAnimal(animal, locale)
  const image = shown.images[0]
  return (
    <article className="animal-card">
      <Link to={`/animals/${shown.slug}`} className="animal-card__media">
        {image ? <img src={image.src} alt={image.alt} loading="lazy" /> : null}
        <Badge status={shown.conservationStatus}>{statusLabel(shown.conservationStatus)}</Badge>
      </Link>
      <div className="animal-card__body">
        <p className="meta">{categoryLabel(shown.category)}</p>
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
