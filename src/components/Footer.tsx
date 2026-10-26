import TelegramLink from "./TelegramLink";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-main">
          <div>
            <a href="/" className="brand">
              <span className="brand-mark" aria-hidden="true" />
              Century
            </a>
            <p>Enterprise AI for knowledge, workflows and support.</p>
          </div>
          <nav className="footer-nav" aria-label="Footer navigation">
            <a href="/#use-cases">Use cases</a>
            <a href="/#security">Security</a>
            <a href="/#founders">Founders</a>
            <a href="/#privacy">Privacy</a>
            <a href="/#home">Back to top</a>
          </nav>
        </div>
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Century.</p>
          <TelegramLink className="footer-contact">
            Vitali Bakhmat on Telegram
          </TelegramLink>
        </div>
        <details className="privacy-detail" id="privacy">
          <summary>Website privacy information</summary>
          <p>
            This landing page has no contact forms, embedded chat or analytics
            added by Century. We do not use cookies or local storage in the
            application code. The hosting provider may process technical request
            data to deliver and protect the website. If you choose to contact
            Vitali, you leave this website and use Telegram, where its own terms
            and privacy practices apply. Please avoid sending confidential
            business information in an initial message.
          </p>
        </details>
      </div>
    </footer>
  );
}
