import type { APIRoute } from "astro";
import { posts } from "../data/journal";

export const prerender = false;

export const GET: APIRoute = ({ url }) => {
  const origin = url.origin;
  const staticRoutes = ["/", "/stations", "/test-drives", "/blog", "/membership", "/about", "/contact"];
  const postRoutes = posts.map((p) => `/blog/${p.slug}`);
  const all = [...staticRoutes, ...postRoutes];
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${all.map((r) => `  <url><loc>${origin}${r}</loc><changefreq>weekly</changefreq></url>`).join("\n")}
</urlset>`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
