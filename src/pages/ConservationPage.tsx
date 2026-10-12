import { useState, type FormEvent } from 'react'
import { useI18n } from '../i18n/context.tsx'
import { formatMoney } from '../lib/format.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { PageHero } from '../components/PageHero.tsx'
import { StatCard } from '../components/ui.tsx'
import type { MessageKey } from '../i18n/messages.ts'

const programs: { title: MessageKey; copy: MessageKey }[] = [
  { title: 'programField', copy: 'programFieldCopy' },
  { title: 'programEndangered', copy: 'programEndangeredCopy' },
  { title: 'programEducation', copy: 'programEducationCopy' },
  { title: 'programCare', copy: 'programCareCopy' },
  { title: 'programCity', copy: 'programCityCopy' },
  { title: 'programResearch', copy: 'programResearchCopy' },
]

export function ConservationPage() {
  const { t } = useI18n()
  useDocumentTitle(t('docConservation'))
  const [amount, setAmount] = useState(40)
  const [name, setName] = useState('')
  const [done, setDone] = useState(false)

  function submit(event: FormEvent) {
    event.preventDefault()
    if (name.trim().length < 2) return
    setDone(true)
  }

  return (
    <>
      <PageHero
        eyebrow={t('conservationEyebrow')}
        title={t('conservationPageTitle')}
        lede={t('conservationPageLede')}
        image="/images/animals/nubian-ibex.jpg"
        imageAlt={t('ibexAlt')}
      />
      <section className="section section-forest">
        <div className="wrap stat-grid">
          <StatCard value="700" label={t('statAnimals')} detail={t('statAnimalsDetail')} />
          <StatCard value="132" label={t('statSpecies')} detail={t('statSpeciesDetail')} />
          <StatCard value="130,000" label={t('statVisitors')} detail={t('statVisitorsDetail')} />
        </div>
      </section>
      <section className="section">
        <div className="wrap info-grid">
          {programs.map((program) => (
            <article key={program.title}>
              <h2>{t(program.title)}</h2>
              <p>{t(program.copy)}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section section-sand" id="support">
        <div className="wrap narrow">
          <h2>{t('supportTitle')}</h2>
          <p>{t('supportCopy')}</p>
          {done ? (
            <p role="status" className="route-note">{t('supportThanks')}, {name}. {t('supportThanksRest')}</p>
          ) : (
            <form className="support-form" onSubmit={submit}>
              <div className="choice-grid choice-grid--4">
                {[15, 40, 75, 150].map((value) => (
                  <button key={value} type="button" className={amount === value ? 'is-on' : ''} aria-pressed={amount === value} onClick={() => setAmount(value)}>
                    <strong>{formatMoney(value * 100)}</strong>
                  </button>
                ))}
              </div>
              <div className="field">
                <label htmlFor="support-name">{t('name')}</label>
                <input id="support-name" value={name} onChange={(event) => setName(event.target.value)} required />
              </div>
              <button className="btn btn-primary" type="submit">{t('supportCta')}</button>
            </form>
          )}
        </div>
      </section>
    </>
  )
}
