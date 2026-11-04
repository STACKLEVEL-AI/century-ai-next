"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";
import ArticleArtwork from "./ArticleArtwork";

export type GuideCardData = Pick<Article, "slug" | "title" | "description" | "category" | "readingTime">;
const categories = ["All guides", "Getting started", "Knowledge", "Workflows", "Deployment"] as const;

export default function GuideLibrary({ items }: { items: GuideCardData[] }) {
  const [category, setCategory] = useState<string>("All guides");
  const visible = category === "All guides" ? items : items.filter((item) => item.category === category);
  return <div className="blog-library">
    <div className="blog-filters" role="group" aria-label="Filter guides by category">{categories.map((value) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div>
    <p className="blog-result-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "guide" : "guides"}{category !== "All guides" ? ` in ${category.toLowerCase()}` : " to explore"}</p>
    <div className="blog-grid">{visible.map((item) => <article className="blog-card" key={item.slug}><a href={`/blog/${item.slug}/`} className="blog-card-link"><ArticleArtwork slug={item.slug} compact /><div className="blog-card-copy"><div className="blog-card-meta"><span>{item.category}</span><span>{item.readingTime}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="blog-read-link">Read guide<ArrowUpRight size={18} aria-hidden="true" /></span></div></a></article>)}</div>
    <noscript><p className="blog-no-script">All guides are shown. Open any guide to read it; category filtering is available when JavaScript is enabled.</p></noscript>
  </div>;
}
