# AI Provider：整體間距與文字層級優化計劃

日期：2026-11-24　範圍：只限 AI Provider　狀態：待 Alan 確認，尚未改動 Figma

## 一、診斷（以 Figma 實測數字為據）

| 問題 | 現況 | 影響 |
| :-- | :-- | :-- |
| 欄位組與組之間的距離太小 | 表單 Content gap = 8，與「標籤到輸入框」的 gap 8 相同（Custom provider：Name、Base URL、API key、Model name 之間） | 分不清哪個標籤屬於哪個輸入框，整頁黏成一團 |
| Add a provider 的提示行貼住下一區 | 「Icons under each name…」那行與 API key 區只隔 8；Pick 區內部 gap 12 | 三個層級（選 provider、說明、API key）擠在一起 |
| 對話框內距偏小 | Body padding 20、Header 48、Footer 52 | 內容貼邊，與 Header／Footer 缺少呼吸空間 |
| 文字層級過於接近 | 標題 16 Bold、標籤 14 Bold、說明 14 Regular、輸入文字 14 Regular、輔助字 12 Regular；除標題外全部 14 或 12 | 只靠粗細區分，掃讀時看不出主次 |
| 輔助字與所屬欄位距離和其他欄位一樣遠 | Helper 與輸入框 gap 8，與下一組距離接近 | 輔助字像「另一組」而非附屬說明 |
| 說明文字重複 | 「Icons under each name show what it can do. Gemini: …」與圖示本身重複 | 多一行噪音，且是最長的一行 |
| 底部按鈕偏小 | Footer 按鈕 Small 28 高、12px 字 | 在 14px 內容旁顯得細小，不易點擊 |

## 二、優化方案（只用現有 Library 元件和 token，不新增 token）

間距（8px 網格，沿用 spacing/8、12、16、20、24）
1. 組與組之間 gap：8 → 20；標籤到輸入框維持 8。這是最大的單一改善。
2. 輔助字貼近所屬輸入框：Helper 與輸入框的距離縮至 4（用負 gap 或把 Helper 放進同一組並設 gap 4），讓它明顯屬於上方欄位。
3. Body padding 20 → 24；Header 48 → 56、左側 padding 對齊 24；Footer padding 12/20 → 16/24。
4. Provider tile 內距 12 → 16、圖示到名稱 8 → 12。
5. 視窗仍為 960x640；最長的 Custom provider 增加約 40px 高度（528 → 約 570），仍在 640 內，不需內部捲動。

文字層級（只用現有 text style 與 text token）
1. 標題 16 Bold（維持）→ 區段標籤 14 Bold → 欄位標籤 14 Bold → 輸入文字 14 Regular → 說明 14 Regular（text/secondary）→ 輔助字 12 Regular（text/secondary）→ Optional 12（text/subtle，只用於非重要字）。
2. 「說明句」（Pick a provider and a saved key…）固定使用次要文字色，與欄位標籤拉開對比，距離第一個區段 20。
3. 文字基線對齊：標籤列（標籤 + Optional）、Key 列（標題 + 連結）統一 baseline。
4. 圖示與文字：icon 與相鄰文字 gap 統一 8（目前混用 4 與 8）。

資訊密度
1. 刪除 Add a provider 內的「Icons under each name…」整行；能力以 tooltip 顯示（每個圖示已有）。
2. 只在選中 provider 時，tile 內保留能力圖示；其他說明移到 tooltip。
3. 「Saved on this computer. Leave empty if no key is needed.」保留，但縮為一行（已是一行）。
4. 空狀態「No Gemini keys here yet」改為更低的虛線框（高度 64 → 56），避免搶過 tile 的視覺重量。

按鈕與列高
1. Footer 按鈕 Small 28 → Medium 36（14px 字），Footer 高度 52 → 68。
2. 列表列（Provider 卡片、AI keys 列）：行內間距 16 維持，垂直 padding 12 → 16，標題與副標題 gap 4 → 4（維持），能力圖示列與狀態行 gap 8。
3. 列表分組之間 24，標題區與列表 16。

## 三、前後對比（prototype 套用建議規則後的實際畫面）

- Add a provider：[20261124-plan-addprov-compare.png](/mnt/project-files/reports/20261124-plan-addprov-compare.png)
- Add a custom provider：[20261124-plan-custom-compare.png](/mnt/project-files/reports/20261124-plan-custom-compare.png)
- Add an AI key：[20261124-plan-addkey-compare.png](/mnt/project-files/reports/20261124-plan-addkey-compare.png)

說明：Provider 卡片與 AI keys 列表的對比尚未製作，建議在確認方向後於 Figma 先做一張再比較。

## 四、優先次序、改動範圍與工作量

| 優先 | 項目 | 範圍 | 工作量 |
| :-- | :-- | :-- | :-- |
| P1 | 組間距 8 → 20、Body padding 24、Footer／Header 內距 | 對話框 Body／Content 的 auto layout 參數，約 40 個對話框畫面；多為同一結構，可批次 | 中（約半天，批次腳本） |
| P1 | 刪除重複說明行、輔助字貼近欄位 | 逐畫面調整（Add provider 約 5 個、Custom 約 8 個、Key 對話框約 6 個） | 小至中 |
| P2 | Footer 按鈕改 Medium 36 | 對話框 Footer 內按鈕實例，換 Size 屬性；屬 Library 現有尺寸，不是新元件 | 小 |
| P2 | Provider tile 內距與圖示間距 | Add provider 5 個畫面（tile 為本檔案內元件） | 小 |
| P3 | 列表列垂直 padding、分組間距 | Providers／AI keys 約 36 個列表畫面（Key list 與背景版本） | 中 |
| P3 | 文字 baseline 與 icon gap 統一檢查 | 全部畫面的自查 | 小 |

共用元件改動 vs 單畫面改動
- 共用（改一處全部跟隨）：Dialog 範本的 Body／Footer 內距、Provider tile、Key list 列。這些在本檔案內，可改一次並重新套用，不影響 XRCC Library。
- Library 層：沒有需要新增或修改的項目（Medium 按鈕為現有尺寸）。
- 單畫面：Add provider 的說明行刪除、輔助字位置、空狀態高度。

## 五、風險與需要 Alan 確認

1. 說明行刪除後，新用戶要靠 tooltip 才知道各 provider 支援的功能：同意刪除，還是改成只在選中 provider 時顯示一行？
2. Footer 按鈕改為 Medium 36 是否接受（之前部分畫面已是 Medium，現統一）？
3. 對話框內距 20 → 24 會使所有對話框變高約 8–40px；是否接受？
4. 執行順序：Figma 先改（含自查、Annotation、更新變更記錄），再讓 prototype 與網站跟隨。
