---
name: remote-trigger-launcher-flow-boards
description: Phone remote Launcher boards B9-B17 on the latest Launcher (D3) Connections nav item; XRCC panel B2-B8 slimmed; Settings has no Remote Trigger (2026-11-16)
metadata:
  type: project
  modified: 2026-11-16T09:30:00.000Z
---

Alan 2026-11-16 (final): Settings and Launcher are two separate things. The LATEST Launcher UI is AI Provider D3 (1534:6437): Connections is a left nav item (bottom group: Settings, Connections, More); latest Settings UI is D1 (1387:24637, separate window). Phone remote lives on the Launcher Connections page, as a section above AI keys. Do NOT use the My Setting dialog or the old bottom icon button.

Boards (Workbench page 1481:10758, lane 2 node 1501:5114), latest numbering (2026-11-16 17:36): NO Projects entry board; flow starts directly on the Connections page. B9 Running 2324:9924 (flow start 4), B10 Phone joined 2328:18331, B11 Turn off? 2328:18990, B12 Server off 2324:10661, B13 Reloading 2324:10740, B14 Port changed 2328:18642, B15 Port in use 2326:10072, B16 Link copied 2328:18935 (1100x952, clones of D3 shell). Alan chose "keep and slim": Launcher = server control; XRCC panel B2-B8 = Play-time join, Local/Public link, phones only. Settings status boards were deleted: Settings gets NO Remote Trigger item. Alan's pasted copies (2349:47xxx) and Notes 2349:46317 are his; do not touch.

Prototype v44 (PR #7): entering tab 2 opens the Launcher directly on Connections; footer buttons B9-B16 jump to states. A-series is A1-A25.

**Why:** a later thread must not put Connections back as a bottom icon button or a Launcher sidebar item.
**How to apply:** check before touching Launcher/Connections boards. Related: [[remote-trigger-colleague-changes-1116]], [[remote-trigger-v2-figma-locations]].

**2026-11-17 去重決定 (Alan chose 保留並精簡):** Launcher Connections = server only (no QR/phones). XRCC window B2–B8 owns QR/Local+Public link/phones; B1 Play popover is slim (status + "Open Phone remote"). Prototype v46.

**2026-11-17 命名/文案規則 (Alan):** 連接裝置不一定是 phone（desktop/iPad 亦可）→ UI 與 annotation 一律用 "Remote control" / "Devices"，不用 Phone/手機（中文用「裝置／遙控端」）。文案要極短，無廢話；Launcher 不放 QR（Alan: 不一定需要）。Prototype v47.

**2026-11-17 入口:** Remote control 視窗有兩個入口：Play 時右上角小面板 "Open"，編輯時 Remote Triggers 視窗標題列 "Connect devices"（→ B8 / Play 中 B2）。Prototype v48。

**2026-11-17 排序/方向/Sensor:** Remote List 無方向按鈕（方向跟隨裝置）；排序用拖曳手柄（A7 Reorder a section），Trigger 與 Variable 各自同類排序；遙控端 C16 This device 顯示 sensor 可用性（只供查看，預設啟用，不加控制）；XRCC 裝置列 "Using sensors"/"No motion sensors"（Notion: 同時只一部裝置用 sensor）。Prototype v49。
