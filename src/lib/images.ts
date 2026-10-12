const LARGE = new Set([
  'brown-lemur',
  'cape-hare',
  'chinchilla',
  'chital',
  'collared-peccary',
  'cotton-top-tamarin',
  'guinea-pig',
  'hamadryas-baboon',
  'jungle-cat',
  'nubian-ibex',
  'polecat',
  'red-deer',
  'red-kangaroo',
  'red-necked-wallaby',
  'ring-tailed-lemur',
  'scimitar-oryx',
  'small-clawed-otter',
  'zebra',
])

/** Wide-banner version of an animal photo, when a sharper file is available in /images/animals/large/. */
export function largeImage(src: string) {
  const match = /^\/images\/animals\/([\w-]+)\.jpg$/.exec(src)
  return match && LARGE.has(match[1]) ? `/images/animals/large/${match[1]}.jpg` : src
}
