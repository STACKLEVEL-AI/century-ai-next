import { companyLinks, industryLinks, platformLinks } from "@/lib/navigation";
import TelegramLink from "./TelegramLink";

export default function Footer() {
  return <footer className="site-footer"><div className="shell">
    <div className="footer-main footer-main-multipage">
      <div className="footer-brand-block"><a href="/" className="brand footer-brand" aria-label="Century home"><img src="/brand/century-logo-white.svg" alt="Century" width={221} height={58} /></a><p>A new chapter<br />for the way you work</p><TelegramLink className="btn btn-light footer-contact">Get in touch</TelegramLink></div>
      <nav className="footer-nav" aria-label="Footer navigation">
        <div className="footer-nav-group"><p className="footer-nav-heading">Platform</p>{platformLinks.map(link=><a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div className="footer-nav-group"><p className="footer-nav-heading">Industries</p>{industryLinks.map(link=><a href={link.href} key={link.href}>{link.title}</a>)}</div>
        <div className="footer-nav-group"><p className="footer-nav-heading">Company</p>{companyLinks.map(link=><a href={link.href} key={link.href}>{link.title}</a>)}<a href="/blog/">Blog</a><a href="/privacy/">Website privacy</a></div>
      </nav>
    </div>
    <div className="footer-bottom"><p>© {new Date().getFullYear()} Century</p><a className="footer-contact" href="/privacy/">Privacy information</a><p>Intelligence, put to work</p></div>
  </div></footer>;
}
