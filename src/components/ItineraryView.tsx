import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { formatDuration, formatTime } from '../lib/format.ts'
import type { ItineraryStop } from '../types.ts'

export function ItineraryView({ stops }: { stops: ItineraryStop[] }) {
  const { t } = useI18n()
  return (
    <ol className="timeline">
      {stops.map((stop, index) => (
        <li key={`${stop.time}-${stop.locationId}-${index}`}>
          <div className="timeline__mark" aria-hidden="true">{index + 1}</div>
          <div className="timeline__card">
            <p className="timeline__time">
              <time dateTime={stop.time}>{formatTime(stop.time)}</time>
              <span>{formatDuration(stop.minutes)}</span>
            </p>
            <h3>{stop.title}</h3>
            <p className="meta">{stop.place}</p>
            <p>{stop.note}</p>
            <Link className="text-link" to={`/map?place=${stop.locationId}`}>{t('showOnMap')}</Link>
          </div>
        </li>
      ))}
    </ol>
  )
}
