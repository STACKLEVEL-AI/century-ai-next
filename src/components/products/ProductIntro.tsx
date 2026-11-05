import type { ReactNode } from "react";
import { ArrowDownRight } from "lucide-react";
import TelegramLink from "@/components/TelegramLink";

type IntroImage = { src: string; alt: string; width: number; height: number };
type ProductIntroProps = {
  eyebrow: string;
  title: ReactNode;
  description: string;
  variant?: "center" | "split" | "editorial" | "immersive";
  dark?: boolean;
  image?: IntroImage;
  visual?: ReactNode;
  secondary: { href: string; label: string };
  className?: string;
};

/** The composition changes with the page; the type and action rhythm stay shared. */
export default function ProductIntro({ eyebrow, title, description, variant = "split", dark = false, image, visual, secondary, className = "" }: ProductIntroProps) {
  const backdrop = variant === "center" || variant === "immersive";
  return <section className={["product-intro", "product-intro-" + variant, dark ? "product-intro-dark" : "", className].filter(Boolean).join(" ")}>
    {image && backdrop && <img className="product-intro-backdrop" src={image.src} alt="" aria-hidden="true" width={image.width} height={image.height} fetchPriority="high" decoding="async" />}
    <div className="shell product-intro-grid">
      <div className="product-intro-copy">
        <p className="product-kicker"><span aria-hidden="true" />{eyebrow}</p>
        <h1>{title}</h1>
        <div className="product-intro-summary">
          <p>{description}</p>
          <div className="product-actions">
            <TelegramLink className="btn btn-brand">Get in touch</TelegramLink>
            <a className="product-quiet-link" href={secondary.href}>{secondary.label}<ArrowDownRight size={18} aria-hidden="true" /></a>
          </div>
        </div>
      </div>
      {visual && <div className="product-intro-visual">{visual}</div>}
      {image && !backdrop && variant !== "editorial" && <figure className="product-intro-photo"><img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" decoding="async" /></figure>}
    </div>
    {image && variant === "editorial" && <div className="shell product-intro-wide-photo"><img src={image.src} alt={image.alt} width={image.width} height={image.height} fetchPriority="high" decoding="async" /></div>}
  </section>;
}
