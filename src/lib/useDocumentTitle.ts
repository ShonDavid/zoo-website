import { useEffect } from 'react'
import { useI18n } from '../i18n/context.tsx'

export function useDocumentTitle(title: string) {
  const { t, locale } = useI18n()
  useEffect(() => {
    const brand = t('brand')
    document.title = title === brand || title === t('docHome') ? t('docHome') : `${title} · ${brand}`
  }, [title, locale, t])
}
