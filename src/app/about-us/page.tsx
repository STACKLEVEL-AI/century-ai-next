import Image from "next/image";
import { ArrowUpRight, Compass, Layers, ScanEye } from "lucide-react";
import Founders from "@/components/Founders";
import PageFrame from "@/components/site/PageFrame";
import PageHero from "@/components/site/PageHero";
import { FeatureGrid, RelatedPages, SectionHeading } from "@/components/site/Sections";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("About us", "Meet Century: enterprise AI shaped around your knowledge, workflows and people. Explore our approach and the founders behind it.", "/about-us");

export default function AboutPage() {
  return <PageFrame>
    <PageHero eyebrow="About Century" title={<>Good technology.<br />A human purpose.</>} description="We believe AI should help people do useful work—with the knowledge, context and control their business needs." secondary={{ href: "#founders", label: "Meet the founders" }} />
    <section className="company-mission-section" aria-labelledby="company-mission-title"><div className="shell">
      <figure className="company-mission-image"><Image src="/media/deployment.webp" alt="Illustrative scene of people working together in a business workshop" width={1200} height={670} sizes="(max-width: 760px) 100vw, 90vw" /><figcaption>Connection. Clarity. Room to build.</figcaption></figure>
      <div className="company-mission-copy"><p className="eyebrow">Why we are here</p><div><h2 id="company-mission-title">Bring intelligence closer<br />to the work.</h2><p>Businesses hold valuable knowledge in documents, systems and the experience of their teams. Turning that knowledge into a useful answer or a completed task takes context. It takes clear responsibilities. And it takes technology that fits the environment around it.</p><p>Century brings these pieces together. We work from a concrete business process towards an AI solution that people can understand, evaluate and use. The starting point is a real question about your work.</p><a href="/ai-os/" className="company-text-link">Explore the platform<ArrowUpRight size={18} aria-hidden="true" /></a></div></div>
    </div></section>
    <section className="section company-principles"><div className="shell"><SectionHeading eyebrow="What guides us" title="Three principles. Every project." /><FeatureGrid items={[
      { title: "Start with the work", description: "Understand the people, decisions and handoffs behind a process. Give the first project a clear purpose and an outcome that the team can evaluate.", icon: <Compass size={25} /> },
      { title: "Keep the context", description: "Connect answers to approved knowledge. Make the sources, constraints and exceptions visible to the people relying on the result.", icon: <Layers size={25} /> },
      { title: "Make control practical", description: "Define access, review and ownership as part of the workflow. Give people the information they need to make a responsible decision.", icon: <ScanEye size={25} /> },
    ]} /></div></section>
    <Founders />
    <section className="section company-statement"><div className="shell"><p className="eyebrow">Built together</p><h2>From the first conversation<br />to a workflow people use.</h2><p>A useful AI project brings business knowledge and engineering into the same conversation. That is how we approach the work, and how we think about the team behind it.</p><a href="/careers/" className="btn btn-outline">Explore working with Century<ArrowUpRight size={17} aria-hidden="true" /></a></div></section>
    <RelatedPages links={[{href:"/blog/",title:"Century guides",description:"Practical ideas for choosing, shaping and operating an AI workflow.",eyebrow:"Ideas"},{href:"/security/",title:"Security & control",description:"The decisions that shape an AI deployment in your environment.",eyebrow:"Our approach"},{href:"/press/",title:"Press & brand",description:"Company information, founder profiles and the Century wordmark.",eyebrow:"Company"}]} />
  </PageFrame>;
}
