import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'

export function NotFoundPage() {
  const { t } = useI18n()
  useDocumentTitle(t('docMissing'))
  return (
    <section className="section">
      <div className="wrap narrow center-copy">
        <p className="eyebrow">{t('lostEyebrow')}</p>
        <h1>{t('lostTitle')}</h1>
        <p>{t('lostCopy')}</p>
        <div className="hero__actions center-actions">
          <Link className="btn btn-primary" to="/">{t('backHome')}</Link>
          <Link className="btn btn-dark" to="/map">{t('openMap')}</Link>
        </div>
      </div>
    </section>
  )
}
