import type { NewsArticle } from '../types.ts'

export const articles: NewsArticle[] = [
  {
    id: 'elephant-calf',
    slug: 'elephant-calf',
    title: 'A calf is born in Elephant Valley',
    date: '2026-09-28',
    category: 'Animals',
    summary:
      'Just after dawn, the herd stood guard while a female calf found her feet. She will stay off exhibit with her mother for the next few weeks.',
    image: '/images/elephant-sunset.jpg',
    imageAlt: 'Two elephants on a green plain under a pink sunset',
    animalId: 'asian-elephant',
    body: [
      'Keepers had been watching the dates for a month. In the small hours of 28 September the herd closed in, the way elephant families do, and by sunrise a female calf was on her feet and nursing.',
      'She will not be on the public boardwalk yet. The first weeks belong to her mother, the older females, and a quiet yard behind Elephant Valley. You may still see the rest of the herd at the pool — they have been coming forward in the afternoons.',
      'Asian elephants are endangered. A birth here is good news, and it is also a reminder of the slower work: forest corridors, conflict on farms, and the field projects your ticket already supports.',
      'We will share her name, and the first public viewing window, when the keepers say she is ready. Until then, the 13:30 keeper talk is the best place to ask how she is doing.',
    ],
  },
  {
    id: 'tiger-habitat',
    slug: 'tiger-habitat',
    title: 'Tiger Temple opens after a year of building',
    date: '2026-09-12',
    category: 'Habitats',
    summary:
      'Rock, deep shade, and a pool long enough to swim. The Bengal tigers have a new home on the highland loop.',
    image: '/images/tiger-2.jpg',
    imageAlt: 'Tiger standing on sunlit rocks',
    animalId: 'bengal-tiger',
    body: [
      'Tiger Temple is open. The old yard was safe and tired. The new one gives the tigers height, water, and enough ground that a resting cat can actually disappear for a while.',
      'The east rail is the best view of the pool. On warm afternoons that is where they go. Mornings are better for the upper rocks, where the stripes break up against the stone.',
      'Building it took a year, most of it while the tigers stayed in their off-exhibit woods. Nothing about the move was rushed. The first week on exhibit, they slept. The second week, they swam.',
      'If you have not walked the highland loop since last season, start at Snow Cliffs and come down through the pandas to the temple. It is the long way, and it is the right one.',
    ],
  },
  {
    id: 'snow-leopard-arrival',
    slug: 'snow-leopard-arrival',
    title: 'A snow leopard arrives from the highland programme',
    date: '2026-08-30',
    category: 'Arrivals',
    summary:
      'She came in quietly, spent ten days behind the scenes, and has now claimed the top ledge at Snow Cliffs.',
    image: '/images/snow-leopard.jpg',
    imageAlt: 'Snow leopard standing on snow-covered rocks',
    animalId: 'snow-leopard',
    body: [
      'The new snow leopard is a three-year-old female, moved as part of a managed programme that keeps the captive population healthy and supports field work in Central Asia.',
      'She spent her first days out of sight, which is what we wanted. Snow leopards do not settle by being watched. This week she started using the top ledge in the morning and the shaded shelf after lunch.',
      'Come slowly. Check the high rocks before you decide the habitat is empty. The coat is built for exactly that mistake.',
      'A portion of highland-habitat tickets this season is tagged for camera traps on a partner reserve. The pavilion has the map if you want to see where.',
    ],
  },
  {
    id: 'penguin-shores',
    slug: 'penguin-shores',
    title: 'Nest boxes, not just a feeding: a penguin project update',
    date: '2026-08-04',
    category: 'Conservation',
    summary:
      'Meridian’s king penguin colony is thriving. The field project it funds is about African penguins and the beaches they are losing.',
    image: '/images/penguin.jpg',
    imageAlt: 'King penguins on a rocky shore beside blue water',
    animalId: 'king-penguin',
    body: [
      'The 10:30 feeding is the crowd-pleaser. The work behind it is quieter: a partnership with a colony project on the South African coast, where African penguins have lost nesting habitat to fishing pressure and a changing sea.',
      'The king penguins at Chai-Kef are not the birds on those beaches. The feeding talk now includes two minutes on African penguins and the nesting beaches they are losing.',
      'Eighty boxes went in before the breeding season. Early counts say more pairs are using them than the project’s first year. It is a small shoreline and a real one.',
      'If you want the longer version, the Conservation Pavilion loops a four-minute film from the site, without the soundtrack turned up.',
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug || article.id === slug)
}

export function latestArticles(limit = articles.length) {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit)
}
