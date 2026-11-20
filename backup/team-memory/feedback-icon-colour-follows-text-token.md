---
name: feedback-icon-colour-follows-text-token
description: Icon colour must be bound to the same token as its adjacent text in every state; Alan flagged wrong icon colours repeatedly (2026-10-13)
metadata:
  type: feedback
  modified: 2026-10-13T06:31:40.778Z
---

Alan (2026-10-13): "icon顏色錯誤問題已發生多次, 請fix和記下, 以免再錯". Example: Debug items tab selected, label purple (text/accent) but the swapped-in bug icon stayed white.

**Why:** swapping an icon instance (`swapComponent`) or creating a new icon instance resets paint overrides, so it falls back to the Library default (white, icon/inverse) while the neighbouring text keeps its state colour. Library icons also mix `#ffffff` (icon/inverse) and `#e5e5e5` (icon/default), so a "default" icon can be slightly brighter than the text.

**How to apply:**
- After any icon swap/create, bind every vector/boolean-op fill AND stroke inside the icon to the same variable the adjacent text uses (read it from `text.fills[0].boundVariables.color`; selected = text/accent, normal = text/primary or icon/default, disabled = text/disabled, critical/status = the matching status token). Never hardcode or leave the default white.
- Do it per state (selected / unselected / hover / disabled) and screenshot each state before delivering.
- Audit script: group icon instances by (main component, parent, paint hex + bound?) vs nearest text colour; unbound or mismatching rows are bugs. Note bound paints read back as #000000 placeholders when set via `setBoundVariableForPaint`, so judge by screenshot.
- Decorative status icons (warning amber, alert accent) keep their status token on purpose.
Related: [[ui-quality-human-not-generic-ai]], [[no-new-tokens-when-applying]].
