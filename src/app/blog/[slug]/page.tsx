import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import PageFrame from "@/components/site/PageFrame";
import ArticleArtwork from "@/components/company/ArticleArtwork";
import { CompanyCTA } from "@/components/company/CompanyElements";
import { articles, getArticle } from "@/lib/articles";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  const base = pageMetadata(article.title, article.description, `/blog/${article.slug}`);
  return { ...base, openGraph: { ...base.openGraph, type: "article" } };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();
  const others = articles.filter((item) => item.slug !== article.slug);
  return (
    <PageFrame showContact={false}>
      <div className="co-page co-guide-page">
        <article>
          <header className="co-article-header"><div className="shell"><a className="co-article-back" href="/blog/"><ArrowLeft size={16} aria-hidden="true" />All Century guides</a><div className="co-article-masthead"><div className="co-guide-meta"><span>{article.category}</span><span>{article.readingTime}</span></div><h1>{article.title}</h1><p>{article.description}</p><span className="co-article-byline">A practical guide by Century</span></div></div></header>
          <div className="shell co-article-cover"><ArticleArtwork slug={article.slug} priority /></div>
          <div className="shell co-reading-layout">
            <nav className="co-document-nav co-article-toc" aria-label="Guide contents"><p className="co-eyebrow">In this guide</p>{article.sections.map((section, i) => <a href={`#${section.id}`} key={section.id}><span className="co-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>{section.title}</a>)}<a className="co-toc-contact" href="/contact/">Discuss your workflow<ArrowUpRight size={16} aria-hidden="true" /></a></nav>
            <div className="co-reading-body">
              {article.sections.map((section, i) => <section id={section.id} key={section.id}><p className="co-eyebrow co-reading-index">{String(i + 1).padStart(2, "0")} / {String(article.sections.length).padStart(2, "0")}</p><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <aside className="co-reading-checklist" aria-label="Questions and points to consider"><p className="co-eyebrow">Take this into the conversation</p><ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul></aside>}</section>)}
              <div className="co-article-endnote"><span>Century guides</span><p>Use these questions as a starting point, then agree the details for your own workflow and environment.</p><a className="co-text-link" href="/blog/">Back to all guides<ArrowUpRight size={16} aria-hidden="true" /></a></div>
            </div>
          </div>
        </article>
        <section className="co-section co-warm co-article-related"><div className="shell"><div className="co-section-top"><div className="co-heading"><p className="co-eyebrow">Keep reading</p><h2>Another useful perspective.</h2></div></div><div className="co-related-guides">{others.map((item) => <a className="co-related-guide" href={`/blog/${item.slug}/`} key={item.slug}><ArticleArtwork slug={item.slug} compact /><div className="co-guide-meta"><span>{item.category}</span><span>{item.readingTime}</span></div><h3>{item.title}</h3><span className="co-text-link">Read guide<ArrowUpRight size={17} aria-hidden="true" /></span></a>)}</div></div></section>
        <CompanyCTA />
      </div>
    </PageFrame>
  );
}
