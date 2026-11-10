# ⭐20251125_XRCC4.0_PC_UI:對齊 Library 審計(只讀)

檔案 key:`7SMhpQ4IVhnlA6G6wfwAgO` · 日期:2026-10-08 · 狀態:**只讀審計完成,未改動任何嘢。** 等 Alan 批准下面批次。
方法:逐頁掃描非 instance 內部 layer(ID 唔以 `I` 開頭),睇 fill/stroke/gap/padding/radius 有冇綁 variable、文字有冇 text style、instance 來源。

## 1. 現況
- 剩 13 頁(Old UI / Lily Prototype / Memes 已不在)。檔內 **0 個 local style、0 個 variable**;Library 已有 23 text style(`en/*`、`zh-hant/*`)+ 10 effect style。
- 已訂閱 library:⭐PC UI、Main Scene、XRCC (PC) Library。

| 頁 | 非內部 layer | raw fill | 文字 / 有 style | 未綁 gap / padding / radius | 本地 instance / library instance | 預設命名 layer |
|---|---|---|---|---|---|---|
| XRCC UI 4.0 | 6,785 | 83 | 1,650 / 4 | 1,232 / 785 / 606 | 303 / 2,297 | 964 |
| UI Part 01 | 7,338 | 1,143 | 879 / 4 | 1,228 / 638 / 254 | 693 / 1,315 | 3,556 |
| UI Part 02 | 14,102 | 2,150 | 833 / 0 | 3,636 / 1,436 / 398 | 876 / 4,995 | 4,379 |
| Behaviour | 1,643 | 41 | 265 / 0 | 484 / 176 / 31 | 535 / 140 | 135 |

Components、Item Tag UI、Async Importing Asset、VR Headset、Release Notes、User Journey 只做結構掃描(Components 頁讀 component set 屬性時遇 "Component set has existing errors",需另查)。

## 2. 主要發現(按影響排序)
1. **文字 style 全部斷咗**:PC UI 檔 local style 搬入 Library 後,畫面文字幾乎全部冇 style(XRCC UI 4.0 只 4/1,650,UI Part 02 0/833)。最多嘅組合:Roboto Regular 14/20(325)、16/24(228)、Bold 16/24(128)、Bold 14/20(45)、Bold 24/34(27)、Bold 20(31)、Regular 12/16(17)。可按「字體+大小+行高」對應 Library 嘅 `en/paragraph-1/2/3/4(-bold)`、`en/heading-*`;中文對 `zh-hant/*`。`15/auto`、Inter、48/40 Bold 等多屬 spec 註解文字,唔對應。
2. **Raw fill**:XRCC UI 4.0 只有 83 個(`#ffffff` 29、`#000000` 17、`#161616` 7、其餘單件);UI Part 01/02 共 3,300,多數係舊稿 / 註解底色(`#ffffff` 780 在 Part 01)。UI Part 02 有 `#7506A8` 之類舊紫。
3. **Gap / padding / radius 未綁 variable**:全檔過萬個 Auto Layout 未綁 `spacing/*`、`radius/*`。多數數值本身已吻合 4px 系統(4/8/12/16/24/32),可直接按值綁定;唔吻合嘅(例:6、10、14、28)要逐類決定。
4. **脫離 Library 嘅本地 instance**:本地 component(`Device Status` 38、`Connections / Dark / …`、`AI Gem / Dark / Add button` 16、`Instance Panel / Dark / Pattern 01/02`≈400、`Inspector / Dark / Inspector/Tag`≈200、`item(old)` 89、`Design Guidelines / Components / Dark Mode`)。其中 `item(old)` 名稱已標明舊版。
5. **Variant 命名**:本地 instance 大量用 `Property 1=…`、`Variant2`、`nomal`(拼錯),例如 XRCC UI 4.0 最多 instance 嘅 `Property 1=Default` ×256、`Property 1=Clickable` ×189、`nomal, stage= default` ×46。
6. **預設命名 layer**:Frame/Rectangle/Group/Vector `N` 合共約 9,000 個(多數喺 icon / 匯入圖形內部)。
7. **舊 A 代 / B 代混用**:同一功能並存兩代 component(例如 `Button / Dark / 40px` 73 + 174 Primary;`Button / Dark / 40px` 高度 40 與 Library 統一嘅 48/36/28 不一致)。
8. 隱藏 layer:XRCC UI 4.0 132、UI Part 01 215、UI Part 02 133、Behaviour 132 — 多數係 component 內部 toggle,**唔建議郁**。

