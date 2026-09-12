# Personal Website

Built with [Astro](https://astro.build/).

## Prerequisites

- Node.js
- Yarn (Corepack)

## Setup

```bash
yarn install
```

## Project tech stacks

Project Markdown files in `content/projects/` and `content/projects-hackathon/`
can define a grouped `stack` in frontmatter:

```yaml
stack:
  Frontend: [Next.js, React, Tailwind]
  Backend: [Node.js]
  Database: [PostgreSQL]
```

The project page renders these groups after the Markdown content, using the same
icon chips as the home page's Technical Skills. Keep `skills` for the compact
project-card and header tags; don't add a separate Tech stack heading in Markdown.

Shared icons, hover colors, and links live in `content/technologies.yml`. Use the
same technology names in frontmatter and the home page's `content/experience.yml`.
Names without catalog entries render as plain chips with a generic code icon.

## Development

```bash
yarn dev
```

## Build

```bash
yarn build
```

## Preview

```bash
yarn preview
```
