import { ArrowDown, ArrowUpRight } from "lucide-react";
import TelegramLink from "./TelegramLink";

export default function Hero() {
  return (
    <>
      <section className="hero" id="home" aria-labelledby="hero-title">
        <picture className="hero-image">
          <source
            media="(max-width: 640px)"
            srcSet="/images/enterprise-atrium-640.webp 640w, /images/enterprise-atrium-960.webp 960w"
            sizes="100vw"
          />
          <img
            src="/images/enterprise-atrium.webp"
            srcSet="/images/enterprise-atrium-960.webp 960w, /images/enterprise-atrium.webp 1672w"
            sizes="100vw"
            width={1672}
            height={941}
            alt=""
            fetchPriority="high"
          />
        </picture>
        <div className="hero-shade" aria-hidden="true" />
        <div className="shell hero-layout">
          <div className="hero-copy">
            <p className="eyebrow">Enterprise AI for European businesses</p>
            <h1 id="hero-title">Enterprise AI.<br /><span>Under your control.</span></h1>
            <p className="hero-lead">
              Turn your company knowledge into answers.<br className="desktop-break" />
              Move everyday work forward. Keep people in control.
            </p>
            <div className="hero-actions">
              <TelegramLink className="btn btn-light">Get in touch</TelegramLink>
              <a className="btn btn-outline-light" href="/ai-os/">
                Explore the platform <ArrowUpRight size={17} aria-hidden="true" />
              </a>
            </div>
          </div>
          <div className="hero-baseline">
            <p><span className="status-dot" aria-hidden="true" /> Your knowledge. Your workflows. Your decisions.</p>
            <a href="/#use-cases" aria-label="Discover Century use cases"><ArrowDown size={20} aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <div className="principles-strip">
        <div className="shell principles-inner">
          <p>Built around the way<br />your business works.</p>
          <ul aria-label="Key capabilities">
            <li><span aria-hidden="true">01</span> Source-linked answers</li>
            <li><span aria-hidden="true">02</span> Human review</li>
            <li><span aria-hidden="true">03</span> Deployment choices</li>
          </ul>
        </div>
      </div>
    </>
  );
}
