import { getAnimalById } from '../data/animals.ts'
import { getEventById, eventsOn } from '../data/events.ts'
import { getLocation } from '../data/locations.ts'
import { localizeAnimal, localizeEvent, localizeLocation } from '../i18n/content.ts'
import { localeNow } from '../i18n/locale.ts'
import { message } from '../i18n/messages.ts'
import type { InterestOption, ItineraryStop, PartyOption, SavedItinerary, TimeOption, ZooEvent } from '../types.ts'
import { minutesToTime, timeToMinutes } from './format.ts'

const ITINERARY_KEY = 'chai-kef.itinerary'

const timeBudget: Record<TimeOption, number> = {
  '1h': 75,
  '2h': 135,
  '4h': 250,
  full: 390,
}

const animalPlans: Record<InterestOption, string[]> = {
  savanna: ['africa-yard', 'deer-meadow', 'australia-yard', 'wetland-yard'],
  primates: ['primate-house', 'lemur-walk', 'small-mammals', 'wetland-yard'],
  desert: ['cliff-country', 'africa-yard', 'deer-meadow', 'small-mammals'],
  australia: ['australia-yard', 'small-mammals', 'lemur-walk', 'wetland-yard'],
  reptiles: ['reptile-house', 'wetland-yard', 'small-mammals', 'cliff-country'],
  kids: ['lemur-walk', 'australia-yard', 'wetland-yard', 'small-mammals', 'wonder-playground'],
  conservation: ['primate-house', 'africa-yard', 'cliff-country', 'lemur-walk'],
}

const timeKeys: Record<TimeOption, 'itineraryHour' | 'itineraryTwo' | 'itineraryFour' | 'itineraryFull'> = {
  '1h': 'itineraryHour',
  '2h': 'itineraryTwo',
  '4h': 'itineraryFour',
  full: 'itineraryFull',
}

const partyKeys: Record<PartyOption, 'forCouple' | 'forFamily' | 'forFriends' | 'forSolo'> = {
  couple: 'forCouple',
  family: 'forFamily',
  friends: 'forFriends',
  solo: 'forSolo',
}

const interestKeys: Record<InterestOption, 'aroundSavanna' | 'aroundPrimates' | 'aroundDesert' | 'aroundAustralia' | 'aroundReptiles' | 'aroundKids' | 'aroundConservation'> = {
  savanna: 'aroundSavanna',
  primates: 'aroundPrimates',
  desert: 'aroundDesert',
  australia: 'aroundAustralia',
  reptiles: 'aroundReptiles',
  kids: 'aroundKids',
  conservation: 'aroundConservation',
}

interface Block {
  locationId: string
  title: string
  minutes: number
  note: string
  kind: ItineraryStop['kind']
  fixedStart?: number
}

function unique(ids: string[]) {
  return [...new Set(ids)]
}

function fits(event: ZooEvent, dayEnd: number) {
  return timeToMinutes(event.time) + event.durationMinutes <= dayEnd + 15
}

function chooseEvent(interest: InterestOption, dayEnd: number, date: Date) {
  const today = new Set(eventsOn(date).map((event) => event.id))
  const preferred =
    interest === 'savanna'
      ? 'zebra-feeding'
      : interest === 'primates'
        ? 'lemur-encounter'
        : interest === 'desert'
          ? 'ibex-talk'
          : interest === 'australia'
            ? 'kangaroo-feeding'
            : interest === 'reptiles'
              ? 'reptile-presentation'
              : interest === 'kids'
                ? dayEnd >= 15 * 60 + 40
                  ? 'childrens-workshop'
                  : 'kangaroo-feeding'
                : interest === 'conservation'
                  ? dayEnd >= 13 * 60
                    ? 'otter-talk'
                    : 'ibex-talk'
                  : null

  const candidate = preferred ? getEventById(preferred) : undefined
  if (candidate && today.has(candidate.id) && fits(candidate, dayEnd)) return candidate
  if (interest === 'kids' || interest === 'australia') {
    const fallback = getEventById('lemur-encounter')
    if (fallback && today.has(fallback.id) && fits(fallback, dayEnd)) return fallback
  }
  return null
}

function locationBlock(id: string): Block | null {
  const raw = getLocation(id)
  if (!raw) return null
  const location = localizeLocation(raw)
  const animalRaw = location.animalIds?.[0] ? getAnimalById(location.animalIds[0]) : undefined
  const animal = animalRaw ? localizeAnimal(animalRaw) : undefined
  const copy = message(localeNow(), 'giftStop')
  if (location.categories.includes('food')) {
    return {
      locationId: id,
      title: location.name,
      minutes: id === 'savanna-grill' ? 50 : 30,
      note: location.foodType ?? location.description,
      kind: 'food',
    }
  }
  if (location.categories.includes('kids')) {
    return {
      locationId: id,
      title: location.name,
      minutes: 25,
      note: location.details?.[0] ?? location.description,
      kind: 'play',
    }
  }
  if (id === 'gift-gallery') {
    return {
      locationId: id,
      title: copy,
      minutes: 20,
      note: message(localeNow(), 'giftNote'),
      kind: 'shop',
    }
  }
  return {
    locationId: id,
    title: animal?.name ?? location.name,
    minutes: 25,
    note: animal?.visitTip ?? location.description,
    kind: 'animal',
  }
}

