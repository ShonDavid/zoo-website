export function PageHero({
  eyebrow,
  title,
  lede,
  image,
  imageAlt,
}: {
  eyebrow: string
  title: string
  lede: string
  image: string
  imageAlt: string
}) {
  return (
    <section className="page-hero">
      <img src={image} alt={imageAlt} />
      <div className="page-hero__shade" />
      <div className="wrap page-hero__content">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{lede}</p>
      </div>
    </section>
  )
}
