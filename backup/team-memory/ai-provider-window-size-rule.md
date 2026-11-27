---
name: ai-provider-window-size-rule
description: AI Provider window is a fixed 960x640 in Figma and prototype; Settings and Launcher keep their own sizes (Alan 2026-11-20)
metadata:
  type: feedback
---

Alan (2026-11-20): unify the AI Provider window size, "不要時大時小"; then clarified that Settings and Launcher have their own set of sizes and must not be unified with it.

**Why:** the prototype panel grew and shrank per tab (first run 760 wide, Voices 760 high). Settings (about 960x720/820 in Figma, 960x680 in the prototype) and Launcher are separate windows.
**How to apply:** every AI Provider panel and dialog board is 960x640; Body fixed height with clipped scrolling; dialogs capped at 624 high with the footer pinned. Do not resize Settings/Launcher boards. Order: Figma first, prototype follows (I slipped on this once on 2026-11-20). Related: [[ai-provider-review-v1-decisions]].
