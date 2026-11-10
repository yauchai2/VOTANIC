# Voyage 360 Loading Enhancement：留言背後的真正問題與修訂方案

日期：2026-11-09
狀態：只作分析與規劃，Figma 與 prototype 均未改動。本文取代[詳細規劃](20261109-voyage360-loading-comments-action-plan.md)中「做什麼」的部分，執行細節仍可參考原文。
已定案：進度單位為 assets（所有 scene 內的圖片、圖示、音訊、waypoint、影片等）。

## 一、核心問題

載入發生在編輯器內，用戶想盡快開始工作。整個載入體驗只需回答四個問題：

1. 現在有沒有事情在進行，還要多久？
2. 我現在可以做什麼，不可以做什麼，為什麼？
3. 有沒有出問題，對我有什麼影響？
4. 如果出問題，我可以怎樣處理？

八則留言其實都是在指出：某一個問題沒有被答好。逐則整理如下。

## 二、逐則：表面需求、真正問題、修訂方案

| # | 表面需求 | 真正問題 | 修訂方案 |
|---|----------|----------|----------|
| 1 | 去掉重複的 22%、進度條、8 of 36 | 卡片只重複說「有多少」，沒回答「還要多久」「能做什麼」。單位不清也令數字無意義 | 一個數字（assets）加一條進度條；把空間讓給「現在可以做什麼」：已載入完成的 scene 可先使用，其餘顯示等待原因 |
| 2 | 用 checklist 顯示各 scene 狀態 | 用戶要的是「哪個 scene 已經可以用」。36 個 asset 逐行列出粒度太細，沒有意義 | 清單以 scene 為行，行內顯示該 scene 的 asset 進度（例如 Kitchen Walkthrough 12/14）。總進度仍以 assets 計，兩者不衝突 |
| 3 | pill 顯示正在載入的 scene | 收起狀態的任務是「一眼知道要不要理會」。scene 名稱價值低，真正重要的是有沒有出事、是否完成 | 降級。pill 以狀態為先：載入中、完成、有問題（顏色與圖示不同）。scene 名稱只放 hover，不加闊 pill |
| 4 | New scene 鎖定要更明顯 | 用戶不明白為何不能按、何時可按。只改外觀仍要點了才知道 | 統一一套「鎖定」語言：外觀停用，hover 說明原因與解鎖條件（例如「Available when assets finish loading · 8/36」）。同時向開發確認載入期間新增 scene 是否真的必須鎖定 |
| 5 | 定義「scene failed」 | 用戶要知道失敗的後果：哪些 scene 受影響、能否繼續 | 以「失敗的檔案」為單位，註明影響範圍，例如「1 file failed · used in 10 scenes」，並說明受影響的 scene 仍可打開，缺失的檔案以佔位顯示 |
| 6 | 彈出失敗清單；Asset Panel 能否開啟 | 用戶要的是「處理」的路徑。已有 Asset Panel（Missing Asset）專門處理資產，另起一個清單會變成兩個地方管理同一件事 | 不新建獨立清單。失敗卡片的「Review」直接打開 Asset Panel，並預設篩選「Failed」，失敗項置頂，操作為 Retry、Replace、Remove。省去新元件與 04c 畫面 |
| 7 | waypoint 令其他 scene 無法到達 | 用戶不知道 tour 因失敗而斷開 | 維持 backlog。記錄給開發：待後端可達性檢查可用後，在 Asset Panel 或 scene strip 加「Unreachable」標示 |
| 8 | 不要鎖住 Play 逼用戶先修好 | 載入問題不應阻擋工作。只應阻擋技術上不可行的操作 | 原則：只鎖載入進行中尚未就緒的內容；載入結束後一律開放。對失敗項的 Play、Save 行為由開發定義，設計只顯示可關閉的提示 |

## 三、跨留言的共通修正

1. 單位統一：所有畫面的 36 都指 assets。現時 S3 的「Trying scene 2 of 36」、S3b 的「All 36 scenes failed」需要改寫，避免 scene 與 asset 混用。
2. 「進度」改為逐步可用：理想狀態是某個 scene 的 assets 齊了就可打開，不必等全部完成。這是留言 1、2、8 的共同根源，需要向開發確認技術上是否可行。若可行，Play、Edit 的鎖定可按 scene 逐步解除，比整體鎖定好得多。
3. 鎖定、失敗、完成三種狀態使用同一套視覺語言（顏色、圖示、說明格式），在 pill、卡片、Asset Panel、按鈕上一致。

## 四、修訂後的執行順序

階段一（不依賴開發，可立即做）：
- A1'：展開卡片：單一進度（assets）加「現在可以做什麼」一行；刪除重複的 22%。
- A3'：鎖定語言：Add New Scene 的 Locked variant，加上說明原因與解鎖條件的 tooltip，Play、Save 同步。
- A2'：pill 狀態化（載入中、完成、有問題），scene 名稱放 hover。優先級低於 A1'、A3'。

階段二（等開發答覆）：
- B1：失敗以檔案為單位的字眼統一，並修正 S3、S3b 的單位字眼。
- B2'：「Review」打開 Asset Panel（篩選 Failed），不再新建清單元件與 04c、04d 畫面。若 Asset Panel 在載入期間不能開啟，才退回新建簡化清單。
- B3：載入結束後解除 Play、Edit、Save 鎖定，加可關閉提示。
- B4（取決於開發）：scene 逐步可用的鎖定規則與 scene 列表。

階段三（backlog）：waypoint 可達性。

## 五、需要向開發確認（按影響排序）

1. 能否在某個 scene 的 assets 齊了之後就讓它先可用？（決定留言 1、2、8 的方案深度）
2. 失敗的單位是 asset 還是 scene？共用 asset 失敗是否影響所有使用它的 scene？
3. 載入期間與出錯時，Asset Panel 能否開啟？
4. 載入期間新增 scene 是否必須鎖定？
5. 部分失敗時 Play 如何處理？Save 會否保留對缺失檔案的引用？
6. 後端的 waypoint 可達性函數能否在載入完成後提供結果？

## 六、需要你決定

- D2：載入結束後即使仍有失敗項，是否一律開放 Play、Edit、Save？建議：是。
- D6：失敗處理是否改為重用 Asset Panel，不新建清單？建議：是。
- D7：pill 是否降級為狀態化、scene 名稱只放 hover？建議：是。
- 仍需要 Loading Card、Pill、Thumb 的來源檔案連結，才能開始階段一。
- Mobbin 三個連結我未能打開，請貼圖或存入收藏。
