import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useI18n } from '../i18n/context.tsx'
import { searchAll } from '../lib/search.ts'
import { Modal } from './Modal.tsx'
import { SearchResults } from './SearchResults.tsx'

export function SearchDialog({ onClose }: { onClose: () => void }) {
  const { t, locale } = useI18n()
  const [query, setQuery] = useState('')
  const results = useMemo(() => searchAll(query), [query, locale])

  useEffect(() => {
    const field = document.getElementById('global-search')
    if (field instanceof HTMLInputElement) field.focus()
  }, [])

  return (
    <Modal title={t('searchHaven')} titleId="search-title" onClose={onClose} className="search-modal">
      <form role="search" onSubmit={(event) => event.preventDefault()}>
        <label className="sr-only" htmlFor="global-search">{t('searchHint')}</label>
        <input
          id="global-search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('searchPlaceholderGlobal')}
          autoComplete="off"
        />
      </form>
      <div className="modal__scroll">
        <SearchResults results={results} onNavigate={onClose} />
        {query.trim() ? (
          <Link className="text-link" to={`/search?q=${encodeURIComponent(query.trim())}`} onClick={onClose}>
            {t('fullSearch')}
          </Link>
        ) : null}
      </div>
    </Modal>
  )
}
