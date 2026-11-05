import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TelegramLink from "@/components/TelegramLink";
import styles from "./PlatformFrame.module.css";

type PlatformFrameProps = {
  children: ReactNode;
  headerVariant?: "light" | "overlay";
  contactTitle?: ReactNode;
  showContact?: boolean;
  /** Retained for existing callers; closing contact rows no longer render imagery. */
  contactImage?: { src: string; width: number; height: number; position?: string };
};

/** Shared Century navigation and closing section for the six Platform routes. */
export default function PlatformFrame({
  children,
  headerVariant = "overlay",
  contactTitle = <>Build the next chapter<br />with Century</>,
  showContact = true,
}: PlatformFrameProps) {
  return <div className={styles.page}>
    <Header variant={headerVariant} showAnnouncement={false} />
    <main className={`inner-page ${styles.main}`} id="main-content" tabIndex={-1}>
      {children}
      {showContact && <section className={styles.contact} id="contact" aria-labelledby="platform-contact-title">
        <div className={styles.contactContent}>
          <h2 id="platform-contact-title">{contactTitle}</h2>
          <TelegramLink className={styles.contactButton}>Get in touch</TelegramLink>
        </div>
      </section>}
    </main>
    <Footer />
  </div>;
}
