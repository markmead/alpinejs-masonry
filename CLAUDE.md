# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

`alpinejs-masonry` is a zero-runtime-dependency Alpine.js plugin providing a single
`x-masonry` directive. It turns an existing CSS grid into a masonry layout by pulling
items upward with negative `margin-top` — it does not create or manage the grid itself.
The consumer supplies `display: grid` and the column/gap values.

## Commands

```shell
pnpm install    # esbuild's postinstall must run; see pnpm-workspace.yaml
pnpm build      # esbuild -> dist/masonry.min.js + dist/masonry.esm.js
```

There is no test suite, linter, or dev server. Verification is manual: create an
`index.html` at the repo root (gitignored for exactly this purpose), load the built
`dist/` file plus Alpine, and check the layout in a browser.

## Architecture

Two build entrypoints wrap the same source, so behaviour changes belong in `src/`, never
in `builds/`:

- `builds/cdn.js` → `dist/masonry.min.js` — self-registers on `alpine:init`, for `<script>` tags.
- `builds/module.js` → `dist/masonry.esm.js` — default export, for `Alpine.plugin()`.

`src/index.js` owns directive registration and scheduling (modifiers, resize/event
listeners). `src/useMasonry.js` owns the layout math and is a pure DOM function — it can
be reasoned about and tested independently of Alpine.

### The layout algorithm

`useMasonry` derives everything from computed style rather than configuration:

- Column count comes from splitting `gridTemplateColumns` on spaces. This is why the
  plugin follows responsive breakpoints for free, and why it bails early when the count
  is 1 (a single column needs no masonry).
- Items must not stretch: the container needs `align-items: flex-start`, or every item
  fills its row and the measured gap is always 0. This is the most common "masonry isn't
  working" report.
- For each item, the item `perChunk` positions earlier is the one directly above it in
  the same column. The gap between them is closed with a negative `margin-top`.
- Margins are cleared at the top of every run, so the function is idempotent and safe to
  call repeatedly.
- `<template>` elements are filtered out — Alpine leaves them in the DOM for `x-for`, and
  counting them would shift every subsequent item into the wrong column.

### Recalculation triggers

The layout is static once applied, so anything changing item heights must retrigger it.
Ordered by preference: the `reload:masonry` window event (`$dispatch('reload:masonry')`),
the `poll` modifier, then the `wait` modifier. `resize` is always bound.

Modifiers are positional: `modifiers[0]` is `wait` or `poll`, `modifiers[1]` is the
duration in ms (default 2500). The two are mutually exclusive — `x-masonry.wait.500.poll.500`
will not work, only the first modifier is read.

## Publishing

`dist/` is committed to the repository. The CDN install path in the README points at
unpkg, which serves the published tarball, and the `files` allowlist in `package.json`
ships `dist/`, `src/` and `builds/`. Any source change therefore needs `pnpm build` run
and the resulting `dist/` committed alongside it, or the published plugin silently keeps
the old behaviour.

There is no `main` or `exports` field — only `module` and `unpkg`. Bundlers resolve the
ESM build fine; bare Node resolution does not. Intentional to leave as-is unless
packaging is the task.

Release: bump `version` in `package.json`, `pnpm build`, commit `dist/`, then publish.

## pnpm notes

`pnpm-workspace.yaml` sets `minimumReleaseAge: 2880` (48h), so a package version
published within the last two days will not resolve. This is deliberate supply-chain
hardening, not a broken lockfile — wait it out rather than removing the setting.

esbuild is listed under `allowBuilds` because its postinstall fetches a platform-specific
binary and pnpm blocks build scripts by default. A new dependency with a postinstall step
needs the same treatment.

## Known quirk

`cleanup` in `src/index.js:18-21` is broken both ways: `resize` is removed by a different
function reference than the arrow that was added, and `reload:masonry` calls
`addEventListener` instead of `removeEventListener`. Listeners accumulate on teardown.
Flag rather than silently fix — the correction changes `setInterval`/listener lifetime.
