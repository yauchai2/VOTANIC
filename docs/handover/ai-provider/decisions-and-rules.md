# AI Provider：決定與規則

來源簡寫：Alan＝Alan 本人說話；Team＝開發團隊審閱（Alan 轉達）；Notion＝只讀頁面。日期為說話日期。

## 1. 需求來源（Notion，唯讀）

- Feature「AI more provider connection」：XRCC，P1，目標 2026 Q4，已列入 4.2 範圍（10-30 Scope Meeting）。11-04 Research Meeting 結論：prototype 可進入 UI 實作。
- 第一階段 Provider：Gemini、Poe、MiniMax；prototype 另有 OpenRouter（是否 P1 未對齊）。須有 Custom Provider（用戶自訂名稱與 URL，不一定要 key）。
- 六個 AI task：Text chat、AI quiz（能讀 PDF 的 chat）、Text to speech、Text to music、Text to image、Speech to text（原 Transcription）。
- Voice Preset 欄位由團隊維護的線上 config 驅動（Slider、Text field、Option box）；完整 voices 須先設定好 Provider 才能取得。
- Key Management：XRCC 與 Launcher 兩邊都有；key 只存於本機並加密，可設選用密碼；EULA 是 Bring-Your-Own AI，VOTANIC 不提供推理、不轉送流量。UI 文案須與此一致。
- Session：儲存 system prompt，用於 Behaviour、AI character、Quiz 設定。
- 舊版收到不支援的 Provider 不可報錯；所有設定值須有 fallback。
- Notion 一律只讀，想改只可建議內容由 Alan 自行貼上。Notion 頁面連結見 `reports/20261105-notion-xrcc-ai-provider-summary.md`。

## 2. Alan 的決定（時序，後者覆蓋前者）

| 日期 | 決定 |
|---|---|
| 11-05 | `AIProviderPanel.mp4` 只是開發者測試：只取功能與資料，UI/UX 重做得更好。 |
| 11-05 | 必備：Custom Provider；Key 從 Key Management 選取，不在卡片內輸入；voices 載入與錯誤狀態；voice 試聽；視覺化簡約，次要與進階設定收起。 |
| 11-05 | Launcher 是另一個程式；Connections 是啟動前關卡（版本檢查 → 專案是否需要 connections → ConnectionSetupPanel → 啟動）；License 只是設定頁，與 AI key 無關。 |
| 11-05 | Icon 統一 outline 1px；Cancel = Tertiary；Tabs 與 head 跟隨 Runtime Debug Panel（`6177-31101`）；Header 跟隨 Main Scene（`M84FtPQGf4odQy2KTdxKIR` 的 `6001-12978`）；多個 popup 疊放時下層變暗；tooltips 做成規格表；要有 Hover states。 |
| 11-06（Team） | 分頁順序 Providers、Models、Voices、Sessions；Tasks 改稱 Models（11-12 統一）；不做 Play all；Voices 先顯示推薦並有搜尋與 Show all；用「Bring your own key」；Key 選定後才顯示密碼欄（Wit.ai token 無密碼）；Custom 不可測試連線；Voices 分頁顯示使用中的 Provider；隱藏任務不能用的 Model，不顯示為 disabled；Sessions 描述要涵蓋 Behaviour、AI character、Quiz。 |
| 11-06 | Gemini 視為支援 image（見第 4 節能力表）。 |
| 11-13 審閱 v1 | 不再有任何 VPN 提示（失敗寫「Check your network connection」）；「Locked」改「Password needed」／「Enter password」；密碼欄有顯示／隱藏切換，不設確認欄；不提 quota；「Transcription」改「Speech to text」（假設）；已連接的 Provider 用綠色勾與「Connected」；移除多餘的「Paste one from Google AI Studio…」句。 |
| 11-13（由你建議） | 日後新增 Provider：自動換行方塊網格，Custom 固定排最後，超過約 8 個在上方加搜尋。Connections：摘要列，每個連線開自己的面板（Figma D0、D1、D1b）。 |
| 11-13 Alan 確認 | 除 Custom 外每個 Provider 只有一條 API key（非 Custom 的 key 欄為單一顯示、無下拉；已有 key 的 Provider 在 Add AI key 不可再選）；語音複製（Voice clone）fallback 不支援，Figma 已移除 C6 與複製語音卡片，C7 的 Unavailable 改為「Voice no longer available」。 |

被取代的舊說法（勿再依據）：Gemini VPN 提示（11-05 簡報）；Tasks 命名；「Locked」；Voice clone 失效改用 fallback voice（簡報與首版交接的第 3 節）；Provider 卡片內多 key。

## 3. 設計與流程規則（摘自 READ-FIRST，與本功能最相關）

- 語言：對 Alan 用繁體中文，報告用書面語；UI 文案英文為主；英文逗號後加空格、中文用全形標點。
- 只做 Dark，單一 1920x1080 桌面畫板；web prototype 仍須 responsive。
- 先用 XRCC (PC) Library（`De8nKqO81yciw4wH5xfpxA`）元件與 token；不新增 token；feature 專用元件放該檔 Components 頁（Workbench `85:1541`）；只有 Alan 可 Publish Library。
- Icon 顏色綁相鄰文字的 token，換 icon 後須重新綁定；混字級純文字列用 baseline 對齊。
- Figma 連線（`Flow connectors`、實線主流程、虛線分支）與 Annotations（Figma 原生功能，書面語，少而精準）必須依參考頁 Workbench `1333-8666` 量度後再做；說明頁 `2160:7338`。不可自創方法。
- 順序：先做完全部 Figma 並自檢，Alan 看過才同步 prototype；每次改動後跑 READ-FIRST 第 13 節自檢。
- 非 Notion 的公司系統一律不寫入；不外洩密碼、token、key（開發者影片中的 key 曾明文出現，本文件不載入任何 key）。

## 4. 能力假設（未經團隊核實）

Gemini：chat、quiz（PDF）、speech、image、speech to text；MiniMax：chat、speech、music；Poe：全部；OpenRouter：chat、quiz、image；Custom：chat。Figma 的 +N chips、資訊行與 prototype 資料須與此表一致。
