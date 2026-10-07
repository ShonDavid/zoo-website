import { Link, useParams } from 'react-router-dom'
import { getAnimalById } from '../data/animals.ts'
import { getArticle } from '../data/news.ts'
import { localizeAnimal, localizeArticle } from '../i18n/content.ts'
import { useI18n } from '../i18n/context.tsx'
import { formatLongDate } from '../lib/format.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { Breadcrumb } from '../components/ui.tsx'
import { NotFoundPage } from './NotFoundPage.tsx'

export function NewsArticlePage() {
  const { slug = '' } = useParams()
  const { t, locale } = useI18n()
  const raw = getArticle(slug)
  const article = raw ? localizeArticle(raw, locale) : undefined
  useDocumentTitle(article?.title ?? t('docStory'))
  if (!raw || !article) return <NotFoundPage />
  const animalRaw = article.animalId ? getAnimalById(article.animalId) : undefined
  const animal = animalRaw ? localizeAnimal(animalRaw, locale) : undefined

  return (
    <article className="section">
      <div className="wrap article">
        <Breadcrumb items={[{ label: t('home'), to: '/' }, { label: t('navNews'), to: '/news' }, { label: article.title }]} />
        <p className="meta">{article.category} · {formatLongDate(raw.date)}</p>
        <h1>{article.title}</h1>
        <img src={article.image} alt={article.imageAlt} />
        {article.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
        {animal ? <Link className="btn btn-primary" to={`/animals/${animal.slug}`}>{t('visitAnimal')} {animal.name}</Link> : null}
      </div>
    </article>
  )
}
