import type { CSSProperties, ReactNode } from "react";
import { CalendarCheck, ChartNoAxesColumnIncreasing, ChartNoAxesCombined, Clock, Coins, Expand, Gauge, Headset, HeartPulse, Network, Settings2, ShieldHalf, Timer, UsersRound, Workflow } from "lucide-react";
import Header from "@/components/Header";
import TelegramLink from "@/components/TelegramLink";
import type { IndustrySlug } from "@/lib/industries";
import type { IndustryReference } from "@/lib/industry-reference-types";
import { companyLinks, industryLinks, platformLinks } from "@/lib/navigation";
import styles from "./IndustryReferencePage.module.css";

const benefitIcons = { CalendarCheck, ChartNoAxesColumnIncreasing, ChartNoAxesCombined, Clock, Coins, Expand, Gauge, Headset, HeartPulse, Network, Settings2, ShieldHalf, Timer, UsersRound, Workflow };
const defaultBenefitIcons = [ChartNoAxesColumnIncreasing, Expand, Settings2];

function IndustryFooter() {
  return <footer className={styles.footer}>
    <div className={styles.footerInner}>
      <div className={styles.footerLead}>
        <a href="/" aria-label="Century home"><img src="/brand/century-logo-white.svg" alt="Century" width={221} height={58} /></a>
        <p>WE LEAVE IN THE<br />AI CENTURY</p>
        <TelegramLink className={styles.lightButton}>Get in touch</TelegramLink>
        <small>© {new Date().getFullYear()} Century</small>
      </div>
      <nav className={styles.footerNav} aria-label="Footer navigation">
        <div><h2>Platform</h2>{platformLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div><h2>Industries</h2>{industryLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div><h2>Company</h2>{companyLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}<a href="/blog/">Blog</a></div>
        <div><h2>Social</h2><TelegramLink className="">Telegram</TelegramLink></div>
        <div><h2>Legal</h2><a href="/privacy/">Privacy information</a><a href="/security/">Security &amp; control</a></div>
      </nav>
    </div>
  </footer>;
}

export function IndustryPageFrame({ children }: { children: ReactNode }) {
  return <div className={styles.page}>
    <Header variant="overlay" showAnnouncement={false} />
    <main className={`inner-page ${styles.main}`} id="main-content" tabIndex={-1}>{children}</main>
    <IndustryFooter />
  </div>;
}

export function IndustryContact({ id, children }: { id: string; children: ReactNode }) {
  return <section className={styles.cta} aria-labelledby={id}>
    <div className={styles.ctaBackground} aria-hidden="true" />
    <div className={styles.ctaContent}><h2 id={id}>{children}</h2><TelegramLink className={styles.lightButton}>Get in touch</TelegramLink></div>
  </section>;
}

/** Shared industry layout with photography, content and crop settings for each industry. */
export default function IndustryReferencePage({ slug, data }: { slug: IndustrySlug; data: IndustryReference }) {
  const { images } = data;
  const heroSourceSet = images.heroSmall === images.hero
    ? undefined
    : `${images.heroSmall} ${images.heroSmallWidth}w, ${images.hero} ${images.heroWidth}w`;
  return <IndustryPageFrame>
    <section className={styles.hero} aria-labelledby={`${slug}-title`} data-industry={slug}>
      <picture className={styles.heroPicture} style={{ "--hero-position": images.heroPosition, "--hero-mobile-position": images.heroMobilePosition } as CSSProperties}>
        <source media="(max-width: 879px)" srcSet={images.heroMobile} />
        <img src={images.hero} srcSet={heroSourceSet} sizes="100vw" alt="" width={images.heroWidth} height={images.heroHeight} fetchPriority="high" />
      </picture>
      <div className={styles.heroShade} />
      <div className={styles.heroContent}>
        <h1 id={`${slug}-title`}>{data.title}</h1>
        <div className={styles.heroDescription}><p>{data.heroDescription}</p></div>
      </div>
    </section>

    <section className={styles.benefits} aria-labelledby={`${slug}-benefits-title`}>
      <div className={styles.benefitBackground} aria-hidden="true" />
      <div className={styles.container}>
        <h2 id={`${slug}-benefits-title`}>Transform your {data.operationLabel} operations with AI</h2>
        <div className={styles.benefitGrid}>
          {data.benefits.map(({ title, description, icon }, index) => {
            const Icon = icon ? benefitIcons[icon] : defaultBenefitIcons[index % defaultBenefitIcons.length];
            return <article className={styles.benefit} key={title} style={{ "--benefit-mobile-order": data.benefitMobileOrder?.[index] } as CSSProperties}>
              <Icon size={32} strokeWidth={1.15} aria-hidden="true" />
              <div><h3>{title}</h3><p>{description}</p></div>
            </article>;
          })}
        </div>
      </div>
    </section>

    <section className={styles.workflows} aria-labelledby={`${slug}-workflows-title`}>
      <div className={styles.workflowLayout}>
        <div className={styles.workflowCopy}>
          <h2 id={`${slug}-workflows-title`}>Streamline your most critical workflows</h2>
          <div className={styles.workflowGrid}>
            {data.workflows.map(({ title, description }) => <article className={styles.workflow} key={title}><h3>{title}</h3><p>{description}</p></article>)}
          </div>
        </div>
        <img className={styles.workflowPhoto} src={images.workflow} alt={images.workflowAlt} width={images.workflowWidth} height={images.workflowHeight} loading="lazy" style={{ "--workflow-position": images.workflowPosition } as CSSProperties} />
      </div>
    </section>

    <section className={styles.why} aria-labelledby={`${slug}-why-title`}>
      <div className={styles.whyHeading}>
        <h2 id={`${slug}-why-title`}>Why {data.audience} choose Century</h2>
        <p>{data.whyIntro}</p>
      </div>
      <div className={styles.reasonList}>
        {data.reasons.map(({ title, description, image, alt }) => <article className={styles.reason} key={title} tabIndex={0}>
          <div className={styles.reasonInner}>
            <h3>{title}</h3>
            <img className={styles.reasonImage} src={image} alt={alt} width={1280} height={808} loading="lazy" />
            <p>{description}</p>
          </div>
        </article>)}
      </div>
    </section>

    <IndustryContact id={`${slug}-contact-title`}>Build your next chapter in {data.ctaLabel ?? data.operationLabel} with Century</IndustryContact>
  </IndustryPageFrame>;
}
