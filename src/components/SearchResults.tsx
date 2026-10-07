import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { formatTime } from '../lib/format.ts'
import { resultCount, type SearchResults as Results } from '../lib/search.ts'

export function SearchResults({ results, onNavigate }: { results: Results; onNavigate?: () => void }) {
  const { t, categoryLabel, statusLabel, eventTypeLabel } = useI18n()
  const total = resultCount(results)
  if (!results.query.trim()) {
    return <p className="empty-note">{t('searchEmpty')}</p>
  }
  if (total === 0) {
    return (
      <p className="empty-note" role="status">
        {t('searchNone')} “{results.query}”. {t('searchTry')}
      </p>
    )
  }

  const places = results.locations.filter((location) => location.categories.some((category) => category === 'animals' || category === 'food' || category === 'kids' || category === 'events'))
  const facilities = results.locations.filter((location) => !location.categories.some((category) => category === 'animals' || category === 'food' || category === 'kids' || category === 'events'))

  return (
    <div className="search-results" role="status" aria-live="polite">
      <p className="meta">{total} {t('resultsFor')} “{results.query}”</p>
      <SearchGroup title={t('groupAnimals')} empty={results.animals.length === 0}>
        {results.animals.map((animal) => (
          <Link key={animal.id} to={`/animals/${animal.slug}`} onClick={onNavigate}>
            <strong>{animal.name}</strong>
            <span>{categoryLabel(animal.category)} · {statusLabel(animal.conservationStatus)}</span>
          </Link>
        ))}
      </SearchGroup>
      <SearchGroup title={t('groupEvents')} empty={results.events.length === 0}>
        {results.events.map((event) => (
          <Link key={event.id} to={`/events/${event.slug}`} onClick={onNavigate}>
            <strong>{event.title}</strong>
            <span>{formatTime(event.time)} · {eventTypeLabel(event.type)}</span>
          </Link>
        ))}
      </SearchGroup>
      <SearchGroup title={t('groupPlaces')} empty={places.length === 0}>
        {places.map((location) => (
          <Link key={location.id} to={`/map?place=${location.id}`} onClick={onNavigate}>
            <strong>{location.name}</strong>
            <span>{location.description}</span>
          </Link>
        ))}
      </SearchGroup>
      <SearchGroup title={t('groupFacilities')} empty={facilities.length === 0}>
        {facilities.map((location) => (
          <Link key={location.id} to={`/map?place=${location.id}`} onClick={onNavigate}>
            <strong>{location.name}</strong>
            <span>{location.description}</span>
          </Link>
        ))}
      </SearchGroup>
      <SearchGroup title={t('groupStories')} empty={results.articles.length === 0}>
        {results.articles.map((article) => (
          <Link key={article.id} to={`/news/${article.slug}`} onClick={onNavigate}>
            <strong>{article.title}</strong>
            <span>{article.category}</span>
          </Link>
        ))}
      </SearchGroup>
    </div>
  )
}

function SearchGroup({ title, empty, children }: { title: string; empty: boolean; children: ReactNode }) {
  if (empty) return null
  return (
    <section>
      <h3>{title}</h3>
      <div className="search-results__list">{children}</div>
    </section>
  )
}
