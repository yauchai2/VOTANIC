# VOTANIC 每月 Notion UX 決策掃描(2026-10-05)

範圍:XRCC 4.2 Data Analytics & Connections Hub、XRCC Design handoff 資料庫。全程唯讀,未改動 Notion。對照快照:2026-09-28 的 votanic-knowledge-base.md / votanic-workflows.md。

## 一、整體結果
- Design handoff 資料庫:搜尋所見最新項目為 2026-08-04(Sketchfab flow、Create new project with package 等),9 月後沒有新增或改動。**Confirmed**(只靠搜尋結果的日期,未逐行查詢資料庫,屬抽查)。
- 4.2 Hub 頁面最後編輯 2026-09-29,在快照之後。頁面內容主要為流程說明,新增的子頁見下。**Confirmed**

## 二、快照需要更新的地方
來源:[XRCC 4.2 — Track C & D Joint Grilling Pack](https://app.notion.com/p/d18a8adc05854d7ea7f75813f9925220)(頁面最後編輯 2026-09-16)。快照只寫了主題,沒有記錄以下已接納的決策:

**Track C(AI)— 均標示 Accepted**
1. AI profile 可含多個 provider,每個 task(text-to-text、text-to-audio 等)有各自 model 設定;AI Behaviour block 選擇相容的 profile;換專案時把 profile 匯出為 access token。(C-JD-01)
2. Provider 逐個評估支援,不承諾「OpenAI-compatible 即全部可用」。(C-JD-02)
3. Poe 舊專案遷移走「專案升級」策略,不是全自動。(C-JD-04)
4. 網絡(networked)session 的 AI 可做但低優先,現有 Offline 限制須保持可見。(C-JD-05)
5. 先向 provider 取得 model 資料,取不到可手動輸入。(C-JD-06)
6. 有條件下優先用 audio streaming。(C-JD-07)
- 仍待研究:credential 強化範圍(C-JD-03)。

**Track D(裝置與 Remote Control)— 均標示 Accepted**
1. 以 QR 做每專案存取,沒有 lobby。(D-JD-02)
2. 4.2 Remote Control 是全新功能,不支援舊 Remote Trigger。(D-JD-03)
3. Remote Control server 內嵌於 Launcher;XR 模式在 Launcher 開 QR。(D-JD-04)
4. PC 模式用快捷鍵/按鈕開 QR,server 只在 Play mode 期間運作。(D-JD-05)
5. API 按「將來可能對外」的標準設計。(D-JD-08)
- 待研究:BLE/serial 斷線偵測(D-JD-01)、Windows 防火牆體驗(D-JD-06)、HMD 連線方式(D-JD-07)。
- 未決定:Remote Control UI authoring 範圍(D-JD-09,Decision required)。

**設計相關(Recommendation)**
- 快照 §5 的 4.2 摘要可加上上述決策。需要 UX 的位置:profile 選擇、provider/model 手動輸入的「用戶提供」標示、Poe 遷移的檢視步驟、Remote Control QR 入口與 Play mode 狀態、防火牆提示、BLE 斷線提示。
- 快照寫的「Launcher default profiles → templates」「Remote Control via web(room/password)」與 Grilling Pack 的「per-project QR、no lobby」有出入,以 Grilling Pack 為準。**Assumption**:兩者為不同日期的討論,未核對 2026-09-16 會議記錄全文。

## 三、新子頁(快照未列)
- 13 — Engineering Wayfinding Outputs & Joint Grilling Preparation
- 14 — Engineering Workflow Team Briefing & Presentation
- 15 — XRCC 4.2 Features Team Briefing
- Wayfinding Report — Track C / Track D
(皆在 4.2 Hub 之下,Notion 連結可由 Hub 頁面進入)

## 四、限制
- 未逐行查詢 Design handoff 資料庫(只用搜尋與頁面日期)。
- 未讀 Track C/D 報告全文與 2026-09-16 會議記錄。
