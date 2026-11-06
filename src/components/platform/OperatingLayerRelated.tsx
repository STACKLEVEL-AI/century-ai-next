import { ArrowUpRight } from "lucide-react";
import styles from "./OperatingLayer.module.css";

const products = [
  { slug: "platform", brandLabel: "AI Platform", image: "/media/platform.webp", width: 1800, height: 1009, position: "center", description: "Specification, development and governance in one environment" },
  { slug: "agents", brandLabel: "Agents", image: "/media/employee-assistance-woman.webp?v=51966346", width: 1600, height: 900, position: "60% center", description: "Build agents grounded in permitted knowledge and connected tools" },
  { slug: "systems", brandLabel: "Systems", image: "/media/century/photos/team-collaboration.webp", width: 1600, height: 900, position: "40% center", description: "Turn business requests into connected, tested workflows" },
  { slug: "ai-gateway", brandLabel: "AI Gateway", image: "/media/stock/scene-keyboard.webp", width: 960, height: 540, position: "center", description: "Choose models, control data use and inspect the evidence" },
];

export default function OperatingLayerRelated({ current }: { current: "platform" | "ai-gateway" }) {
  // Preserve existing section anchors for links arriving through the legacy route.
  const headingId = "related-" + (current === "platform" ? "ai-os" : current);
  return <section className={styles.related} aria-labelledby={headingId}>
    <div className={styles.container}>
      <h2 className={styles.relatedHeading} id={headingId}>One platform<br />Connected capabilities</h2>
      <div className={styles.relatedGrid}>
        {products.filter(product => product.slug !== current).map(product => <a className={styles.productCard}
          href={`/${product.slug}/`} key={product.slug}>
          <img className={styles.productImage} src={product.image} alt="" style={{ objectPosition: product.position }}
            width={product.width} height={product.height} loading="lazy" />
          <div className={styles.productCardContent}>
            <span className={styles.productLockup}><img src="/brand/century-logo-white.svg" alt="Century" width={132} height={35} /><span>{product.brandLabel}</span></span>
            <div><p>{product.description}</p><span className={styles.productExplore}>Explore <ArrowUpRight size={19} aria-hidden="true" /></span></div>
          </div>
        </a>)}
      </div>
    </div>
  </section>;
}
