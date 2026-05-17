# Joseph Kenyon Portfolio

My portfolio website.

## Tech Stack

- **Static Site Generator:** [Eleventy (11ty)](https://www.11ty.dev/) (v3.1.5+)
- **Templating Engine:** [Nunjucks](https://mozilla.github.io/nunjucks/)
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) via [Wrangler](https://developers.cloudflare.com/workers/wrangler/)
- **Image Optimization:** [@11ty/eleventy-img](https://www.11ty.dev/docs/plugins/image/) (generates AVIF, WebP, and JPEG formats with responsive `<picture>` tags)
- **Styling:** Vanilla CSS (Modern CSS features, custom properties)
- **Automation:** Node.js, Puppeteer, and JSDOM for content syncing.

## Key Features

- **Automated Music Syncing:** A custom script (`scripts/fetch-music.js`) scrapes Bandcamp using Puppeteer to automatically generate portfolio entries for new music releases.
- **Responsive Images:** All images are processed through Eleventy's image plugin, ensuring they are resized and converted to modern formats (AVIF/WebP) for optimal performance.
- **HTML Prettification:** Output HTML is automatically formatted using Prettier during the build process.
- **SEO Ready:** Includes a sitemap, robots.txt, and metadata-rich `<head>` (via `_data/meta.js`).

## 📁 Project Structure

```text
├── _data/              # Global data files (meta, about, icons)
├── _includes/          # Layouts and reusable Nunjucks components
├── content/            # Markdown source files for all pages
│   ├── about/          # About page content
│   ├── art/            # Art portfolio entries
│   ├── music/          # Music portfolio entries (auto-generated)
│   └── projects/       # Development project entries
├── css/                # Global and root CSS styles
├── public/             # Static assets (fonts, background, robots.txt)
├── scripts/            # Automation and sync scripts
├── eleventy.config.js  # Main Eleventy configuration
└── wrangler.json       # Cloudflare Pages configuration
```

## Local Development

### Prerequisites

- [Node.js](https://nodejs.org/) (latest LTS recommended)
- [npm](https://www.npmjs.com/)

### Setup

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/JoeKenyon/josephkenyon.co.uk.git
    cd josephkenyon.co.uk
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Commands

- **Start development server:**
  ```bash
  npm run dev
  ```
  This runs Eleventy with `--serve` and hot-reloading.

- **Build for production:**
  ```bash
  npm run build
  ```
  Generates the static site in the `_site/` directory.

- **Sync music from Bandcamp:**
  ```bash
  npm run sync-music
  ```
  Uses Puppeteer to fetch latest releases and update `content/music/`.

- **Deploy to Cloudflare Pages:**
  ```bash
  npm run deploy
  ```
  Builds the site and deploys it using Wrangler.

## Styling

The site uses vanilla CSS located in the `/css` directory.
- `root.css`: Global variables, resets, and typography.
- `index.css`: Layout-specific styles and component overrides.

## Image Management

Images should be placed within their respective folders in `content/` or `public/img/`. Using the `{% image %}` shortcode in Nunjucks templates ensures they are processed correctly:

```njk
{% image "./path/to/image.jpg", "Alt text", [400, 800, 1200] %}
```

## License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.
