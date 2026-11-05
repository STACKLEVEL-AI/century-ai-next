import { notFound } from "next/navigation";
import IndustryReferencePage from "@/components/industries/IndustryReferencePage";
import { getIndustry, industries } from "@/lib/industries";
import { industryReferencePages } from "@/lib/industry-reference-pages";
import { pageMetadata } from "@/lib/metadata";

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map(({ slug }) => ({ slug }));
}

type IndustryPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  return pageMetadata(industry.seoTitle, industry.description, `/industries/${industry.slug}`);
}

export default async function IndustryPage({ params }: IndustryPageProps) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  return <IndustryReferencePage slug={industry.slug} data={industryReferencePages[industry.slug]} />;
}
