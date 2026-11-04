import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";
import ArticleArtwork from "@/components/company/ArticleArtwork";
import GuideLibrary from "@/components/company/GuideLibrary";
import { articles } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("Century guides", "Practical guides to enterprise AI: choose a first workflow, connect answers to sources, design human review and plan a deployment.", "/blog");

export default function BlogPage() {
  const featured = articles[0];
  const cards = articles.map(({slug,title,description,category,readingTime}) => ({slug,title,description,category,readingTime}));
  return <PageFrame>
    <section className="blog-hero"><div className="shell"><p className="eyebrow">Century guides</p><h1>Useful ideas.<br />Better starting points.</h1><p className="blog-hero-description">Practical reading for the people making AI part of everyday work.</p><a className="blog-featured" href={`/blog/${featured.slug}/`}><ArticleArtwork slug={featured.slug} /><div className="blog-featured-copy"><span className="eyebrow">Featured guide / {featured.category}</span><h2>{featured.title}</h2><p>{featured.description}</p><span className="blog-featured-footer"><span>{featured.readingTime}</span><span>Read guide<ArrowUpRight size={20} aria-hidden="true" /></span></span></div></a></div></section>
    <section className="section blog-guides" aria-labelledby="all-guides-title"><div className="shell"><div className="blog-library-heading"><div><p className="eyebrow">Explore the library</p><h2 id="all-guides-title">From an idea<br />to an operating workflow.</h2></div><p>Four starting points for a useful conversation.<br />Written as practical guidance by Century.</p></div><GuideLibrary items={cards} /></div></section>
  </PageFrame>;
}