export function buildItinerary(time: TimeOption, party: PartyOption, interest: InterestOption, date = new Date()): SavedItinerary {
  const start = 9 * 60 + 30
  const dayEnd = start + timeBudget[time]
  const limit = time === '1h' ? 2 : time === '2h' ? 3 : time === '4h' ? 5 : 6
  const picks = unique(animalPlans[interest]).slice(0, limit)

  if (party === 'family' && time !== '1h' && !picks.includes('wonder-playground')) picks.push('wonder-playground')
  if (party === 'solo' && time !== '1h' && !picks.includes('small-mammals')) picks.push('small-mammals')
  if ((party === 'couple' || party === 'friends') && (time === '4h' || time === 'full') && !picks.includes('lemur-walk')) {
    picks.push('lemur-walk')
  }

  const flexible: Block[] = [
    {
      locationId: 'main-gate',
      title: message(localeNow(), 'arriveTitle'),
      minutes: 15,
      note: message(localeNow(), 'arriveNote'),
      kind: 'arrive',
    },
  ]
  for (const id of picks) {
    const block = locationBlock(id)
    if (block) flexible.push(block)
  }
  if (time === 'full') {
    const shop = locationBlock('gift-gallery')
    if (shop) flexible.push(shop)
  }

  const fixed: Block[] = []
  const event = chooseEvent(interest, dayEnd, date)
  if (event) {
    const shown = localizeEvent(event)
    fixed.push({
      locationId: event.locationId,
      title: shown.title,
      minutes: event.durationMinutes,
      note: shown.summary,
      kind: 'event',
      fixedStart: timeToMinutes(event.time),
    })
  }
  if (time === '4h' || time === 'full') {
    const lunchId = interest === 'australia' || party === 'couple' ? 'canopy-cafe' : 'savanna-grill'
    const lunch = locationBlock(lunchId)
    if (lunch) fixed.push({ ...lunch, fixedStart: 12 * 60 + 15, minutes: 50 })
  }
  fixed.sort((a, b) => (a.fixedStart ?? 0) - (b.fixedStart ?? 0))

  const stops: ItineraryStop[] = []
  let cursor = start
  let flexIndex = 0
  let fixedIndex = 0

  while (flexIndex < flexible.length || fixedIndex < fixed.length) {
    const nextFixed = fixed[fixedIndex]
    const nextFlex = flexible[flexIndex]
    const fixedDue = nextFixed && (!nextFlex || cursor + nextFlex.minutes >= (nextFixed.fixedStart ?? cursor + 1))
    if (fixedDue && nextFixed) {
      if (nextFixed.fixedStart != null && cursor < nextFixed.fixedStart) cursor = nextFixed.fixedStart
      if (nextFixed.fixedStart == null || cursor <= nextFixed.fixedStart + 25) {
        const following = fixed[fixedIndex + 1]
        let minutes = nextFixed.minutes
        if (following?.fixedStart != null && cursor + minutes > following.fixedStart) {
          minutes = Math.max(20, following.fixedStart - cursor)
        }
        const found = getLocation(nextFixed.locationId)
        const place = found ? localizeLocation(found) : undefined
        stops.push({
          time: minutesToTime(cursor),
          title: nextFixed.title,
          place: place?.name ?? nextFixed.title,
          locationId: nextFixed.locationId,
          minutes,
          note: nextFixed.note,
          kind: nextFixed.kind,
        })
        cursor += minutes
      }
      fixedIndex += 1
      continue
    }
    if (!nextFlex) break
    const alreadyThere = stops.some((stop) => stop.locationId === nextFlex.locationId)
    const coveredSoon = nextFlex.kind === 'animal' && fixed.some((block) =>
      block.kind === 'event' && block.locationId === nextFlex.locationId && block.fixedStart != null && block.fixedStart - cursor < 90,
    )
    if (alreadyThere || coveredSoon) {
      flexIndex += 1
      continue
    }
    const found = getLocation(nextFlex.locationId)
    const place = found ? localizeLocation(found) : undefined
    stops.push({
      time: minutesToTime(cursor),
      title: nextFlex.title,
      place: place?.name ?? nextFlex.title,
      locationId: nextFlex.locationId,
      minutes: nextFlex.minutes,
      note: nextFlex.note,
      kind: nextFlex.kind,
    })
    cursor += nextFlex.minutes
    flexIndex += 1
  }

  return {
    time,
    party,
    interest,
    summary: `${message(localeNow(), timeKeys[time])} ${message(localeNow(), partyKeys[party])}, ${message(localeNow(), 'builtAround')} ${message(localeNow(), interestKeys[interest])}.`,
    stops,
  }
}

export function saveItinerary(itinerary: SavedItinerary) {
  sessionStorage.setItem(ITINERARY_KEY, JSON.stringify(itinerary))
}

export function loadItinerary(): SavedItinerary | null {
  try {
    const raw = sessionStorage.getItem(ITINERARY_KEY)
    if (!raw) return null
    return JSON.parse(raw) as SavedItinerary
  } catch {
    return null
  }
}
