import PlatformFrame from "@/components/platform/PlatformFrame";
import SystemsExperience from "@/components/platform/SystemsExperience";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Century Systems",
  "Build AI-assisted business systems around your workflows, people and existing tools. Explore focused workspaces for customer, knowledge and internal operations.",
  "/systems",
);

export default function SystemsPage() {
  return <PlatformFrame headerVariant="overlay" showContact={false}><SystemsExperience /></PlatformFrame>;
}
