import { photoCredits } from '../data/credits.ts'
import { useI18n } from '../i18n/context.tsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'

export function CreditsPage() {
  const { t } = useI18n()
  useDocumentTitle(t('docCredits'))
  return (
    <section className="section">
      <div className="wrap narrow">
        <h1>{t('creditsTitle')}</h1>
        <p>{t('creditsCopy')}</p>
        <ul className="credit-list">
          {photoCredits.map((credit) => (
            <li key={credit.file}>
              <strong>{credit.subject}.</strong> {credit.artist}. <a href={credit.licenseUrl}>{credit.license}</a>.{' '}
              <a href={credit.source}>{t('source')}</a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
