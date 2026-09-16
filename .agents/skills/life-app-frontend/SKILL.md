---
name: life-app-frontend
description: Implement, review, debug, or maintain the Life App React frontend with strict design fidelity, feature boundaries, and verified quality gates. Apply to this repository's UI, architecture, tooling, tests, and development conventions; not to unrelated projects.
---

# Life App frontend

This is the mandatory engineering workflow for the Life App repository. Its purpose is predictable, visually accurate development that humans and agents can inspect and maintain with limited context. Apply the relevant requirements to every project task, including reviews and tooling work. Do not build speculative product features or rerun the original scaffold setup on an existing project.

The root `AGENTS.md` requires this skill even when the user does not explicitly name it. Paths below are relative to the repository root unless linked otherwise. User instructions take precedence over this skill. This skill does not authorize unrelated changes, commits, publishing, deployment, or external messages.

## Before editing

1. Read root and applicable nested `AGENTS.md` instructions. Inspect the current worktree and preserve unrelated changes.
2. Inspect related code, nearby components, `src/styles/tokens.css`, existing patterns, tests, and relevant package scripts. Search before adding a dependency, component, or abstraction.
3. Establish the requested behavior and supplied design evidence. For any UI implementation, read [Design implementation and browser validation](references/design-validation.md) before coding.
4. Reuse evidenced conventions. If a material detail is missing, isolate the smallest assumption and report it; ask only when available evidence cannot support progress. Continue independent authorized work.

## Stack and dependency decisions

- Use React, strict TypeScript, Vite, Tailwind CSS, Zod, Vitest, React Testing Library, Playwright, ESLint, and Prettier. Read `package.json`, `package-lock.json`, and `.nvmrc` for actual versions rather than assuming a latest release.
- Use npm consistently. Preserve the lockfile and verify compatibility when changing dependencies. Prefer native React/browser behavior when a package provides little value.
- Introduce React Router when routing exists, TanStack Query when remote server state exists, and React Hook Form for non-trivial forms. They are intentional conditional choices, not missing scaffold dependencies.
- Do not add a UI framework that imposes a visual language. Radix or editable shadcn source may provide needed behavior/accessibility; all appearance must follow supplied designs.

## Architecture and ownership

| Location                                       | Responsibility                                                                  |
| ---------------------------------------------- | ------------------------------------------------------------------------------- |
| `src/app/`                                     | Application shell, composition, routing, and providers with actual consumers    |
| `src/features/<feature>/`                      | Domain-specific components, API functions, hooks, schemas, types, and utilities |
| `src/components/ui/`, `src/components/layout/` | Only genuinely shared primitives and layouts                                    |
| `src/lib/api/`                                 | Shared network transport concerns when networking exists                        |
| `src/lib/validation/`, `src/lib/utils/`        | Genuinely shared, non-domain validation and utilities                           |
| `src/lib/env.ts`                               | Centralized runtime validation of public environment settings                   |
| `src/styles/tokens.css`                        | Stable, evidenced design tokens                                                 |
| `src/app/styles/app.css`                       | Tailwind entry and justified global styles                                      |
| `src/assets/`                                  | Exact approved images, SVGs, and fonts                                          |
| `src/test/`                                    | Shared unit/component setup and test support                                    |
| `tests/e2e/`, `tests/visual/`                  | Browser behavior and visual regression                                          |

Create feature subfolders (`api`, `components`, `hooks`, `schemas`, `types`, `utils`) only when used. Keep domain code in its feature; move it into shared directories only after actual reuse. Do not turn shared folders into catch-all collections.

Application composition may depend on features; features may depend on shared code. Shared code must not depend on features or `app/`. Features must not import app composition. Compose cross-feature flows in `app/` instead of creating cyclic domain dependencies.

Use direct file imports with `@/` across directory boundaries. Avoid deep relative imports and unnecessary barrel exports. Preserve alias support in TypeScript, Vite, and tests when changing tooling.

## Components, types, and styling

