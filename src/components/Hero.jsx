import hero from '../assets/images/hero.webp'
import Icon from './Icon.jsx'
import FoodImage from './FoodImage.jsx'

export default function Hero({ onNavigate }) {
  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-copy">
        <p className="eyebrow">
          <span className="tiny-star" aria-hidden="true">
            ✳
          </span>{' '}
          BIG FLAVOURS. LITTLE BREAKS.
        </p>
        <h1 id="hero-heading">
          Good food.
          <br />
          Great <span className="hero-accent">company.</span>
        </h1>
        <p className="hero-description">
          For the study breaks, the catch-ups, and the
          <br className="desktop-break" /> just-one-more-bite moments. Find your happy plate.
        </p>
        <a
          className="button button-primary hero-cta"
          href="#menu"
          onClick={(event) => onNavigate?.(event, 'menu')}
        >
          Explore the menu <Icon name="arrow" />
        </a>
        <div className="hero-note">
          <Icon name="heart" /> A little something for every craving
        </div>
      </div>
      <div className="hero-visual">
        <FoodImage
          src={hero}
          alt=""
          width={1000}
          height={850}
          loading="eager"
          fetchPriority="high"
        />
        <span className="hero-sticker">
          <span aria-hidden="true">✳</span> MADE FOR
          <br />
          YOUR BREAK
        </span>
        <div className="hero-caption">
          <span className="caption-icon">
            <Icon name="pizza" />
          </span>
          <div>
            <strong>A slice of the good life</strong>
            <span>Your next favourite is right here.</span>
          </div>
        </div>
      </div>
    </section>
  )
}
