# 交接文件（給接手的 AI）

更新：2026-11-17　負責人：Alan（Votanic 的 UI/UX 設計師）

## 先讀這些（依序）
1. `backup/project-files/design-system/20261113-READ-FIRST-execution-guide.md`：Alan 的全部執行規則，先讀第 1 節檢查清單，完成前跑第 13 節自檢。
2. `backup/team-memory/MEMORY.md`：記憶索引，其餘檔案按需要再讀。
3. `backup/MANIFEST.md`：本分支所有備份檔案清單。

## 工作方式摘要
- 對 Alan 用繁體中文，報告用書面語；UI 文案以英文為主；標點規則見 `punctuation-rule-zh-en.md`。
- Figma 全部完成並自檢後，才同步 Prototype；優先使用 XRCC (PC) Library 元件與既有 token，不新增 token。
- 低風險步驟直接做並事後回報；不可逆的步驟先取得 Alan 同意。只有 Alan 能 Publish Library。
- Figma Workbench 檔案：`ZBOB48n4eLsZABCTnhh5kk`（AI Provider 流程 node `1354:2549`；Flow 標準頁 `2160:7338`）。

## 進行中：AI Provider UI 審閱（review_v1）
- 已完成並記錄於 `backup/project-files/reports/20261113-ai-provider-review-dev-confirmation.md` 與 `backup/team-memory/ai-provider-review-v1-decisions.md`。
- Alan 2026-11-13 的決定：除 Custom 外，每個 Provider 只有一條 key；語音複製（Voice clone）fallback 不支援；Custom 的 Model name 建議必填（待 Developer 確認）。
- Figma 已完成：移除 VPN 提示、密碼顯示／隱藏、「Password needed」、Connected 方塊、Connections 摘要頁（D0、D1、D1b）、移除 C6 與複製語音卡片、非 Custom 的 key 欄改為單一顯示。
- 尚未完成：Add AI key（D2）中已有 key 的 Provider 要變灰；B4b、A4 標為 Obsolete 待 Alan 決定刪除；新畫面（A3d、D0、D1b）的原生 Annotations 與連線；D2、D5–D8、E4、E5、M5、M6 的舊 Connections 背景同步。
- Prototype（`prototypes/xrcc-ai-provider/index.html`，草稿 PR #9）尚未同步「單一 key」與「移除語音複製」，須等 Alan 看過 Figma 後再做。
- 待 Developer 確認的問題見上述確認清單。

## 其他進行中的線
- Remote Trigger：見 `remote-trigger-*.md` 記憶檔（每個 New Remote Trigger 群組 = 手機上一個按鈕）。
- Voyage 360 與 Runtime Debug：見對應記憶檔。

## 備份規則
- 每日備份（星期一至五）已獲 Alan 長期批准：掃描密鑰後複製到 `backup/project-memory` 分支；絕不備份密鑰、不動 main、不刪 Drive 檔案。
- Drive 連接器無法覆寫檔案內容，完整備份以本分支為準。
