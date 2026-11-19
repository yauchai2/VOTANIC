# XRCC AI Provider：交接總覽

更新：2026-11-19　負責人：Alan（Votanic UI/UX 設計師）

本資料夾供接手的 AI 使用，記錄 XRCC AI Provider 的規則、決定、Figma 與 prototype 位置、進度與待辦。通用交接見 `backup/project-memory` 分支的 `backup/HANDOVER-FOR-NEXT-AI.md`（本資料夾在其基礎上補充，不重複其內容）。

## 開工前必讀

1. `backup/project-memory` 分支內 `backup/project-files/design-system/20261113-READ-FIRST-execution-guide.md`：第 1 節清單、第 5 節（連線與 Annotations 標準）、第 10 節（AI Provider）；完成前跑第 13 節自檢。在回覆中向 Alan 確認已讀。
2. 本資料夾 [`decisions-and-rules.md`](decisions-and-rules.md)：全部決定與規則（含被取代者）。
3. 本資料夾 [`figma-and-prototype-map.md`](figma-and-prototype-map.md)：Figma 位置、畫板、元件、prototype 分支與同步狀態。
4. 本資料夾 [`status-and-next-steps.md`](status-and-next-steps.md)：已完成、未完成、待 Developer 確認。

## 一句話概括

把只支援 Poe 的 XRCC AI 介面，重新設計為多 Provider（Gemini、Poe、MiniMax、OpenRouter、Custom）架構，以任務（Models）為先、Provider 退居次要；Key 一律從 Key Management 選取。Notion 唯讀；Figma 先完成，prototype 後同步。

## 原始資料位置（專案檔案，備份於 backup/project-memory 分支）

- `design-system/20261105-xrcc-ai-provider-ui-brief.md`：設計準備簡報（部分已被審閱 v1 取代）。
- `design-system/20261105-xrcc-ai-provider-handoff.md`：首版交接，含畫面清單與文案表（Tasks 已改名 Models、VPN 已移除，以本資料夾為準）。
- `reports/20261105-notion-xrcc-ai-provider-summary.md`：Notion 內容摘要與頁面連結。
- `reports/20261105-xrcc-ai-provider-prototype-ui-inventory.md`：開發者 prototype 影片與舊 UI 清單。
- `reports/20261113-ai-provider-review-dev-confirmation.md`：審閱 v1 處理結果與 Developer 確認清單。
