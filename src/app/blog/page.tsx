import { ArrowDown, ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import ArticleArtwork from "@/components/company/ArticleArtwork";
import GuideLibrary from "@/components/company/GuideLibrary";
import { CompanyCTA } from "@/components/company/CompanyElements";
import { articles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century guides", "Practical guides to enterprise AI: choose a first workflow, connect answers to sources, design human review and plan a deployment.", "/blog");

export default function BlogPage() {
  const featured = articles[0];
  const cards = articles.map(({ slug, title, description, category, readingTime }) => ({ slug, title, description, category, readingTime }));
  return (
    <PageFrame showContact={false}>
      <div className="co-page co-journal">
        <header className="co-journal-header"><div className="shell"><p className="co-eyebrow">Century guides</p><div><h1>Useful ideas.<br />Better starting points.</h1><p>Practical reading for the people making AI part of everyday work.</p></div></div></header>
        <section className="shell co-featured-section" aria-labelledby="co-featured-title">
          <a className="co-featured" href={`/blog/${featured.slug}/`}>
            <ArticleArtwork slug={featured.slug} priority />
            <div className="co-featured-copy"><p className="co-eyebrow">Featured guide</p><div className="co-guide-meta"><span>{featured.category}</span><span>{featured.readingTime}</span></div><h2 id="co-featured-title">{featured.title}</h2><p>{featured.description}</p><span className="co-featured-link">Read the guide<ArrowUpRight size={22} aria-hidden="true" /></span></div>
          </a>
          <a className="co-journal-explore co-text-link" href="#guides">Explore all guides<ArrowDown size={17} aria-hidden="true" /></a>
        </section>
        <section className="co-section co-journal-library" id="guides">
          <div className="shell"><div className="co-section-top"><div className="co-heading"><p className="co-eyebrow">The reading room</p><h2>From an idea<br />to an operating workflow.</h2></div><p>Four starting points for better questions and clearer decisions. Written as practical guidance by Century.</p></div><GuideLibrary articles={cards} /></div>
        </section>
        <CompanyCTA eyebrow="Put the ideas to work" title={<>Your next chapter<br />starts with one workflow.</>} description="Bring the questions these guides raise to a conversation with Vitali. Explore what a useful first project could look like for your team." />
      </div>
    </PageFrame>
  );
}
