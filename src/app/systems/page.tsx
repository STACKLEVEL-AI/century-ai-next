import PlatformFrame from "@/components/platform/PlatformFrame";
import SystemsExperience from "@/components/platform/SystemsExperience";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Century Systems",
  "Turn business requests into tested workflows through specification, development and governance, connecting company knowledge, agents and existing systems",
  "/systems",
);

export default function SystemsPage() {
  return <PlatformFrame headerVariant="overlay" showContact={false}><SystemsExperience /></PlatformFrame>;
}
