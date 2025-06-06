// app/sitemap.ts
import Templates from "@/lib/Templates";
import { MetadataRoute } from "next";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const baseUrl = process.env.SITE_URL! || 'http://localhost:3000';
    const now = new Date().toISOString();

    const templates = Templates;

    const urls: MetadataRoute.Sitemap = [
        {
            url: `${baseUrl}`,
            lastModified: now,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: now,
        },
        {
            url: `${baseUrl}/dashboard`,
            lastModified: now,
        },
         {
            url: `${baseUrl}/dashboard/billing`,
            lastModified: now,
        },
         {
            url: `${baseUrl}/dashboard/history`,
            lastModified: now,
        },
         {
            url: `${baseUrl}/dashboard/profile`,
            lastModified: now,
        },
        ...templates.map((p) => ({
            url: `${baseUrl}/content/${p.slug}`,
            // changeFrequency: 'never',
            lastModified: now,
        })),
    ];

    return urls;
}
