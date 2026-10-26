import TelegramLink from "./TelegramLink";

export default function Header() {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <header className="site-header">
        <div className="shell header-inner">
          <a className="brand" href="/" aria-label="Century home">
            <span className="brand-mark" aria-hidden="true" />
            Century
          </a>
          <nav className="main-nav" aria-label="Main navigation">
            <a href="/#use-cases">Use cases</a>
            <a href="/#platform">Platform</a>
            <a href="/#security">Security</a>
            <a href="/#how-we-start">How we start</a>
          </nav>
          <TelegramLink className="btn btn-header">Talk to Vitali</TelegramLink>
        </div>
      </header>
    </>
  );
}
