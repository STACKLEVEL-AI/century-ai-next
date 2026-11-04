import {
  ArrowRight,
  Check,
  HeartPulse,
  Landmark,
  Plane,
  RadioTower,
  ShieldCheck,
  ShoppingBag,
  Zap,
  type LucideIcon,
} from "lucide-react";
import type { Industry, IndustrySlug } from "@/lib/industries";

const industryIcons: Record<IndustrySlug, LucideIcon> = {
  banking: Landmark,
  telecommunication: RadioTower,
  healthcare: HeartPulse,
  utilities: Zap,
  insurance: ShieldCheck,
  retail: ShoppingBag,
  airlines: Plane,
};

export function IndustryIcon({
  slug,
  size = 28,
  className,
}: {
  slug: IndustrySlug;
  size?: number;
  className?: string;
}) {
  const Icon = industryIcons[slug];
  return <Icon size={size} strokeWidth={1.5} className={className} aria-hidden="true" />;
}

function SectorScene({ slug }: { slug: IndustrySlug }) {
  switch (slug) {
    case "banking":
      return <>
        <path d="M102 127 227 66l125 61Z" fill="#e7e7e2" stroke="#171719" />
        <path d="M119 140h218M108 242h240M98 260h260" />
        <path d="M133 144v94m51-94v94m87-94v94m51-94v94" strokeWidth="14" stroke="#e7e7e2" />
        <path d="M133 144v94m51-94v94m87-94v94m51-94v94" />
        <circle cx="227" cy="105" r="13" fill="#171719" stroke="none" />
        <path d="m222 105 4 4 7-8" stroke="#fff" />
        <rect x="318" y="180" width="83" height="99" rx="12" fill="#fff" stroke="#b8b8b1" />
        <path d="M334 204h35m-35 12h48m-48 12h31" stroke="#b8b8b1" />
        <path d="m337 252 7 7 15-17" stroke="#171719" strokeWidth="3" />
      </>;
    case "telecommunication":
      return <>
        <path d="m204 257 29-108 29 108M217 212h33m-42 32h50m-24-95v108" />
        <circle cx="233" cy="132" r="11" fill="#171719" stroke="none" />
        <path d="M200 105a43 43 0 0 0 0 54m66-54a43 43 0 0 1 0 54" stroke="#171719" strokeWidth="3" />
        <path d="M177 85a73 73 0 0 0 0 94m112-94a73 73 0 0 1 0 94" stroke="#767672" />
        <path d="M154 66a101 101 0 0 0 0 132m158-132a101 101 0 0 1 0 132" stroke="#d8d8d1" />
        <rect x="87" y="197" width="66" height="73" rx="11" fill="#fff" stroke="#b8b8b1" />
        <path d="M106 216h28m-28 12h19m-7 28h4" stroke="#b8b8b1" />
        <rect x="317" y="209" width="82" height="54" rx="11" fill="#e7e7e2" stroke="#b8b8b1" />
        <path d="M334 229h47m-47 12h30M158 235h31m91 0h32" stroke="#767672" strokeDasharray="4 5" />
      </>;
    case "healthcare":
      return <>
        <rect x="121" y="93" width="185" height="170" rx="14" fill="#e7e7e2" stroke="#b8b8b1" />
        <path d="M121 150h185" stroke="#b8b8b1" />
        <path d="M211 108v27m-13-13h27" stroke="#171719" strokeWidth="7" />
        <path d="M148 176h23m-23 21h23m-23 21h23m87-42h23m-23 21h23m-23 21h23" stroke="#767672" strokeWidth="6" />
        <path d="M197 262v-69h32v69" fill="#fff" stroke="#b8b8b1" />
        <rect x="287" y="165" width="101" height="111" rx="12" fill="#fff" stroke="#b8b8b1" />
        <rect x="316" y="157" width="41" height="15" rx="5" fill="#171719" stroke="none" />
        <path d="M305 195h38m-38 12h62m-62 12h48" stroke="#b8b8b1" />
        <path d="m310 248 8 8 17-17" stroke="#171719" strokeWidth="3" />
      </>;
    case "utilities":
      return <>
        <path d="m137 260 41-178 41 178m-64-119h46m-51 23h56m-62 33h68m-75 52h82M178 82v178m-62-119h124m-107-27h90" />
        <path d="M121 141v15m114-15v15m-96-42v13m78-13v13" stroke="#171719" strokeWidth="4" />
        <path d="M86 127q35 29 53 0m78 0q36 26 88 0M72 156q33 30 49 0m114 0q36 27 94 0" stroke="#b8b8b1" />
        <rect x="278" y="137" width="106" height="132" rx="15" fill="#fff" stroke="#b8b8b1" />
        <rect x="291" y="152" width="80" height="67" rx="8" fill="#e7e7e2" stroke="none" />
        <path d="m335 161-20 29h15l-7 21 24-29h-15Z" fill="#171719" stroke="none" />
        <path d="M301 243h27m16 0h14" stroke="#b8b8b1" strokeWidth="4" />
      </>;
    case "insurance":
      return <>
        <rect x="123" y="81" width="161" height="184" rx="13" fill="#e7e7e2" stroke="#b8b8b1" transform="rotate(-8 203 173)" />
        <rect x="144" y="91" width="161" height="184" rx="13" fill="#fff" stroke="#b8b8b1" />
        <path d="M168 119h58m-58 15h99m-99 26h105m-105 15h85m-85 24h56m-56 15h69" stroke="#b8b8b1" />
        <path d="m318 156 57 21v42c0 31-28 53-57 65-29-12-57-34-57-65v-42Z" fill="#e7e7e2" stroke="#171719" />
        <path d="m296 218 15 15 30-34" stroke="#171719" strokeWidth="5" />
        <path d="M167 244h41" stroke="#767672" strokeWidth="3" />
      </>;
    case "retail":
      return <>
        <path d="m100 196 70-35 72 35v67H100Z" fill="#e7e7e2" stroke="#b8b8b1" />
        <path d="m100 196 71 34 71-34m-71 34v33m-34-85 69 35v20" stroke="#b8b8b1" />
        <path d="M240 133h116l13 131H227Z" fill="#fff" stroke="#b8b8b1" />
        <path d="M270 148v-39a28 28 0 0 1 56 0v39" stroke="#171719" strokeWidth="3" />
        <circle cx="270" cy="149" r="4" fill="#171719" stroke="none" />
        <circle cx="326" cy="149" r="4" fill="#171719" stroke="none" />
        <rect x="285" y="194" width="90" height="92" rx="10" fill="#fff" stroke="#767672" />
        <path d="M301 213h40m-40 13h56m-56 13h42M302 260v11m7-11v11m8-11v11m5-11v11m9-11v11m7-11v11m10-11v11" stroke="#b8b8b1" />
      </>;
    case "airlines":
      return <>
        <path d="M106 218C148 92 314 55 364 143" stroke="#b8b8b1" strokeDasharray="6 7" />
        <circle cx="106" cy="218" r="10" fill="#e7e7e2" stroke="#171719" />
        <circle cx="363" cy="143" r="7" fill="#171719" stroke="none" />
        <path d="m216 145 41 9 52-42 15 5-34 46 39 10 22-14 9 4-19 25-34 2-37-11-32 43-13-4 17-52-32-15Z" fill="#e7e7e2" stroke="#171719" />
        <rect x="152" y="235" width="216" height="56" rx="11" fill="#fff" stroke="#b8b8b1" />
        <path d="M306 236v54" stroke="#b8b8b1" strokeDasharray="4 5" />
        <path d="M169 251h51m-51 13h104m-104 11h33m123-24v24m6-24v24m7-24v24m7-24v24" stroke="#b8b8b1" />
      </>;
  }
}

