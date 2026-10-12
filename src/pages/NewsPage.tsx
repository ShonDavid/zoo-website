import { Link } from 'react-router-dom'
import { articles } from '../data/news.ts'
import { localizeArticle } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatShortDate } from '../lib/format.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { PageHero } from '../components/PageHero.tsx'

export function NewsPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t('docNews'))
  const sorted = articles.slice().sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <PageHero eyebrow={t('newsEyebrow')} title={t('newsTitle')} lede={t('newsLede')} image="/images/animals/collared-peccary.jpg" imageAlt={t('peccaryAlt')} imagePosition="50% 62%" />
      <section className="section">
        <div className="wrap news-grid">
          {sorted.map((article) => {
            const shown = localizeArticle(article, locale)
            return (
              <article key={article.id} className="news-card">
                <Link to={`/news/${article.slug}`}><img src={article.image} alt={shown.imageAlt} loading="lazy" /></Link>
                <div>
                  <p className="meta">{shown.category} · {formatShortDate(article.date)}</p>
                  <h2><Link to={`/news/${article.slug}`}>{shown.title}</Link></h2>
                  <p>{shown.summary}</p>
                </div>
              </article>
            )
          })}
        </div>
      </section>
    </>
  )
}
