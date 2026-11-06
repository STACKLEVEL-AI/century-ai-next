import TelegramLink from "./TelegramLink";
import HeroFilm from "./HeroFilm";
import { heroMedia } from "@/lib/hero-media";

export default function Hero() {
  return <>
    <section className="hero" id="home" aria-labelledby="hero-title">
      <picture className="hero-image">
        <source media="(max-width: 640px)" srcSet={heroMedia.posterMobile} width={540} height={960} />
        <img src={heroMedia.poster} srcSet={`${heroMedia.poster640} 640w, ${heroMedia.poster960} 960w, ${heroMedia.poster} 1280w`} sizes="100vw" width={1280} height={720} alt="" fetchPriority="high" />
      </picture>
      <HeroFilm />
      <div className="hero-shade" aria-hidden="true" />
      <div className="shell hero-layout">
        <div className="hero-copy">
          <h1 id="hero-title">Enterprise AI<br />From idea<br /><span>to everyday work</span></h1>
          <p className="hero-lead">An innovation management system for regulated enterprises, connecting specification, development and governance in your own environment</p>
          <div className="hero-actions"><TelegramLink className="btn btn-light">Get in touch</TelegramLink><a className="btn btn-outline-light" href="/platform/">Explore the platform</a></div>
        </div>
      </div>
    </section>
    <div className="principles-strip"><div className="shell principles-inner">
      <p>Three stages, one connected platform</p>
      <ul aria-label="The Century operating cycle"><li>Specification</li><li>Development</li><li>Governance</li></ul>
    </div></div>
  </>;
}

