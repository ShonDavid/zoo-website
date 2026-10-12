import { MAP_HEIGHT, MAP_WIDTH, mapEdges } from '../data/locations.ts'
import { getLocation } from '../data/locations.ts'
import { localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import type { MapPoint } from '../lib/directions.ts'
import type { ZooLocation } from '../types.ts'
import { categoryIcon, Icon } from './Icon.tsx'

type Zone =
  | { id: string; kind: 'blob'; cx: number; cy: number; rx: number; ry: number; fill: string }
  | { id: string; kind: 'house'; x: number; y: number; w: number; h: number; fill: string }

const habitats: Zone[] = [
  { id: 'small-mammals', kind: 'house', x: 72, y: 148, w: 156, h: 120, fill: '#eedfc2' },
  { id: 'lemur-walk', kind: 'blob', cx: 305, cy: 180, rx: 72, ry: 72, fill: '#8db97a' },
  { id: 'cliff-country', kind: 'blob', cx: 470, cy: 165, rx: 88, ry: 72, fill: '#d8c2a0' },
  { id: 'deer-meadow', kind: 'blob', cx: 505, cy: 318, rx: 105, ry: 62, fill: '#c9dfa6' },
  { id: 'africa-yard', kind: 'blob', cx: 215, cy: 370, rx: 108, ry: 70, fill: '#ead39a' },
  { id: 'australia-yard', kind: 'blob', cx: 625, cy: 455, rx: 82, ry: 58, fill: '#e6bb94' },
  { id: 'primate-house', kind: 'house', x: 90, y: 462, w: 185, h: 122, fill: '#a9cc95' },
  { id: 'wetland-yard', kind: 'blob', cx: 455, cy: 566, rx: 88, ry: 58, fill: '#a6d3de' },
  { id: 'reptile-house', kind: 'house', x: 262, y: 648, w: 158, h: 104, fill: '#dccaa4' },
]

const trees: [number, number, number][] = [
  [1000, 120, 26], [1062, 158, 30], [1124, 108, 24], [1012, 214, 22], [1092, 242, 28], [1146, 306, 24],
  [1034, 334, 26], [1104, 404, 30], [1002, 452, 22], [1150, 482, 26], [1062, 526, 24],
  [86, 700, 26], [142, 762, 30], [70, 826, 22], [204, 806, 24], [640, 120, 22], [700, 168, 26], [760, 116, 22],
]

/** Smooth, slightly irregular closed shape so habitats read as landscape rather than ellipses. */
function blobPath(cx: number, cy: number, rx: number, ry: number) {
  const wobble = [1, 0.92, 1.05, 0.95, 1.04, 0.9, 1.03, 0.96]
  const points = wobble.map((k, i) => {
    const a = (i / wobble.length) * Math.PI * 2
    return [cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]
  })
  const n = points.length
  let d = `M${points[0][0].toFixed(1)} ${points[0][1].toFixed(1)}`
  for (let i = 0; i < n; i++) {
    const [p0, p1, p2, p3] = [points[(i - 1 + n) % n], points[i], points[(i + 1) % n], points[(i + 2) % n]]
    const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6]
    const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6]
    d += `C${c1[0].toFixed(1)} ${c1[1].toFixed(1)} ${c2[0].toFixed(1)} ${c2[1].toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`
  }
  return `${d}Z`
}

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
          <rect x="16" y="16" width={MAP_WIDTH - 32} height={MAP_HEIGHT - 32} rx="30" fill="none" stroke="#bcd3a5" strokeWidth="3" strokeDasharray="10 8" />
          <path d={blobPath(950, 662, 150, 72)} fill="#d7e8b9" />
          <ellipse cx="610" cy="822" rx="250" ry="50" fill="#efe2c8" />
          <path d={blobPath(812, 482, 62, 38)} fill="#9fd0dc" stroke="#86bccb" strokeWidth="3" />
          {trees.map(([x, y, r]) => (
            <g key={`${x}-${y}`}>
              <circle cx={x} cy={y} r={r} fill="#a9c98c" />
              <circle cx={x - r * 0.25} cy={y - r * 0.25} r={r * 0.55} fill="#bcd6a0" />
            </g>
          ))}
          {habitats.map((zone) =>
            zone.kind === 'blob' ? (
              <path key={zone.id} d={blobPath(zone.cx, zone.cy, zone.rx, zone.ry)} fill={zone.fill} stroke="rgba(21, 53, 29, 0.12)" strokeWidth="2" />
            ) : (
              <rect key={zone.id} x={zone.x} y={zone.y} width={zone.w} height={zone.h} rx="22" fill={zone.fill} stroke="rgba(21, 53, 29, 0.18)" strokeWidth="2" strokeDasharray="0" />
            ),
          )}
          {mapEdges.map(([from, to]) => {
            const start = getLocation(from)
            const end = getLocation(to)
            if (!start || !end) return null
            return (
              <line
                key={`${from}-${to}-edge`}
                x1={start.x}
                y1={start.y}
                x2={end.x}
                y2={end.y}
                stroke="#cdbf9f"
                strokeOpacity="0.55"
                strokeWidth="20"
                strokeLinecap="round"
              />
            )
          })}
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
                stroke="#fbf7ee"
                strokeWidth="13"
                strokeLinecap="round"
              />
            )
          })}
          {route.length > 1 ? (
            <polyline points={routePoints} fill="none" stroke="#c4522a" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          ) : null}
          {habitats.map((zone) => {
            const place = getLocation(zone.id)
            if (!place) return null
            return (
              <text key={`${zone.id}-label`} x={place.x} y={place.y - 30} textAnchor="middle" className="map-label map-label--zone">
                {localizeLocation(place, locale).name}
              </text>
            )
          })}
          <text x="520" y="796" textAnchor="middle" className="map-label map-label--zone">{t('arrival')}</text>
          <g transform="translate(80 70)">
            <circle r="18" fill="#f7f1e4" />
            <path d="M0 12 V-12 M0-12 l-5 6 M0-12 l5 6" stroke="#244f2d" strokeWidth="2" fill="none" />
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