export default function IndustryArtwork({ industry }: { industry: Industry }) {
  return <figure className={`industry-artwork industry-artwork-${industry.slug}`}>
    <figcaption className="industry-artwork-caption">
      <span className="industry-artwork-brand"><IndustryIcon slug={industry.slug} size={19} />{industry.visual.reference}</span>
      <span className="industry-artwork-example">Workflow example</span>
    </figcaption>
    <div className="industry-artwork-scene">
      <svg viewBox="0 0 480 330" fill="none" stroke="#767672" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="242" cy="173" r="130" fill="#f4f4f1" stroke="none" />
        <circle cx="242" cy="173" r="158" stroke="#e7e7e2" strokeDasharray="3 8" />
        <path d="M71 287h338" stroke="#e7e7e2" />
        <SectorScene slug={industry.slug} />
        <circle cx="395" cy="96" r="4" fill="#ff6b35" stroke="none" />
        <path d="M82 92h12m-6-6v12M396 225h10m-5-5v10" stroke="#b8b8b1" />
      </svg>
    </div>
    <div className="industry-artwork-workflow">
      <p>{industry.visual.title}</p>
      <ol>{industry.visual.steps.map((step, index) => <li key={step}>
        <span className="industry-artwork-step-number" aria-hidden="true">{index === 2 ? <Check size={12} /> : index + 1}</span>
        <span>{step}</span>
        {index < 2 && <ArrowRight size={13} className="industry-artwork-step-arrow" aria-hidden="true" />}
      </li>)}</ol>
    </div>
  </figure>;
}
