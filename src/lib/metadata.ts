import type { Metadata } from "next";
import { SITE_NAME, SITE_URL } from "./site";

export function pageMetadata(title: string, description: string, path: string): Metadata {
  const canonical = path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, "")}/`;
  const pageTitle = `${title} | ${SITE_NAME}`;
  const image = { url: `${SITE_URL}/og/century-ai-eu.png`, width: 1200, height: 630, alt: "Century — Enterprise AI. Under your control." };
  return { title: pageTitle, description, alternates: { canonical }, openGraph: { title: pageTitle, description, url: canonical, type: "website", siteName: SITE_NAME, images: [image] }, twitter: { card: "summary_large_image", title: pageTitle, description, images: [image] } };
}
