# XRCC AI Provider prototype：畫面清單（取自 AIProviderPanel.mp4）

日期：2026-11-05。來源：Notion 11 月 4 日會議子頁「AI」內嵌影片（29 秒）。只根據影片畫面整理，屬 prototype 現況，不代表最終設計。

## 面板位置與外觀

- 嵌在 Behaviour 編輯器內的浮動面板，標題「AI Provider」，右下角可拖曳縮放，內容可垂直捲動。
- 暗色風格，主色為紫色（按鈕與焦點框），目前沿用 Unity 預設式控件，畫面偏原型。

## 面板區塊（由上至下）

1. **Providers**（右上有 + 按鈕）：已加入的 provider 以卡片列出。
2. **Task models**：每個 task 一列，左側下拉選 Provider，右側下拉選 Model，預設皆為 None。Task 共六項：Text chat、AI quiz、Text to speech、Text to music、Text to image、Transcription。
3. **Voice presets**（右上有 + 按鈕）。
4. **Sessions**（右上有 + 按鈕）：空狀態文字為「No sessions yet.」。

## 互動流程

### 加入 Provider（Add provider 對話框）

- 欄位：Type（預設 Built-in）、Provider（下拉：Gemini、Poe、MiniMax、OpenRouter）。
- 確認後，provider 以卡片出現在 Providers 區。

### Provider 卡片

- 展開狀態：標題（如 MiniMax）、狀態文字（綠色「No API key saved」）、API key 輸入、Key password 輸入、說明文字、Save、Clear key、Remove provider。
- 說明文字大意：此密碼用於加密 key，每次開啟專案都需要，無法找回，忘記就要移除並重新加入 provider。
- 儲存後收合：只剩標題與 Remove provider。
- 同一時間可有多個 provider 卡片（影片中有 MiniMax 與 Gemini）。

### 選擇 Task model

- 先選 Provider，再選 Model。例：Text chat 選 MiniMax 後，Model 下拉為 None、MiniMax M3、MiniMax M3.1 Flash。
- Text to speech 選 Gemini 後，Model 為 Gemini 3.8 Flash-Lite TTS。

### 新增 Voice preset（對話框，欄位因 provider 而異）

- MiniMax：Provider、Model（如 Speech 2.8 HD）、Name、Speed（預設 1）、Pitch（預設 0）、Emotion（None）、Language（如 Chinese,Yue）、Voice（如 Chinese (Mandarin)_Lyrical_Voice）、Cancel、Save。
- Gemini：Model（Gemini 3.8 Flash TTS）、Name、Voice（如 Kore）、Language（English）、Cancel、Save；沒有 Speed、Pitch、Emotion。
- 驗證了 Notion 需求所述：設定欄位依 provider 與 model 變化。

## 對照 Notion 需求，影片未見或值得留意

- 影片未見 Custom Provider 設定（只有 Built-in Type）。
- 影片未見 Key Management 的 key 選取流程，key 與密碼直接在卡片內輸入。與需求「從 Key Management 選取 key」不一致，需向團隊確認是 prototype 簡化還是新方向。
- 未見 voices 清單的載入、錯誤、驗證 account 等狀態，也未見 voice clone 失效與 fallback voice 的處理。
- 影片中 API key 欄位曾以明文顯示，之後如需公開或轉發影片，建議先確認該 key 已更換。本清單不載入任何 key 內容。
- Gemini 需 VPN 的提示未見。
- Provider 與 Model 的 None 預設、未設定 provider 時 Task models 是否可選，行為未見說明。

## 現有入口（Alan 補充，2026-11-05）

- 目前舊入口是 XRCC 頂部工具列的圖示按鈕，提示文字為「Create with Poe」，位於 debug、USB、晶片、手機、資料夾等圖示之間（選取時為紫色底）。
- 入口之後預計會改，因為功能不再只限於 Poe 一個 provider。
- 待設計決定：入口名稱與圖示（不再帶 Poe 品牌）、提示文字、點擊後打開的是生成面板還是 Provider 設定、未設定 provider 時的引導。

## 舊 UI：Poe AI 面板（Alan 提供截圖，2026-11-05）

- 標題列：Poe AI 圖示與名稱、關閉按鈕；下方有紫色細線。
- 頂部說明區：Poe 大圖示、標題「Use Poe AI in XRCC」、副標「Add your own Poe API Key to use Poe bots in XRCC」。
- Key 卡片：key 名稱（Office Key）、key 尾碼或識別碼、「Test Response」與「Change Key」兩個按鈕。key 已從 Key Management 選取，與新 prototype 的卡片內直接輸入不同。
- **AI Chat Sessions**：標題旁「Add Session」按鈕；表格欄位為 Session Name、System Message、Action；空狀態為驚嘆號圖示加文字「Click “Add Session” to create and configure your first AI chat session」。
- **AI Voice Presets**：標題旁有資訊圖示與「Add Voice Preset」按鈕；表格欄位為 Voice Preset、Language、Voice、Action；預設有三列（Default voice 1 至 3：English／Kore、Mandarin／Puck、Cantonese／Zephyr）。

### 與新 prototype 的對照

- 舊 UI 以「單一 provider（Poe）」為前提，整個面板圍繞一把 key；新 prototype 改為多 provider 加 Task models。
- 舊 UI 的 Sessions 與 Voice Presets 區塊（表格加空狀態）在新 prototype 仍有對應區塊，可沿用資訊架構。
- 舊 UI 有 Test Response 驗證 key，新 prototype 未見，值得保留作為驗證與錯誤回饋入口。
- 舊 UI 的預設 voice 名稱（Kore、Puck、Zephyr）是 Gemini 的 voice，與 Notion 所述「舊 voice preset 是當時 model 內建 voice」相符；新版需依 model 而定。

## 舊 UI：Settings > Connections（Add key／Manage key，Alan 提供截圖，2026-11-05）

- 位置：Settings 視窗左側導覽的「Connections」頁（導覽另有 Display、Control、Edit、Networking、Sketchfab、Security And Privacy、Licensing、Wit.ai）。
- 以服務分段：**Poe** 與 **Wit.ai** 各一段，每段有標題與紫色說明（如「all the Poe AI API keys added to XRCC」）。
- Poe 段：搜尋框、排序控制、「Add API Key」按鈕；表格欄位為 Key Name、Last Used、Action（例：Office Key，Last Used 2026-11-05）。
- Wit.ai 段：搜尋框、「Add」按鈕；表格欄位為 Key Name、Token、Last Used、Action。
- 觀察：key 管理按「服務」分段，新增 provider 後，若每個 provider 各一段，頁面會愈來愈長；新 prototype 的 Provider 卡片與此頁的 key 管理需決定是合併還是分工（與 Notion「Add Key UI 加入 Provider 選項」的建議直接相關）。
- Wit.ai 屬語音辨識服務，是否也納入新的 provider 架構，需向團隊確認。

## Alan 確認的設計要求（2026-11-05）

對照上述差異，Alan 確認 UI 設計須包含：

1. 須有 Custom Provider（名稱與 URL 由用戶設定，不一定需要 API key）。
2. Key 須從 Key Management 選取，而不是在 Provider 卡片內直接輸入。
3. 須有 voices 載入與錯誤狀態、voice clone 失效後備方案（fallback 預設 voice），以及 Gemini 需 VPN 的提示。
