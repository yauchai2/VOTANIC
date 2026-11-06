# XRCC Design System 研讀報告

日期:2026-10-08 · 範圍:XRCC (PC) Library(`De8nKqO81yciw4wH5xfpxA`)、⭐ 20251125_XRCC4.0_PC_UI(`7SMhpQ4IVhnlA6G6wfwAgO`)
方法:Figma connector 全程**唯讀**(`get_metadata`、`get_screenshot`、`search_design_system`、唯讀 Plugin API script 列舉 variables/components)。**冇改動任何 Figma 內容,亦冇改 Notion。**
標示:**Confirmed** = 直接從檔案讀到;**Inference** = 由結構推論;**Open** = 需 Alan 確認。

---

## 1. 總覽

| 項目 | XRCC (PC) Library | ⭐ 20251125_XRCC4.0_PC_UI |
|---|---|---|
| 角色 | 現行 Design system 來源(tokens + 基礎 components + icons) | Legacy all-in-one(2.1 → 4.0 畫面 + 大量 product components),參考用 |
| Variable collections | 3 個:XRCC Primitive(108)、XRCC Theme(97,Dark/Light)、XRCC System(159) | **冇**(0 個 collection) |
| Text styles | **0** | 25(`en/*`、`zh-hant/*`、`product/launcher/*`) |
| Effect styles | **0** | 10(`shadow/light/1-5`、`shadow/dark/1-5`) |
| Components | 約 45 個 component set + 312 icons + 11 logos/images | 166 sets / 693 components(Components 頁) |
| 頁面 | Cover · All Figma files · Design tokens · Logo · Icons · 26 個 component 頁(Alert → Tooltip、Popup)· Internal · UI kit | Cover · All Figma files · User Journey · UI Part 01/02 · XRCC UI 4.0 · Item Tag UI · Async Importing · VR Headset · Behaviour · Components · Release Notes Image · Old UI · Lily Prototype · Memes |

Library 已訂閱嘅 team libraries(Confirmed):XRCC Setting Panel、XRCC 3.1.2 In-app Licensing、XRCC (PC) Library、XRCC Launcher、⭐ 20251125_XRCC4.0_PC_UI、XRCC4.0 - Assets Panel。即係 components 分散喺 6 個 library,搜尋時要跨 library。

**重點結論**
1. Token 架構係三層(Primitive → Theme 語意 → System 尺寸/字體),方向正確,適合 Claude 直接綁定。
2. 新畫面對 library 嘅採用率高(抽查 4 個 2026 年畫面:variable 綁定 fill 約 85–99%、text style 約 75–92%、instance 約 50–95% 來自 library),所以「用 library 做 UI」係已驗證可行嘅做法。
3. 有幾個缺口會直接影響 Claude 出圖質素,見第 7 節(最大嘅係:冇 warning/amber 語意 token、library 冇 text/effect styles、兩代 components 並存)。

---

## 2. Token 系統(XRCC (PC) Library)

### 2.1 XRCC Primitive(單一 mode:Base)
只可以被 Theme/System alias,**唔好直接喺 UI 用**(Design tokens 頁面亦寫明:"We do not use direct color palette references … we use semantic color tokens")。

- **Neutral**:white `#ffffff` · 100 `#f6f6f6` · 200 `#e5e5e5` · 250 `#d9d9d9` · 300 `#d3d3d3` · 400 `#c8c8c8` · 500 `#818181` · 600 `#676767` · 700 `#545454` · 800 `#353535` · **850 `#1e1e21`** · **900 `#161616`** · black
- **Purple**:100 `#b89afa` · 200 `#9c70ff` · 300 `#5e59a7` · 400 `#5f4b8b` · 500 `#582da7` · 600 `#4b387d` · **700 `#392e52`** · **800 `#2a2531`**
- **Red**:50 `#ff8a8a` · 100 `#ff453a` · 300 `#a32929` · 500 `#941e1e`
- **Green**:100 `#6fd855` · 200 `#37954b` · 300 `#084c31` · 400 `#1f4321` · 500 `#062208`
- **Blue**:100 `#4a79ac` · 200 `#0c6785` · 300 `#195190` · 400 `#0d4f6c` · 500 `#16273a` · 600 `#051324` · `blue/status` `#4589ff`
- **Yellow**:100 `#f9ac2f` · 200 `#f4971d` · 300 `#bc6809` · 400 `#8f7509` · 500 `#684716` · 600 `#2e2417`;**Amber** 200 `#c7843a`;**Orange** 100 `#d97706`
- Cyan(100 `#81f9f9`、200 `#369db2`、300–500、accent `#0ec7f0`)、Magenta(100–900)、Olive(100–400)、Indigo(100 `#354490`、200 `#2c1484`)——主要用於 behaviour block 顏色。
- **Shadow**:black-08 / 15 / 25 / 30(alpha)
- **Font**:family `Roboto`、`Noto Sans TC`;weight Regular/Medium/SemiBold/Bold;size 12/14/16/18/20/24/32/40;line-height 16/18/20/24/28/32/40/48
- **Unit**:0,1,2,4,8,10,12,14,16,20,24,32,36,40,48;`dimension/radius/full` = 9999

