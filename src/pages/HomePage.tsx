import { Link, useNavigate } from 'react-router-dom'
import { featuredAnimals } from '../data/animals.ts'
import { eventsOn } from '../data/events.ts'
import { locations } from '../data/locations.ts'
import { latestArticles } from '../data/news.ts'
import { localizeArticle, localizeEvent } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatShortDate, formatTime, timeToMinutes } from '../lib/format.ts'
import { getHours, visitStatus } from '../lib/hours.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { AnimalCard } from '../components/AnimalCard.tsx'
import { EventCard } from '../components/EventCard.tsx'
import { LocationCard } from '../components/LocationCard.tsx'
import { ZooMap } from '../components/ZooMap.tsx'
import { Ridge } from '../components/Ridge.tsx'
import { SectionHeader, StatCard } from '../components/ui.tsx'

export function HomePage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t('docHome'))
  const navigate = useNavigate()
  const today = new Date()
  const hours = getHours(today)
  const status = visitStatus(today)
  const todaysEvents = eventsOn(today)
  const nowMinutes = today.getHours() * 60 + today.getMinutes()
  const nextEvent = todaysEvents.find((event) => timeToMinutes(event.time) + event.durationMinutes >= nowMinutes)
  const nextShown = nextEvent ? localizeEvent(nextEvent, locale) : undefined
  const previewLocations = locations.filter((location) =>
    location.categories.some((category) => ['animals', 'food', 'kids', 'events'].includes(category)),
  )
  const food = locations.filter((location) => location.categories.includes('food') && location.image).slice(0, 2)

  return (
    <>
      <section className="hero">
        <div className="hero__media">
          <img src="/images/hero.jpg" alt={t('heroAlt')} fetchPriority="high" />
        </div>
        <div className="hero__shade" />
        <div className="wrap hero__content">
          <p className="hero__promise">{t('heroPromise')}</p>
          <h1>{t('heroTitle')}</h1>
          <p className="hero__lede">{t('heroLede')}</p>
          <div className="hero__actions">
            <Link className="btn btn-primary" to="/tickets">{t('buyTickets')}</Link>
            <Link className="btn btn-secondary" to="/animals">{t('exploreAnimals')}</Link>
          </div>
        </div>
      </section>

      <section className="ribbon" aria-label={t('planToday')}>
        <div className="wrap ribbon__grid">
          <article>
            <p className="eyebrow">{t('today')}</p>
            <h2>{status.message}</h2>
            <p>{hours.closed ? t('holidayCheck') : `${t('gatesLine')} ${hours.label}. ${t('lastEntry')}`}</p>
            <Link className="text-link" to="/visit#hours">{t('hoursLink')}</Link>
          </article>
          <article>
            <p className="eyebrow">{t('upNext')}</p>
            {nextShown ? (
              <>
                <h2>{nextShown.title}</h2>
                <p>{formatTime(nextEvent!.time)} · {nextShown.summary}</p>
                <Link className="text-link" to={`/events/${nextShown.slug}`}>{t('seeEvents')}</Link>
              </>
            ) : (
              <>
                <h2>{t('dayDone')}</h2>
                <p>{t('dayDoneCopy')}</p>
                <Link className="text-link" to="/events">{t('fullSchedule')}</Link>
              </>
            )}
          </article>
          <article className="ribbon__cta">
            <p className="eyebrow">{t('yourDay')}</p>
            <h2>{t('ticketsFrom')}</h2>
            <p>{t('ticketsFromCopy')}</p>
            <div className="hero__actions">
              <Link className="btn btn-primary" to="/tickets">{t('buyTickets')}</Link>
              <Link className="btn btn-dark" to="/plan">{t('planMyVisit')}</Link>
            </div>
          </article>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeader
            eyebrow={t('collection')}
            title={t('meetAnimals')}
            lede={t('meetLede')}
            action={<Link className="text-link" to="/animals">{t('browseAll')}</Link>}
          />
          <div className="animal-grid animal-grid--home">
            {featuredAnimals().map((animal) => (
              <AnimalCard key={animal.id} animal={animal} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <Ridge tone="sand" />
        <div className="wrap">
          <SectionHeader
            eyebrow={t('todaySchedule')}
            title={t('todayEvents')}
            lede={t('todayEventsLede')}
            action={<Link className="text-link" to="/events">{t('allEvents')}</Link>}
          />
          <div className="event-list">
            {todaysEvents.map((event) => (
              <EventCard key={event.id} event={event} highlighted={event.id === nextEvent?.id} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <Ridge tone="cream" flip />
        <div className="wrap">
          <SectionHeader eyebrow={t('findWay')} title={t('mapTitle')} lede={t('mapLede')} action={<Link className="text-link" to="/map">{t('openMap')}</Link>} />
          <ZooMap locations={previewLocations} onSelect={(id) => navigate(`/map?place=${id}`)} />
        </div>
      </section>

      <section className="section section-sand">
        <Ridge tone="sand" />
        <div className="wrap">
          <SectionHeader eyebrow={t('beforeHome')} title={t('planVisitTitle')} lede={t('planVisitLede')} />
          <div className="plan-grid">
            <Link to="/visit#hours"><h3>{t('hoursCardTitle')}</h3><p>{t('hoursCard')}</p></Link>
            <Link to="/visit#getting-here"><h3>{t('gettingCardTitle')}</h3><p>{t('gettingCard')}</p></Link>
            <Link to="/visit#what-to-bring"><h3>{t('bringCardTitle')}</h3><p>{t('bringCard')}</p></Link>
            <Link to="/visit#families"><h3>{t('familiesCardTitle')}</h3><p>{t('familiesCard')}</p></Link>
          </div>
          <div className="center-cta">
            <Link className="btn btn-primary" to="/plan">{t('buildItinerary')}</Link>
          </div>
        </div>
      </section>

      <section className="section section-forest">
        <Ridge tone="forest" flip />
        <div className="wrap">
          <SectionHeader eyebrow={t('beyond')} title={t('conservationTitle')} lede={t('conservationLede')} />
          <div className="stat-grid">
            <StatCard value="700" label={t('statAnimals')} detail={t('statAnimalsDetail')} />
            <StatCard value="132" label={t('statSpecies')} detail={t('statSpeciesDetail')} />
            <StatCard value="130,000" label={t('statVisitors')} detail={t('statVisitorsDetail')} />
          </div>
          <div className="center-cta">
            <Link className="btn btn-primary" to="/conservation#support">{t('supportCta')}</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <Ridge tone="cream" />
        <div className="wrap">
          <SectionHeader eyebrow={t('fromPark')} title={t('latestNews')} action={<Link className="text-link" to="/news">{t('allStories')}</Link>} />
          <div className="news-grid">
            {latestArticles(3).map((article) => {
              const shown = localizeArticle(article, locale)
              return (
                <article key={article.id} className="news-card">
                  <Link to={`/news/${article.slug}`}>
                    <img src={article.image} alt={shown.imageAlt} loading="lazy" />
                  </Link>
                  <div>
                    <p className="meta">{shown.category} · {formatShortDate(article.date)}</p>
                    <h3><Link to={`/news/${article.slug}`}>{shown.title}</Link></h3>
                    <p>{shown.summary}</p>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="section section-sand">
        <Ridge tone="sand" flip />
        <div className="wrap">
          <SectionHeader eyebrow={t('whileHere')} title={t('eatTitle')} lede={t('eatLede')} action={<Link className="text-link" to="/food">{t('foodFacilities')}</Link>} />
          <div className="location-grid">
            {food.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
        </div>
      </section>

      <section className="final-cta">
        <Ridge tone="sand" />
        <img src="/images/lion-2.jpg" alt="" />
        <div className="final-cta__shade" />
        <div className="wrap final-cta__content">
          <p className="eyebrow">{t('brandLong')}</p>
          <h2>{t('comeDay')}</h2>
          <p>{t('comeDayCopy')}</p>
          <div className="hero__actions">
            <Link className="btn btn-primary" to="/tickets">{t('buyTickets')}</Link>
            <Link className="btn btn-secondary" to="/map">{t('openMap')}</Link>
          </div>
        </div>
      </section>
    </>
  )
}
