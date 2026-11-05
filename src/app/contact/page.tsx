import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import TelegramLink from "@/components/TelegramLink";
import ArticleArtwork from "@/components/company/ArticleArtwork";
import { CompanyHeading } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Talk with Vitali Bakhmat about your first Century AI workflow. Share the process, sources and outcome you would like to explore.", "/contact");

const prompts = [
  { title: "The work", description: "Which task or process would you like to improve?" },
  { title: "The context", description: "Which team, documents or systems are involved?" },
  { title: "The outcome", description: "What would a useful first result look like?" },
];

export default function ContactPage() {
  return (
    <PageFrame showContact={false} headerVariant="overlay">
      <div className="co-page co-contact">
        <header className="co-immersive-hero co-contact-hero">
          <Image src="/media/industry.webp" alt="People moving through a shared business space" fill sizes="100vw" priority />
          <div className="shell co-immersive-content"><p className="co-eyebrow">Let’s talk</p><h1>What would you<br />like AI to help with?</h1><div className="co-immersive-bottom"><p>Bring a process, a question or an idea. We will explore the starting point together</p><a className="co-text-link" href="#start-conversation">Start a conversation<ArrowDown size={18} aria-hidden="true" /></a></div></div>
        </header>
        <section className="co-section" id="start-conversation">
          <div className="shell co-contact-conversation">
            <div className="co-contact-direct"><CompanyHeading eyebrow="Speak with a founder" title={<>Good work starts<br />with a conversation</>} /><div className="co-contact-person"><Image src="/founders/vitali-bakhmat.webp" alt="Vitali Bakhmat" width={320} height={400} /><div><h3>Vitali Bakhmat</h3><p>Co-founder · CEO</p></div></div><TelegramLink>Message Vitali on Telegram</TelegramLink><p className="co-contact-external">Opens a conversation in Telegram<br />You choose what to share</p></div>
            <div className="co-contact-prompts"><p className="co-eyebrow">A useful starting point</p><h2>A few things<br />to tell us</h2><ol>{prompts.map((item, i) => <li key={item.title}><span className="co-index" aria-hidden="true">0{i + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></li>)}</ol><div className="co-contact-privacy"><p>A short description is enough to start. Keep confidential files out of the first message.</p><a className="co-text-link" href="/privacy/">Read our privacy information<ArrowUpRight size={16} aria-hidden="true" /></a></div></div>
          </div>
        </section>
        <section className="co-section co-warm"><div className="shell"><a className="co-contact-guide" href="/blog/choose-first-ai-workflow/"><ArticleArtwork slug="choose-first-ai-workflow" compact /><div><p className="co-eyebrow">Before the conversation</p><h2>Not sure<br />where to start?</h2><p>Read our guide to choosing a first AI workflow</p><span className="co-text-link">Find a useful first project<ArrowUpRight size={18} aria-hidden="true" /></span></div></a></div></section>
      </div>
    </PageFrame>
  );
}
