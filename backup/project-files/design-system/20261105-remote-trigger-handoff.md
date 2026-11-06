# XRCC Remote Trigger UI 設計交付說明

日期：2026-11-05。需求依據：`/mnt/project-files/reports/20261105-remote-trigger-requirements-summary.md`（Notion 唯讀）。

## 位置

- Figma：Workbench（ZBOB48n4eLsZABCTnhh5kk）→ 頁面「XRCC Remote Trigger」（1454:2615）→ Section「XRCC Remote Trigger · Screen flow」（1454:2617）。
- 全部使用 📖 XRCC (PC) Library 元件與既有 token，Dark only，電腦版畫面 1920×1080（Launcher 960×640，手機 390×844）。沒有修改 Library，沒有新增 token，不需要 Publish。

## 畫面清單

| 區 | 畫面 | 內容 |
|---|---|---|
| 1 編輯端 | A1–A6 | 空白、編輯、拖曳、需處理、選擇變數（對話框疊在 A2 之上）、手機預覽 |
| 2 Play 與 Launcher | B1–B7 | Play 工具列入口、本機連結、建立公開連結中、公開連結已啟用、建立失敗、等待 Play、開啟公開連結確認（疊在 B2 之上） |
| 3 手機與瀏覽器 | C1–C9 | 登入、搜尋專案、專案列表、空狀態、儀表板、斷線重連、版面更新、Play 結束、橫向 |
| 4 規格 | D1 | Hover 與 Tooltip 規格表（含 Library Tooltip 實例） |

Prototype：Smart animate、Ease out、0.1s。主要連線：A2/A4 → A5、A5 取消或確認 → A2；B1 → B2；B2「Public link」→ B7；B7 確認 → B3（1.5 秒後自動到 B4）、取消 → B2；B5 重試 → B3；C1 → C2（1.2 秒後到 C3）；C3 專案 → C5；其餘「Projects」按鈕回 C3。三個起點：1 · Authoring、2 · Play and Launcher、3 · Phone。

## 假設（Notion 未明確說明，需團隊確認）

1. 手機以存取碼登入（Notion 僅提及登入頁）。
2. 公開連結須手動開啟，預設為本機。
3. 手機版面鏡像 12 欄格線（Notion 寫為堆疊，瀏覽器為鏡像，兩者待決定）。
4. 對話框、QR 位置、手機元件、滑桿軌道、警示卡為自訂 frame，Library 沒有對應元件；確認方向後可再建立 feature component。

## 行為重點

- 只有放置於儀表板的變數元件可由手機控制；格線 12 欄、列高 48、間距 12；Vector3 滑桿至少 4×5 格；上限 128 元件、1,000 列、256 KB。
- Play 使用儀表板快照；錯誤碼 STALE_LAYOUT、SESSION_NOT_FOUND、WIDGET_NOT_FOUND、SESSION_OFFLINE 對應 C6–C8 與 B5。
- 本機延遲約 6 ms，公開約 35 ms；公開連結僅供示範與測試。

## 已知小問題

Spawn point 標籤在最窄卡片上會截斷；Lamp 卡片下方留白較多。

## 並列方案：格位式編輯端（第 5 區，S1–S4）

只借用 Stream Deck 的概念：格位可見、拖入即加入、頁碼圓點預留 5.0 的 multi page。版面與元件均套用 XRCC：右側 dock 面板（分頁 Add、Settings、Issues）、Runtime Debug 式 head、Library 元件與既有 token。格位高度 48、間距 12，與實際格線一致。S1 空白、S2 編輯（Settings 分頁）、S3 拖曳（虛線目標格位與尺寸提示）、S4 需處理（Issues 分頁，一鍵修正）。與 A1–A4 並列，未取代原有畫面。
