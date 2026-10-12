import type { NewsArticle } from '../types.ts'

export const articles: NewsArticle[] = [
  {
    id: 'oryx-return',
    slug: 'oryx-return',
    title: 'The oryx that went extinct in the wild is on the rail again',
    date: '2026-09-28',
    category: 'Conservation',
    summary: 'Scimitar-horned oryx were declared extinct in the wild. The animals in Africa Yard are part of the reason that sentence is no longer the end of the story.',
    image: '/images/animals/scimitar-oryx.jpg',
    imageAlt: 'Two scimitar-horned oryx standing on dry ground',
    animalId: 'scimitar-oryx',
    body: [
      'The horns are what people see first. Long, curved, and the reason for the name. The sign under them is the part that takes longer to read: extinct in the wild.',
      'That status is not a metaphor. The species disappeared from North Africa. What remained lived in human care. Reintroduction projects are how animals are going back to dry country that can still hold them.',
      'Africa Yard keeps the oryx beside the zebras so the comparison is honest. One herd is still common. The other is a recovery that has not finished.',
      'Saturday’s 4:00 PM talk at the same rail is the longer version. The weekday signs are enough if you only have a minute.',
    ],
  },
  {
    id: 'tamarin-crest',
    slug: 'tamarin-crest',
    title: 'A cotton-top, and about 2,000 adults left',
    date: '2026-09-12',
    category: 'Animals',
    summary: 'The white crest is the easy mark. The number on the sign is the one that should slow you down.',
    image: '/images/animals/cotton-top-tamarin.jpg',
    imageAlt: 'A cotton-top tamarin with its white crest',
    animalId: 'cotton-top-tamarin',
    body: [
      'A cotton-top tamarin weighs about as much as a small bottle of water. In the Primate House the crest shows up before the rest of the body does.',
      'An IUCN assessment published in 2021 estimated about 2,000 adults left in the wild, in northwestern Colombia. Forest cutting and the illegal pet trade are the pressures named on the sign.',
      'The group here shares the work of raising young. That is worth watching. It is also not a substitute for forest that still stands.',
      'If you are walking with children, this is a good stop on the play-page mission “an animal I did not know.” The crest does the introduction.',
    ],
  },
  {
    id: 'ibex-ledges',
    slug: 'ibex-ledges',
    title: 'Ibex on the high ledges, and a recovery that started with less hunting',
    date: '2026-08-30',
    category: 'Habitats',
    summary: 'Cliff Country is open on the steep side. The Nubian ibex using it are Vulnerable worldwide, and a local story of protection.',
    image: '/images/animals/nubian-ibex.jpg',
    imageAlt: 'A Nubian ibex walking along a rocky ledge',
    animalId: 'nubian-ibex',
    body: [
      'Cliff Country keeps the steep rock for the animals, and the path for people. The ibex use the part you are not meant to climb. The hooves are why they can.',
      'Worldwide the species is Vulnerable. In Israel, legal protection and less hunting helped the population recover. The 11:00 AM talk says that without turning the ledge into a speech.',
      'Share the rocks with the hyraxes and, if you are patient, Blanford’s fox in the shaded cracks. The hare is the one that looks like a stone until the ears move.',
      'Come from the north gate if this is your first stop. It is the short walk.',
    ],
  },
  {
    id: 'chinchilla-dust',
    slug: 'chinchilla-dust',
    title: 'A dust bath, not a water bath: the chinchillas have settled',
    date: '2026-08-04',
    category: 'Arrivals',
    summary: 'The long-tailed chinchillas are using the dust bowl in the small-mammal house. The fur that makes that necessary once made them a hunting target.',
    image: '/images/animals/chinchilla.jpg',
    imageAlt: 'A long-tailed chinchilla',
    animalId: 'chinchilla',
    body: [
      'Chinchilla fur is dense enough that dozens of hairs grow from a single follicle. Water is a poor way to clean it. Dust is the bath they actually take.',
      'That same fur is why the species was hunted. Habitat loss added to the damage. The animals in the small-mammal house are Endangered, which the sign says in one line.',
      'They share the building with guinea pigs, polecats, and the jungle cat. Give your eyes a moment. The dust bowl is the behavior worth waiting for.',
      'The keeper staff waited until the group was using the bowl in public before this note went up. They are.',
    ],
  },
]

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug || article.id === slug)
}

export function latestArticles(limit = articles.length) {
  return [...articles].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, limit)
}
