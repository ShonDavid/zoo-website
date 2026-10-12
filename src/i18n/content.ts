import { animals } from '../data/animals.ts'
import { events } from '../data/events.ts'
import { locations } from '../data/locations.ts'
import { articles } from '../data/news.ts'
import { ticketTypes } from '../data/tickets.ts'
import { playHaystack } from '../data/play.ts'
import type { Animal, NewsArticle, TicketType, ZooEvent, ZooLocation } from '../types.ts'
import { animalHe } from './animalHe.ts'
import { localeNow, type Locale } from './locale.ts'

const locationHe: Record<string, Partial<ZooLocation> & { keywords?: string[] }> = {
  'africa-yard': { name: 'חצר אפריקה', description: 'שטח פתוח לזברות, לפקארי מגוון ולראם הנבל.', hours: 'המתחם פתוח 09:00–16:45', details: ['האכלת זברות ב-12:00', 'כדאי לקרוא את השלט של הראם'], keywords: ['זברה', 'ראם', 'פקארי', 'אפריקה'] },
  'lemur-walk': { name: 'שביל הלמורים', description: 'ענפים וסלעים שטופי שמש ללמור חום וללמור זנב טבעת.', hours: 'המתחם פתוח 09:00–16:45', details: ['מפגש למורים ב-10:00', 'למור חום נמצא למעלה'], keywords: ['למור', 'פרימט', 'מדגסקר'] },
  'cliff-country': { name: 'ארץ המצוקים', description: 'סלע תלול ליעל, לשפן סלע, לשועל צוקים ולארנבת מצויה.', hours: 'המתחם פתוח 09:00–16:45', details: ['שיחת יעלים ב-11:00', 'מתחם החיות הקרוב לשער הצפוני'], keywords: ['יעל', 'שפן', 'שועל', 'ארנבת', 'מצוק'] },
  'deer-meadow': { name: 'אחו האיילים', description: 'מדשאה רחבה לאייל אדמוני, לאייל נקוד ולצבי מצוי.', hours: 'המתחם פתוח 09:00–16:45', details: ['דברו בשקט ליד הצבאים', 'רק לזכרים יש קרניים, ולא כל השנה'], keywords: ['אייל', 'צבי'] },
  'australia-yard': { name: 'חצר אוסטרליה', description: 'עשב וצל לקנגרו אדום ולוולאבי אדום-צוואר.', hours: 'המתחם פתוח 09:00–16:45', details: ['האכלת קנגרו ב-10:30', 'את הכיס קל יותר לראות כשהם עומדים'], keywords: ['קנגרו', 'וולאבי', 'אוסטרליה'] },
  'small-mammals': { name: 'יונקים קטנים', description: 'בית שקט יותר לשינשילות, לשרקנים, לחמוס מבאיש ולחתול ביצות.', hours: 'המתחם פתוח 09:00–16:45', details: ['תנו לעיניים להתרגל', 'חכו ליד אמבטיית האבק של השינשילה'], keywords: ['שינשילה', 'שרקן', 'חמוס', 'חתול'] },
  'primate-house': { name: 'בית הפרימטים', description: 'חדרים פנימיים וסלעים בחוץ לטמרין, לבבון, למקוק, לקולובוס ולקוף העכביש.', hours: 'המתחם פתוח 09:00–16:45', details: ['הציצית הלבנה נראית קודם', 'דברו בשקט בפנים'], keywords: ['קוף', 'בבון', 'טמרין', 'פרימט', 'קולובוס'] },
  'wetland-yard': { name: 'חצר המים', description: 'מים רדודים ועלי שלכת ללוטרה גמדית ולחוטמן.', hours: 'המתחם פתוח 09:00–16:45', details: ['שיחת לוטרות ב-13:30', 'חלונות בגובה ילדים'], keywords: ['לוטרה', 'חוטמן', 'מים'] },
  'reptile-house': { name: 'בית הזוחלים', description: 'גלריה חמימה ומעומעמת סביב הפיתון הבורמזי.', hours: 'פתוח 09:00–16:45', details: ['מצגת ב-14:15', 'קריר יותר מבחוץ'], keywords: ['זוחל', 'פיתון', 'נחש'] },
  'canopy-cafe': { name: 'קפה החופה', description: 'קפה, מאפים ותפריט צהריים קצר תחת גג נטוע ליד הלולאה המזרחית.', hours: '09:00–16:30', imageAlt: 'בית קפה מואר עם צמחים ושולחנות עץ', foodType: 'קפה, מאפים וצהריים קל', details: ['פינת הנקה מאחור', 'ישיבה בחוץ מול השביל'], keywords: ['קפה', 'אוכל', 'צהריים'] },
  'savanna-grill': { name: 'גריל הסוואנה', description: 'המסעדה הגדולה של הגן: מנות מהגריל, סלטים ותפריט ילדים.', hours: '11:00–16:00', imageAlt: 'חדר אוכל עם שולחנות ערוכים', foodType: 'גריל, סלטים וצלחות לילדים', details: ['ישיבה בפנים ובמרפסת מוצלת', 'כיסאות תינוק'], keywords: ['מסעדה', 'אוכל', 'צהריים'] },
  'lagoon-snacks': { name: 'חטיפי האחו', description: 'גלידה, כוסות פירות ושתייה קרה עם מבט אל אחו האיילים.', hours: '10:00–16:30', foodType: 'גלידה, פירות ושתייה קרה', details: ['שירות בדלפק', 'ספסלים מול האחו'], keywords: ['חטיף', 'גלידה', 'אוכל'] },
  'restroom-west': { name: 'שירותים מערביים', description: 'שירותים בין חצר אפריקה לבית הפרימטים.', hours: 'פתוח עם הגן', details: ['חדר משפחה נמצא ברחבה'], keywords: ['שירותים', 'שירותי'] },
  'restroom-plaza': { name: 'שירותי הרחבה', description: 'השירותים הגדולים, ליד רחבת הכניסה, עם החתלה וחדר נגיש.', hours: 'פתוח עם הגן', details: ['החתלת תינוקות', 'תא נגיש', 'ברזייה בחוץ'], keywords: ['שירותים', 'החתלה', 'נגיש'] },
  'restroom-east': { name: 'שירותים מזרחיים', description: 'שירותים ליד מגרש המשחקים, עם החתלה וכניסה בלי מדרגות.', hours: 'פתוח עם הגן', details: ['החתלת תינוקות', 'השירותים הקרובים למגרש'], keywords: ['שירותים', 'החתלה'] },
  'wonder-playground': { name: 'מגרש המשחקים', description: 'מגלשות ומתקני טיפוס לילדים, מגודרים ליד המדשאה המזרחית.', hours: 'פתוח עם הגן', imageAlt: 'מגרש משחקים עם מגלשות', details: ['בערך לגילאי 3–10', 'השירותים המזרחיים צמודים', 'מבוגר נשאר בתוך הגדר'], keywords: ['מגרש', 'ילדים', 'משחק'] },
  'discovery-den': { name: 'פינת הגילוי', description: 'סטודיו קטן ומקורה לסדנת הילדים ולמשחק שקט בימים חמים.', hours: '10:00–16:00', details: ['סדנה ב-15:00', 'מתאים בעיקר לגילאי 5–10', 'ממוזג'], keywords: ['ילדים', 'סדנה'] },
  'lakeside-amphitheater': { name: 'האמפיתיאטרון', description: 'מדשאה מוצלת בישיבה מדורגת, לסיפורי מטפלים בסוף השבוע ולתוכניות לבתי ספר.', hours: 'פתוח עם הגן', details: ['יש מערכת עזר לשמיעה', 'רוב השיחות היומיות מתקיימות במתחמים'], keywords: ['מופע', 'אירוע'] },
  'mobility-point': { name: 'נקודת ניידות', description: 'כיסאות גלגלים, מעט קלנועיות והשאלת עגלות מיד אחרי השער הראשי.', hours: 'פתוח עם הגן', details: ['כיסא גלגלים ידני ללא תשלום כנגד תעודה', 'הקלנועיות מוגבלות', 'רוב השבילים סלולים'], keywords: ['כיסא גלגלים', 'נגישות', 'עגלה'] },
  'main-gate': { name: 'השער הראשי', description: 'הכניסה הראשית משדרות גולדה מאיר, עם סריקת כרטיסים ושירותי מבקרים.', hours: 'לפי שעות הגן', details: ['הקופות נסגרות שעתיים לפני הסגירה', 'הורדה נגישה ליד השער'], keywords: ['כניסה', 'שער', 'כרטיסים'] },
  'north-gate': { name: 'השער הצפוני', description: 'כניסה שקטה יותר בצד הצפוני, הקרובה לארץ המצוקים ולשביל הלמורים.', hours: 'לפי שעות הגן', details: ['נוח למי שמגיע ברכבת', 'היעלים במרחק הליכה קצרה'], keywords: ['כניסה', 'שער'] },
  'gift-gallery': { name: 'חנות המזכרות', description: 'ספרים, מדריכי שדה ומזכרות ליד השער, בדרך החוצה.', hours: 'בשעות פתיחת הגן', details: ['אבידות ומציאות נמצאות ליד', 'עצירה קצרה בסוף המסלול'], keywords: ['חנות', 'מזכרות', 'מתנות'] },
  'first-aid': { name: 'עזרה ראשונה', description: 'חדר עזרה ראשונה מאויש ליד השער הראשי, לחתכים, עקיצות וחום.', hours: 'פתוח עם הגן', details: ['כל איש צוות יכול לקרוא לצוות', 'דפיברילטור מחוץ לדלת'], keywords: ['עזרה', 'רפואה'] },
  'lost-found': { name: 'אבידות ומציאות', description: 'שירותי המבקרים שומרים חפצים שנמצאו 30 יום. פנו לכאן אם הקבוצה נפרדה.', hours: 'פתוח עם הגן', details: ['נקודת המפגש היא סככת השער הראשי', 'בקשו מאיש צוות לקרוא בקשר'], keywords: ['אבידה', 'נמצא', 'איבוד'] },
  'water-plaza': { name: 'עמדת מים · הרחבה', description: 'עמדת מילוי בקבוקים במדשאת הכניסה.', hours: 'פתוח עם הגן', details: ['כדאי להביא בקבוק', 'ברזייה ומילוי בקבוקים'], keywords: ['מים', 'ברזייה'] },
  'water-savanna': { name: 'עמדת מים · סוואנה', description: 'עמדת מילוי בין חצר אפריקה לחצר אוסטרליה.', hours: 'פתוח עם הגן', details: ['ספסל מוצל ליד הברזייה'], keywords: ['מים', 'ברזייה'] },
  'water-coast': { name: 'עמדת מים · מזרח', description: 'עמדת מילוי בשביל המזרחי, ליד אחו האיילים.', hours: 'פתוח עם הגן', details: ['המים הקרובים לאחו ולמגרש'], keywords: ['מים', 'ברזייה'] },
}

