# Repo Explorer

Use this guide when you need a fast overview of the project before making changes.

## Project summary

- Gatsby 5 site built with React 18
- Personal blog and portfolio structure
- Markdown-driven page generation through Gatsby templates
- Netlify and Docker deployment files are present

## Key entry points

- `package.json`: scripts and dependencies
- `gatsby-config.js`: site metadata and Gatsby plugins
- `gatsby-node.js`: dynamic page creation for Markdown content
- `src/pages/index.js`: homepage
- `src/pages/*.js`: top-level routes
- `src/templates/*.js`: generated content views
- `src/utils/config.js`: site-level configuration

## Main directories

- `src/components`: shared UI components
- `src/pages`: route files
- `src/templates`: page templates
- `src/data`: static data such as project lists
- `src/utils`: helpers, hooks, config
- `src/styles`: CSS files
- `static`: public assets

## Local commands

- `npm run develop`: start local Gatsby development server
- `npm run build`: production build
- `npm run serve`: serve the built site
- `docker-compose up blog-dev`: Docker development flow

## Things to verify early

- Whether a `content/` directory is expected but missing
- Whether homepage imports still point to removed content assets
- Whether old site metadata still references `berkcan.tech`
- Whether pages that depend on Markdown data still build correctly

## Good first checks

1. Read `package.json` to confirm scripts and dependencies.
2. Read `gatsby-config.js` and `gatsby-node.js` to understand content flow.
3. Open `src/pages/index.js` and `src/utils/config.js` for branding and homepage logic.
4. Scan `src/components` if the change touches layout, navigation, or SEO.
