export type NavigationLink = { href: string; title: string; description?: string };
export const platformLinks: NavigationLink[] = [
  { href: "/ai-os/", title: "AI OS overview", description: "Specification, development and governance" },
  { href: "/agents/", title: "Century Agents", description: "Answers grounded in approved knowledge" },
  { href: "/systems/", title: "Century Systems", description: "Agents, integrations and workflow orchestration" },
  { href: "/ai-gateway/", title: "AI Gateway", description: "Model choice, data rules and usage visibility" },
  { href: "/deployment/", title: "Deployment", description: "Process audit, pilot and team handover" },
  { href: "/ai-transformation/", title: "AI transformation", description: "Choose the right approach for each task" },
];
export const industryLinks: NavigationLink[] = [
  { href: "/industries/banking/", title: "Banking", description: "Documents, policies and service operations" },
  { href: "/industries/telecommunication/", title: "Telecommunications", description: "Customer context across your operation" },
  { href: "/industries/healthcare/", title: "Healthcare", description: "Support the administrative work around care" },
  { href: "/industries/utilities/", title: "Utilities", description: "Connect service and operational knowledge" },
  { href: "/industries/insurance/", title: "Insurance", description: "Move paperwork forward with human review" },
  { href: "/industries/retail/", title: "Retail", description: "Answers for customers, stores and suppliers" },
  { href: "/industries/airlines/", title: "Airlines", description: "Keep teams informed when plans change" },
];
export const companyLinks: NavigationLink[] = [
  { href: "/about-us/", title: "About Century", description: "The people and principles behind the work" },
  { href: "/careers/", title: "Work with us", description: "Bring your experience to useful AI" },
  { href: "/press/", title: "Media & company", description: "Company information and brand resources" },
  { href: "/security/", title: "Security & control", description: "Your environment, your boundaries" },
  { href: "/contact/", title: "Contact", description: "Start a conversation with Vitali" },
];