const eventHe: Record<string, Partial<ZooEvent>> = {
  'lemur-encounter': {
    title: 'מפגש למורים',
    type: 'Encounter',
    summary: 'המטפלים קוראים ללמורים אל הסלעים ומספרים על היערות של מדגסקר.',
    description: ['זו ההזדמנות הכי טובה לראות את הזנבות המפוספסים מקרוב. הלמור החום מעדיף בדרך כלל להישאר למעלה בין הענפים.', 'עומדים לאורך המעקה הנמוך. רוצים מקום טוב? הגיעו כמה דקות לפני.'],
  },
  'kangaroo-feeding': {
    title: 'האכלת קנגרו',
    summary: 'המטפל מגיש ענפים ומסביר איך הקנגרו קופץ כל כך רחוק בלי להתעייף.',
    description: ['החצר מתמלאת מהר. בצד המוצל שקט יותר, ומשם רואים גם את הוולאבים.', 'ההאכלה מתקיימת בכל יום שהגן פתוח, גם בימי שישי.'],
  },
  'ibex-talk': {
    title: 'שיחת יעלים',
    summary: 'המטפל מראה לכם מי עומד על הסלעים הגבוהים, ואיך היעלים לא נופלים.',
    description: ['תסתכלו למעלה עוד לפני שהשיחה מתחילה. היעלים על הסלע התלול, ושפני הסלע מתחממים בשמש מתחתם.', 'בצהריים אין כאן הרבה צל, אז הבוקר נעים יותר.'],
  },
  'zebra-feeding': {
    title: 'האכלת זברות',
    summary: 'הזברות מגיעות לחציר ליד המעקה, כל כך קרוב שאפשר להשוות פסים.',
    description: ['עמדו במקומות המסומנים ותנו לעדר להתקרב אליכם.', 'ובדרך החוצה, עצרו רגע ליד השלט של ראם הנבל. בטבע הוא כבר נעלם.'],
  },
  'otter-talk': {
    title: 'שיחת מטפלי לוטרות',
    summary: 'פוגשים את הלוטרות הכי קטנות בעולם, ממש מול החלון.',
    description: ['שימו לב לכפות הקדמיות: הלוטרות מחפשות בהן אוכל במים הרדודים. החוטמנים מחטטים בעלים לידן.', 'השביל בלי מדרגות, והחלונות בגובה של ילדים.'],
  },
  'reptile-presentation': {
    title: 'מצגת זוחלים',
    summary: 'הכוכב הוא הפיתון הבורמזי: בלי ארס, עם המון שרירים, ואמא ששומרת על הביצים.',
    description: ['הבית חם וחשוך בכוונה. תנו לעיניים רגע להתרגל, ואז חפשו ליד הקיר האחורי.', 'אין צורך למהר. הפיתון לא הולך לשום מקום.'],
  },
  'childrens-workshop': {
    title: 'סדנת ילדים',
    summary: 'עקבות, זנבות ויצירה שלוקחים הביתה. לגילאי 4–10, בחינם ובלי כרטיס נוסף.',
    description: ['יש מקום לכעשרים ילדים, וההורים נשארים איתם. בין הסדנאות זו פינה ממוזגת ונעימה לשבת.'],
  },
  'oryx-story': {
    title: 'סיפור הראם',
    summary: 'שיחה קצרה בשבת על חיה שנעלמה מהטבע, ועל המאמץ להחזיר אותה הביתה.',
    description: ['בשבת בלבד, ליד הראמים בחצר אפריקה.', 'הקרניים מרשימות, אבל הסיפור שלהם מרשים עוד יותר.'],
  },
}

