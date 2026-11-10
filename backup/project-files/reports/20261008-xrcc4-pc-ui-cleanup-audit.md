# ⭐20251125_XRCC4.0_PC_UI 清理清查報告

檔案 key:`7SMhpQ4IVhnlA6G6wfwAgO`
日期:2026-10-08
狀態:**只讀清查完成,未刪除任何嘢。** 等 Alan 批准後先會動手。

## 檔案概況

- 16 個 page、約 9 萬個 layer(Components 37k、Old UI 18.5k、XRCC UI 4.0 19k instances、UI Part 02 21k instances)。
- Local styles:25 個 text style、10 個 effect style;冇 paint style、冇 variable。(屬設計系統,唔建議郁。)
- 掃描方法:逐頁讀取 top-level、隱藏 layer、空 frame/group、預設命名 layer、命名帶 old/test/不需要 嘅 section。Instance 內部 layer(ID 以 `I` 開頭)唔計入刪除建議,因為刪唔到。

## A. 高信心:建議刪除(風險低)

| # | 位置(page) | 名稱 / ID | 理由 |
|---|---|---|---|
| ~~A1~~ | ~~Memes(整頁)~~ | ~~page `4071:365628`~~ | **更正:唔係空頁**,內有 19 個 meme frame(第一次清查頁面未載入,誤讀為 0)。已取消,未刪 |
| A2 | Item Tag UI | section「Old/ not need」`4071:293939`(47 個子層,2247×2591) | 命名已寫明唔需要 |
| A3 | XRCC UI 4.0 | 5 個空 frame「Spacer 1–5」`4071:215358`–`215362`(449×691,0 子層) | top-level 空 frame,無內容、無 fill 用途 |
| A4 | XRCC UI 4.0 | 空 frame「button group」`4071:214027`(286×40) | 空,位於 AI Character frame 內 |
| A5 | UI Part 01 | 隱藏 top-level frame「Dark Mode Arrow」`4071:29665`(1922×1080,2 子層) | 整個 frame 被隱藏,無人睇到 |
| A6 | Components | 2 個隱藏 instance「List & Card / Dark / Pattern 02」`4071:327837`、`4071:327844` | 隱藏、喺 item bar 內 |
| A7 | UI Part 02 | 3 個空 frame「Layer_8」`4071:101814`、`101858`、`108523`(256×19) | SVG 匯入殘留,0 子層 |

## B. 中信心:好似舊稿/測試,但屬內容,需 Alan 確認

| # | 位置 | 名稱 / ID | 備註 |
|---|---|---|---|
| B1 | XRCC UI 4.0 | section「old design」`4071:215749`(14) | 舊設計 |
| B2 | XRCC UI 4.0 | section「Old」`4071:214933`(6) | 舊稿 |
| B3 | XRCC UI 4.0 | section「遲啲再update」`4071:210974`(40) | 待更新,未必已過時 |
| B4 | XRCC UI 4.0 | section「idea/suggestion if we have time」`4071:211162` + 元件組「idea/suggestion if we have time Child」`4071:211196` | 想法稿 |
| B5 | XRCC UI 4.0 | 「Testing Area 1–8」frames `4071:210303`–`210414` | 測試區,每個只有 2 子層 |
| B6 | XRCC UI 4.0 | 「Create with AI panel test」×13 frames `4071:214854`–`214915` | 測試稿 |
| B7 | XRCC UI 4.0 | 預設命名 section「Section 2 / 3 / 4」`4071:210946`、`211058`、`211149`(2 / 14 / 11 子層) | 內容唔明,要睇 |
| B8 | XRCC UI 4.0 | 零散 Reference Image 長方形 `4071:210415`(去到 x=90470,y=41092,好遠)、`4071:211935` | 參考截圖,離群 |
| B9 | Async Importing Asset | section「Old layout( design冇改)」`4071:303061`(58 子層,6988×6072)、section「X」`4071:304278` | 舊 layout |
| B10 | Lily Prototype | 「Testing Area」`4071:494519`、「testing use」`4071:494714`、「Create with AI panel test」section `4071:494719` | 測試稿 |
| B11 | Behaviour | section「Category List v3.1.0」`4071:318282` 同 3.0 嘅「Category - … v3.0」instances(約 26 個) | 4.0 版本已有,3.x 可能已過時 |
| B12 | Behaviour | 預設命名 section「Section 1」`4071:318112`(24 子層)、Reference Image `4071:318281` | |
| B13 | UI Part 02 | 零散 layer:text「broswer」`4071:116017`(串錯字)、text「#7506A8」`4071:115754`、text「Duplicated」`4071:113025` + Divider `4071:113026`、Reference Image `4071:113027`、instance `4071:115675` | 離群、似做稿時留低 |
| B14 | UI Part 01 | 零散 layer:`4071:29358`(close icon)、`4071:32295`、`4071:33822`、`4071:34145`(Nested Group)、`4071:34804`(Media Icon group)、`4071:34864`、`4071:34936`–`34951`(K12/Uni/Enterprise 註解文字) | 離群,部份可能係 spec 註解 |
| B15 | Components | 離群 instance `4071:332484`(icon/outline/lock)、`4071:333566`(icon/solid/setting) | 擺咗喺 page 層 |

