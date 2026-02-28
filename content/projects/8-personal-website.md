---
name: Personal Website
description: This website!
thumbnail: /projects/personal-website/1.png
github: chakornk/chakornk.github.io
website: https://chakornk.dev/
skills: Astro, Tailwind
---

My main goals for this website are to make it simple, fast, and maintainable. Astro is a great choice for this because it excels at generating static sites and supports loading content from markdown files.

![Home page](/projects/personal-website/1.png)

Previously, I made my personal website as a SPA with Preact and Vite. However, I found that it took too much effort to add new content, and thus was not very maintainable. Astro, on the other hand, makes it easy to add new content without much effort.

My previous website also had fancy animations, which was rather excessive. Since my new goal is to make my site simple and fast, I removed loading animations and optimized the site to load as fast as possible.

## Optimization

I used PageSpeed Insights to benchmark the performance of the site, achieving a performance score of 100 with a 300ms LCP on Desktop.
![PageSpeed Insights](/projects/personal-website/2.png)

Here is how I optimized the site:

### Client-side Navigation

Astro supports client-side navigation, which fetches the page content from the server and updates the page without a full page reload. This makes navigation feel faster and responsive. Since each page is small (less than 10KB), they can also be prefetched, which makes navigation even faster.

### JavaScript

By default, Astro creates multiple JavaScript chunks. However, since all of my pages shared the same JavaScript code, I combined all of them into a single chunk to reduce the number of requests.

### Images

I optimized all images to be as small as possible by using Sharp to convert them to WebP format and resizing them to be at the maximum render size. This reduced the size of the images to be between 7KB and 50KB, a significant reduction. Since I use Vercel for hosting, I also added custom cache headers to make sure the images are cached for 7 days, preventing unnecessary requests.

### Fonts

The loading time of fonts is crucial as they block the initial rendering of the page. While the `font-display` property could be set to `swap` to allow the page to be rendered with a fallback font, this approach would cause the page's layout to change when the actual font is loaded. Instead, I optimized the font to only include ASCII glyphs, which drastically reduces the size of the font files.

## Tech stack

- **Frontend**: Astro, Tailwind
