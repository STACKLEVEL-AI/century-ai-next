import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import TelegramLink from "@/components/TelegramLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Contact", "Talk with Vitali Bakhmat about your first Century AI workflow. Share the process, sources and outcome you would like to explore.", "/contact");

export default function ContactPage() {
  return <PageFrame showContact={false}>
    <section className="contact-page-main"><div className="shell contact-page-grid">
      <div className="contact-page-photo"><Image src="/images/enterprise-atrium.webp" alt="Open walkways and glass architecture filled with natural light" fill sizes="(max-width: 900px) 100vw, 48vw" priority /><div><span className="eyebrow">Century</span><p>Good work starts<br />with a conversation.</p></div></div>
      <div className="contact-page-copy"><p className="eyebrow">Let’s talk</p><h1>What would you<br />like AI to help with?</h1><p className="contact-page-intro">Bring a process, a question or an idea. We will explore the starting point together.</p><div className="contact-page-person"><Image src="/founders/vitali-bakhmat.webp" alt="Vitali Bakhmat" width={320} height={400} sizes="64px" /><div><strong>Vitali Bakhmat</strong><span>Co-founder · CEO</span></div></div><TelegramLink>Message Vitali on Telegram</TelegramLink><p className="contact-page-external">Opens a conversation in Telegram. You choose what to share.</p><div className="contact-page-prompts"><h2>A few useful things to tell us</h2><ol><li><span>01</span><div><strong>The work</strong><p>Which task or process would you like to improve?</p></div></li><li><span>02</span><div><strong>The context</strong><p>Which team, documents or systems are involved?</p></div></li><li><span>03</span><div><strong>The outcome</strong><p>What would a useful first result look like?</p></div></li></ol></div><p className="contact-page-privacy">A short description is enough to start. Keep confidential files out of the first message. <a href="/privacy/">Read our privacy information<ArrowUpRight size={13} aria-hidden="true" /></a></p></div>
    </div></section>
    <section className="contact-page-before"><div className="shell"><p className="eyebrow">Before the conversation</p><a href="/blog/choose-first-ai-workflow/"><h2>Not sure where to start?</h2><span>Read our guide to choosing a first AI workflow<ArrowUpRight size={20} aria-hidden="true" /></span></a></div></section>
  </PageFrame>;
}
