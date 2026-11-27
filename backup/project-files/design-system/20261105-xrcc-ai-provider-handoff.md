# XRCC AI Provider：UI/UX 交接說明

日期：2026-11-05。Figma：XRCC Claude Workbench，頁面「XRCC AI Provider」，Section「XRCC AI Provider · Screen flow」（node 1354:2549，Alan 已將全部內容移到此處）。

## 1. 設計方向

- 不沿用 developer prototype（AIProviderPanel.mp4）的版面，只取其功能與資料。
- 面板改名為「AI」，以四個分頁組成：Tasks、Voices、Sessions、Providers。打開時先見 Tasks。
- Tasks 以六張任務卡呈現。每張卡顯示任務用途、由哪個 provider 和 model 執行，以及是否就緒。用戶從「想做甚麼」出發，不用先理解 provider。
- Providers 設定一次後退居次要。標題列的 provider dock 讓用戶一眼看到狀態，點擊即進入 Providers 分頁。
- 圖像化做法：provider 彩色標誌、任務彩色圖示、首次使用的軌道插圖、voice 大播放鍵與波形、進度段。
- 進階設定（Speed、Pitch、Emotion、Custom provider 的 request 格式與 timeout）預設收起。

## 2. 畫面清單

| Lane | 板 | 內容 |
| --- | --- | --- |
| 1 入口與首次連接 | A1–A6 | 工具列入口、首次空狀態、Add provider、選 key、未有 key、Custom provider |
| 2 任務與 provider | B1–B7 | Tasks 分頁、選擇誰執行任務、Providers 分頁、provider 展開、移除、解鎖 key、測試失敗與 VPN 提示 |
| 3 Voice 與試聽 | C1–C8 | Voices 分頁、新增 preset、Advanced、載入中、載入失敗、clone 被刪、試聽五種狀態、Sessions 分頁 |
| 4 Key 管理 | D1–D4 | Settings > Connections、Add key、Launcher > Connections、Launcher 啟動前的 Connection setup |

Prototype 連線共 19 條，由 A1 的 AI 按鈕開始。

## 3. 行為要點

- Key 只從 Key Management 選取；provider 卡內不能輸入 key。
- Provider 或 model 不支援某任務時，仍會顯示，但會淡化並附原因，不會隱藏。
- AI quiz 只列出能讀 PDF 的 model。
- Voice clone 被 MiniMax 刪除（閒置 7 天）時，立即改用 fallback voice（例：Warm host），卡上註明，再由用戶決定是否更換。
- Gemini 的 VPN 提示只在 Gemini 相關時出現：Add provider 選中 Gemini、provider 展開、測試逾時。
- 試聽共用一句 preview line，方便比較；每次試聽會用到 provider 的額度，畫面有註明。
- 狀態只顯示可量度的事實：Connected、Needs key、Locked、Test failed、Ready。

## 4. 缺口與待確認

1. Library 沒有中性的 AI 圖示，也沒有 chat、mic、plus 圖示。我已在 Workbench Components 頁自繪 7 個 glyph，如需共用可移入 Library。
2. Library 沒有破壞性按鈕元件，目前以 action/destructive token 自建。
3. Library 的 Alert 元件在暗色下呈淺色，所以警告框改以 status/warning token 自建。
4. 各 provider 的任務支援矩陣是假設（卡上的能力圖示），Alan 指示先按假設設計，之後由團隊核實。
5. Launcher 是另一個程式。Alan 已確認（依 Notion AI）：Connections 才是啟動前的關卡，流程為版本檢查、專案是否需要 connections、需要就跳 ConnectionSetupPanel、再啟動 XRCC。License 只是設定頁，與 AI key 無關。D3 與 D4 據此設計。
6. Wit.ai 暫時保留在 Connections 的獨立區段，是否併入新架構仍待確認。

## 5. 文案表（英文）

| 位置 | 文案 |
| --- | --- |
| 入口提示 | AI providers · Connect Gemini, MiniMax, Poe or your own server |
| 首次空狀態標題 | Give your project a brain and a voice |
| 首次空狀態說明 | Connect an AI provider to chat in character, quiz learners on a PDF, or read lines out loud in Cantonese. |
| 首次空狀態按鈕 | Add a provider |
| Tasks 標題 | 4 of 6 tasks are ready |
| 未設定任務 | Choose a provider |
| 被鎖任務 | Needs Poe. Unlock its key to use. |
| Model 不支援 | Can't read PDFs, so quizzes can't use it |
| VPN 提示 | Gemini needs a VPN in Hong Kong. Turn it on before you connect, or the test will time out. |
| 測試逾時 | Gemini might be blocked where you are. Your key looks fine, but the request timed out. Turn on your VPN, then test again. |
| 移除確認 | Remove MiniMax? Text to speech and Text to music will stop until you pick another provider. |
| 密碼錯誤 | That password doesn't match. Check Caps Lock and try again. |
| Voice 載入失敗 | Couldn't load MiniMax voices. MiniMax didn't answer. Check the key in Providers, or try again in a moment. |
| Clone 被刪 | Clone removed after 7 idle days. Playing Warm host instead. |
| 額度提示 | Every play uses a little of that provider's quota. |
| Key 管理說明 | Keys are encrypted and kept on this computer. Projects never contain them, and VOTANIC never sees them. |

## 6. Component 與圖示（補充）

- Provider 標誌：Components 頁的「AI Provider Logo」（Provider × Size 16／20／24／32／40），來源為 Alan 提供的 Logo frame。OpenRouter 與 Custom 的顏色為假設，待確認。
- 圖示：「AI Icon」系列 24 個，全部 outline、1px 描邊、24 格；畫面內以 16（行內）及 20（40px 以上 tile 內）使用，顏色一律綁定與相鄰文字相同的 token。
- 其他 feature component：AI Task Card、AI Key Row、AI Provider Card、AI Voice Card、AI Task Row。
- Dialog 與 Tab 使用 Library component。
- 另有 AI Warning、AI Destructive Button、AI Session Card、AI Voice Tile、AI Voice Pick、AI Provider Chip、AI Provider Choice。
- Radio 用 Library Form；A4 選單用 Library dropdown-menu + menu-item；分頁列為 Library Full Tabs 用法（單一圓角容器，Size L，等寬）。
- 網頁原型：PR yauchai2/VOTANIC#6，prototypes/xrcc-ai-provider/index.html。
