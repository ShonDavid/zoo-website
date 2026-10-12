import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { Ridge } from './Ridge.tsx'

export function SiteFooter() {
  const { t } = useI18n()
  const [joined, setJoined] = useState(false)

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setJoined(true)
  }

  return (
    <footer className="site-footer">
      <Ridge tone="moss" flip />
      <div className="wrap footer-grid">
        <div>
          <img className="footer-logo" src="/logo.png" alt={t('brand')} />
          <p className="footer-address">{t('address')}</p>
          <p>
            <a href="tel:+97239615942">{t('phone')}</a>
          </p>
        </div>
        <div>
          <h2>{t('explore')}</h2>
          <Link to="/animals">{t('navAnimals')}</Link>
          <Link to="/play">{t('navPlay')}</Link>
          <Link to="/map">{t('zooMap')}</Link>
          <Link to="/events">{t('navEvents')}</Link>
          <Link to="/plan">{t('navPlan')}</Link>
          <Link to="/tickets">{t('navTickets')}</Link>
        </div>
        <div>
          <h2>{t('visitCol')}</h2>
          <Link to="/visit#hours">{t('openingHours')}</Link>
          <Link to="/visit#getting-here">{t('gettingHere')}</Link>
          <Link to="/food">{t('navFood')}</Link>
          <Link to="/conservation">{t('navConservation')}</Link>
          <Link to="/news">{t('navNews')}</Link>
        </div>
        <div>
          <h2>{t('seasonNotes')}</h2>
          <p>{t('seasonCopy')}</p>
          {joined ? (
            <p role="status">{t('savedLocal')}</p>
          ) : (
            <form onSubmit={onSubmit}>
              <label htmlFor="footer-email" className="sr-only">{t('email')}</label>
              <input id="footer-email" type="email" required placeholder={t('email')} />
              <button type="submit" className="btn btn-primary">{t('keepPosted')}</button>
            </form>
          )}
        </div>
      </div>
      <div className="wrap footer-legal">
        <p>© {new Date().getFullYear()} {t('legal')}</p>
        <Link to="/credits">{t('credits')}</Link>
      </div>
    </footer>
  )
}
