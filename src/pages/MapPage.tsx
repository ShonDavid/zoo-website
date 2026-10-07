import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { getAnimalById } from '../data/animals.ts'
import { eventsOn } from '../data/events.ts'
import { getLocation, locations } from '../data/locations.ts'
import { localizeAnimal, localizeEvent, localizeLocation, locationHaystack } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { routeBetween, routeThrough, walkMinutes } from '../lib/directions.ts'
import { formatTime } from '../lib/format.ts'
import { loadItinerary } from '../lib/itinerary.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { Icon } from '../components/Icon.tsx'
import { ZooMap } from '../components/ZooMap.tsx'
import type { LocationCategory } from '../types.ts'

const filterIds: LocationCategory[] = ['animals', 'food', 'restrooms', 'kids', 'events', 'accessibility', 'facilities']

export function MapPage() {
  const { t, locale, placeKindLabel } = useI18n()
  useDocumentTitle(t('docMap'))
  const [params, setParams] = useSearchParams()
  const place = params.get('place')
  const showRoute = params.get('route') === '1'
  const [enabled, setEnabled] = useState<Set<LocationCategory>>(() => new Set(filterIds))
  const [fromGate, setFromGate] = useState('main-gate')
  const [mode, setMode] = useState<'itinerary' | 'directions' | null>(showRoute ? 'itinerary' : null)
  const [listView, setListView] = useState(false)
  const [query, setQuery] = useState('')
  const itinerary = showRoute ? loadItinerary() : null

  const selectedRaw = place ? getLocation(place) : undefined
  const selected = selectedRaw ? localizeLocation(selectedRaw, locale) : undefined
  const routeIds = itinerary?.stops.map((stop) => stop.locationId) ?? []
  const numbers = Object.fromEntries(routeIds.map((id, index) => [id, index + 1]))

  const visible = locations.filter((location) => {
    const matchesFilter = location.categories.some((category) => enabled.has(category)) || routeIds.includes(location.id) || location.id === place
    const matchesQuery = !query.trim() || locationHaystack(location).toLowerCase().includes(query.trim().toLowerCase())
    return matchesFilter && matchesQuery
  })

  const route =
    mode === 'directions' && selected
      ? routeBetween(fromGate, selected.id)
      : mode === 'itinerary' && routeIds.length > 1
        ? routeThrough(routeIds)
        : []

  const minutes = route.length > 1 ? walkMinutes(route) : null
  const gateName = localizeLocation(getLocation(fromGate)!, locale).name

  function selectPlace(id: string) {
    const next = new URLSearchParams(params)
    next.set('place', id)
    setParams(next, { replace: true })
    setMode((current) => (current === 'itinerary' ? current : null))
  }

  function toggle(category: LocationCategory) {
    setEnabled((current) => {
      const next = new Set(current)
      if (next.has(category)) next.delete(category)
      else next.add(category)
      return next
    })
  }

  const todaysEvents = eventsOn(new Date()).filter((event) => event.locationId === selected?.id)

  return (
    <section className="section map-page">
      <div className="wrap">
        <p className="eyebrow">{t('mapEyebrow')}</p>
        <h1>{t('mapPageTitle')}</h1>
        <p className="lede">{t('mapPageLede')}</p>
        <div className="map-toolbar">
          <div className="chip-row" role="group" aria-label={t('mapLayers')}>
            {filterIds.map((id) => (
              <button key={id} type="button" className={enabled.has(id) ? 'is-on' : ''} aria-pressed={enabled.has(id)} onClick={() => toggle(id)}>
                {placeKindLabel(id)}
              </button>
            ))}
          </div>
          <div className="map-toolbar__tools">
            <label className="sr-only" htmlFor="map-search">{t('findPlace')}</label>
            <input id="map-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder={t('findPlace')} />
            <button type="button" className={listView ? 'is-on' : ''} aria-pressed={listView} onClick={() => setListView((value) => !value)}>
              {listView ? t('showMap') : t('listView')}
            </button>
          </div>
        </div>
        {itinerary && showRoute ? <p className="route-note">{t('savedRoute')} {itinerary.summary}</p> : null}
        <div className={`map-layout ${listView ? 'is-list' : ''}`}>
          {listView ? (
            <ul className="map-list">
              {visible.map((location) => {
                const shown = localizeLocation(location, locale)
                return (
                  <li key={location.id}>
                    <button type="button" onClick={() => { selectPlace(location.id); setListView(false) }}>
                      <strong>{shown.name}</strong>
                      <span>{shown.description}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          ) : (
            <ZooMap locations={visible} selectedId={place} onSelect={selectPlace} route={route} numbers={mode === 'itinerary' ? numbers : {}} />
          )}
          <aside className="map-panel" aria-live="polite">
            {selected ? (
              <>
                {selected.image ? <img src={selected.image} alt={selected.imageAlt ?? ''} /> : null}
                <p className="meta">{placeKindLabel(selected.categories[0] ?? 'facilities')}</p>
                <h2>{selected.name}</h2>
                <p>{selected.description}</p>
                {selected.hours ? <p className="meta">{selected.hours}</p> : null}
                {selected.foodType ? <p>{selected.foodType}</p> : null}
                {selected.details ? <ul>{selected.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}
                {selected.animalIds?.map((id) => {
                  const animal = getAnimalById(id)
                  const shown = animal ? localizeAnimal(animal, locale) : undefined
                  return shown ? (
                    <Link key={id} className="text-link" to={`/animals/${shown.slug}`}>{t('meetThe')} {shown.name}</Link>
                  ) : null
                })}
                {todaysEvents.map((event) => {
                  const shown = localizeEvent(event, locale)
                  return (
                    <Link key={event.id} className="text-link" to={`/events/${event.slug}`}>
                      {formatTime(event.time)} · {shown.title}
                    </Link>
                  )
                })}
                <label className="field" htmlFor="from-gate">
                  {t('directionsFrom')}
                  <select id="from-gate" value={fromGate} onChange={(event) => setFromGate(event.target.value)}>
                    <option value="main-gate">{t('mainGate')}</option>
                    <option value="north-gate">{t('northGate')}</option>
                  </select>
                </label>
                <button type="button" className="btn btn-primary" onClick={() => setMode('directions')}>
                  <Icon name="arrow" size={18} /> {t('getDirections')}
                </button>
                {mode === 'directions' && minutes ? <p className="route-note">{t('walkFrom')} {minutes} {locale === 'he' ? 'דקות הליכה מ' : 'min walk from'} {gateName}.</p> : null}
                {mode === 'itinerary' && minutes ? <p className="route-note">{t('routeWalk')} {minutes} {t('routeWalkRest')}</p> : null}
              </>
            ) : (
              <>
                <h2>{t('choosePlace')}</h2>
                <p>{t('choosePlaceCopy')}</p>
                <Link className="text-link" to="/plan">{t('buildRoute')}</Link>
              </>
            )}
          </aside>
        </div>
      </div>
    </section>
  )
}
