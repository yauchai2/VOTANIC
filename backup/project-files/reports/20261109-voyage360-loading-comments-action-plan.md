# Voyage 360 Loading Enhancement：留言修改詳細規劃

日期：2026-11-09
依據：[留言檢討報告](20261109-voyage360-loading-comments-review.md)
狀態：只作規劃，尚未改動 Figma 與 prototype。

## 零、先決條件與需要你決定的事

### 0.1 元件來源（影響所有改動的做法）

- Loading Card、Loading Pill、Loading Scene Thumb 是「遠端」元件，來源為 Library「Voyage 360 UI-PC+VR」，今日 07:10 剛有更新。它們不能在目前檔案內直接改，必須到來源檔案修改、發佈，再在本檔 Update library。
- 我目前不知道來源檔案的 file key。執行前需要你提供該檔連結（或確認來源就是另一份 Voyage 元件檔）。
- Scene Card（含 Add New Scene）是本檔內的本地元件（78 個 instance），可直接加 variant。
- 沒有發佈權限的步驟（Publish、Update library）只能由你操作，我會在每個階段完成時列明。

### 0.2 需要你決定（建議答案附在後面）

| # | 決定 | 我的建議 |
|---|------|----------|
| D1 | 進度單位用 scenes 還是 assets | **已決定（Alan，2026-11-09）：用 assets。36 指所有 scene 內的 assets（圖片、圖示、音訊、waypoint、影片等）。標題維持「Loading assets」，數字行為「8 of 36 assets ready」。** 連帶需檢查 S3、S3b 及 prototype 中把 36 當作 scenes 的字眼（例如「Trying scene 2 of 36」「All 36 scenes failed」），改為與 assets 一致。 |
| D2 | Skip for now 之後是否解除 Play、Edit、Save 鎖定 | 解除，並顯示可關閉的提示 |
| D3 | 失敗清單是否本輪就做 | 做，但放在階段二，等開發答覆後才定稿 |
| D4 | Mobbin 三個參考連結是否由我先檢視再設計 checklist | 是，階段二開始前先看 |
| D5 | 階段一三項改動是否可先做 | 可以，不依賴開發 |

### 0.3 需要向開發確認（階段二的前提）

1. 載入失敗的單位：scene 本身，還是 scene 內的 asset？能否區分？
2. 共用 asset 失敗，是否所有使用它的 scene 都視為失敗？
3. 部分失敗時 Play 的處理方式，以及 Save 是否保留對缺失檔案的引用。
4. 載入或匯入期間，Asset Panel 能否開啟。
5. 進度單位是 scene 還是 asset。
6. waypoint 可達性檢查函數能否在載入完成後提供結果（backlog 用）。

## 一、階段一：不依賴開發，可立即進行

### A1. 展開卡片去除重複資訊（留言 1）

影響範圍：Loading Card（遠端元件），用在 Board 03（Loading 狀態）及 Board 04b（Failed 狀態），共 2 個 instance。

步驟：
1. 在來源檔案打開 Loading Card 元件組，兩個 State（Loading、Failed）都要改。
2. Loading 狀態：
   - 刪除大字「22%」。
   - 標題維持「Loading assets」（依 D1，單位為 assets；Overview 原文的「Loading scenes」改為「Loading assets」以統一）。
   - 數字行維持「8 of 36 assets ready」，靠右移到標題同一行，或放在進度條上方左側，二選一；我會各做一版比較後選用較簡潔者。
   - 進度條保留，作為唯一的視覺進度。
   - 「Now loading Kitchen Walkthrough」保留，並移到進度條下方，作為這張卡片最有價值的資訊。
3. Failed 狀態：同樣刪除 %，數字行改為「34 of 36 scenes ready」，其餘紅色說明框與按鈕不變（按鈕之後在階段二調整）。
4. 所有文字用 Auto Layout 基線對齊（數字與單位同行時），顏色綁定既有 token，不新增 token。
5. 發佈 Library。你在本檔 Update library 後，我檢查 Board 03、04b 的 instance 是否保留文字覆寫。

連帶更新：
- Overview 文字「A clearer progress card：32px count, 8px bar…」需改寫。
- Board 03、04b 的 annotation 若有提及百分比，需同步修改。
- 網頁 prototype（PR #8）的 `renderLoader` 與 `updateLoaderLive` 移除 `#cPct`，並改文案。

