# Design implementation and browser validation

Read this reference before implementing or changing meaningful UI in Life App, and when reviewing visual fidelity or changing screenshot testing.

## Design evidence

Figma, screenshots, design specifications, tokens, assets, and responsive/state references are the source of truth. Never redesign, reinterpret, improve, simplify, or creatively alter supplied UI unless the user explicitly requests that change.

Preserve spacing, colors, typography, border radii, dimensions, alignment, shadows, layout, hierarchy, responsive behavior, and visual density. Do not use a library's defaults as design evidence.

The initial `Application ready` shell and browser-native tokens are infrastructure defaults only. They do not establish a product palette, typography scale, breakpoint system, component library, or approved design. Read the current code and later supplied references before assuming those defaults still apply.

## Implement and compare

1. Inspect the entire reference before coding, including responsive variants and component states. Identify the exact source assets, fonts, and weights; do not choose substitutes.
2. Determine layout relationships, measurements, alignment, container behavior, content hierarchy, and genuine repeated design primitives.
3. Establish responsive behavior from supplied variants. If only one viewport exists, preserve hierarchy and visual intent, prevent overflow, keep type readable, and use minimal reversible assumptions. Do not invent navigation changes, reorder content, or hide content without evidence.
4. Implement with direct, inspectable styling and existing evidenced patterns. Isolate uncertain values so they can be revised without rewriting the layout.
5. Run the application, open the relevant route in a real browser, and inspect its actual rendered result.
6. Check console warnings/errors, uncaught exceptions, failed requests, and HTTP failures. Exercise keyboard navigation, focus, labels, and relevant interactions.
7. Exercise default, hover, focus, filled, disabled, loading, empty, error, and success states when relevant to the feature and supplied design.
8. Compare screenshots against the supplied reference at matching dimensions, then inspect representative mobile, tablet, laptop, and wide desktop widths. The current Playwright viewports are 390x844, 768x1024, 1366x768, and 1920x1080; these are test sizes, not design breakpoints.
9. Correct visual discrepancies in geometry, typography, crop, density, colors, or states and rerun affected checks. Repeat until the output matches closely.

Do not stop after writing code or passing a build. Screenshot stability confirms repeatability; it does not establish that the design was implemented correctly. If reference access or a required asset is unavailable, state exactly what remains unverified rather than claiming fidelity.

## Deterministic screenshot tests

Add visual tests for important pages or repeated components where regression risk justifies them. Reuse `tests/fixtures.ts` so unexpected browser diagnostics fail the test; do not discard that protection to get a pass. Intentional failure-state tests should explicitly verify their expected diagnostics without hiding unrelated errors.

Control instability before taking screenshots:

- Match the reference viewport and use fixed browser scale, color scheme, locale, and timezone.
- Pin dates/time and control random values when displayed content depends on them.
- Fixture server responses and dynamic content. Keep screenshots independent of live APIs and unstable remote images.
- Load the exact fonts deterministically and wait for `document.fonts.ready` plus any feature-specific readiness condition.
- Disable animations and hide the caret for comparison. Wait for explicit stable UI states rather than arbitrary sleeps or assumed loading delays.

The current Playwright configuration uses locked Chromium, four viewports, reduced motion, explicit snapshot updates, and no accepted differing pixels. Tests use the production build and fail on unexpected console, runtime, and network diagnostics. Inspect the configuration before changing it.

## Baseline workflow

1. Run `npm run test:visual` against existing baselines.
2. Inspect expected, actual, and diff screenshots alongside the supplied reference. Fix implementation bugs first.
3. When the change is intended and matches the reference, run `npm run test:visual:update` to generate candidate baselines.
4. Visually inspect every changed PNG. A successful update command is not approval of the output.
5. Rerun `npm run test:visual` in comparison mode. Include reviewed baseline files with the associated code when preparing the change for version control.

Never regenerate baselines merely to hide failures, copy screenshots between operating systems, or relax thresholds to bypass a mismatch.

Baselines live in `tests/visual/__screenshots__/<platform>/<project>/`. Windows is the current canonical platform, matching the initial environment and configured CI. Use the lockfile's Playwright/browser version; another operating system requires its own generated and visually reviewed baselines. If changing the canonical environment, treat that as a deliberate testing change and inspect the resulting diffs.

Use `npm run test:report` to inspect the latest HTML report. Failure screenshots and traces are under `test-results/`; reports are under `playwright-report/`. These generated artifacts remain untracked. Only reviewed baseline PNGs belong in version control.
