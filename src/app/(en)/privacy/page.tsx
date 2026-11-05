import PageFrame from "@/components/site/PageFrame";
import { ArrowUpRight } from "lucide-react";
import { CompanyMasthead } from "@/components/company/CompanyElements";
import TelegramLink from "@/components/TelegramLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Website privacy", "How the Century public website works: local assets, no contact forms, no application tracking or browser storage, and optional external links.", "/privacy");

const sections = [
  {id:"scope",title:"What this page covers",paragraphs:["This page describes the public Century website at century-ai.eu. It explains the features implemented in this website and what happens when you choose to follow an external link.","It does not describe the processing of business data in a customer AI deployment. Data locations, retention, support access and external services for a deployment are agreed separately for that project."]},
  {id:"visiting",title:"Visiting the website",paragraphs:["The website serves pages, styles, scripts, fonts and images as static assets. Images and interface assets are provided with the site. Fonts are included in the website build; the page does not ask your browser to load them from Google Fonts.","As with other websites, loading a page involves sending a request to the hosting service. That service may process routine technical information such as the requested address, IP address, browser information and request time. Infrastructure logging and retention depend on the hosting provider and configuration; this application does not define those practices."]},
  {id:"browser-storage",title:"Cookies, tracking and browser storage",paragraphs:["The application does not set cookies or store information in local storage or session storage. It does not include analytics tags, advertising pixels or embedded tracking tools added by Century.","Interface choices such as an open menu or the selected guide category exist only in the current page’s memory. They are not saved as a profile or submitted to a server by the application."]},
  {id:"contact",title:"When you choose to contact us",paragraphs:["There is no contact form, file upload or embedded chat on this website. Contact buttons link to Vitali Bakhmat’s Telegram profile. Clicking a button opens Telegram, where you can decide whether to send a message and what information to include.","A message you send through Telegram is handled within that service and is subject to its own privacy practices. Start with a short description of your enquiry. Confidential documents or sensitive personal information are not needed for an initial conversation."]},
  {id:"external-links",title:"External links and downloads",paragraphs:["Founder profile links may take you to Telegram, LinkedIn or a founder’s personal website. These destinations have their own practices and settings. Their content is not embedded in this site, and opening them is optional.","The Century logo download is a local SVG file. Downloading it does not require entering contact details or creating an account on this website."]},
  {id:"questions",title:"Questions about privacy",paragraphs:["For a question about this website or an enquiry you have sent, contact Vitali using the link below. If your question concerns a customer deployment, refer to the arrangements agreed for that deployment and the responsible contacts identified there.","This page should be reviewed if the website adds forms, analytics, stored preferences or other features that change how information is handled."]},
];

export default function PrivacyPage() {
  return (
    <PageFrame showContact={false}>
      <div className="co-page co-privacy">
        <CompanyMasthead eyebrow="Website information" title={<>Privacy starts<br />with clarity</>} description="A straightforward explanation of how this public website handles visits, interface choices and contact links" />
        <div className="shell co-document-layout">
          <nav className="co-document-nav" aria-label="Privacy information sections"><p className="co-eyebrow">On this page</p>{sections.map((section, i) => <a href={`#${section.id}`} key={section.id}><span className="co-index" aria-hidden="true">0{i + 1}</span>{section.title}</a>)}</nav>
          <div className="co-document-content">
            <aside className="co-privacy-summary"><p className="co-eyebrow">At a glance</p><h2>A simple website<br />A choice to connect</h2><ul><li>No contact forms or embedded chat.</li><li>No analytics added by Century.</li><li>No application cookies or saved browser preferences.</li><li>External contact links open only when you choose.</li></ul></aside>
            {sections.map((section, i) => <section className="co-document-section" id={section.id} key={section.id}><div className="co-document-section-heading"><span className="co-index" aria-hidden="true">0{i + 1}</span><h2>{section.title}</h2></div>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}
            <div className="co-document-contact"><p className="co-eyebrow">A question about this website?</p><TelegramLink>Ask Vitali a privacy question</TelegramLink><a className="co-text-link" href="/security/">Explore deployment security<ArrowUpRight size={16} aria-hidden="true" /></a></div>
          </div>
        </div>
      </div>
    </PageFrame>
  );
}
