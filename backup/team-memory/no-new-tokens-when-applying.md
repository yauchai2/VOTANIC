---
name: no-new-tokens-when-applying
description: When applying existing tokens to components, never create new variables; leave unmatched values unbound and list them
metadata:
  type: feedback
  modified: 2026-10-08T10:09:14.768Z
---

Alan (2026-10-08, alert component binding): "唔好幫我加新token". When asked to apply existing tokens/styles to components, only bind to what already exists in XRCC Primitive/Theme/System. Do not propose-and-create new variables (e.g. status/info/*) to fill gaps.

**Why:** Alan wants control over the token set; gaps are his call.
**How to apply:** Unmatched values stay unbound and are listed in the change log with the reason; mention gaps without offering to add tokens. Related: [[xrcc-design-system-study]].
