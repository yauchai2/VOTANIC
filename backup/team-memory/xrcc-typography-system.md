---
name: xrcc-typography-system
description: XRCC (PC) Library typography after 2026-10-08 cleanup: 10 text styles, 24 variables, zh-hant via variable mode, legacy PC/Eng styles remapped
metadata:
  type: project
  modified: 2026-10-08T09:14:30.992Z
---

Library (De8nKqO81yciw4wH5xfpxA) now has 10 text styles: `heading/xl·lg·md·sm` (32/40, 24/32, 20/28, 18/24 Bold), `body/lg·lg-bold·md·md-bold·sm` (16/24, 14/20, 12/18), `caption` (11/16). Variables: `typography/{heading/*,body/lg|md|sm,caption}/{size,line-height}`, shared `typography/font-family` (System modes: Base=Roboto, zh-hant=Noto Sans TC), `typography/font-weight/*`. Chinese screens: set System collection mode `zh-hant` on the frame; there are no zh-hant styles anymore.

**Why:** Alan found 23 styles / 122 variables too many and unclear (2026-10-08). Old en/heading-5 merged into body/lg-bold, tooltip into caption. Old PC/Eng/* in the PC UI file (15/24, 13/19, 17/26 scale) were bulk-relinked to nearest new styles (about 5,200 texts, 1-2px visual change); Alan approved. Desktop/BodyText is Inter (another system), PC/TC/*, product/launcher left alone.
**How to apply:** Use these style names for new UI; log is in design-system/20261008-library-change-log.md. Other files binding old `typography/en/*` variables directly may have broken bindings; fix only if Alan reports. Related: [[xrcc-design-system-study]].