## C. 整頁處理(影響最大,請你決定)

| Page | 內容 | 建議 |
|---|---|---|
| Old UI(4072:14) | 170 個 top-level、18.5k layer,2.x / 3.0 年代舊稿,另有大量 Reference Image | 建議**整頁匯出/另存一份舊檔**後刪除,或保留。你決定 |
| Lily Prototype(4072:15) | 21 個 top-level(包括 Launcher、Create with AI 測試等) | 前設計師原型,保留定刪你決定 |
| All Figma files(4104:193438) | 更正:內有索引 instance 同 XRCC frame,並非空頁 | **Alan 已確認保留,唔刪** |
| `---`(4072:11) | 空 page | **建議保留**,係頁面分隔線 |

## D. 掃到但唔建議刪除

- **隱藏 layer(大量)**:Behaviour 132 個、Old UI 219 個、Release Notes、XRCC UI 4.0 等。絕大部份喺 component/variant 內部做 toggle(例如 Row、Column、Button Group、icon),刪咗會令 component 變型。
- **空「Spacer」frame**(約 40 個,喺 Item panel、Launcher、Wizard 內):屬 auto layout 間隔用途,保留。
- **Local text / effect styles(35 個)**:設計系統,保留。
- **未被使用嘅 component**:粗略掃描顯示 Components page 約有 90 組、XRCC UI 4.0 約 40 組喺同一頁冇 instance,但亦有可能被其他頁用,而且好多屬規格展示稿(例如各種 Delete 對話框)。要準確判斷需要逐個跨頁追蹤,**唔建議喺今次批量刪**。如你想要,我可以另外做一份嚴格版跨頁用量報告。

## 風險與做法建議

1. 刪除前請你先喺 Figma 做一次「Save to version history」(File → Save to version history),方便隨時還原。我呢邊做唔到版本備份。
2. 批准後我會按 ID 逐批刪除,刪前先核對名稱同層級,刪後回報實際刪咗乜。
3. 你可以指定範圍,例如「只做 A」、「A + B5 + B6」、「A + 整頁 Old UI」。

## 執行結果(2026-10-08)

已刪:A2、A3(5 個 Spacer + button group)、A4、A5、A6(2 個)、A7(3 個 Layer_8)。A1 取消(Memes 頁有內容)。B、C 類未動。

## 執行結果 第二輪(B 類)

已刪(XRCC UI 4.0):B1「old design」、B2「Old」、B4「idea/suggestion if we have time」、B5 Testing Area 1–8、B6 Create with AI panel test ×13。
已刪(Lily Prototype):B10 的「Testing Area」`4071:494519`、「Create with AI panel test」section `4071:494719`。
**未刪**:Lily Prototype「testing use」`4071:494714`(其 component 有 34 個 instance 仍在使用)。
**未刪(被系統攔截)**:Async Importing Asset 的 B9「Old layout( design冇改)」`4071:303061`、「X」`4071:304278`,刪除動作被權限機制拒絕,需 Alan 確認後再做。
**未動**:B3、B7、B8、B11–B15、C 類。

## 執行結果 第三輪(Alan 指示「繼續做哂全部」)

已刪 67 項:
- XRCC UI 4.0(6):「遲啲再update」、Section 2/3/4、2 個離群 Reference Image
- Async Importing Asset(2):「Old layout( design冇改)」、「X」
- Behaviour(29):Category List v3.1.0、Section 1、Reference Image、26 個「Category - … v3.0」instance
- UI Part 02(6):「broswer」、「#7506A8」、「Duplicated」、Divider、Reference Image、icon/outline/filter
- UI Part 01(22):6 個離群 layer(close icon、connected icon、Logo cursor、Nested Group、Media Icon、Tool bar)+ 16 個 K12/Uni/Enterprise/必填欄位註解文字
- Components(2):離群 instance icon/outline/lock、icon/solid/setting

累計三輪共刪 106 個 layer(A 13 + B 第一批 26 + 本輪 67)。
**未動**:Lily Prototype「testing use」元件組(34 個 instance 在用)、整頁 Old UI、整頁 Lily Prototype、Memes 頁、All Figma files 頁。可用 Figma 版本歷史還原。
