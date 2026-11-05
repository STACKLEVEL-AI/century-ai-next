import { ArrowUpRight } from "lucide-react";
import { articles } from "@/lib/articles";
export default function HomeInsights() {
  return <section className="section home-insights"><div className="shell"><div className="section-heading section-heading-row"><div><p className="eyebrow">Ideas for useful AI</p><h2>Think it through<br />Then put it to work</h2></div><div><p>Practical guides to choosing a workflow, working with knowledge and keeping people in control</p><a className="home-section-link" href="/blog/">Explore the blog<ArrowUpRight size={17} aria-hidden="true" /></a></div></div><div className="home-insight-grid">{articles.slice(0,3).map(article => <a className="home-insight-card" href={`/blog/${article.slug}/`} key={article.slug}><p className="eyebrow">{article.category}</p><h3>{article.title}</h3><p>{article.description}</p><span>{article.readingTime}<ArrowUpRight size={16} aria-hidden="true" /></span></a>)}</div></div></section>;
}
