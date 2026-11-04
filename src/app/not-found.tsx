import { ArrowUpRight } from "lucide-react";
import PageFrame from "@/components/site/PageFrame";

export default function NotFound() {
  return <PageFrame showContact={false}>
    <section className="error-hero">
      <div className="shell">
        <p className="eyebrow">404 / A different direction</p>
        <h1>Page not found</h1>
        <p className="inner-hero-description">This page may have moved. There’s still plenty to explore — from the platform to the people behind it.</p>
        <div className="inner-hero-actions">
          <a className="btn btn-primary" href="/">Back to Century<ArrowUpRight size={17} aria-hidden="true" /></a>
          <a className="btn btn-outline" href="/ai-os/">Explore the platform</a>
        </div>
      </div>
    </section>
  </PageFrame>;
}
