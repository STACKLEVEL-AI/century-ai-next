import PlatformFrame from "@/components/platform/PlatformFrame";
import AgentsExperience from "@/components/platform/AgentsExperience";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Century Agents",
  "Build no-code and multi-agent workflows grounded in company knowledge, with document permissions, source references, APIs and MCP integrations",
  "/agents",
);

export default function AgentsPage() {
  return <PlatformFrame headerVariant="overlay" showContact={false}><AgentsExperience /></PlatformFrame>;
}
