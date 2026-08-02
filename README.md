# Sergii Khomenko — Engineering Portfolio

A custom, production-ready portfolio for Sergii Khomenko. The site positions
software quality as an engineering specialization grounded in automation
architecture, software development, reliable delivery, developer productivity,
and practical AI evaluation.

Production target: [https://skhomenko.github.io](https://skhomenko.github.io)

## Technology

- Astro with strict TypeScript
- Astro content collections with Markdown case studies
- A maintainable, token-driven CSS design system
- Minimal client-side JavaScript (mobile navigation only)
- Static HTML output for GitHub Pages
- GitHub Actions deployment

## Local setup

Requirements: a current Node.js LTS release and npm.

```bash
make install
make dev
```

The development server prints the local URL, usually
`http://localhost:4321`.

Use the production-style preview when you want to validate the site exactly as
it will be built:

```bash
make start
```

`make start` checks formatting, runs Astro and TypeScript diagnostics, creates
the static site in `dist/`, and starts the preview server. Press `Ctrl+C` to
stop either local server.

## Make commands

```text
make install      Install locked dependencies
make dev          Start the hot-reload development server
make start        Validate, build, and start the production preview
make verify       Run all checks and create a production build
make format       Check source formatting
make format-fix   Apply Prettier formatting
make check        Run Astro and TypeScript diagnostics
make build        Create the production build
make preview      Preview an existing production build
make help         Show the available commands
```

The underlying `npm run ...` commands remain available when needed.

## Project structure

```text
src/
  components/      Reusable UI and system-diagram components
  content/work/    Markdown case studies
  data/            Editable profile, project, career, skills, and principle data
  layouts/         Shared page and case-study layouts
  pages/           Astro routes
  styles/          Design system and responsive styles
public/
  resume/          Public résumé PDF destination
.github/workflows/ GitHub Pages deployment
```

## Editing content

Central profile and configuration values live in:

- `src/data/site.ts` — canonical URL and public contact links
- `src/data/profile.ts` — hero, positioning, and about copy
- `src/data/capabilities.ts` — professional value areas
- `src/data/projects.ts` — homepage and work-page project cards
- `src/data/experience.ts` — career progression
- `src/data/skills.ts` — technology groups
- `src/data/principles.ts` — engineering principles

Update repeated information in these files instead of hardcoding it in
components.

## Editing case studies

Detailed case studies live in `src/content/work/*.md`. Frontmatter is validated
by `src/content.config.ts`. Each case study separates personal responsibility,
collaboration, completed work, sanitized information, and planned concepts.

When adding a case study:

1. Add the Markdown file under `src/content/work/`.
2. Add its summary card in `src/data/projects.ts`.
3. Include a unique title and description.
4. Label future work explicitly; do not imply it is complete.
5. Keep employer architecture and internal details abstract.

## Résumé

Place the updated, privacy-safe PDF at:

```text
public/resume/sergii-khomenko-resume.pdf
```

The stable public URL will be:

```text
/resume/sergii-khomenko-resume.pdf
```

Do not publish an older résumé before removing the home address, phone number,
internal project details, and other private information.

## GitHub Pages deployment

The workflow in `.github/workflows/deploy.yml` runs on pushes to `main` and can
also be started manually. It:

1. Installs locked dependencies.
2. Checks formatting.
3. Runs Astro and strict TypeScript diagnostics.
4. Builds and uploads the static site.
5. Deploys the artifact to GitHub Pages.

In the GitHub repository:

1. Open **Settings → Pages**.
2. Set **Source** to **GitHub Actions**.
3. Push to `main` or run **Deploy to GitHub Pages** manually.

The workflow follows Astro's current
[GitHub Pages guidance](https://docs.astro.build/en/guides/deploy/github/) and
uses the framework-maintained build action.

## Repository rename

The site is configured for a user site at `https://skhomenko.github.io`, so
`astro.config.ts` intentionally has no `/about-me/` base path.

Before production deployment:

1. Rename the GitHub repository from `about-me` to `skhomenko.github.io`.
2. Confirm the repository owner is `skhomenko`.
3. Confirm `src/data/site.ts` still uses `https://skhomenko.github.io`.
4. Enable GitHub Actions as the Pages source.

Deploying this configuration from a project repository named `about-me` will
not create a working `/about-me/` site because root-path deployment is the
explicit production target.

## Future custom domain

To use a custom domain later:

1. Change `siteConfig.url` in `src/data/site.ts`.
2. Add the domain in GitHub **Settings → Pages**.
3. Add `public/CNAME` containing only the domain.
4. Update DNS using GitHub's current custom-domain documentation.
5. Update the sitemap URL in `public/robots.txt`.

Keep the site at the root path; no Astro `base` value is required.

## Accessibility

- Semantic page landmarks and heading hierarchy
- Keyboard-accessible navigation and actions
- Skip-to-content link
- Visible focus indicators
- High-contrast palette
- Touch-friendly targets
- No color-only state communication
- Responsive type and layouts down to 320 px
- Reduced-motion support

## Performance

The site is statically rendered, uses system fonts, contains no remote images
or heavy animation libraries, and hydrates only a small mobile-navigation
script. Diagrams are HTML and CSS rather than large media assets. The single
social-sharing image is not used in visible page layout.

## Configuration

- Canonical site and public contact values: `src/data/site.ts`
- Astro root URL and build behavior: `astro.config.ts`
- Content schema: `src/content.config.ts`
- Design tokens: top of `src/styles/global.css`
- Deployment: `.github/workflows/deploy.yml`

## Content TODOs before launch

- Replace `hello@example.com` with Sergii's public professional email.
- Replace the LinkedIn placeholder with the exact public profile URL.
- Add the updated sanitized résumé PDF.
- Verify employer dates and locations from the new public résumé before adding
  them.
- Add only validated metrics; do not invent impact percentages or scale.
- Review the wording of current independent engineering and applied AI work.
- Confirm the Test Automation Reporting Platform's public completion status.
