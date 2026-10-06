# Life App frontend foundation

A React application built from supplied designs. Its first feature, `src/features/conversation/`, is a sequential, videogame-style dialogue scene driven by a data-only flow (`demo-conversation.ts`) at `/chat`. It uses CSS Modules at the brief's request and React Router for navigation; there is no remote data or component library yet. The root route `/` temporarily redirects to `/chat` until the home page is defined. Unknown routes show a minimal page-not-found message.

## Mandatory project skill

[life-app-frontend](.agents/skills/life-app-frontend/SKILL.md) contains the project's engineering workflow, with a linked reference for design implementation and browser/visual validation. Root [AGENTS.md](AGENTS.md) requires agents to read and apply it for all project work, even without an explicit invocation. Its instructions are scoped to this repository and versioned with the project; no personal skill installation is required.

You can explicitly invoke it as `$life-app-frontend`. Codex supports repository discovery from `.agents/skills`; implicit invocation is enabled in the skill metadata. If the skill does not appear in the selector, restart Codex. The `AGENTS.md` requirement also tells agents to read its file directly. See the official [skills documentation](https://learn.chatgpt.com/docs/build-skills) and [AGENTS.md documentation](https://learn.chatgpt.com/docs/agent-configuration/agents-md).

The mandatory requirement is a repository instruction for agents. Existing lint rules, tests, and CI enforce the checks they can measure; they do not prove an agent read a document or that an implementation matches a design. Preserve browser inspection and reference comparison as part of completion.

## Install and run

Use Node **22.17.1** (`.nvmrc`) and npm **11.6.2** for the validated environment. The package engines enforce the supported Node range; the lockfile and exact direct versions make installations reproducible.

```sh
npm ci
npx playwright install chromium
npm run dev
```

Open `/chat` at the local URL printed by Vite. No `.env` file is required. For Linux browser system dependencies, use `npx playwright install --with-deps chromium`.

## Architecture

```text
src/
  app/
    app.tsx              Application composition and minimal shell
    providers/           Reserved for providers with actual consumers
    router/              Route definitions and temporary home redirect
    styles/app.css       Tailwind entry and global browser defaults
  features/              Future domain modules, created only as needed
  components/
    ui/                  Primitives after a repeated design pattern exists
    layout/              Layouts after genuine reuse exists
  lib/
    env.ts               Validated public environment boundary
    api/                 Future shared transport concerns
    validation/          Future shared validation rules
    utils/               Genuinely shared non-domain utilities
  assets/                Approved assets and fonts
  styles/tokens.css      CSS custom properties / Tailwind theme bridge
  test/setup.ts          React Testing Library cleanup and DOM matchers
tests/
  fixtures.ts            Browser diagnostics shared by both suites
  e2e/                   Real-browser behavior
  visual/                Screenshot tests and reviewed baselines
```

Feature folders may contain `api/`, `components/`, `hooks/`, `schemas/`, `types/`, and `utils/`. Create only directories with a purpose; there is no artificial example domain. Import concrete files using `@/`, such as `@/features/users/schemas/user.schema`. Vite, TypeScript, and Vitest share this resolution.

Application composition depends on features; features may depend on shared components and libraries. Shared code must not depend on features or application composition. ESLint prevents those reverse alias imports, deep relative imports, and decentralized environment access. Cross-feature orchestration belongs in `app/`; the dependency policy also applies to imports not statically covered by lint.

The runtime dependencies are React, React DOM, React Router, and Zod. React Router uses declarative routes with a browser router at startup. Version 7.18.4 supports the project's pinned Node version. TanStack Query and React Hook Form are deferred until remote state or non-trivial forms justify them. No extra providers or speculative UI primitives are needed for the shell. TypeScript 6.0.3 is pinned for compatibility with typed ESLint; jsdom 28 supports the validated Node version.

## Commands

| Command                      | Purpose                                                            |
| ---------------------------- | ------------------------------------------------------------------ |
| `npm run dev`                | Start Vite with hot reload                                         |
| `npm run build`              | Typecheck and produce `dist/`                                      |
| `npm run preview`            | Inspect the production build locally                               |
| `npm run typecheck`          | Check application, tests, and tooling with strict TypeScript       |
| `npm run lint`               | Typed ESLint, hooks, architecture guards; zero warnings            |
| `npm run format`             | Apply Prettier                                                     |
| `npm run format:check`       | Check formatting without modifying files                           |
| `npm run test`               | Run Vitest and React Testing Library once                          |
| `npm run test:watch`         | Watch unit and component tests                                     |
| `npm run test:e2e`           | Production-build browser smoke tests at four widths                |
| `npm run test:visual`        | Compare against existing screenshots; never create them implicitly |
| `npm run test:visual:update` | Explicitly create or replace screenshot baselines for review       |
| `npm run test:report`        | Open the most recent Playwright HTML report                        |
| `npm run check`              | Formatting, types, lint, unit tests, build, e2e, and visual checks |

After changes, run `npm run format` and `npm run check`. Browser suites each own a production preview on port **4173**, rebuilding it to avoid validating stale output. Run the suites sequentially and leave that port free; an existing server is intentionally not reused. The repeated builds make individual commands independently reliable.

## Testing and browser inspection

Vitest uses jsdom, explicit test imports, DOM matchers, and automatic cleanup. Component tests walk the conversation flow; environment tests verify schema rejection. Add behavior-focused tests near the affected module rather than testing implementation details or chasing coverage.

Playwright tests Chromium at **390×844**, **768×1024**, **1366×768**, and **1920×1080**. These are validation viewports, not approved responsive design breakpoints. Both suites fail on unexpected console warnings/errors, uncaught runtime errors, failed requests, and HTTP errors. The e2e suite checks the scene, horizontal overflow, and a keyboard-only walk through the conversation. Failure screenshots and traces are written under `test-results/`, with an HTML report under `playwright-report/`.

For interactive inspection, run `npm run test:e2e -- --headed --project=e2e-laptop`, or open the Vite dev URL. Test keyboard behavior and every relevant state as features are added. The initial scope has no interactions or asynchronous data states. Browser coverage currently means Chromium; add Firefox/WebKit when product browser support is defined.

On Windows PowerShell, use `npm.cmd` instead of `npm` when forwarding extra arguments after `--`; some npm PowerShell shims consume that separator. The required scripts without extra arguments work with either command.

## Visual regression and design handoff

The checked-in screenshots cover the conversation opening line and a question with a typed answer. The tests pin locale, timezone, color scheme, reduced motion, scale, viewport, and clock, wait for fonts, and disable screenshot animations. Future tests must also fixture remote data, localize assets, control randomness, and wait for explicit stable UI states. Do not use arbitrary sleeps.

1. Inspect the entire supplied reference, responsive variants, exact fonts/assets, and states.
2. Implement the UI and run it at the reference dimensions plus representative responsive widths.
3. Compare the actual output with the reference and correct differences.
4. Run `npm run test:visual`. Review failure artifacts and the design before accepting any change.
5. For intentional changes, run `npm run test:visual:update`, inspect all updated PNGs, then rerun `npm run test:visual`.
6. Commit the reviewed PNGs alongside the code and summarize any remaining assumptions.

Baselines live at `tests/visual/__screenshots__/<platform>/<project>/`. **Windows is canonical**, matching initial validation and the Windows CI runner. Use `npm ci` and its matching Playwright Chromium to compare them. OS and font rendering can change pixels; on macOS/Linux the visual command intentionally fails until that platform's baselines are generated, inspected, and committed. Do not copy Windows PNGs to other platforms or treat new screenshots as automatically approved. Playwright documents these environment constraints in its [visual comparison guide](https://playwright.dev/docs/test-snapshots).

## Styling and tokens

Tailwind 4 is integrated through its [official Vite plugin](https://tailwindcss.com/docs/installation/using-vite). `src/styles/tokens.css` uses `@theme` to expose CSS variables as utilities such as `bg-background` and `font-body`.

The supplied typography uses local Red Hat Text for body copy at `18px`, line-height `1.65`, and letter-spacing `-0.01em`. Headings `h1` through `h3` use Red Hat Display with letter-spacing `-0.025em`. The `font-body` and `font-display` utilities expose these families. Normal variable fonts and their SIL Open Font Licenses live in `src/assets/fonts/`, sourced from [Google Fonts Red Hat Text](https://github.com/google/fonts/tree/main/ofl/redhattext) and [Red Hat Display](https://github.com/google/fonts/tree/main/ofl/redhatdisplay); rendering does not request remote fonts.

The supplied color palette is defined in `src/styles/tokens.css` through Tailwind 4's CSS theme. It includes primary and secondary colors with content, dark, and light variants; background, foreground, and border; three copy levels; and success, warning, and error colors with matching content colors. Use `bg-background` for the page, `bg-foreground` for surfaces, `text-copy` for default text, and `border-border` for borders. Semantic pairs such as `bg-primary text-primary-content` are available without a JavaScript Tailwind configuration.

Unevidenced Tailwind palette, typography, radius, shadow, breakpoint, and container scales are cleared. Tailwind's spacing utility mechanism remains available; its scale is a tool, not a design requirement. Add real tokens from supplied specifications and retain exact one-off values when required. Do not infer a layout from this shell, choose a replacement font, or invent responsive transformations. Keep geometry close to JSX and extract components only when patterns repeat.

## Environment and delivery

`.env.example` documents the empty configuration contract. `src/lib/env.ts` validates Vite's `BASE_URL` and `MODE` at startup and is the only application module allowed to read `import.meta.env`. Add custom variables to that schema and `.env.example` when needed, with useful validation messages. Required settings should fail early rather than cause later undefined behavior. All `VITE_*` values are public build-time data; credentials belong on a server, never in this repository or the client bundle.

`npm run build` produces static assets in `dist/`. `npm run preview` is a local inspection server, not a production host. Production hosting must serve `index.html` for application routes such as `/chat` so direct visits and refreshes work; Vite handles this locally. Select the host-specific SPA fallback, API behavior, and required environment settings when hosting is defined. No deployment is configured or performed by this foundation.

The included GitHub Actions workflow uses Windows and runs the complete quality gate, retaining reports on failure. Read [AGENTS.md](AGENTS.md) before contributing; it defines the design-fidelity and validation contract for humans and autonomous agents.
