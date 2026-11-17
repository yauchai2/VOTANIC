# Remote Trigger：精簡流程與 Figma／Web 對齊

2026-11-17，以本對話最新指示為準。

- Figma 由 44 組／196 個畫面展示收斂為 13 組／72 個原始畫面；主要操作及必要恢復以 30 條箭嘴連接。設定、空狀態、錯誤及響應式變體以參考區呈現，不再複製入口和返回畫面。
- 原始畫板 ID 保留；重複流程容器與重複狀態移出可見審閱路徑。Notes 區沒有修改。
- 清除重複、歷史及描述畫面外觀的 annotations；保留 19 條關於唯一綁定、Play、跨程式狀態、Server、ACK、同步及 Sensor 的必要規則。
- 頁首 Overview 加入固定 [Web Prototype](https://xrcc-remote-trigger.vercel.app/) 連結。
- Web 移除 XRCC QR 視窗及中間 Open popover。Connect devices 直接進入 Launcher 詳細頁；Connections 顯示摘要，Manage devices 進入管理。Local 支援 Play 前加入；Public 需 Play。
- Web 的 QA 狀態選單預設收起；只保留建立控制、連接裝置、遙控操作三個主要視圖。QR 掃描／開啟連結透過獨立測試控制模擬，不添加產品操作步驟。
- 延用 Library tokens、原生元件、Notification 及 Hover。沒有新增 token 或 Publish Library。

驗證：Figma 連線不穿過完整畫面；可見畫面無 Live、Change instance、Replace instance。Web 主流程、80 個狀態、輸入／失敗／權限／同步／Play 生命週期及 3／6／8 欄測試通過，無 pageerror。

工程限制：真正 Launcher deep-link、來源視窗 focus、QR／URL、server/tunnel、資料傳輸與 sensor 尚未接上；1.5 秒轉場只示範成功，並非正式 timeout 規格。
