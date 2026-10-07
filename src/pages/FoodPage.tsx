import { locations } from '../data/locations.ts'
import { localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { LocationCard } from '../components/LocationCard.tsx'
import { PageHero } from '../components/PageHero.tsx'

const facilityIds = ['restroom-plaza', 'restroom-east', 'restroom-west', 'first-aid', 'gift-gallery', 'lost-found', 'water-plaza', 'water-savanna', 'water-coast', 'mobility-point']

export function FoodPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t('docFood'))
  const restaurants = locations.filter((location) => location.categories.includes('food'))
  const facilities = facilityIds.map((id) => locations.find((location) => location.id === id)).filter((location) => location !== undefined)

  return (
    <>
      <PageHero eyebrow={t('foodEyebrow')} title={t('foodTitle')} lede={t('foodLede')} image="/images/restaurant.jpg" imageAlt={t('restaurantAlt')} />
      <section className="section">
        <div className="wrap">
          <h2>{t('restaurants')}</h2>
          <div className="location-grid">
            {restaurants.map((location) => (
              <LocationCard key={location.id} location={location} />
            ))}
          </div>
          <h2 className="section-gap">{t('facilities')}</h2>
          <div className="facility-list">
            {facilities.map((location) => {
              const shown = localizeLocation(location, locale)
              return (
                <article key={location.id}>
                  <h3>{shown.name}</h3>
                  <p>{shown.description}</p>
                  {shown.hours ? <p className="meta">{shown.hours}</p> : null}
                  {shown.details ? <ul>{shown.details.map((detail) => <li key={detail}>{detail}</li>)}</ul> : null}
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