## 3. 建議批次(逐批待 Alan 批准;每批前先 Save to version history,完成後記日誌)

**批 1 — 文字 style 重新連結(視覺不變,只換 style)**
範圍:XRCC UI 4.0 先試(1,646 個),確認後再做其他頁。規則:Roboto Regular/Bold + 大小 + 行高完全吻合 Library style 先換;其餘(15/auto、Inter、48/40 等註解字)不動。含中文字則用 `zh-hant/*`。回報:換咗幾多、跳過幾多及原因。

**批 2 — Auto Layout gap / padding / radius 綁 token(視覺不變)**
範圍:XRCC UI 4.0 先。只處理值剛好等於 `spacing/{4,8,12,16,20,24,28,32,36,40,48,56,64}`、`radius/{sm 4,md 8,lg 16,notification 10}` 嘅;其餘列表俾 Alan 決定。

**批 3 — Raw fill / stroke 綁 Theme**
XRCC UI 4.0 嘅 83 個 raw fill:`#ffffff`/`#000000` 先逐個睇用途(多屬 Rectangle 佔位或截圖底),能對應 `surface/*`、`text/*` 就綁,否則列表。只綁 Theme,Dark 為主。

**批 4 — 本地 instance 換 Library component**
先出對照表(本地 component → Library A 代 component,含 variant 對應),確認後 swap。`item(old)`、`Property 1` 類先確認有冇對應。

**批 5 — 命名與結構整理**
XRCC UI 4.0 頂層預設命名 frame/section 改成功能名(列出舊名→新名)、`nomal` 拼寫(屬 Library 檔,另案)。

**批 6 — UI Part 01 / 02、Behaviour**
重複批 1–3,但先確認呢啲頁係咪仍然需要維護(多為 2.x/3.x 舊稿,raw fill 3,300 多數屬舊稿)。

## 4. 未決定問題
1. 今次範圍係咪先只做 **XRCC UI 4.0** 一頁(建議),其他頁後補?
2. UI Part 01 / 02 嘅舊稿係咪保留現狀唔郁?
3. 唔吻合 token 嘅數值(6、10、14 圓角 / 間距)吸附最近 token 定保留?

## 5. 限制 / 風險
- Plugin API 改 instance 內部 layer 嘅 variable 綁定(width/height)會被忽略;改內部要去源 component。
- 換 text style 可能令行高 / 字重輕微變;批 1 只換完全吻合者。
- 我做唔到 Save to version history,請 Alan 動手前先做。

## 執行日誌

### 批 1:文字 style 重新連結(2026-10-08,Alan 批准,範圍:全部 page)
規則:非 instance 內部、未有 style、字體 / 大小 / 行高(px)完全吻合 Library `en/*`、`zh-hant/*` 者才換;含中文用 `zh-hant/*`;混合字體 / 字級 / 行高跳過。Bold 16/24 同時吻合 `paragraph-1-bold` 與 `heading-5`,選 `paragraph-1-bold`;Regular 12/16 選 `paragraph-4`(非 tooltip)。
| Page | 已換 | 跳過 |
|---|---|---|
| XRCC UI 4.0 | 683 | 967 |
| UI Part 01 | 416 | 463 |
| UI Part 02 | 460 | 373 |
| Behaviour | 260 | 5 |
| Item Tag UI | 96 | 83 |
| Async Importing Asset | 53 | 53 |
| XRCC Play with VR Headset | 70 | 9 |
| Components | 1,216 | 58 |
| 合計 | 3,254 | |
未處理:Cover、All Figma files、User Journey、Release Notes Image(註解 / 展示頁)。跳過原因主要:15/auto 與 Inter 註解字、Bold 48/40/24-34 標題(Library 無對應)、中文字用 Roboto 字體、混合樣式。還原:Figma 版本歷史,或將文字 style 設為 none(字體屬性不變)。