const articleHe: Record<string, Partial<NewsArticle>> = {
  'oryx-return': {
    title: 'ראם הנבל: נעלם מהטבע, וחוזר',
    category: 'שימור',
    summary: 'ראם הנבל הוכרז נכחד בטבע. הראמים בחצר אפריקה הם חלק מהסיבה שזה לא סוף הסיפור.',
    imageAlt: 'שני ראמי נבל עומדים על קרקע יבשה',
    body: [
      'הדבר הראשון שרואים הוא הקרניים: ארוכות, מעוקלות, וממש כמו שהשם מבטיח. על השלט שמתחתיהן כתוב משהו מפתיע יותר: נכחד בטבע.',
      'ראם הנבל נעלם לגמרי מהמדבריות של צפון אפריקה. הוא שרד רק בגני חיות ובשמורות, ומשם תוכניות השבה מחזירות אותו בהדרגה הביתה.',
      'בחצר אפריקה הראמים חיים ליד הזברות. הזברות עדיין נפוצות בטבע, והראמים רק בתחילת הדרך חזרה.',
      'רוצים לשמוע את כל הסיפור? בשבת ב-16:00 יש שיחה קצרה ליד הראמים.',
    ],
  },
  'tamarin-crest': {
    title: 'טמרין ראש כותנה: קטן, מצחיק, ונדיר מאוד',
    category: 'בעלי חיים',
    summary: 'את הציצית הלבנה אי אפשר לפספס. נשארו בטבע רק כ־2,000 כמוהו.',
    imageAlt: 'טמרין ראש כותנה עם הציצית הלבנה',
    body: [
      'טמרין ראש כותנה שוקל בערך כמו בקבוק מים קטן. בבית הפרימטים רואים קודם את הציצית, ורק אחר כך את הקוף.',
      'לפי הערכת IUCN מ־2021, נשארו בטבע רק כ־2,000 בוגרים, ביערות של צפון-מערב קולומביה. כריתת היערות וסחר לא חוקי בחיות מחמד הם הסכנות הגדולות.',
      'בקבוצה שלנו כולם עוזרים לגדל את הצעירים, וזה ממש מתוק לראות.',
      'באים עם ילדים? זו עצירה מצוינת למשימה "מצאתי חיה שלא הכרתי".',
    ],
  },
  'ibex-ledges': {
    title: 'היעלים של ארץ המצוקים',
    category: 'מתחמים',
    summary: 'אלופי הטיפוס שלנו, וסיפור הצלחה ישראלי.',
    imageAlt: 'יעל הולך על מדרגת סלע',
    body: [
      'בארץ המצוקים הסלע התלול שייך לחיות, והשביל לנו. היעלים עומדים במקומות שנראים בלתי אפשריים, והכול בזכות פרסות שאוחזות בסלע.',
      'בעולם היעל נחשב למין פגיע, אבל בישראל הוא סיפור הצלחה: בזכות ההגנה עליו והפסקת הציד, האוכלוסייה התאוששה. בשיחה ב-11:00 המטפלים מספרים על זה.',
      'על הסלעים גרים איתם גם שפני סלע, ובסדקים המוצלים, אם יש לכם סבלנות, אפשר לגלות גם שועל צוקים. והארנבת? היא נראית כמו אבן עד שהאוזניים זזות.',
      'מגיעים מהשער הצפוני? זו העצירה הראשונה, במרחק הליכה קצרה.',
    ],
  },
  'chinchilla-dust': {
    title: 'השינשילות הגיעו, ואוהבות אמבטיות אבק',
    category: 'הגעות',
    summary: 'הדיירות החדשות של בית היונקים הקטנים מתרחצות באבק, לא במים. ויש לזה סיבה טובה.',
    imageAlt: 'שינשילה ארוכת זנב',
    body: [
      'הפרווה של השינשילה כל כך צפופה, שמכל זקיק צומחות עשרות שערות. מים פשוט לא מתייבשים בה, ולכן היא מתגלגלת באבק כדי להתנקות.',
      'למרבה הצער, בגלל הפרווה הזו צדו אותן במשך שנים, ובנוסף נפגעו בתי הגידול שלהן. היום השינשילה ארוכת הזנב נמצאת בסכנת הכחדה.',
      'הן גרות בבית היונקים הקטנים, יחד עם השרקנים, החמוסים וחתול הביצות. חכו כמה רגעים ליד קערת האבק, זה שווה את זה.',
      'חיכינו לספר עליהן עד שהתרגלו לבית החדש. עכשיו הן מתגלגלות באבק בלי שום בושה.',
    ],
  },
}

