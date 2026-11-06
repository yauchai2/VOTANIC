---
name: remote-trigger-v2-figma-locations
description: Where the XRCC Remote Trigger (Stream Deck style) design lives in Figma Workbench, its components and handoff doc (2026-11-06)
metadata:
  type: project
  modified: 2026-11-06T02:27:00.948Z
---

Alan asked on 2026-11-06 for complete XRCC Remote Trigger UI/UX flows in the Stream Deck style. They were built on the Workbench (ZBOB48n4eLsZABCTnhh5kk) page "XRCC Remote Trigger " (note the trailing space), node 1481:10758.

**Page contents**
- 0 Overview.
- Lane 1, XRCC editor: A1–A7.
- Lane 2, Play and Launcher: B1–B8.
- Lane 3, phone: C1–C12.
- Lane 4: micro-interaction and tooltip specs.
- 33 prototype links with 3 flow starts.

**Components**
- Feature components are in the Components page (85:1541), Section "Remote Trigger · Components" (1491:3952).
- These include the Remote Key / Trigger, Toggle, Dial, Stepper, Colour, Vector3 and Empty slot components, plus pills, the QR card, the device row and the project card.
- Nothing was added to the Library and no new tokens were created.

**Other locations**
- The old version is on page 1454:2615 and was kept.
- The handoff doc is /mnt/project-files/design-system/20261106-remote-trigger-streamdeck-handoff.md.

**Helper gotcha:** the hidden helper text nodes are `_helpers` 1454:2616, `_rt_lib` 1490:2 and `_rt_lib2` 1495:2.
- Their gp and pad functions bind to `spacing/N` tokens.
- The tokens they harvest only include 0, 2, 4, 8, 12, 16, 20, 24, 32 and 48. A missing value used to silently produce 0.
- This was patched on 2026-11-06 to fall back to the nearest token.

Related: [[feedback-self-check-after-edits]], [[library-new-components-allowed]].
