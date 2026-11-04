import { articles } from "./articles";
import { companyLinks, industryLinks, platformLinks } from "./navigation";

export const SITE_ROUTES = [
  "/",
  ...platformLinks.map(link => link.href),
  "/industries/",
  ...industryLinks.map(link => link.href),
  ...companyLinks.map(link => link.href),
  "/blog/",
  ...articles.map(article => `/blog/${article.slug}/`),
  "/privacy/",
];
