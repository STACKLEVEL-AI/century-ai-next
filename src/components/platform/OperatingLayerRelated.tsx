import { ArrowUpRight } from "lucide-react";
import styles from "./OperatingLayer.module.css";

const products = [
  { slug: "ai-os", label: "AI OS", image: "/media/platform.webp", width: 1800, height: 1009, position: "center", description: "The shared foundation for knowledge, workflows and human oversight" },
  { slug: "agents", label: "Agents", image: "/media/employee-assistance-woman.webp?v=51966346", width: 1600, height: 900, position: "60% center", description: "Put approved knowledge to work alongside your people" },
  { slug: "systems", label: "Systems", image: "/media/century/photos/team-collaboration.webp", width: 1600, height: 900, position: "40% center", description: "Shape a business application around the way your team works" },
  { slug: "ai-gateway", label: "AI Gateway", image: "/media/stock/scene-keyboard.webp", width: 960, height: 540, position: "center", description: "Bring model choices, response details and operating rules together" },
];

export default function OperatingLayerRelated({ current }: { current: "ai-os" | "ai-gateway" }) {
  return <section className={styles.related} aria-labelledby={"related-" + current}>
    <div className={styles.container}>
      <h2 className={styles.relatedHeading} id={"related-" + current}>Connected capabilities<br />A common foundation</h2>
      <div className={styles.relatedGrid}>
        {products.filter(product => product.slug !== current).map(product => <a className={styles.productCard}
          href={"/" + product.slug + "/"} key={product.slug}>
          <img className={styles.productImage} src={product.image} alt="" style={{ objectPosition: product.position }}
            width={product.width} height={product.height} loading="lazy" />
          <div className={styles.productCardContent}>
            <span className={styles.productLockup}><img src="/brand/century-logo-white.svg" alt="Century" width={132} height={35} /><span>{product.label}</span></span>
            <div><p>{product.description}</p><span className={styles.productExplore}>Explore <ArrowUpRight size={19} aria-hidden="true" /></span></div>
          </div>
        </a>)}
      </div>
    </div>
  </section>;
}
