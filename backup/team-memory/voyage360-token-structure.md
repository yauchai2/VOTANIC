---
name: voyage360-token-structure
description: Voyage 360 token/library structure after 2026-11-03 cleanup: XRCC for general tokens, Voyage Library (DyjGKBd4Z24GgffN1bAnG6) only for Voyage-specific colours
metadata:
  type: project
  modified: 2026-11-03T09:47:19.768Z
---

Alan (2026-11-03): Voyage 360 UI file (KoJQjDPM4sjwsoMYEvCDkw) mainly uses XRCC (PC) Library tokens/fonts/colours; Voyage 360 Library (DyjGKBd4Z24GgffN1bAnG6) holds only Voyage-specific tokens (colour). Light mode not needed.

Done: Library rebuilt with collection `Voyage Theme` (12 Dark-only semantic colours, e.g. brand/band #6429a0, accent/light #d9b0fd, surface/base #0e0d0d, button/background*, marking/delete, partner/pexels) plus a `Colour tokens` page. UI file bindings moved from old `UI colour` / old Brand-Neutrals kits to Voyage Theme or XRCC Theme (about 6,000 binds). Reports: design-system/20261103-voyage360-tokens-review.md and ...-token-migration-plan.md; log in change log.

**Why:** the file had no token management; XRCC use was low and 9 collections were mixed.
**How to apply:** new Voyage colours: check XRCC first, then add to Voyage Theme with semantic lowercase names; XRCC Primitive variables cannot be imported from other files (use Theme tokens only). Left on purpose: waypoint blue #22a4e5 and red #e65869/#fa5d6c (content/illustration colours), 84 frames explicitly in Light Mode, instance internals, old pages, old collections (still referenced). Voyage components (~19k instances) live in the UI file itself, not in the Library. Related: [[no-new-tokens-when-applying]], [[light-mode-rarely-used]].
