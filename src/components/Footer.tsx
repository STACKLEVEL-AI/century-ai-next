import { companyLinks, industryLinks, platformLinks } from "@/lib/navigation";
import TelegramLink from "./TelegramLink";

export default function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-main footer-main-multipage">
      <div className="footer-brand-block"><a href="/" className="brand footer-brand" aria-label="Century home"><span className="brand-mark" aria-hidden="true" />Century</a><p>Enterprise AI for knowledge, workflows and support.</p><TelegramLink className="footer-contact">Talk to Vitali</TelegramLink></div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <div className="footer-nav-group"><p className="footer-nav-heading">Platform</p>{platformLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div className="footer-nav-group"><p className="footer-nav-heading">Industries</p>{industryLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div className="footer-nav-group"><p className="footer-nav-heading">Company</p>{companyLinks.map(link => <a href={link.href} key={link.href}>{link.title}</a>)}<a href="/blog/">Blog</a><a href="/privacy/">Website privacy</a></div>
      </nav>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Century.</p><a className="footer-contact" href="/privacy/">Privacy information</a><a className="footer-contact" href="/">Enterprise AI. Under your control.</a></div>
  </div></footer>;
}