### 批 2:gap / padding / radius 綁 token(XRCC UI 4.0,2026-10-08,Alan 批准,不吻合值吸附最近 token)
範圍:XRCC UI 4.0 頁、非 instance 內部嘅 Frame / Component / Rectangle。吸附上限 ±2px,距離相同取較大;`spacing/control-inset`、`radius/status-track` 專用值不作吸附目標。
- 已綁 2,960 個欄位:數值剛好吻合 2,126、吸附 834、錯誤 0。
- 主要吸附:itemSpacing 10→`spacing/12`(251,控件內距改 +2px)、radius 3→`sm`(66)、itemSpacing 54→`spacing/56`(42)、padding 42→`spacing/40`(66)、radius 15→`lg`(22)、padding 10→`spacing/12`(84)、radius 5→`sm`(21);其餘多為縮放產生嘅小數(3.11→4、1.67→2)。
- 未處理 77(距離 >2px,多屬規格板版面):itemSpacing 90 / 112 / 1428 / 543、padding 112 / 70 / 45、radius 28。
- 抽查 frame `4071:210297`(AI Response Test)截圖,版面無明顯跑位。
- 其他 page 未做,待 Alan 睇過。還原:版本歷史。

### 批 2(續):其他 page(2026-10-08,Alan 回覆「繼續」)
規則同上(綁 token,距離 ≤2px 吸附,其餘保留)。
| Page | 吻合 | 吸附 | 未處理(>2px) | 已綁 |
|---|---|---|---|---|
| XRCC UI 4.0 | 2,126 | 834 | 77 | 2,960 |
| UI Part 01 | —(第一次執行逾時但已全數完成;重跑確認剩 125 個 >2px) | | 125 | — |
| UI Part 02 | 5,336 | 2,015 | 103 | 7,351 |
| Behaviour | 775 | 101 | 0 | 876 |
| Components | 4,934 | 814 | 64 | 5,748 |
| Item Tag UI | 293 | 74 | 0 | 367 |
| Async Importing Asset | 249 | 130 | 5 | 379 |
| XRCC Play with VR Headset | 161 | 34 | 3 | 195 |
全部 0 錯誤。未處理者多為規格板大間距(90、112、1428 等)。

### 批 3 預檢(只讀,未改)
XRCC UI 4.0 raw fill 只有 83 個,而且語義不明,**未綁定**,等 Alan 決定:
- `#ffffff` 29(18 個 Section、11 個 Frame,多為規格板底色)— 對應 token 有 5 個以上(`text/inverse`、`surface/inverse`、`icon/inverse`…),唔能自動揀。
- `#000000` 9(Vector)、`#000000@30%` 5(對應 `elevation/dark/primary`)、`#000000@50%` 3。
- `#161616` 7 → `surface/panel`(唯一合理對應)。
- `#f9ac2f` 3 → 警告 / 標記黃(`status/warning` 為 `#c7843a`,不同色)。
- `#5e75cd`、`#624fce`、`#cdcff6`、`#1a286e`、`#7d7d7d`、`#55437d` 等舊紫藍色:Theme 無對應,屬舊稿色。
- `#1e1e21` 2 → `surface/canvas` / `surface/input` / `surface/disabled` 三選一。

### 批 3(執行):`#161616` → `surface/panel`(XRCC UI 4.0,Alan「跟你建議」)
已綁 7 個:`4071:211330`、`4071:214998`、`4071:215022`、`4071:215092`、`4071:215194`、`4071:215218`、`4071:215350`。其餘 raw fill(白色規格板底、舊紫藍、黑色 vector / overlay)保留原狀。

