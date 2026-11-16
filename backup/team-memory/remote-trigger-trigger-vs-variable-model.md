---
name: remote-trigger-trigger-vs-variable-model
description: Remote Trigger P1 final model (2026-11-16): list holds Trigger sections (many instances, one button, colour) and Variable control sections (exactly one variable); separate pickers
metadata:
  type: project
  modified: 2026-11-16T03:25:04.536Z
---

Alan 2026-11-16 (重要, with notes in Workbench page 1481:10758 section "Notes" 2220:6100) asked to verify his inference and finish the whole P1 UI/UX. Verified against Notion (read-only):
- Unity wiki "External Connection: Remote Trigger": `RemoteTrigger` data = id, name, color, **instances** (list). Adding a trigger to an instance creates a Remote Start layer (PST:<id>). So one Trigger section = one phone Button that fires Remote Start on MANY instances.
- Cross-repo page: each widget has ONE binding (projectVariable, or instanceVariable + instanceId). So a Variable control section holds exactly ONE variable.
- Spec: Button colour (setting); Number input/slider Min Max Decimal; Text max chars; Toggle (bool). Launcher hosts the server and sends localhost port to XRCC; port settings are Next Phase. Old Connections Setup "Remote Trigger Server · Server IP" field (PC UI 7SMhpQ4IVhnlA6G6wfwAgO node 4071-208867) is obsolete in P1: show status only.

Alan's other points: link icon on Scene tree rows = "Remote" (instance already used by a Remote Trigger). XRCC colour picker on the section swatch controls the web button colour. His "Select Item" with tabs was a demo wireframe only.

**Design decided (my recommendation, sent 2026-11-16):** "Add New Remote Trigger" → choose Trigger button / Variable control. Trigger add-icon opens "Select Instances" (instances only, multi-select, no variable tabs). Variable control opens "Select Variable" (Project / Instance tabs; instances are non-selectable folders). Web control type: Trigger = Button; Bool = Toggle; Text = Text input; Number = Number input or Slider (chosen in settings).

**Confirmed 2026-11-16:** Variable control sections keep a colour swatch (Alan: 可以); on the phone it colours only Slider/Toggle icon circles, Text/Number have no icon. Select a variable (A11/A12) is TWO columns per Alan: scene tree left (pick Instance), Project/Instance variables tabs right; Project tab dims the tree. Single Instance picking stays in A3 Select Instances.

**How to apply:** supersedes the "variables inside a group" idea in [[remote-trigger-group-is-button-model]]. Figma first, prototype after Alan sees it. Related: [[remote-trigger-notion-spec-facts]], [[remote-trigger-v2-figma-locations]].
