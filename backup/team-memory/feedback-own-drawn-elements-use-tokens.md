---
name: feedback-own-drawn-elements-use-tokens
description: Anything Claude draws in Figma (flow lines, labels, chips like "Start here", notes, section boxes) must use Alan's existing tokens for colour, radius, spacing and type, never raw values
metadata:
  type: feedback
  modified: 2026-10-15T02:38:46.134Z
---

Alan (2026-10-15), after I left the "Start here" chip with padding 10 and the flow labels with raw black: "你做既嘢要用返我地啲 Tokens，mark底". Also asked "全部使用tokens" for the Runtime Debug flow page.

**Why:** the Workbench file is meant to read as part of the XRCC system; hardcoded colours, radii, gaps and fonts in my own helper elements (flow lines, labels, chips, notes, lane Sections) break that and show up in his token audits.
**How to apply:** For every element I create, bind from the start: fills/strokes to Theme variables (text/on-light/primary on the white canvas, surface/accent-muted, border/*), radius/* and spacing/* from XRCC System, text with typography size, line-height, font-family and font-weight variables (Roboto). When no token matches (e.g. radius 6, gap 10), pick the nearest existing token and say so rather than leaving a raw value; never add new tokens. Run an unbound-value scan on my own nodes before reporting. Related: [[no-new-tokens-when-applying]], [[xrcc-typography-system]].
