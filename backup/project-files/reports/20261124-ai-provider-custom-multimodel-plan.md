# AI Provider：Custom provider 多模型流程 UI/UX 規劃

日期：2026-11-24　範圍：只限 AI Provider　狀態：待 Alan 確認，尚未改動 Figma 或 prototype

已確認前提（Alan 2026-11-24）：一個 provider 可設定多個模型；可存放多條 key，但每個 provider 同一時間只用一條 key。

## 一、參考網站研究（next-ai-drawio.jiang.jp）

我實際瀏覽了設定頁與聊天框的模型選擇器（無 API key，未能完成測試流程，以下按畫面與 Alan 截圖整理）。

值得借用：
1. 設定頁分成三個帶編號的步驟：① 連線 → ② 選擇模型 → ③ 測試。完成一步後，編號變成綠色剔號，用戶一眼知道還差哪一步。
2. 模型是一個清單：逐個輸入模型 ID 按「新增」。每一行有狀態（未測試／出錯）和移除按鈕。（參考網站另有「從伺服器取得全部模型」，Alan 2026-11-24 決定先不做。）
3. Base URL 下方即時預覽「請求將傳送至 …/chat/completions」，用戶可以自行核對路徑。
4. 「測試全部 N 個模型」一個按鈕，結果寫回每一行，並有總結（例如「2 個模型沒通過測試」）。
5. 錯誤寫在最接近的位置：缺 key 寫在模型區頂部，URL 錯誤寫在每一行下面。
6. 聊天框的模型選擇器按 provider 分組列出所有模型，標示「預設」，底部有「新增服務商」「配置模型」入口。這正好對應我們 Models 分頁的任務選擇器。

不借用：
1. 把 Base URL 收在「更多選項」：對 Custom provider 而言，Base URL 是最重要的欄位，必須一直顯示。
2. 未填好前把「測試」按鈕顯示為灰色但沒有指引：我們改為按鈕旁寫明缺什麼。
3. 淺色主題、瀏覽器儲存說明：我們沿用 XRCC 深色 Library 元件與「Saved on this computer」文案。

## 二、建議方案（明確建議，不列選項）

### 1. Custom provider 對話框改為三個步驟（新增與編輯共用）

視窗仍為 960x640，對話框 600 寬，內容超出時內部捲動，Footer 固定。

① Connection（連線）
- Base URL（必填），下方預覽：`Requests go to http://192.168.1.20:8080/v1/chat/completions`。預覽路徑跟隨 Advanced 的 Request format 變化。
- API key（Optional）：沿用現有 Key select 元件，選項為「No key」、已存的 Custom key、「+ Add a key」；旁邊保留「Manage keys」連結。符合「多條 key、同時只用一條」。
- Name（Optional）：沿用 2026-11-20 規則，留空自動為「Custom provider」，重複時才加編號。位置移到 Base URL 和 API key 之後，因為它最不重要。
- Advanced（收合）：Request format、Timeout、Extra header，維持現狀。

② Models（模型）
- 清單每行：狀態圖示、模型 ID（等寬字）、狀態文字（Not tested／Testing…／Ready／Error）、「Default」標籤、移除按鈕（滑過才顯示）。
- 清單下方：輸入框「Add a model ID」＋「Add」按鈕，按 Enter 亦可加入。
- 預設模型規則：第一個加入的模型自動成為 Default；行的「⋯」選單可「Set as default」；移除 Default 時，下一行自動成為 Default；至少要有一個模型。

③ Test（測試）
- 一個按鈕「Test all 3 models」，向每個模型發一條很短的訊息。
- 結果寫回每一行，按鈕旁顯示總結「2 of 3 models ready」。失敗行顯示原因與「Retry」。
- 測試不是必須步驟：未測試也可以「Add provider」，但 provider 卡會顯示「Not tested」，提醒用戶。

步驟標記：每步標題左邊是 20px 編號圓形，完成後變成綠色剔號（status/success token），與參考網站一致；只用現有 icon 與 token。

Footer：Cancel（Tertiary）＋ Add provider（Primary，編輯時為 Save changes）。啟用條件：Base URL 格式正確且最少一個模型。

### 2. 模型在其他畫面的呈現

