# Codex 接手期間（2026-11-17 至 11-19）設計更新 Review

審閱方式：唯讀。已讀 READ-FIRST 執行說明（第 1、5、11、13 節）；GitHub `yauchai2/VOTANIC` 的 commit、PR、分支；change log 最新條目；Figma Workbench 頁 "XRCC Remote Trigger (P1)"（1481:10758）。未改動 Figma、Notion 或任何 PR。

## 一、Codex 改了什麼

識別方法：Codex 的 commit 作者顯示為 "Alan Chan <cyccyccycs@gmail.com>"（與 Claude 的 noreply 作者不同），自 2026-11-17 04:10 UTC（Claude 交接後 8 分鐘）開始。共三條分支：

1. `claude/project-thread-pddqur`（PR #7 Remote Trigger）：11-17 至 11-19 約 20 個 commit。單一綁定（每個 Trigger 只綁一個 Instance，Variable control 只綁一個變數）、Select Instance 直接點列、Remote control 改為 Launcher 內的完整頁（Launcher 擁有 QR、Local/Public link、Server、Port、Devices，移除 Back to XRCC）、Public link 狀態（B25、B26）、Server／Port 與 Play viewport 調整、新增 Playwright smoke test、部署至 Vercel `xrcc-remote-trigger.vercel.app`、新增 `library-token-map.json`、`library-flow`、`alignment`、`implementation` 等說明檔。
2. `prototype/xrcc-ai-provider`（無 PR）：11-18 至 11-19 約 9 個 commit。AI Provider web prototype 與 Figma 同步、Custom server 設定、Settings Connections 對齊、移除重複 header 計數、voice picker 改為緊湊可捲動清單，並內嵌 Roboto 與 Figma 資產。
3. `claude/project-thread-9oawj5`（PR #6）：只有一個 commit，將舊 prototype 預覽重新導向永久網址。

Figma（Remote Trigger P1）：由 A／B／C 單一流程改為 4 個大 Section（XRCC 建立與設定、Launcher 分享與連線、Remote 操作與狀態、微互動與 Tooltip 規格）加 Overview；內含 Flow 01 至 Flow 13 共 13 個流程分組、77 塊 A/B/C 畫板、319 個畫板標籤、27 則原生 Annotations。Alan 自己的 Notes Section 仍在。

## 二、沒有問題的部分

- 連線樣式大致符合標準：向量線、線寬 2、顏色綁 accent 變數 17459:947；分支用虛線；每塊畫板有 `Label · 編號`。
- Annotations 是 Figma 原生，書面語繁體中文，數量精簡（27 則）；沒有散落的文字 Note frame。
- 沒有新增 token、沒有 Publish Library（Codex 自述，抽查未見新 token）。
- 沒有改動 Notion、舊 UI、Alan 的 Notes。
- AI Provider prototype 抽查：沒有任何可見的 VPN 或 quota 文案。

## 三、問題（UX problem / impact / recommendation / priority）

| # | UX problem | Impact | Recommendation | Priority |
|---|---|---|---|---|
| 1 | Codex 無法讀取 READ-FIRST 與 change log（其說明檔自述「共享 execution guide／change log 不在工作區」），沒有寫 change log。最新條目停在 11-17 Claude 的記錄。 | 之後的 thread 看不到這兩天的改動，容易重複或推翻。 | 由 Claude 補寫 change log 條目；把 READ-FIRST 的必讀內容放進 repo（如 docs/），讓任何 AI 都讀得到。 | 高 |
| 2 | 架構與 Alan 11-17 的「去重」決定相反：Codex 寫 XRCC 不再有獨立 Remote control 視窗與 Open 小面板，QR、連結全在 Launcher。Claude 記憶則是 XRCC 視窗（B2–B8）擁有 QR，Launcher 只做 Server。Codex 稱是「本輪使用者決策」，我無法核實。 | 若 Alan 沒有這樣決定，Launcher 與 XRCC 的職責會再次錯位；Prototype 與 Figma 同步後更難回頭。 | 請 Alan 確認最終架構（見第四節 1）。 | 高 |
| 3 | 連線線端沒有箭頭：實測線寬 2、accent 變數正確，但 `strokeCap` 為 NONE，標準是 ARROW_LINES。 | 看不出流程方向，與參考頁 1333:8666 不一致。 | 補上箭頭端點（只改線的端點）。 | 中 |
| 4 | 連線線上的標籤用文字置於線旁，並有 Flow 04、Flow 11、Flow 13 完全沒有連線（只當參考畫板陳列）。 | 這三組畫板之間看不到流程；與「畫板之間必須有可見流程箭咀」不完全一致。 | 確認這三組是否刻意作狀態陳列；若是，在標籤註明；若否，補線。 | 中 |
| 5 | 27 則 Annotations 全部沒有 category（`categoryId` 為空）。標準要求歸類 Development、Interaction、Accessibility、Content、Loading UX。 | 無法按類別篩選；與標準不一致。 | 補上類別（多數屬 Interaction 或 Development）。 | 低 |
| 6 | 抽查 Flow 06 時有 32 個未綁變數的實心填色，主要是 Library 的 icon、XRCC wordmark 與 Launcher 元件內部向量。 | 多數屬 Library 元件內部，屬可接受；但未逐項核實是否有 Codex 自繪的 raw 色。 | 完整跑一次未綁定值掃描再確認。 | 低 |
| 7 | 規模明顯變大：77 塊畫板、13 個流程，另有 80 個 prototype state fixture。Overview 與 Annotations 已與 Alan 要求的「少而精準」有張力。 | Alan 審閱成本高。 | 在 Overview 標出主流程與僅供 QA 的狀態畫板。 | 低 |
| 8 | Prototype 部署與 PR 結構：Vercel production 部署由 Codex 建立（Alan 帳戶）；`prototype/xrcc-ai-provider` 分支沒有 PR；PR #7、#6 內混有 Codex 的 commit，而 draft PR 描述仍是舊內容。 | 單人 workflow 要求每個分支有 draft PR；Alan 可能不清楚哪些已上線。 | 為 AI Provider 分支開 draft PR；更新 PR #7 描述。需要 Alan 同意後才處理。 | 中 |

## 四、需要 Alan 決定

1. Remote control 的最終架構：維持 Codex 的「只在 Launcher，XRCC 沒有 QR 視窗與小面板」，或回到 11-17 的「XRCC 視窗擁有 QR、Launcher 只做 Server」。
2. Select Instance：Codex 改為「直接點列，不用 Radio，P1 沒有 Change／Replace instance」。Claude 的 11-16 模型沒有明說此點，請確認。
3. 是否同意補 change log、補箭頭端點、補 Annotation 類別、為 AI Provider 分支開 draft PR（這些屬寫入動作，我未動手）。
4. 是否保留 Codex 的 Vercel 永久網址 `xrcc-remote-trigger.vercel.app` 作為唯一審閱連結。

## 五、未能核實

- 未逐板檢視 77 塊畫板的視覺質素；只看了 Flow 06 與 Overview 截圖。
- 未開啟 AI Provider 的 Figma 流程（1354-2549）核對 Codex 的 prototype 同步；只抽查 prototype 文案。
- 未跑 Codex 的 smoke test；未驗證 Vercel 線上版本。
- 未核實 Library 是否真的沒有被改動。

## 六、已自查項目（第 13 節）

範圍（唯讀、未動 Notion）、連線樣式、Annotations、Token（抽查）、記錄（缺失已列出）、匯報格式。
