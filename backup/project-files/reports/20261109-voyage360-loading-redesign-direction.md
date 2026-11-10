# Voyage 360 Loading Enhancement：整體重新設計方向

日期：2026-11-09
狀態：只作研究與提案，Figma 與 prototype 均未改動。承接[留言背後的真正問題](20261109-voyage360-loading-comments-root-causes.md)，本文在閱讀檔內其他畫面後，把方案由「逐則修補」升級為整體設計。
已定案：進度單位為 assets（所有 scene 內的圖片、圖示、音訊、waypoint、影片等）。

## 一、研究：Voyage 360 其他畫面告訴我們什麼

已閱讀：Open project flow、Scene Panel、Asset Panel（含 Missing Asset、Locked Asset、Online）、360 overall UI（選單與 Play 下拉）、Home Page、Play Saved Sequence Handling、Unhappy Flow，以及 Loading Enhancement 頁現有的全部畫面與元件。

1. 產品本質：這是 360 tour 編輯器。一個 project 由多個 scene（360 圖片或影片）組成，每個 scene 內有 element（Video、Text、Info、Image、Audio、Waypoint），element 引用 Asset Panel 內的檔案（Local 或 Online）。所以「36 個 assets」是 scene 與 element 引用的檔案總數，用戶的心智模型卻是「scene」。
2. 底部 Scene strip 已經是 scene 清單：每個 scene 有縮圖與編號，hover 有改名與刪除，最多顯示 10 個再捲動，旁邊是 New scene。留言 2 想要的 checklist，現成最自然的位置就是這條 strip，不必另建清單。
3. 「Play」下拉已有「Play from current scene」：這是漸進可用的天然入口。當前 scene 的 assets 齊了，就可以播放該 scene，不必等全部載入。
4. 「鎖定」已有一套語言：Locked Asset 畫面用鎖頭圖示加 hover 說明「Used in a saved sequence」，並阻止刪除。載入期間的鎖定應沿用同一語言，而不是另創一套。
5. 「缺失」已有一套處理：Unhappy Flow 表格已定義缺失 element 的處理（預防用鎖頭、操作前提示、Sequence 模式出現 Recover List Panel，提供 Continue 與 Recover as a new sequence）。失敗清單其實已有前例，不需要新發明。
6. 各畫面表達風格一致：深色面板、紫色主操作、紅色刪除與警告、細字說明。現有 Loading 畫面（Card、Pill、Thumb）方向正確，但資訊層次偏重，且與以上既有模式未連結。

## 二、整體設計原則

1. 載入是背景工作，不是一個要用戶等待的「畫面」：越早讓用戶開始工作越好。
2. 以 scene 為單位呈現，以 assets 為單位計量：用戶看到的是 scene 的狀態，進度數字顯示 assets。
3. 只在有需要時提高存在感：平時安靜（pill），出事或完成才引起注意。
4. 失敗要可處理：沿用既有的「缺失」模式，錯誤出現在用戶處理它的地方（scene strip、Asset Panel、scene 內的 element）。
5. 只鎖技術上真的做不到的事，並說明何時解鎖。

## 三、提案

### 3.1 Scene strip 成為主角（回應留言 2、3）

- 每個 scene 縮圖有四種狀態：Ready、Loading（轉圈加該 scene 的 asset 進度，例如 12/14）、Queued（暗淡加時鐘）、Failed（警告加缺失數）。現有 Loading Scene Thumb 元件已有這四種，需加上 asset 進度。
- 當前載入的 scene 以細進度環或底線標示，用戶一眼看到「哪個 scene 在載入」，留言 3（pill 顯示 scene 名稱）因此不必再做。
- 不新增獨立 checklist 元件。

### 3.2 一個更小的進度卡（回應留言 1）

- 展開卡片只放：標題、一條進度條、「8 of 36 assets ready」、一句「你現在可以做什麼」，例如「Kitchen Walkthrough is ready. You can start editing it.」。刪除 22%。
- 收起的 pill 以狀態為先：載入中（進度）、有問題（紅色加數量）、完成（短暫顯示「All assets ready」後自動消失）。

### 3.3 漸進解鎖（回應留言 4、8）

- 規則：某個 scene 的 assets 齊了，該 scene 即可 Edit 與「Play from current scene」。全部完成前，「Play」整個專案與「Save」維持鎖定，因為內容尚未齊全。
- 全部載入結束後，不論有無失敗，Play、Edit、Save 一律開放；有失敗時 header 顯示可關閉提示「2 assets are missing」。
- 鎖定外觀統一：停用顏色、鎖頭圖示、hover 說明原因與解鎖條件。New scene 套用同一規則（是否真的需要鎖定待開發確認）。

### 3.4 失敗與復原（回應留言 5、6、7）

- 失敗單位為檔案，註明影響範圍：「1 file missing · used in 10 scenes」。
- 失敗 scene 縮圖顯示警告與缺失數；scene 內缺失的 element 顯示 Missing 佔位。
- 失敗卡片的「Review」打開一個小面板，沿用 Recover List Panel 的樣式，列出缺失檔案、受影響的 scene 數、操作 Retry、Replace、Remove；「Replace」直接帶到 Asset Panel 並篩選 Missing。不新建整頁畫面。
- Asset Panel 在載入與出錯時可開啟：載入中的項目顯示進度，失敗的項目置頂。
- waypoint 可達性：維持 backlog，日後在 scene strip 加「Unreachable」標示。

### 3.5 開啟 project 的畫面（S1 至 S3b）

- 維持最簡：只在第一個 scene 未載入前顯示全螢幕載入；第一個 scene 可用即進入編輯器。
- 「Trying scene 2 of 36」「All 36 scenes failed」改為與 asset 單位一致的說法。

## 四、對現有畫面的影響

| 畫面 | 改動 |
|------|------|
| Board 01、02、07（收起 pill） | pill 狀態化；Scene strip 縮圖加 asset 進度 |
| Board 03（展開卡片） | 精簡為單一進度加可用提示 |
| Board 04、04b（失敗） | 失敗改以檔案計；Review 改為小面板 |
| Board 06（全部完成） | 完成提示短暫顯示後消失 |
| Board 08、08b（Skip 之後） | 載入結束即解鎖；08b 改為「帶著缺失檔案播放」的提示 |
| 新增 | 載入中「Play from current scene」可用的狀態；Review 小面板；Asset Panel 載入與出錯狀態 |
| 元件 | Loading Scene Thumb 加進度；Loading Card、Pill 重做；新增 Scene Card 的 Locked variant；新增 Review 面板 |

## 五、需要先確認

向開發：
1. 某個 scene 的 assets 齊了，能否先讓它可編輯與可播放？（整個方案的關鍵）
2. 失敗的單位與共用檔案的影響範圍。
3. 載入與出錯時 Asset Panel 能否開啟。
4. 載入期間新增 scene 是否必須鎖定。
5. 部分失敗時 Play 與 Save 的行為（Save 是否保留對缺失檔案的引用）。
6. 後端的 waypoint 可達性函數能否提供結果。

向你：
- 是否同意以上整體方向（特別是「不新建清單、以 Scene strip 作清單」與「漸進解鎖」）？
- 元件來源：Loading Card、Pill、Thumb 在本頁 Components 區有本地副本，但畫面上的 instance 連到遠端主元件。我需要你確認以哪一份為準，或給我來源檔案連結，否則改動不會同步到畫面。
- Mobbin 三個連結請貼圖。
