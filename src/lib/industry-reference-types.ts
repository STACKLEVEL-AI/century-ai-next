export type IndustryBenefitIcon =
  | "ChartNoAxesColumnIncreasing"
  | "ChartNoAxesCombined"
  | "Expand"
  | "Settings2"
  | "Gauge"
  | "HeartPulse"
  | "Headset"
  | "Network"
  | "ShieldHalf"
  | "Clock"
  | "CalendarCheck"
  | "UsersRound"
  | "Coins"
  | "Workflow"
  | "Timer";

type IndustryCopy = { title: string; description: string };

export type IndustryReference = {
  title: string;
  operationLabel: string;
  ctaLabel?: string;
  audience: string;
  heroDescription: string;
  whyIntro: string;
  benefits: (IndustryCopy & { icon?: IndustryBenefitIcon })[];
  benefitMobileOrder?: number[];
  workflows: IndustryCopy[];
  reasons: (IndustryCopy & { image: string; alt: string })[];
  images: {
    hero: string;
    heroSmall: string;
    heroMobile: string;
    heroWidth: number;
    heroHeight: number;
    heroSmallWidth: number;
    workflow: string;
    workflowAlt: string;
    workflowWidth: number;
    workflowHeight: number;
    workflowPosition: string;
  };
};