### 2.2 XRCC Theme(語意層,mode:**Dark** / **Light**)
Claude 做 UI 時**只應綁定呢層**(Dark 係產品現行 mode)。以下係 Dark → Light 嘅對應:

| 類別 | Token | Dark | Light |
|---|---|---|---|
| Surface | `surface/canvas` | neutral/850 `#1e1e21` | neutral/100 |
| | `surface/panel` | neutral/900 `#161616` | white |
| | `surface/header` | purple/800 `#2a2531` | white |
| | `surface/input` | neutral/850 | white |
| | `surface/elevated` | neutral/800 | white |
| | `surface/row-hover` | purple/800 | neutral/200 |
| | `surface/disabled`、`surface/inverse`、`surface/accent-muted` | (見 JSON/檔案) | |
| Text | `text/primary` | neutral/200 `#e5e5e5` | neutral/850 |
| | `text/secondary` | neutral/400 | neutral/700 |
| | `text/disabled` | neutral/600 | neutral/500 |
| | `text/placeholder` | neutral/500 | neutral/500 |
| | `text/subtle`、`text/accent`(purple/100)、`text/inverse`、`text/on-dark/*`、`text/on-light/*`、`text/debug/status` | | |
| Icon | `icon/default`、`icon/secondary`、`icon/disabled`、`icon/accent`、`icon/inverse` | | |
| Border | `border/default`(neutral/700)、`subtle`、`strong`、`disable`、`inverse`、`interactive`(purple/100)、`tooltip`、`error` | | |
| **Primary action** | `action/primary/background/default` | **purple/700 `#392e52`** | purple/100 |
| | `…/background/hover` | purple/800 | purple/200 |
| | `…/background/pressed` | purple/600 | purple/200 |
| | `…/background/focus` | purple/700 | purple/100 |
| | `action/primary/content/default` | **purple/100 `#b89afa`**(字/icon) | purple/700 |
| | `…/content/hover` | purple/200 | purple/700 |
| Selection | `selection/background/default` / `selection/content/default` | purple/700 / purple/100 | purple/100 / purple/700 |
| Destructive | `action/destructive/background/{default,hover,pressed,focus}`、`…/content/default` | red/300 `#a32929` → hover red/500 | red/50 → hover red/100 |
| Status | `status/error/{default,background,hover,text,icon}`、`status/success/default`(green/200)、`status/blue/default` | | |
| Notification | `notification/accent/{blue,purple,citrus}` | | |
| Behaviour 顏色 | `behaviour/*`(general-event、item-event、flow-control、variable、math、motion、effect、scene、light、sound、user、physics、3d-model、specialized-objects、string、wit-ai、poe、microbit、item-attributes、project-variable) | 單一值 | |
| Hierarchy marker | `hierarchy/marker/{yellow,green,blue,pink}/{background,foreground,background-nested}` | | |
| Gradient / Elevation | `gradient/xrcc/stop-3`(cyan/200)、`stop-4`(magenta/200);`elevation/{dark,light}/{primary,secondary}`、`elevation/legacy/shadow-25` | | |

**重要觀察(Confirmed)**:現行 primary button 唔係「飽和紫色塊」,而係**深紫底 `#392e52` + 淺紫字 `#b89afa`**(Button 頁截圖已核對)。專案守則「solid purple 只用於 primary action」應理解為呢組 `action/primary/*` token,唔好另外揀亮紫色做背景。

