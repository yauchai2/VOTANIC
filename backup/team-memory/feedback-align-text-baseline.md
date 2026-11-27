---
name: feedback-align-text-baseline
description: Rows that mix text of different sizes (label + "Optional", title + count) must use Auto Layout baseline alignment, not centre; Alan asked to review all text and remember it (2026-11-05)
metadata:
  type: feedback
  modified: 2026-11-05T09:17:03.424Z
---

Alan (2026-11-05, XRCC AI Provider flow): "請review all text 是align baseline 如有需要。也請記下", after seeing "API key" (14 bold) next to "Optional" (12) sitting at different baselines.

**Why:** centre-aligned mixed-size text looks slightly off; baseline alignment is how type is meant to line up and Alan checks for it.
**How to apply:** For every horizontal Auto Layout row whose children are all text (or text plus an empty spacer) and whose font sizes or weights differ, set `counterAxisAlignItems = 'BASELINE'`. Rows with same-size text, or text beside icons or logos, stay centred (baseline with non-text children aligns to the bottom edge). Scan script: find HORIZONTAL frames with 2+ TEXT children and more than one font size, list those not on BASELINE, fix the pure-text ones. In the web prototype use `align-items: baseline`. Applied 2026-11-05 to Label row (API key / Optional, Password / Optional) and the Voice head. Related: [[feedback-self-check-after-edits]], [[feedback-own-drawn-elements-use-tokens]].
