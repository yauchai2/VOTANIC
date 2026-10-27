---
name: debug-feature-new-boards-rules
description: Checklist before adding screens to Runtime Debug (Workbench 268:1285): lane Sections, token binding, prototype, components, Warnings x-count precedent
metadata:
  type: feedback
---

Alan (2026-10-27, after the Log repeat-grouping thread): "你好似唔記得哂啲記憶, 你review返成個Debug feature同埋之前啲記憶". I had resized the Log tab lane Section (overlapping Warnings tab), left raw padding/gap/radius on my own frames, and added no prototype links.

**How to apply (Runtime Debug · Manage debug items, Workbench ZBOB48n4eLsZABCTnhh5kk, page 268:1285):**
- Never resize or stuff boards into existing lane Sections (Log tab 451:2652 etc.): they are stacked with fixed gaps and flow lines. New proposal boards go in their own nested Section in free space (left of the hub, x < 900), original boards untouched.
- Every frame I draw: bind spacing/*, radius/* and colours to existing tokens (see [[feedback-own-drawn-elements-use-tokens]], [[no-new-tokens-when-applying]]); import by key via search_design_system (spacing/N keys exist for 0 to 80). createAutoLayout frames default to a WHITE fill: set fills = [] .
- Feature-specific components go on the Components page (85:1541) in the Runtime Debug section, with descriptions; reuse Debug Log Entry / Debug Warning Entry patterns (Warnings already has an xN repeat count badge, so keep Log grouping consistent).
- Wire prototype links like the rest (tabs navigate, Smart animate / Ease out / 0.1 s), add change-log entry, English UI copy, Dark only, check narrow/default/wide.
- Open dev questions already flagged: Log limit 500, Warnings limit 100, whether Remove clears Log history; mention if a design touches them. See design-system/20261014-debug-panel-flow-handoff.md.
