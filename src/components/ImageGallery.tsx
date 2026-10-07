import { useState } from 'react'
import type { GalleryImage } from '../types.ts'

export function ImageGallery({ images, name }: { images: GalleryImage[]; name: string }) {
  const [active, setActive] = useState(0)
  const current = images[active] ?? images[0]
  if (!current) return null

  return (
    <div className="gallery">
      <figure>
        <img src={current.src} alt={current.alt} />
        <figcaption className="sr-only">{current.alt}</figcaption>
      </figure>
      {images.length > 1 ? (
        <div className="gallery__thumbs" role="tablist" aria-label={`${name} photos`}>
          {images.map((image, index) => (
            <button
              key={image.src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show photo ${index + 1}`}
              className={index === active ? 'is-active' : ''}
              onClick={() => setActive(index)}
            >
              <img src={image.src} alt="" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  )
}
