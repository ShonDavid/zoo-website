import { MAP_HEIGHT, MAP_WIDTH, mapEdges } from '../data/locations.ts'
import { getLocation } from '../data/locations.ts'
import { localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import type { MapPoint } from '../lib/directions.ts'
import type { ZooLocation } from '../types.ts'
import { categoryIcon, Icon } from './Icon.tsx'

export function ZooMap({
  locations,
  selectedId,
  onSelect,
  route = [],
  numbers = {},
}: {
  locations: ZooLocation[]
  selectedId?: string | null
  onSelect: (id: string) => void
  route?: MapPoint[]
  numbers?: Record<string, number>
}) {
  const { t, locale, placeKindLabel } = useI18n()
  const routePoints = route.map((point) => `${point.x},${point.y}`).join(' ')

  return (
    <div className="zoo-map" role="group" aria-label={t('mapLabel')}>
      <p id="map-help" className="sr-only">{t('mapHelp')}</p>
      <div className="zoo-map__canvas">
        <svg viewBox={`0 0 ${MAP_WIDTH} ${MAP_HEIGHT}`} aria-hidden="true">
          <rect width={MAP_WIDTH} height={MAP_HEIGHT} rx="36" fill="#e7f2dc" />
          <path
            d="M70 150C140 70 340 40 520 110c50 40 40 130-40 190-90 60-250 80-360 20-40-20-70-80-50-170Z"
            fill="#7ea86a"
          />
          <path
            d="M250 300c90-40 250-20 340 70 80 80 90 210 10 310-70 80-230 120-340 40-80-60-110-180-70-280 20-50 30-110 60-140Z"
            fill="#e4d2a4"
          />
          <ellipse cx="220" cy="530" rx="120" ry="90" fill="#3f6b4e" />
          <ellipse cx="190" cy="690" rx="90" ry="60" fill="#8eae78" />
          <rect x="250" y="660" width="180" height="100" rx="18" fill="#d9c7a4" />
          <path
            d="M860 140c120-40 280 10 300 120 20 120-40 230-150 250-90 16-180-20-210-90-30-70-20-200 60-280Z"
            fill="#8ec9d6"
          />
          <rect x="700" y="110" width="170" height="110" rx="22" fill="#c5ddb0" />
          <ellipse cx="900" cy="650" rx="120" ry="70" fill="#d5e7b4" />
          <ellipse cx="620" cy="820" rx="200" ry="48" fill="#efe3cc" />
          {mapEdges.map(([from, to]) => {
            const start = getLocation(from)
            const end = getLocation(to)
            if (!start || !end) return null
            return (
              <line
                key={`${from}-${to}`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#f7f1e4"
                strokeWidth="16"
                strokeLinecap="round"
              />
            )
          })}
          {route.length > 1 ? (
            <polyline points={routePoints} fill="none" stroke="#c4522a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          ) : null}
          <text x="150" y="250" className="map-label">{t('forest')}</text>
          <text x="470" y="400" className="map-label">{t('savanna')}</text>
          <text x="930" y="300" className="map-label">{t('coast')}</text>
          <text x="560" y="800" className="map-label">{t('arrival')}</text>
          <g transform="translate(80 70)">
            <circle r="18" fill="#f7f1e4" />
            <path d="M0 12 V-12 M0-12 l-5 6 M0-12 l5 6" stroke="#1a3a2e" strokeWidth="2" fill="none" />
            <text y="32" textAnchor="middle" className="map-label">N</text>
          </g>
        </svg>
        <div className="zoo-map__markers">
          {locations.map((location) => {
            const shown = localizeLocation(location, locale)
            const category = location.categories[0] ?? 'facilities'
            const number = numbers[location.id]
            const selected = location.id === selectedId
            return (
              <button
                key={location.id}
                type="button"
                className={`marker marker-${category} ${selected ? 'is-selected' : ''}`}
                style={{ left: `${(location.x / MAP_WIDTH) * 100}%`, top: `${(location.y / MAP_HEIGHT) * 100}%` }}
                aria-pressed={selected}
                aria-describedby="map-help"
                aria-label={`${shown.name}, ${placeKindLabel(category)}`}
                onClick={() => onSelect(location.id)}
              >
                {number ? <span className="marker__num">{number}</span> : <Icon name={categoryIcon(category)} size={16} />}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
