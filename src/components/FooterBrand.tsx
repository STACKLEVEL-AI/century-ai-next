import styles from "./FooterBrand.module.css";

/** Fixed English brand signature: keep the wording and logo together in every locale. */
export default function FooterBrand({ href }: { href: string }) {
  return (
    <a
      href={href}
      className={`${styles.signature} notranslate`}
      translate="no"
      lang="en"
      dir="ltr"
      aria-label="WE LEAVE IN THE AI CENTURY"
    >
      <span className={styles.prefix} aria-hidden="true">WE LEAVE IN THE AI</span>
      <img className={styles.logo} src="/brand/century-logo-white.svg" alt="" width={221} height={58} />
    </a>
  );
}
