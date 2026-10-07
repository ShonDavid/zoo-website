import { animals } from '../data/animals.ts'
import { events } from '../data/events.ts'
import { locations } from '../data/locations.ts'
import { articles } from '../data/news.ts'
import { animalHaystack, articleHaystack, eventHaystack, localizeAnimal, localizeArticle, localizeEvent, localizeLocation, locationHaystack } from '../i18n/content.ts'
import { localeNow } from '../i18n/locale.ts'
import type { Animal, NewsArticle, ZooEvent, ZooLocation } from '../types.ts'

export interface SearchResults {
  query: string
  animals: Animal[]
  events: ZooEvent[]
  locations: ZooLocation[]
  articles: NewsArticle[]
}

function rank(name: string, query: string) {
  const value = name.toLowerCase()
  if (value === query) return 0
  if (value.startsWith(query)) return 1
  if (value.includes(query)) return 2
  return 3
}

export function searchAll(raw: string): SearchResults {
  const query = raw.trim().toLowerCase()
  const locale = localeNow()
  if (!query) return { query: raw, animals: [], events: [], locations: [], articles: [] }

  const animalHits = animals
    .filter((animal) => animalHaystack(animal).toLowerCase().includes(query))
    .sort((a, b) => rank(localizeAnimal(a, locale).name, query) - rank(localizeAnimal(b, locale).name, query))
    .map((animal) => localizeAnimal(animal, locale))

  const eventHits = events
    .filter((event) => eventHaystack(event).toLowerCase().includes(query))
    .sort((a, b) => rank(localizeEvent(a, locale).title, query) - rank(localizeEvent(b, locale).title, query) || a.time.localeCompare(b.time))
    .map((event) => localizeEvent(event, locale))

  const locationHits = locations
    .filter((location) => locationHaystack(location).toLowerCase().includes(query))
    .sort((a, b) => rank(localizeLocation(a, locale).name, query) - rank(localizeLocation(b, locale).name, query))
    .map((location) => localizeLocation(location, locale))

  const articleHits = articles
    .filter((article) => articleHaystack(article).toLowerCase().includes(query))
    .sort((a, b) => rank(localizeArticle(a, locale).title, query) - rank(localizeArticle(b, locale).title, query))
    .map((article) => localizeArticle(article, locale))

  return { query: raw.trim(), animals: animalHits, events: eventHits, locations: locationHits, articles: articleHits }
}

export function resultCount(results: SearchResults) {
  return results.animals.length + results.events.length + results.locations.length + results.articles.length
}