驗收：卡片上只出現一個進度數字與一條進度條；沒有任何與其重複的文字。

### A2. Pill 顯示正在載入的 scene（留言 3）

影響範圍：Loading Pill（遠端元件），Loading 狀態共 3 個 instance（Board 01、02、07）。Failed 狀態不改。

步驟：
1. 在來源檔案的 Loading Pill 的 Loading variant 加入 scene 名稱文字：「Loading Kitchen Walkthrough · 8/36 assets」（依 D1，數字單位為 assets，scene 名稱只說明目前載入的位置）。
2. 名稱過長時截斷（最多約 18 個字元），pill 寬度維持不超過現時 297 的 1.3 倍；超出時只顯示「Loading Scene 9 · 9/36」。
3. 在 hover 時以 tooltip 顯示完整名稱（沿用 XRCC New Tooltips 元件）。
4. 迷你進度條保留。
5. 發佈後檢查三個 instance 的位置，確保沒有遮擋 scene strip 或頂部選單。

連帶更新：網頁 prototype 的 `pillTxt`。

驗收：pill 一眼看到正在載入哪個 scene；過長名稱不會撐破版面。

### A3. New scene 鎖定狀態（留言 4）

影響範圍：Scene Card 元件組中的「Add New Scene」variant（本地元件，9 個 instance）。

步驟：
1. 查看現有「Add New Scene」的外觀與使用位置，確認哪些 board 為鎖定狀態（Board 01、02、03、04、07、04b，以及 08、08b 之後視 D2 而定）。
2. 在 Scene Card 元件組新增 variant「Add New Scene · Locked」（Property 1 加一個值，屬增補，不影響現有 instance）。
3. 外觀：去除紫色底，改為 Library 既有的 disabled 填色與較淡文字及圖示，邊框為虛線或無邊框，與 Play、Save 鎖定外觀一致。
4. 圖示顏色綁定與相鄰文字相同的 token，換圖示後重新綁定。
5. 把鎖定的 board 上的 instance 改為 Locked variant；hover 時既有的 tooltip 與 prototype 不變。
6. 不新增 token；若找不到合適的 disabled token，列出缺口讓你決定，不自行新增。

驗收：鎖定與解鎖並排比較，一眼可分辨。

## 二、階段二：等開發答覆後進行

### B1. 統一「失敗」的定義與字眼（留言 5）

在開發答覆後，按以下兩級統一所有畫面的用字。若開發答覆與我的建議不同，則按答覆調整。

- 第一級（scene 本身失敗）：scene 不能打開，卡片顯示「Couldn’t load」。
- 第二級（scene 內 asset 失敗）：scene 可打開，缺失元素顯示「Missing」佔位，沿用檔案內既有的 Asset Panel（Missing Asset）。
- 共用 asset 失敗：以檔案計數，顯示「1 file failed · used in 10 scenes」。

需要檢查並更新的位置：
- Loading Pill（Failed 狀態）：「2 scenes failed」→ 按定義改為「2 files failed」或「2 scenes failed」。
- Loading Card（Failed 狀態）標題及說明框。
- Board 04、04b、08、08b 的 annotation 與右側備註卡片。
- S3b：「All 36 scenes failed to load」需確認是否仍成立。
- 網頁 prototype 的 `footerText`、`updateTips` 及 `renderLoader` 失敗分支。

### B2. 失敗清單及 checklist（留言 2、6）

先決條件：D4（先看 Mobbin 三個連結）與開發答覆 1、2、4。

新增元件（放在來源檔案的 Components 頁，因為是此功能專用，不放進共用 XRCC Library）：
- 「Loading List Row」：縮圖（或圖示）、scene 或檔案名稱、狀態圖示、右側操作。狀態有 Ready、Loading、Queued、Failed。圖示用 1px 線條，16px。
- 「Loading List」：由多個 row 組成，只列「載入中、失敗、最近完成」，其餘折疊為「+24 queued」。
- 操作按鈕使用 XRCC Button Small（28）：Retry 用 Tertiary，Replace 用 Secondary，Remove 用 Tertiary；Cancel 一律 Tertiary。
- 先檢視現有「Missing List」元件，能重用則重用，不重複造。

