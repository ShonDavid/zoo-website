import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { animals, statusRank } from '../data/animals.ts'
import { animalHaystack, localizeAnimal } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { AnimalGrid } from '../components/AnimalGrid.tsx'
import { PageHero } from '../components/PageHero.tsx'
import type { AnimalCategory, ConservationStatus, Continent } from '../types.ts'

const allCategories: AnimalCategory[] = ['Mammals', 'Birds', 'Reptiles', 'Amphibians', 'Fish']
const allContinents: Continent[] = ['Africa', 'Asia', 'Europe', 'North America', 'South America', 'Oceania', 'Antarctica']
const allStatuses: ConservationStatus[] = ['Extinct in the Wild', 'Critically Endangered', 'Endangered', 'Vulnerable', 'Near Threatened', 'Least Concern', 'Not Evaluated']

const categories: Array<AnimalCategory | 'All'> = ['All', ...allCategories.filter((item) => animals.some((animal) => animal.category === item))]
const continents: Array<Continent | 'All'> = ['All', ...allContinents.filter((item) => animals.some((animal) => animal.continents.includes(item)))]
const statuses: Array<ConservationStatus | 'All'> = ['All', ...allStatuses.filter((item) => animals.some((animal) => animal.conservationStatus === item))]

export function AnimalsPage() {
  const { t, locale, categoryLabel, continentLabel, statusLabel } = useI18n()
  useDocumentTitle(t('docAnimals'))
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const category = params.get('category') ?? 'All'
  const continent = params.get('continent') ?? 'All'
  const status = params.get('status') ?? 'All'
  const sort = params.get('sort') ?? 'name'

  function update(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (!value || value === 'All' || (key === 'sort' && value === 'name') || (key === 'q' && value === '')) next.delete(key)
    else next.set(key, value)
    setParams(next, { replace: true })
  }

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    const list = animals.filter((animal) => {
      const matchesQuery = !query || animalHaystack(animal).toLowerCase().includes(query)
      const matchesCategory = category === 'All' || animal.category === category
      const matchesContinent = continent === 'All' || animal.continents.includes(continent as Continent)
      const matchesStatus = status === 'All' || animal.conservationStatus === status
      return matchesQuery && matchesCategory && matchesContinent && matchesStatus
    })
    const collator = new Intl.Collator(locale === 'he' ? 'he' : 'en')
    list.sort((a, b) => {
      const an = localizeAnimal(a, locale).name
      const bn = localizeAnimal(b, locale).name
      if (sort === 'status') return statusRank[a.conservationStatus] - statusRank[b.conservationStatus] || collator.compare(an, bn)
      if (sort === 'name-desc') return collator.compare(bn, an)
      return collator.compare(an, bn)
    })
    return list
  }, [q, category, continent, status, sort, locale])

  return (
    <>
      <PageHero eyebrow={t('animalExplorer')} title={t('findAnimalTitle')} lede={t('findAnimalLede')} image="/images/animals/zebra.jpg" imageAlt={t('zebraAlt')} />
      <section className="section">
        <div className="wrap">
          <form className="filter-bar" onSubmit={(event) => event.preventDefault()}>
            <div className="field field-grow">
              <label htmlFor="animal-search">{t('search')}</label>
              <input id="animal-search" value={q} onChange={(event) => update('q', event.target.value)} placeholder={t('searchPlaceholder')} />
            </div>
            <div className="field">
              <label htmlFor="sort">{t('sort')}</label>
              <select id="sort" value={sort} onChange={(event) => update('sort', event.target.value)}>
                <option value="name">{t('sortAz')}</option>
                <option value="name-desc">{t('sortZa')}</option>
                <option value="status">{t('sortStatus')}</option>
              </select>
            </div>
          </form>
          <fieldset className="chip-row">
            <legend>{t('category')}</legend>
            {categories.map((item) => (
              <button key={item} type="button" className={item === category ? 'is-on' : ''} aria-pressed={item === category} onClick={() => update('category', item)}>
                {item === 'All' ? t('all') : categoryLabel(item)}
              </button>
            ))}
          </fieldset>
          <fieldset className="chip-row">
            <legend>{t('continent')}</legend>
            {continents.map((item) => (
              <button key={item} type="button" className={item === continent ? 'is-on' : ''} aria-pressed={item === continent} onClick={() => update('continent', item)}>
                {item === 'All' ? t('all') : continentLabel(item)}
              </button>
            ))}
          </fieldset>
          <fieldset className="chip-row">
            <legend>{t('status')}</legend>
            {statuses.map((item) => (
              <button key={item} type="button" className={item === status ? 'is-on' : ''} aria-pressed={item === status} onClick={() => update('status', item)}>
                {item === 'All' ? t('all') : statusLabel(item)}
              </button>
            ))}
          </fieldset>
          <p className="meta results-count" role="status">{filtered.length} {t('animalsCount')}</p>
          <AnimalGrid animals={filtered} empty={t('animalsEmpty')} />
        </div>
      </section>
    </>
  )
}
