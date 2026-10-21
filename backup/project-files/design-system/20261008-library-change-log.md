# XRCC (PC) Library 改動日誌(Claude,2026-10-08,Alan 授權)

所有改動都在 Library 檔草稿,需 Alan 發佈。可由 Figma 版本記錄還原。

## 新增(只新增)
- XRCC Theme:`status/warning/{default,text,icon,background}`(alias amber/200;background 為 amber/200 @15% rgba)。**已發佈**。
- XRCC System:`spacing/64`(附 codeSyntax)。
- 23 個 text style(`en/*` 12 個、`zh-hant/*` 11 個),family/size/line-height/weight 綁 System typography 變數。
- 10 個 effect style `shadow/dark/1–5`、`shadow/light/1–5`(值抄自 PC UI 檔)。
- 曾加 Text Input `size=40` 8 個 variant,Alan 指 28/36/48 正確,**已全部刪除**。

## 修改
- 10 個 component set 描述:去掉 "Candidate"(Button Primary/Secondary/Tertiary/Icon、checkbox、Select、OTP、Slider Bar、Text Input、text-area)。text-area 描述原寫「single-line」,已改為 multi-line。其餘文字不變。
- Variant property `Property 1` 改名:Button 40px / 48px / Header Listing / Behaviour tool / Header Button → `State`;Tag → `Type`。
- 刪除 Tabs 頁一個跑錯地方嘅 instance:`Connections / Dark / Components / Device bar`(node 17738:858,PC UI 檔 component)。

## 未做(保留並說明)
- 其餘 `Property N` / `VariantN` 命名(Logo & Images、Icon frame、Networking Panel、Pattern 01/02、Home Pattern 05、Design Symbols Header、Form 等):需知道每個值嘅用途先可改名,待 Alan 或設計者提供。Behaviour tool 選項 `nomal` 疑似拼錯(應為 Normal)。
- Avatar 頁 `img/mascot` frame、Pin field 頁 `_note/heading`、Popup 頁兩個同名 `Delete Creation Result`:可能有用途或被其他檔使用,未刪,待確認。
- 外部 kit variable / raw hex、`text/subtle` 對比度:未動。
- Tooltip:Alan 決定「Notion 規格舊,以現有檔案為準」,Library 不改。

## 補充(同日,token 審計)
- 新增 Primitive `unit/64`;`spacing/64` 改 alias 到它。
- 為 `status/warning/*` 補 codeSyntax。
- 新增 Theme `status/success/text`、`status/success/icon`(alias 同 `status/success/default`,附 codeSyntax)。
- 完整審計與待批准清單:`20261008-token-audit-and-proposal.md`。