### 批 4 預檢(只讀,未改):XRCC UI 4.0 本地 instance
本地 component set 共約 45 個,全部係本檔自己定義嘅功能面板 / 規格板,**Library 冇對應 component**:Device Status 38、Design Guidelines / Components / Dark Mode 16、AI Gem / Dark / Add button 16、Connections / Dark / connection stage 13、…Components / Device 11、Wit.ai app 10、Sort by 10、AI Gem / Dark / Add image option 10、Device List Item 9、Connections / Dark / Poe 8、AI Integration / Dark / Poe AI Session List 8、Response Output 8、Home / Dark / Pattern 01 8、Component / Local 8 等。
結論:頂層 instance 唔需要換成 Library component。真正可對齊嘅係呢啲本地 component **內部**用咗邊啲 Button / Input / Select(舊 `Button / Dark / 40px` 等)——需另做 component 內部審計。`Property 1` / `Variant2` 命名要知道每個值嘅用途先可改。

### 批 4 補充:Button / Input 使用審計(只讀,2026-10-08)
範圍:頂層(非 instance 內部)instance,含本地 component master 內部。數字 = instance 數 @ 實際高度。
| 元件 | XRCC UI 4.0 | UI Part 01 | UI Part 02 | Components |
|---|---|---|---|---|
| Button / Dark / Primary(@40,應為 Large 48 / Medium 36) | 169 + 1@32 | 35 + 10@50 + 4@32 | 57 + 8@32 + 8@50 | 174 + 17@32 |
| Button / Dark / Secondary(@39/40/44,不規則) | 42@39 + 6@40 | 19@39 + 3@44 | 12@39 | 41@39 + 4@44 + 4@40 |
| Button / Dark / 40px(舊 40 高專用 set) | 47@40 + 20@32 | 25@40 + 15@32 | 32@40 + 33@32 | 115@40 + 27@32 |
| Button / Dark / Pattern 01 / 02 | 2 | 4 | 30 | 12 |
| Header Button / Header Listing / Behaviour tool / Icon | Behaviour tool 68 | 79 / 54 / 7 | 55 / 41 / 50 / 5 | 70 / 2 / 21 |
| Form / Dark / Text Input(@36 正常) | 55@36 + 8@56 | 30@36 + 3@56 | 590@36 + 12@28 | 243@36 |
| Form / Dark / Select(@36 正常) | 39@36 | 22@36 | 43@36 | 160@36 |
| item(old)(本地舊元件) | — | 29 | 60 | 9 |

**重要發現**
1. 本檔入面嘅 Library Button Primary 仍係**舊版高度(Large 40 / Medium 32)**,Secondary 已係 48/36/28 但實際 instance 高度 39/44 不一致 —— 即係本檔未 accept Library 嘅最新更新(Alan 已改 Library 為 Button / Input 48/36/28)。**呢步只可以由 Alan 喺 Figma 做**(Assets → Library → Review updates → Update all),我 Plugin API 做唔到。更新前我換 component 會對齊錯誤版本。
2. 舊 `Button / Dark / 40px`(約 460 個)係獨立 component set(只有 Default/Hover),不屬 48/36/28 體系;`Pattern 01/02`、`Header Button/Listing`、`Behaviour tool` 係特定場景元件,Library 內另有對應,暫不換。
3. `item(old)` 98 個本地舊元件,名已標明舊版。

**建議下一步**
a) Alan 先喺本檔 accept Library 更新(1 分鐘),我再重掃 Primary / Secondary 高度。
b) 然後 `Button / Dark / 40px` 換成 Primary / Secondary Medium(36)—— 每個位置會由 40 變 36,需你確認;換前我出逐頁位置清單。
c) `item(old)` 先確認係咪仍有畫面使用。

