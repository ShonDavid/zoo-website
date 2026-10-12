import type { Locale } from '../i18n/locale.ts'

export interface PlayLine {
  he: string
  en: string
}

export interface PlayProfile {
  id: string
  emoji: string
  superpower: PlayLine
  label: PlayLine
  wow: boolean
}

export const playProfiles: PlayProfile[] = [
  { id: 'zebra', emoji: '🦓', superpower: { he: 'הפסים הייחודיים שלה', en: 'Stripes that belong only to her' }, label: { he: 'אלופת הפסים', en: 'Stripe champion' }, wow: false },
  { id: 'brown-lemur', emoji: '🐾', superpower: { he: 'השם שלה קשור למילה הלטינית לרוחות רפאים', en: 'Her name is tied to the Latin word for ghosts' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
  { id: 'ring-tailed-lemur', emoji: '🐒', superpower: { he: 'תקשורת עם הזנב', en: 'Talking with her tail' }, label: { he: 'מלכת הסטייל', en: 'Queen of style' }, wow: true },
  { id: 'small-clawed-otter', emoji: '🦦', superpower: { he: 'כפות ידיים זריזות', en: 'Quick, clever paws' }, label: { he: 'אלופת המים', en: 'Water champion' }, wow: false },
  { id: 'collared-peccary', emoji: '🐾', superpower: { he: 'נראה כמו חזיר קטן, אבל אינו חזיר אמיתי', en: 'Looks like a small pig, and is not a pig' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
  { id: 'cotton-top-tamarin', emoji: '🐒', superpower: { he: 'הציצית הלבנה', en: 'The white crest' }, label: { he: 'הכי קטנטן', en: 'The tiny one' }, wow: true },
  { id: 'red-deer', emoji: '🦌', superpower: { he: 'קרניים שצומחות מחדש', en: 'Antlers that grow back' }, label: { he: 'אלוף הקרניים', en: 'Antler champion' }, wow: false },
  { id: 'chital', emoji: '🐾', superpower: { he: 'הכתמים הלבנים נשארים גם אצל הבוגרים', en: 'The white spots stay on the adults' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: false },
  { id: 'cape-hare', emoji: '🐾', superpower: { he: 'שתי שכבות של שיניים חותכות בלסת העליונה', en: 'Two pairs of incisors in the upper jaw' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: false },
  { id: 'hamadryas-baboon', emoji: '🐾', superpower: { he: 'רעמה כסופה אצל הזכר הבוגר', en: 'A silver mane on the adult male' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
  { id: 'red-necked-wallaby', emoji: '🦘', superpower: { he: 'חיית כיס', en: 'A pouched animal' }, label: { he: 'הכי אוסטרלי', en: 'The Australian one' }, wow: false },
  { id: 'coati', emoji: '🦝', superpower: { he: 'אף גמיש', en: 'A flexible nose' }, label: { he: 'אלוף החיפוש', en: 'Search champion' }, wow: false },
  { id: 'polecat', emoji: '🐾', superpower: { he: 'ריח חריף מבלוטות הריח', en: 'A very sharp smell from its scent glands' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
  { id: 'jungle-cat', emoji: '🐈', superpower: { he: 'שחייה', en: 'Swimming' }, label: { he: 'חתול מפתיע', en: 'A surprising cat' }, wow: true },
  { id: 'nubian-ibex', emoji: '🐐', superpower: { he: 'טיפוס במצוקים', en: 'Climbing cliffs' }, label: { he: 'אלוף ההרים', en: 'Mountain champion' }, wow: false },
  { id: 'pig-tailed-macaque', emoji: '🐾', superpower: { he: 'זנב קצר ומעוקל כמו של חזיר', en: 'A short tail curled like a pig’s' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: false },
  { id: 'burmese-python', emoji: '🐍', superpower: { he: 'כוח השרירים', en: 'The strength of its muscles' }, label: { he: 'אלופת ההפתעות', en: 'Surprise champion' }, wow: true },
  { id: 'mountain-gazelle', emoji: '🦌', superpower: { he: 'זריזות', en: 'Speed and a sudden jump' }, label: { he: 'אלופת ישראל', en: 'Israel’s champion' }, wow: false },
  { id: 'colobus', emoji: '🐾', superpower: { he: 'בוהן מנוונת שעוזרת לאחוז בענפים', en: 'A reduced thumb that helps it grip branches' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
  { id: 'spider-monkey', emoji: '🐾', superpower: { he: 'הזנב משמש כמו יד חמישית', en: 'A tail that works as a fifth hand' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
  { id: 'red-kangaroo', emoji: '🦘', superpower: { he: 'קפיצות ענק', en: 'Enormous hops' }, label: { he: 'אלוף הקפיצות', en: 'Jumping champion' }, wow: false },
  { id: 'scimitar-oryx', emoji: '🦌', superpower: { he: 'הישרדות במדבר', en: 'Surviving the desert' }, label: { he: 'סיפור השימור', en: 'The conservation story' }, wow: true },
  { id: 'blanfords-fox', emoji: '🐾', superpower: { he: 'אחד השועלים הקטנים ביותר באזור', en: 'One of the smallest foxes in the region' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: false },
  { id: 'chinchilla', emoji: '🐭', superpower: { he: 'פרווה סופר-צפופה', en: 'Extra-dense fur' }, label: { he: 'הכי פרוותי', en: 'The furriest' }, wow: true },
  { id: 'rock-hyrax', emoji: '🪨', superpower: { he: 'טיפוס על סלעים', en: 'Climbing rocks' }, label: { he: 'אלוף המצוקים', en: 'Cliff champion' }, wow: true },
  { id: 'guinea-pig', emoji: '🐾', superpower: { he: 'לא חזיר, ולא מגיניאה', en: 'Not a pig, and not from Guinea' }, label: { he: 'חיה מיוחדת', en: 'A special animal' }, wow: true },
]

const byId = new Map(playProfiles.map((profile) => [profile.id, profile]))

export function playProfile(id: string) {
  return byId.get(id)
}

export function playText(locale: Locale, line: PlayLine) {
  return locale === 'he' ? line.he : line.en
}

export function playHaystack(id: string) {
  const profile = byId.get(id)
  if (!profile) return ''
  return [profile.superpower.he, profile.superpower.en, profile.label.he, profile.label.en].join(' ')
}

export const missions: Array<{ id: string } & PlayLine> = [
  { id: 'tail', he: 'מצאתי חיה עם זנב ארוך', en: 'I found an animal with a long tail' },
  { id: 'jump', he: 'מצאתי חיה שיכולה לקפוץ', en: 'I found an animal that can jump' },
  { id: 'leaves', he: 'מצאתי חיה שאוכלת עלים', en: 'I found an animal that eats leaves' },
  { id: 'israel', he: 'מצאתי חיה שחיה בישראל', en: 'I found an animal that lives in Israel' },
  { id: 'horns', he: 'מצאתי חיה עם קרניים', en: 'I found an animal with horns' },
  { id: 'new', he: 'מצאתי חיה שלא הכרתי', en: 'I found an animal I did not know' },
]

export const champions: Array<{ emoji: string; animalId: string; title: PlayLine; detail: PlayLine }> = [
  { emoji: '🏃', animalId: 'zebra', title: { he: 'הכי מהירה', en: 'Fastest' }, detail: { he: 'עד כ־70 קמ״ש', en: 'Up to about 70 km/h' } },
  { emoji: '🦘', animalId: 'red-kangaroo', title: { he: 'הקפיצה הכי מרשימה', en: 'Most impressive jump' }, detail: { he: 'ניתור למרחקים גדולים', en: 'Hops that cover real distance' } },
  { emoji: '🚨', animalId: 'cotton-top-tamarin', title: { he: 'הכי זקוקה לעזרה', en: 'Most in need of help' }, detail: { he: 'בסכנת הכחדה חמורה', en: 'Critically Endangered' } },
  { emoji: '🌵', animalId: 'scimitar-oryx', title: { he: 'אלופת המדבר', en: 'Desert champion' }, detail: { he: 'נכחדה בטבע', en: 'Extinct in the wild' } },
  { emoji: '🧗', animalId: 'nubian-ibex', title: { he: 'אלופת המצוקים', en: 'Cliff champion' }, detail: { he: 'פרסות מותאמות לסלעים', en: 'Hooves built for rock' } },
  { emoji: '🦦', animalId: 'small-clawed-otter', title: { he: 'הכי קטנה במשפחת הלוטרות', en: 'Smallest of the otters' }, detail: { he: 'הלוטרה הקטנה בעולם', en: 'The smallest otter in the world' } },
]

export interface PlayQuiz {
  id: string
  question: PlayLine
  answers: PlayLine[]
  correctIndex: number
  right: PlayLine
  wrong: PlayLine
}

export const quizzes: PlayQuiz[] = [
  {
    id: 'zebra-speed',
    question: { he: 'איזו מהחיות הבאות יכולה להגיע למהירות של כ־70 קמ״ש?', en: 'Which of these animals can reach about 70 km/h?' },
    answers: [
      { he: 'שפן סלע', en: 'Rock hyrax' },
      { he: 'זברה', en: 'Zebra' },
      { he: 'שינשילה', en: 'Chinchilla' },
      { he: 'לוטרה גמדית', en: 'Asian small-clawed otter' },
    ],
    correctIndex: 1,
    right: { he: 'נכון! הזברה יכולה להגיע לכ־70 קמ״ש.', en: 'Yes. A zebra can reach about 70 km/h.' },
    wrong: { he: 'כמעט! התשובה היא הזברה. זברה = מהירה מאוד.', en: 'Close. The answer is the zebra. Zebra means very fast.' },
  },
  {
    id: 'hyrax-family',
    question: { he: 'למי שפן הסלע קרוב יותר?', en: 'Who is the rock hyrax closer to?' },
    answers: [
      { he: 'ארנבת', en: 'A hare' },
      { he: 'מכרסם', en: 'A rodent' },
      { he: 'פילים ופרות ים', en: 'Elephants and manatees' },
      { he: 'יעל', en: 'An ibex' },
    ],
    correctIndex: 2,
    right: { he: 'נכון! שפן הסלע קרוב יותר לפילים ולפרות הים מאשר לארנבת.', en: 'Yes. A rock hyrax is closer to elephants and manatees than to a hare.' },
    wrong: { he: 'כמעט! שפן הסלע אינו ארנבת. הקרובים שלו הם פילים ופרות ים.', en: 'Close. A rock hyrax is not a hare. Its relatives are elephants and manatees.' },
  },
  {
    id: 'otter-size',
    question: { he: 'איזו חיה היא הלוטרה הקטנה בעולם?', en: 'Which animal is the smallest otter in the world?' },
    answers: [
      { he: 'לוטרה גמדית', en: 'Asian small-clawed otter' },
      { he: 'חוטמן', en: 'Coati' },
      { he: 'חתול ביצות', en: 'Jungle cat' },
      { he: 'שינשילה', en: 'Chinchilla' },
    ],
    correctIndex: 0,
    right: { he: 'נכון! הלוטרה הגמדית היא הלוטרה הקטנה בעולם.', en: 'Yes. The Asian small-clawed otter is the smallest otter in the world.' },
    wrong: { he: 'כמעט! הלוטרה הגמדית היא הקטנה במשפחה.', en: 'Close. The Asian small-clawed otter is the smallest in the family.' },
  },
  {
    id: 'oryx-status',
    question: { he: 'מה קרה לראם הנבל בטבע?', en: 'What happened to the scimitar-horned oryx in the wild?' },
    answers: [
      { he: 'הוא ללא חשש', en: 'It is Least Concern' },
      { he: 'הוא הוכרז נכחד בטבע', en: 'It was declared extinct in the wild' },
      { he: 'הוא חי רק בישראל', en: 'It lives only in Israel' },
      { he: 'הוא מין מבוית', en: 'It is a domestic species' },
    ],
    correctIndex: 1,
    right: { he: 'נכון! הראם הוכרז נכחד בטבע, ותוכניות השבה מנסות להחזיר אותו.', en: 'Yes. The oryx was declared extinct in the wild, and reintroduction projects are bringing it back.' },
    wrong: { he: 'כמעט! הראם הוכרז נכחד בטבע. מה שנשאר התחיל בטיפול אדם.', en: 'Close. The oryx was declared extinct in the wild. What remains started in human care.' },
  },
]

export const endangeredStatuses = ['Critically Endangered', 'Endangered', 'Vulnerable', 'Extinct in the Wild'] as const
