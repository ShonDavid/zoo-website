import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout.tsx'
import { AnimalDetailPage } from './pages/AnimalDetailPage.tsx'
import { AnimalsPage } from './pages/AnimalsPage.tsx'
import { ConfirmationPage } from './pages/ConfirmationPage.tsx'
import { ConservationPage } from './pages/ConservationPage.tsx'
import { CreditsPage } from './pages/CreditsPage.tsx'
import { EventDetailPage } from './pages/EventDetailPage.tsx'
import { EventsPage } from './pages/EventsPage.tsx'
import { FoodPage } from './pages/FoodPage.tsx'
import { HomePage } from './pages/HomePage.tsx'
import { MapPage } from './pages/MapPage.tsx'
import { NewsArticlePage } from './pages/NewsArticlePage.tsx'
import { NewsPage } from './pages/NewsPage.tsx'
import { NotFoundPage } from './pages/NotFoundPage.tsx'
import { PlannerPage } from './pages/PlannerPage.tsx'
import { PlayPage } from './pages/PlayPage.tsx'
import { SearchPage } from './pages/SearchPage.tsx'
import { TicketsPage } from './pages/TicketsPage.tsx'
import { VisitPage } from './pages/VisitPage.tsx'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="animals" element={<AnimalsPage />} />
          <Route path="animals/:slug" element={<AnimalDetailPage />} />
          <Route path="play" element={<PlayPage />} />
          <Route path="map" element={<MapPage />} />
          <Route path="events" element={<EventsPage />} />
          <Route path="events/:slug" element={<EventDetailPage />} />
          <Route path="visit" element={<VisitPage />} />
          <Route path="plan" element={<PlannerPage />} />
          <Route path="tickets" element={<TicketsPage />} />
          <Route path="tickets/confirmation/:orderId" element={<ConfirmationPage />} />
          <Route path="food" element={<FoodPage />} />
          <Route path="conservation" element={<ConservationPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsArticlePage />} />
          <Route path="search" element={<SearchPage />} />
          <Route path="credits" element={<CreditsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
