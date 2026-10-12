import type { ZooEvent } from '../types.ts'
import { timeToMinutes } from '../lib/format.ts'
import { getHours } from '../lib/hours.ts'

export const events: ZooEvent[] = [
  {
    id: 'lemur-encounter',
    slug: 'lemur-encounter',
    title: 'Lemur Encounter',
    time: '10:00',
    durationMinutes: 20,
    locationId: 'lemur-walk',
    type: 'Encounter',
    summary: 'Keepers call the ring-tailed lemurs onto the sunny rocks and talk about the forests they come from.',
    description: [
      'The morning encounter is the reliable way to see the striped tails up close. Brown lemurs often stay higher in the branches.',
      'Standing room is along the lower rail. Arrive a few minutes early if you want that spot.',
    ],
    animalId: 'ring-tailed-lemur',
  },
  {
    id: 'kangaroo-feeding',
    slug: 'kangaroo-feeding',
    title: 'Kangaroo Feeding',
    time: '10:30',
    durationMinutes: 20,
    locationId: 'australia-yard',
    type: 'Feeding',
    summary: 'A keeper offers browse and explains how a red kangaroo’s hop actually saves energy.',
    description: [
      'The yard fills quickly. The shaded side is calmer if you would rather watch the wallabies afterward.',
      'Feeding happens every day the zoo is open, including short holiday hours.',
    ],
    animalId: 'red-kangaroo',
  },
  {
    id: 'ibex-talk',
    slug: 'ibex-talk',
    title: 'Ibex Talk',
    time: '11:00',
    durationMinutes: 25,
    locationId: 'cliff-country',
    type: 'Talk',
    summary: 'A keeper points out who is on the high ledges, and why the hooves can stay there.',
    description: [
      'Look up before the talk starts. The ibex use the steepest rock, and the hyraxes pile onto the sunny shelves below them.',
      'Shade is limited at midday, so this late-morning slot is the kinder one.',
    ],
    animalId: 'nubian-ibex',
  },
  {
    id: 'zebra-feeding',
    slug: 'zebra-feeding',
    title: 'Zebra Feeding',
    time: '12:00',
    durationMinutes: 20,
    locationId: 'africa-yard',
    type: 'Feeding',
    summary: 'Hay at the rail, close enough to compare stripe patterns, with the oryx usually nearby.',
    description: [
      'Stand on the marked pads and let the herd come to the feed. The rest of the yard stays open after the feeding.',
      'The scimitar-horned oryx sign is worth the extra minute. That species was declared extinct in the wild.',
    ],
    animalId: 'zebra',
  },
  {
    id: 'otter-talk',
    slug: 'otter-talk',
    title: 'Otter Keeper Talk',
    time: '13:30',
    durationMinutes: 25,
    locationId: 'wetland-yard',
    type: 'Talk',
    summary: 'Meet the smallest otters in the world from the low windows, paws first.',
    description: [
      'The interesting part is the front paws searching the shallows, not a long dive. Coatis work the leaf litter next door.',
      'The path is step-free and the windows are set at child height.',
    ],
    animalId: 'small-clawed-otter',
  },
  {
    id: 'reptile-presentation',
    slug: 'reptile-presentation',
    title: 'Reptile Presentation',
    time: '14:15',
    durationMinutes: 30,
    locationId: 'reptile-house',
    type: 'Presentation',
    summary: 'Starts with the Burmese python: no venom, a great deal of muscle, and a mother who guards the eggs.',
    description: [
      'The house is warm and dim on purpose. Give your eyes a moment, then look along the back wall.',
      'The talk stays with this one snake. There is no need to rush the room.',
    ],
    animalId: 'burmese-python',
  },
  {
    id: 'childrens-workshop',
    slug: 'childrens-workshop',
    title: "Children's Workshop",
    time: '15:00',
    durationMinutes: 45,
    locationId: 'discovery-den',
    type: 'Workshop',
    summary: 'Tracks, tails, and a make-and-take for ages 4–10. Drop in — no separate ticket.',
    description: [
      'Capacity is about twenty children. Guardians stay in the room. Between sessions the den is simply a cool place to sit.',
    ],
  },
  {
    id: 'oryx-story',
    slug: 'oryx-story',
    title: 'Oryx Story',
    time: '16:00',
    durationMinutes: 20,
    locationId: 'africa-yard',
    type: 'Talk',
    summary: 'A short Saturday talk about an animal declared extinct in the wild, and the work of bringing it back.',
    description: [
      'Saturdays only. Friday closing is too early for this talk. It happens at the oryx rail in Africa Yard.',
      'The horns are the easy part. The word on the sign — extinct in the wild — is the part worth staying for.',
    ],
    animalId: 'scimitar-oryx',
    days: [6],
  },
]

export function sortedEvents(list: ZooEvent[] = events) {
  return [...list].sort((a, b) => timeToMinutes(a.time) - timeToMinutes(b.time))
}

export function eventsOn(date: Date) {
  const day = date.getDay()
  const hours = getHours(date)
  const close = hours.close ? timeToMinutes(hours.close) : 24 * 60
  return sortedEvents(
    events.filter((event) => {
      if (event.days && !event.days.includes(day)) return false
      if (hours.closed) return false
      return timeToMinutes(event.time) < close
    }),
  )
}

export function getEvent(slug: string) {
  return events.find((event) => event.slug === slug || event.id === slug)
}

export function getEventById(id: string) {
  return events.find((event) => event.id === id)
}
