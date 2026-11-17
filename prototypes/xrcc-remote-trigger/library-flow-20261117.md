# XRCC Library 與完整 Screen Flow 修正

## 本輪要求與結果

本輪以使用者最新指示為準：優先使用 XRCC Library 的 tokens／components，沒有必要不用 P2；流程直接連接完整畫面，少用文字代替連線；核對並保留原生 annotations。

先前並非刪除全部 annotations，但有部分內容被覆寫。已補正 Select Instance 的選取與連結圖示說明、刪除再新增、Reload、Play ended、stale、成功確認等內容。目前原有節點共有 104 個節點、119 則原生 annotations；統計不包含新建立的流程重用副本。Annotations 仍附在畫板或元件上，不以畫布說明文字取代。

## Library 使用

- B3、B16、C6、C8、C26、C27 的結果通知統一為 Library `Notification / Dark` 的 `Type=Default`，component key `69b782e559257123f79e35a3a2a234862147b0f4`。
- 保留元件的 token bindings、Close、bell icon、陰影及黃色倒數條。不啟用 Undo、通知堆疊等額外行為；沒有新增 Library token 或發佈 Library。
- Web 使用相同 token 值與 bell SVG。來源及 CSS 對應見 `library-token-map.json`。
- 本 P1 通知時間沿用現有的 2 秒；錯誤由使用者關閉。Library 描述的 4 秒等建議尚未由開發確認，沒有當成已接受需求。
- C28 的數值驗證改為欄位紅框與下方錯誤文字，避免用 toast 代替欄位驗證。
- 掃描時未發現明確標成 P2 的元件引用。這不等於所有 Library 資產已有正式 phase 認證；本輪沒有新增 P2 功能或元件，已有特定 Remote Key／row 元件保留。

## 完整 Screen Flow

以 35 個操作流程整理 69 個原有畫面狀態。共展示 145 個完整畫面（含相同入口與返回畫面的重用）及 115 條直接連線；不再以 F 編號文字索引代替連線。每條線只留簡短動作名稱。

A：建立 Trigger、接線、排序、失效綁定刪除再新增、Play、變數選取、設定、改名、刪除及空狀態。

B：分享／公開連結成功與失敗、編輯時連接、server 開關、Reload、修改 Port、Copy。

C：加入與等待、操作、網絡中斷、stale、Play 結束、server/public/host 中斷、sensor 授權／拒絕／接管／來源斷線、拒絕／未確認／輸入錯誤、響應式及空清單。

- 原有畫板 ID 保留，流程重用畫面沿用原編號並標示為重用。
- 主線沿用參考頁 `1333:8666` 的 accent 2 px 實線，分支為灰色虛線；往返箭頭與動作標籤分開放置。
- 線段幾何檢查沒有穿過完整畫面；已抽查變數選取、分享與 sensor 分支截圖。
- 舊 Flow connectors／文字索引隱藏保留，沒有刪除使用者 Notes 或 Old UI。

## Prototype 驗證

原有 69 狀態與控制測試通過，另補：Notification Close、欄位內錯誤、Enter／blur 不會重送被拒絕的 Number，以及切換示例後舊的 Reload／公開連結非同步回呼不會污染新畫面。修正連線 pill 的瀏覽器預設白色背景；未確認的 Trigger 不會顯示成功狀態。

這仍是 frontend prototype。實際 Unity ACK、權限與 sensor 資料、URL／QR、server／tunnel 屬模擬；模擬提示放在 prototype 外框。

Web 已更新至 `eab5dd8`，Vercel READY。固定網址 https://xrcc-remote-trigger.vercel.app/ 回傳 HTTP 200，HTML 與已測試來源逐字一致。登入保護保留，臨時分享連結不提交 repo。
