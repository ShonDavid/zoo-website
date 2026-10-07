import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { formatLongDate } from '../lib/format.ts'
import { getHours, regularHours, visitStatus } from '../lib/hours.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { PageHero } from '../components/PageHero.tsx'

export function VisitPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t('docVisit'))
  const today = new Date()
  const hours = getHours(today)
  const status = visitStatus(today)
  const bring = [
    [t('bringShoes'), t('bringShoesCopy')],
    [t('bringWater'), t('bringWaterCopy')],
    [t('bringSun'), t('bringSunCopy')],
    [t('bringHat'), t('bringHatCopy')],
    [t('bringCamera'), t('bringCameraCopy')],
  ]

  return (
    <>
      <PageHero eyebrow={t('visitPageEyebrow')} title={t('visitPageTitle')} lede={t('visitPageLede')} image="/images/forest.jpg" imageAlt={t('forestAlt')} />
      <section className="section" id="hours">
        <div className="wrap visit-grid">
          <div>
            <p className="eyebrow">{t('openingHours')}</p>
            <h2>{t('todayComma')}, {formatLongDate(today)}</h2>
            <p className="hours-today">{status.message}. {hours.closed ? hours.note : hours.label}.</p>
            <p>{t('hoursNote')}</p>
            <table className="hours-table">
              <caption>{t('regularHours')}</caption>
              <tbody>
                {regularHours.map((row) => (
                  <tr key={row.hours + row.daysEn}>
                    <th scope="row">{locale === 'he' ? row.daysHe : row.daysEn}</th>
                    <td>{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>{t('holidays')}</h3>
            <p>{t('holidayCopy')}</p>
          </div>
          <div id="getting-here">
            <p className="eyebrow">{t('gettingHere')}</p>
            <h2>{t('addressTitle')}</h2>
            <h3>{t('parkingTitle')}</h3>
            <p>{t('parkingCopy')}</p>
            <h3>{t('transitTitle')}</h3>
            <p>{t('transitCopy')}</p>
            <h3>{t('bikeTitle')}</h3>
            <p>{t('bikeCopy')}</p>
            <h3>{t('accessTitle')}</h3>
            <p>{t('accessCopy')}</p>
          </div>
        </div>
      </section>
      <section className="section section-sand" id="what-to-bring">
        <div className="wrap">
          <h2>{t('bringTitle')}</h2>
          <div className="info-grid">
            {bring.map(([title, copy]) => (
              <article key={title}>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            ))}
          </div>
          <p>{t('picnicNote')}</p>
        </div>
      </section>
      <section className="section" id="families">
        <div className="wrap visit-grid">
          <div>
            <p className="eyebrow">{t('familiesEyebrow')}</p>
            <h2>{t('familiesTitle')}</h2>
            <ul className="plain-list">
              <li><strong>{t('familyStroller')}</strong> {t('familyStrollerCopy')}</li>
              <li><strong>{t('familyChange')}</strong> {t('familyChangeCopy')}</li>
              <li><strong>{t('familyKids')}</strong> {t('familyKidsCopy')}</li>
              <li><strong>{t('familySit')}</strong> {t('familySitCopy')}</li>
            </ul>
            <Link className="btn btn-primary" to="/plan">{t('planMyVisit')}</Link>
          </div>
          <img src="/images/playground.jpg" alt={t('playgroundAlt')} />
        </div>
      </section>
    </>
  )
}
