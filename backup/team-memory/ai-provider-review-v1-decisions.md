---
name: ai-provider-review-v1-decisions
description: Decisions from the colleague review (AI Provider review_v1, 2026-11-13) on the XRCC AI Provider UI
metadata:
  type: project
  modified: 2026-11-13T02:49:06.368Z
---

Colleague review of the AI Provider UI (12 points) was applied 2026-11-13 in Workbench file ZBOB48n4eLsZABCTnhh5kk and prototype draft PR #9 (stacked on #6). Dev confirmation list: /mnt/project-files/reports/20261113-ai-provider-review-dev-confirmation.md.

- No VPN advice anywhere (earlier brief wanted a Gemini VPN hint; it is now removed). Failures say "check your network connection".
- "Locked" wording replaced by "Password needed" / "Enter password"; "Transcription" renamed "Speech to text" (assumption).
- Password fields have a show/hide toggle, no confirm field. No quota mention in voice preview copy.
- Alan said "由你建議" for future-provider layout and Connections: wrap grid for provider tiles (search above ~8); Connections is a summary list, each connection opens its own panel (Figma D0, D1, D1b).

**Why:** reviewer feedback; Alan delegated design calls.
**How to apply:** pending dev answers (multi-key per provider, Custom fields, voice clone fallback, Profile layer, Connections scope). Old Connections backgrounds (D2, D5-D8, E4, E5, M5, M6) still need syncing once scope is confirmed.
