import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { searchAll } from '../lib/search.ts'
import { useDocumentTitle } from '../lib/useDocumentTitle.ts'
import { SearchResults } from '../components/SearchResults.tsx'

export function SearchPage() {
  const { t, locale } = useI18n()
  useDocumentTitle(t('docSearch'))
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const results = useMemo(() => searchAll(query), [query, locale])

  return (
    <section className="section">
      <div className="wrap narrow">
        <h1>{t('searchTitle')}</h1>
        <form role="search" onSubmit={(event) => event.preventDefault()}>
          <label htmlFor="page-search">{t('searchLabel')}</label>
          <input
            id="page-search"
            value={query}
            onChange={(event) => {
              const next = new URLSearchParams(params)
              if (event.target.value) next.set('q', event.target.value)
              else next.delete('q')
              setParams(next, { replace: true })
            }}
          />
        </form>
        <SearchResults results={results} />
      </div>
    </section>
  )
}
