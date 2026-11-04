"use client";

import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import type { Article } from "@/lib/articles";
import ArticleArtwork from "./ArticleArtwork";

type GuideCardData = Pick<Article, "slug" | "title" | "description" | "category" | "readingTime">;
const categories = ["All guides", "Getting started", "Knowledge", "Workflows", "Deployment"] as const;

export default function GuideLibrary({ articles }: { articles: GuideCardData[] }) {
  const [category, setCategory] = useState<(typeof categories)[number]>("All guides");
  const visible = category === "All guides" ? articles : articles.filter((article) => article.category === category);
  return (
    <div className="co-library">
      <div className="co-library-toolbar">
        <div className="co-filters" role="group" aria-label="Filter guides by category">{categories.map((value) => <button key={value} type="button" aria-pressed={category === value} onClick={() => setCategory(value)}>{value}</button>)}</div>
        <p className="co-result-count" role="status" aria-live="polite">{visible.length} {visible.length === 1 ? "guide" : "guides"}{category !== "All guides" ? ` in ${category.toLowerCase()}` : " to explore"}</p>
      </div>
      <div className="co-guide-grid">{visible.map((item) => <article className="co-guide-card" key={item.slug}><a href={`/blog/${item.slug}/`}><ArticleArtwork slug={item.slug} compact /><div className="co-guide-card-copy"><div className="co-guide-meta"><span>{item.category}</span><span>{item.readingTime}</span></div><h3>{item.title}</h3><p>{item.description}</p><span className="co-text-link">Read guide<ArrowUpRight size={17} aria-hidden="true" /></span></div></a></article>)}</div>
      <noscript><p className="co-no-script">All guides are shown. Open any guide to read it; category filtering is available when JavaScript is enabled.</p></noscript>
    </div>
  );
}
