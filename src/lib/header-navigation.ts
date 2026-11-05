import type { NavigationLink } from "./navigation";

export type HeaderNavigationGroup = {
  id: "platform" | "industries" | "company";
  label: string;
  links: NavigationLink[];
};

// Header presentation is independent of the footer and the public route registry.
export const headerNavigation: HeaderNavigationGroup[] = [
  {
    id: "platform",
    label: "Platform",
    links: [
      { href: "/ai-os/", title: "AI OS Overview", description: "One operating layer for knowledge, workflows and oversight" },
      { href: "/agents/", title: "Century Agents", description: "Bring useful AI into everyday work" },
      { href: "/systems/", title: "Century Systems", description: "Business tools shaped around your workflows" },
      { href: "/ai-gateway/", title: "Century AI Gateway", description: "Model access, usage and controls in one place" },
      { href: "/deployment/", title: "Deployment", description: "Start with a clear scope and ownership" },
      { href: "/ai-transformation/", title: "Strategy", description: "Turn AI ambition into a practical plan" },
    ],
  },
  {
    id: "industries",
    label: "Industries",
    links: [
      { href: "/industries/banking/", title: "Banking", description: "Knowledge for regulated operations" },
      { href: "/industries/telecommunication/", title: "Telecommunications", description: "Customer workflows at scale" },
      { href: "/industries/utilities/", title: "Utilities", description: "AI for critical service operations" },
      { href: "/industries/healthcare/", title: "Healthcare", description: "Support for the work around care" },
      { href: "/industries/retail/", title: "Retail", description: "Connected workflows across channels" },
      { href: "/industries/insurance/", title: "Insurance", description: "Document workflows with human review" },
      { href: "/industries/airlines/", title: "Airlines", description: "Operational support when plans change" },
    ],
  },
  {
    id: "company",
    label: "Company",
    links: [
      { href: "/about-us/", title: "About" },
      { href: "/careers/", title: "Careers" },
      { href: "/press/", title: "Press" },
    ],
  },
];
