---
name: figma-flow-standard-connectors-annotations
description: Alan's standard for Workbench screen-flow pages: arrow connectors style, board labels, and native Figma annotations (reference page AI Provider 1333:8666)
metadata:
  type: feedback
  modified: 2026-11-13T07:28:51.780Z
---

Alan (2026-11-13) was upset that I drew plain arrows and text "Note" frames on Remote Trigger P1: "annotations是指Figma的annotations功能", and he had given a connection style and standard long ago. Reference: Workbench page "XRCC AI Provider" (node 1333:8666).

**Standard (measured from the reference):**
- Connectors: vector lines in a frame "Flow connectors", named "A1 to A2", stroke weight 2, end cap ARROW_LINES. Main path = solid, accent colour variable 17459:947 (Theme accent); branch or alternative path = dashed [6,6], grey variable 17459:1128 (border/stroke). Gap between boards 80px in the reference. Branch lines (A3 to A6) route as bent polylines.
- Board labels above each board in a frame "Label · A2": Board no (11px), Board title (16px), Board note (12px), all text colours bound to variables.
- Annotations = Figma native annotations (node.annotations with categoryId), written in 書面語, few and precise, attached to the specific element they describe. Categories: 1:0 Development, 1:1 Interaction, 1:2 Accessibility, 1:3 Content, 1237:0 Loading UX. No loose text "Note" frames.
- Prototype links alone are not "連線": the visible flow arrows are required too.

**Why:** I forgot this and invented my own style; Alan has to re-explain it each time.
**How to apply:** before any flow, screen-order or annotation work, read this file and inspect the reference page. Related: [[feedback-self-check-after-edits]], [[feedback-own-drawn-elements-use-tokens]], [[remote-trigger-v2-figma-locations]].

**Update 2026-11-20 (Alan):** the connector/label style above is the DEFAULT reference, not a rigid rule. Final goal = clear, concise, readable flow that users understand at a glance; colours and styles may change for readability. Still always show visible arrows and use native Annotations.
