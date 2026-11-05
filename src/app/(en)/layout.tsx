import type { Metadata } from "next";
import Document from "@/components/Document";
import { SITE_URL } from "@/lib/site";
import { LOCALE } from "@/lib/locale";

export const metadata: Metadata = { metadataBase: new URL(SITE_URL) };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <Document locale={LOCALE}>{children}</Document>;
}
