# SEO Improvement Plan

To improve the visibility of "عمّال" in search engines, we will focus on technical SEO, content optimization, and structured data.

## Proposed Changes

### Configuration
#### [NEW] [robots.txt](file:///c:/Users/Ayahm%20AlMazyad/Desktop/project%20o/app/robots.js)
- Define crawling rules and link to the sitemap.

#### [NEW] [sitemap.js](file:///c:/Users/Ayahm%20AlMazyad/Desktop/project%20o/app/sitemap.js)
- Generate a dynamic sitemap for all pages.

### Global Metadata
#### [MODIFY] [layout.js](file:///c:/Users/Ayahm%20AlMazyad/Desktop/project%20o/app/layout.js)
- Add keywords and canonical URL.
- Add local icons (favicon).

### Structured Data (JSON-LD)
#### [MODIFY] [page.js](file:///c:/Users/Ayahm%20AlMazyad/Desktop/project%20o/app/page.js)
- Add `WebSite` and `LocalBusiness` schema.

### Component Optimization
#### [MODIFY] [WorkerCard.js](file:///c:/Users/Ayahm%20AlMazyad/Desktop/project%20o/components/WorkerCard.js)
- Ensure worker names and skills are semantically marked up.

## Verification Plan

### Automated Tools
- Use Google Search Console (already verified).
- Run Lighthouse SEO audit.
- Test structured data using [Schema Markup Validator](https://validator.schema.org/).