## Token 優化(Alan 2026-10-08「全部跟你建議做」)
**新增(同日)**:System `spacing/28`、`spacing/36`、`spacing/56`(alias Primitive unit/28·36·56)、`typography/layout/{letter-spacing,paragraph-spacing,paragraph-indent}/default`(值 0,不發佈);Theme `border/faded`(白 7% / 黑 8%)、`surface/faded`(白 3% / 黑 3%)、`status/success/background`(成功色 15%,固定色值)。
**重綁第 1 批(已做,未發佈)**:頁面 Design tokens、Alert、Avatar、Badge、Button、Checkbox、Radio、Divider、Dropdown menu、Menu item、File upload,共約 3,800 個綁定由外部 kit / 舊遠端副本改綁 XRCC 變數。
對應規則:`Unit/xN`→`spacing/N`(x1-5=6 吸附 spacing/8);`Radius/Small→sm`、`Circular→full`、`None→none`、`Medium(6)→md(8)`、`Large(10)→md(8)`(視覺略有改變);`Font/Styles/Body 1·Body 2·Caption 1·Featured 5·Featured 6`→`typography/en/paragraph-1·paragraph-2·paragraph-4·heading-3·heading-4`;`Font/Weight/*`→`typography/font-weight/*`;`Color/*`→Theme(例:Foreground/Neutral→text/primary、Border/Neutral faded→border/faded、Background/Neutral faded→surface/faded、Background/Neutral→surface/elevated、Critical/Positive/Warning faded→status/*/background、Primary faded→selection/background/default);舊 XRCC 遠端副本按同名重綁。
**未動**:instance 內部覆寫;Caption 2(10px)、Featured 1(40px)、Unit/x18·x20、Color/Static/Black、Accents/Pink、Neutrals/grey、Brand/White、Shadow/Styles/Raised/*(約 170 個,無對應 token)。
**第 2 批頁面(Link 至 Tooltip、Popup、UI kit 等)**:系統權限擋住執行,待 Alan 確認後繼續。

## Token 優化最終掃描(2026-10-08,草稿,待 Alan 發佈)
- Reshaped「Slate」kit 及舊 XRCC 遠端副本的綁定已全面重綁到本檔 XRCC Theme / System 變數:約 12,000 處(含文字範圍綁定、效果陰影、instance 子層)。
- 無對應 token 的綁定已解除並保留原值:Font/Styles Featured 1(40px)、Body 3、Caption 2、Unit/x18、x20、Color/Static/Black、Accents/Pink、Neutrals/grey、Brand/White、Shadow/Styles/Raised/*、icon/status/black。
- Radius/Medium(6)、Radius/Large(10)已改綁 radius/md(8),Avatar、Menu item 圓角輕微變大。
- 殘留約 60 處:主要是舊 Button/Internal 元件內孤立來源節點的 Unit/x4、Unit/x5、Font/Styles 寬高綁定(Page 掃不到,視覺值不變),可於 Figma 內手動清理。
- 批 3:`text/subtle` Dark 由 neutral/700 改 neutral/500(對比 2.2 → 4.2);`text/debug/status` Light 改 neutral/900;`border/disable` 改名 `border/disabled`。
- 未做:Avatar 276 處、Tag 7 處 raw hex 改綁 token(顏色語義需 Alan 確認)。

## Avatar / Badge raw hex(2026-10-08,已發佈後)
- 新增 Theme token(Dark/Light 同值,raw):`avatar/{blue,red,green,yellow}/{foreground,background}`、`avatar/{red,green,yellow}/accent`,共 11 個;值取自 Avatar 原有色,視覺不變。
- Avatar / Badge 頁約 250 處 raw fill 改綁:avatar/* 、`surface/elevated`(#333333)、`text/secondary`(#c1c1c1,差約 12)、`surface/panel`(#0d0d0d/#191919)、Badge 的 #b89afa → `text/accent`。
- 未改:6% 以下透明白(overlay)、Figma 元件集虛線框(#9747ff,約 440 處,非設計內容)、單個 #00ffff 除錯色、Badge 內黑/白/紅各 1 處。
- 此批在 Alan 發佈之後做,需再發佈一次。

## Typography 精簡(2026-10-08,Alan 批准「好」)
**步驟 1 已做(未發佈)**:10 個 en text style 原地改名(style ID 不變,連結會跟隨):heading-1→`heading/xl`、heading-2→`heading/lg`、heading-3→`heading/md`、heading-4→`heading/sm`、paragraph-1→`body/lg`、paragraph-1-bold→`body/lg-bold`、paragraph-2→`body/md`、paragraph-2-bold→`body/md-bold`、paragraph-3→`body/sm`、paragraph-4→`caption`;description 同步更新。未刪除任何 style,未改值。
**待做**:Alan 發佈 Library → PC UI 檔把 `en/heading-5`(404)換成 `body/lg-bold`、`en/tooltip`(31)換成 `caption` → 刪除 heading-5、tooltip → zh-hant 用 variable mode 取代(System 只得 Base mode,需新增 mode)並刪除 zh-hant/*;typography variable 改名。
**步驟 2 已做(未發佈,Alan 批准「好」)**:System 加 mode `zh-hant`;新增 `typography/font-family`(Base→font/family/en、zh-hant→font/family/zh-hant);en 8 組 size/line-height variable 原地改名為 `typography/{heading/xl|lg|md|sm, body/lg|md|sm, caption}/{size,line-height}`;全部 23 個 text style 重綁到新 variable(bold 款共用 regular 嘅 size/line-height,weight 綁 `typography/font-weight/*`,family 綁 `typography/font-family`)。視覺值不變。
**未做(被權限擋住,待 Alan 明確指示)**:刪除 `en/heading-5`、`en/tooltip`、`zh-hant/*`(11)共 13 個 style;刪除多餘 per-style variable(family/weight/letter-spacing 與舊 zh-hant、heading-5、tooltip、bold 款);重綁 Library component 文字上嘅舊 variable。
**步驟 3 已做(2026-10-08,Alan「好 繼續」,未發佈)**:
- 刪除 text style 13 個:`en/heading-5`、`en/tooltip`、`zh-hant/*`(11)。Library 剩 10 個 style:`heading/xl·lg·md·sm`、`body/lg·lg-bold·md·md-bold·sm`、`caption`(全部綁新 variable,已驗證)。
- Library 內 30 頁、約 1,100 個 component 文字綁定由舊 variable 重綁到新 variable(0 錯誤)。Design tokens 頁 11 個中文示範文字設 `zh-hant` mode,保持 Noto Sans TC。
- 刪除 `typography/en/*`、`typography/zh-hant/*` 共 99 個 variable。System typography 剩 24 個:`typography/{heading/xl|lg|md|sm, body/lg|md|sm, caption}/{size,line-height}`(16)、`font-family`(mode Base=Roboto、zh-hant=Noto Sans TC)、`font-weight/*`(4)、`layout/*`(3)。
- 用法:中文畫面對 frame 設 System collection 嘅 `zh-hant` mode,同一套 style 自動轉 Noto Sans TC。
**發佈後待辦**:PC UI 檔約 436 個文字(原 heading-5 404、tooltip 31、zh-hant 1)會失去 style,需按字體+大小+行高重新連到 `body/lg-bold` / `caption` / `body/md`;其他消費 Library 嘅檔(Workbench、Launcher 等)如直接綁舊 `typography/en/*` variable 需檢查。
**步驟 4(Alan 已發佈 Library,2026-10-08)**:PC UI 檔(7SMhpQ4IVhnlA6G6wfwAgO)6 頁把 `en/heading-5` 404 個換成 `body/lg-bold`、`en/tooltip` 31 個換成 `caption`(值相同,0 錯誤)。剩 1 個 `zh-hant/paragraph-2`(XRCC UI 4.0)未動。PC UI 檔仍顯示舊名(en/paragraph-*),需在該檔 Assets → Libraries → Review updates 接受更新才會變新名。

## Primary 按鈕發佈同步(2026-10-08,Alan 同意「你做」)
- 現象:Library 檔 Button / Dark / Primary 係 48/36/28,但已發佈版本(PC UI 檔、Workbench 讀到)仍係 Large 40 / Medium 40 / Small 32;Publish 面板話 "No changes"。
- 處理:喺 `Button / Dark / Primary`(node 17463:54310 所屬 set)描述最後加 " Heights: Large 48 / Medium 36 / Small 28.",視覺不變,目的係令 Figma 重新標記為已改動。**需 Alan 再 Publish。**
**步驟 5(Alan 已接受 PC UI 檔更新,2026-10-08)**:更新後 PC UI 檔部分文字失去 style(約 100–300/頁,例如 paragraph-3、bold 款;多為 instance 內部文字)。已按「Roboto 字體+大小+行高完全吻合」重新連到 `heading/*`、`body/*`、`caption`(8 頁,0 錯誤,外觀不變)。UI Part 02 已驗證:未連結 1039→約 960。尚餘:各頁少量解析不到嘅 style(如 XRCC UI 4.0 約 21 個)、1 個 `zh-hant/paragraph-2`、舊 `PC/Eng/*` 約 5,300 個(下一步,待批)。
**步驟 6(2026-10-08,Alan「跟你建議做」)**:舊 `PC/Eng/*` 並唔係同一個字級:實際為 Paragraph 1=15/24、Paragraph 2=13/19、Paragraph 1_Bold=15/24 Bold、Paragraph 2_Bold=13/20 Bold、Heading 2=24/34、Heading 3=21/31、Heading 4=19/28、Heading 5=17/26、Paragraph 4=11/16(只有 Paragraph 3=12/16 吻合)。按「完全吻合」只換咗 67 個(Paragraph 3→`caption`),其餘約 5,200 個因字級不同未動(硬換會令字大小/行高改變)。待 Alan 決定:保留為舊畫面 legacy,定按最接近字級(15→16/24、13→14/20、17→16/24、19→18/24、21→20/28、11→12/16)批量換並接受外觀微變。

## 新增 Button / Dark / Icon Square(2026-10-08,Alan 揀方案 ②)
- Library `Button` 頁新增 component set `Button / Dark / Icon Square`(node 18013:2683,位置 x=0,y=640):方形(radius/none)icon-only 按鈕,取代 PC UI 檔舊 `Button / Dark / 40px`。
- Size:Large 48 / Medium 36 / Small 28(高度、寬度綁 `size/control/height/*`;icon 綁 `size/icon/24,20,16`)。State:Default(`surface/header`)/ Hover(`surface/canvas`)/ Disabled(`surface/disabled`,icon 40% 透明)。Icon 以 instance-swap property `Icon` 切換,預設 `icon/outline/arrow-left`。
- 只新增,未改動現有 component。**待 Alan Publish。**
**步驟 7(Alan 批准「最接近字級批量換」,2026-10-08)**:PC UI 檔 7 頁把舊 `PC/Eng/*` 約 5,200 個文字換到最接近嘅新 style:Paragraph 1→body/lg、Paragraph 1_Bold→body/lg-bold、Paragraph 2→body/md、Paragraph 2_Bold→body/md-bold、Paragraph 3·4→caption、Heading 2→heading/lg、Heading 3→heading/md、Heading 4→heading/sm、Heading 5→body/lg-bold。0 錯誤。外觀微變(字大小 ±1–2px、行高略變),需逐頁檢查溢出。未動:非 Roboto 或混合字體文字(UI Part 02 約 30 個)、PC/TC/*(9)、Desktop/BodyText(14)、product/launcher(2)、1 個 zh-hant/paragraph-2。
**步驟 8(2026-10-08)**:收尾。XRCC UI 4.0 嘅 1 個中文 `zh-hant/paragraph-2`(「無預覽」)試換 `body/md` 會變 Roboto,已還原為 Noto Sans TC 14(無 style)。`Desktop/BodyText/P1-16-regular`(14 個,Item Tag UI)實為 Inter、屬另一套系統,不動。`PC/TC/*`(9)、`product/launcher`(2)、約 30 個非 Roboto/混合字體文字不動。

## Variable Scope 審查(2026-10-08,Alan「所有 tokens 的 Scope 都幫我 review, set 好哂」)
掃描 298 個 variable(Primitive 112 / Theme 117 / System 69):**絕大部分原本已按角色設好**,只改 11 個,視覺不變,**需 Alan Publish**。
**現有規則(已確認,未動)**
- Primitive 全部 scope = 無(不出現喺任何 picker,只供 alias / 直接綁定);唯一不發佈:`color/cyan/500`。
- Theme:`text/*`→TEXT_FILL;`border/*`→STROKE_COLOR;`surface/*`、`status/*/default·background·hover`、`action/*/background/*`、`selection/background`、`notification/*`、`gradient/*`、`hierarchy/marker/*/background*`→FRAME+SHAPE FILL;`icon/*`、`status/*/icon`→SHAPE_FILL+STROKE;`behaviour/*`→FRAME+SHAPE+STROKE;`elevation/*`→EFFECT_COLOR。
- System:`spacing/*`→GAP;`radius/*`→CORNER_RADIUS;`size/*`→WIDTH_HEIGHT;`stroke/width/*`→STROKE_FLOAT;`elevation/offset/*`→EFFECT_FLOAT;typography→FONT_FAMILY / FONT_STYLE / FONT_SIZE / LINE_HEIGHT / LETTER_SPACING / PARAGRAPH_*。
**今次修改(11 個)**
- Primitive `color/blue/status`:ALL_SCOPES → 無(同其他 Primitive 一致)。
- Theme `action/primary/content/{default,hover}`:ALL_FILLS+STROKE → SHAPE+TEXT FILL+STROKE(同 destructive/selection content 一致,唔再出現喺 Frame fill)。
- Theme `avatar/*/foreground`(4)→ TEXT+SHAPE FILL;`avatar/*/background`(4)→ FRAME+SHAPE FILL(原本 4 個 scope 全開)。
**未動、待 Alan 確認**:`avatar/{red,green,yellow}/accent`(3,仍 Frame+Shape+Text+Stroke,用途未確認);`hierarchy/marker/{yellow,green}/foreground`(SHAPE+STROKE,是否亦用於文字?);`status/*/default`(Frame+Shape,是否亦用於文字/stroke?)。現時 ALL_SCOPES 變數 = 0。

## 2026-10-08 — Button / Dark / Primary: remove unused slot property
- Set 17463:54309 (Library De8nKqO81yciw4wH5xfpxA). Publish dialog listed it under "Invalid assets (1)": "Unused properties".
- Removed SLOT property `slot2#17828:29` (referenced by 0 layers). `slot#17828:0` kept (18 references).
- Remaining properties: slot, Size, Leading Icon, Trailing Icon, State.
- Approved by Alan ("刪 slot2"). Needs Publish, then Update all in the PC UI file.

## Icon 顏色審查(2026-10-08,Alan:「icon顏色都係有問題」)
- **Library 未改動**(只讀掃描)。
- 根因:Button/menu-item 內預設 icon 嘅 fill 係用 override 綁 `action/primary/content/default`(紫);用 instance-swap 換 icon 後 override 消失,新 icon 回復自身預設 `icon/inverse`(Dark = 白),所以 icon 白、字紫。
- Workbench 已修(rebind 到 `action/primary/content/default` 或 `icon/default`,只動 fill/stroke 綁定):Button/Secondary 45:106(雲)、48:322(遙控 icon)、menu-item 44:801、44:819、44:851、44:861。
- Library 待 Alan 決定(未改):Button/Tabs off、Header Listing、Behaviour tool、40px 嘅 icon 用 `icon/inverse` 而字用 `text/primary`;Select/Dropdown icon stroke 用 `color/neutral/white`(primitive,應改 `icon/*`);Popup icon 用 `color/neutral/200/300`、`color/purple/100`(primitive);Primary Loading 嘅 `load-1` 係 raw purple @35%;Workbench tooltip arrow stroke 係 raw `#5c4e7b`。
- 使用規則:swap icon 後,要將 icon 嘅 fill/stroke 重新綁返 button 內容色。
- (2026-10-08,Alan)Alert 應用 Library `Networking Panel / Dark / Pattern 02`(node 17463:33469);舊 `alert property table` 已由 Alan 刪除。Workbench 資產庫「檔案偏大」已由舊 alert instance(46:1154)換成 Pattern 02 Default(52:299),bell icon swap 為 `icon/outline/warning` 並重綁 `text/accent`。注意:Pattern 02 係 toast 樣式(黃色倒數條、關閉掣、單一文字層),冇 title/body 分層,亦冇 warning 色變體。
- (2026-10-08,Alan)Tabs 應用 Library `Connections / Dark / Components / Full Tabs`(node 17463:89539,3 個 variant:Microbit/Bluetooth/USB Serial,size L 高 36、gap 2、radius 8、可帶 icon)。Workbench 資產庫分類 Tabs(舊 45:118,size M 高 26)已換成 Full Tabs;因要 4 個 tab 而 Full Tabs 得 3 個,Workbench 嗰個已 detach 成 frame(內裏仍係 Library Tab instance,icon 關閉,寬 664)。Library 建議加 4-tab 或 N-tab variant 以免 detach。

## Notification(原 Alert / Pattern 02)命名、文案、用法(2026-10-08,Alan 指示)
- Library 頁 `Notification`,component set node 17463:33469:由 `Networking Panel / Dark / Pattern 02` 改名 `Notification / Dark`。Key 不變(2f86e8dc…);variant property(`Property 1` = Default / Variant2 / Variant3)、Close btn / Undo btn 屬性**不改**,現有 instance 不受影響。**唯一對外影響**:instance 圖層名(如未手動改)發佈後會跟住變名;Workbench 52:299 已手動改名 `Notification`。
- 範例文案(Library 預設內容,instance 內可覆寫):
  | 位置 | EN | zh-TW |
  |---|---|---|
  | Default(警告) | The file format or size is not supported yet. Please choose another file. | 尚未支援此檔案格式或大小,請選擇其他檔案。 |
  | Variant2(錯誤,倒數中) | Upload failed. Check your connection and try again. | 上傳失敗,請檢查網絡連線後再試一次。 |
  | Variant3(成功,精簡) | Project saved | 專案已儲存 |
  | 文件框 description | Short, non-blocking message that reports the result of an action, then dismisses itself. | 簡短、不阻擋操作的訊息,告知操作結果後自動消失。 |
  | 文件框 Hint | Pick the right pattern / Need a decision? Use a Dialog. Field error? Use inline text under the field. | 揀啱提示方式 / 需要使用者決定?用對話框。欄位錯誤?用欄位下方文字。 |
  (zh-TW 用字按 Glossary:專案、儲存;「網絡」係 Alan 平時用字,如 Glossary 另有寫法請改。)
- Set description 已寫入:定位、三個 variant 用途、屬性、適用/不適用、建議行為。
- **建議行為(Recommendation,未經開發確認)**:自動消失 4 秒(有 Undo 6 秒,錯誤留到手動關閉);hover 暫停倒數;同時最多疊 3 個;文案 = 發生咩事 + 下一步,最多 4 行;可用換行分出短標題(Workbench 資產庫「檔案偏大」嘅做法)。
- Variant2 = 倒數條行到一半(我按外觀判斷,非文件確認)。Variant3 內有隱藏嘅 `Go to Settings` 副文字同 setting-update icon(舊 placeholder,未動)。
- 兩個 text layer 圖層名改為 `Message`(內容不變)。
- Workbench 資產庫 instance 52:299:未改內容,只改圖層名;畫面要 Library 發佈後再更新才見到新 set 名。
- **待 Alan Publish**,之後 Workbench / PC UI 檔 Update library。

## Alert 元件組套用現有 tokens(2026-10-08,Alan:「幫我將 node 18031:3910 呢堆 components apply 現有 tokens」,未發佈)
- 範圍:Library「Alert (TBC)」頁 frame `alert property table`(18031:3910)內 `alert` component set(18031:3961,20 variants)+ 其 doc 外框。圖層名、variant、property 名全部不變。
- 規則:Unit/x1·x2·x3·x4 → `spacing/4·8·12·16`;Radius/Large(10)→ `radius/notification`;原生 8 → `radius/md`;icon 寬高 Unit/x4 → `size/icon/16`;icon 容器高(綁 line-height 20)→ `size/icon/20`;slot 高 Unit/x10(40)→ `size/control/height/40`;有 stroke 嘅邊 1px → `stroke/width/hairline`;doc 外框 padding 24 → `spacing/24`。
- 顏色(Dark):Neutral faded 底/邊 → `surface/faded`、`border/faded`(值完全相同);Foreground/Neutral → `text/primary`(文字)/`icon/default`(icon);Critical/Positive/Warning 前景 → `status/error|success|warning/text`(文字)、`…/icon`(icon);三色 faded 底 → `status/*/background`。
- 文字:Body 2/Regular(20)→ style `body/md`;Body 2/Medium(50)→ `body/md` + 字重綁 `typography/font-weight/medium`(冇 Medium style,保持原字重)。字體 Inter → Roboto。
- 群組 frame 設 XRCC Theme mode = Dark(原本係外部 Color mode Dark)。
- 數量:radius notification 10×4 角、radius md 11×4 角、spacing 4/8/12/16/24 共 160 處、stroke hairline 30、size 60、fills/strokes 綁 Theme 約 90、text style 70。0 錯誤。
- **未綁(原因)**:Primary(藍)變體前景/底/邊(`Color/*/Primary*`,Theme 冇對應藍色 info token,`status/blue/default` 值 #4589ff 同 #65a7ff 唔同且冇 faded 底/邊);Critical/Positive/Warning 嘅 faded 邊(16 個 stroke,冇對應 token);`Radius/Medium`(6,9 處,正好夾喺 radius/sm 4 同 radius/md 8 中間)。
- 視覺變化:字體 Inter→Roboto(換行略變);status 文字/icon 色改為 Theme 色(例:error #ff7a7e→#ff453a、success #76c28b→#37954b、warning #ea9c00→#c7843a);status 底改為 15% 透明色。
- 注意:action 文字係 instance 內嘅另一元件(`color=primary…`),我喺 alert 內 override 咗文字 style;該來源元件不在此群組,未改。`Label` 圖層、紫色 #9747ff 虛線框屬 Figma 文件框,不動。
- **需 Alan Publish。**
- (2026-10-08,Alan)Alert 改用 Library `alert`(Alert 頁 node 18031:2688,component set 18031:3961:inline × bleed × color neutral/primary/critical/positive/warning,有 title/text/actions/icon 開關)。該 set 尚未 Publish,Workbench 52:299 暫仍係 Pattern 02 toast,待 Publish 後換成 `color=warning, inline=false, bleed=false`、關閉 actions、icon swap 為 `icon/outline/warning`。不新增 token。
- (2026-10-09,Alan 批准)Library `alert` set(18031:3961)刪除冇用到嘅 instance-swap 屬性 `icon#6323:0`(icon layer 實際綁 nested `asset` 屬性),解除 Publish 時「Unused properties」錯誤。換 icon 改用 instance 上嘅 `asset` 屬性。
- (2026-10-09,Alan:「仲有另外兩個都幫我fix」)Publish 被「Unused properties」擋住嘅 4 個 asset 已修:
  - `alert`:刪走冇用嘅 `icon#6323:0`(見上)。
  - `avatar`(17463:34281):`initials#2387:0` 冇綁任何 layer;已將 120 個 type=initials variant 嘅 "JD" 文字 layer 綁到 `initials`(預設值 JD,視覺冇變)。
  - `meta`(17463:94873,Internal 頁):刪除冇 layer 用嘅 `link#9:0`。
  - `Status notification`(17606:1642,Icons 頁):刪除 9 個冇 layer 用嘅 text 屬性同 `Label` 開關,只保留 `Status` variant。
- 需 Alan 重開 Publish library 確認 Invalid assets 清零。
- (2026-10-09)Library 已 Publish。Workbench 資產庫警告改用新 `alert`(`color=warning, inline=false`,關閉 actions,icon 經 nested `asset` 屬性換成 `icon/outline/warning`,並重綁 `icon/default`),新 instance 66:376 取代舊 60:964(舊版仍用 neutral + bleed)。
- (2026-10-09,Alan:「UI UX 上你幫我執下UI」)Library `alert`(18031:3961)整理:① 5 個非 inline variant 嘅 title 由 `body/md` 改 `body/md-bold`(title 同內文原本同字重,冇層次);② 10 個 variant 嘅 root 圓角統一綁 `radius/md`(8)——原本只有 neutral 非 inline 用 `radius/md`,其餘 9 個用舊 `Radius/Medium`(6)。**需 Alan 重新 Publish。**
  - 未改、只列出:positive 款 Action 文字對底色對比約 4.2:1(<4.5);primary / secondary action 外觀完全一樣;外框 `radius/notification`(10)同內層 8 嘅關係;無 token 可用嘅項目不新增 token。

## Icon frame 重整(2026-10-09,Alan:「唔好次次都問,自動做」)
- Library `Icon frame`(component set 17847:582)由 16/24/24(誤名 32px)/40/48 改為 `Size` = 16 / 20 / 24 / 28 / 36 / 48。16/20/24 = 純 icon 大細(綁 `size/icon/*`);28/36/48 = Small/Medium/Large control height(綁 `size/control/height/*`),內裏 slot 為 16/20/24 並置中。
- 所有 padding / itemSpacing 綁 `spacing/0`(舊有 12 左右 padding 已移除),auto layout 置中。
- 刪除重複 24(`32px`,18052:666)同 `40px`(17847:640);原本無 instance。新增 20 / 28 / 36 variant,slot 共用同一個 slot property。
- 每個 slot 放預設 `icon/outline/arrow-left`;加 component description。Variant 屬性由 `Property 1` 改名 `Size`,Component set 原有 error 已消失。
- 注意:放入 slot 嘅 icon 顏色仍跟 icon master(`icon/inverse`),要手動綁 `icon/default` 或內容色。
- 流程偏好:Alan 要求 Library 改動直接做,唔再逐次詢問,做完列 diff。
- (2026-10-09,Alan 批准「可以改」)alert 再改:① 10 個 variant 嘅 primary action 文字改 `body/md-bold`,secondary 保持 `body/md`(分主次);② positive 款 primary/secondary action 文字由 `status/success/text`(#37954b,對比 4.19:1)改綁現有 `avatar/green/foreground`(#76c28b,約 7.4:1)。冇新增 token。備註:`status/success/text` 本身未改值,其他用到嘅地方(例如狀態 badge)對比仍約 4.2:1,如要全局提升,需 Alan 決定改該 token 值。**需重新 Publish。**
- (2026-10-09,Alan)Workbench 資產庫表格每行「更多」icon(`icon/more`,24px 直接放大)改用 Library `Icon frame`(Size=24,slot 內放 16px `icon/outline/more-horizontal`):6 行已換(新 id 70:266 / 70:274 / 70:282 / 70:290 / 70:298 / 70:306)。點由 4px 變 2.7px(符合 16px icon 規格)。規則:icon 應放喺 Icon frame 內用原生 16px,唔好將 icon 直接拉大到 24。
- (2026-10-09,Alan 揀方案 B)`Icon frame` 6 個 variant 嘅 slot 統一為 FILL 撐滿 frame(寬高跟 frame,不另綁 token),slot 內 auto layout 置中、icon 大細由放入嘅 icon 決定;清走隱藏 fill 同 slot 寬高綁定。預設 `arrow-left`:16/20/24 同 frame 一樣大,28/36/48 為 16/20/24。Description 已更新。

## Badge / Tag 整理(2026-10-09,Alan:「幫我執整下呢堆badge components」,node 17463:37912)
- 範圍:Badge 頁 component set `Tag`(原 9 個 variant,只有 `Type` 一個屬性)。本檔內只有 `Default` 有 2 個 instance(Badge 頁 meta preview),其他 variant 0 個;其他檔案嘅使用量睇唔到,Default 名同屬性名 `Type` 保持不變。
- Variant 改名(`Type=`):untagged→`Untagged`、unselect( tag)→`Unselected`、Variant7→`Unselected hover`、select( tag)→`Selected`、Variant8→`Removable`、remove tag→`Danger`、Variant9→`Add`,`Default` 不變。順序重排:Default / Untagged / Unselected / Unselected hover / Selected / Removable / Danger / Add,預設 variant 由 `untagged` 改為 `Default`。**Variant7/8 用途係按外觀推斷,請 Alan 確認。**
- 刪除:`my tag`(青色 #00ffff 除錯 variant,無 instance);`Default` 內隱藏嘅 close icon。
- `Add`:內嵌 `btn/add` 按鈕 instance 換成直接 `icon/outline/add`(16px)。`Danger`:✕ 移到尾端,同 `Removable` 一致。
- 圖層名統一:文字 `Label`、icon `Icon`;文字全部套 text style `body/md`(原本冇 style),hug 內容。
- Token:所有 variant 高度綁 `size/control/height/32`;左右 padding 綁 `spacing/8|12`(純文字 12/12、前置 icon 8/12、尾端 icon 12/8),gap 綁 `spacing/2`;`Danger` 底由 raw #a32929 綁 `status/error/default`(值相同);`Default`/`Unselected hover` 框由 `text/accent` 改綁 `border/interactive`(同值);`Selected` 移除 raw 黑色 stroke;`Selected`/`Removable` icon 色綁 `icon/accent`,`Danger`/`Add` 綁 `icon/default`。現時 set 內冇 raw 顏色。冇新增 token。
- 視覺變化:`Default` 寬 81→85(隱藏 icon 已移除);`Add` icon 色由白改 `icon/default`(neutral/200)。
- Set 加咗 description(各 Type 用途、高度/文字/圓角規格)。冇多餘 component property。
- 未做:冇 Size 軸(Tag 固定 32,屬 token `size/control/height/32`,如要 28/36/48 再講)。
- **需 Alan Publish,並於使用檔 Update library。**

## 2026-10-09 — Tab (17463:89529) 未選中/hover/選中樣式
- 問題:未選中底色 = surface/canvas(同頁面底一樣)、冇邊線,Tab 之間邊界唔清;hover 用 surface/row-hover(淡紫)同選中太似。
- 改動(只用現有 token,variant/property 名不變):
  - off:字 text/secondary、圖示 icon/secondary、底線 1px border/subtle
  - hovering:底 surface/elevated(中性灰)、字 text/primary、圖示 icon/default、底線 1px border/default
  - on:底線 2px border/interactive(其餘不變)
- 影響 Full Tabs 17463:89539 及所有 instance;需 Publish,Workbench 用 Update library。

## Button / Dark / Danger(2026-10-09,Alan「按你建議做」,已發佈)
- 新增 component set `Button / Dark / Danger`(Button 頁,放喺 Icon Square 左邊;key `8e9ee71044c591f5bd82b38de4fa119d2062b263`)。由 Primary 複製:Size(Large 48 / Medium 36 / Small 28)× Leading / Trailing Icon × State(Default / Hover / Disabled),共 27 個 variant。
- 只綁現有 token:Default 底 `status/error/default`、Hover 底 `status/error/hover`、文字及 icon `text/inverse`、Disabled 沿用 Primary(`surface/disabled`、`text/disabled`)。無新增 token;已移除 Loading state 及 slot property(不留未用 property)。

## 新增 `Badge` component set(2026-10-09,Alan:「我想好似呢啲咁嘅結構」,參考 Reshaped Design System v4.1 node 71:1318)
- Library Badge 頁新增 `Badge`(component set 18068:340,置於 `Tag` 右邊)。結構跟參考:`color`(neutral/primary/critical/positive/warning)× `variant`(solid/faded)× `size`(small/medium/large)× `rounded`(false/true)× `empty`(true = 純色點,只有 solid),另加 TEXT 屬性 `label`(預設 Badge),共 90 個 variant。屬性名用小寫,同 `alert` 一致。
- 尺寸:small 高 20(`spacing/20`,冇對應 size token)、medium 24(`size/control/height/24`)、large 28(`size/control/height/28`);文字 style `caption` / `body/sm` / `body/md`;水平 padding `spacing/8`;圓角 `radius/sm`(rounded=false)/ `radius/full`;點 8/12/16 綁 `spacing/8|12|16`。
- 顏色(全部現有 token,冇新增):neutral solid `surface/elevated` + `text/primary`、faded `surface/faded` + `border/faded` 框;primary(紫)solid `action/primary/background/default` + `action/primary/content/default`、faded `surface/header` + `text/accent`;critical/positive/warning solid `status/*/default`(文字:`text/primary` / `text/inverse` / `text/on-light/primary`)、faded `status/*/background` + `status/*/text`。
- 未做:參考嘅 `highlighted` 軸(較淺色調嘅狀態)——用途不明、冇對應 token,暫不加;primary 藍色冇 info token,改用品牌紫(action/primary)。Tag(可選取/可移除標籤)保持獨立。
- 預覽背景同 Tag 一致。**需 Alan Publish。**

## Tag 對齊 Badge(2026-10-09,Alan 問舊 Tag 係咪要同新 Badge 結合;決定:分開兩個 set,外觀對齊)
- `Tag`(17463:37912)加 `Size` = Small / Medium(高度綁 `size/control/height/28` / `36`,同 Button、Text Input 一致)同 `Rounded` = false / true(false 圓角 `radius/sm`、true `radius/full`,同 Badge 一致)。原 8 個 `Type` 值同名稱不變,共 32 個 variant。預設 variant `Type=Default, Size=Small, Rounded=false`。
- 原本固定高 32、圓角 8 → 改為預設 28 / 4:現有 2 個 `Default` instance(Badge 頁 meta preview)自動落喺 Small,高度 32→28、寬度不變(85)。
- Set 排版改為 4 欄 wrap grid(Small/Medium × Rounded),Badge set 右移避免重疊。Description 已更新(Tag 用於可互動標籤,Badge 用於顯示狀態/數量)。冇新增 token,冇多餘 property。
- **需 Alan Publish,並於使用檔 Update library。**

## Tag 頁文件填寫 + review(2026-10-09,Alan 新開 Tag page,node 18071:1483)
- meta 文案:description「Tags label and organize items. People can select, remove or add them to keep content easy to find and filter.」;hint「Tag or Badge?」+「Tags are interactive: people select, remove or add them. For read-only status or counts, use Badge instead.」(英文,同 Alert/Badge 頁一致)。
- Preview slot 原本放咗 Badge instance → 換成 4 個 Tag instance(Selected「Interior」、Unselected「Lighting」、Removable「VR ready」、Add),Medium、水平 gap `spacing/8`。
- `Tag` set 加 TEXT 屬性 `label`(預設 `Tag`),連結 Default / Unselected / Unselected hover / Selected / Removable / Danger 嘅 Label(原本佔位字 "Character" 已換走);`Untagged`、`Add` 固定文字。
- Tag set 因文字變短,wrap 排版錯位 → 改為手動 4 欄 × 8 列 grid(Small/Rounded false、true、Medium/false、true)。
- Review 備註(未改):① `Default`(紫字紫框)同 `Unselected hover`(白字紫框)外觀好接近,用途要界定;② `Selected` 嘅勾 icon 係 `icon/check`,其他係 `icon/outline/*`,Icons 頁冇 `icon/outline/check`,命名不一致;③ `Untagged` 文字 `text/disabled`(neutral/600)對比偏低,屬刻意 disabled 外觀。
- **需 Alan Publish。**
- (2026-10-09,Alan:「按你建議改」)Tag review 跟進:① `Unselected hover` 4 個 variant 嘅框由 `border/interactive`(紫)改綁 `border/strong`(neutral/200),同 `Default` 紫框區分;② check icon master 由 `icon/check`(17463:29026,全檔 30 個 instance,不受影響)改名 `icon/outline/check`,同其他 outline icon 命名一致(位置未搬到 Icons 頁);③ `Untagged` 保持刻意低對比 disabled 外觀,description 已註明;Tag set description 重寫(各 Type 用途)。**需 Alan Publish。**
- (2026-10-09,Alan)Tag 非 rounded 圓角應為 8:Alan 手動將 16 個 `Rounded=false` variant 改為 `radius/md`(8)(我之前對齊 Badge 用 `radius/sm` 4,作廢)。已核對 16 個 square 全部綁 `radius/md`、16 個 rounded 綁 `radius/full`;Tag set description 同步改為 radius/md。Badge 非 rounded 仍為 `radius/sm`(4),冇改。**需 Alan Publish。**
- (2026-10-09,Alan:「都改 8」)Badge 30 個 `rounded=false, empty=false` variant 圓角由 `radius/sm`(4)改綁 `radius/md`(8),同 Tag 一致;`empty=true` 嘅點保持 `radius/sm`(8px 點用 8 會變圓形,同 rounded 撞)。Badge description 已更新。**需 Alan Publish。**

## 2026-10-09 — 素材櫃 component 放喺 Workbench Components 頁(唔入 Library)
- Alan 指示:feature 專屬 component 放返自己 file 嘅 Components 頁,除非好通用先起 Library。先前喺 Library 開嘅「Asset card」頁(未 Publish)已刪除,Library 冇留低任何改動。
- Workbench「Components」頁(85:1541)新增 4 組,只 import Library 現有 token / text style / Button,冇新 variable,冇未用 property,已設 Dark + zh-hant:
  - Asset Thumb(87:137):Type = 3D model / Image / Audio / Video / Document / Motion / HDRI
  - Asset Status Chip(87:150):Tone = Ready 已就緒 / Large 體積偏大 / Failed 上傳失敗 / Queued 處理緊(文字跟 Tone,冇 property)
  - Asset Card(88:131):State = Default / Hover / Selected / Uploading / Failed;properties name、meta(TEXT)、thumb、status(INSTANCE_SWAP)。Uploading / Failed 嘅 chip 固定。
  - Asset Drop Zone(88:176):State = Default / Drag over;TEXT title、hint
- 素材櫃概念稿 72:273 嘅 8 張卡同投放區已換成上述 instance。
- (2026-10-09,Alan:「所有UI都以英文為主」)素材櫃概念稿 72:273 同 Workbench Components 頁 4 組 component 文案全部改英文,System mode 由 zh-hant 改 Base(Roboto)。Chip 文字:Ready / Large file / Failed / Processing;投放區 "Drop it here, we'll catch it";按鈕 Retry / Preview / Browse files。
- (2026-10-09,Alan:「所有UI都以英文為主」)Workbench「Claude Showcase — Asset Panel」44:64 全部 80 段中文文案改成英文,System mode 改 Base。冇改版面結構。

## 2026-10-09 — Library 全面 review 嘅改動(Alan 指示「Review 整個 library 同 components,睇下有咩要執」;全部喺草稿,待 Publish)
詳細發現同未做項目見 `reports/20261009-xrcc-library-full-review.md`。
- **Text style 連結**:Library 全部 component(不入 instance)內 557 個未連 style 嘅文字,按「字體 + 字重 + 大小 + 行高」完全吻合連去現有 10 個 style(heading/xl…caption)。數值唔變(原本已綁同一批 variable)。未連(約 79):Bold 10/12(40)、Medium 14/20·16/24·11/16(35)、40/44、SemiBold 等——冇對應 style,保留原狀。
- **Spacing / padding / radius 綁定**(只綁現有 token,冇新增):itemSpacing 138、padding 195、圓角 89,值完全相同,綁到 `spacing/2·4·8·12·16·24·32`、`spacing/control-inset`(padding 10)、`radius/sm·md·4xl·full`。未動:gap 10(54 個,`control-inset` 語意係 padding)、padding 1/42/60/80、radius 1198.8。
- **Avatar**:24 個 faded 底(白 3%)改綁 `surface/faded`。
- **Icon 亂碼名**(舊搜尋取代把 "ble" 換成 "bluetooth-low-energy"):9 個 component + 21 個內層名還原:`doubluetooth-low-energy-arrow-down/up`→`double-arrow-down/up`、`probluetooth-low-energym`→`problem`、`object-variabluetooth-low-energy`→`object-variable`、`project-variabluetooth-low-energy(02)`→`project-variable(02)`、`connectwithprobluetooth-low-energym`→`connectwithproblem`、`keywithprobluetooth-low-energym`→`keywithproblem`、`draggabluetooth-low-energy`→`draggable`。真正嘅 `icon/outline/bluetooth-low-energy` 保留。**消費檔 Update library 後 icon 名會跟住改。**
- **Component 描述**:重寫 11 個(Primary/Secondary/Tertiary/Icon、checkbox、Select、OTP、Slider Bar、Text Input、text-area、switch),移除舊嘅「Variant naming normalized…」模板句同錯誤嘅 property 列表(例如 checkbox 唔存在 Type);新增 21 個原本冇描述嘅 set(Header Button、40px/48px、Behaviour tool、Tabs、Header Tabs、Header Listing、Radio、dropdown-menu、popover、progress-indicator、.pin-field-item、.table-cell、table-column、Tab、Full Tabs、New Tooltips、舊 Switch「Form」);Notification 描述入面 `&amp;#39;` 還原做 `'`。
- **文檔文字**:Switch 頁「InputCheckbox」→「Checkbox」;Popover 預覽內嘅外來範本評語(「Code examples provided after each lesson…」)換成「Snap to grid is on. Hold Alt while dragging to place objects freely.」。
- **Design tokens 頁**:Typography 表更新為現行 10 個 style(去咗重複嘅 Heading 5 行),label 套用 style;Noto Sans TC 表改用 System `zh-hant` mode 示範同一套 style;Unit 表標籤改為 `spacing/N`,刪去冇 token 嘅 x1.5(重複)、x18、x20 色塊;Radius 表標籤改為實際綁定嘅 token 名。
- **留意**:`Asset card` 頁(18074:147,4 個 set)喺 review 中途由檔案消失(唔係今次改動),原因:按 Alan 指示,專屬 feature 嘅 component 改放工作檔 Components 頁(另一 thread 搬走),預期內。

## 2026-10-09(續)— Alan 回覆 review 後跟進(待 Publish)
**Variant property / 值命名統一**(只改 A 代 set,B 代小寫 kit 命名不動;只改 variant 名,冇動結構):
- `Property 1` → 有語意名:Button / Dark / Tabs `State`(On/Off)、Header Tabs `Tab`、Full Tabs `Tab`、Notification / Dark `Type`(Default / Countdown / Compact,原 Variant2/3)、Home / Dark / Pattern 05 `Type`(Card / Card Selected / Card Loading / Card Redownload / List / List Selected / Upload / Placeholder,原 Variant8 = 純色佔位塊)。
- Behaviour tool:`nomal`→`Normal`,`stage`→`Stage`,值 `Default / Hover / Selected`;Header Button `Light / Hover / Enabled`;Header Listing `Size`(Long/Short)、`Hover`。
- Text Input、text-area:`State` / `Size` / `Placeholder`,值 Title Case;Checkbox:`State` / `Check` / `Size`;Radio set「Form」:`State` / `Selected`(原 on)/ `Size`;Connections Tab:`State`(On/Off/Hover)、`Size`。
- 描述同步更新。**影響:** 消費檔 Update library 後,舊 variant 名會自動對應(同一 variant 改名);如有 instance 顯示「missing variant」請告知。
**新增 Focus / Hover variant**(全部係 Default variant 嘅複製 + 現有 token,冇新 variable):
- `State=Focus`(2px 外框 `border/interactive`,Danger 用 `border/strong`):Button Primary / Secondary / Tertiary / Danger / Icon(各 9)、Icon Square(3)。
- Text Input、text-area:`State=Hover`(框 `border/strong`,各 6)。
- Checkbox:`Hover`(框 `border/interactive`,已選填色 `action/primary/background/hover`)+ `Focus`(外框),各 9。
- Radio:`Hover`(外圈框 `border/interactive`)+ `Focus`(外框),各 6。
- `switch`:新增 property `state`(default / hover / focus;既有 24 個 variant 補 `state=default`),hover 填色 `action/primary/background/hover`,focus 外框;新增 24 個。
- 未做:Link、Menu item(`selection=highlighted` 已係 hover/keyboard 高亮)、Select(已有 Focus/Hover)。
**Text style 補連(58 個)**:Medium 字重(Switch label、Pagination、Pin field 數字)就近連去 Regular style(14/20→`body/md`、11/16→`caption`、16/24→`body/lg`);**Switch label 會由 Medium 變 Regular**。剩 Avatar 40 個 Bold 10/12 同 Internal 內部文檔字,未有對應 style,保留。
**All Figma files**:AI Quiz、Runtime Debug Panel、Main Scene 嘅 Features 填寫(Main Scene 暫寫「Main Scene UI」,冇確切資料,請按實情改;該行檔名未加連結);刪除 13 個 hidden 嘅舊 "Feature name" 文字。

## 2026-10-09 — Tab 去底線、改用顏色分層(Alan:「加底線有啲樣衰」),Full Tabs icon 修正(待 Publish)
- Tab(17463:89529)去除所有底線:Off = `surface/header` 底 + `text/secondary` 字;Hover = `action/primary/background/default` 底 + `text/primary`;On = `action/primary/background/pressed` 底 + `text/primary`;圖示一律 `icon/default`。Off → Hover → On 紫色漸深。
- Full Tabs(17463:89539)3 個 variant 入面 15 個 icon vector 原本覆寫成 primitive(`color/purple/100`、`color/neutral/200`、`icon/inverse`),已全部綁 `icon/default`。
- 需 Alan Publish,Workbench 做 Update library。

## 2026-10-09 — Responsive(Alan:「以後請記得responsive要做得好」)
- 素材櫃概念稿 72:273 改為全 auto-layout:標題列、操作按鈕、Toolbar、Footer 加 wrap;卡片 grid 合併成單一 wrap 容器,卡片 FILL + min 240;Tabs/Filters 設 min width。已用 1922 / 1440 / 1173 / 1024 寬度截圖檢查。
- Components 頁:Asset Drop Zone 加 wrap + 文字欄 min 240;Asset Card 設 min 240,Media FILL,縮圖及覆蓋層加 constraints,Asset Thumb 內容置中。注意 instance 唔會自動繼承主 component 嘅 wrap,drop zone instance 需手動設 wrap。

## 2026-10-09 — Workbench Asset Panel 重做(Alan:「重做 Workbench Asset Panel(縮圖三欄,active 用紫 tint + 左豎條)」)
- 新增 frame `20261009_Claude Redo — Asset Panel (PC)`(UI 頁,node 129:628,x=4324,y=1280),由「素材櫃概念稿」72:273 複製後修改;**舊 frame 44:64 同 72:273 冇郁**。
- 新增 Category rail(左欄 232px):8 個分類 + 右對齊計數(合共 24),Active = Library `menu-item` selected(紫 tint)+ 左側 3px 豎條(填色綁卡片選取外框用嘅現有 variable `border/interactive`,冇新增 token);icon 用 Library `icon/outline/*`。
- 移除原本頂部 Tabs,改為「All assets · 24」小標題(heading/sm)+ 搜尋 / 排序。
- 卡片 basis 統一 220(FILL,min 220),1920 下 4 欄;已用 1920 / 1440 / 1280 截圖確認會換行、冇爆版。
- 冇新增 component / token / variable,冇改 Library。

## 2026-10-09 — Breadcrumbs(node 18094:6818,component set `breadcrumbs-item` 18094:6353)套用現有 tokens(待 Publish)
Alan:「幫我 apply 返現有的 tokens」。只綁現有 variable / text style,冇新增 token。
- 20 個 variant:`Unit/x1` gap/padding-left → `spacing/4`、`Unit/x2` padding-right → `spacing/8`、icon 16px 寬高(`Unit/x4`)→ `size/icon/16`。
- 14 個文字:`Font/Styles/Body 2/*` 變數 → text style `body/md`(Regular 14/20);**current page=true 原為 Medium,現為 Regular**(冇 Medium style,沿用 Switch label 做法)。顏色:`Color/Foreground/Neutral` → `text/primary`、`…Neutral faded` → `text/secondary`、primary 色 `action/primary/content/default` → `text/accent`(同色值 #b89afa)。
- 內嵌 Reshaped kit instance(separator icon、collapsed 嘅 button-icon)嘅 override:vector fill → `icon/secondary` / `icon/default`;wrapper padding → `spacing/4`、radius → `radius/sm`、icon 尺寸 → `size/icon/16`、`size/icon/20`。
- 未處理:① slot 內 padding/gap 10(冇對應 spacing token);② separator icon、button-icon 仍係外部 kit component(`size=x3, color=neutral-faded`、`button-icon …ghost`),建議日後換成 Library 自己嘅 icon + Icon Button;③ 隱藏嘅 #ffffff fill(visible=false);④ 說明用 property table(紫色 #9747ff 虛線框)係 Figma 自動生成嘅文件,冇郁。
- 已截圖確認 Dark 下顯示正常。

## 2026-10-09 — Icons:`icon/outline/home` 換成 Alan 嘅 1px Home(待 Publish)
- Alan 畫咗新 Home icon(1px、24×24、圓角線頭)。Library 本身已有 `icon/outline/home`(17463:31498,舊款:被拆開嘅 group + 布林,冇圓角),所以**冇新增重複 icon**,直接喺原 component 內換內容,instance 會跟住更新。
- 內容:單一 vector `home`(屋頂 `M2 12 12 2l10 10`、牆身 `M4.5 9.5v12h15v-12`、門 `M9.5 21.5v-7a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v7`),stroke 1px、cap/join = Round,位置 (2,2),無 fill。
- 描邊顏色綁 `icon/inverse`(同其他 outline icon 如 arrow-left 一樣;Dark = 白);冇新增 token。`icon/solid/home` 冇郁。
- 已喺深色底截圖核對外形一致。**需 Alan Publish,消費檔 Update library。** 注意:放入按鈕/menu 後要重綁 icon 顏色(見 Icon 顏色審查)。

## 2026-10-09 — Pagination(node 17463:85183,component set `pagination`)套用現有 tokens(待 Publish)
Alan:「幫我 apply 返現有的 tokens」。冇新增 token。
- `Unit/x4` 寬高(117 處)→ `size/icon/16`;`Font/Styles/Body 2/Line height`(20,icon wrapper 12 處)→ `size/icon/20`;`Radius/Small`(4 處)→ `radius/sm`。
- 21 個文字全部連去 text style `body/md`(解除舊 `typography/en/paragraph-2/*`、`typography/layout/*`、`font/family/en` 綁定);**10 個 Medium 頁碼字重變 Regular**(冇 Medium style,同之前 Pagination 做法一致)。
- Hover 底色 `Color/Background/Neutral`(#333333,20 處)→ `action/neutral/background/hover`(#2a2531,微帶紫);Pressed 疊層 `Color/On background/Primary`(白色 12% 透明)→ `surface/inverse`(白),保留節點 12% opacity,視覺不變。
- 隱藏嘅 shadow frame 嘅 `Shadow/Styles/Raised intense` effect 變數 → effect style `shadow/dark/3`(最接近,非完全相同;該 layer 係 hidden)。
- 未處理:`Unit/x1-5`(6px)gap(15 處,冇對應 spacing token);slot 內 gap 10(34 處,冇對應 token)。
- 已截圖確認 Dark 下顯示正常。

## 2026-10-09 — 描邊 stroke align 統一 Inside 掃描(Alan 同意;部分待 Publish)
目的:Outside 描邊唔計入高度,令描邊 button 睇落大 1px;Inside 同 CSS border-box 一致。只改 strokeAlign,顏色/粗幼/token 全冇郁。
- 掃描全部 component 頁(Alert → Popup,32 頁)非 Inside 嘅描邊:Button Secondary/Tertiary、Text Input、Select、Checkbox 等**本身已經係 Inside**(冇需要改)。
- **已改:** `dropdown-menu`(17463:66152 `elevation=overlay`、17463:66159 `elevation=raised`)1px 描邊 Outside → Inside(320×120 保持不變)。
- **刻意保留 Outside(focus ring,唔係 border):** Button Secondary / Tertiary 嘅 `State=Focus` 共 18 個 variant;Pin field 嘅 `border` focus 外框(instance 內,例如 34/46/54 比 item 細 2px 嘅內環);Popover instance 內 `border`。曾經試改後已還原。
- 其餘 CENTER/OUTSIDE 命中全部係 Figma 自動生成嘅 property table 說明框(紫色虛線,頁面 `component` frame),唔係 Library component,冇郁。
- 需 Alan Publish,消費檔 Update library。

## 2026-10-09 — 4.2 Data Analytics & Connections UI 試做(Workbench `ZBOB48n4eLsZABCTnhh5kk`,**Library 冇改,毋須 Publish**)
- 新頁 `4.2 Data Analytics & Connections`(175:21),畫面共 DA-1..5、IM-1、DB-1..4、CN-1..5(node id 見 xrcc-4.2-data-analytics-connections/20261009-ux-proposal.md §9)。
- Workbench `Components` 頁(85:1541)新增 2 個 feature 專屬 component:`Record State Chip`(168:1096)、`Choice Card`(168:1147)。只用現有 token / text style;冇新增 token,冇改 Library component。
- 畫面內嘅 table、pill、dialog、sidebar 係用現有 token 砌嘅 auto-layout frame(未做 component):如果之後多個 feature 要用,可考慮將 status pill、data table 升級做 Library component。
- 已用 1024 寬(DB-2b、CN-2、CN-3)同 1920 寬(DB-2b)複製 frame 驗證 reflow,測試 clone 已刪除。

## 2026-10-09 — Workbench 新增本地變數集 `4.2 Copy`(Library 冇改,毋須 Publish)
STRING 變數 376 條,mode `Base`(EN)/`zh-hant`,綁定 4.2 頁所有畫面文字,用作中英切換。唔係 Library token;其他功能檔可照同樣做法。

## 2026-10-09 — Workbench 4.2 visual pass ("UI 仍然沉悶", Mobbin-informed)
No Library or token changes. Existing tokens only (surface/accent-muted, behaviour/*, status/*, avatar/*).
- CN-1b: Access Vault hero band + 4 stat tiles + coloured glyph tiles in profile rows.
- DA-1a/b/c: "Record journey" strip (participant → attempt → destination) under the title.
- DB-1: hero band with stacked-cards illustration + 3 stat tiles.
- IM-1a/b: hero band with file → grid illustration (error/success variants) + stat tiles.
- All new strings live in local collection `4.2 Copy` as `copy/v2-*` with zh-hant values.

## 2026-10-09 — Workbench「Studio feel」Launcher 試稿(Discord 感 research 落地;Library 冇改,毋須 Publish)
- UI 頁新增 frame `20261009_Claude Studio — Launcher (PC)`(node 239:1035,1440 寬,x=0,y=0)。背景:/mnt/project-files/research/20261009-xrcc-discord-feel-research.html 嘅報告(Artifact)。
- 結構:左 rail 248(Projects active = 紫 tint + 左 3px 豎條,狀態點:Packages 藍、Connections 琥珀;計數)/ 主區(Greeting、Quick switcher「Ctrl K」、「Pick up where you left off」大 band + 頭套插畫 / Recently touched 卡片格,每卡帶活動行 + 狀態點 / 右側 Nearby 裝置區)。
- 只用現有 token / text style / component:Button Primary、Secondary、Tag、icon/outline/*;冇新增 token,冇新增 Library component。
- 非 component 嘅自砌件(如日後多處用可升級做 Library component):Nav item(含計數/狀態點)、Presence row(Nearby 裝置列)、Quick switcher 輸入條、Status pill(warning)、Cover/頭套插畫(用 behaviour/* 色做裝飾)。
- 響應式:1920 / 1440 / 1000 寬度截圖檢查(rail 固定 248,主區 FILL,band、卡片格、Nearby 會換行);臨時 clone 已刪。800 寬冇逐個檢視。
- 文案英文為主;「Needs setup」警告用 status/warning token 自砌 pill(Library Tag 嘅 Danger 係移除確認用,太重)。

## 2026-10-09 — Library 更新轉化落 XRCC(Alan:「XRCC (PC) Library 我都剛剛更新咗好多野,轉化落 XRCC」)(Library 冇改)
重讀 Library 草稿 + 已發佈版本,同 component keys / token 文件對比(詳見 `20261008-xrcc-library-component-keys.md` 最底「下晝重讀」)。Workbench 審計(4.2 頁、UI 頁、Components 頁):
- **Component 版本:**已發佈 set 內全部 instance(UI 167、4.2 312)key 同現時發佈版對得上,冇需要換走;alert 已經係新 key。
- **已修正(Workbench 4:995「4.2 Remote Control QR — PC」):**63 個文字仲覆寫住已移除嘅舊變數 `typography/en/*` / `typography/layout/*`(System 由 159 減到 69),全部改為綁 Library text style(heading/md、body/md、body/sm、body/md-bold、body/lg-bold,按字號+字重對應),字號/行高外觀不變;已截圖核對。
- **未處理(要 Alan 決定/Publish):**① Select 同 switch 嘅草稿同已發佈版本唔同(見 keys 文件),Workbench 29 個 Select、3 個 switch instance 暫時保持用已發佈版本;② `icon/outline/check` 已消失,checkbox / Tag 內嵌嘅 check icon 要 Library Publish 後 Update library 先會跟;③ Library 提及嘅 `status/success/*`、`avatar/*`、Badge、Icon Square、Breadcrumbs、Popup 屬新增,現有畫面冇需要替換,之後新畫面直接用。
- 冇新增 token、冇改 Library、冇還原 Alan 喺 Workbench 嘅手動改動。4.2 頁(含 Copy 中英 mode)冇動過。

## 2026-10-09 — Studio feel:Quick switcher 概念稿 + Voice pass(Alan 於 research 報告留言「一齊做」;Library 冇改,毋須 Publish)
- Workbench UI 頁新增 frame `20261009_Claude Studio — Quick switcher (PC)`(node 240:1052,x=3702,y=0):Launcher 試稿複製 + 半透明 scrim(opacity 0.82)+ 置中 command palette(搜尋列、分組結果 Projects / Assets / Packages、選中行用紫 tint + 左豎條、關鍵字高亮 text/accent、底部快捷鍵提示)。
- 只用現有 token / text style / icon;palette 係自砌 frame,未做 component。若確定要做,建議升級成 Library 「Command palette」component(需工程評估 uGUI)。
- 新增文檔 /mnt/project-files/xrcc-studio-feel/20261009-voice-pass-launcher.md:5 條聲線規則 + 25 條 Launcher / Connections 字串建議(標明 Existing / Proposed),未套用到任何檔案。

## 2026-10-09 — Studio feel 第二輪:Connections + Packages 空狀態(Alan:「很好,有進步。繼續」;Library 冇改,毋須 Publish)
- Workbench UI 頁新增 2 個 frame(由 Launcher 試稿複製,換 rail active 同主區):
  - `20261009_Claude Studio — Connections (PC)`(node 247:1113,x=5242,y=0):標題、Vault band(鎖匙插畫,用 behaviour/* 色做裝飾)、4 個 stat tile、Profile 列表(glyph + 名稱 + 類型 + 使用數 + 狀態 pill)、底部說明。狀態 pill 全部綁 status/success|warning|error token,neutral 綁 surface/faded。
  - `20261009_Claude Studio — Packages empty (PC)`(node 247:1396,x=6782,y=0):虛線 drop 區、箱子 + 軌道插畫、「Nothing here yet」+ 一句說明 + 分類 Tag + Browse packages(Primary)/ Import from file(Secondary)。空狀態唔用 mascot,因為冇現成章魚素材,避免自創插畫風格。
- 文案套用 voice pass(#17、#19、#20–22);全部英文。
- 只用現有 token / text style / component(Button、Tag、icon);冇新增 token、冇新增 Library component。Status pill、Nav item、Presence row 係自砌,若多個 feature 用到可升級。
- 檢查:1440 寬截圖;Connections 另用 1000 寬 clone 檢查,Vault 標題原本被截斷,已改為可換行;Packages empty 冇試窄寬度;臨時 clone 已刪。
- Packages empty 畫面已移除 Packages nav 嘅下載藍點(冇下載時唔應該有)。

## 2026-10-09 — Select / Switch 決定後遷移(Alan:「Select 算係 Text Input 既變種」「Switch 頁只用依家四個」「已 Publish」)
**Library(待 Publish):**只改 description,冇改結構/token。
- `Form / Dark / Select`(17463… 實為 18112:10652,key 393f5f64…,已發佈):描述改為 Alan 嘅一句「Select lets you choose a single value from a list of options.」+ Text Input 變種說明(State Default/Focused/Disabled/Error、Size 28/36/48、Placeholder、Show helper、start/end slot;end slot 為 chevron;配 dropdown-menu / menu-item)。
- `Switch`(17463:86660,key cb05a257…,4 variants on/off × label):描述改為「Switch turns a single setting on or off immediately…」,移除「用細階 switch」嘅舊說明。注意 `label` 係掣內 On/Off 字,**冇外置 label**。
**Workbench(Library 以外):**
- 29 個舊 Select instance(UI 頁 6、4.2 頁 23)全部 `swapComponent` 到新 Select(Size=Medium):Filled → Default/Placeholder=False、Active → Default/Placeholder=True、Error → Error;`Value`/`Placeholder`/`Error Message` 文字重新填返,**4.2 Copy 字串變數綁定保留**(2 個本來就係硬字串:participant_id、OpenAI)。闊度 FILL/FIXED 不變,FILL 欄少數縮 9px;Asset Panel 兩個 Sort select 加 minWidth 210 避免截字。
- 3 個舊 `switch`(Asset Panel 三個畫面嘅 Options)換成新 Switch(on/off=True, label=False)+ 旁邊 body/md 文字 `Enable collision`,包成 auto-layout 「Switch row」(同 Checkbox row 一樣 gap 8)。
- 已截圖:Asset Panel 1920、DA-4a、CN-2、IM-1b 正常。冇新增 token / component。

## 2026-10-13 — 新增 Icon `icon/outline/chip`(Alan 畫嘅晶片 icon,待 Publish)
- Icons 頁 `Icons / Outline` frame 新增 component `icon/outline/chip`(18140:321,排喺最尾 x=728,y=468)。Library 原本冇 chip/cpu 類 icon,所以係新增。
- 24×24、1px、Round cap/join、單一 vector `chip`(外框 17×17 圓角 2、內框 11×11、每邊 5 支腳),無 fill,描邊綁 `icon/inverse`(同其他 outline icon)。冇新增 token。複製自 `icon/outline/home` 以沿用 component 設定。
- 已喺深色底截圖核對。**需 Alan Publish。**

## 2026-10-13 — 新增 Icon `icon/outline/cpu`(每邊 3 支腳嘅晶片款,待 Publish)
- Alan 第二張晶片圖:外框 16×16 圓角、內框 10×10、每邊 3 支腳。同 `icon/outline/chip`(5 腳款,18140:321)分開,新增 component `icon/outline/cpu`(18143:321,`Icons / Outline` frame 最尾)。
- 24×24、1px、Round cap/join、單一 vector `cpu`,無 fill,描邊綁 `icon/inverse`;冇新增 token。**需 Alan Publish。**

## 2026-10-13 — Behaviour icon 組重畫成統一 1px outline(Alan:「把這一埋icons全部用svg畫出 (1px), 全outline風格, 統一風格」,待 Publish)
- 範圍:Icons 頁 `behaviour` frame(17478:14764)。所有 icon:24×24、1px、Round cap/join、單一 vector、無 fill、描邊綁 `icon/inverse`(同 outline icon);冇新增 token。
- **原位重畫(名稱、component id 不變,instance 會跟住更新)**:`icon/flow`、`icon/math`、`icon/time`(碼錶)、`icon/variable`、`icon/Motion`(車)、`icon/video`(攝錄機+人像)、`icon/string`(文字框+放大鏡)。原本係混合 group/fill 嘅舊款;`icon/3DModel`、`icon/3D ` 今次冇郁。
- **新增(同 frame 最尾)**:`icon/xrcc`(18147:382)、`icon/folder-settings`(18147:389)、`icon/landscape`(18147:399)、`icon/music`(18147:407)、`icon/chat-bot`(18147:415)、`icon/robot`(18147:424)。
- 第 14 張(晶片)即 `icon/outline/cpu`(18143:321,今日較早已加,放喺 Icons / Outline)。
- 注意:`icon/music` 同 Outline 頁原有 `icon/outline/music` 概念重疊;`icon/xrcc` 係簡化 outline 版 X 標誌(原圖有立體切面,1px 版唔易表達)。已喺深色底截圖核對風格一致。**需 Alan Publish。**
- (2026-10-13,Alan:「這4個都與原版差太多, 重做」)`icon/landscape`、`icon/xrcc`、`icon/chat-bot`、`icon/robot` 跟原圖外形重畫(同 component,原位替換):landscape 加回太陽半圓+光線、雙山+雪線;xrcc 用方形切角 X + 立體切面斜線;chat-bot 圓角機械人頭+兩層疊泡;robot 方頭+側邊圓耳+寬肩身體。仍然 1px outline,描邊綁 `icon/inverse`。**需 Publish。**
- (2026-10-13,Alan:「可以在更大的框裡重做,例如 64/96px」)上面 4 個 icon 改用 96 格畫(描邊 4 = 縮到 24 後 1px)再縮入 24×24 component,細節更貼近原圖(太陽光線、雪線、X 切面、疊泡、機械人耳/肩)。Component 同 id、名稱不變,描邊仍 1px 綁 `icon/inverse`。**需 Publish。**

## 2026-10-13 — 還原被覆蓋嘅舊 icon(Alan:「我也要保留舊icon, 請幫我還原」)
- 我之前原位覆蓋咗 8 個同名 icon,屬錯誤做法(應另存新名)。已處理:
  - `behaviour` frame 嘅 `icon/flow`、`icon/math`、`icon/time`、`icon/variable`、`icon/Motion`、`icon/video`、`icon/string` **已還原舊款**(由已發佈版本經 SVG 取回,同原尺寸/結構一致:單一 Vector,string 為原本分組+遮罩;fill 重新綁 `icon/inverse`)。
  - 我畫嘅 1px outline 新版另存為同 frame 嘅 `icon/flow-1px`、`math-1px`、`time-1px`、`variable-1px`、`Motion-1px`、`video-1px`、`string-1px`(id 18151:321 / 331 / 344 / 352、18152:321 / 331 / 338)。
  - `icon/outline/home`(17463:31498)現時有兩個 vector:我畫嗰個(`home`)同另一個我冇畫嘅 `Vector`(22×19.5,應係 Alan 自己改過),**今次冇再郁**。舊結構(group+boolean)資料我有存底,Alan 要就可以重建。
- 新增名嘅 icon(`xrcc`、`folder-settings`、`landscape`、`music`、`chat-bot`、`robot`、`outline/chip`、`outline/cpu`)冇受影響。
- 規則:日後重畫 icon 一律另存新名(例如 `-1px`),唔覆蓋原有 component。**需 Alan Publish。**

## 2026-10-13 — Runtime Debug「Manage debug items」(Workbench 新頁 268:1285)
- 新頁 `Runtime Debug · Manage debug items`:6 塊 board(1 Entry ⋯ 選單、2 全部、3 篩選 Log + Undo、4 搵唔到、5 空白、6 窄/闊 360/640 responsive)。冇新增 token,全部綁現有 XRCC 變數同 text style。
- 新 component(只喺 Workbench Components 頁 85:1541,屬 feature 專用,**冇放入 Library**):`Debug Toggle`(271:115)、`Debug Item Row`(272:248,Default/Hover × W/L 組合 + Removed)、`Debug Group Header`(273:1808)。
- **Library bug**:`icon/outline/arrow-left` 內嘅 vector 有 -90° rotation,任何尺寸都顯示成向下「∨」(instance 內無法覆蓋 rotation)。Workbench 暫用 `icon/outline/fat-arrow-left` 做返回箭咀。建議 Alan 喺 Library 修正 arrow-left。
- Entry 畫面用 Alan 嘅 Runtime Debug Panel library(`Debug Review Panel`、⋯ 位於 tab 列右邊)+ Library `dropdown-menu` / `menu-item`(Remove all items 用 color=critical)。

## 2026-10-13 — 修 `icon/outline/arrow-*` 方向(Alan 要求)
- 原因:4 個方向 icon component(Icons / Outline 頁)本身被旋轉咗 -90°,內部 vector 又各自帶旋轉,instance 渲染就錯晒(left 變「∨」、up 變「<」、right 變「^」、down 變「>」);component 本身睇落啱,所以睇唔出。
- 修法:`arrow-up`(17463:31646)、`arrow-right`(31648)、`arrow-down`(31650)、`arrow-left`(31652)嘅 vector 改成直接畫好方向(rotation 0,線寬 1、MITER 不變),component rotation 重設 0(位置不變)。尺寸、名稱、component id 不變,instance 會跟住更新。
- 驗證:喺 Library 建 instance 逐個截圖,up/right/down/left/double-arrow-down/double-arrow-up 方向全部正確,之後已刪測試 frame。**需 Alan Publish**,Workbench 要 Update library 先見到;Workbench Debug 畫面暫用嘅 `fat-arrow-left` 之後可換返 `arrow-left`。

## 2026-10-13 — Manage debug items 補齊畫面(Workbench 頁 268:1285)
- 新增 board 7–14:Footer「Remove all…」scope 選單(7)、三個確認 dialog(8 全部 / 9 Watch / 10 Log)、移除後(11 全清空 + Undo toast、12 只清 Log)、Play 運行中 banner(13)、Locate tooltip(13)與跨 scene(14)。
- 新 component(Workbench Components 頁 85:1541,feature 專用,**冇入 Library**):`Debug Confirm Dialog`(316:145,text props title/body/impact 1/impact 2)、`Debug Toast`(316:150,message)。冇新增 token;破壞性確認用 Secondary 掣 + status/error 色。
- Library 已 Publish arrow fix 後,Back 掣由暫用 `fat-arrow-left` 換返 `arrow-left`(全部 panel header)。
- 待確認假設:變更下次 Play 先生效、Undo 時限、移除 Log 係咪同時清走既有 log 紀錄。

## 2026-10-13 — Manage debug items 改成「Debug items」tab(Alan 要求直接改 Workbench)
- 依 Toby 最新意見:Watch tab 換成 `Debug items`(tab 列 Debug items / Log / Warnings,仍用 Alan 嘅 Debug Review Panel tab 樣式 + ⋯),原本獨立「Manage debug items」畫面併入。全部 board(頁 268:1285)已同步:Header 改 `Debug Review`、拿走返回掣、加 tab 列、行加最新值(Log-only 顯示「—」)。
- `Debug Item Row`(272:248)新增 text prop `value`。冇新 token。
- 移除 footer「Remove all…」同 scope 選單 board;⋯ 係批量移除唯一入口。Board 重新編號 1–13(確認 7–9、移除後 10–11、Play 中 12、Locate 13)。
- 窄(360)時 tab 圖示收埋,淨文字,避免 `Debug items` 被切;tab 左右 padding 由 24 收到 10(instance override)。

## 2026-10-13 — Icon 顏色錯誤修正(Alan:「icon顏色錯誤問題已發生多次」)
- 問題:Debug items tab 選中時,文字係紫色(text/accent),但我換入去嘅 bug icon 係白色。原因係換 icon instance 會洗走顏色 override,跌返 Library 預設白色(icon/inverse)。
- 修正(Workbench 頁 268:1285,全部 board):tab 列 3 個 icon、Header bug icon 全部綁返同旁邊文字一樣嘅變數(選中=text/accent、未選中=text/primary);⋯、Locate(`Debug Item Row` 6 個 variant + 全部 instance)、空白/搵唔到 icon 綁 `icon/default`(#e5e5e5,同文字一致)。冇新 token。
- 檢查:全頁 icon 逐類審計,其餘(Close、check、undo、dialog 警告 icon=status/warning、alert icon=accent)已綁 token 且同文字一致。
- 防範:icon 顏色一律綁同旁邊文字相同 token,逐狀態(選中/未選中/hover/disabled)截圖核對;換 icon 後必須重綁。已寫入 team memory `feedback-icon-colour-follows-text-token`。

## 2026-10-13 — Debug items 文字層級(Alan:「對比同層級主次可以更明顯,可用 subtle」)
- 三層:primary(物件名、變數名、Header)→ secondary(最新值、未選中篩選 chip)→ subtle(輔助資訊)。全部綁現有 text token,冇新 token。
- 改為 `text/subtle`:`Debug Item Row` 嘅 meta(型別 · behaviour,7 個 variant)、`Debug Group Header` 嘅 scene 名同「N variables」、說明句、footer summary。未選中篩選 chip 由 primary 降到 secondary。

## 2026-10-13 — Debug Panel:複雜值、加闊、改名(Alan 要求)
- 全部 `Debug Review` 改名 `Debug Panel`(Header 標題、frame 名)。
- Panel 預設闊度 478 → 600(最窄約 360);Board 重新排位(間距 760),Responsive board 改為 360 / 480 / 720。
- 新組件(Workbench Components 頁,feature 專用,冇入 Library):`Debug Value`(323:2170,Type=Text / Vector3 / Color)。`Debug Item Row`(272:248)嘅值區改用 **Slot**(`Value`),新增 `Layout=Inline / Below` variant property:≥520 寬值喺右邊,窄於 520 值移去名下面;Row 高度改為 hug。原本 text prop `value` 已刪。冇新 token(色塊係示範用 sample 顏色)。
- 範例資料:Visitor count → `Spawn position`(Vector3,X/Y/Z)、Brightness → `Tint`(Color,#A71313 100%)。
- 待決定:非常長嘅 string 值(截斷 / 換行 / tooltip)。

## 2026-10-13 — Debug Panel 全面 review:簡化同補充(Alan 要求)
- 簡化:拿走說明句(「Variables with Watch or Log turned on…」)同 footer 計數(篩選 chip 已有總數);拿走 Header 重複嘅 bug icon(tab 已有);3 個確認 dialog board 合成 1 塊(7);Locate 兩個 board 合併入「Play 運行中 + hover hints」(10)。13 塊 → 10 塊。
- 補充:W / L hover hint(Watch latest value / Log value changes);搵唔到結果加「Clear search」掣;Header 標題同內容左邊對齊;長 string 值截斷規則(最闊 200,ellipsis),`Debug Value` Text 已設 maxWidth。
- 仍待決定:長 string 完整值(hover / 展開)。

## 2026-10-13 — XRCC (PC) Library:修 Publish 擋住嘅 Invalid asset「alert」(Unused properties)
- 原因:`alert` component set(18031:3961)有 boolean property `show icon`,但 10 個 variant 嘅 `icon` 層(root 下面第一個 instance)冇綁住佢,Figma 當成 Unused property,Publish 失敗。
- 修正:10 個 variant(inline × 5 色)嘅 `icon` 層 visible 全部綁返 `show icon`(預設 true),外觀、variant 名、其他 property 都冇變;冇新 token。
- 檢查:Library 其餘所有 page(Notification、Avatar、Badge、Tags、Breadcrumbs、Button、Checkbox … Popup、Internal、Icons、Logo 等)逐個 component / component set 審計,冇其他 Unused properties。
- 下一步:Alan 喺 Library 檔案 Publish。

- 2026-10-13 Board 10 banner icon: icon/activity (pulse, not part of outline set, wrong meaning) swapped to icon/outline/info-circle, 16px, stroke bound to the banner text token.

- 2026-10-13 Workbench: added Board 11 'Debug Panel · Tooltip list' (inventory of 11 tooltips + 5 no-tooltip cases + behaviour rules), uses Library New Tooltips and Debug Toggle only, existing tokens only.

## 2026-10-13 — Tag 屬性重整(Alan:「Tags components 係咪太複雜難明」,node 17463:37912)
- 診斷:32 個 variant 其實係 8 款設計 × Size 2 × 圓角 2。難明嘅原因:① `Type` 一個軸混咗「種類」(Untagged / Removable / Add)同「狀態」(Unselected / Unselected hover / Selected / Danger);② `Default` 同 `Unselected` 名睇唔出分別;③ `Full round = true/false` 係 boolean 式命名,唔知 false 係咩形狀。
- 改法(原地改 variant 名,variant 數量、外觀、token 綁定、node id 全部不變,所以 instance 唔會斷):
  - `Type` = Label(原 Default)/ Choice / Removable / Add / Placeholder(原 Untagged)
  - 新增 `State` = Default / Hover / Selected / Danger。對應:Unselected→Choice+Default、Unselected hover→Choice+Hover、Selected→Choice+Selected、Removable→Removable+Default、Danger→Removable+Danger;Label / Add / Placeholder 只有 Default。
  - `Full round` true/false → `Shape` = Rounded(radius/md 8)/ Pill(radius/full)。
  - `Size` 維持 Small 28 / Medium 36(Tag 冇 Large 48,冇人要求就唔加)。
- 排版:行次序改為 Label、Choice×3、Removable×2、Add、Placeholder(同種類排埋一齊)。Description 改為英文並寫明各 Type 可用嘅 State。
- 影響:Library 內 4 個 instance(Tags 頁 preview)已核對,props 自動跟新名(Choice/Selected、Choice/Default、Removable/Default、Add/Default)。其他檔嘅 instance 睇唔到,但因 variant 係原地改名(key 不變),Update library 後會自動跟新屬性名,如有 override 個別檔要抽查。冇新 token、冇刪 variant。
- **需 Alan Publish**,再喺 consumer 檔 Update library。

## 2026-10-13 — Tag 顏色 / spacing / 字體審視(Alan:「顏色,spacing和字體大小有需要改善嗎?」)
- 審計:全部顏色、padding、高度、字體已綁 token / `body/md`,冇 raw 值。對比:Removable(text/accent 喺 #392e52)約 5.4:1、Danger(text/primary 喺 #a32929)約 5.7:1 OK;Placeholder 約 2.9:1 屬刻意 disabled。
- 發現並修正(只用現有 token):
  1. `Choice / Selected`(4 個)原本冇框、底色同 surface/canvas 一樣,擺喺 canvas 面板上會「消失」,只剩字同勾 → 底色改綁 `action/primary/background/default`(同 Removable 一致:紫底 = 啟動)。
  2. `Placeholder`(4 個)底色 surface/disabled 同 canvas 數值相同,同樣隱形 → 加 `border/default` 1px 虛線(4/4),表達「空位」。
  3. 有 icon 嘅 variant(Selected、Removable、Danger、Add,共 20 個)字同 icon 間距 2 太迫 → 綁 `spacing/4`。
- 冇改(刻意):Small / Medium 都用 body/md 14px(同 Button、Text Input 一致);padding 8/12、icon 側 8 係視覺補償。
- 副作用修復:Placeholder 文字曾被重置成「Tag」,已還原「Untagged」。**需 Alan Publish。**

## 2026-10-13 — Tag 極簡化:Slot + 刪除/整合 variant(Alan:「我想極簡化,使用 Figma Slot」「刪除或整合 variant」)
- 結構:32 → **24 個 variant**。屬性只剩 `Style`(Accent / Outline / Filled / Danger / Subtle / Dashed)、`Size`(Small 28 / Medium 36)、`Shape`(Rounded / Pill),加一個 **Slot `Content`**(文字 + 任何 icon)。舊 `Type`、`State`、`label` 文字屬性已刪(label 改為直接喺 slot 內改字)。
- 整合:Selected(Choice)+ Removable Default 外觀一樣(紫底)→ 合併為 `Filled`;✓ / ✕ 由 slot 內容決定,唔再係 variant。
- 刪除:`Choice / Hover` 4 個(hover 係互動狀態,prototype 用 border/strong);`Removable / Default` 4 個(併入 Filled)。
- 對應:Label→Accent、Choice Default→Outline、Selected / Removable Default→Filled、Danger→Danger、Add→Subtle、Placeholder→Dashed。
- Slot 預設內容:Subtle「+ New tag」、Danger「Tag ✕」(icon 綁 text/primary)、Dashed「Untagged」,其餘「Tag」。icon 用 icon/outline/add、icon/outline/close,顏色綁同文字一樣嘅 token。Padding 統一左右 spacing/12,slot 內 gap spacing/4。冇新 token。
- 影響:Library 內 Tags 頁 preview 4 個 instance 已重建(Interior ✓ / Lighting / VR ready ✕ / New tag)。**其他檔嘅舊 instance**(用 Type/State/label)Update library 後會跳去最近嘅 variant,label 文字 override 會失,Selected / Removable 要手動喺 slot 加 ✓ / ✕,需逐檔抽查;已用 Tag 嘅檔睇唔到,請 Alan 留意。
- **需 Alan Publish。**

## 2026-10-13 · Runtime-Debug-Panel · 「Update (06/10/2026)」套用 XRCC Theme token
檔案 `1fAQ8bgTaI2RWLYJRBb3Aw`(Runtime-Debug-Panel),node 4839:25184。**只綁現有 XRCC Theme 變數,冇新增 token、冇改版面/文案、冇刪嘢。**
- 範圍:304 個節點嘅 fill/stroke,由舊 collection(XRCC_Test、Variable collection、XRCC Foundations、XRCC Semantic)、直接綁 Primitive、或 raw hex,改綁 Theme(數值完全相同,畫面冇變化)。
- 對應:text #fff→`text/inverse`(46)、#e5e5e5→`text/primary`(53)、#818181→`text/subtle`(39)、#c8c8c8→`text/secondary`(4)、#b89afa→`text/accent`(16);surface #161616→`surface/panel`(38)、#1e1e21→`surface/canvas`(17)、#2a2531→`surface/header`(13)、#e5e5e5 滾動條/#b89afa 掣→`icon/default`/`icon/accent`(10);icon #e5e5e5→`icon/default`(21)、#b89afa→`icon/accent`(37)、#fff→`icon/inverse`(3);border #545454→`border/default`(6)、#b89afa→`border/interactive`(4)。
- 之後 Theme 綁定 1926 個 paint;餘下 65 個未對應(見下),刻意保持不變。
- **未能對應(保持不變)**:#191d22 Debug Review/Runtime panel 內容底(13,Theme 冇相同值,最近 `surface/panel` #161616 / `surface/canvas` #1e1e21);Tooltip 箭咀描邊 #5c4e7b(4,Theme `border/tooltip` 係 #4b387d);section 底 #f6f6f6 同標題黑字 #000(畫布標註,非產品 UI);色板 swatch #d9d9d9 / #a71313(資料示例);Logo #5e4b8a;Header 內 #5f4b8b 文字;Notification 黃形 #f9ac2f(Theme warning 係 #c7843a);Annotation 高亮 #e5ac00、連接線 #aaaaaa、Footer 描邊 #343941、icon 元件集底 #464646 / #9747ff、dim #000、Option 2 底 #111116。
- Library 內部(Boolean 底下)嘅 bug / drag 圖示 child 有 raw #85909c/#fff stroke,但顯示色由 Boolean 父層 fill 決定(已綁 Theme),唔會影響畫面,未改。
- 描邊:仍有 139 個 stroke 係 Outside(多數係 Library / 隱藏 frame),未動以免改變尺寸。
- Component:盤點到 Button / Dark / 40px、Primary、Secondary、Select、Text Input、checkbox、New Tooltips、Notification、icon/* 已係 Library instance;本地 `icon`(btn/debug)、`Icon frame`、`drag2`、`Watch` 等係本檔自建,未換。

- 2026-10-13 Workbench Debug Panel: filter chips re-synced to the updated Library Tag (slot Content): labels restored (All 8 / Watch 5 / Log 5), Filled = selected, Outline = others, Small Pill. icon/outline/check (key c1e49836…) could not be imported (not published), so selected chip has no check yet; add when Library republished.

- 2026-10-13 Workbench Board 7: confirm dialogs now use Library popup 'Delete Creation Result' (key 255fa2f6…) with our copy, per Alan (use this popup style for now). Debug Confirm Dialog component kept on Components page but unused on boards. Board 7 widened to 1200, boards 8/9 shifted +80.

- 2026-10-13 Workbench prototype wired (Debug items start; also Empty state, While Play). New boards 7b (confirm Remove log), 7c (confirm Remove watch), 9b (after Remove watch). Board 7 trimmed to single popup; row 2 relaid out (7,7b,7c,8,9,9b). Prototype: https://www.figma.com/proto/ZBOB48n4eLsZABCTnhh5kk/XRCC-Claude-Workbench?page-id=268-1285&node-id=274-662&starting-point-node-id=274-662

- 2026-10-13 Debug Panel Locate icon shows "<" (調查,未改 Figma): Debug Panel (1fAQ8bgTaI2RWLYJRBb3Aw) 嘅 Debug Item Row 係由 Workbench 發佈嘅 library component (key a2c65ca0… set / eac592c2… variant)。Workbench 本地版 Locate 掣 icon 已換成 icon/outline/target(b5c6e796…,12 個 variant 全部),但 Debug Panel 載入嘅版本仍係 Button Square 預設 icon/outline/arrow-left(5ae2baa4…),即係 Workbench 呢個改動未 Publish 或 Debug Panel 未 Update library。修法:Alan 喺 Workbench Publish library,再喺 Debug Panel Update library。

- 2026-10-13 Workbench: added 22 short Figma annotations (Cantonese/English, no category, same style as Alan's search note) across boards 1-4, 5, 7/7b/7c, 8, 9, 9b, 10. Open questions flagged in notes: Undo window, whether removing Log clears history, changes apply next Play.

- 2026-10-13 Debug Panel Locate icon 真正原因(更正上一條):Publish + Update library 後仍然錯。Workbench 嘅 Debug Item Row 用 Button Square 嘅 instance-swap property `Icon#18013:9` 揀 target,property 值存成 Workbench 檔內部 node id `272:157`,Debug Panel 解析唔到,fallback 成 Button Square 預設 arrow-left。即係 library 發佈後 Row 內嘅 icon swap 唔會跟到去第二個檔。Debug Panel 試貼 Row(5201:35851)已用 `setProperties` 將 Icon 設成本檔 import 嘅 icon/outline/target(5064:15860),顏色保持綁 icon/default,冇新 token。每次貼新 Row 都要重做;根治要改 Workbench Row 嘅 Locate 做法(見 reply)。

- 2026-10-13 Workbench 根治 Locate icon:Components 頁新增本檔 component `Debug Locate Icon`(360:170,16x16,內含 target instance,fill/stroke 綁 icon/default,冇新 token),Debug Item Row 12 個 variant(Removed 無 Locate)嘅 Locate Icon property 全部改指住佢,取代之前存 remote id 嘅 target。本檔 component id 發佈後可跨檔解析。Alan 要 Workbench Publish → Debug Panel Update library 後再測貼 Row。

- 2026-10-13 XRCC4.0 PC UI(7SMhpQ4IVhnlA6G6wfwAgO)Behaviour Library 面板修爛:原因係 `Block - Start` 嘅 instance override 被綁錯 token——block 標題底色綁咗 text/primary(#e5e5e5,標題字同色所以隱形)或 color/amber/200,"True" / "False" / "Help?" frame 多咗 text/primary 灰底(變成灰條),分類 tab 嘅 General Event 用咗 Orange variant 而唔係 Behaviour 色(behaviour/general-event = color/red/300),unselected tab 文字綁 color/neutral/800、selected tab 嘅 logo 綁 neutral/800(深色)。修正(全部用現有 token,冇新增):
  (1) Components 頁 `Design Guidelines / Components / Skybox` 4 個 variant 共 30 個 Block - Start instance:標題底色綁返 behaviour/general-event / item-event / flow-control / variable(跟 variant),清走 True/False/Help?/Text frame 嘅多餘灰底,General Event 第一個 block 隱藏空白 True 行。
  (2) `Event Category List`(4071:333473)同 4 個 variant 內嘅 instance:General Event tab 改 red variant(color/red/300),Item Event tab 改 Orange variant,unselected 首 tab 文字綁返 text/primary,所有 tab 嘅 icon 向量 fill/stroke 綁成同該 tab 文字一樣嘅 token(105 個)。
  (3) 用到呢個 panel 嘅 13 個畫面(UI Part 02 × 10、XRCC UI 4.0 × 3)同 Components 頁 2 個 Skybox instance:header 底色綁返 behaviour/general-event,多餘灰底清走,首 tab 底色 override(amber/200)改綁 color/red/300,icon 綁文字 token。
  (4) `Block - Start` master(4071:316622)header 由 raw #eb9330 改綁 behaviour/general-event。
  未動:master 係「全部 row 都擺晒」嘅 kitchen-sink 做法,各 instance 靠隱藏 row 組合;Library 面板入面 block 仍係 placeholder 文字(全部叫 Start、row label 係 Text),Flow Control(藍 tab/olive 標題)同 Variable(橙 tab/綠標題)tab 顏色同標題色唔一致,舊設計原樣保留。

- 2026-10-13 Workbench: per Alan, removing a variable's last W/L now deletes the row directly and shows a Library Notification / Dark (no Undo, no greyed 'Removed' row). Board 3 updated (Queue length row + Ticket Desk group removed, chips All 7 / Log 4, notification added); popups no longer promise Undo; annotations/notes/board names updated; tooltip list 'no tooltip' row renamed. Boards 8/9/9b notifications were already swapped by Alan.

## 2026-10-13 — Debug Panel: Log and Warnings tabs (Workbench file, page 268:1285)
- New feature components on the Workbench "Components" page (not in the shared Library): **Debug Log Entry** (State Default/Hover; text props name/meta/time; Change slot for before → after) and **Debug Warning Entry** (State × Locate On/Unavailable; text props time/message/source/count; Show count boolean). Existing tokens and text styles only, no new tokens.
- New boards 12–17 (row 4): Log with data, Log empty, Log limit banner, Warnings with data, Warnings empty, Warnings limit banner. Limit banners reuse the Library alert (warning, inline).
- Prototype: Debug items / Log / Warnings tabs now navigate between boards on every board. Short annotations added on the new boards.
- Open for dev: log limit (500) and warning limit (100) behaviour, Locate tooltip copy when the source is gone.

## 2026-10-13 — Workbench: boards rearranged into a user-flow map (page 268:1285)
- Boards repositioned by flow: Debug items hub in the middle row; Log and Warnings tab boards above it; ⋯ menu below, then confirm dialogs, then results. State-only boards (Empty, While Play running) sit beside the hub without arrows.
- 15 "Flow Arrow" lines (group "Flow arrows") in the same purple style as Alan's sample, with short labels. The plugin API cannot create or re-anchor connectors, so these are vector lines: they do not follow if a board is moved.
- Alan's original sample connector kept, parked at the left beside the Notes.
- 2026-10-13 (re-layout): boards now sit on a grid (880 × 956 px steps, 200 px column gaps, 120 px row gaps) as a left-to-right tree: Debug items hub in column 0, Log / Warnings / Filter / Search / ⋯ menu in column 1, states and confirm dialogs in column 2, results in column 3, Tooltip list in column 4. Arrows redrawn to match (Log and Warnings empty/limit states branch from their tab boards). Board numbers unchanged.
- 2026-10-13 (prototype pass): removed the Search → "no results" link from Log/Warnings boards (it jumped to the Debug items tab), Esc now closes the ⋯ menu and the three confirm dialogs back to Debug items, flow starting points renamed and extended to Log, Warnings, ⋯ menu and the empty/limit state boards. Arrow labels moved clear of the shared trunk lines.

## 2026-10-14 — Color system list (XRCC (PC) Library, page "Design tokens", frame "color" 17463:26740)
- Built a documentation frame "Color system list" (18192:302) inside the empty `main` area of the existing "color" frame. Alan's left `meta` panel untouched. `main` is fixed at 1601 wide (it hugged to 500 once content went in).
- Contents: intro + layer counts (Primitive 70 / Theme 117 / System 0 colors), Primitive palette by family (13 families, with "feeds" and used-by counts, 11 steps flagged "unused"), then all 117 Theme tokens in 13 groups (Surface, Text, Icon, Border, Action, Selection, Status, Notification, Brand gradient, Elevation, Hierarchy markers, Behaviour nodes, Avatar). Each row: Dark + Light swatch (explicit mode), token, alias + HEX per mode, short English usage.
- Built with Auto Layout only, wrap rows; swatches, text fills, spacing and radius bound to existing variables; text uses existing text styles. No new tokens, no new components, nothing published needs changing.
- Checked at main width 900 / 1601 / 2400.
- Static documentation: values are read from the variables at build time and are not live text. Re-run if tokens change.
- Findings (not changed): unused primitives neutral/250, neutral/black, magenta/100, magenta/600, indigo/200, blue/100, cyan/100, cyan/300, cyan/500, cyan/accent, yellow/200; status/blue/default naming and description; border/tooltip description copy of border/interactive; status/error/default description says red/200; hierarchy marker "pink" maps to magenta; avatar/* and status/*/background are raw values, not aliases.

## 2026-10-14 — Color token fixes after the Color system list review (XRCC (PC) Library)
- Per Alan ("幫我fix"; Behaviour tokens must not change). Behaviour/* untouched.
- Renamed `status/blue/default` → `status/info/default` (same variable, bindings kept). Description now says info/in-progress, no longer copied from success.
- Descriptions fixed: `border/tooltip` (tooltip outline), `status/error/default` (red/300 Dark, red/100 Light, not red/200), `status/error/background` (red at 15%).
- Color system list frame updated for the rename. No values changed, no tokens added or deleted. Publish the Library so the rename and descriptions reach consumer files; developers should map status/blue → status/info.
- Left as is: unused primitives (not deleted, may be bound directly in files), `hierarchy/marker/pink` name, avatar/* and status/*/background raw values (alias cannot carry opacity or no matching primitive), cyan/accent and blue/status primitive names.
- 2026-10-14 (Color system list, concise pass): per Alan the list was too long. New compact frame "Color system list" (18195:411): 8 palette families as one swatch strip each, plus 32 core Theme tokens (Surface, Text, Icon, Border, Action, Selection, Status) with Dark/Light swatch, alias + HEX and a short usage. Behaviour, Avatar, Hierarchy, Elevation, Notification and Gradient tokens are only named in a footnote. The full 117-token version is kept in the same file as a hidden layer "Color system list · full reference (hidden)" (18192:302). No tokens or components changed.

## 2026-10-14 Popup → Dialog consolidation (XRCC (PC) Library, Popup page)
- Audit of old `Popup` set (18190:388): 5 variants named "Property 1=…", each with its own hard-coded title/icon/copy/buttons and a fixed width (474/513/555); two variants shared the name "Delete Creation Result", so the set reported "Component set has existing errors" (properties unreadable, flagged at Publish); header relied on a decorative `shape NNN×40` rectangle and a 40px close button; body left/right padding 42 unbound; "OK" used a Disabled Primary; "Partial Attachment Import" title was a copy of "Invalid Attachment Count". No Library-set instances found in Workbench (UI / 4.2 / Runtime Debug pages); other files not checked. The "(TBC) Debug Confirm Dialog" instance on the Popup page (from Workbench) was left untouched.
- NEW `Dialog` component set (18194:3805), additive: Type (Info / Success / Warning / Destructive) × Size (Small 360 / Medium 480 / Large 600) = 12 variants. Properties: Title, Description (text), Show icon, Show close, Show content (boolean), Content slot, Actions slot. Header 48 / Close = Button Square Small 28 / footer buttons Medium 36. Auto Layout throughout, min width 280, text wraps. Only existing tokens (surface/canvas, surface/header, border/subtle, text/primary, status/{blue,success,warning,error}, action/destructive/*, spacing/8,12,20, radius/lg, size/icon/48, text styles body/lg + body/lg-bold). No new tokens.
- Known limits: Figma shares TEXT property defaults across variants, so Title/Description show generic copy in every variant; icon is a plain per-Type instance (not a property), swapping it resets colour so re-apply the status token; Destructive red button is a Primary instance with fill/text overrides (no destructive Button component exists).
- Old `Popup` set: description set to DEPRECATED; the duplicate variant renamed `Property 1=Delete Creation Result (Not retained)` (fixes the set error). Nothing deleted, no instance affected.
- Usage doc frame `Dialog / Usage` (18195:300, Popup page): properties, live examples (narrow 320, Content slot, compact), Do/Don't, pattern picker, migration table.
- Alan to do: Publish Library, then Update library in consumer files. Optional follow-up: rebuild Workbench `Debug Confirm Dialog` on Dialog, then remove the old Popup set.
- 2026-10-14 (follow-up, per Alan "將舊 Popup 與新 Dialog 結合，但不要影響到相關 components"): the 5 old Popup variants were moved into the `Dialog` set (18194:3805) as Type = "Legacy Delete Creation Result / Legacy Prompt too long / Legacy Invalid Attachment Count / Legacy Partial Attachment Import / Legacy Delete Creation Result Not retained", Size=Medium. Layers untouched; node ids and component keys verified identical before/after (255fa2f6…, b3dfcecf…, 5876b665…, 1af0d4ea…, 4c611705…); instances in this file: 0. The old empty `Popup` set (key e811489c…) disappeared with the move. Variant values containing "·" or "()" made the set report "existing errors", so Legacy names use plain words. Instances in other files can't be checked from here: after Publish they may show the variant property as Type/Size instead of "Property 1" but stay linked.
- 2026-10-14 (Color system list, Dark only): per Alan, Light swatches and Light values removed from the concise list (18195:411); Dark only, footnote notes Light exists but is rarely used. Full hidden reference unchanged.
- 2026-10-14 (revised, per Alan "唔要Legacy，直接融合" + "icons color用返白色"): removed the Legacy types. The 5 old Popup components (ids/keys unchanged: 255fa2f6…, b3dfcecf…, 5876b665…, 1af0d4ea…, 4c611705…) were rebuilt IN PLACE as regular Dialog variants: Delete Creation Result → Destructive/Medium; Delete Creation Result (Not retained) → Info/Medium (Cancel + Continue); Prompt too long → Warning/Small; Invalid Attachment Count → Warning/Medium; Partial Attachment Import → Warning/Large. The 5 new variants that would have collided were deleted (unpublished, no instances). Dialog now has exactly 12 variants, Type = Info/Success/Warning/Destructive. Risk: instances of those 5 components in other files will switch to the Dialog layout and generic Title/Description (TEXT defaults are shared) after Update library; none exist in this file or in Workbench (Workbench checked by set name only). All Dialog icons (type icon + close) now bound to icon/default (white), no status colours. Slots are plain frames bound to the Content/Actions SLOT properties (createSlot would have created duplicate properties).

## 2026-10-14 — Typography list (XRCC (PC) Library, page "Design tokens", frame "typography" 17463:26812)
- Built documentation frame "Typography list" (18202:2987) inside the empty `main` of the typography frame; Alan's `meta` panel untouched. `main` set to fixed 1601 wide (same as the color frame), height hugs.
- Contents (concise, Dark/Base only): intro, Foundations (Roboto, Noto Sans TC via zh-hant mode, Regular/Bold, 0% tracking), Aa scale strip (32 to 11), all 10 text styles grouped Headings / Body / Caption (name, size / line height · weight, live specimen using the style itself, short usage), one "In context" card with style tags, footnote. Hidden layer "Typography list · variable reference (hidden)" (18202:3120) lists each style's size / line-height variables and the primitives they alias.
- Auto Layout only, wrap rows with min widths; checked at main width 760 / 1601 / 2400. Specimens use the text styles; fills, spacing, radius bound to existing variables. No new tokens, styles or components.
- Static documentation: sample copy and values are not live, re-run if styles change.
- Findings (not changed): `caption` is 11/16 (earlier notes said 12/16). Primitives `font/size/40` and `font/line-height/48` are not referenced by anything. `typography/font-weight/medium` and `/semibold` (and the primitives under them) are not used by any style. System `font/family/en` and `font/family/zh-hant` are only referenced by `typography/font-family` modes (fine), but the names overlap with it. Style descriptions are all the same boilerplate sentence, no usage guidance.

## 2026-10-14 — Library left-panel (meta) copy filled
- Surveyed all 39 pages. Left-panel placeholders ("Hint title / Hint text", "Text here") existed only on Design tokens (Typography 3 hints, Radius 3 hints) and Dialog (description + 3 hints, plus an empty preview). All other component pages already had real copy.
- Filled: Typography (pick a style / Roboto first / Bold for hierarchy), Radius (match radius to size / full is for pills / two component radii), Dialog (description, four types, three widths, keep it short) and put a Dialog Info Medium instance in the Dialog preview slot (18203:2869). Overrides on existing instances only, no components or tokens changed.
- Left as is: "Internal" page meta (template: Component name / Component description) and the "UI kit (Last update 20260313)" page (not surveyed, imported kit).
- Not changed but worth a look: Color, Shadow and Unit panels have 1–2 real hints each (fine); Progress bar, Progress indicator, Switch, Divider panels have only title + description and no hints.

## 2026-10-14 Button page: variant 排位整理 (Alan: 「幫我將啲buttons排位執返靚」)
- Page Button (17465:279), Dark Mode_Button frame. 只改位置/標籤，冇改 component 內容、key、名稱、instance、token。
- Primary / Secondary / Tertiary: 網格統一 = 列為 State (Default, Hover, Disabled, Loading[Primary], Focus)，欄按 Size (Large, Medium, Small) 分組，每組 Leading / Text / Trailing。欄寬固定 (97/96/67)、欄距 16、組距 64、列距 80，變體置中對齊。加咗 Large/Medium/Small 欄標題，行標題 (Default/Hover/Disabled/Loading) 對齊每一行。Primary 嘅 Loading 搬到 Disabled 下一行。
- Tertiary: 行標題原本錯位，已對齊；Tertiary 標題 "Heading" 原本係 hidden，冇改。
- Icon: 欄按 Type (Primary, Border, White) 再按 Size 排，行 = State；加 Type + Size 兩層欄標題。Icon 標題字重改 SemiBold，同其他標題一致。
- Button Square (18013:2683): 行 = Size、欄 = Default/Hover/Disabled/Focus 4 欄 (原本 Focus 散落三個唔同位置)；set 由 360x292 縮到 312x240。
- 所有 Focus 變體原本已經係 visible=false，保持隱藏，行標題寫 "Focus (hidden)"。
- Header Button / Tag / Listing 等下半部未動。
- 需要 Alan Publish Library。

## 2026-10-14 — Bold typography demo (per Alan: docs/concept text can be bolder; guideline: 20261014-xrcc-bold-typography-guideline.md)
- Library, Typography list (18202:2987), before/after screenshots checked: section titles heading/md → heading/lg; section gap 56 → 80; Foundations values heading/sm → heading/lg with labels as caption UPPER; group labels (Headings/Body/Caption) body/lg-bold → caption UPPER subtle; style rows padding 16 → 20, Usage column → caption. Existing text styles and variables only; content unchanged; Auto Layout kept. No new tokens, styles or components. Needs Publish only if this frame is consumed elsewhere (it is documentation).
- Workbench, Board 11 Tooltip list (331:1266): title split into eyebrow "Debug panel" (caption UPPER) + "Tooltip list" (heading/xl); lead body/md → body/lg; the three section bands rebuilt as number (heading/xl: 7, 4, 0) + title heading/sm + description body/md, band height hugs (78); "How they behave" title heading/md, bullets body/md. Table, tooltip instances and copy untouched. Counts match the rows (7 + 4 tooltips, 0 needed for the 5 no-tooltip cases). Library styles imported by key; no raw sizes. Board height 1692 → 1810.
- Open: Library styles stop at heading/xl 32; display/2xl 48 and display/3xl 64 suggested in the guideline, not added.
- 2026-10-14 (Typography list, second pass per Alan's link to 17463:26812): style Name column body/md-bold → body/lg-bold (identity gap 4), Usage column caption → body/sm (11 px was too small to read), Aa scale strip gap 32 → 56, In context card padding 24 → 32 and gap 16. Existing styles only; screenshot checked at default width (main 1601).

## 2026-10-14 — Unit and Typography extended to 80 (Alan's explicit exception to "no new tokens"; reference: Reshaped Design System v4.1, Unit x0-5 to x20 = 80, Headline 1 = 80/84)
Scope: only the unit and typography groups. All additive, nothing existing changed, no existing instance affected. Dark only.
- **XRCC Primitive** (new): `unit/72`, `unit/80`; `font/size/48`, `font/size/64`, `font/size/80`; `font/line-height/56`, `font/line-height/72`, `font/line-height/88`. (`font/size/40` and `font/line-height/48` already existed, unused.)
- **XRCC System** (new, alias to Primitive, same value in Base and zh-hant): `spacing/72`, `spacing/80` (GAP scope); `typography/display/{2xl,3xl,4xl}/size` (FONT_SIZE) and `/line-height` (LINE_HEIGHT).
- **Text styles** (new): `display/2xl` 48/56, `display/3xl` 64/72, `display/4xl` 80/88, all Roboto Bold; family, weight, size and line height bound to System variables (same pattern as heading/*), so zh-hant mode swaps to Noto Sans TC. Tracking stays 0.
- Naming follows the existing ramp (`heading/xl` … `caption`); `display` sits above heading, 3 levels only (no 40 or 56 style; 80/88 is the cap).
- Design tokens page: Unit list now ends at spacing/80 (two items cloned from spacing/64, square bound to the variable); Typography page: Aa scale strip gains 80/64/48, new "Display" group above Headings (specimens "Welcome to the studio", "Make it yours", "Go live"), hidden variable-reference rows added, hint text and Unit description updated. Screenshots checked.
- Rule: display styles are for docs, concept covers, onboarding and empty states; never real application UI (see 20261014-xrcc-bold-typography-guideline.md).
- **Alan needs to Publish the Library**, then Update library in consumer files (new styles/variables are unpublished).

## 2026-10-14 — Variable scope audit (per Alan: tidy the Scope of all tokens)
Audited all 3 collections (298 variables). Convention already held almost everywhere, so only one change:
- Primitive: scope empty on purpose (never picked directly); unit/font additions follow it. Unchanged.
- Theme: surface/*, action/*/background, status/*/default|background, hierarchy background, notification, gradient = Frame + Shape fill; text/* = Text fill; icon/*, status/*/icon = Shape fill + Stroke; border/* = Stroke; action/*/content, selection/content = Shape + Text + Stroke; elevation = Effect; behaviour = Fill + Stroke (fixed colours, left alone).
- System: spacing = Gap; size/icon, size/control = Width and height; radius = Corner radius; typography size/line-height/family/weight/letter-spacing each have their own scope. Unchanged.
- Changed: avatar/{blue,red,green,yellow}/foreground now Shape + Text + Stroke (was no Stroke), same as other content tokens so icons can bind too. Picker visibility only; no existing binding affected. Needs Publish.

## 2026-10-14 — 0D0D0D fills bound to surface/panel (per Alan)
- All 39 pages of the Library: every solid #0D0D0D fill on non-text nodes (outside instances) now bound to `surface/panel` (Dark #161616, so these backgrounds are slightly lighter than before). 51 fills rebound, mostly documentation frames (Design tokens 5, Icons 5, Pin field 4, Internal 3, others 1 to 2 per page). Text fills and instance overrides untouched (none found). No new variables. Needs Publish.

## 2026-10-14 — PC UI file: fixed 5 invalid assets (per Alan, Publish dialog)
The five belong to ⭐XRCC4.0_PC_UI (7SMhpQ4IVhnlA6G6wfwAgO), not the Library file. Components kept, only broken properties changed:
- Home / Dark / Dark Mode_Home Page (Missing properties): one variant was named "Property 1=…, Property 2=Variant6" while the others have only Property 1; renamed to "Property 1=Variant7".
- Instance Panel / Dark / list item(XRCC 4.0) (Conflicting names): deleted 4 unused slot props (Slot, item icon ×2, item icon2); none was referenced.
- Shared / Dark / New Tag (Unused): deleted unused `Tag Slot2`.
- list Tag item(XRCC 4.0) (Conflicting names): deleted 7 unused slot props (duplicate item icon ×3, Slot, item icon2, Tag2, Tag3); kept item icon, Tag, Tag4.
- Tag Management (Unused): deleted unused `Tag Slot2`.
Only properties with no reference in the component's own nodes were removed. Alan re-opens Publish to confirm 0 invalid.

## 2026-10-14 - Button back-arrow sets merged into Button Square (per Alan)
Page Button, Library file. Three sets: `Button / Dark / 40px` (17463:54657, State Default/Hover), `Button / Dark / 48px` (17463:54662, State Default/Hover), `Button / Dark / Button Square` (18013:2683, Size Large/Medium/Small x State Default/Hover/Disabled/Focus + Icon swap).
- Button Square is the surviving set. Its Size=Large (48) already matches the 48px set, so nothing was added for it.
- Added `Size=Regular` (40, icon 16) with Default/Hover/Disabled/Focus to Button Square, cloned from Size=Small so fills (surface tokens) and icon stroke bindings are identical to the other sizes. Set resized to 312x302, new row at the bottom. Existing 12 variants untouched (keys, names, instance link all unchanged; 12 local instances of Size=Small, State=Default unaffected).
- The 40px and 48px sets were NOT deleted: their consumers in other files cannot be checked from here. Only their description now says Deprecated, use Button Square. No rename, no key change, no new tokens.
- Note: old 40px Hover used fill variable 17224:80298, Button Square Hover uses 17224:80338; Regular follows Button Square.
- Needs Publish. After that, delete the two old sets once no file shows them in "Used in" (or swap instances first).
- Follow-up (Alan: "舊的仍存在, 我想融合埋新"): deleted the old `Button / Dark / 40px` (17463:54657) and `Button / Dark / 48px` (17463:54662) sets, both had 0 local instances. Only Button Square remains (now includes Size=Regular 40). Publish will list the two as deleted; undo via Figma version history before Publish if needed.

## 2026-10-14 — Workbench: Watch filter screen (Board 3b)
- New board "3b · Filtered to Watch": the Debug items tab with the Watch chip selected, listing only the 5 variables with W on, with live values. Built by cloning Board 2 (existing components only).
- Layout: Alan has wrapped the boards in a Section ("Runtime Debug · Manage debug items"), so coordinates are now section-relative. Column 1 order is now Log tab, Warnings tab, Watch filter, Log filter, Search, ⋯ menu. Arrows redrawn inside the Section, plus Watch chip links in both directions (hub, Log filter, Watch filter) and a new flow starting point.

## 2026-10-14 — Workbench: flow map reorganised (Alan: "可以大執")
- Boards grouped into lanes with tinted backgrounds and titles: Log tab, Warnings tab, Browse and filter, Manage (⋯ menu, confirm, result), States, Reference. Hub board has a "Start here" marker.
- Boards renumbered in flow order: 1 Debug items, 2 Watch filter, 3 Log filter, 4 Search no results, 5 Empty, 6 While Play running, 7–9 Log (data, empty, limit), 10–12 Warnings (data, empty, limit), 13 ⋯ menu, 14–16 Confirm (all, log, watch), 17–19 After removal, 20 Tooltip list. Old numbers: 3b→2, 3→3, 4→4, 5→5, 10→6, 12/13/14→7/8/9, 15/16/17→10/11/12, 1→13, 7/7b/7c→14/15/16, 8/9/9b→17/18/19, 11→20.
- Notes and the tooltip annotation updated to the new numbers; arrows redrawn; prototype audited (no broken links). Boards with no inbound link are intentional states, reachable via flow starting points.

## 2026-10-14 — Workbench "Components" page tidied
- The page is now three Sections, one per feature: Asset library (Asset Thumb, Status Chip, Card, Drop Zone), Data Analytics 4.2 (Record State Chip, Choice Card), Runtime Debug · Manage debug items (grouped: Item row / Value and locate / Log and Warnings entries / Retired). Positions only; no component, variant or property was changed, so every instance keeps working.
- Debug Confirm Dialog and Debug Toast are not used on any board any more; they are kept in a "Retired" group with "Unused: ..." added to their descriptions. Delete them when Alan agrees.
- Debug Value set got the same dark backdrop as the Debug Item Row set; a dark backdrop rectangle sits behind the 16 px Locate icon so it can be seen (not part of the component).
- Left untouched: three loose items at the far right of the page (Icon frame instance, "image 1" rectangle, target icon instance), as they look like Alan's own scratch.

## 2026-10-14 — Workbench flow lanes are real containers (Alan)
- The lane rectangles were replaced by nested Sections that actually contain the boards (Log tab, Warnings tab, Browse and filter, Manage, States, Reference). Section names are the lane titles. Boards inside sections stay valid prototype targets (a plain Frame would not).
- Colours come from existing tokens only: main Section surface/canvas, lanes surface/header, arrows and arrow labels text/accent, Notes text/primary. No new tokens.
- 2026-10-14 (lighter canvas, Alan): flow map recoloured with existing tokens only: main Section surface/inverse (white), lane Sections border/strong (light grey), arrows and labels surface/accent-muted, Notes text surface/panel (text/inverse resolves to white in this mode, so it was not used).
- 2026-10-14 (attached connectors, Alan): the vector arrows were replaced by 16 real connectors ("Flow connector · …", cloned from Alan's seed connector, attached to the boards, stroke surface/accent-muted, labels as connector text). They follow the boards when moved. The plugin API cannot recompute connector routes, so after any layout change nudge a board once in Figma to re-route; check for lines crossing other items.

## 2026-10-15 — Workbench flow map: connectors replaced by routed lines (Alan: "都係亂哂")
- Attached connectors kept stale routes even after nudging boards (plugin cannot recompute them). The 16 "Flow connector · ..." are now hidden (visible off, not deleted, so they can be restored); replaced by 36 "Flow line · ..." vectors and "Flow label · ..." texts in the Main Section, same stroke as the old connectors (existing token), arrowheads on the last vertex, state links dashed.
- Routing: Hub trunk in the gutter at x=650 with one straight branch per board; Manage trunk at x=1660; Log/Warnings empty links straight, Limit links go under the row. Lines do not cross any screen. They do not follow boards when moved, so redraw after a layout change.
- 2026-10-15 (flow lines tidy, Alan): lines 1.5 px (thinner arrowheads), labels 12 px, sitting just above their line and clear of the trunk. Manage labels wrap to two lines inside the narrow gutter ("Remove all / watch items").
- 2026-10-15 (Alan: "Remove all Flow connector"): deleted the 16 hidden "Flow connector · ..." nodes. The flow now uses only the "Flow line · ..." vectors and labels. No connectors remain on the page (the seed "Flow Arrow" was already gone before this, not removed by me).
- 2026-10-15 (Alan: rows radius 8): all 33 "Rows" list containers on the Runtime Debug boards now use radius/md (8). 19 of them were 4 (Ticket Desk, Ceiling Lights style groups); rebound to the same variable the 8 px ones already used. No new tokens. Row instances themselves unchanged (radius 0).
- 2026-10-15 (Alan: Locate icon without wrapper): all 17 Locate buttons (Debug Item Row variants, Log and Warning entries) now set the Button Square Icon property directly to Library icon/outline/target, same as Alan's example at 385:191. No `Debug Locate Icon` instances remain on the Components page or boards. The now-unused `Debug Locate Icon` component (360:170) is kept for Alan to delete (add "Unused" to description if he wants it to wait).

## 2026-10-15 - Button / Dark / Button Square (18013:2683) Interactions

- 4 個 Size（Large、Medium、Small、Regular）各自連好 variant 切換：Default 在 hover 時 Change to Hover；Default 和 Hover 在按下時 Change to Focus。轉場為 Dissolve 100ms、Ease out。
- Disabled 不設 interaction；Focus 為終點，不另設。沒有 Pressed variant，所以按下時暫用 Focus 外觀。
- 只加了 prototype reactions，沒有改 variants 設計，沒有新增 token。需要 Publish。

## 2026-10-15 — Workbench: bind everything to tokens (Alan: "全部使用tokens", Components section 448:4964 + page 268:1285)
- Scope: every non-instance node in the Runtime Debug Main Section (934 nodes) and the Components section (250). Existing XRCC System and Theme variables only, no new tokens.
- Colour: "Live session" labels (#E0E7EE) to text/primary; "Start here" chip to surface/accent-muted with text/inverse; Flow labels (black 80%) to text/on-light/primary; tooltip instance strokes (#5C4E7B) to border/tooltip; Components group titles (#4A408F) to surface/accent-muted.
- Radius: 2/4/8/16/999/9999 bound to radius/xs, sm, md, lg, full. Spacing: gaps and paddings of 2, 4, 8, 12, 16, 20, 24 etc. bound to spacing/*. Text: 17 + 4 unbound texts (Start here, Flow labels, group titles) bound to typography size, line-height, family and weight variables (Roboto Regular).
- Left unbound on purpose (no matching token): radius 6 (13 nodes) and 5 (8), gap 6 (57) and 10 (14), padding 10 (116; spacing/control-inset exists but is meant for controls), the red #A71313 Tint swatch (sample data), and the six lane Section outlines (not visible).
- 2026-10-15 (Alan: own drawn elements must use tokens): "Start here" chip padding now spacing/12 (sides) and spacing/8 (top, bottom); it was 20/10 raw, so the chip is 111x44 instead of 127x48. Saved as a team memory rule.
- 2026-10-15 (Alan: "幫我全部使用tokens", second pass): remaining raw values bound to the nearest existing token. Radius 6 (13 tooltip frames) to radius/md; radius 5 (8 component frames on the Components page) to radius/sm; gap 6 (57 tab rows) to spacing/8; gap 10 (14 tooltip frames) to spacing/12; padding 10 (114 tab frames) to spacing/control-inset (exact value, no visual change); "Retired" group title to surface/accent-muted; red Tint swatch to status/error/icon. Final audit: 0 unbound fill, stroke, radius, gap, padding or text on the Main Section; Components section has none left either. Visual change is at most 2 px on tooltip frames, tab gaps and component frame corners.

## 2026-10-15 — Workbench: Debug Toggle interactions (Alan: "幫我連哂Interactions")
- Debug Toggle (271:115) variants now have prototype reactions: each State=Default has While hovering to its State=Hover variant and On click to the opposite On value (Default); each State=Hover has On click to the opposite On value (Hover). Smart animate, ease out, 100 ms. Covers Watch and Log, On True and False (8 variants).
- There is no Focus variant in the set, so no focus interaction was wired.
- 2026-10-15 (Alan: generic copy): Board 3 notification (379:1937) text changed from "Queue length removed" to "Log turned off for this item" (item is not deleted, only leaves the Log filter list; generic wording works for any item).

## 2026-10-15 — 新增 Icon `icon/outline/target-1px`(Alan 嘅準星圖,待 Publish)
- Library 已有 `icon/outline/target`,冇覆蓋,新畫嘅另存為 `icon/outline/target-1px`(18260:321,`Icons / Outline` frame 最尾)。
- 24×24、1px、Round cap/join、單一 vector:外圈 r7.5、內圈 r3.5、上下左右四條短線貫穿外圈;描邊綁 `icon/inverse`;冇新增 token。**需 Alan Publish。**

## 2026-10-15 — Workbench: long text cases (Alan: "請加入所有文字太長會如何顯示的cases")
- New Section "Long text" (right of States, Main Section widened to 7800) with 4 boards cloned from existing ones, texts replaced with long content: 21 Debug items tab (group header object and scene, row name, meta, string value, unbroken name), 22 Log tab (name, change before/after, meta), 23 Warnings tab (message, source, count x12,840), 24 Search (long query in field and in the empty-state title).
- Rules shown: single-line texts end with … (name, meta, value, group object and scene, Log name/meta/change, warning source, search field); Warnings message wraps to 2 lines then …; empty-state title wraps to 2 lines then …. Locate, W, L, time and count never shrink.
- Component changes to make it hold: Debug Value max width 140 and text truncates; Debug Group Header object max width 240; Debug Log Entry name and meta truncate at 1 line; Debug Warning Entry message 2 lines and source 1 line; Search title 2 lines and search field text 1 line (also on Board 4). In Log change, before-value is hug up to 200 and after-value fills (set on the Board 22 instances only, the main component slot could not be edited by script, so a new Log entry instance needs the same on its Change slot).
- Not covered: tooltips (Board 20 copy is fixed text), dialog and notification text (fixed strings).
- 2026-10-15 (Alan: duplicated annotations): annotations copied by mistake onto the Long text boards (21 to 23) were removed, except the "長文字截斷，hover 睇全文" note on Board 21. Board 2 no longer repeats Board 1's four annotations (Watch tab, W/L, Locate, long text); that long-text note now lives only on Board 21.

## 2026-10-15 — Workbench: behaviour removed from meta (Alan: "只保留 object · scene")
- Log meta and Warning source now show "object · scene" only (3 segments to 2), including the long-text examples. Debug item row meta shows the type only ("Boolean", "Number" ...), since the group header already carries object and scene. About 100 texts on the boards and the component defaults on the Components page.
- Search placeholder is now "Search variables or objects" (11) and the no-results hint "Try a variable name or an object. Filters apply to the search too." (2). Component descriptions of Debug Item Row and Debug Log Entry updated. Warning messages that talk about behaviours (e.g. "this behaviour cannot run") were kept on purpose.
- Open: confirm with Toby that a variable name is unique per object; if not, the behaviour must come back (suggested wording "by Open interaction").

## 2026-10-16 — Tag (17463:37912) interactive states
- 新增 `State` property：Default / Hover / Pressed / Focus / Disabled。原有 24 個 variant 補 `State=Default`，新增 96 個（6 Style × 2 Size × 2 Shape × 4 state），合共 120。
- Token（只綁現有，冇新增）：Hover 底 Accent `surface/row-hover`、Dashed/Outline `surface/elevated`（框 `border/strong`）、Filled `action/primary/background/hover`、Danger `status/error/hover`、Subtle `action/neutral/background/hover`。Pressed 底 Accent `surface/accent-muted`、Filled `action/primary/background/pressed`、Danger `action/destructive/background/pressed`、其餘 `surface/header`（Dashed/Outline 框 `border/interactive`）。Focus：2px 外框 `border/interactive`（Danger 用 `border/strong`）。Disabled：底 `surface/disabled`、字 `text/disabled`、框 `border/disabled`。
- Icon（close / add）顏色逐 state 綁同 Label 一樣嘅 token。Description 已補 State 說明。
- 只做 Dark。**需 Alan Publish，再喺 consumer 檔 Update library。**
- (2026-10-16) Tag prototype：48 個 variant 已連好。Default 在 hover 時 Change to Hover，在按下時 Change to Pressed；Hover 在按下時 Change to Pressed。轉場 Dissolve 100ms、Ease out（同 Button Square 一致）。Focus（鍵盤）同 Disabled 不連。
- (2026-10-16 fix) Tag prototype 撤回：Alan 喺 Workbench hover「Watch 5」chip 變成「Tag」。原因：Tag 內容係 Slot（唔係 TEXT property），prototype 嘅 Change to 轉去 Hover / Pressed variant 時，instance 嘅 slot 內容（文字、icon、count）唔會帶過去，顯示 variant 預設「Tag」。處理：Library Tag 48 個 variant 嘅 hover / pressed 轉場全部移除；XRCC Claude Workbench 三頁（Runtime Debug 39 個、UI Workbench 22 個、Test 10 個）嘅 Tag instance 已清走由 Library 帶入嘅 hover / press 轉場，保留 chip 自己嘅 On click 導航。State=Hover / Pressed / Focus / Disabled variants 保留，供設計稿手動切換同 Dev 參考。**需 Publish，再喺 Workbench Update library。**
- (2026-10-16, Alan 揀「改 Library Tag」) Tag 內容由 Slot 改為直接 Label：新增 TEXT property `Label`（預設 `Tag`），120 個 variant 嘅 Label 文字全部綁定；移除 `Content` slot property（`Content#18177:0`）同 Content frame，Danger 嘅 close icon、Subtle 嘅 add icon 固定喺 variant 內，gap 沿用原本 slot 嘅 spacing token。State variants 之前 clone 時 slot 已變成普通 frame，亦同時扁平化。Hover / Pressed prototype 轉場重新連好（48 個）。Dashed 預設字由「Untagged」、Subtle 由「New tag」變成「Tag」（TEXT property 只有一個預設值）。**需 Publish，再喺 Workbench Update library，然後按 20261016-tag-label-reapply-list.md 補返 chip 文字（Runtime Debug 39 個 + Test 頁 10 個）。**
- (2026-10-16 follow-up) Alan Publish 後 Workbench chip 文字重設為「Tag」：已按清單補返 Runtime Debug 39 個、Test 頁 10 個 Label。Workbench 三頁共 71 個 Tag instance 嘅 hover / pressed 轉場已重新連好（instance 層級，Dissolve 100ms、Ease out，保留 On click 導航）。驗證：swap 成 Hover / Pressed variant 後文字保持「Watch 5」。

## 2026-10-16 — Workbench Tabs 統一用 Library `Connections / Dark / Components / Tab`(Library 冇改,毋須 Publish)

- (Alan)Workbench 全部 Tabs 用 Library Tab(key 02062e97…,State=On/Off,Size=L)。
- Runtime Debug · Manage debug items 頁:23 組 `Tabs / Tag List`(Debug items / Log / Warnings)由 `AI Gem / Dark / Tag` 換成 Library Tab instance:選中 → On,其餘 → Off;icon 用 swap 保留(bug / page / warning),文字、次序、選中狀態不變;每個 Tab 寬度 Fill,Tag List gap 改 2(同 Full Tabs)。圖層名保留 `Tab Watch / Tab Log / Tab Warnings`。
- Icon 顏色:每個 Tab 內 icon 所有 fill / stroke 重新綁到相鄰文字 token(選中 `action/primary/content/default`,其餘 `text/secondary`)。冇新增 token。
- UI Workbench 頁 `Tabs (Full Tabs)`(72:307)本身已係 Library Tab,冇改。Data Analytics、Components 頁冇 Tabs。
- Library 缺口:Tab 冇 Label 屬性(要直接改 Image Text 內文字)、冇 count / badge、冇 4-tab 以上嘅 Full Tabs;Off 態 icon 預設係 `icon/inverse`(白)而字係 `text/secondary`,instance 要手動重綁。

## 2026-10-16 — ⭐ XRCC4.0 PC UI 檔 Tabs 統一用 Library Tab(Library 冇改)

- (Alan:「統一所有UI都用Library的Tabs,不要影響到現有UI」,揀「改主元件」)PC UI 檔 `AI Gem / Dark / Tag`(4071:331536)用緊做 Tabs 嘅位置全部換成 Library `Connections / Dark / Components / Tab`(Size=L):
  - `AI Gem / Dark / Tag List`(4071:331545)4 個 variant × 4 個 tab;`AI Gem / Dark / Pattern 02`(4071:332053)5 個 variant × 5 個 tab;XRCC UI 4.0 頁 4 個畫面內獨立 tab(Group / Row)。`Create with AI`、`Pattern 01`、`Creation Result` 等經嵌套自動更新。
  - 保留:文字、次序、icon(swap)、寬度 Fill/Fixed、選中狀態(pressed → On、Default → Off、hover → Hover);無 icon 嘅 tab 關閉 `icon` 屬性。有 icon 者重綁 icon 顏色到相鄰文字 token。
  - 驗證:兩頁已再掃,舊 Tag instance 剩 0 個;現有 Tag List / Pattern 02 / Create with AI 實例冇文字或狀態 override 被打斷(只有 Frame 4819 本身 tab 已被刪除,冇影響)。Pattern 02 `Topic Area` variant 曾有舊 layout 殘留空位,已重排。
  - 舊 `AI Gem / Dark / Tag` set 保留(冇刪),已冇人用;其他頁(UI Part 01/02、Item Tag UI 等)冇 Tag instance。
  - 待 Alan:如 Workbench 或其他檔仍引用呢個檔 Publish 嘅 Tag List / Pattern 02,需 Publish 後 Update library;舊 Tag set 確認冇用可自行刪。

## 2026-10-16 — Library interactive prototype pass (Alan:「將 XRCC (PC) Library 裡的所有 components 加入 interactive prototype，要合理」)
- 先做保留測試：每個有狀態的 set 開臨時 instance，覆寫所有文字，再用 setProperties 切去其他狀態，確認文字/icon 保留（測完已刪除臨時 instance）。Button、Checkbox、Radio、Switch、Slider、Tab、Text Input、Text area、Select、menu-item、file-upload、pin-field-item 全部通過，所以可以直接連（Tag 之前出事係因為 Slot，已改 Label property）。
- 轉場統一：Dissolve 100ms、Ease out（同 Button Square / Tag 一致）。只用現有 variant，冇新 token、冇新 variant、冇改外觀。
- 已連（先清走舊 reaction 再重建，舊嘅冇轉場、指向不一致）：
  - Hover：Button Primary / Secondary / Tertiary / Icon（Default→Hover）、Header Button（Enabled、Light→Hover）、Header Listing、Slider Bar、Connections Tab（Off→Hover）。
  - Click 切換：Checkbox（Check⇄False，Default 三個 size）、Radio（False→True）、Switch（on⇄off）。
  - Behaviour tool：Default→Hover（hover）→Selected（click）→Default（click），Normal 同 Error 各一組。
  - Form field（Text Input / Text area / Select）同 pin-field-item：Default 按一下→Focused，Focused 按 Esc→Default。
  - menu-item：default→highlighted（hover）→selected（click），status=default 嘅 36 個組合。file-upload：default→highlighted（hover）→selected（click）。
- 保留原有：Button Square（hover + press，press 目標係 State=Focus）、Tag（hover / pressed）。
- 不連：Focus（鍵盤狀態）、Disabled、Error、Loading、Pin field 外層、Checkbox (old)、Select [Legacy]。
- 冇狀態可連（純靜態或只係外觀變化）：Alert、Avatar、Badge、Breadcrumbs、Divider、Dropdown menu、Popover、Tooltip、Loader、Pagination、Progress bar / indicator、Skeleton、Table、Dialog、Notification、OTP、Link（只有 disabled，冇 hover variant）。
- 已知缺口：Slider Bar `Level=Full, State=Default` 冇對應 Hover variant，所以呢個 variant 冇 hover。
- 待 Alan 決定：Tabs 系列（Button Tabs、Header Tabs、Tab、Full Tabs）要 On 切換就要喺 instance 層連同組 tab，Library 層連會令其他 tab 唔會熄；Home Pattern 05（Card ⇄ Card Selected）文字會被 variant 預設蓋過；Link / Checkbox / Radio 缺 Hover variant。
- **需 Alan Publish，再喺 consumer 檔 Update library。** Update 後預計唔需要補 override（文字、icon 已實測保留）；如發現 chip / 按鈕文字變預設，通知我。

## 2026-10-16 (follow-up) — Hover variants + 全面補連（Alan:「Link、Checkbox、Radio、Slider 加 Hover variant，然後完善所有東西」「檢查所有東西是否有遺漏」）
- 新增 Hover variant（只用現有 token，冇新 token）：
  - Link：新增 `state` 軸（default / hover），5 個顏色各加 hover variant，underline 由 1px 加粗到 2px（disabled 冇 hover）。
  - Checkbox：9 個 Hover variant（False / Check / - × Small / Medium / Large）；未勾選框改 `border/strong`，已勾選底色改 `action/primary/background/hover`。
  - Radio：6 個 Hover variant（Selected False / True × 3 size）；未選框改 `border/strong`，已選實心點改 `action/primary/background/hover`。
  - Slider Bar：補 `State=Hover, Level=Full`（跟 Half hover 一樣：thumb 光環 + 數值 tooltip）。
  - 同步將 Link、Checkbox、Radio 嘅 set 範圍撐大到包住新 variant。
- Pattern 05（Card / List）文字改 TEXT property：Card title、Card meta、List title、List project、List date，各 variant 已綁定；Upload 嘅文字喺 nested instance 入面，冇做 property。描述已更新。
- 補連 / 重連：
  - Tab（Connections）：Alan 將狀態改成 Off / Hover / Pressed，Off → Hover（hover），Off 同 Hover → Pressed（press）。
  - Link：default → hover。Slider：Default → Hover（Empty / Half / Full 全部）。
  - Checkbox：Default → Hover（hover）；click 切換 Check⇄False（Hover 狀態下 click 跳去 Default 嘅另一值，避免離開 hover 時彈返舊值）。Radio 同理（False → True）。
  - Pattern 05：Card ⇄ Card Selected、List ⇄ List Selected（click）。
- 全 Library 重新掃描：所有有 State / Status / Selection 軸嘅 set 都已有 reaction，唯一例外係 Tabs 系列（Button Tabs、Header Tabs、Full Tabs，Alan 指示先 on hold）同 Select [Legacy]（舊款，不連）。
- 保留測試：Tab、Checkbox、Radio、Slider、Link、Pattern 05 切換狀態後文字保持。
- **需 Alan Publish，再喺 consumer 檔 Update library。**
- (2026-10-16, Alan:「Link hover 了後好像沒分別」) Link hover 只加粗 underline 太細睇唔出：5 個 hover variant 嘅文字、underline 同 icon 顏色一齊改綁現有 primitive：primary → color/purple/200、critical → color/red/50、positive → color/green/200、warning → color/yellow/200、inherit → color/neutral/white；underline 保持 2px。冇新 token。**需 Alan Publish。**
- (2026-10-16, Alan:「所有 pages 以英文字母順序排列」) 兩條 `---` 分隔線之間嘅 component pages（Alert 至 Tooltip，共 30 頁）改為 A-Z 排序。Cover、All Figma files、Design tokens、Logo、Icons 同 Internal、UI kit 屬 Library 頭尾，位置不變。冇改頁面內容。

## 2026-10-16 — Workbench Components 頁加 interactive prototype;補返 Debug Panel Tabs 導航(Library 冇改)

- (Alan:「全部加入 interactive prototype」)Components 頁(85:1541)component set 加 prototype reaction(Change to + Smart animate 0.1s ease-out,同 Debug Toggle 一致):
  - Asset Card:Default 懸停 → Hover;Default / Hover 點擊 → Selected;Selected 點擊 → Default。
  - Asset Drop Zone:Default 懸停 → Drag over。
  - Choice Card:False ↔ True 點擊切換。
  - Debug Item Row:6 個 Default variant(Watch/Log × Inline/Below)懸停 → 對應 Hover。
  - Debug Log Entry、Debug Warning Entry(Locate=On / Unavailable):Default 懸停 → Hover。
  - Debug Toggle 原本已有,冇改。無互動狀態嘅 set(Asset Thumb、Asset Status Chip、Record State Chip、Debug Group Header、Debug Value)冇加。
- 更正:今日早啲將 Debug Panel Tag 換成 Library Tab 時,舊 Tag 上嘅 board 導航 reaction 隨舊節點被刪。已按推斷補返:每個非選中 Tab 點擊 → Dissolve 0.15s 跳去同一組(一般 / Long text)嘅 Debug items / Log / Warnings 主 board(274:662、386:1933、386:2519;Long text 525:4878、525:5124、525:5331),保留 Library Tab 自帶 hover / press。共 46 個。原本目標未必完全相同(例如 empty / limit boards 原先可能留喺同類 board),需 Alan 試播確認。

## 2026-10-16 — Library 加 Hover 狀態:Text Input、Icon frame(需 Alan Publish)

- (Alan:「Library加入返Hover 狀態」)只用現有 token,冇新增 variable。
- `Form / Dark / Text Input`(17463:93293,Text field 頁):State 新增 `Hover`,6 個 variant(Size Small/Medium/Large × Placeholder True/False),由 Default 複製;只改 `field` 邊框 → `border/interactive`(描述:Shared interactive border for hover and focus states;Dark #b89afa),其餘同 Default。Focused 仍用 `action/primary/content/hover`。Error / Disabled 冇 Hover。
- `Icon frame`(17847:582,Icons 頁):新增 variant property `State`(Default / Hover),原有 6 個尺寸 variant 改名為 `Size=XX, State=Default`,新增 6 個 `State=Hover`:背景 `action/neutral/background/hover`(Dark #2a2531),圓角綁 `radius/sm`(4)。Default 冇改。注意:草稿嘅 Icon frame 屬性已係 `Size`,但 Workbench 讀到嘅已發佈版本仍係 `Property 1`(16/24/40/48px),Publish 後 instance 屬性對應需檢查。
- 待 Alan Publish,之後 Workbench Update library;我再喺 Debug Panel 嘅搜尋欄同 ⋯ 掣加 Default → Hover prototype。
- (2026-10-16,Alan:「做埋prototype」)Library 內加 prototype reaction(Change to + Smart animate 0.1s ease-out):Icon frame 6 個 Default 懸停 → 同尺寸 Hover;Text Input 6 個 Default 懸停 → Hover、點擊 → Focused,Hover 點擊 → Focused。Publish 後 instance 會帶住呢啲互動。Workbench Debug Panel 嘅搜尋欄原有舊 reaction(點擊 → 舊 Focused variant)待 Update library 後再檢查有冇重複。
- (2026-10-16,Alan:「將 ⋯ 掣換成 Button Square」)Workbench Runtime Debug 全部 23 個 Debug Panel ⋯ 掣由 `Icon frame` 換成 Library `Button / Dark / Button Square`(18013:2683,Size=24px,State=Default),圖層名 `More button`;icon 經 Icon 屬性保留 `icon/outline/more-vertical`;原有導航(點擊 → ⋯ menu board)保留,並帶 Button Square 自帶 Hover / Press。Button Square 已有 Hover,毋須等 Icon frame Hover Publish。

## 2026-10-16 — Text Input component set 排版整理（只改位置，冇改 variant 內容）

- (Alan 指定 Text field 頁 `Form / Dark / Text Input`，17463:93293)
- 30 個 variant 重新排成整齊 grid：欄 = State（Default / Hover / Focused / Error / Disabled），行 = Size × Placeholder（Small False/True、Medium False/True、Large False/True）。之前 Hover 6 個 variant 散放喺底部，位置同其他 State 唔對齊。
- 間距：欄距 40、行距 32、set 內邊距 24；每行高度跟該行最高嘅 variant（Error 帶 message 較高）。Component set 尺寸調為 1608 × 556，`main` frame 因而跟住變成 2008 × 916（內邊距 200 / 180 不變），set 喺入面置中。
- 冇改 variant 名、屬性、tokens、prototype reaction；冇新增或刪除任何節點。Component set 本身唔支援加 Section 標題，所以分組靠 State 欄位次序同統一間距表達。
- 隱藏嘅 `text-field property table` 冇動。
- 需 Alan Publish（只係位置改動，instance 唔受影響）。

## 2026-10-16 — Text Input（Text field 頁）Dark 顏色優化（只用現有 token，需 Alan Publish）

- (Alan:「幫我改善一下整套 text field system dark mode 的顏色，請使用 tokens」)`Form / Dark / Text Input`（17463:93293）30 個 variant，冇新增 token：
  - 輸入框底色：Default / Focused / Error 由 `surface/panel`（#161616）改 `surface/input`（#1e1e21），令輸入框同面板底有分別，唔再淨靠邊框。
  - Hover：底色 `surface/faded` → `surface/row-hover`（#2a2531，同 Button / 列表 hover 一致），邊框保持 `border/subtle`。
  - Focused：邊框 `action/primary/content/hover`（#9c70ff）→ `border/interactive`（#b89afa），用返語意正確嘅邊框 token。
  - Disabled：底色 `surface/faded` → `surface/disabled`；prefix / suffix 文字 `text/placeholder` → `text/disabled`（之前比 disabled 數值更亮）。
  - Error：prefix / suffix 文字 `text/secondary` → `text/placeholder`，同其他狀態一致；`border/error`、`status/error/text` 不變。
- 冇改：邊框 `border/default`、Value / Placeholder 文字、`border/faded` 分隔線、隱藏嘅 helper 文字、間距同 prototype。
- 留意：`border/default`（#545454）對 #1e1e21 對比約 2.3:1，低於 3:1；已有 `border/subtle`（#676767）可用，但會同 Hover 邊框撞色，留待 Alan 決定。

## 2026-10-16 — Text Input（Text field 頁）spacing 優化（只用現有 spacing token，需 Alan Publish）

- (Alan:「幫我改善一下整套 text field system spacing，請使用 tokens」)`Form / Dark / Text Input` 30 個 variant，`field` 左右內邊距同內部 gap 按 Size 拉開層次，全部綁現有 `spacing/*`，冇新 token：
  - Small（28）：左右 `spacing/8`、gap `spacing/8`、prefix / suffix 分隔 `spacing/8`（不變）。
  - Medium（36）：左右 `spacing/8` → `spacing/12`；gap `spacing/8`；prefix / suffix 分隔 `spacing/8`。
  - Large（48）：左右 `spacing/12` → `spacing/16`；gap `spacing/8` → `spacing/12`；prefix / suffix 分隔 `spacing/8` → `spacing/12`。
- 原本已綁嘅項目保持：上下內邊距 `spacing/8`、label / helper gap `spacing/4`、content gap `spacing/2`、圓角 `radius/md`、高度 28 / 36 / 48。
- `spacing/control-inset`（=unit/10，scope 只有 GAP）冇用，因為 scope 唔可以綁內邊距。
- 欄寬係 FILL，所以內邊距加大唔會令文字溢出；已睇截圖確認。

## 2026-10-16 — Library：Switch 補齊 state、重排 variant、加 prototype（需 Alan Publish）
- (Alan:「幫我完善一下 Switch variant, 排版好再加上 prototype」)`Switch`（17463:86660，Switch 頁）只用現有 token，冇新增 variable，冇刪任何 variant。
- 新增 variant 屬性 `state`（Default / Hover / Pressed / Focused / Disabled），由 4 個變成 20 個 variant（`on/off` × `label` × `state`）。原有 4 個改名加 `state=Default`，外觀冇改。
  - Hover：On 軌道 → `color/purple/500`；Off 軌道 → `action/neutral/background/hover` + 1px `border/interactive`。
  - Pressed：On 軌道 → `color/purple/300`，Off 軌道 → `action/primary/background/default`，圓點兩者都 → `color/purple/200`。
  - Focused：軌道外 2px `border/interactive` 焦點環，其餘同 Default。
  - Disabled：On 軌道 → `action/primary/background/focus`；Off 軌道 → `surface/panel` + 1px `border/disabled`；圓點 → `icon/disabled`；文字 → `text/disabled`。
- 排版：整理成 grid，欄 = state（Default / Hover / Pressed / Focused / Disabled），行 = On / On + label / Off / Off + label；欄距 88、行距 56、邊距 48，variant 取消 clip 令焦點環唔會被切。
- Prototype（Change to + Smart animate 0.1s ease-out，同其他 Library 元件一致）：Default 懸停 → Hover；Default / Hover / Focused 按下 → Pressed（同一 on/off 值）；Pressed 點擊 → 相反 on/off 嘅 Default（跟 Checkbox / Radio 慣例）。Disabled 冇互動。原本 4 個 Dissolve 點擊切換 reaction 已取代。
- 描述已更新。Publish 後 Switch instance 會多一個 `state` 屬性，預設 Default，原有 instance 唔受影響。

## 2026-10-16 — Link 頁排版整理（只改位置同文檔表格，需 Alan Publish）

- (Alan:「改善 "Link" 頁的排版」)Link 頁 `link` component set（17463:67640）15 個 variant 重新排成 grid：欄 = Default（disabled=false）/ Disabled（disabled=true）/ Hover，行 = primary / critical / positive / warning / inherit。之前 5 個 Hover variant 跌咗出 property table 下面。
- Variant 位置喺每格（100 × 68）內置中；set 尺寸 300 × 340。
- 文檔用嘅 `link property table`（17463:67615，Grid layout）加咗第 4 欄（5 格 variant-preview + 1 個 header，header 文字 `state: hover`），標籤欄闊度 57 → 88、header 行高 25 → 36，修正之前 `primary` / `false` 等文字被切走。
- `component` frame（17463:67614）改為 300 × 340，`main` 同最外層 frame 跟住變闊（Hug），左邊 meta 欄冇動。
- 冇改 variant 名、屬性、tokens、顏色、prototype；冇刪任何節點。

## 2026-10-16 — Logo 頁整頁排版整理（需 Alan Publish）

- (Alan:「改善整頁的排版」,`Dark Mode_Logo & Images_ENG`,17463:27755)原本 logo、component set、partner logo 同系統視窗散放喺 frame 入面,冇分組。
- 新增 `Content` auto layout frame（橫向 wrap,內邊距同 gap 綁 `spacing/64`,寬度 1400 不變）,入面 6 個 `Section / …` 直向 auto layout（標題同內容 gap `spacing/24`,項目 gap `spacing/32`）:VOTANIC logo、XRCC app icon、Partner logos、Cursors、Card preview、System dialog。標題用現有 text style `heading/sm`,顏色綁 `text/on-dark/primary`。
- 所有 component、component set 同 instance 只係移入 section,id、名同內容冇改,冇刪任何節點。最外層 frame 高度由 1620 改為 1495 貼合內容。
- 冇新增 token。位置改變唔影響 instance,但 component 嘅 parent 變咗,Publish 前建議 Alan 睇一次。

## 2026-10-16 — PC UI 檔 Components section 整頁重排（只改位置，非 Library）

- (Alan 揀「全部重排」,`⭐20251125_XRCC4.0_PC_UI` Components 頁 section 4071:322329)
- 14 個大畫面 frame 由一條 41170 闊嘅橫排，改成每行最闊 18000、頂線對齊、橫向 200 / 直向 400 間距嘅兩行，保持原本左至右次序。疊喺畫面上嘅散件（Group、Panel、Pattern 03、EmptyObject、New Tag、EULA、State、Empty box 等 17 件）跟住所屬畫面一齊搬，相對位置不變。
- 19 件冇疊喺畫面上嘅 component set、instance、`Unity-shader` section、`Test AI Response` 等，按名稱排序放入下面「Shared components」區 grid（間距 160）。兩區各加一個標題文字（Roboto Bold 120）。section 尺寸改為 18880 × 24038。
- 冇改內容、名稱、prototype、tokens，冇刪任何節點。Components 頁 section 以外嘅 21 個物件（x ≥ 58898 嘅 Design Guidelines 同 Dark Mode frame）冇動。
- 原始位置記錄喺 /mnt/project-files/design-system/20261016-pc-ui-components-section-original-positions.md，亦可用 Figma Version history 還原。

## 2026-10-16 — Library「Internal」頁排版整理（只改位置同容器，需 Alan Publish）

- (Alan:「改善排版」,XRCC (PC) Library node 17465:305)
- `utilities` frame（17463:94766）改為直向 Auto Layout（Hug），內邊距同 gap 綁 `spacing/40`，寬度由 929 變 865。入面 `.border-shadow property table`、`.hint` + `.color`（新 `Helpers` 橫向 auto layout 包住，gap 綁 `spacing/40`）、`DIY/Table row` 依次左對齊，唔再有錯位。
- 頁面層級改為統一 80 間距：`utilities`、`meta`（x 999 → 945）、`check` + `.rectangle`（疊埋一欄放喺 meta 右邊）同一頂線；`assets` section 放喺下面（y 1831 → 1094，x 12 → 0）。
- `assets` section 入面 5 件重排成 grid（section 內邊距 / 間距 80）：`overlay` 左欄；`Design Symbols Header`、`dismissible`、`image 31` + `Notion link` 右欄，由上至下。section 尺寸 3074 × 2086 → 2185 × 1047。
- 原本位置：meta (999,0)、check (0,0)、.rectangle (1195,986)、assets (12,1831)；utilities 子項 table (36,40)、.hint (92,763)、.color (476,746)、DIY/Table row (92,936)；assets 子項 overlay (245,288)、Design Symbols Header (995,288)、dismissible (1188,1458)、image 31 (245,1333)、Notion link (245,1396)。
- 冇新增 token，冇改 component 內容、variant、名稱，冇刪任何節點。Component 位置改變唔影響 instance；Publish 前建議睇一次。

## 2026-10-16 — PC UI 檔所有 pages 排版整理（只改位置，非 Library，唔使 Publish）

- (Alan:「⭐ 20251125_XRCC4.0_PC_UI 所有 pages 改善全部的排版，深入」)
- 方法：每頁頂層節點先按關係分組（標題 / 小型散件跟住最近或疊住嘅大畫面，疊住嘅大畫面同組；距離 250 以內歸屬，其餘散件按 150 內聚成小組），每組當一個整體搬；再按原本左至右次序分成欄，欄內由上而下排，欄距 400、組距 300，頂線同左線對齊。組內相對位置不變。
- 已整理：Item Tag UI（22 → 7 欄）、UI Part 01（54 → 10 欄）、UI Part 02（104 → 16 欄）、XRCC UI 4.0（114 → 18 欄）、Async Importing Asset（14 → 8 欄）、XRCC Play with VR Headset（12 → 3 欄）、Components 頁 section 以外嘅 20 個物件（→ 6 欄，包括之前遠離嘅 Scene List、Design Guidelines）。
- 冇動：Cover、All Figma files、User Journey（手排小圖，改動風險大）、Behaviour（Block 同連線互相對位）、Release Notes Image（裝飾向量），以及兩條 `---` 分隔頁。
- 冇改任何節點內容、名稱、prototype 或 token，冇刪任何節點。XRCC UI 4.0 做咗程式檢查：34 個大型項目互相冇重疊。UI Part 01、UI Part 02、Item Tag UI、Async、Components 睇過總覽截圖；XRCC UI 4.0 同 VR 頁截圖因為太大出唔到，冇睇。
- 還原：冇另存座標，請用 Figma Version history 返到 2026-10-16 05:43 之前嘅版本。Components section 嘅原座標另存於 20261016-pc-ui-components-section-original-positions.md。

- (2026-10-16 補充，Alan 揀「補齊餘下頁」)User Journey（9 → 3 組直排）、Release Notes Image（12 → 5 欄）用同一方法整理；Release Notes 嘅裝飾圖案（Decorative Vector / Ellipse、Isolation_Mode、Nested Group）屬一幅組合圖，已還原返原座標。Behaviour 頁（Block 同連線互相對位）故意冇動。畫面板內部（手排標註流程，有箭頭連線）冇動，自動重排會令箭頭離位。Release Notes Image 頁有一個 `XRCC` frame（4697:268487）唔係我建，冇動。

- (2026-10-16，Alan:「逐個畫面板整理內部，先整理 XRCC UI 4.0」)XRCC UI 4.0 頁 21 個畫面板（sections 同大 frame）逐個程式掃描：入面係手排標註流程（橙色箭頭連住畫面同說明），冇多餘或超出板範圍嘅畫面；只有 2 組文字重疊，已微調：Profile 板 `4071:211381` 下移 27、Download/ Import manager 板 `4071:213255` 上移 12。另有 3 條 Arrow 同 1 個說明框略出板邊，屬畫面標註，冇動。冇做大規模重排，因為會令箭頭離位。

## 2026-10-16 — Library「All Figma files」索引表加入新 files（需 Alan Publish）

- (Alan:「根據整個 Figma 全部 Files，整理重要 files 到此列表，加入 link 同 Description」,XRCC (PC) Library node 17463:26139)
- 表格本身已有 8 行。新增 4 行（clone 現有 `DIY/Table row`，Fill 闊度，位置喺 Runtime Debug Panel 之後）：XRCC Claude Workbench、AI Workflow - Missing Poe Key Prompt、Voyage360 UI - PC + VR、XRCC 3.0 UX/UI Design Guideline（Legacy，標明 reference only）。每行文字有 link，Description 兩行以內。
- 修正：XRCC (PC) Library 一行原本 link 指向自己嗰行 node（17482:18106），改為指向呢個索引表嘅 URL。
- 冇動：`Main Scene` 一行（17759:582，普通 Row frame，冇 link，key 未知），欄標題維持 File name / Features。
- 範圍：Figma 冇列出全部 files 嘅工具，所以以 project 已登記嘅 registry（votanic-workflows.md）加 Notion 搵到嘅 link 為準；其他未登記 files 需要 Alan 俾 link。
- 冇新增 token，冇刪任何節點。

- (2026-10-16，Alan:「到 UI Part 02」)UI Part 02 頁 50 多個板逐個掃描：冇隱藏物件，冇畫面超出板範圍；只有 6 個板有 1-2 個伸出板邊嘅標註（箭頭、Column、Design Guideline 說明），屬原本標註。有 2 組文字框範圍重疊（Specialize Objects 板，`4071:110291` / `110292`、`110310` / `110311`），文字內容短過文字框，視覺上冇疊字。本頁板內冇改動。

- (2026-10-16，Alan:「User Journey」)User Journey 頁：之前頂層重排令 Avatars / Step Number / Step Label 同步驟文字分咗家，已還原返原座標；再將三個元件 set 頂邊由 y=10 對齊標題 y=0。`POE in XRCC` section 入面 3 張 A4 同日期標題已按日期分組（6 Nov 兩張、7 Nov 一張），冇其他問題，冇動。

## 2026-10-16 — Claude design system 套件更新（對照 Library 現況，非 Figma 改動）
- (Alan:「design system 有 update 了，固定每星期更新」)對照 Library 變數同 component set 後更新 `claude-design-system/` 同 zip：colors_and_type.css 補返 Primitive（cyan 100/300/500/accent、magenta 100/600、indigo 200）、Avatar 顏色 token、hover 動效（100ms ease-out）；components-full.md 更新 Tag 120、Checkbox 26、Radio 24、Switch 20、Link 15、Text Input 30、Slider 7 嘅 variant 同屬性；components.md 補 Hover / state 說明；xrcc-ui.css 補 Text Input 按 size 嘅 padding（8/12/16）、hover 底色，Switch / Tag / Checkbox / Link 狀態。冇新增 token。Alan 需喺 claude.ai 重新上載。

## 2026-10-16 — Library「Button」頁完善（需 Alan Publish）

- (Alan:「完善 Button components & variant，例如 pressed variant，review 所有 design，包括所有 variant，並且整理全部排版」，XRCC (PC) Library node 17465:279)
- 審查發現：Primary / Secondary / Tertiary 缺 Pressed；原有 `Focus` variant 全部隱藏，而且 Primary / Secondary 嘅 Focus 其實用 pressed 底色、2px 外框冇顏色，Square 嘅 press 亦指向 Focus；所有圓角係 raw 8，冇綁 token；Secondary 嘅 icon 顏色同文字唔一致（有 `icon/accent`、`action/primary/content/default`、`text/accent` 三種）；Icon（圓形）嘅 icon 用 primitive `color/purple/100`，Disabled 時 White 用 `text/disabled`、Border 用 `icon/disabled`；Square 嘅 icon 喺 Disabled 都係白色；Icon 尺寸係 48 / 40 / 32，同 Library 規則 48 / 36 / 28 唔一致；Loading 只有 Large 一個，而且 spinner 用 raw `#b89afa@35%`。
- Primary / Secondary / Tertiary（各 48 個 variant，原本 37 / 48 / 37 左右）：
  - 新增 `State=Pressed` 九個（Size × Leading / Trailing icon）。Primary / Secondary 用 `action/primary/background/pressed`；Tertiary 用 `surface/elevated` 底 + `border/strong` 邊，同 Hover（`border/default`）分得開。
  - 新增 `State=Loading`：Primary 補 Medium、Small；Secondary、Tertiary 補 Large、Medium、Small。Spinner 綁返文字色 token，軌道用同一 token @35% 透明度（取代 raw hex）。
  - `State=Focus`：重做成「Default 底色 + 2px 外框 `border/interactive`（紫）」，並取消隱藏。原本 Focus 用 pressed 底色嘅效果，而家由 Pressed 負責。
  - 全部圓角綁 `radius/md`；Large 純文字 variant 嘅 raw gap 10 綁 `spacing/control-inset`；Focus 嘅最小闊度同 Default 對齊（Small Focus 原本變咗 96 闊）。
  - 文字同 icon 顏色一律綁同一個 token：Primary `action/primary/content/default`、Secondary `text/accent`、Tertiary `text/primary`，Disabled 全部 `text/disabled`。
- Icon（圓形，45 個 variant）：Medium 40 → 36、Small 32 → 28（icon 20 / 16），同 Library 規則一致；新增 Pressed 九個；icon 顏色改綁 `action/primary/content/default`（Primary）、`text/accent`（Border）、`text/primary`（White），Disabled 全部 `text/disabled`；Focus 外框加喺 variant 層（圓形），唔再借用 Disabled 色。
- Button Square（30 個 variant）：新增 `28px`（Default / Hover / Pressed / Focus / Disabled）同 Pressed 各尺寸；Pressed 用 `action/primary/background/pressed`；Disabled 嘅 icon 改 `icon/disabled`；Focus 改為 2px 外框 `border/interactive`（原本係 `surface/accent-muted` 底）。
- 排版：Primary / Secondary / Tertiary 用同一個 grid，欄 = Size（Large / Medium / Small）× icon 位置，列 = Default / Hover / Pressed / Focus / Disabled / Loading，欄距 16、組距 64、列距 32、四邊 64；Icon 同 Square 用同樣規則（欄距 24、組距 64）；Header Button / Behaviour tool / Header Tag / Header Tabs 放同一橫列，Header Listing 同 Button Square（新增標題）放下一橫列，列間距統一；各 section container 改為 Hug 高度，唔會互相壓住。
- Prototype：全部 Default → Hover（While hovering）、Hover → Pressed（While pressing），統一 Smart animate、Ease out、0.1s。原本 Default → Hover 係 Dissolve，Square 嘅 press 指向 Focus，已一併改。Disabled / Focus / Loading / Pressed 冇 interaction。Tabs、Header Tabs、Header Button、Behaviour tool、Header Listing 冇動（各自有專用 state）。
- 冇新增 token，冇刪任何 variant、component 或 frame；全部 Dark mode；掃描所有 Button component set，無任何未綁定嘅 raw 填色或邊色。
- 待 Alan 決定（冗餘 / 命名）：(1) Button Square 另有 40 / 32 / 24 三個尺寸，唔屬 48 / 36 / 28，已獨立放喺右邊一組；(2) Icon 嘅 Type 名 `White` 實際係 Tertiary 樣式、`Border` 係 Secondary 樣式，改名會影響已用 instance，所以冇改；(3) Header Button 嘅 `Light / Enabled / Hover`、Header Tabs、Tabs 冇 Pressed，如果需要再補；(4) Secondary Hover 底色係 `action/primary/background/hover`（#2a2531，比 Default 更暗），Pressed 係 #4b387d，兩者拉開得清楚，但 Hover 比 Default 暗係原本設計，冇改。
- 還原：Figma Version history 返到 2026-10-16 06:19 之前嘅版本。

- (2026-10-16 補充，Alan:「做埋 prototype」)Button 頁餘下 set 嘅 prototype 補齊：Header Button、Behaviour tool、Header Listing 原有 Hover / Click 連線保持不變，transition 由 Dissolve 統一改為 Smart animate、Ease out、0.1s；Tabs（On / Off）同 Header Tabs（Edit / Behaviour）新增 On click 互相切換。全頁 98 條 interaction 已逐條核對，全部係 Smart animate 0.1s Ease out。冇新增 variant、token，冇刪任何節點。

## 2026-10-16 - Button Square：Click 後 icon 變返 arrow-left（Library 修正）
- 問題：Workbench（Runtime Debug · Manage debug items，節點 619:3251 `More button`）Click 時 icon 變成另一個。原因：Library 嘅 Button Square（18013:2683）有 18 個 variant 嘅 icon 層冇連去 instance-swap property `Icon#18013:9`（Focus 全部尺寸、Pressed 全部尺寸、28px 四個 state、40px Default / Hover / Disabled），Prototype 一跳去呢啲 variant，instance 嘅 icon 覆寫就失效，顯示預設 icon/outline/arrow-left。
- 修正（XRCC (PC) Library）：將呢 18 個 variant 嘅 icon 層連返去 `Icon#18013:9`。冇改預設 icon、顏色、token、variant 數量。
- 驗證：用 28px 臨時 instance 換成 icon/outline/more-vertical，Default / Hover / Pressed / Focus / Disabled 五個 state 截圖，icon 全部保持一致，Disabled 保持 `icon/disabled` 灰，臨時 frame 已刪除。
- 待 Alan：喺 Library Publish，再喺 Workbench 按 Update library；Workbench 目前仍用舊版（Hover / Press 指向 Focus variant），更新後 Click 就唔會變 icon。
- 備註：Workbench 內 24 個 More / Close button 嘅 prototype 仍係 Press → Focus；Library 已有 Pressed variant，如果想 Press 用 Pressed 底色，可以再改。
- (2026-10-16 補充，Alan 回報 Debug Panel) Debug Panel（1fAQ8bgTaI2RWLYJRBb3Aw）Debug Item Row 嘅 Locate 掣（Button Square 32px，icon/outline/target）Press 時變「<」，原因同上：Press 指向 Focus variant（5300:21956），其 icon 層冇連 `Icon` property（ref 為空）。Library 已修正，Debug Panel 冇改動；Library Publish → Workbench Update library（如 Row 係 Workbench 發佈）→ Debug Panel Update library 後生效。

## 2026-10-20 — 新增 Icon `icon/outline/usb-1px`(Alan 嘅 USB 圖,待 Publish)
- Library 已有 `icon/outline/usb`(17463:32341),冇覆蓋,新畫嘅另存為 `icon/outline/usb-1px`(18344:327,`Icons / Outline` frame 最尾)。
- 24×24、1px、Round cap/join、單一 vector:左空心圓、主幹加箭頭、上支線接圓(中間細點)、下支線接圓角方塊(中間細點);描邊綁 `icon/inverse`;冇新增 token。**需 Alan Publish。**

## 2026-10-20 - Runtime Debug Panel: Variable List dropdown arrow 12×12

- File: Runtime Debug Panel (1fAQ8bgTaI2RWLYJRBb3Aw). No Library component or token changed, nothing to Publish.
- Cause: the 16×16 arrows sat inside the legacy `Form / Dark / Select` (State=Filled), where the arrow's size cannot be overridden on an instance. The new `Form / Dark / Select` (Size=Medium) has an `end slot` with a 12×12 arrow.
- Change: 4 legacy Selects in local `Instance Variables / Dark / Pattern 01` (Number, Boolean, Vector, Color) and 20 legacy Selects in the Variable bar slots of the new Variable List frames were swapped for the new Select, same width, same label, text kept at body/sm. Arrow reset to rotation 0 (new Select defaults to -90), 12×12 centred in the 24×24 end slot, stroke bound to text/primary (same as adjacent text).
- Result: all 111 arrows in Variable List screens are 12×12, centred, text/primary.
- Left as is (not Variable List): legacy 16×16 Selects in 03 - Debug Panel & Settings, 04 - PC Debug Panel and "Others" (27 arrows).

## 2026-10-20 - Workbench: Runtime Debug · Project Variable（新 page，Project Variable 橙色版）

- File: XRCC Claude Workbench（ZBOB48n4eLsZABCTnhh5kk）。新 page「Runtime Debug · Project Variable」（667:5566）由 Manage debug items 複製再改；原 page 冇動。冇改 Library，冇新增 token，唔使 Publish。全部 Dark mode。
- 橙色 = `book marked/yellow-bg`（#684716，同現有 Warnings tab 同一個）；hover 邊框用 `behaviour/project-variable`。
- Components page（feature 專屬）：Debug Toggle（271:115）同 Debug Item Row（272:248）加 `Tone` property（Default / Project）。原有 variant 改名加 `Tone=Default`，新增 Project variant（Toggle 8 個、Row 13 個）。
- 新 page 內容：Debug items 只列 Project Variable，單一群組「Project variables · All scenes」；active tab、chip、W / L toggle 用橙色；header 下加 4px accent bar；Warnings tab 同相關 boards 移除；文案全部改成 Project Variable 場景（Gallery open、Visitor spawn、Ticket price 等）。
- 新增畫面：Board 25-27（空白 Project Variable panel、有 W / L badge 嘅 panel、Debug settings popover）、Board 28-30（已刪除變數、窄 360、闊 840）。Popover 為自繪 frame，只用現有 token（surface/header、border/tooltip、radius/lg、shadow/dark/3）。
- 已知限制：(1) Prototype 點 tab 會跳去 Library 嘅 Pressed variant（紫色）；(2) Library Variable bar 非 hover 行嘅 W / L badge 仍係紫色（來自 Library component，冇改）。

## 2026-10-20 - Workbench: Project Variable 版 Variable Configuration（跟新設計，同 Manage debug items 分開）

- File: XRCC Claude Workbench，page「Runtime Debug · Project Variable」，新 section「Variable Configuration · set Watch and Log per variable」（690:11997）。參考 Runtime Debug Panel 5193:29888（Variable Configuration）。冇改 Library，冇新增 token，全部 Dark，唔使 Publish。
- 用返新設計嘅 component（Instance Variables / Variable bar、top bar，Form Select / Text Input / checkbox / RGB inspector，debug icon、Tooltips、dropdown-menu、Dialog），Value 用 slot 按類型換內容。Header、Add Variable、W / L 開啟狀態、accent bar 轉橙色（`book marked/yellow-bg`），按鈕文字同 icon 綁 `text/primary`。
- 9 個畫面：預設、W header tooltip、row tooltip、⋯ menu（Delete）、rename、drag reorder、空狀態、兩個「Turn off all Watch / Log」確認 dialog。
- 取代我之前自己砌嘅舊 Variable panel 畫面（Board 25-27 同其 flow line），已刪除；Debug settings popover 唔再需要。
- 已知：Library checkbox 打剔後仍係紫色（來自 component）；bug icon 橙色 on 狀態係 Subtract 層覆寫；Variable bar 設計固定闊度 900，未做窄版。

- (2026-10-20 補充，Alan:「Project 版主要上方橙色，其他按需要」) 橙色縮到上方：header 下 4px accent bar 同 Add Variable。Tab、chip、W / L toggle、bug icon 全部還原預設紫色（Runtime Debug · Project Variable 全部 boards 同 Variable Configuration）。Debug Item Row 嘅 Tone=Project variant 內嘅 toggle 改返 Default，Row 只剩 hover 邊框用 `behaviour/project-variable`。冇新增 token。

## 2026-10-20 Runtime Debug Panel: Delete menu item states (comment 1973283773)
- File 1fAQ8bgTaI2RWLYJRBb3Aw, page "01 - Design", section "Variable Configuration". Added 3 frames (5556:260 Default, 5556:288 Hover, 5556:329 Pressed) beside dropdown-menu 5148:44062, prototype linked (hover -> hover state, press -> pressed state, leave/click -> default).
- Original dropdown-menu 5148:44062: menu-item changed to color=critical (was primary), icon fill bound to status/error/text.
- Hover = menu-item critical/highlighted: overlay fill status/error/background at 15%. Pressed = critical/selected with overlay opacity 25% (library has no pressed variant; selected equals highlighted). Text and icon: status/error/text. No new tokens.
- (2026-10-20，Alan:「surface/header 偏紫，唔搭橙」) Project 版嘅標題列（Debug Panel head / Header，23 個）同 Variable Configuration top bar（9 個）由 `surface/header` 改為兩層：`surface/panel` + `book marked/yellow-bg` 30% 透明，偏暖啡。只改 instance / frame 填色，冇動 token 或 Library。Dialog body、tooltip 參考表仍用 `surface/header`（Library 元件）。
- (2026-10-20，Alan:「欄位 header 請 reset 返淺紫色」) Variable Configuration 嘅欄位列（Variable Name / Type / Value，9 個 top bar）還原為 `surface/header`；Debug Panel 標題列維持暖啡。