### 2.3 XRCC System(尺寸層,單一 mode)
- **Spacing**:`spacing/0, 2, 4, 8, 12, 16, 20, 24, 32, 40, 48` + `spacing/control-inset`(10)
- **Radius**:`radius/none 0 · xs 2 · sm 4 · md 8 · lg 16 · xl 20 · 2xl 24 · 3xl 32 · 4xl 40 · 5xl 48 · full` + 專用 `radius/notification`(10)、`radius/status-track`(14)
- **Control height**:`size/control/height/24, 32, 40, 48` + `…/36`(legacy,只限 Input/Select)
- **Icon size**:`size/icon/12, 16, 20, 24, 32, 48`
- **Stroke**:`stroke/width/hairline`(1);`elevation/offset/xs`(1)
- **Typography**(by 語言 `en` / `zh-hant`):`heading-1…5`、`paragraph-1`、`paragraph-1-bold`、`paragraph-2`、`paragraph-2-bold`、`paragraph-3`、`paragraph-4`(+ `en/tooltip`),每個有 `size / line-height / family / weight / letter-spacing`

**Type ramp(Confirmed,同 Design tokens 頁一致)**

| 樣式 | Size / Line height | Weight |
|---|---|---|
| Heading 1 | 32 / 40 | Bold |
| Heading 2 | 24 / 32 | Bold |
| Heading 3 | 20 / 28 | Bold |
| Heading 4 | 18 / 24 | Bold |
| Heading 5 | 16 / 24 | Bold |
| Paragraph 1 (+Bold) | 16 / 24 | Regular (Bold) |
| Paragraph 2 (+Bold) | 14 / 20 | Regular (Bold) |
| Paragraph 3 | 12 / 18 | Regular |
| Paragraph 4 | 12 / 16 | Regular |
| Tooltip | 12 / 16 | Regular |

英文 Roboto;繁中 Noto Sans TC(樣式名:標題1–5、內文1–4)。Letter-spacing 全部 0。

---

## 3. Components(XRCC (PC) Library)

命名有兩代(見第 7 節):
- **A 代(XRCC 自建、已綁 token)**:`Button / Dark / *`、`Form / Dark / *`、`Connections / Dark / …`、`Home / Dark / Pattern 05`、`Networking Panel / Dark / Pattern 02`…
- **B 代(通用 UI kit 風格,小寫名)**:`alert`、`avatar`、`divider`、`dropdown-menu`、`menu-item`、`file-upload`、`link`、`loader`、`pagination`、`pin-field`、`popover`、`progress-bar/indicator`、`skeleton`、`switch`、`table-column`、`.table-cell`

| 頁面 | Component set(variant 屬性) |
|---|---|
| Button | **Primary**(Size Large/Medium/Small · Leading/Trailing Icon · State Default/Hover/Disabled/Loading)、**Secondary**、**Tertiary**(同上,冇 Loading)、**Icon**(Size · Type Primary/White/Border · State)、Header Button、Header Listing、Behaviour tool、40px/48px、Pattern 01/02 |
| Text field / Text area | `Form / Dark / Text Input`、`text-area`(state default/error/disabled/focused · size small/medium/large · Show helper · placeholder · start/end slot) |
| Dropdown menu | `Form / Dark / Select`(State Disabled/Error/Hover/Filled/Focus/Pressed/Active)、`dropdown-menu`(elevation overlay/raised) |
| Checkbox / Radio / Switch | `Form / Dark / checkbox`(Type 可為 Checkbox/Radio/Switch;state default/error/disabled · size)、`Form`(Radio)、`switch`(size · checked · disabled · reversed) |
| Slider | `Form / Dark / Slider Bar`(State · Level Empty/Half/Full) |
| Pin field | `Form / Dark / OTP/Passcode Input`、`pin-field`、`.pin-field-item` |
| Menu item | `menu-item`(size · color primary/critical/neutral · selection default/highlighted/selected · status · content type) |
| Alert / Popup | `alert`(color neutral/primary/critical/positive/warning · inline · bleed · slots);Popup 頁:Delete Creation Result、Prompt too long、Invalid Attachment Count、Partial Attachment Import、Notification/Creation error |
| Tooltip / Popover | `New Tooltips`(Arrow left/top/down/right · Location start/middle/end)、`popover` |
| Tabs | `Connections / Dark / Components / Tab`(status on/off/hovering · size L/M)、`Device bar` |
| 其他 | avatar、Tag(Badge 頁)、divider、link、loader、pagination、progress-bar、progress-indicator、skeleton、file-upload、table |
| Icons | 312 個 `icon/outline/*`(256)與 `icon/solid/*`(47)+ 專用(flow/math/time/variable/motion/3DModel/string);`icon` set 有 `size=x3…x16/custom` × `color=neutral/neutral-faded/primary/critical/warning/positive/disabled` |
| Logo | XRCC logo、Cursor(AddStage/Clickable/Draggable…)、Sketchfab、Ready Player Me、Wit.ai、micro:bit、Discord、VOTANIC logo |

