import TelegramLink from "./TelegramLink";
import HeroFilm from "./HeroFilm";

export default function Hero() {
  return <>
    <section className="hero" id="home" aria-labelledby="hero-title">
      <picture className="hero-image">
        <source media="(max-width: 640px)" srcSet="/media/hero-poster-640.webp 640w, /media/hero-poster-960.webp 960w" sizes="100vw" />
        <img src="/media/hero-poster.webp" srcSet="/media/hero-poster-960.webp 960w, /media/hero-poster.webp 1800w" sizes="100vw" width={1800} height={1013} alt="" fetchPriority="high" />
      </picture>
      <HeroFilm />
      <div className="hero-shade" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">Accelerate<br />AI transformation<br /><span>across your business.</span></h1>
          <p className="hero-lead">Century connects your knowledge, systems and people to turn AI ambition into everyday progress.</p>
          <div className="hero-actions"><TelegramLink className="btn btn-light">Get in touch</TelegramLink><a className="btn btn-outline-light" href="/ai-os/">Explore the platform</a></div>
        </div>
      </div>
    </section>
    <div className="principles-strip"><div className="shell principles-inner">
      <p>One connected approach to enterprise AI.</p>
      <ul aria-label="Key capabilities"><li>Knowledge</li><li>Agents</li><li>Workflows</li><li>Systems</li><li>Governance</li></ul>
    </div></div>
  </>;
}
