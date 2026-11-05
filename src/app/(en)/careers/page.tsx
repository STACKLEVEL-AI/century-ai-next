import Image from "next/image";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import TelegramLink from "@/components/TelegramLink";
import { CompanyHeading } from "@/components/company/CompanyElements";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Careers", "Explore the work behind Century: enterprise AI, engineering, knowledge and business workflows. Start a conversation with the team.", "/careers");

const disciplines = [
  { title: "Engineering", description: "Build clear interfaces, dependable integrations and systems that fit real deployment constraints" },
  { title: "Applied AI", description: "Connect models with approved knowledge, evaluation and the context of the task being supported" },
  { title: "Workflow design", description: "Understand decisions and handoffs. Turn a business process into a practical, reviewable workflow" },
  { title: "Customer collaboration", description: "Ask the right questions, define useful outcomes and help teams make sense of the possibilities" },
];

export default function CareersPage() {
  return (
    <PageFrame showContact={false} headerVariant="overlay">
      <div className="co-page co-careers">
        <header className="co-immersive-hero">
          <Image src="/media/deployment.webp" alt="People collaborating in a business workshop" fill sizes="100vw" priority />
          <div className="shell co-immersive-content"><p className="co-eyebrow">Careers at Century</p><h1>Build things<br />people can use</h1><div className="co-immersive-bottom"><p>We are interested in the people who connect thoughtful engineering with an understanding of how businesses work</p><a className="co-text-link" href="#the-work">Explore the work<ArrowDown size={18} aria-hidden="true" /></a></div></div>
        </header>
        <section className="co-section" id="the-work">
          <div className="shell co-editorial-split">
            <CompanyHeading eyebrow="The work" title={<>Close to the problem<br />Involved in the outcome</>} />
            <div className="co-prose"><p className="co-lead">Enterprise AI is a collaboration between people who understand the process and people who can build the system.</p><p>The interesting work happens where those perspectives meet. It might mean tracing a document through an approval process, making an answer easier to inspect or designing a reliable connection to an existing system.</p><p>It means asking good questions and taking responsibility for the details.</p><a className="co-text-link" href="/about-us/">Meet the people behind Century<ArrowUpRight size={18} aria-hidden="true" /></a></div>
          </div>
        </section>
        <section className="co-section co-warm">
          <div className="shell">
            <div className="co-section-top"><CompanyHeading eyebrow="Ways to contribute" title={<>More than one<br />way to build</>} /><p>These are the disciplines behind the work. They describe areas for a conversation, rather than a list of advertised vacancies.</p></div>
            <div className="co-discipline-list">{disciplines.map((item, i) => <article key={item.title}><span className="co-index" aria-hidden="true">0{i + 1}</span><h3>{item.title}</h3><p>{item.description}</p></article>)}</div>
          </div>
        </section>
        <section className="co-section" id="conversation">
          <div className="shell co-careers-conversation">
            <div><CompanyHeading eyebrow="Start a conversation" title={<>Tell us what<br />you like to build</>} /><p>There are no specific open roles advertised on this page. If our work connects with yours, introduce yourself to Vitali and ask about possible ways to contribute.</p><TelegramLink>Start a conversation</TelegramLink></div>
            <aside className="co-conversation-note"><p className="co-eyebrow">Your introduction</p><h3>A little context helps</h3><ol><li>The kind of work you enjoy and where you could contribute</li><li>A project that shows your approach</li><li>What you would like to explore with Century</li></ol><p>A public project link is enough. Leave sensitive documents and identification details out of the initial conversation.</p><a className="co-text-link" href="/privacy/">Privacy information<ArrowUpRight size={16} aria-hidden="true" /></a></aside>
          </div>
        </section>
      </div>
    </PageFrame>
  );
}