- Providers 分頁的 Custom 卡（B3）：顯示「3 models · 2 ready」與 Default 模型名稱；Edit 打開同一個三步對話框，底部加「Remove provider」（紅色文字按鈕）。
- Models 分頁的任務選擇器（B2）：選中 Custom 後，Model 清單就是該 provider 的模型 ID，每行顯示狀態；Error 行不可選並寫原因；Default 行預先選中。底部加「Manage models」連結，打開 Custom 對話框第 ② 步。
- Models 分頁的任務卡（B1）：顯示「Studio LLM · llama-3.3-70b」，不同任務可以選同一 server 的不同模型（例如 Text chat 用大模型、AI quiz 用快模型）。
- Launcher 啟動前（D4c）：Custom 一行顯示 server 位址和「3 models」，只檢查 server 能否回應；若專案用到的模型 ID 已被刪除，該行顯示「llama-3.3-70b isn't on this server anymore」並提供「Choose another model」。

### 3. 與今天規則的配合

- 間距：組與組 20、標籤到輸入框 8、輔助字 4、Body padding 24、Footer 按鈕 Medium 36；步驟之間 24，步驟標題到內容 12。
- 文字層級：步驟標題 14 Bold；欄位標籤 14 Bold；模型 ID 14 Regular 等寬；狀態與輔助字 12 Regular（text/secondary）；錯誤 12 Regular（status/error）。
- 只用 XRCC Library 元件與現有 token，不新增 token。模型行、步驟標記若 Library 沒有，放在本檔案 Components 頁作為 AI Provider 專用元件。

## 三、狀態清單（Figma 需畫的狀態）

| 區域 | 狀態 | 畫面表現 |
| :-- | :-- | :-- |
| 連線 | 空白 | Base URL placeholder；預覽行不顯示 |
| 連線 | URL 格式錯誤 | 輸入框紅框，下方「Enter a full address, like http://192.168.1.20:8080/v1」 |
| 連線 | 輸入了 …/chat/completions | 自動去掉尾段，輔助字說明「We removed /chat/completions. It's added for you.」 |
| 模型 | 空清單 | 虛線框「Add at least one model ID your server can run」 |
| 模型 | 重複 ID | 輸入框下方「llama-3.3-70b is already in the list」，不加入 |
| 測試 | 未填好 | 按鈕旁寫「Add a Base URL and at least one model first」 |
| 測試 | 進行中 | 每行依序轉為 Testing…，按鈕不可重複按 |
| 測試 | 全部通過 | 每行 Ready，總結「All 3 models ready」，步驟 ③ 變剔號 |
| 測試 | 部分失敗 | 失敗行顯示原因與 Retry；總結「2 of 3 models ready」 |
| 編輯 | 改了 Base URL 或 key | 全部模型狀態重設為 Not tested |
| 移除 | 刪除被任務使用中的模型 | 確認框「AI quiz uses this model. It will switch to qwen-2.5-7b (default).」 |

## 四、受影響畫面與工作量

| 優先 | 項目 | 畫面 | 工作量 |
| :-- | :-- | :-- | :-- |
| P1 | Custom 三步對話框（新增）＋主要狀態 | A6、A6b，新增約 6 個狀態畫面 | 約 1 天 |
| P1 | 任務選擇器的 Custom 模型清單、任務卡顯示「server · model」 | B1、B2（新增 1–2 個狀態） | 半天 |
| P2 | Custom 卡與編輯對話框（含 Remove provider、改 URL 後重設狀態） | B3、新增 Edit 畫面 2 個、D2a、D2b | 半天 |
| P3 | Launcher D4c 模型缺失狀態 | D4c 與新增 1 個狀態 | 2–3 小時 |
| P3 | Tooltip 規格與微互動規格補充（測試） | 第 5 區 | 1–2 小時 |
| 之後 | Prototype 跟隨 Figma | /ai-provider/ | 約 1 天 |

執行順序：Figma 先改並自查，加精簡 Annotation、記錄變更日誌，報告後才改 prototype；推送網站需 Alan 逐次批准。

## 五、需要開發確認

1. 測試請求：每個模型發一條短訊息的成本與逾時，是否沿用 Advanced 的 Timeout。
2. 專案檔如何記錄任務所選模型（provider + 模型 ID），以及 Launcher 經 -aiModelKey 傳遞時是否包含模型 ID。
3. Custom 模型是否只用於文字類任務（Text chat、AI quiz），還是允許用戶標記為語音或圖像模型。我建議 P1 只支援文字類任務。
4. 每個 provider 的模型數量上限（建議 20）。

## 六、建議同時決定的兩點（我的建議）

（已決定：不做「Fetch from server」，P1 只支援手動輸入模型 ID；日後如要加，入口位置為 Models 標題列右側。）

1. 同一模型清單亦適用於 OpenRouter（它本身就是多模型服務）。Gemini、MiniMax、Poe 繼續使用我們整理好的模型清單，不讓用戶自行輸入 ID。
2. 測試保持可選，不阻擋「Add provider」，以免離線設定時卡住。
