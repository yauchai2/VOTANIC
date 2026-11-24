# XRCC Remote Trigger P1：對齊與流程整理

> 文字索引方案已被完整畫面連線取代；toast 與 annotations 的最新狀態見 [library-flow-20261117.md](library-flow-20261117.md)。

## 本輪使用者決定

- Select Instance 直接點選整列，以點亮表示唯一選取；不使用 Radio。
- P1 暫不提供 Change/Replace instance。刪除遙控按鈕後重新新增；Instance 與 Behaviour 保留。
- Remote control 按內容使用 960×680；主編輯與選擇視窗維持 640×680。
- Figma 先完成，再同步 prototype，提供可開啟的 Web Link。

附件 `thread-export-20261109-20261117.md` 與 repo 的交接原檔 SHA-256 相同（`c26bc36d73578a6ecf06b23584ba0efc0ae36a9e4184a3cb9db1aeffc040fcd9`）。附件作為歷史參考；本輪指示優先，不把歷史對話當成新增工作指令。

## Figma

1. 移除 A3 的 Radio 及 A6/A8 的 Change/Replace instance。
2. B2–B8 使用 960×680，回復完整 QR 區寬度；B3 toast 保留在底部。
3. 重新排列全部 69 張 A/B/C 畫板與標籤。A 分建立／變數／空狀態；B 分分享與 Launcher；C 分操作、連線恢復、sensor、響應式示例、輸入錯誤。
4. 隱藏舊 Flow connectors 與先前跨頁面的長向量，重建分組。依 `1333:8666` 使用 2 px accent 實線、灰色虛線。只有同列相鄰步驟畫短箭頭，跨列／跨區使用具 F 編號的「事件 → 目標畫板」可點擊索引。
5. 共 23 條短箭頭、116 個事件索引；69 張畫板涵蓋於流程或響應式示例中。驗證結果：失效索引 0、箭頭穿過畫面 0、索引覆蓋畫面 0。
6. C12/C13/C14/C29 是同一操作流程的 viewport 示例，不以箭頭串成操作步驟。沒有改動其他功能頁、Notes、Old UI 或 Library。

## Prototype

- 直接點亮單一 Instance，取消不留下新增的空控制；沒有 Radio 或更換目標按鈕。
- Remote control 寬 960、高 680；QR、裝置狀態、底部操作列及 selector CTA 的位置已按 Figma 調整。
- 樣本順序、分類、單一綁定、變數選取與設定、Play、server/public、stale、sensor 接管與失敗狀態使用同一套元件。
- 新增「Figma screen」選單，涵蓋全部 69 張畫板。可用 `?screen=A3`、`?screen=B3`、`?screen=C22` 直接開啟。這些是可互動的示例狀態，不是截圖。
- Sensor 接管在 sheet 內確認；正在供應時顯示 Stop sharing。模擬拒絕權限移到 canvas 外的測試控制列。

## 驗證

`node prototypes/xrcc-remote-trigger/tests/smoke.cjs` 通過：唯一綁定、點亮選項、無 Radio/Change instance、取消/Escape、Slider、Number 範圍與小數、拒絕/逾時、stale/斷線阻擋、Play/server/public 生命週期、改 port、3/6/8 欄、全部 69 個示例可呈現、960 px 分享視窗及接管確認。無 pageerror。

Figma 已檢視選擇／分享視窗與重新編排的 C 流程全貌，並以幾何檢查確認線和索引沒有穿過畫面。這不等於實機、螢幕閱讀器或真實 Unity transport 的驗收。

## 部署

Vercel Web prototype 使用 Alan 帳戶的 `xrcc-remote-trigger` 專案。僅部署 prototype HTML 與靜態設定，不部署 Notion、附件或歷史對話。原 Claude Artifact URL 未改動。Unity ACK、QR/地址、sensor 權限與資料、公網 tunnel 仍為模擬。

部署已達 READY，固定網址為 https://xrcc-remote-trigger.vercel.app/ 。原有 Vercel 保護設定保留；免登入審閱連結另行提供，不提交分享憑證。首個 deployment 由平台設為 production，但內容是 prototype 審閱示例，並非 Unity 產品發佈。原始碼 commit 為 `0024d9f`。已確認線上回傳 HTTP 200，HTML 與本地測試來源逐字相同。沙盒瀏覽器外連遇到 tunnel failure，因此線上互動沒有宣稱重跑通過。