**Button 規格(Confirmed,取自 Primary/Large/Default)**:高 40(`size/control/height/40`)、padding 上下 8 / 左 12 / 右 16(有 leading icon)/ gap 8、radius `radius/md`(8)、字 Roboto Regular 16、fill `action/primary/background/default`。(2026-10-08 更新:Alan 已將 Button/Text Input 統一為 Large 48 / Medium 36 / Small 28;此處 40 為舊版已發佈數值。)
**Input/Select**:高 36(legacy `size/control/height/36`)、radius 8、fill `surface/panel`、focus/active 邊框 `purple/100`(即 `border/interactive`)。

**Component 描述中嘅狀態**:多個 Button/Form component 描述寫住 "Candidate core component … Verify hierarchy before use"——即未正式定案(Inference:2026-09-24 至 10-07 重整緊)。

### 3.1 PC UI 檔嘅 product components(未放入 Library)
PC UI 檔 Components 頁有 166 個 set,例如:`Inspector / Dark / Pattern 05`、`Shared / Dark / Panel`、`Shared / Dark / Asset Panel Heading`、`AI Integration / Dark / *`(Wit.ai Setting、Add AI Session、Select Key/Token、Poe AI Session List)、`Connections / Dark / connection stage`、`List & Card / Dark / Hovering-function Name`、`Tag Panel / New Tag`、`AI Gem / Dark / Button`、`Design System/Remarks/Numbering`(標註圈號)、`Design Guidelines / Components / *`。呢啲係做 panel 級畫面(Inspector、Asset Panel、Connections)時真正會用到嘅,**搜尋時必須包含 PC UI library**。

---

## 4. 現有畫面嘅版面與模式(PC UI 檔)

- **畫面檔命名**:`YYYYMMDD_XRCC <version> <function>`(例:`20260430_XRCC 4.0 Async Importing`、`20260520_XRCC 4.0 play with VR headset`、`20260416_XRCC 4.0 Item Tag UI`)。
- **文件標頭**(Confirmed,Async Importing 畫面):左上 VOTANIC logo;`Projects / File Name / Date` 三行;右上 "XRCC 4.0 UI";大標題 + 「Original Flow / New Flow」說明 + 流程圖 + 狀態拆解(All Async Stage)+ 預覽對照。
- **視窗畫布**:全螢幕示意 frame 1922×1080;長 spec frame 約 2096 寬;Launcher 1100×691。
- **面板結構**:深色 panel(`surface/panel` / `canvas`),header 條 `surface/header`(深紫)、tab 列、左側分類欄 + 右側格仔(card grid)+ 底部操作(Primary 實心 + Secondary 描邊)。
- **狀態圖**:每個互動狀態逐格畫出(Waiting / Importing 0–99% / Fail / Imported / Selected),錯誤用 `status/error` 紅 + 「!」icon。
- **標註**:橙/黃色(Citrus)引線 + 圈號(`Design System/Remarks/Numbering`)對應文字註解;重點用 cyan 淺底便利貼(例:"Since users will see…")。
- **Toast**:top-centre、進度條在底(已記於 W6)。
- 專案已記錄嘅 pattern:two-line variable rows、ring menu、Premium/Standard 狀態、PC vs XR 輸入(Play mode 隱藏 cursor、XR 用 wand)。

PC UI 各頁內容:UI Part 01(2.1–3.1 shortcut、setting、toolbar、inspector、skybox)、UI Part 02(3.0 面板:Item、Asset、Entity、Behaviour、Sketchfab、Action、More pop-up)、XRCC UI 4.0(連線檢查、Microcontroller / Poe / Wit.ai Connection)、Item Tag UI(20260416)、Async Importing(20260430)、VR Headset(20260520)、Behaviour(block 顏色 swatch、Block - Move/Vector3/Sound)。

---

## 5. Library 採用率抽查(PC UI 檔 4 個近期畫面)