const ticketHe: Record<string, Pick<TicketType, 'name' | 'description'>> = {
  adult: { name: 'מבוגר', description: 'גילאי 13–64. כל הגן, המתחמים ושיחות המטפלים.' },
  child: { name: 'ילד', description: 'גילאי 3–12. מתחת לגיל 3 נכנסים חינם עם מבוגר משלם.' },
  senior: { name: 'אזרח ותיק', description: 'גיל 65 ומעלה. אותה כניסה.' },
  student: { name: 'סטודנט', description: 'יש להציג תעודת סטודנט בתוקף בשער.' },
  family: { name: 'משפחה', description: 'שני מבוגרים ושני ילדים. חוסך ₪10 לעומת אותם כרטיסים בנפרד.' },
}

function apply<T extends { id: string }>(item: T, table: Record<string, Partial<T>>, locale: Locale) {
  if (locale !== 'he') return item
  const extra = table[item.id]
  return extra ? { ...item, ...extra } : item
}

export function localizeAnimal(animal: Animal, locale: Locale = localeNow()) {
  if (locale !== 'he') return animal
  const he = animalHe[animal.id]
  if (!he) return animal
  return {
    ...animal,
    ...he,
    images: animal.images.map((image) => ({ ...image, alt: he.name })),
  }
}

