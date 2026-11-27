# Voyage 360 Loading Enhancement：Figma 留言檢討

日期：2026-11-09
範圍：Figma 檔「Voyage 360 UI-PC+VR」頁面「Voyage 360 Loading Enhancement」，留言者 unity4。
狀態：只作檢討，Figma 與 prototype 均未改動。

## 一、總覽

共 10 則留言，其中 2 則（S3 畫面）已處理，其餘 8 則待決定。

| # | 位置 | 重點 | 建議優先級 |
|---|------|------|------------|
| 0a | S3 失敗頁 | 兩個按鈕難以分辨 | 已處理 |
| 0b | S3 失敗頁 | 文案不清楚；首個 scene 失敗應嘗試其他 scene | 已處理 |
| 1 | Board 03 展開卡片 | 22%、進度條、8 of 36 重複；進度指的是什麼不清楚 | 高 |
| 2 | Board 03 展開卡片 | 可參考 checklist 式介面，一眼看到各 scene 狀態（附 3 個 Mobbin 連結） | 中 |
| 3 | Board 01 收起的 pill | pill 最好顯示正在處理的 scene | 低至中 |
| 4 | Board 02 New scene 鎖定 | 淡化不明顯，與解鎖狀態幾乎看不出分別 | 中 |
| 5 | Board 04 Asset failed | 「scene failed」如何定義；共用 asset 失敗時是否所有 scene 都算失敗 | 高 |
| 6 | Board 04b 失敗展開 | 是否應彈出失敗清單供檢視及處理；匯入中或匯入出錯時 Asset Panel 能否開啟 | 中至高 |
| 7 | Board 08 Skip 之後 | 失敗 scene 會令經 waypoint 連接的其他 scene 無法到達 | 低（backlog） |
| 8 | Board 08 開發備註 | 不建議強制先修好全部問題才可 Play；後端應有規則 | 高 |

## 二、逐項分析

### 1. 展開卡片資訊重複（Board 03）

- UX 問題：「22%」「進度條」「8 of 36 assets ready」三者表達同一件事，視覺上太重。另外，22% 是「正在載入的 scene 所需的 asset」，還是「全部 assets」，用戶無法判斷。標題「Loading assets」與下方數字亦重複。
- 影響：用戶要花力氣讀同一個訊息三次，反而看不到真正有用的資訊（現在哪個 scene 在載入、還要多久）。
- 建議：只保留一個量度。因為 scene 是逐個載入，建議以「scenes」為單位：標題 + 一條進度條 + 一句「Now loading Kitchen Walkthrough」，拿走大字 %。若要保留數字，只留「8 of 36 scenes ready」。
- 優先級：高（改動小，效果最明顯）。
- 備註：Overview 寫標題為「Loading scenes」，但畫面是「Loading assets」，兩者不一致，改動時一併統一。
- 待確認：assets 與 scenes 的數量關係。目前畫面與 prototype 的 36 同時代表兩者，需要開發確認實際單位。

### 2. 以 checklist 顯示各 scene 狀態（Board 03）

- UX 問題：進度與 scene 的關係不明顯，用戶未必留意到下方 scene strip 哪一個正在載入。
- 影響：用戶不知道可以先打開哪個 scene，也不知道要等多久。
- 建議：展開卡片改為簡短清單，每行一個 scene：已完成（勾）、載入中（轉圈）、排隊中（鐘）、失敗（警告）。只列出「載入中、失敗及最近完成的幾個」，其餘收為「還有 24 個排隊中」，避免 36 行過長。失敗時這份清單可直接成為留言 6 所講的檢視清單，一份元件兩用。
- 優先級：中。
- 備註：留言附有 3 個 Mobbin 連結，我尚未打開檢視；若需要，可在決定方向後再比較。

### 3. Pill 顯示正在處理的 scene（Board 01）

- UX 問題：收起的 pill 只有「Loading 8/36」，看不到是哪個 scene。留言者也表示不方便可忽略。
- 影響：輕微。展開卡片已有此資訊。
- 建議：若空間允許，改為「Loading Kitchen Walkthrough · 9/36」，名稱過長時截斷並在 hover 顯示全名。不建議為此加闊 pill。
- 優先級：低至中。

### 4. New scene 鎖定狀態不明顯（Board 02）

- UX 問題：鎖定的 New scene 仍是紫色半透明，與解鎖狀態看起來差不多，用戶未必知道它不能按。
- 影響：用戶會嘗試點擊，之後才看到 tooltip，增加挫折感。
- 建議：鎖定時去除紫色底，改為中性灰底與較淡文字，與 Play、Save 的鎖定外觀一致；保留 hover 說明。此做法沿用 Library 既有的 disabled 狀態，不需新增 token。
- 優先級：中。

### 5. 「Scene 失敗」的定義（Board 04）

