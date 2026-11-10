# Notion：XRCC AI Provider 內容摘要

日期：2026-11-05。範圍：只讀取 Notion，未作任何修改。

## 存取說明

- Alan 提供的 Notion chat 連結（app.notion.com/chat?t=...）屬 thread 類型，Notion 連接器的 fetch 工具不支援，因此未能讀取該對話內容。
- 已改用 Notion 搜尋，讀取所有相關頁面。若該 chat 內有未寫入頁面的補充資料，需由 Alan 貼出文字。
- Gmail 或 Outlook 的 Notion 通知郵件只含摘要，無實質內容，未採用。

## 一、已確認的內部資訊

### Feature 概況（AI more provider connection）

- 產品：XRCC；優先級 P1；狀態 In progress；目標發佈 2026 Q4；預計工作量 2 至 3 個月。
- 工作項目：「AI Provider - architecture」（已完成，2026-09-28 至 10-21）；「AI Provider - voice clone research」（進行中，2026-10-27 至 11-03）。
- 10-30 Scope Meeting 將 AI Provider 列入 XRCC 4.2 範圍。

### Provider 設定（UI Requirement）

- 用戶需選擇使用哪個 provider。第一階段支援：Gemini（需 VPN，可能要提示用戶）、POE（現行版本唯一 provider）、Minimax（音頻模型主力）。
- 目前並非所有 provider 支援所有 AI task，現時只有 POE 全部支援。
- API key 從 Key Management System 選取，並可輸入選用密碼。
- Custom Provider：用戶自行設定名稱與 URL；不一定需要 API key；可做的驗證不多。

### AI Task 類型

Chatbot（Text-to-Text）、Text-to-Speech、Speech Recognition（用於 Generation Panel）、Music Generation（Generation Panel，只限 editor）、Image Generation（Generation Panel，只限 editor）、AI Quiz（支援 PDF 的 chatbot）。

### Voice Preset

- 不同 model 有不同 voice 與設定，常見設定包括 pitch 與 speed。
- 設定欄位依據團隊維護的線上 config 檔生成；輸入類型有 Number（Slider）、Text field、Option box。
- 完整 voice 清單只能在設定好 provider 後才能取得（清單會變，部分自訂 voice 綁定帳號）。
- 頁面附有 Gemini 與 Minimax 的 Voice Preset 截圖，可作 UI 參考。

### Session

- 用途：儲存並設定 AI 對話的 system prompt（例如角色扮演、規則設定），用於 behaviour 與 AI character。

### Key Management

- XRCC 與 Launcher 兩邊都有。
- 目的：API key 只存於本機而非專案內；毋須每次輸入；可用選用密碼保護。
- 儲存的 key 已加密，需輸入用戶密碼才能取得數值。
- 新增 key 需要：Key name（顯示用）、Provider（Gemini、Minimax 或 custom）、API key、選用密碼。
- 建議在現有 Add Key UI 加入 Provider 選項（頁面標示 Maybe）。
- 另有「key 閒置過久自動清理」的設定，與本題關係不大。

### Implementation Spec（Model Config 檔）

- 建議由 XRCC NAS 服務提供 config 檔，以繞過 GitHub 檔案存取次數限制（標示 TBC）。
- 所有設定放在同一個檔案。
- 舊版 XRCC 收到不支援的 provider 時不可報錯。
- 所有設定值都需有 fallback 值（寫在 config 內），以應對 config 更新後舊值不再支援。

### 11-04 Research Team Meeting 結論

- Prototype 已發展為通用系統，可支援不同 AI provider，並有 AI Gen 產生的 Panel，各 provider 可輸入自己的 key。
- 可按不同 task 選擇不同 model；每個 preset 對應不同 model。
- 新增 provider 包括 MiniMax、Open Router 等。
- Model JSON 傾向全部由團隊自行維護，原因是各 provider 做法不同（如 Gemini 有多個 model 但缺逐一說明），部分功能（如 PDF input）並非所有 model 支援，需手動 filter。
- 更新頻率：約每月一次，視乎大型 model 是否有新 release；有新 model 後約一週內要試用。
- 結論：prototype 可進入 UI 實作。Action item：為 XRCC AI Provider prototype 進行 UI/UX 實作。
- 舊的 voice preset 是當時 model 內建的 voice，新版需依 model 而定。
- 轉換 provider 後，需先選 MiniMax 才出現 preset UI，並須輸入 key、驗證 account 才能取得 voices。
- MiniMax voice clone 限制：閒置 7 天後自動刪除；議程建議加入 fallback 預設 voice，以防所選 voice 失效。
- 目前只使用 free version，未確定 latency 是否有差異。

