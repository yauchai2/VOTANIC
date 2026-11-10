---
name: remote-trigger-notion-spec-facts
description: Key facts from the Notion Remote Trigger spec and meetings (checked 2026-11-09) that constrain the UI design
metadata:
  type: project
  modified: 2026-11-09T02:29:27.329Z
---

Notion "Remote Trigger Implementation Spec" (a58a818d322440a2a06616ac4d0b15a1, edited 2026-11-06 09:06) plus meetings 10-28, 10-30, 11-04 and the cross-repo page 35724c14bfcf41c6a8e0ea2c68fcd3e9. Notion is read-only for us. Full review: /mnt/project-files/reports/20261109-remote-trigger-notion-review.md.

- Remote control only reaches Triggers (scene-level) and Variables (project or instance scope), never instances, scenes or behaviours directly. Only variables placed on the saved layout are remotely controllable.
- 7 widget kinds: triggerButton, booleanToggle, numberInput, numberSlider, vector3Input, vector3Slider, colorInput. Access is read or readWrite. Vector3 slider min 4 x 5.
- Grid: 12 columns, row 48, gap 12, mobile breakpoint 640, mobileOrder per widget, limits 128 widgets and 1000 rows. Validator wants mobileMode stack, browser renderer mirrors the grid: open decision.
- Scope: Phase 1 (4.2) = preset UI, internal grid, variable item, public link (cloudflared quick tunnel, demo only). Phase 2 (5.0) = grid system UI, multi page, sensors, multi-user CAVE control.
- 10-30 scope meeting: first stage supports a single device; UX capacity this quarter is full and the UI editor may not finish; wanted controls also include joystick, scoreboard, variable display, conditional show.
- Authoring palette has two sections (project variables, instance variables of every instance in the active scene) plus triggers. Missing binding warns, type mismatch errors. Authoring edits do not propagate during Play (snapshot).
- Our 6-digit join code is our own assumption; spec only says a login page exists.

**Why:** the design must follow what XRCC really controls and the phase split.
**How to apply:** check this before changing Remote Trigger screens; re-read the spec for updates first. Related: [[remote-trigger-v2-figma-locations]].
