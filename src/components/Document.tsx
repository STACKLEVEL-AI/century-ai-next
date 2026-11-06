import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";
import "@/app/globals.css";
import "@/app/site.css";
import "@/app/products.css";
import "@/app/industries.css";
import "@/app/company.css";
import "@/app/design.css";
import "@/app/inner.css";
import "@/app/products-refined.css";
import "@/app/industries-refined.css";
import "@/app/company-refined.css";
import "@/app/localization.css";

const inter = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-inter", display: "swap" });

export default function Document({ children, locale }: { children: ReactNode; locale: Locale }) {
  return <html lang={locale} className={inter.variable}><body>{children}</body></html>;
}
