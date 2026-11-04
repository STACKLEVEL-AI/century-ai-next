import { ArrowUpRight, Code2, Compass, GitBranch, MessagesSquare } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, SectionHeading } from "@/components/site/Sections";
import TelegramLink from "@/components/TelegramLink";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Careers", "Explore the work behind Century: enterprise AI, engineering, knowledge and business workflows. Start a conversation with the team.", "/careers");

export default function CareersPage() {
  return <PageFrame showContact={false}>
    <PageHero eyebrow="Careers at Century" title={<>Build things<br />people can use.</>} description="We are interested in the people who connect thoughtful engineering with an understanding of how businesses work." hideActions>
      <div className="company-careers-art" aria-hidden="true"><span className="company-art-eyebrow">Different disciplines. Shared purpose.</span><div className="company-careers-orbit"><span>People</span><span>Technology</span><span>Process</span><i className="company-orbit-core"><b className="brand-mark" /></i></div><p>A better way to work.</p></div>
    </PageHero>
    <section className="section"><div className="shell company-two-column"><SectionHeading eyebrow="The work" title={<>Close to the problem.<br />Involved in the outcome.</>} /><div className="company-prose"><p>Enterprise AI is a collaboration between people who understand the process and people who can build the system. The interesting work happens where those perspectives meet.</p><p>It might mean tracing a document through an approval process, making an answer easier to inspect or designing a reliable connection to an existing system. It means asking good questions and taking responsibility for the details.</p><a className="company-text-link" href="/about-us/">Meet the people behind Century<ArrowUpRight size={18} aria-hidden="true" /></a></div></div></section>
    <section className="section company-principles"><div className="shell"><SectionHeading eyebrow="Areas of contribution" title="More than one way to build." description="These are the disciplines behind the work. They describe areas for a conversation, rather than a list of advertised vacancies." /><FeatureGrid columns={4} items={[
      {title:"Engineering",description:"Build clear interfaces, dependable integrations and systems that fit real deployment constraints.",icon:<Code2 size={25} />},
      {title:"Applied AI",description:"Connect models with approved knowledge, evaluation and the context of the task being supported.",icon:<Compass size={25} />},
      {title:"Workflow design",description:"Understand decisions and handoffs. Turn a business process into a practical, reviewable workflow.",icon:<GitBranch size={25} />},
      {title:"Customer collaboration",description:"Ask the right questions, define useful outcomes and help teams make sense of the possibilities.",icon:<MessagesSquare size={25} />},
    ]} /></div></section>
    <section className="section"><div className="shell company-careers-conversation"><div><p className="eyebrow">A conversation is a good start</p><h2>Tell us what<br />you like to build.</h2><p>There are no specific open roles advertised on this page. If our work connects with yours, introduce yourself to Vitali and ask about possible ways to contribute.</p><TelegramLink>Start a conversation</TelegramLink></div><aside className="company-conversation-note"><span className="company-note-number">01 / An introduction</span><h3>A little context helps.</h3><ul><li>The kind of work you enjoy and where you can contribute.</li><li>A project or example that shows how you approach a problem.</li><li>What you would like to explore with Century.</li></ul><p>You can share a public project link. Please leave sensitive documents and personal identification out of the initial message.</p><a href="/privacy/">How contact and privacy work</a></aside></div></section>
  </PageFrame>;
}
