import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { MobileTabBar } from './MobileTabBar.tsx'
import { SiteFooter } from './SiteFooter.tsx'
import { SiteHeader } from './SiteHeader.tsx'

export function Layout() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="site">
      <SiteHeader />
      <main id="main" className={pathname === '/' ? 'page-enter' : 'page-enter has-offset'} key={pathname}>
        <Outlet />
      </main>
      <SiteFooter />
      <MobileTabBar />
    </div>
  )
}
