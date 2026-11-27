---
name: debug-review-variable-click-target-pending
description: Runtime Debug Locate/Review variable icon: click target undecided, Alan waiting on dev answer (2026-11-03)
metadata:
  type: project
  modified: 2026-11-03T08:56:53.767Z
---

Toby (unity4) commented on the Debug Panel Board 6 (file 1fAQ8bgTaI2RWLYJRBb3Aw): rename tooltip to "Review variable" (already done) and asked which Variable panel state the click redirects to.

Findings (2026-11-03): of 126 Locate icons, 109 have hover only, 9 (other-scene rows) click to Board 1h "Switch scene?" with no next board. Debug items rows (Door open, Spawn position) are different data from Project Variable list (Gallery open, Visitor spawn), so no direct mapping.

**Why:** Alan chose "confirm with dev first" on the decision card, so no Figma changes were made.
**How to apply:** Do not rewire Locate prototype links until Alan reports the dev answer. Recommended option if confirmed: open Project Variables list with the row highlighted (new state), other scenes via Switch scene first. Related: [[debug-feature-new-boards-rules]].
