# XRCC AI Provider：UI 設計準備簡報

日期：2026-11-05。整合 Notion 頁面、prototype 影片、舊 UI 截圖與 Alan 的補充。標示「建議」的項目是我的推薦，未經確認。

## 1. 目標

把現行「只支援 Poe」的 AI 介面，改為可支援多個 provider（Gemini、Poe、MiniMax、OpenRouter，以及 Custom Provider）的設計，並讓用戶能按 task 選擇 provider 與 model。

## 2. 已確認的要求

- 第一階段 provider：Gemini（需 VPN）、POE、Minimax；prototype 另有 OpenRouter。
- 須有 Custom Provider：用戶自訂名稱與 URL，不一定需要 API key，可做的驗證有限。
- Key 須從 Key Management 選取（可輸入選用密碼），不在 provider 卡片內直接輸入。
- Task 共六項：Text chat、AI quiz、Text to speech、Text to music、Text to image、Transcription。
- Voice Preset 的設定欄位由 config 驅動（Slider、Text field、Option box）。完整 voices 清單須在 provider 設定好後才能取得。
- 須有：voices 載入與錯誤狀態、voice clone 失效（MiniMax 閒置 7 天刪除）後備方案、Gemini 需 VPN 提示。
- 須有 voice 試聽（Alan，2026-11-05）：在 Voice preset 的建立、編輯與清單中，可直接播放試聽。
- 整體風格須視覺化、簡約（Alan，2026-11-05）：以圖示、狀態標記與少量文字取代密集表單與表格。
- Session 沿用：儲存 system prompt，用於 behaviour 與 AI character。
- 並非所有 provider 支援所有 task；舊版 config 遇到不支援的 provider 不可報錯；所有設定值須有 fallback。

## 3. 現有畫面（改版基礎）

| 畫面 | 現況 | 去向 |
| --- | --- | --- |
| 入口 | 工具列圖示，提示「Create with Poe」 | 改名與換圖示，不再帶 Poe 品牌 |
| Poe AI 面板 | 單一 key 卡片（Test Response、Change Key）、AI Chat Sessions 表格、AI Voice Presets 表格 | 改為多 provider；Sessions 與 Voice Presets 區塊沿用 |
| Settings > Connections | 按服務分段（Poe、Wit.ai）的 key 表格，含搜尋、排序、Add API Key | 成為 Key Management 的主要位置；需加 Provider 欄 |
| Prototype 面板 | Providers 卡片、Task models、Voice presets、Sessions | 功能骨架，視覺與 key 輸入方式需重做 |

## 4. 建議的設計範圍與畫面清單

單一桌面框 1920x1080，只做 Dark，所有文案用英文，只綁現有 token，使用 Library 元件。

1. **入口**：工具列按鈕（新名稱、圖示、提示文字、未設定時的小提示）。
2. **AI 面板主畫面**（Provider 設定與 Task models 合一，或分頁）。
3. **Add provider 對話框**：選 Built-in provider 或 Custom；選 key。
4. **Custom Provider 設定**：名稱、URL、選用 key。
5. **Key 選取**：從 Key Management 選 key、輸入選用密碼、解鎖狀態。
6. **Key Management**（Settings > Connections 的改版）：加 Provider 欄，Add key 流程含 Provider 選項。
7. **Task models**：Provider 與 Model 兩層下拉；provider 不支援該 task 時的不可選狀態。
8. **Voice presets**：新增與編輯對話框（欄位依 model）、voices 載入中、載入失敗、清單為空。
9. **Voice clone 失效**：預設 voice 後備提示與替換流程。
10. **Gemini VPN 提示**：選用 Gemini 時的提示位置與文案。
11. **Sessions**：沿用表格與空狀態。
12. **Voice 試聽**：播放、載入、播放失敗狀態（如 voice 失效或 provider 無回應）。
13. **空狀態與錯誤狀態**：未加入 provider、key 驗證失敗、Test Response 結果。

## 5. 設計建議（待確認）