export function localizeLocation(location: ZooLocation, locale: Locale = localeNow()) {
  if (locale !== 'he') return location
  const he = locationHe[location.id]
  if (!he) return location
  return {
    ...location,
    ...he,
    keywords: [...(location.keywords ?? []), ...(he.keywords ?? [])],
  }
}

export function localizeEvent(event: ZooEvent, locale: Locale = localeNow()) {
  return apply(event, eventHe, locale)
}

export function localizeArticle(article: NewsArticle, locale: Locale = localeNow()) {
  return apply(article, articleHe, locale)
}

export function localizeTicket(ticket: TicketType, locale: Locale = localeNow()) {
  return apply(ticket, ticketHe, locale)
}

export function animalsIn(locale: Locale = localeNow()) {
  return animals.map((animal) => localizeAnimal(animal, locale))
}

export function locationsIn(locale: Locale = localeNow()) {
  return locations.map((location) => localizeLocation(location, locale))
}

export function eventsIn(locale: Locale = localeNow()) {
  return events.map((event) => localizeEvent(event, locale))
}

export function articlesIn(locale: Locale = localeNow()) {
  return articles.map((article) => localizeArticle(article, locale))
}

export function ticketsIn(locale: Locale = localeNow()) {
  return ticketTypes.map((ticket) => localizeTicket(ticket, locale))
}

export function animalHaystack(animal: Animal) {
  const he = animalHe[animal.id]
  return [animal.name, animal.scientificName, animal.category, animal.conservationStatus, animal.summary, ...animal.facts, he?.name, he?.summary, ...(he?.description ?? []), ...(he?.facts ?? []), playHaystack(animal.id)].join(' ')
}

export function eventHaystack(event: ZooEvent) {
  const he = eventHe[event.id]
  return [event.title, event.type, event.summary, he?.title, he?.summary, ...(he?.description ?? [])].join(' ')
}

export function locationHaystack(location: ZooLocation) {
  const he = locationHe[location.id]
  return [location.name, location.description, location.foodType, ...(location.keywords ?? []), ...(location.details ?? []), he?.name, he?.description, he?.foodType, ...(he?.keywords ?? []), ...(he?.details ?? [])].join(' ')
}

export function articleHaystack(article: NewsArticle) {
  const he = articleHe[article.id]
  return [article.title, article.category, article.summary, ...article.body, he?.title, he?.category, he?.summary, ...(he?.body ?? [])].join(' ')
}
