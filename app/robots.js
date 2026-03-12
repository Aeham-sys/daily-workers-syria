export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/private/",
    },
    sitemap: "https://daily-workers-syria.netlify.app/sitemap.xml",
  };
}
