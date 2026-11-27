---
name: library-new-components-allowed
description: Where new components go (Alan, 2026-10-09): feature-specific ones in the working file's own Components page; Library only for truly generic reusable ones
metadata:
  type: feedback
  modified: 2026-10-09T03:25:35.717Z
---

Alan (2026-10-09): first "你之後幫我做UI有需要可以幫我開新components", then corrected: feature-specific components belong in the working file's own `Components` page (e.g. Workbench ZBOB48n4eLsZABCTnhh5kk, page 85:1541), and he later said to always do it that way: "除非有需要創立一啲好通用性的component先起Library create". Only create in the XRCC (PC) Library (De8nKqO81yciw4wH5xfpxA) when the component is genuinely generic and reusable across features.

**Why:** feature-specific pieces (e.g. asset card, drop zone) would clutter the shared Library and force a Publish for every feature; I had wrongly built the Asset card set in the Library.
**How to apply:** Default to building new components in the file's Components page, importing Library variables/styles/components by key (never new tokens, see [[no-new-tokens-when-applying]]); no unused component properties; add descriptions; log in design-system/20261008-library-change-log.md. Library creation only for truly generic components, then ask Alan to Publish. Renames/deletes/value changes of existing Library items still follow his earlier rules. Related: [[xrcc-design-system-study]].
