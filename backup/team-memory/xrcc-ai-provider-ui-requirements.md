---
name: xrcc-ai-provider-ui-requirements
description: XRCC AI Provider UI/UX 要求與來源（Notion 頁面、prototype 影片、舊 UI 截圖、Alan 確認的三項要求）
metadata:
  type: project
---

XRCC AI Provider（4.2，P1，目標 2026 Q4）：Notion 頁面 Feature「AI more provider connection」及其子頁 UI Requirement、Implementation Spec；11-04 會議結論 prototype 可進入 UI 實作。Notion 唯讀。摘要：/mnt/project-files/reports/20261105-notion-xrcc-ai-provider-summary.md；prototype 與舊 UI 畫面清單：/mnt/project-files/reports/20261105-xrcc-ai-provider-prototype-ui-inventory.md。

Alan 確認（2026-11-05）：必須有 Custom Provider；Key 須從 Key Management 選取（非卡片內輸入）；須有 voices 載入／錯誤狀態、voice clone 失效後備方案、Gemini VPN 提示。舊入口是工具列「Create with Poe」圖示，之後會改（不再只有 Poe）。舊 key 管理在 Settings > Connections（按服務分段）。

**Why:** 之後設計此功能時不用再問。
**How to apply:** 設計時以此為前提；具體設計方向以 Alan 之後指示為準，不自行假設。Related: [[xrcc-claude-design-system]].
