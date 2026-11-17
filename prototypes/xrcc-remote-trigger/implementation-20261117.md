# XRCC Remote Trigger P1：2026-11-17 改善紀錄

本次以使用者最新決定為準：每個 Trigger button 只綁定一個 Instance；每個 Variable control 只綁定一個 Instance variable 或 Project variable。Trigger buttons 與 Variable controls 是兩類，分開排序。以下其餘互動政策是按使用者要求提出、並已落到畫稿與 prototype 的建議，仍需以工程整合確認實際契約。

## 來源與交付

- [Figma P1](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk/XRCC-Claude-Workbench?node-id=1481-10758)
- [XRCC Library](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA/Library?node-id=17465-272)
- 原有 draft [PR #7](https://github.com/yauchai2/votanic/pull/7)，分支 `claude/project-thread-pddqur`。
- Notion 僅作參考，未修改。未 Publish Library；未修改其他功能頁、Notes 或 Old UI。
- 原 Claude Artifact 未重新發佈，本報告不將原連結視作本次更新版本。

## 五項設計政策

|項目|本次建議與實作|
|---|---|
|輸入與同步|Slider 拖動最多每 50 ms 送一次，放手補送末值。Number 在 Enter／change 驗證範圍及小數位；Text 在 change 提交；Toggle 點擊提交。成功必須根據 XRCC 確認；送出、拒絕、未確認不能混用。Trigger 不自動重播。|
|跨裝置|跟隨 viewport 自動適配；寬度 <600 用 3 欄、600–899 用 6 欄、≥900 用 8 欄。控制最少 44×44；長內容捲動。裝置名稱不決定欄數。Rotate 是預覽工具。|
|清單與 Play|兩類分開排序；Play 期間可操作遙控，結構與設定在 Stop 後修改；新一輪 Play 使用新 snapshot。|
|連線生命週期|同地址 Reload 暫停命令並重新取得 snapshot；改 port 提示使用新地址。Play ended、server off、public link off、host disconnect 分開顯示。stale 必須刷新後才操作，不排隊重播命令。|
|Sensor|能力、權限與 active source 分開。使用者手勢授權；只有一個來源；接管先確認；來源斷線或 Stop 即暫停，不能沿用舊 sensor 值。|

50 ms 是設計建議的節流值，尚未經 Unity／網絡效能驗證。真正多裝置同步應以 session/revision/command ID 及權威值回寫處理；目前網頁沒有真實 transport。

## Figma 改善

- A3 改為 Library Radio 單選示例；清除可加第二 Instance 的入口及雙目標示例。A6 增加 Change instance、A8 增加 Replace instance，保留名稱、顏色、排序與原 Behaviour。
- 加入兩類標題；A19 的 Instance 分頁放左。A8 的問題數量與唯一 Missing 來源一致；A9 不使用 Live 標籤，說明 Stop 後編輯。
- Select Instance、Select Variable 及 B2/B3/B5/B6/B7/B8 統一 640×680；變數左欄 280 px，右欄填滿；分享視窗縮小 QR 區，保留可讀內容。
- B3 的 toast 移離標題；B7 指出 public link unavailable，保留重試與 Local 路徑。移除重複的延遲提示。
- C2 使用首次 Connecting；C6 的回饋使用 Show controls；C9/C10 的舊控制停用並降低亮度；C11 區分仍有 transport 的 Play ended。
- 新增 C17–C22：待授權、拒絕、其他來源、目前供應、來源斷線、接管確認。
- 新增 C23–C25：server unavailable、public link disabled、host disconnect。
- 新增 C26–C28：command rejected、confirmation unavailable、Number validation；未確認與拒絕狀態沒有成功勾號。
- 新增 C29：1100×720 桌面 8 欄示例；修正縮窄後的控制截斷。
- 移除遙控卡片的 Resize grip；可點擊的連線 pill 提高至 44 px。
- 更新原生繁體中文 annotations、Overview 與互動規格；補流程分支、sensor 接管確認與失敗虛線。新增板附編號標籤，擴展 C 區邊界以包含新增內容。

Figma 保留關鍵畫面的示例狀態；Radio 的完整互斥選取、資料驗證與送出失敗行為由 web prototype 驗證。Figma 原生互動不能代替真實資料同步測試。

## Prototype 改善與驗證

單一綁定、預選原目標、取消保留、兩類排序、640×680 視窗、數字欄位、Slider 節流／末值、stale 停用、斷線阻擋、明確模擬回饋、sensor 授權／停止／接管、連線原因及寬度欄數均已同步。補了焦點回復、彈窗 Tab 圈限、Escape 關閉及 Trigger／Toggle 鍵盤操作。

`tests/smoke.cjs` 使用獨立 HTTP server 和 Chromium，通過：單選、單一綁定、取消更換／Escape、Slider 值、Number 超界及小數位、拒絕／未確認回饋、sensor 授權／拒絕、stale 停用與刷新、斷線阻擋、Stop、server off、public off、改 port，以及直向 3 欄／橫向 6 欄與 8 欄斷點。沒有 pageerror。既有分類內拖曳及鍵盤排序保留；本輪未作實機觸控或螢幕閱讀器驗收。

## 工程與發佈尚待完成

1. 接上真正 XRCC ACK／拒絕／逾時事件、權威值回寫與 revision；目前 success 明確標為 simulated。
2. 真實 sensor capability 偵測、瀏覽器權限、motion／mic streams 與來源鎖定由工程實作；目前為模擬。
3. QR、URL、延遲、server、公網 tunnel、改 port 及重連都是示例，未驗證真實 Unity／Launcher。
4. 跨 control 目標去重、跨變數型別替換及正式舊多綁定資料遷移仍需另定契約；本輪沒有自行修改正式資料。
5. 原 Artifact 須以原 URL 重新發佈；本環境沒有該工具。共享 execution guide／change log 不在工作區，本次以此報告交接。
