# XRCC Launcher Remote control：視覺與互動對齊

2026-11-17，本輪使用者決策取代前輪的 Back to XRCC、收起 Port 及停用 Public 分頁設計。

## 已交付

- Launcher 詳細頁以專案資訊、分享區、Devices、Server／Port 排列。分享區及空狀態使用同一灰色 surface，既有紫色作選取及動作色；沿用 Library 裝置圖像、QR、XRCC wordmark 及圖示。
- Connections 摘要加入裝置插圖與 Manage devices，保留 AI keys、Search、Add key 及 Speech commands 的原有層次。
- Public link 分頁隨時可查看；Server 運行且有 Playing 專案時，Turn on public link → 確認 → 建立中 → 可用連結。未 Play 有明確原因；Server off 提供 Start server。失敗可 Try again，或 Use local link。
- 移除 Back to XRCC；Port 預設直接顯示，沒有 Port settings 展開步驟。變更 Port 後才 Reload／Start 套用。
- Instance 及 Variable 列的圖示與文字起點對齊；header 名稱、色塊、分類標題及列間距同步到 Web。
- Figma 仍以 13 組、72 個可見畫面、30 條連線、19 條必要 annotations 整理；移除多餘的 B19 返回失敗與 B20 展開 Port 畫面，加入 B25 Public needs Play／B26 Public off。XRCC、Launcher、Remote 與規格區用淺灰、淡紫、淡藍分區，畫面標籤保持深色。
- Web 使用實際 Figma 資產與內嵌 Roboto。詳細頁及 Connections 的主要區塊已按 Figma 量度比對；確認視窗同為 400×220。

## 驗證

操作測試涵蓋 80 個狀態、唯一綁定、直接點列選取、分類排序、Local Play 前加入、Public 開關／失敗／撤銷、Port 重試、等待裝置的 Server shutdown、輸入驗證、sensor 接管、stale／斷線、3／6／8 欄。無 pageerror。

Web 量度：Launcher 1100×952；詳細頁內容 x280／y112／w780，share x280／y248／780×264，devices y536，server y692。主要區塊與 Figma 差異不超過 1 px；Instance／Variable 文字起點 x81；Connections 摘要 x345／y220／650×120。

Library 沒有新增 token 或 Publish。QR、URL、Server、tunnel、sensor 及 ACK 仍是模擬，不能作真正跨裝置或跨程式連線驗證。

## 結構參考

- [Devin Connections](https://mobbin.com/screens/386fee01-1446-486a-84f9-7fb5128c771e)：連線分類及相鄰操作。
- [Tailscale Machines](https://mobbin.com/screens/7060540b-2ee8-4d9d-b37d-80ce117a9188)：裝置列表與加入操作的分區。

只參考資訊結構；XRCC 的配色、元件、圖像與字型保留。Public／Port／移除返回按鈕依使用者明確要求，並非以上產品的功能規則。
