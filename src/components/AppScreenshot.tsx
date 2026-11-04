import { ArrowUpRight } from "lucide-react";
import { appCaptures, type AppCaptureId } from "@/lib/app-captures";

type AppScreenshotProps = {
  capture: AppCaptureId;
  className?: string;
  priority?: boolean;
};

/** A real, pre-cropped recording frame. Never hide extra source content with CSS. */
export default function AppScreenshot({ capture, className = "", priority = false }: AppScreenshotProps) {
  const image = appCaptures[capture];
  return <figure className={`app-capture app-capture-${image.tone} ${className}`}>
    <div className="app-capture-stage">
      <a className="app-capture-open" href={image.src} target="_blank" rel="noopener noreferrer" aria-label={`Open ${image.title} screenshot`} style={{ maxWidth: image.width }}>
        <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading={priority ? "eager" : "lazy"} decoding="async" />
        <span className="app-capture-expand" aria-hidden="true"><ArrowUpRight size={16} /></span>
      </a>
    </div>
    <figcaption><span>{image.title}</span><p>{image.caption}</p></figcaption>
  </figure>;
}