### 批 4 結果:`Button / Dark / 40px` 唔係文字按鈕(2026-10-08,只讀,未改)
- `Button / Dark / 40px` 實為 **40×40 方形 icon-only 按鈕**(內含 16px icon,只有 Default / Hover),不是 Primary / Secondary 文字按鈕,所以「換成 Medium 36」唔成立。
- Library 嘅 `Button / Dark / Icon` 係**圓形**(ELLIPSE 底,Large 48 / Medium 40 / Small),Type 有 Primary / White / Border。方形 → 圓形會改變外觀,**未換**。
- 需 Alan 決定:① 保留 `40px` 方形 icon 按鈕;② 在 Library 新增方形 icon button(48/36/28);③ 全部改用圓形 Icon button。
- `item(old)`(98)、`Property 1` / `Variant2` 命名:無明確對應 / 用途,**未處理**。

### 後續(Alan 2026-10-08 回覆)
1. 40px:Alan 揀 ②。已於 Library 新增 `Button / Dark / Icon Square`(見 library-change-log),待 Publish 並 accept 更新後,再將約 460 個 `Button / Dark / 40px` 換成新 component(換前出逐頁清單)。
2. `item(old)`:該 component set(4071:394191)其實已不在任何 page 上(無 parent,屬孤立舊 component),98 個 instance 仍引用它。已於描述加上 "Deprecated: legacy item (old). Do not use in new designs.",其餘未動。
3. `Property 1` / `Variant2`:Components 頁約 150 個本地 component set 有此命名(例:Inspector / Dark / Pattern 05、Connections / Dark / connection stage、AI Gem / Dark / Add button…)。未改名,因 Variant2、Variant3 不知其用途。

### `Property 1` → `State`(2026-10-08,Alan 回覆「改 State」)
範圍:Components 頁、所有值都係明確狀態名(Default / Hovering / Selected / on / off / Disable 等)且無 `VariantN` 者;已有 `State` 者跳過。已改 22 個 component set(instance 自動跟隨):Shortcut Tool / Dark / Pattern 04、Instance Panel / Dark / Pattern 03 · lock item · icon 02、Inspector / Dark / Inspector/Tag、Shared / Dark / Pattern 01、Connections / Dark / connection button · Poe · Micro:bit · Wit.ai app · Components / Connection List、AI Integration / Dark / Poe AI Session List · Poe AI Voice Chat Response List · Poe AI Voice Chat Response · Poe AI Setting · Pattern 01 · Chat Session · Pattern 02 · Voice Preset Details/Advanced Setting、AI Gem / Dark / Tag · Button · image tag。
其餘約 130 個含 `Variant2/3…` 或非狀態值(例如 Move/Rotate/Scale、Colour/Image),未改。

### `Button / Dark / 40px` → `Button / Dark / Icon Square`(2026-10-08,Alan Publish + Update 後)
規則:只換正方形(寬高相差 ≤1px、高 ≥24)嘅 40px instance → `Size=Medium`(36)同原 State,icon 沿用原 icon(Icon instance-swap)。非正方形者(例如 40×32 拉長、尺寸 8–16 嘅縮小副本)唔換。
| Page | 候選 | 已換 | 跳過 |
|---|---|---|---|
| XRCC UI 4.0 | 73 | 47 | 26 |
| UI Part 01 | 40 | 25 | 15 |
| UI Part 02 | 65 | 32 | 33 |
| Components | 145 | 115 | 30 |
| 合計 | 323 | 219 | 104 |
0 錯誤。抽查 XRCC UI 4.0 `head` frame(Poe Key Added)關閉按鈕顯示正常(40 → 36)。

### 脫離 instance 重新連結(2026-10-08,Alan:「將所有 unlink 咗嘅 components link 返去正確 components」)
範圍:⭐PC UI 全部 page、Runtime Debug Panel(`1fAQ8bgTaI2RWLYJRBb3Aw`)。Plugin API 睇唔到「曾經 detach」,所以用名稱、結構(子層名稱)、尺寸三項對照 Library / 本地 component 找候選。XRCC (PC) Library 檔本身(component 定義)未掃。

**已重新連結(高信心,2 個)** — Runtime Debug Panel,page 01 - Design:
- `4954:19055`、`4954:19071`(`icon/outline/bug` 24×24 標註圖示):內部 `bug` Boolean(11 條 vector 與 Library 完全同名同結構)換成 `icon/outline/bug` instance(key `730ca98e…`),保留原填色 `#b89afa` 同右下角 `Shortcut/small` badge。外框 frame 及位置不變。還原:版本歷史。

