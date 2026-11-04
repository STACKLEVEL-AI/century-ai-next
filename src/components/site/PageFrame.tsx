import type { ReactNode } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Contact from "@/components/Contact";

export default function PageFrame({ children, showContact = true }: { children: ReactNode; showContact?: boolean }) {
  return <><Header variant="light" /><main id="main-content" tabIndex={-1}>{children}{showContact && <Contact />}</main><Footer /></>;
}