### 現有 AI model 參考（2026-07-14，AppData 4.0.0）

- 預設：Speech-to-Text 用 Gemini-3.1-Flash-Lite；Text-to-Speech 用 MiniMax-Speech-2.8（粵語所需，且是唯一選項）；AI character 描述與核心指令生成用 GPT-5.4-nano。
- 圖像、音樂等其他 model 清單見原頁。此頁反映 POE 單一 provider 的舊架構。

### EULA 相關（Section 5 與 7.2）

- XRCC 採用 Bring-Your-Own AI：VOTANIC 不提供 AI 推理，也不經伺服器轉送 AI 流量。
- AI credentials 可由用戶以密碼在本機加密，VOTANIC 不會把 credentials 傳送至其伺服器。
- 設計提示：UI 文案與 Key 管理畫面需與此承諾一致。

## 二、未決事項

1. Config 檔的託管位置（XRCC NAS 或 GitHub）仍是 TBC。
2. Key Management 的 Add Key UI 是否加入 Provider 選項（標示 Maybe）。
3. MiniMax voice clone 閒置 7 天刪除的處理方式：提示、保存機制或 fallback voice，尚未定案。
4. 如何取得 MiniMax voice 清單：因 Gmail 登入無法在網頁檢視 API 結果，待向 MiniMax 查詢。
5. Gemini 需 VPN 的提示方式。
6. Custom Provider 可做哪些驗證。
7. Voice Preset 的設定欄位如何由 config 驅動，以及 voices 載入前的空白或載入狀態。
8. 現有 UI 是否已是 UIKit、能否沿用舊版（會議中提出的疑問，未見結論）。

## 三、待確認假設

- 各 task 與 provider 的支援矩陣目前只有「僅 POE 全支援」的描述，其餘組合需向團隊確認。
- 每個 provider 的 Phase 1 範圍（Open Router 是否屬 Phase 1）：UI Requirement 只列 Gemini、POE、Minimax，會議另提及 Open Router，兩者未對齊。
- 上述頁面均為「unverified」狀態，內容可能仍在更新（Implementation Spec 與 Feature 頁在今日更新過）。
- 未能讀取的 Notion chat 對話內容可能含額外要求。

## 四、已閱讀的頁面

| 頁面 | 連結 |
| --- | --- |
| AI more provider connection（Feature 頁） | https://app.notion.com/p/7b828d98586a450686b76b77c0850008 |
| XRCC AI Provider UI Requirement | https://app.notion.com/p/43b658ae04844621967c81546b9611da |
| XRCC AI Provider Implementation Spec | https://app.notion.com/p/1afa214cce51427ab2173e6c51cad054 |
| AI Provider - architecture（Work item） | https://app.notion.com/p/3f08966c12ba8057a37ff693d51eebd6 |
| AI Provider - voice clone research（Work item） | https://app.notion.com/p/40e8966c12ba8073b01fff03189eb3e5 |
| Research Team Meeting (2026-11-04) | https://app.notion.com/p/a92f33e9dc85457a977d666622b57df0 |
| XRCC AI Provider, Remote Trigger & Exploration Initiative（議程） | https://app.notion.com/p/fe7450dbe2174697ac3eef18df650e8a |
| XRCC Scope Meeting (2026-10-30) | https://app.notion.com/p/40d8966c12ba80eba559cc93b54a7884 |
| AI model options (XRCC) | https://app.notion.com/p/649d78604fe64b12be1190ac26a42336 |
| XRCC End User License Agreement（只讀 AI 相關條款） | https://app.notion.com/p/3c18966c12ba802aa4d9fe7f5cd494cc |

未讀取：與 AI Quiz、AI Character 相關的舊頁面（如 AI Quiz Related Pages）和 XRCC Launcher 知識頁，只列在搜尋結果，與 provider 架構關係較遠；如需要可再補讀。
