---
name: ui-responsive-required
description: Alan (2026-10-09): screens and components must be built responsive (auto-layout, wrap, fill/min width) so they survive frame resizing
metadata:
  type: feedback
  modified: 2026-10-09T03:42:49.620Z
---

Alan (2026-10-09): "以後請記得responive要做得好". He resized my 素材櫃 concept frame to 1173 wide and it broke: the drop zone text column was squeezed, the card grid was clipped, tabs and subtitle overflowed.

**Why:** designers resize frames to check behaviour; fixed-width rows with absolute sizes look broken.
**How to apply:** Build every screen and component with auto-layout end to end: FILL for containers/text, `layoutWrap: WRAP` for card grids, toolbars and header rows, `minWidth` on text columns so rows wrap instead of squeezing, no fixed-width children inside FILL parents unless intentional. After building, resize the frame to roughly 1440, 1280 and 1024 wide and screenshot each before delivering. Related: [[ui-quality-human-not-generic-ai]].