| 畫面 | Instances(來自 library / 本檔) | Solid fill 綁 variable / 未綁 | Text 用 style |
|---|---|---|---|
| 20260416 Item Tag UI | 71 / 70 | 685 / 127 | 122 / 162 |
| 20260430 Async Importing | 120 / 5 | 391 / 199 | 163 / 178 |
| 20260520 play with VR headset | 52 / 5 | 912 / 84 | 100 / 143 |
| Wit.ai Connection | 92 / 12 | 1782 / 15 | 458 / 499 |

→ 新畫面大致依循 system,但仍有 10–34% 未綁 variable 嘅 fill(多數係插圖/標註);Item Tag UI 有約一半 instance 係本檔 local component。

---

## 6. 與專案規則/knowledge base 嘅對照

| 規則 | 檔案實況 |
|---|---|
| 8px grid | Spacing/radius token 係 **4px 基底**(2/4/8/12/20 等都有),唔係純 8 倍數;另有 10、14、36 嘅專用值 |
| Spacing 級別 Micro 4 · XS 8 · S 16 · M 24 · L 32 · XL 48 · **XXL 64** | 檔案冇 64;多咗 0/2/12/20/40 |
| 純紫色只用於 primary action | 對應 `action/primary/*` 與 `selection/*`;但 `border/interactive`、`text/accent`、`icon/accent`、`surface/accent-muted` 亦用紫 |
| Amber 只用於警告 | Primitive 有 `amber/200 #c7843a`、`yellow/100 #f9ac2f`(Citrus),但 **Theme 冇任何 `status/warning/*`**;Citrus 實際用於 notification accent 同 hierarchy marker |
| 副色 | 另有 cyan(accent `#0ec7f0`)、magenta/olive 等做 behaviour 分類色,唔屬一般 UI |

---

## 7. 不一致處與風險(按優先次序)

| # | 問題 | 影響 | 建議 | 優先 |
|---|---|---|---|---|
| 1 | **冇 warning 語意 token**(PC Library 只有 primitive amber/yellow;XR/CAVE/HMD Library 有 `Warning/*`);alert/link/progress 等 B 代 component 有 `color=warning` variant,綁外部 kit variable | Claude 做警告狀態時無可綁定嘅 token,易自創 hex,違反「amber only for warning」 | Alan 決定 warning 對應 primitive(例如 `amber/200`)並於 Theme 新增 `status/warning/{default,background,text,icon}`(此改動需 Alan 自己做或明確批准) | 高 |
| 2 | **Library 冇 text styles / effect styles**,Typography 只存在於 variables;PC UI 檔有 25 text styles + 10 effect styles(`shadow/light|dark/1-5`) | Claude 用 Plugin API 建文字時要逐項綁 variable;兩邊 style 同 variable 可能唔同步 | 短期:Claude 從 PC UI library 匯入 text/effect style;長期:將 styles 搬入 Library 並綁 variables | 高 |
| 3 | **兩代 components 並存**:A 代(`X / Dark / Y`,屬性大寫如 `Size`、`State`)vs B 代(小寫 `size`、`color: primary/critical/positive/warning`);B 代用到 `Radius/Large` 等**唔存在於 XRCC System 嘅 variable**(alert 讀到) | 同一畫面混用會出現 radius/顏色/高度不一致;B 代可能未跟 XRCC token | 定義 canonical:優先 A 代;B 代只喺冇 A 代對應時用,用前檢查綁定 | 高 |
| 4 | **Variant 命名唔規範**:`Property 1`、`Variant2/7/8/9/10`、`nomal`(typo)、`unselect( tag)`、`check (old)`、多個 set 都叫 `Form`(Radio、Switch)、`Pattern 01/02`、`40px/48px` 冇語意 | Claude 難以按名搜尋,易揀錯 variant | 重新命名成語意名(`Type=Radio`、`State=Normal`);呢類 set 暫時要靠 node 截圖確認 | 中 |
| 5 | **Token 描述同實際有出入**:多個描述引用唔存在嘅 `color/Red/200`、`Red/400`;`status/blue/default` 描述寫「positive/success」;`border/tooltip` 描述同 `border/interactive` 一樣;`status/error/background` 值讀出為非一般 alias(需人手核實) | 搜尋結果誤導 Claude 揀 token | 逐個清理描述;核實 `status/error/background` | 中 |
| 6 | **Dark 文字層級**:`text/subtle`(neutral/700 `#545454`)比 `text/disabled`(neutral/600)更暗;`text/placeholder` 同 `text/disabled`(Light)同為 neutral/500 | 對比度可能不足 WCAG AA;disabled 同 placeholder 無法區分 | 對比度檢查(`#545454` on `#161616` ≈ 2.4:1 估算,**Inference**) | 中 |
| 7 | **Control height**:Input/Select 用 36(legacy),其餘 24/32/40/48;Button「Large」= 40;Notion 指引要求 Input 40(最小 36) | 同一行混用 Input(36)與 Button(40)會唔對齊 | 已解決(2026-10-08):Alan 統一 Button/Input 為 48/36/28,Notion 嘅 40 已過時,建議 Alan 更新 Notion | 中 |
| 8 | **Light mode**:Theme 有 Light 值,但所有 component 都叫 `Dark` | Alan 確認(2026-10-08):Light 好少用,大部份都係 Dark | **已決定**:Claude 一律用 Dark;Light 值唔需要維護或測試 | 低(已結) |
| 9 | **繁中 only**:字體 token 只有 `en`、`zh-hant`;專案要求 zh-CN 文案 | 簡中畫面冇對應字體 token | Open:Noto Sans SC 係咪需要 | 低 |
| 10 | **Design tokens 頁嘅 Brand swatch 與 primitive 唔完全一致**(例:Xenon Blue `#B7C0D7`、Blue Moon `#3686A0` 不在 Primitive;Ultra Violet `#5F4B88` vs purple/400 `#5f4b8b`) | 設計文件同 token 雙重真相 | 以 variables 為準,更新頁面 | 低 |
| 11 | **Cover 寫 "20260313 updated to 4.0"**,但 component 最後更新係 2026-10-06/07;UI kit 頁(Last update 20260313)只有 `bg` section | 版本資訊過時 | 更新 cover | 低 |
| 12 | **PC UI 檔無 variable collection**,靠訂閱 Library;畫面內仍有 local component(Item Tag UI 約一半) | 同一 component 可能有 local / remote 兩份 | 新 component 先放 Library(Alan 決定) | 低 |

