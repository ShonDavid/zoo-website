import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { Icon } from './Icon.tsx'
import { SearchDialog } from './SearchDialog.tsx'

export function SiteHeader() {
  const { pathname } = useLocation()
  const { t, locale, setLocale } = useI18n()
  const [scrolled, setScrolled] = useState(() => window.scrollY > 24)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const overlay = pathname === '/' && !scrolled && !menuOpen
  const links = [
    { to: '/animals', label: t('navAnimals') },
    { to: '/visit', label: t('navVisit') },
    { to: '/map', label: t('navMap') },
    { to: '/events', label: t('navEvents') },
    { to: '/plan', label: t('navPlan') },
  ]

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [menuOpen])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === '/' && !(event.target instanceof HTMLInputElement) && !(event.target instanceof HTMLTextAreaElement)) {
        event.preventDefault()
        setSearchOpen(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      <a className="skip-link" href="#main">
        {t('skip')}
      </a>
      <header className={`site-header ${overlay ? 'is-overlay' : 'is-solid'}`}>
        <NavLink to="/" className="logo" aria-label={t('brandLong')}>
          <img className="logo-img" src="/logo.png" alt="" />
        </NavLink>
        <nav className="primary-nav" aria-label={t('primaryNav')}>
          {links.map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'nav-link is-active' : 'nav-link')}>
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="header-actions">
          <button type="button" className="icon-btn" aria-label={t('searchZoo')} onClick={() => setSearchOpen(true)}>
            <Icon name="search" />
          </button>
          <button
            type="button"
            className="icon-btn"
            aria-label={locale === 'he' ? 'English' : 'עברית'}
            title={locale === 'he' ? 'English' : 'עברית'}
            onClick={() => setLocale(locale === 'he' ? 'en' : 'he')}
          >
            <Icon name="language" />
          </button>
          <NavLink to="/tickets" className="btn btn-primary btn-ticket">
            <span className="btn-label-long">{t('buyTickets')}</span>
            <span className="btn-label-short">{t('ticketsShort')}</span>
          </NavLink>
          <button
            type="button"
            className="icon-btn nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <Icon name={menuOpen ? 'close' : 'menu'} />
            <span className="sr-only">{menuOpen ? t('closeMenu') : t('openMenu')}</span>
          </button>
        </div>
      </header>
      {menuOpen ? (
        <div className="mobile-drawer" id="mobile-menu">
          <nav aria-label={t('mobileNav')}>
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} onClick={() => setMenuOpen(false)}>
                {link.label}
              </NavLink>
            ))}
            <NavLink to="/tickets" onClick={() => setMenuOpen(false)}>{t('navTickets')}</NavLink>
            <NavLink to="/food" onClick={() => setMenuOpen(false)}>{t('navFood')}</NavLink>
            <NavLink to="/conservation" onClick={() => setMenuOpen(false)}>{t('navConservation')}</NavLink>
            <NavLink to="/news" onClick={() => setMenuOpen(false)}>{t('navNews')}</NavLink>
          </nav>
        </div>
      ) : null}
      {searchOpen ? <SearchDialog onClose={() => setSearchOpen(false)} /> : null}
    </>
  )
}
