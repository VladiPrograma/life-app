# Agent guide

## Mandatory project skill

Before implementing, reviewing, debugging, or maintaining anything in this repository, read and apply [life-app-frontend](.agents/skills/life-app-frontend/SKILL.md). This is required even when the user does not mention the skill. If it is absent from the skill selector, open the file directly; automatic discovery is not a prerequisite for following it.

The skill is the detailed project workflow; the rules below are its always-visible summary. For UI work, also read the design-validation reference linked from the skill. Apply checks according to the change scope. Do not weaken this requirement, bypass validation, or redesign supplied UI unless explicitly instructed by the user. Keep this summary and the skill consistent when project conventions change.

## Start here

- Inspect this file, related code, nearby components, tokens, and tests before editing.
- Search for existing patterns before creating a component, abstraction, or dependency.
- Use English for code, filenames, comments, documentation, and change descriptions.
- Use npm and preserve `package-lock.json`. Do not add dependencies without a concrete need.

## Stack and boundaries

- React, strict TypeScript, Vite, Tailwind CSS 4, Zod, ESLint, Prettier, Vitest, React Testing Library, Playwright.
- `src/app/`: application composition, startup styles, future providers and routing.
- `src/features/<feature>/`: domain-owned components, API functions, hooks, schemas, types, and utilities. Create only the subfolders needed.
- `src/components/ui/` and `layout/`: genuinely shared primitives and layouts. Keep domain components in their feature until reuse exists.
- `src/lib/`: shared non-UI infrastructure. Network transport belongs in `lib/api/`; domain API contracts belong in the feature.
- `src/styles/tokens.css`: shared visual tokens. `src/assets/`: exact approved local assets and fonts.
- Colocate `*.test.ts(x)` with implementation. Shared unit setup is in `src/test/`; browser suites are in `tests/`.
- Import concrete files through `@/` when crossing directories. No unnecessary barrel exports. Shared code must not import features or app composition; features must not import app composition. Compose cross-feature flows in `app/`.
- Strict types are mandatory. Avoid `any`, unjustified assertions, and trusting external data. Validate external boundaries with Zod. Read environment variables only through `src/lib/env.ts`; never include secrets in browser configuration.

## Design and components

- **The supplied design is authoritative. Never redesign, reinterpret, simplify, or "improve" it without an explicit request.** Inspect the full reference, layout relationships, responsive variants, component states, and exact assets before coding.
- Preserve exact geometry, colors, type, crop, density, and hierarchy. Use the supplied fonts; do not silently substitute. Keep font loading local and deterministic where licensing allows.
- Prefer existing evidenced patterns when information is missing. Record unresolved assumptions near the affected code or in the task summary and isolate them for easy revision.
- The current shell layout is temporary infrastructure, not a product design. Approved typography uses local Red Hat Text for body copy (`18px`, `1.65` line-height, `-0.01em` tracking) and Red Hat Display for `h1`–`h3` (`-0.025em` tracking). The approved color palette lives in `src/styles/tokens.css`: use `background` for the page, `foreground` for surfaces, and `copy` for text. No broader typography scale, breakpoints, radii, or shadows are approved yet. Tailwind default design scales are not design evidence.
- Tailwind is the primary styling mechanism. Keep layout visible in components. Use CSS variables for repeated stable design values, exact literals for unique measurements, and inline styles only for runtime values.
- Small, explicit components with one clear responsibility; composition over configuration. Temporary duplication is preferable to speculative abstractions, wrapper layers, or styling DSLs.
- Use semantic HTML, labels, keyboard interactions, visible focus, and intentional states. Implement loading, empty, error, disabled, hover, focus, and success states when relevant. Never silently swallow failures or expose sensitive diagnostics to users.
- No UI framework may impose a visual language. Add accessibility primitives only when their behavior is needed and keep their appearance under project control.

## State and data

- Local state first; context only for genuinely shared context. Add React Router when real routes exist, TanStack Query when remote data exists, and React Hook Form for non-trivial forms.
- Keep requests out of presentation components. Centralize transport concerns; feature APIs own typed contracts and Zod schemas. Handle cancellation, retries, and failure states intentionally when adding transport.
- Do not duplicate server state into client stores. Do not introduce global stores, providers, optimization layers, or generalized API clients without evidence.

## Validation and completion

1. Format: `npm run format`.
2. For code changes, always run `npm run typecheck`, `npm run lint`, and `npm run test`. Add meaningful behavioral tests for critical logic and regression risks. For documentation/instruction-only changes, verify formatting, links, metadata, and consistency with the repository.
3. For code changes, run `npm run build`. For UI changes also run `npm run test:e2e` and `npm run test:visual` (or the full `npm run check`). First install browsers with `npx playwright install chromium`.
4. For UI changes, run the affected page in a real browser. Inspect console, runtime errors, requests, interactions, focus behavior, and actual output at mobile, tablet, laptop, and wide widths. The Playwright fixture captures unexpected diagnostics automatically.
5. Compare rendered screenshots with the supplied reference at matching viewports; fix discrepancies and repeat. Passing a build or an existing screenshot is not proof of design fidelity.
6. For intended visual changes, review the design and screenshot diffs before running `npm run test:visual:update`. Inspect every changed baseline, then rerun `npm run test:visual`. Never update baselines simply to hide a failure or relax thresholds to make tests pass.
7. Commit reviewed PNGs with their code. Windows is the canonical baseline platform; use the locked Playwright Chromium and Node version. Other platforms need separately reviewed baselines (see README).
8. Report meaningful changes, assumptions, validation results, and remaining limitations. UI work is complete only after inspecting the rendered result.

Do not commit secrets, generated reports, build output, or local environment files. Do not suppress known warnings or failing checks without explaining the concrete reason.