---

## 8. 補讀結果(2026-10-08,應 Alan 要求補睇原本未睇嘅部分)

### 8.1 Library 26 個 component 頁(逐頁截圖,Confirmed)
- 頁面格式統一:左側說明 + 範例預覽 + 右側 variant 矩陣(紫色虛線框)。B 代頁面保留咗原 UI kit 嘅英文說明(例:"Combine with other components"、"Use slots")。
- **視覺已全部換成 XRCC 深色主題**:深灰底、淺紫選取/焦點、紅 error。B 代亦有 amber 警告:`link`(warning)、`alert`(底部 amber 進度線)、`progress-bar`(warning)。
- Text field / Text area:default 灰邊、error 紅邊 + 紅字、focused 紫邊、disabled 暗;Tooltip 有 12 個方位(top/bottom/left/right × start/end);Popup 頁有 6 款現成彈窗(Prompt too long、Invalid Attachment Count、Partial Attachment Import、Delete Creation Result ×2、Creation error toast),可直接當 modal pattern 參考。
- **殘留雜物**:Alert、Pin field、Switch 頁有淺灰色幽靈 frame(疑似舊 Light 版本);Avatar 頁左上有白色 frame + 範例圖;Popup 頁背景係白色;Tabs 頁頂有一條孤立 tab 列。建議清理(需 Alan 動手或批准)。

### 8.2 B 代 / 全部 component 嘅 variable 綁定審計(逐個 set,Confirmed)
- **完全綁 XRCC Theme/System(0 raw)**:Button 全系列、checkbox、Radio、Select、menu-item、link、loader、progress-indicator、skeleton、Header/Behaviour 按鈕、Tabs、divider、file-upload、dropdown-menu、Pin field(OTP/.pin-field-item)。
- **有外部(remote)variable**——名為 `Color/Background/Neutral faded`、`Color/Border/Neutral faded`、`Color/Foreground/Neutral`、`Color/Surface/canvas`、`Color/Neutral/700` 等,**唔屬 XRCC Theme/System**,來源 library 未能確認:`alert`、`pagination`、`pin-field`、`progress-bar`、`switch`、`.table-cell`、`table-column`、`Tag`、`New Tooltips`,**連 A 代嘅 `Form / Dark / Text Input` 同 `text-area` 都有**。
- **有 raw hex(未綁 variable)**:`avatar`(276 個 fill:`#333333`、`#ffffff`、`#1a1f29`、`#65a7ff`)、`Tag`(`#b89afa`、`#a32929`、`#00ffff`、`#000000`)、`progress-bar`(`#ffffff`)、`Slider Bar`(`#392e52`)、`New Tooltips`(24 個 stroke)。
- 結論:B 代**外觀**已換成 XRCC 風格,但部分仍綁第三方 kit 嘅 variable,所以 **A 代優先** 嘅規則成立;用 B 代前要檢查綁定。
- `status/error/background` 實值:alias 去 `status/error/default`(Dark red/300、Light red/100),**opacity 欄位為 15**(單位未確定,應係 15%);所以係「error 紅 15% 底」,唔係獨立顏色。

