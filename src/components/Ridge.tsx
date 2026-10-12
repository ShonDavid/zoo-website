export function Ridge({ tone, flip = false }: { tone: 'cream' | 'sand' | 'forest' | 'moss'; flip?: boolean }) {
  return (
    <svg className={`ridge ridge--${tone}${flip ? ' ridge--flip' : ''}`} viewBox="0 0 1440 40" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 22C200 6 380 2 580 10S1000 28 1180 22 1360 8 1440 4V40H0Z" />
    </svg>
  )
}