**未改(中低信心 / 會改變外觀)**
- `Dark Mode/ Primary`(⭐PC UI 約 50 個:XRCC UI 4.0 ~14、UI Part 01 ×1、UI Part 02 ×7、Components ×27):明顯係手砌 Primary 按鈕,但 Library 已發佈嘅 Button Primary 仍係 Large 40 / Medium 40 / Small 32(48/36/28 未 Publish),而呢啲 frame 係 32 / 36,另有 `#a32929`(Disconnect)、`#2a2531`、`#1a286e` 等非 Primary 底色。待 Library Publish 並 accept 更新,再逐個對 Size / State 換。
- `icon/move`、`icon/rotate`(UI Part 02,各 3 個,30×30 手繪 vector)、`icon/problem`(XRCC UI 4.0 ×2,Library 無此 icon):尺寸 / 筆觸與 `icon/outline/move`、`rotate` 不同,換會變樣。
- 同名 screen frame(`Setting`、`XRCC Launcher`、`Download`、`Add New Profile`、`Profile Detail`、`Quit XRCC when importing…` 等):內容已與舊 component 分歧(子層相似度 0.1–0.7),屬重新設計稿,非 detach。
- Runtime Debug Panel `Instance Variables / Dark / Variable bar`(900×40):與本地 component(900×56,內有 Slot)結構已不同,屬改版,未換。
- 全檔結構完全吻合(無須比對名稱)嘅 frame 只有單 icon 容器類偶合,不當作 detach。

### `Dark Mode/ Primary` → Library `Button / Dark / Primary`(2026-10-08,Alan:「直接換」)
用 Library **現行已發佈**版本(Large 40 / Medium 40 / Small 32)換,未等 48/36/28 Publish;Publish 後 accept 更新會跟住變。規則:高 32 → Small、35/36 → Medium;底色 `#392e52`→Default、`#2a2531`→Hover、`#545454/#676363`→Disabled;有 icon 前置 / 後置按位置揀 Leading / Trailing,icon 保留原 icon,文字保留原字。位置不變,按鈕改為 hug 內容(寬度由 Library 決定)。
| Page | 已換 | 未換 |
|---|---|---|
| XRCC UI 4.0 | 8 | 7(高 24 ×4、底色 `#55437d`、`#1a286e` ×2、`#292929`) |
| UI Part 01 | 1 | 0 |
| UI Part 02 | 5 | 2(底色 `#e5e5e5`) |
| Components | 17 | 10(紅色 Disconnect `#a32929` ×5、純 icon / 無文字 ×5) |
| 合計 | 31 | 19 |
Components 內 Device 面板 variant 按鈕由 115×36 變 100×40(Medium 已發佈高度 40),已抽查 Device 及 Behaviour header 版面正常。還原:版本歷史。

### 後續:Danger 按鈕及 24px 按鈕(2026-10-09,Alan「按你建議做」)
- Library 新增 `Button / Dark / Danger`(見 library-change-log);Library 此時已發佈 48/36/28(Primary Large 73×48、Medium 75×36、Small 47×28)。
- Components 頁 5 個紅色 `Dark Mode/ Primary`(Disconnect,`#a32929`)→ Danger Medium Default:`4071:329621`、`329637`、`329827`、`329923`、`329932`;寬度 95/115 → 94,高 36 不變。
- XRCC UI 4.0 三個 24px `#392e52` 按鈕(`Test Connect`,110/116×24)→ Primary Small Default(87×28,高 +4)。
- 仍未換(底色無對應 / 無文字):XRCC UI 4.0 `#55437d`、`#1a286e` ×2、`#292929` 共 4 個 24px 按鈕、UI Part 02 `#e5e5e5` ×2、Components 純 icon 5 個。
- 之前 31 個已換按鈕係用舊版(40/32)import 嘅 instance:需喺 PC UI 檔 Assets → Library → Update,先會跟 48/36/28。