### 8.3 Notion 設計指引(唯讀,Confirmed)
來源:Design & Research / UI Design Workspace(Reference/Template)。
- **「Figma UI Design Guideline (keep updated)」**(最後編輯 2026-07-07)係版面間距權威,以 1920×1080(現用 1922×1080)為基準,重點:
  - Window 左右邊距 32(最小 24);頂部 → header 24;title → 內容 24;左右兩大欄 gap 48(40–64);footer divider → buttons 16;buttons → window 底 32。
  - Label → Input 8;Input → 下一 label 16;Heading → helper 4;form group 16;card gap 16;row gap 8。
  - **Text input 高 40(最小 36)、padding 12/16;Textarea 高 72、padding 12/16;Segmented/Tabs 高 32;Button 高 40、padding 12/24,Cancel 80 / Create 104 寬、gap 16;Tag 高 20、padding 4/8;Tick/checkbox 16;Package card 高 48、padding 8/12;Icon 24。**
  - Spacing token:Micro 4 · XS 8 · S 16 · M 24 · L 32 · XL 48 · XXL 64。
  - 原則:section gap > component gap;高度唔夠先減 24→16 section gap;solid purple 只留俾 Create/primary;selected card 用 border + soft fill;Create 右下 32px margin。
- **「Global Figma Function Rules of XRCC (keep updated)」**:頁面係**空白**。
- **「Tooltip Design Guideline」**(2026-07-10):12 方位;預設 `top`;gap 8;max 320;font **13/19**;padding 寫「水平 4 / 垂直 10」(疑似寫反);箭頭 10×10;底 `#1F1F24`、邊 `#5C4E7B`;fade 100–150ms;唔放按鈕/連結。
- **「UX/UI Design Handover – Lily Wong」**(2026-09-01):XRCC 檔案已於 2026-08-07 按功能重組;**XRCC (PC) 同 (XR/CAVE/HMD) library 同 design guidelines 「not finished yet」**;命名 `YYYYMMDD_Software version + function`;並列出待決定項目(Debug Mode UI、Asset Replace/Variant UI、Lighting Inspector、Setting Panel Devices I/O 等)。

**與 Figma 嘅出入(新增不一致,Confirmed)**

| 項目 | Notion 指引 | Figma Library |
|---|---|---|
| Text input 高度 | 40(最小 36) | 36 |
| Tooltip 字體 | 13 / 19 | `typography/en/tooltip` 12 / 16 |
| Tooltip 底色 | `#1F1F24` | 綁 `Color/Surface/canvas`(外部 variable) |
| Spacing XXL | 64 | 冇 `spacing/64` |
| Input padding | 12 / 16 | Select 8 / 8(Text Input 未量) |
| Tabs 高 | 32 | Connections Tab size L/M(未量) |

Claude 做法:版面間距、控件高度跟 Notion 指引(已寫成 Alan 嘅設計規則),顏色/圓角/字體跟 Figma token;出現不一致時於交付註明,唔自行取捨 Notion 與 Figma 之間嘅衝突。

