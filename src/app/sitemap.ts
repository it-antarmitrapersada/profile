import type { MetadataRoute } from "next";

const BASE_URL = "https://profile.ampersada.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/about",
    "/services",
    "/gallery",
    "/careers",
    "/contact",
  ];

  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    priority: route ? 0.8 : 1,
  }));
}