1. 面板主架構建議：上方「Providers」一排（卡片只顯示狀態與所選 key，不含密碼輸入），中間「Task models」，下方 Voice presets 與 Sessions。這樣沿用舊面板的熟悉順序，並與 prototype 骨架一致。
2. Key 管理建議集中在 Settings > Connections，並在 provider 面板內以「選擇 key」下拉加「Manage keys」連結，兩處共用同一份資料。這避免密碼與 key 散落在多個畫面。
3. 保留舊 UI 的 Test Response，作為 key 驗證與連線錯誤回饋入口。
4. Provider 不支援某 task 時，顯示不可選並附原因，而不是隱藏，讓用戶知道為何看不到。
5. Voice clone 失效：在 voice 旁顯示警示標籤，並一鍵改用 fallback 預設 voice。

## 6. 待確認問題

1. 設計檔位置：放在 XRCC PC UI 檔的新 section，還是其他檔案？AI 專用元件是否放在該檔的 Components 頁（依既有規則）？
2. 入口的新名稱與圖示（不帶 Poe 品牌）。
3. Wit.ai 是否納入新的 provider 架構與 Key Management。
4. Custom Provider 的 request 格式與可驗證內容。
5. 面板形式：沿用浮動面板（Behaviour 編輯器內）還是 Settings 內分頁。
6. Key Management 的 key 自動清理（閒置過久）是否在此版 UI 呈現。

## 7. 製作前提（來自記憶中的既有規則）

- 只做 Dark、單一 1920x1080 桌面框，不做響應式。
- UI 文案以英文為主，自然、有人味，避免模板式畫面。
- 只綁現有 token，不新增；新元件須用現有 token 與文字樣式，並記錄在 change log。
- 單一功能專用的元件放在該功能檔案的 Components 頁，不放共用 Library。
- Icon 顏色須與相鄰文字綁定同一 token，換 icon 後需重新綁定。
- 完成後須自行檢查 prototype、註解與整體一致性才匯報。

## 8. 補充：XRCC Launcher（Alan，2026-11-05）

- Alan 補充 Launcher 內另有一個入口，附上的截圖是 Launcher 的 License 頁（XRCC License 表格、Activate New License 輸入框）。
- Launcher 左側導覽為：Project、Content Library、Packages、Profile、Version、License，以及 Settings、Connections、More。
- 依 Notion，Key Management 同時存在於 XRCC 與 Launcher，推測 Launcher 的「Connections」才是 key 管理入口；License 頁本身與 AI key 無直接關係。此點待 Alan 確認。
- 若 Launcher 的 Connections 同為 key 管理，改版時須與 XRCC 內 Settings > Connections 保持一致（同一份資料、同一套 Add key 流程）。
- License 頁可作為 Launcher 內表格、輸入框加按鈕、說明文字的視覺參考。

## 9. 風格與試聽的設計含意（建議）

- 簡約：Provider 以圖示加名稱加狀態點呈現（已連線、未設定 key、錯誤），細節收進展開區；Task models 以一列一個 task、兩個下拉為主，避免多餘說明文字。
- 視覺化：Voice preset 以卡片或緊湊列呈現，帶 provider 圖示、語言標籤與播放按鈕，取代純文字表格；不支援的 task 以淡化與小標記表示。
- 試聽：每個 voice 旁有播放按鈕與短句試聽文字（可自訂），播放中顯示簡單波形或進度；需 key 與連線才能試聽，未就緒時按鈕不可用並提示原因；失敗時就地顯示錯誤與重試。
- 試聽會消耗 provider 用量，建議在按鈕提示或說明中點明。此點待確認。

## 10. 資訊層級原則（Alan，2026-11-05）

- 不重要的設定與 advanced settings 可以收起，或在視覺上降為次要。
- 建議：主層只放必要操作（選 provider、選 key、選 model、試聽 voice）；進階項目（如 Speed、Pitch、Emotion、Custom Provider 的進階欄位、key 自動清理）放入「Advanced」摺疊區，預設收起，標題與標籤用次要文字色。
- 狀態與提示（如 Gemini VPN）只在相關時出現，避免常駐佔位。
