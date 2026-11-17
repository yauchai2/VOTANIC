---
name: remote-trigger-colleague-changes-1116
description: Remote Trigger P1 changes after Alan's colleague review (2026-11-16): no 6-digit join, no sensors section, 3 variable icons, Launcher Connections hosts the Phone remote server
metadata:
  type: project
  modified: 2026-11-16T08:14:23.425Z
---

Alan 2026-11-16 16:06 HKT, after discussing with colleagues:
- Delete the 6-digit code join (old C1). Phone joins only via QR or link; phone flow starts at C2 Connecting.
- No Sensors control section (old A10 deleted); all phone sensors are on by default.
- Row icons: Instance = icon/outline/cube, general (instance) Variable = icon/outline/object-variable (white), Project Variable = icon/outline/project-variable in ochre (behaviour/project-variable, including its inner bar).
- QR code needs Loading and empty states (Remote / QR card variants Waiting and Off exist).
- Launcher entry (my recommendation, built as B11-B13 in Lane 2): Launcher bottom-left Connections button opens "XRCC Connections", with a new "Phone remote" section at the top = the Remote Trigger panel: status pill, On/Off switch, Reload server, QR, link, phones. States: B11 running, B12 off (QR empty), B13 reloading (QR loading). XRCC settings B9/B10 show status only. Launcher base: library component set "XRCC Launcher" (key 496a856d...), variant "XRCC Connections".

**How to apply:** Figma first; prototype follows after Alan sees it. Related: [[remote-trigger-trigger-vs-variable-model]], [[avatar-behaviour-colours-special-only]].
