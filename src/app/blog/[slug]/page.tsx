import type { Metadata } from "next";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { notFound } from "next/navigation";
import PageFrame from "@/components/site/PageFrame";
import ArticleArtwork from "@/components/company/ArticleArtwork";
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
  return <PageFrame>
    <article>
      <header className="article-header"><div className="shell"><a className="article-back" href="/blog/"><ArrowLeft size={17} aria-hidden="true" />All Century guides</a><div className="article-meta"><span>{article.category}</span><span>{article.readingTime}</span><span>Century guides</span></div><h1>{article.title}</h1><p className="article-description">{article.description}</p></div></header>
      <div className="shell article-cover"><ArticleArtwork slug={article.slug} /></div>
      <div className="shell article-layout"><nav className="article-toc" aria-label="Guide contents"><p className="eyebrow">In this guide</p>{article.sections.map((section, i) => <a href={`#${section.id}`} key={section.id}><span>{String(i+1).padStart(2,"0")}</span>{section.title}</a>)}<a className="article-toc-contact" href="/contact/">Discuss your workflow<ArrowUpRight size={15} aria-hidden="true" /></a></nav><div className="article-body">{article.sections.map((section) => <section id={section.id} key={section.id}><h2>{section.title}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}{section.points && <aside className="article-checklist" aria-label="Questions and points to consider"><p className="eyebrow">Take this into the conversation</p><ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul></aside>}</section>)}<div className="article-endnote"><span className="brand-mark" aria-hidden="true" /><p>A Century guide. Use these questions as a starting point, then agree the details for your own workflow and environment.</p></div></div></div>
    </article>
    <section className="section article-related"><div className="shell"><p className="eyebrow">Keep reading</p><h2>Another useful perspective.</h2><div className="article-related-grid">{others.map((item) => <a href={`/blog/${item.slug}/`} key={item.slug}><span className="eyebrow">{item.category}</span><h3>{item.title}</h3><span className="article-related-footer">{item.readingTime}<ArrowUpRight size={19} aria-hidden="true" /></span></a>)}</div></div></section>
  </PageFrame>;
}