- Keep each component understandable through its own file and a few direct dependencies. Separate presentation, application logic, data access, schemas, and primitives when this clarifies responsibility; do not split code into meaningless fragments.
- Prefer composition and explicit code. Temporary duplication is acceptable until a stable repeated pattern exists. Avoid factories, higher-order component layers, generic configuration-heavy wrappers, styling DSLs, metaprogramming, and hidden layout behavior.
- Design fidelity outranks abstraction. Keep geometry visible in JSX with Tailwind. A direct grid and explicit spacing are preferable to opaque layout variants.
- Centralize repeated stable values in CSS custom properties / Tailwind theme tokens. Add evidenced colors, typography, spacing, radii, shadows, breakpoints, containers, and z-index layers as needed. Do not invent a full scale or tokenize every unique measurement.
- Use existing tokens when equivalent; use exact one-off values when required. A design specifying `37px` must not silently become `36px`. Use component CSS only when complexity justifies it and inline styles only for dynamic runtime values.
- Maintain strict TypeScript. Avoid `any`, unjustified assertions, and excessive type-level programming; use readable inferred types where obvious. Validate external boundaries with Zod rather than treating TypeScript declarations as runtime guarantees.
- Use descriptive English identifiers, filenames, comments, documentation, and technical artifacts. Comments explain constraints, design exceptions, or reasons, not obvious code.

## State, networking, forms, and failures

- Prefer local React state, then context for truly shared context. A dedicated global client store requires demonstrated complexity. Do not duplicate server state in client stores.
- Keep requests out of presentation components. Centralize network concerns; feature API functions own typed request/response contracts and feature schemas. Validate external data, and handle cancellation, retries, loading, empty, and error states intentionally.
- Simple forms may use native React state. Non-trivial forms use React Hook Form and Zod with one clear source for validation rules. Implement all relevant supplied default, hover, focus, filled, disabled, loading, error, and success states.
- Use semantic HTML, accessible names, correct button semantics, labels, keyboard navigation, visible focus, and appropriate ARIA only when necessary. Dialogs and dropdowns require correct focus and keyboard behavior. Accessibility behavior must remain correct while preserving the design.
- Never swallow errors silently. Provide intentional user-facing failures without leaking sensitive internal details; keep development diagnostics useful.
- Read public environment values through `src/lib/env.ts`, validate required configuration at startup, and keep `.env.example` and README synchronized. `VITE_*` settings are public. Never commit secrets or local environment files.

## Performance and assets

Avoid obvious waste: excessive rerenders, repeated requests, oversized images, large dependencies, unnecessary browser work, and huge unbounded rendered lists. Measure before introducing complex memoization, virtualization, or optimization layers; use them when the actual workload warrants them.

Use exact supplied assets and fonts. Preserve aspect ratio, crop, resolution, format, and SVG behavior. Optimize without changing appearance; do not substitute visually similar assets or fonts. Keep visual tests independent of unstable remote resources.

## Validation gates

After code changes, format and run the relevant checks. Never write meaningless tests just to raise coverage; prioritize critical logic, important flows, complex or accessibility-sensitive interactions, and regression risks. Colocate unit/component tests with their implementation.

```sh
npm run format
npm run typecheck
npm run lint
npm run test
npm run build
```

For UI changes, also run:

```sh
npm run test:e2e
npm run test:visual
```

`npm run check` runs the full gate, including formatting verification. On a clean installation, use `npm ci` and `npx playwright install chromium` first. Playwright owns a fresh production preview on port 4173; leave it free and run browser suites sequentially. In Windows PowerShell, use `npm.cmd` when forwarding additional arguments through `--` if the PowerShell shim consumes them.

For documentation/instruction-only changes, verify formatting, links, skill metadata, and consistency with actual code/configuration; no browser rerun is needed without UI changes. For a review without edits, report findings and evidence without creating work solely to exercise validation commands.

If a required check is blocked, identify the command, concrete blocker, and unverified behavior. Do not claim completion or suppress warnings merely because code compiles. Fix discovered problems within scope and rerun affected checks.

## Definition of done

The requested behavior exists and follows repository conventions. Relevant checks pass. For UI work, rendered behavior has been inspected in a real browser, responsive layouts and relevant states work, diagnostics are clear, and output closely matches the supplied reference. Screenshot tests are added or updated where appropriate through the review workflow in the linked reference.

Summarize meaningful changes, decisions, assumptions, checks actually run, and material limitations. Keep README and agent instructions current when commands, ownership, or workflows change. Never describe a generated screenshot, successful compilation, or implementation alone as proof of visual correctness.
