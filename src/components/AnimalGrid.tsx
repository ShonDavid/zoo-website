import type { Animal } from '../types.ts'
import { AnimalCard } from './AnimalCard.tsx'

export function AnimalGrid({ animals, empty }: { animals: Animal[]; empty?: string }) {
  if (animals.length === 0) {
    return <p className="empty-note">{empty ?? 'No animals match those filters. Try a broader search.'}</p>
  }
  return (
    <div className="animal-grid">
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  )
}
