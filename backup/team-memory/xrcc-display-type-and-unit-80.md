---
name: xrcc-display-type-and-unit-80
description: 2026-10-14 Alan explicitly extended Library unit and typography to 80 (display/2xl-4xl styles, spacing/72, /80); the one exception to the no-new-tokens rule
metadata:
  type: project
---

Alan (2026-10-14) wanted XRCC (PC) Library unit and Font Typography to reach 80 like Reshaped Design System v4.1. Added (additive only): Primitive `unit/72`, `unit/80`, `font/size/48|64|80`, `font/line-height/56|72|88`; System `spacing/72|80`, `typography/display/{2xl,3xl,4xl}/{size,line-height}`; text styles `display/2xl` 48/56, `display/3xl` 64/72, `display/4xl` 80/88 (Roboto Bold, variable-bound, zh-hant compatible). Doc pages (Unit, Typography) and change log updated. Needs Alan to Publish.

**Why:** Bigger contrast for concept/onboarding/empty-state screens ([[xrcc-bold-typography-docs-zone]]).
**How to apply:** This is an explicit exception to [[no-new-tokens-when-applying]], limited to unit and typography; other collections still get no new tokens. Display styles are docs/concept/onboarding/empty states only, never real app UI. Base system: [[xrcc-typography-system]].
