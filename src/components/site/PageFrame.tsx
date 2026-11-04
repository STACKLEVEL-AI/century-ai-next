import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function PageFrame({ children, showContact = true, headerVariant = "light" }: { children: ReactNode; showContact?: boolean; headerVariant?: "light" | "overlay" }) {
  return <><Header variant={headerVariant} /><main id="main-content" tabIndex={-1}>{children}{showContact && <Contact />}</main><Footer /></>;
}
