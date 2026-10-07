import type { ZooEvent } from '../types.ts'
import { timeToMinutes } from '../lib/format.ts'
import { getHours } from '../lib/hours.ts'

export const events: ZooEvent[] = [
  {
    id: 'red-panda-encounter',
    slug: 'red-panda-encounter',
    title: 'Red Panda Encounter',
    time: '10:00',
    durationMinutes: 20,
    locationId: 'red-panda-forest',
    type: 'Encounter',
    summary: 'Keepers bring the pandas down to the lower branches and talk about the forests they come from.',
    description: [
      'The morning encounter is the reliable way to see both pandas at once. They spend the rest of the day higher in the pines.',
      'Standing room is along the lower platform. Arrive a few minutes early if you want the rail.',
    ],
    animalId: 'red-panda',
  },
  {
    id: 'penguin-feeding',
    slug: 'penguin-feeding',
    title: 'Penguin Feeding',
    time: '10:30',
    durationMinutes: 20,
    locationId: 'penguin-coast',
    type: 'Feeding',
    summary: 'Fish, one bird at a time, with a keeper explaining how king penguins hunt at sea.',
    description: [
      'The beach fills quickly. The underwater window is quieter if you would rather watch the same birds swim afterward.',
      'Feeding happens every day the zoo is open, including short holiday hours.',
    ],
    animalId: 'king-penguin',
  },
  {
    id: 'lion-talk',
    slug: 'lion-talk',
    title: 'Lion Talk',
    time: '11:00',
    durationMinutes: 25,
    locationId: 'lion-ridge',
    type: 'Talk',
    summary: 'A keeper reads the pride’s morning and points out who is who on the ridge.',
    description: [
      'You will usually see the male on the rocks and the lionesses in the grass shade. The talk stays on the lower deck.',
      'Shade is limited at midday, so this late-morning slot is the kinder one.',
    ],
    animalId: 'african-lion',
  },
  {
    id: 'giraffe-feeding',
    slug: 'giraffe-feeding',
    title: 'Giraffe Feeding',
    time: '12:00',
    durationMinutes: 20,
    locationId: 'giraffe-plains',
    type: 'Feeding',
    summary: 'Browsing from keeper poles at the lawn edge, close enough to see the tongue at work.',
    description: [
      'Stand on the marked pads and let the giraffes come to you. The rest of the lawn stays open after the feeding.',
    ],
    animalId: 'giraffe',
  },
  {
    id: 'elephant-talk',
    slug: 'elephant-talk',
    title: 'Elephant Keeper Talk',
    time: '13:30',
    durationMinutes: 25,
    locationId: 'elephant-savanna',
    type: 'Talk',
    summary: 'Meet the herd from the boardwalk: who leads, and how the new calf is doing off exhibit.',
    description: [
      'The calf born this season is still with her mother behind the valley. The rest of the herd usually comes to the pool in the afternoon.',
      'The boardwalk is step-free and wide enough for strollers.',
    ],
    animalId: 'asian-elephant',
  },
  {
    id: 'reptile-presentation',
    slug: 'reptile-presentation',
    title: 'Reptile Presentation',
    time: '14:15',
    durationMinutes: 30,
    locationId: 'reptile-house',
    type: 'Presentation',
    summary: 'Starts with the Komodo dragon and moves through how reptiles warm, wait, and hunt.',
    description: [
      'The house is warm and dim on purpose. Give your eyes a moment, then look for the tongue.',
      'The amphibian room next door is worth the extra few minutes if the frogs are the part you came for.',
    ],
    animalId: 'komodo-dragon',
  },
  {
    id: 'childrens-workshop',
    slug: 'childrens-workshop',
    title: "Children's Workshop",
    time: '15:00',
    durationMinutes: 45,
    locationId: 'discovery-den',
    type: 'Workshop',
    summary: 'Tracks, feathers, and a make-and-take for ages 4–10. Drop in — no separate ticket.',
    description: [
      'Capacity is about twenty children. Guardians stay in the room. Between sessions the den is simply a cool place to sit.',
    ],
  },
  {
    id: 'macaw-flight',
    slug: 'macaw-flight',
    title: 'Macaw Flight',
    time: '16:00',
    durationMinutes: 20,
    locationId: 'rainforest-aviary',
    type: 'Presentation',
    summary: 'A short free flight from the aviary roof on Saturday afternoon, while the zoo is still open.',
    description: [
      'Saturdays only. Friday closing is too early for this flight. The birds launch from the high perch and return to the same handlers. Stand behind the rope and keep food put away.',
    ],
    animalId: 'scarlet-macaw',
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