### 8.4 其他 library / Figma 檔(Confirmed,結構層面)
- **XRCC(XR/ CAVE/ HMD) Library**(已訂閱,Workbench 亦啟用):Primitives 18(Neutral 0–900、**Votanic Band:Ultra Violet / Xenon Blue / Turkish Sea / Citrus / Blue Moon**、Error Red + Hovering、connected/Success)、Semantic 44(**component-first 命名**:`Button/Background-primary`、`Checkbox&Radio/…`、`Dialogue/…`、`Dropdown Select/…`、`Input/Border-error`、`Toggle/…`、`Text/Title-primary`、`Surface/background-primary`、**`Warning/Background-primary`、`Warning/Icon＆text-primary`**)、Font `XRCC XR Default`。搜尋未見已發佈 component。
- → XR 版**有 warning token,PC 版冇**;兩邊命名邏輯唔同(PC:role-first;XR:component-first),**唔好混用**。PC 畫面只用 XRCC (PC) Library。
- **20241209_XRCC3.0 XR_UI**:只有 2 個顏色(XR BG、Light Purple_XR)。
- **AI Quiz / Runtime Debug Panel**:本地 variable `AI Quiz Object`(24 色,Dark theme / Light theme)+ `Object Font Size`(7,mid/Big/small);呢套係**場景內物件(diegetic)UI**,同 PC 面板 token 分開。AI Quiz 頁面:UI Design、Project Sources、AI Quiz Object Design、Update(20260720 / 20260903)、UI flow、Design Element、Research。Runtime Debug Panel 頁面:00 Cover、01 Design、90 Local Components、99 Archive(同 Main Scene 結構一樣)。
- **XRCC Launcher**:冇 variable、冇 styles,頁面:Onboarding Wizard、Project、Content Library、Packages、Profile、Version、License、Settings、Connections、Download/Import Manager、Components、Prototype、Archive;靠 PC Library。
- **XRCC4.0 - Assets Panel**:冇 variable/styles;Asset Inspector 4.0、Special Object Button、UI 3.0 (Legacy)、Local Components。
- **Voyage360**:獨立系統——`UI colour`(23 色,Dark/Light Mode)、`Full Picture marking`、`Future List`、12 個 text styles、1 個 effect style。**唔可以用 XRCC token 做 Voyage360 畫面。**
- **Main Scene**(`M84FtPQGf4odQy2KTdxKIR`,索引表有列):冇 variable/styles,頁面結構同 Debug Panel。
- **Library 發佈情況**:XRCC Primitive collection **冇對外發佈**(只有 Theme 97 同 System 136 對外);所以外部檔只能綁 Theme/System,同「唔直接用 Primitive」嘅設計一致。
- **XRCC Claude Workbench**(Alan 2026-10-08 建立,`ZBOB48n4eLsZABCTnhh5kk`):已啟用 10 個 libraries(上述各項 + Launcher、Assets Panel、PC UI、Setting Panel);目前得 1 頁 `Page 1`。

### 8.5 Notion 行為資料(與本研讀相關)
XRCC 4.2 Joint Grilling Pack(2026-09-16)已接納:Remote Control 以**每專案 QR** 進入、冇 lobby(D-JD-02);全新功能、唔支援舊 Remote Trigger(D-JD-03);**server 內嵌 Launcher,XR 喺 Launcher 開 QR**(D-JD-04);**PC 用 shortcut/button 開 QR,server 只喺 Play mode 運作**(D-JD-05);API 按日後對外標準設計(D-JD-08)。**未決**:Remote Control UI authoring 範圍(D-JD-09)、Windows 防火牆體驗(D-JD-06)、HMD 連線方式(D-JD-07)。

### 8.6 仍未能核實
- XR library 嘅 warning variable 實際色值(未匯入讀取,避免改動檔案)。
- B 代外部 variable 屬於邊個 library。
- Main Scene、Voyage360 嘅 component 層面;Launcher/Assets Panel 各頁視覺。
- Notion 嘅 UX Decisions 逐功能頁(只讀咗設計指引、Handover、Joint Grilling Pack、Glossary)。

下一份文件:`20261008-claude-ui-workflow-playbook.md`(日後如何用呢套系統做 UI)。

## 補充:XRCC Launcher 讀取(2026-10-08,唯讀)
- 檔案 `18RvTL8PypmNuZIszfSRMV`:16 頁(Onboarding Wizard、Project、Content Library、Packages、Profile、Version、License、Settings、Connections、Download/Import Manager、Components、Prototype、Archive)。無 variable、無 styles;Components 頁 33 個 component set + 8 個單一 component。
- Project / Settings / Connections 三頁約 4,000 節點:大量使用 Library 的 Button(16px / Primary)、Tag、icons、Device Status;文字 style 混用新 `en/*` 與舊 `PC/Eng/*`。
- 仍有約 1,100 個 raw fill 及舊變數(`Neutrals/grey *`、`Colour/ Deep Purple`),`Dark Mode/ Primary` 屬舊 component。結論:Launcher 做新畫面時用 Library components + Theme token,舊 `PC/Eng/*` 與舊色板不沿用。
- 未讀:XR / CAVE / HMD library(未知檔案,需 Alan 提供連結)。
