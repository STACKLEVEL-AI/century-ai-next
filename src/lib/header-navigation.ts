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
      { href: "/ai-os/", title: "AI Platform", description: "Specification, development and governance in one platform" },
      { href: "/agents/", title: "Century Agents", description: "Answers grounded in approved knowledge" },
      { href: "/systems/", title: "Century Systems", description: "Agents, integrations and workflow orchestration" },
      { href: "/ai-gateway/", title: "Century AI Gateway", description: "Model choice, data rules and usage visibility" },
      { href: "/deployment/", title: "Deployment", description: "Process audit, pilot and team handover" },
      { href: "/ai-transformation/", title: "Strategy", description: "Choose the right approach for each task" },
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
