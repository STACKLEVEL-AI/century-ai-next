import type { CSSProperties, ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TelegramLink from "@/components/TelegramLink";
import styles from "./PlatformFrame.module.css";

type PlatformFrameProps = {
  children: ReactNode;
  headerVariant?: "light" | "overlay";
  contactTitle?: ReactNode;
  showContact?: boolean;
  contactImage?: { src: string; width: number; height: number; position?: string };
};

/** Shared Century navigation and closing section for the six Platform routes. */
export default function PlatformFrame({
  children,
  headerVariant = "overlay",
  contactTitle = <>Build the next chapter<br />with Century.</>,
  showContact = true,
  contactImage,
}: PlatformFrameProps) {
  return <div className={styles.page}>
    <Header variant={headerVariant} showAnnouncement={false} />
    <main className={`inner-page ${styles.main}`} id="main-content" tabIndex={-1}>
      {children}
      {showContact && <section className={styles.contact} id="contact" aria-labelledby="platform-contact-title">
        {contactImage
          ? <><img className={styles.contactPhoto} src={contactImage.src} alt="" width={contactImage.width} height={contactImage.height} loading="lazy" style={{ objectPosition: contactImage.position } as CSSProperties} /><div className={styles.contactShade} aria-hidden="true" /></>
          : <div className={styles.contactGlow} aria-hidden="true" />}
        <div className={styles.contactContent}>
          <h2 id="platform-contact-title">{contactTitle}</h2>
          <TelegramLink className={styles.contactButton}>Get in touch</TelegramLink>
        </div>
      </section>}
    </main>
    <Footer />
  </div>;
}
