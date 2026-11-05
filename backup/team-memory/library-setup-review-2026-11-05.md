---
name: library-setup-review-2026-11-05
description: 2026-11-05 read-only review of XRCC (PC) Library + Voyage 360 Library setup; confirmed XRCC Primitive is unpublished and Library depends on 5 product files
metadata:
  type: project
  modified: 2026-11-05T03:37:39.615Z
---

Report: /mnt/project-files/reports/20261105-figma-library-setup-review.md (14 items, all waiting for Alan's decision; nothing changed in Figma).

Verified facts (2026-11-05, Plugin API):
- XRCC Primitive collection is hiddenFromPublishing=true and all 120 vars have empty scopes, so other files (Voyage) CANNOT bind color/neutral/black, neutral/250, purple/500. This corrects the "probably possible" note in 20261105-voyage360-colour-to-xrcc-mapping.md. Voyage still has 2 stale Primitive bindings.
- XRCC Library subscribes to 5 product files (Launcher, 20251125_XRCC4.0_PC_UI, Assets Panel, Setting Panel, In-app Licensing); Pagination/Alert/Breadcrumbs contain remote icons/link and ~60 bindings to an old remote "Theme" collection; Dialog page holds a Debug Confirm Dialog instance.
- Voyage components live in the UI file (published as its own library); Voyage 360 Library holds only Voyage Theme (12) plus leftover Desktop/* Inter text styles and Drop shadow 01.

**Why:** Alan asked for a full library setup review ("全部 library setup review").
**How to apply:** Read the report before further Library or Voyage token work so items are not re-audited. Related: [[library-full-review-2026-10-09]], [[voyage360-token-structure]].
