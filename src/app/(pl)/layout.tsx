import type { Metadata } from "next";
import Document from "@/components/Document";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export default function PolishLayout({ children }: { children: React.ReactNode }) {
  return <Document locale="pl">{children}</Document>;
}
