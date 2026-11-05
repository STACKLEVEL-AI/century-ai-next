import { ArrowDown, ArrowUpRight, BookOpen, Focus, UserRoundCheck } from "lucide-react";
import TelegramLink from "@/components/TelegramLink";
import { industries } from "@/lib/industries";
import { industryReferencePages } from "@/lib/industry-reference-pages";
import { IndustryContact, IndustryPageFrame } from "./IndustryReferencePage";
import styles from "./IndustryReferencePage.module.css";

const principles = [
  { title: "Specify the opportunity", description: "Collect requests from business teams, identify owners and assess process, data and access readiness", icon: Focus, href: "/ai-transformation/", link: "Find your starting point" },
  { title: "Build around approved sources", description: "Connect the knowledge and systems a task needs, then test representative documents and questions", icon: BookOpen, href: "/platform/", link: "Explore the platform" },
  { title: "Govern and improve", description: "Agree review responsibilities, track quality and impact, and use operational findings to shape the next task", icon: UserRoundCheck, href: "/deployment/", link: "Plan your implementation" },
];

export default function IndustryDirectory() {
  return <IndustryPageFrame>
    <section className={styles.directoryHero} aria-labelledby="industries-title">
      <div className={styles.benefitBackground} aria-hidden="true" />
      <div className={styles.container}>
        <p className={styles.eyebrow}>Century across industries</p>
        <h1 id="industries-title">Your industry<br />A new chapter</h1>
        <div className={styles.directoryIntro}>
          <p>Bring specification, development and governance into one platform. Explore practical use cases for your sector, then shape the pilot around your data, systems and review responsibilities</p>
          <a className={styles.directoryTextLink} href="#sectors">Find your industry<ArrowDown size={18} aria-hidden="true" /></a>
        </div>
      </div>
    </section>

    <section className={styles.directory} id="sectors" aria-labelledby="industry-directory-title">
      <div className={styles.container}>
        <div className={styles.directoryHeading}><h2 id="industry-directory-title">Find your world</h2><p>Seven industries, a practical place to begin</p></div>
        <nav className={styles.directoryIndex} aria-label="Find an industry">
          {industries.map(({ slug }) => <a href={`#sector-${slug}`} key={slug}>{industryReferencePages[slug].title}<ArrowDown size={13} aria-hidden="true" /></a>)}
        </nav>
        <div className={styles.directoryGrid}>
          {industries.map(({ slug }) => {
            const data = industryReferencePages[slug];
            return <a className={styles.directoryCard} href={`/industries/${slug}/`} id={`sector-${slug}`} key={slug}>
              <div className={styles.directoryPhoto}>
                <img src={data.images.heroSmall} alt="" width={data.images.heroSmallWidth} height={Math.round(data.images.heroHeight * data.images.heroSmallWidth / data.images.heroWidth)} loading="lazy" />
                <div><h3>{data.title}</h3><ArrowUpRight size={28} strokeWidth={1.3} aria-hidden="true" /></div>
              </div>
              <p>{data.heroDescription}</p>
              <span className={styles.directoryTextLink}>Explore {data.title}<ArrowUpRight size={16} aria-hidden="true" /></span>
            </a>;
          })}
          <div className={styles.directoryInvitation}>
            <p className={styles.eyebrow}>Your next chapter</p>
            <h3>A different industry<br />A familiar challenge?</h3>
            <p>Start with the task, the sources and the people involved. We can explore the scope together</p>
            <TelegramLink className={styles.lightButton}>Get in touch</TelegramLink>
          </div>
        </div>
      </div>
    </section>

    <section className={styles.directoryPrinciples} aria-labelledby="industry-principles-title">
      <div className={styles.container}>
        <h2 id="industry-principles-title">Your industry shapes the implementation</h2>
        <div className={styles.principleGrid}>
          {principles.map(({ title, description, icon: Icon, href, link }) => <article key={title}>
            <Icon size={32} strokeWidth={1.15} aria-hidden="true" />
            <h3>{title}</h3><p>{description}</p><a className={styles.directoryTextLink} href={href}>{link}<ArrowUpRight size={16} aria-hidden="true" /></a>
          </article>)}
        </div>
      </div>
    </section>

    <IndustryContact id="industry-contact-title">Build your next chapter with Century</IndustryContact>
  </IndustryPageFrame>;
}
