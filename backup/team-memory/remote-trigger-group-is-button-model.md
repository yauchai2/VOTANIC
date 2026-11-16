---
name: remote-trigger-group-is-button-model
description: Alan's 2026-11-13 correction of the Remote Trigger model: each group box = one phone button that runs its items' flows; connect button opens a Remote Start behaviour page
metadata:
  type: project
  modified: 2026-11-13T07:07:20.173Z
---

Alan (2026-11-13 14:55 HKT, marked 重要) with old-UI screenshots (old dialog "Remote Trigger", groups "New Remote Trigger (2)/(3)/(4)", items Cube, Ground, Clock, Mole01, Light Object, Rule1; Behaviour page "Cube -> New Remote Trigger (2)" with a "Remote Start" node as the start point):
- Each "New Remote Trigger" group box = ONE phone button. Pressing it runs the flows already wired inside the items of that group (Cube and Ground logic).
- The connect icon on an item row opens a connection (Behaviour) page whose start node is Remote Start; the user then wires other behaviours from it.
- Group colour and name correspond to the phone button.
- Earlier per-item cells and Number/Text/Toggle settings conflict with this; I asked Alan (decision card) how variable inputs fit: group-button only (recommended), separate variable items, or he explains.

**Decisions (2026-11-13, latest wins):** First group-button only, then REVERSED: Alan required the spec's variable controls (Number input, Number slider, Text input, Toggle; settings Min/Max/Decimal, Max characters; "Maybe in future" items not built). Button colour = group colour swatch. Then (18:00 HKT) Alan: Project/Instance Variables are NOT a separate "Variables" section; they are added INTO a group (e.g. Show controls) via the group's Add item picker "Select Item" (tabs Project variables / Instance variables). Phone: each group's button, then that group's variable controls, in list order. A8 sensors kept, A9 full Behaviour page with Remote Start.

**Why:** my previous model (each item = a phone cell with controls) did not match the old XRCC behaviour.
**How to apply:** after Alan answers, redo Figma first (A-lane list/phone cells/A9 behaviour page with Remote Start), then the prototype. Also icon circle colour: follow Notion spec, group colour stays editor-only (superseded only if Alan says otherwise). Related: [[remote-trigger-v2-figma-locations]], [[feedback-figma-fully-done-before-prototype]].
