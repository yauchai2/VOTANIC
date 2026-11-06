# XRCC Remote Trigger：手機遙控面板交接（2026-11-06）

Figma：XRCC Claude Workbench，頁面「XRCC Remote Trigger」
https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk/XRCC-Claude-Workbench?node-id=1481-10758

## 一、頁面結構

| 區域 | 內容 |
|---|---|
| 0 · Overview | 流程、借鑑 Stream Deck 的重點、假設及待確認事項、按鍵類型一覽 |
| 1 · XRCC 編輯端（A1–A7） | 空白面板、拖入按鍵、按鍵已加入、調整旋鈕、選擇變數、需要處理的問題、Play 期間即時狀態 |
| 2 · Play 入口與 Launcher（B1–B8） | Play 工具列 Phone remote、本地連結、手機加入、開啟公開連結確認、開啟中、公開連結已開、失敗、等待 Play |
| 3 · 手機遙控端（C1–C12） | 存取碼加入、連線中、選擇專案、未有 Play、面板、按鍵送出、拖動旋鈕、選擇顏色、重新連線、面板已更新、Play 結束、橫向 |
| 4 · 規格 | 微互動規格表（元件、觸發、變化、時間及曲線）；Hover 及 Tooltip 規格 |

每個畫面下方均有繁體中文說明。

## 二、設計概念

1. 一鍵一功能：每個按鍵對應一個 Project 或 Object variable，以圖示加標籤呈現。
2. 固定 4 欄網格：按鍵可佔 1 格、2 格（Dial）或 2×2 格（Vector3）。編輯端與手機的位置一致。
3. 即時回饋：按下縮小、送出發光及勾號、Toggle 以 LED 顯示開關、底部提示顯示延遲毫秒數。
4. 狀態清晰：Local、Public、Reconnecting、Offline 四種連線狀態。斷線時按鍵變暗並暫停，避免重覆觸發。

## 三、新元件（Workbench › Components 頁 › Section「Remote Trigger · Components」）

- 按鍵：Remote Key / Trigger、Toggle、Dial、Stepper、Colour、Vector3、Empty slot。均含 Hover、Pressed、Sent 等互動變體，並設有 Smart animate reactions。
- 輔助元件：Remote / Library item、Feedback pill、Connection pill、Page dots、QR graphic、QR card、Device row、Project card。
- 沒有修改 XRCC (PC) Library，也沒有新增 token。顏色及間距全部綁定現有 tokens。
- 使用的 Library 元件：Button（Primary、Secondary、Tertiary、Square）、Tab、Dialog、Alert、OTP input、Skeleton、Loader、Tooltip、Tag。

## 四、Prototype

共有 3 個起點：
- 1 · Editor: build the deck（A1）
- 2 · Play and Launcher（B1）
- 3 · Phone remote（C1）

所有連結使用 Smart animate 及 ease-out。Cancel 會返回上一層。

## 五、假設及待確認

1. 手機以 6 位存取碼登入。Notion 只提及登入頁。
2. 公開連結預設關閉，需要手動開啟，Play 結束後即失效。
3. 手機沿用 4 欄網格。橫向時每頁顯示兩行。
4. A7 顯示「誰按了甚麼」是建議，可行性待開發確認。
5. 面板更新提示（STALE_LAYOUT）的觸發方式待確認。
6. 微互動的時間屬建議值。如 XRCC 已有 Motion 標準，以該標準為準。

## 六、備註

- 舊頁面（1454:2615）保留了上一版設計，可供比較。如不再需要，可以刪除。
- 隱藏的 `_rt_lib`、`_rt_lib2` 文字節點是建圖用的輔助腳本，不影響畫面。如不需要，可以刪除。
