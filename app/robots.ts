import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    host: "https://globe-graph.vercel.app",
    sitemap: "https://globe-graph.vercel.app/sitemap.xml",
  };
};

export default robots;
