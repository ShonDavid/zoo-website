import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { animals } from '../data/animals.ts'
import { getLocation } from '../data/locations.ts'
import { champions, endangeredStatuses, missions, playProfile, playText, quizzes } from '../data/play.ts'
import { localizeAnimal, localizeLocation } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { Modal } from '../components/Modal.tsx'
import type { ConservationStatus } from '../types.ts'

const MISSION_KEY = 'chai-kef.missions'

function readMissions() {
  try {
    const raw = localStorage.getItem(MISSION_KEY)
    const parsed: unknown = raw ? JSON.parse(raw) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is string => typeof item === 'string')
  } catch {
    return []
  }
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function PlayPage() {
  const { t, locale, statusLabel } = useI18n()
  useDocumentTitle(t('docPlay'))
  const [done, setDone] = useState<string[]>(readMissions)
  const [query, setQuery] = useState('')
  const [filter, setFilter] = useState<'all' | 'help' | 'wow'>('all')
  const [openId, setOpenId] = useState<string | null>(null)
  const [quizIndex, setQuizIndex] = useState(0)
  const [picked, setPicked] = useState<number | null>(null)

  useEffect(() => {
    localStorage.setItem(MISSION_KEY, JSON.stringify(done))
  }, [done])

  const quiz = quizzes[quizIndex] ?? quizzes[0]
  const openRaw = openId ? animals.find((animal) => animal.id === openId) : undefined
  const openAnimal = openRaw ? localizeAnimal(openRaw, locale) : undefined
  const openPlay = openId ? playProfile(openId) : undefined
  const openPlace = openAnimal ? getLocation(openAnimal.locationId) : undefined
  const openLocation = openPlace ? localizeLocation(openPlace, locale) : undefined

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    return animals.filter((animal) => {
      const profile = playProfile(animal.id)
      const shown = localizeAnimal(animal, locale)
      if (filter === 'help' && !endangeredStatuses.includes(animal.conservationStatus as (typeof endangeredStatuses)[number])) return false
      if (filter === 'wow' && !profile?.wow) return false
      if (!q) return true
      const haystack = [shown.name, animal.name, animal.scientificName, profile ? playText(locale, profile.superpower) : '', profile ? playText(locale, profile.label) : ''].join(' ').toLowerCase()
      return haystack.includes(q)
    })
  }, [filter, locale, query])
  const searching = filter !== 'all' || query.trim() !== ''

  function toggleMission(id: string) {
    setDone((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }

  function showOnly(next: 'help' | 'wow') {
    setFilter(next)
    setQuery('')
    scrollToId('play-animals')
  }

  function answer(index: number) {
    if (picked !== null || !quiz) return
    setPicked(index)
  }

  function nextQuiz() {
    setQuizIndex((index) => (index + 1) % quizzes.length)
    setPicked(null)
  }

  const progress = Math.round((done.length / missions.length) * 100)

  return (
    <div className="play">
      <header className="play-hero">
        <div className="wrap play-hero__inner">
          <p className="play-hero__logo">{t('playEyebrow')}</p>
          <img className="play-hero__float" src="/images/animals/red-kangaroo.jpg" alt="" />
          <h1>{t('playTitle')}</h1>
          <p className="play-hero__lede">{t('playLede')}</p>
          <div className="play-hero__actions">
            <button type="button" className="play-cta play-cta--primary" onClick={() => scrollToId('play-quiz')}>{t('playStart')}</button>
            <button type="button" className="play-cta" onClick={() => showOnly('wow')}>{t('playSeeAnimals')}</button>
          </div>
        </div>
      </header>

      <div className="wrap">
        <section className="play-section" aria-labelledby="play-mission-title">
          <div className="play-head">
            <h2 id="play-mission-title">{t('playMissionTitle')}</h2>
            <p>{t('playMissionLede')}</p>
          </div>
          <div className="play-mission">
            <h3>{t('playMissionName')}</h3>
            <div className="play-progress" role="progressbar" aria-valuenow={done.length} aria-valuemin={0} aria-valuemax={missions.length} aria-label={t('playMissionName')}>
              <span style={{ width: `${progress}%` }} />
            </div>
            <p><b>{done.length} / {missions.length}</b> {t('playMissionProgress')}</p>
            <ul className="play-mission__grid">
              {missions.map((mission) => {
                const on = done.includes(mission.id)
                return (
                  <li key={mission.id}>
                    <button type="button" className={on ? 'is-on' : ''} aria-pressed={on} onClick={() => toggleMission(mission.id)}>
                      <span aria-hidden="true">{on ? '☑' : '☐'}</span> {playText(locale, mission)}
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="play-section" aria-labelledby="play-champions-title">
          <div className="play-head">
            <h2 id="play-champions-title">{t('playChampionsTitle')}</h2>
            <p>{t('playChampionsLede')}</p>
          </div>
          <div className="play-champions">
            {champions.map((champion) => {
              const animal = animals.find((item) => item.id === champion.animalId)
              if (!animal) return null
              const shown = localizeAnimal(animal, locale)
              return (
                <button key={champion.animalId} type="button" className="play-champion" onClick={() => setOpenId(animal.id)}>
                  <img className="play-champion__photo" src={shown.images[0]?.src} alt="" />
                  <h3>{playText(locale, champion.title)}</h3>
                  <p><b>{shown.name}</b> · {playText(locale, champion.detail)}</p>
                  <span className="play-champion__more">{t('playDiscover')}</span>
                </button>
              )
            })}
          </div>
        </section>

        <section id="play-quiz" className="play-section play-quiz" aria-labelledby="play-quiz-title">
          {quiz ? (
            <>
              <h2 id="play-quiz-title">{t('playQuizTitle')}</h2>
              <p className="play-quiz__q">{playText(locale, quiz.question)}</p>
              <div className="play-answers">
                {quiz.answers.map((choice, index) => {
                  const state = picked === null ? '' : index === quiz.correctIndex ? 'is-right' : index === picked ? 'is-wrong' : ''
                  return (
                    <button key={choice.en} type="button" className={`play-answer ${state}`} disabled={picked !== null} onClick={() => answer(index)}>
                      {playText(locale, choice)}
                    </button>
                  )
                })}
              </div>
              <p className="play-quiz__result" role="status">
                {picked === null ? '' : playText(locale, picked === quiz.correctIndex ? quiz.right : quiz.wrong)}
              </p>
              {picked !== null ? (
                <button type="button" className="play-cta" onClick={nextQuiz}>{t('playAnother')}</button>
              ) : null}
            </>
          ) : null}
        </section>

        <section className="play-section" aria-labelledby="play-explore-title">
          <div className="play-head">
            <h2 id="play-explore-title">{t('playExploreTitle')}</h2>
            <p>{t('playExploreLede')}</p>
          </div>
          <div className="play-explore">
            <button type="button" className="play-explore__card play-explore__card--help" onClick={() => showOnly('help')}>
              <h3>{t('playHelpTitle')}</h3>
              <p>{t('playHelpCopy')}</p>
              <b>{t('playHelpCta')}</b>
            </button>
            <button type="button" className="play-explore__card play-explore__card--wow" onClick={() => showOnly('wow')}>
              <h3>{t('playWowTitle')}</h3>
              <p>{t('playWowCopy')}</p>
              <b>{t('playWowCta')}</b>
            </button>
          </div>
        </section>

        <section id="play-animals" className="play-section" aria-labelledby="play-animals-title">
          <div className="play-head">
            <h2 id="play-animals-title">{t('playAnimalsTitle')}</h2>
            <p>{t('playAnimalsLede')}</p>
          </div>
          <form className="play-search" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="play-search">{t('playSearch')}</label>
            <input id="play-search" type="search" value={query} placeholder={t('playSearch')} onChange={(event) => setQuery(event.target.value)} />
            <div className="play-chips">
              {(['help', 'wow'] as const).map((key) => (
                <button key={key} type="button" className="play-chip" aria-pressed={filter === key} onClick={() => setFilter(filter === key ? 'all' : key)}>
                  {t(key === 'help' ? 'playChipHelp' : 'playChipWow')}
                </button>
              ))}
            </div>
          </form>
          {searching ? (
            visible.length ? (
              <ul className="play-tiles" aria-live="polite">
                {visible.map((animal) => {
                  const shown = localizeAnimal(animal, locale)
                  return (
                    <li key={animal.id}>
                      <button type="button" className="play-tile" onClick={() => setOpenId(animal.id)}>
                        {shown.images[0] ? <img src={shown.images[0].src} alt="" loading="lazy" /> : <span className="play-tile__blank" aria-hidden="true" />}
                        <span>{shown.name}</span>
                      </button>
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className="play-finder__hint" role="status">{t('playEmpty')}</p>
            )
          ) : (
            <p className="play-finder__hint">{t('playFinderHint')}</p>
          )}
          <Link className="play-finder__all" to="/animals">{t('playAllAnimals')}</Link>
        </section>
      </div>

      {openAnimal && openRaw ? (
        <Modal title={openAnimal.name} titleId="play-animal-title" onClose={() => setOpenId(null)} className="play-modal">
          <div className="modal__scroll play-dialog">
            {openAnimal.images[0] ? <img className="play-dialog__photo" src={openAnimal.images[0].src} alt="" /> : null}
            <p className="scientific">{openAnimal.scientificName}</p>
            <p className="meta">{statusLabel(openAnimal.conservationStatus as ConservationStatus)}</p>
            {openPlay ? <p className="play-fun"><b>{t('playSuperpower')}:</b> {playText(locale, openPlay.superpower)}</p> : null}
            <dl className="play-facts">
              <div><dt>{t('weight')}</dt><dd>{openAnimal.weight}</dd></div>
              <div><dt>{t('lifespan')}</dt><dd>{openAnimal.lifespan}</dd></div>
              <div><dt>{t('size')}</dt><dd>{openAnimal.size}</dd></div>
              <div><dt>{t('range')}</dt><dd>{openAnimal.distribution}</dd></div>
              <div><dt>{t('habitat')}</dt><dd>{openAnimal.habitat}</dd></div>
              <div><dt>{t('diet')}</dt><dd>{openAnimal.diet}</dd></div>
            </dl>
            <h3>{t('playFactsTitle')}</h3>
            <ul>
              {openAnimal.facts.map((fact) => <li key={fact}>{fact}</li>)}
            </ul>
            <h3>{t('playWhy')}</h3>
            {openAnimal.description.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <div className="play-dialog__actions">
              <Link className="btn btn-primary" to={`/animals/${openAnimal.slug}`}>{t('playFullProfile')}</Link>
              {openLocation ? <Link className="btn btn-secondary" to={`/map?place=${openLocation.id}`}>{t('showOnMap')}</Link> : null}
            </div>
          </div>
        </Modal>
      ) : null}
    </div>
  )
}
