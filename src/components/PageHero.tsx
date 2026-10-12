import { largeImage } from '../lib/images.ts'

export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
  imagePosition,
}: {
  eyebrow: string
  title: string
  lede: string
  image: string
  imageAlt: string
  imagePosition?: string
}) {
  return (
    <section className="page-hero">
      <img src={largeImage(image)} alt={imageAlt} fetchPriority="high" style={imagePosition ? { objectPosition: imagePosition } : undefined} />
      <div className="page-hero__shade" />
      <div className="wrap page-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </section>
  )
}