- UX 問題：目前畫面直接寫「2 scenes failed」，但沒有說明是 scene 本身（全景圖、影片）載入失敗，還是 scene 內某個元素使用的 asset 失敗。若同一個 asset 被 10 個 scene 使用，是 1 個失敗還是 10 個 scene 失敗，亦未定義。
- 影響：這個定義決定所有失敗畫面的字眼與數字（pill、卡片、失敗頁、Retry 的對象），也影響用戶能否「帶著問題繼續工作」。我最近畫的 S3b「All scenes failed」亦依賴此定義。
- 建議：分兩級處理，並向開發確認。
  - 第一級：scene 本身無法載入（全景圖或影片）。該 scene 不能打開，顯示「Couldn’t load」。
  - 第二級：scene 內的 asset 載入失敗。scene 仍可打開，缺失元素以「Missing」佔位顯示，沿用檔案內既有的 Asset Panel（Missing Asset）與 Missing List 設計。
  - 共用 asset 失敗時，按「檔案」計數並註明影響範圍，例如「1 file failed · used in 10 scenes」，而不是顯示「10 scenes failed」。
- 優先級：高（需先決定，否則其他失敗相關畫面無法定稿）。
- 假設待驗證：以上兩級分法是我的建議，開發端是否能區分這兩種失敗，尚未確認。

### 6. 失敗清單與 Asset Panel（Board 04b）

- UX 問題：目前只顯示「2 scenes timed out」與 Retry、Skip，沒有讓用戶檢視是哪些檔案、可以做什麼。留言者提到 Adobe 開啟專案有問題時會列出清單。另外，匯入進行中或匯入出錯時，Asset Panel 能否開啟、開啟後顯示什麼，沒有定義。
- 影響：用戶不知道要修正什麼，只能盲目 Retry 或 Skip。
- 建議：
  - 失敗卡片加入「Review」入口，打開失敗清單：檔案名稱、影響的 scene 數目、每行操作 Retry、Replace、Remove。
  - 清單與留言 2 的 checklist 共用同一個元件。
  - Asset Panel 在載入或匯入出錯時照常可開啟，失敗項目置頂並標示，沿用 Missing Asset 設計；匯入進行中則以該項目的進度狀態顯示。
- 優先級：中至高。
- 假設待驗證：Asset Panel 在載入期間是否技術上可開啟，需要與開發確認。

### 7. 失敗 scene 與 waypoint 連接（Board 08）

- UX 問題：某 scene 失敗後，若 360 tour 經它連接其他 scene，那些 scene 可能無法到達。
- 影響：用戶可能不知道哪些 scene 因此無法在 Play 時到達。屬於進階情境。
- 建議：本輪不做。留言者亦表示後端已有函數可檢查 scene 是否能經 waypoint 到達，日後可以在失敗清單中加上「Unreachable from start」標示。先放入 backlog，並把這一點記錄給開發。
- 優先級：低（backlog）。

### 8. Skip 之後是否鎖定 Play、Edit、Save（Board 08）

- UX 問題：目前設計是 Skip for now 之後，Play、Edit、Save 仍全部鎖定，直到失敗的 scene 載入或被移除。留言者不傾向以鎖定 Play 來強迫用戶先修好所有問題，並認為後端應該有規則處理壞掉的 scene 或 asset。
- 影響：用戶即使只想播放其餘正常的 scene，也被阻擋，與「讓用戶帶著問題繼續工作」的方向相反。
- 建議：
  - 載入進行中維持鎖定（內容未齊，播放或儲存會不完整）。
  - 載入結束後，即使仍有失敗項目，也允許 Play、Edit、Save，並在 header 或卡片顯示可關閉的提示，例如「2 scenes will be skipped」。
  - Play 時對失敗 scene 的處理（跳過、顯示佔位）需開發定義規則，再寫入開發備註。
  - Save 會否因缺失檔案而遺失引用，需開發確認。
- 優先級：高（會改動 Board 08 及其開發備註，並影響 S3b 之後的行為）。

## 三、建議的處理順序

1. 先與開發確認三件事：
   - 失敗的定義與計數單位（留言 5）。
   - 後端對壞掉 scene 或 asset 的 Play、Save 規則（留言 8）。
   - 載入期間 Asset Panel 是否可開啟（留言 6）。
2. 設計端可先做、不依賴開發的改動：去除重複資訊（1）、New scene 鎖定外觀（4）、pill 顯示 scene 名稱（3）。
3. 開發答覆後再做：失敗清單與 checklist（2、6）、解除 Play 鎖定（8）。
4. Backlog：waypoint 連接提示（7）。

## 四、給開發的問題（可直接轉貼）

1. 載入失敗的單位是什麼：scene 本身，還是 scene 內的 asset？能否區分兩種？
2. 一個 asset 被多個 scene 使用而載入失敗，是否所有使用它的 scene 都視為失敗？
3. 部分 scene 或 asset 失敗時，Play 如何處理？Save 會否保留對缺失檔案的引用？
4. 載入或匯入進行中、或出錯時，Asset Panel 能否開啟？
5. 載入進度的單位是 scene 還是 asset？目前畫面的 36 是哪一個？
6. 後端用來檢查 scene 能否經 waypoint 到達的函數，能否在載入完成後提供結果？