新增畫面（放在 Section 3，位置接在 04b 之後，沿用 480 間距）：
- Board 04c「Review failed files」：點擊 04b 卡片的「Review」開啟；清單顯示失敗項目與影響的 scene 數目。
- Board 04d「Asset Panel · import error」：複製現有 Asset Panel（Missing Asset）畫面，刪除不相關的 annotation（依你的規則），失敗項目置頂。
- 展開卡片（Board 03）加入清單展開狀態，如決定採用 checklist。

Prototype 連結：
- 04b「Review」→ 04c；04c「Back」（Tertiary）→ 04b；04c「Retry」→ Board 01；04c「Replace」→ 04d；Close、Cancel、Back 一律返回上一層。
- Flow line、標籤、Legend 同步新增。

### B3. 解除 Skip 之後的鎖定（留言 8，需 D2）

影響範圍：Section 4（Board 08、08b）、Board 04b 的說明文字、相關 annotation 與開發備註。

步驟：
1. Board 08：Play 與 Save 改為可用外觀；header 加入可關閉的提示「2 scenes will be skipped」（沿用 alert 元件，不自建）。
2. Board 08b「Hover on locked Play (after skip)」：因為不再鎖定，此畫面不再成立。改為「Click Play with skipped scenes」，顯示提示或確認；若你決定不要，則刪除並移除對應 flow line、標籤與 prototype 連結。
3. Board 04b 說明框「Play, Edit and Save stay locked until they load」改為只在載入進行中才鎖定的版本。
4. 改寫右側「Development」備註：載入進行中鎖定；載入結束後，失敗項目不阻擋 Play、Edit、Save；Play 對失敗 scene 的處理按開發規則（待回覆）。
5. 網頁 prototype：`renderAll` 的 lock 判斷、footer 與 tooltip 文案同步調整。

## 三、階段三：backlog

- 失敗 scene 令 waypoint 連接的其他 scene 無法到達（留言 7）：本輪不做，只在開發備註記錄後端已有可達性檢查函數，日後在失敗清單加「Unreachable」標示。

## 四、執行順序與估算

| 順序 | 內容 | 規模 | 前提 |
|------|------|------|------|
| 1 | 取得元件來源檔案連結 | 極小 | 你提供 |
| 2 | A1、A2（同一次在來源檔案修改） | 中 | 步驟 1 |
| 3 | A3（本檔） | 小 | 無 |
| 4 | 網頁 prototype 同步 A1 至 A3 | 小 | 步驟 2、3 |
| 5 | 你 Publish 並在本檔 Update library | — | 步驟 2 |
| 6 | 自查（見第五節）、記入 change log | 小 | 步驟 2 至 5 |
| 7 | 向開發發出問題清單 | — | 你 |
| 8 | B1（用字統一） | 小至中 | 開發答覆 |
| 9 | B3（解除鎖定） | 中 | D2、開發答覆 |
| 10 | B2（失敗清單與 Asset Panel 畫面） | 大 | D4、開發答覆 |

## 五、每階段完成後的自查清單

依你的既有規則，每次修改後我會自動檢查，不等你提出：
- Prototype 連結：沒有指向已刪除或不存在的畫面；hover 與點擊連結齊全；Close、Cancel、Back 回上一層。
- Annotation：刪除與該畫面無關的、重寫過時的；使用繁體中文書面語，只在必要時夾英文。
- Flow line、標籤、Legend、Overview：與畫面一致。
- Token：掃描未綁定的填色、間距、圓角與字型；不新增 token，缺口列出讓你決定。
- 文字基線對齊；icon 顏色綁定與相鄰文字相同的 token，每個狀態截圖確認。
- 每個狀態與 hover 狀態截圖檢查，只做 Dark，固定 1920x1080，不做響應式。
- 記入 /mnt/project-files/design-system/20261008-library-change-log.md，並提醒你需要 Publish 與 Update library 的項目。

## 六、風險

- 遠端元件改動會影響所有使用它們的檔案或畫面；發佈前我會列出受影響的 instance 數目。
- 來源檔案若有他人同時編輯，發佈可能衝突；建議執行前先與團隊確認。
- 階段二的畫面依賴開發答覆，若答覆與建議相反（例如不能區分兩級失敗），清單設計需要簡化。
- Figma 預覽圖偶爾顯示舊內容，我會以節點資料及重新截圖雙重確認。
