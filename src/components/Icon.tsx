type IconName =
  | 'search'
  | 'menu'
  | 'close'
  | 'ticket'
  | 'paw'
  | 'food'
  | 'restroom'
  | 'kids'
  | 'calendar'
  | 'access'
  | 'pin'
  | 'clock'
  | 'map'
  | 'plus'
  | 'minus'
  | 'water'
  | 'gift'
  | 'medical'
  | 'gate'
  | 'chevron'
  | 'check'
  | 'home'
  | 'arrow'
  | 'language'

const paths: Record<IconName, string> = {
  search: 'M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16Zm10 2-4.3-4.3',
  menu: 'M4 7h16M4 12h16M4 17h16',
  close: 'M6 6l12 12M18 6 6 18',
  ticket: 'M4 8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v2a2 2 0 0 0 0 4v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a2 2 0 0 0 0-4V8Z',
  paw: 'M8 10a1.6 1.6 0 1 0 0-3.2A1.6 1.6 0 0 0 8 10Zm4.2-1.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm4 1.2a1.6 1.6 0 1 0 0-3.2 1.6 1.6 0 0 0 0 3.2ZM7.2 13.2c-1.6 1.2-2.2 3.4-.8 4.6 1.2 1 3 .4 4.1-.8 1.1 1.2 2.9 1.8 4.1.8 1.4-1.2.8-3.4-.8-4.6-1.2-.8-2.6-.4-3.3.6-.7-1-2.1-1.4-3.3-.6Z',
  food: 'M6 3v8a2 2 0 0 0 2 2v8M8 3v6M10 3v6M18 3c-2 3-2 6 0 8v10',
  restroom: 'M9 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm6 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM7 21v-5l2-4h2l-1 9M15 21v-6h3l1-4h-5l1 4',
  kids: 'M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 1a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM4 20v-1a4 4 0 0 1 4-4h1M14 15h1a4 4 0 0 1 4 4v1',
  calendar: 'M5 6h14v14H5V6Zm0 4h14M8 4v4M16 4v4',
  access: 'M12 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-7 9 3.2-4.2a2 2 0 0 1 1.6-.8H14M16 13h4M18 11v4M8 21l2-6',
  pin: 'M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2',
  map: 'M9 18 3 20V6l6-2 6 2 6-2v14l-6 2-6-2V4',
  plus: 'M12 5v14M5 12h14',
  minus: 'M5 12h14',
  water: 'M12 3s6 6.2 6 10a6 6 0 0 1-12 0c0-3.8 6-10 6-10Z',
  gift: 'M4 10h16v10H4V10Zm8 0v10M4 10c0-3 2.2-4 4-4 2.2 0 3.2 2 4 4-1 0-4 0-4 0Zm8 0c.8-2 1.8-4 4-4 1.8 0 4 1 4 4',
  medical: 'M5 8h14v11H5V8Zm7-4v6M8 7h8',
  gate: 'M4 20V8l8-4 8 4v12M4 12h16M12 8v12',
  chevron: 'm9 6 6 6-6 6',
  check: 'm5 12 5 5L20 7',
  home: 'M4 11 12 4l8 7v9H4v-9Z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  language: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18ZM3.2 12h17.6M12 3c2.3 2.5 3.5 5.6 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.6-3.5-9s1.2-6.5 3.5-9Z',
}

export function Icon({ name, size = 22 }: { name: IconName; size?: number }) {
  const fillIcons = new Set<IconName>(['paw'])
  return (
    <svg
      className="icon"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      fill={fillIcons.has(name) ? 'currentColor' : 'none'}
      stroke={fillIcons.has(name) ? 'none' : 'currentColor'}
      strokeWidth={fillIcons.has(name) ? 0 : 1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={paths[name]} />
    </svg>
  )
}

export function categoryIcon(category: string): IconName {
  switch (category) {
    case 'animals':
      return 'paw'
    case 'food':
      return 'food'
    case 'restrooms':
      return 'restroom'
    case 'kids':
      return 'kids'
    case 'events':
      return 'calendar'
    case 'accessibility':
      return 'access'
    case 'facilities':
      return 'gate'
    default:
      return 'pin'
  }
}
