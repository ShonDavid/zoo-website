export function Ridge({ tone, flip = false }: { tone: 'cream' | 'sand' | 'forest' | 'moss'; flip?: boolean }) {
  return (
    <svg className={`ridge ridge--${tone}${flip ? ' ridge--flip' : ''}`} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 28 1440 0v40H0Z" />
    </svg>
  )
}
