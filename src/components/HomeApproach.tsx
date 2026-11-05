import { ArrowUpRight } from "lucide-react";
import styles from "./HomeApproach.module.css";

export default function HomeApproach() {
  return (
    <section className={styles.section} id="how-we-start" aria-label="Deployment and strategy">
      <div className={styles.grid}>
        <article className={styles.card} aria-labelledby="home-deployment-title">
          <img className={styles.photo} src="/media/deployment.webp" alt="" width={1200} height={670} loading="lazy" />
          <div className={styles.content}>
            <p className={styles.label}>Deployment</p>
            <h3 className={styles.title} id="home-deployment-title">Built with you<br />Ready for everyday work</h3>
            <p className={styles.description}>Audit a process, test a focused pilot and train your team to build, evaluate and maintain the next workflows</p>
            <a className={`btn btn-light ${styles.link}`} href="/deployment/">
              Explore deployment<ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </article>
        <article className={styles.card} aria-labelledby="home-strategy-title">
          <img className={`${styles.photo} ${styles.strategyPhoto}`} src="/media/strategy.webp" alt="" width={1054} height={1451} loading="lazy" />
          <div className={styles.content}>
            <p className={styles.label}>AI strategy</p>
            <h3 className={styles.title} id="home-strategy-title">The right approach<br />For every task</h3>
            <p className={styles.description}>Assess ownership, data readiness, effort and expected value. Choose agents, RPA, chat, process redesign or work that stays with people</p>
            <a className={`btn btn-light ${styles.link}`} href="/ai-transformation/">
              Explore the approach<ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </article>
      </div>
    </section>
  );
}
