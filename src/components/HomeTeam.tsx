import { ArrowUpRight } from "lucide-react";
import styles from "./HomeTeam.module.css";

const founders = [
  { name: "Vitali Bakhmat", role: "CEO", image: "vitali-bakhmat" },
  { name: "Vadim Vladymtsev", role: "CTO", image: "vadim-vladymtsev" },
  { name: "Egor Krychev", role: "CAIO", image: "egor-krychev" },
];

export default function HomeTeam() {
  return <section className={styles.section} id="team" aria-labelledby="home-team-title">
    <img className={styles.backdrop} src="/media/century/photos/team-collaboration.webp" srcSet="/media/century/photos/team-collaboration-768.webp 768w, /media/century/photos/team-collaboration.webp 1600w" sizes="100vw" width={1600} height={900} alt="" loading="lazy" decoding="async" />
    <div className="shell">
      <div className={styles.intro}>
        <div><p className="eyebrow">The people behind Century</p><h2 id="home-team-title">A shared ambition<br />A human approach</h2></div>
        <p>Technology works best when people build it together. Our founders bring business, engineering and AI expertise to the work—staying close from the first conversation to everyday use</p>
      </div>
      <div className={styles.cards}>
        <a className={`${styles.card} ${styles.about}`} href="/about-us/">
          <div className={styles.cardHeading}><span>About Century</span><ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" /></div>
          <h3>Meet the people<br />moving us forward</h3>
          <ul className={styles.founders} aria-label="Century founders">
            {founders.map(({ name, role, image }) => <li key={image}>
              <img src={`/founders/${image}.webp`} width={56} height={56} alt="" loading="lazy" />
              <span>{name}<small>{role}</small></span>
            </li>)}
          </ul>
        </a>
        <a className={`${styles.card} ${styles.careers}`} href="/careers/">
          <div className={styles.cardHeading}><span>Careers</span><ArrowUpRight size={26} strokeWidth={1.5} aria-hidden="true" /></div>
          <h3>Help shape<br />what comes next</h3>
          <p>Bring your perspective to the conversation about building useful AI</p>
        </a>
      </div>
    </div>
  </section>;
}
