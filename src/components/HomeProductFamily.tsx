import { RelatedPages } from "./site/Sections";
export default function HomeProductFamily() {
  return <div className="home-product-family"><RelatedPages title="One foundation. Different ways to work." links={[
    { href: "/agents/", eyebrow: "Century Agents", title: "Put knowledge to work.", description: "Help employees find answers, prepare documents and resolve routine requests." },
    { href: "/systems/", eyebrow: "Century Systems", title: "Shape tools around the work.", description: "Bring the information and review steps a business process actually needs into one place." },
    { href: "/ai-gateway/", eyebrow: "AI Gateway", title: "Make AI usage visible.", description: "Plan access, model choices, usage and controls around the workflows you introduce." },
  ]} /></div>;
}
