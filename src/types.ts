export type AnimalCategory = 'Mammals' | 'Birds' | 'Reptiles' | 'Amphibians' | 'Fish'

export type Continent =
  | 'Africa'
  | 'Asia'
  | 'Europe'
  | 'North America'
  | 'South America'
  | 'Oceania'
  | 'Antarctica'

export type ConservationStatus =
  | 'Extinct in the Wild'
  | 'Critically Endangered'
  | 'Endangered'
  | 'Vulnerable'
  | 'Near Threatened'
  | 'Least Concern'
  | 'Not Evaluated'

export type LocationCategory =
  | 'animals'
  | 'food'
  | 'restrooms'
  | 'kids'
  | 'events'
  | 'accessibility'
  | 'facilities'

export type EventType = 'Feeding' | 'Talk' | 'Presentation' | 'Workshop' | 'Encounter'

export type TicketTypeId = 'adult' | 'child' | 'senior' | 'family' | 'student'

export type TimeOption = '1h' | '2h' | '4h' | 'full'
export type PartyOption = 'couple' | 'family' | 'friends' | 'solo'
export type InterestOption =
  | 'savanna'
  | 'primates'
  | 'desert'
  | 'australia'
  | 'reptiles'
  | 'kids'
  | 'conservation'

export interface GalleryImage {
  src: string
  alt: string
}

export interface Animal {
  id: string
  slug: string
  name: string
  scientificName: string
  category: AnimalCategory
  continents: Continent[]
  conservationStatus: ConservationStatus
  summary: string
  description: string[]
  habitat: string
  diet: string
  lifespan: string
  size: string
  weight: string
  distribution: string
  facts: string[]
  images: GalleryImage[]
  locationId: string
  featured: boolean
  visitTip: string
}

export interface ZooLocation {
  id: string
  name: string
  categories: LocationCategory[]
  x: number
  y: number
  description: string
  hours?: string
  image?: string
  imageAlt?: string
  animalIds?: string[]
  foodType?: string
  details?: string[]
  keywords?: string[]
}

export interface ZooEvent {
  id: string
  slug: string
  title: string
  time: string
  durationMinutes: number
  locationId: string
  type: EventType
  summary: string
  description: string[]
  animalId?: string
  /** Weekdays as 0–6 (Sunday–Saturday). Omit for every day. */
  days?: number[]
}

export interface NewsArticle {
  id: string
  slug: string
  title: string
  date: string
  category: string
  summary: string
  image: string
  imageAlt: string
  body: string[]
  animalId?: string
}

export interface TicketType {
  id: TicketTypeId
  name: string
  description: string
  price: number
}

export interface TicketLine {
  typeId: TicketTypeId
  quantity: number
  unitPrice: number
}

export interface Order {
  id: string
  createdAt: string
  visitDate: string
  tickets: TicketLine[]
  contact: { name: string; email: string; phone: string }
  paymentMethod: 'card' | 'arrival'
  cardLast4?: string
  total: number
}

export interface ItineraryStop {
  time: string
  title: string
  place: string
  locationId: string
  minutes: number
  note: string
  kind: 'arrive' | 'animal' | 'event' | 'food' | 'play' | 'shop'
}

export interface SavedItinerary {
  time: TimeOption
  party: PartyOption
  interest: InterestOption
  summary: string
  stops: ItineraryStop[]
}

export interface PhotoCredit {
  file: string
  subject: string
  artist: string
  license: string
  licenseUrl: string
  source: string
}
