import PlatformFrame from "@/components/platform/PlatformFrame";
import AgentsExperience from "@/components/platform/AgentsExperience";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Century Agents",
  "Put company knowledge to work with AI agents for customer support, document workflows and employee assistance, with clear responsibilities and human review.",
  "/agents",
);

export default function AgentsPage() {
  return <PlatformFrame headerVariant="overlay" showContact={false}><AgentsExperience /></PlatformFrame>;
}
