import { Link, useParams } from 'react-router-dom'
import { getAnimal, relatedAnimals } from '../data/animals.ts'
import { getLocation } from '../data/locations.ts'
import { localizeAnimal, localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { AnimalCard } from '../components/AnimalCard.tsx'
import { Breadcrumb, Badge } from '../components/ui.tsx'
import { ImageGallery } from '../components/ImageGallery.tsx'
import { NotFoundPage } from './NotFoundPage.tsx'

export function AnimalDetailPage() {
  const { slug = '' } = useParams()
  const { t, locale, categoryLabel, statusLabel, continentLabel } = useI18n()
  const raw = getAnimal(slug)
  const animal = raw ? localizeAnimal(raw, locale) : undefined
  useDocumentTitle(animal?.name ?? t('docAnimal'))
  if (!raw || !animal) return <NotFoundPage />
  const place = getLocation(animal.locationId)
  const location = place ? localizeLocation(place, locale) : undefined
  const related = relatedAnimals(raw)
  const facts = [
    [t('habitat'), animal.habitat],
    [t('diet'), animal.diet],
    [t('lifespan'), animal.lifespan],
    [t('size'), animal.size],
    [t('weight'), animal.weight],
    [t('range'), animal.distribution],
  ]

  return (
    <article>
      <header className="detail-hero">
        <img src={animal.images[0]?.src} alt={animal.images[0]?.alt ?? ''} />
        <div className="detail-hero__shade" />
        <div className="wrap detail-hero__content">
          <Breadcrumb items={[{ label: t('home'), to: '/' }, { label: t('navAnimals'), to: '/animals' }, { label: animal.name }]} />
          <p className="eyebrow">{categoryLabel(animal.category)}</p>
          <h1>{animal.name}</h1>
          <p className="scientific">{animal.scientificName}</p>
          <Badge status={animal.conservationStatus}>{statusLabel(animal.conservationStatus)}</Badge>
        </div>
      </header>
      <section className="section">
        <div className="wrap detail-layout">
          <div className="prose">
            {animal.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <h2>{t('inField')}</h2>
            <ul className="fact-list">
              {animal.facts.map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
            </ul>
            <ImageGallery images={animal.images} name={animal.name} />
          </div>
          <aside className="fact-panel">
            <h2>{t('atGlance')}</h2>
            <dl>
              {facts.map(([label, value]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ))}
              <div>
                <dt>{t('seenIn')}</dt>
                <dd>{animal.continents.map((item) => continentLabel(item)).join(', ')}</dd>
              </div>
            </dl>
            {location ? (
              <div className="where-card">
                <p className="eyebrow">{t('whereFind')}</p>
                <h3>{location.name}</h3>
                <p>{animal.visitTip}</p>
                <p className="meta">{location.hours}</p>
                <Link className="btn btn-primary" to={`/map?place=${location.id}`}>{t('showOnMap')}</Link>
              </div>
            ) : null}
          </aside>
        </div>
        {related.length > 0 ? (
          <div className="wrap related">
            <h2>{t('moreOf')} {categoryLabel(animal.category)}</h2>
            <div className="animal-grid">
              {related.map((item) => (
                <AnimalCard key={item.id} animal={item} />
              ))}
            </div>
          </div>
        ) : null}
      </section>
    </article>
  )
}
