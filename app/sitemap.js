export default async function sitemap() {
  const baseUrl = "https://daily-workers-syria.netlify.app";

  // In a real app, you would fetch all dynamic routes (workers, jobs) here
  // For now, we add the static main routes
  const routes = ["", "/workers", "/jobs", "/post-job", "/register-worker"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: route === "" ? 1 : 0.8,
    })
  );

  return [...routes];
}
