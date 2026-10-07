import { NavLink } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { Icon } from './Icon.tsx'

export function MobileTabBar() {
  const { t } = useI18n()
  const tabs = [
    { to: '/', label: t('home'), icon: 'home' as const, end: true },
    { to: '/animals', label: t('navAnimals'), icon: 'paw' as const, end: false },
    { to: '/map', label: t('navMap'), icon: 'map' as const, end: false },
    { to: '/events', label: t('navEvents'), icon: 'calendar' as const, end: false },
    { to: '/tickets', label: t('navTickets'), icon: 'ticket' as const, end: false },
  ]
  return (
    <nav className="tabbar" aria-label={t('tabVisit')}>
      {tabs.map((tab) => (
        <NavLink key={tab.to} to={tab.to} end={tab.end} className={({ isActive }) => (isActive ? 'is-active' : undefined)}>
          <Icon name={tab.icon} size={22} />
          <span>{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  )
}
