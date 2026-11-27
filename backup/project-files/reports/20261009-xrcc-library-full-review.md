# XRCC (PC) Library 全面 Review(2026-10-09)

檔案:`De8nKqO81yciw4wH5xfpxA`,由 node 17463:26139(All Figma files)開始。範圍:37 頁(Cover…UI kit)、約 58 個 component set 同零散 component、341 個 icon、Design tokens 文檔頁。方法:逐頁用 Plugin API 讀取(命名、property、variant 覆蓋、hidden 層、未綁定 fill/stroke/spacing/radius、text style、描述),再用截圖核對視覺。所有改動都喺草稿,**未發佈**;逐項記錄喺 `design-system/20261008-library-change-log.md`(2026-10-09 review 段)。

## 一、已經執咗(安全、值不變)

| 項目 | 數量 | 說明 |
|---|---|---|
| 文字連去現有 text style | 557 個 | Library component 內文字原本只綁 variable、冇連 style(636 個入面 557 個完全吻合 10 個 style)。視覺不變,但 dev handoff / Inspect 現在會顯示 `body/md` 等 style 名 |
| Spacing / padding / radius 綁 token | 422 處 | gap 138、padding 195、圓角 89,值完全相同,只用現有 `spacing/*`、`radius/*` |
| Avatar faded 底綁 `surface/faded` | 24 處 | 白 3% 原本係 raw |
| Icon 亂碼名還原 | 9 component + 21 內層 | 例:`doubluetooth-low-energy-arrow-down` → `double-arrow-down`、`probluetooth-low-energym` → `problem`(舊搜尋取代把 "ble" 換咗做 "bluetooth-low-energy") |
| Component 描述 | 重寫 11、新增 21、修 1 | 移除錯誤模板句「Variant naming normalized…」同唔存在嘅 property(例如 checkbox 嘅 Type);Notification 描述 `&amp;#39;` 還原 |
| 文檔外來文字 | 2 處 | Switch 「InputCheckbox」→「Checkbox」;Popover 預覽內嘅範本評語換成 XRCC 語境文案 |
| Design tokens 頁過時內容 | 3 個 frame | Typography 表更新為現行 10 個 style,中文表用 `zh-hant` mode;Unit 表標籤改 `spacing/N` 並刪冇 token 嘅色塊;Radius 表標籤改實際 token 名 |

截圖核對:Text field、Switch、Pin field、Tooltip、Avatar、Popover、Typography、Unit 頁面渲染冇變。

## 二、未做(要你決定,或者有風險)

**A. 會影響消費檔嘅命名(改咗要逐個檔 re-link 或會令 instance property 重置)**
1. `Property 1/2/…`、`Variant2/8` 命名:Button / Dark / Tabs、Header Tabs、`Connections / … / Full Tabs`、Notification / Dark(Default / Variant2 / Variant3,其實係 Message / Progress / Compact)、Home / Dark / Pattern 05(8 個 variant 其中一個叫 Variant8)、舊 Switch 「Form」(Property 1–5,其中三個只有單一值)、Logo 三個 set。
2. 同名唔同物:Radio 同舊 Switch 兩個 set 都叫 `Form`;建議改 `Form / Dark / Radio` 同刪舊 Switch(見 B)。
3. 值嘅大小寫/拼寫:`nomal`(Behaviour tool)、Header Button `light | hovering | Enabled`、Header Listing `hovering`、Tab `status=on/off/hovering`。
4. **Property 命名慣例分兩代**:A 代(`Button / Dark / *`、`Form / Dark / *`)用 `State`、`Size`、`Type`;B 代(alert、avatar、badge、switch、menu-item…)用小寫 `state`/`size`/`color`/`variant`。Text Input 係 `state` 小寫但 Select 係 `State` 大寫。建議定一個規則(例如:新 set 一律 Title Case),舊嘅唔郁。

**B. 疑似遺留 / 重複(刪除前要確認有冇檔案用緊)**
- 舊 Switch 「Form」(4 個 variant,Property 1–5)同新 `switch`(24 個 variant);`Button / Dark / 40px`、`48px`(同標準 48/36/28 衝突,冇描述);`Button / Dark / Tabs`、`Header Tabs` 同 `Connections / … / Tab`、`Full Tabs` 功能重疊。
- Checkbox 嘅 `check` 有 `- (old)`、`check (old)` 兩個值(17 個 variant,理論 45,即大量組合缺失);Select 有只得一個值嘅 property `Description Label=False`。
- Icons 頁 frame 17663:1486:`36. Earth 2/3/4`、`7. Cube`、第二個 `outline/package`——0 個 instance,有 raw fill,似係未整理嘅匯入。
- `All Figma files`(你開始嗰個 node)係一個 **COMPONENT**,會跟 Library 一齊發佈;入面 14 個 hidden 嘅 "Feature name" 文字,同 3 個檔(AI Quiz、Runtime Debug Panel、Main Scene)嘅 Features 仲係 "Feature name" 佔位字。建議轉做普通 frame,補返文字。
- Popup 頁:6 個零散 component(兩個同名 `Delete Creation Result`、`Frame 126` 預設層名),冇描述、冇文檔 frame;`Notification/Creation error` 同 Notification / Dark 功能重疊。
- `Asset card` 頁(4 個 set)喺 review 中途由檔案移走:按 Alan 指示,專屬 feature 嘅 component 改放工作檔 Components 頁,所以係預期內,唔需要還原。

**C. 缺失狀態(設計決定)**
- 冇 Focus:Button 全系、Checkbox、Radio、Switch、Link、Menu item。冇 Hover:Checkbox、Radio、Switch、Text Input(有 focused 冇 hover)。Slider Bar 9 組合得 6 個。
- Loading 淨 Primary 有。

**D. Token / Style 缺口(你講過唔加 token,所以只列出)**
- 79 個文字冇對應 style:`Bold 10/12`(40 個,Avatar/Badge 細字)、`Medium`(35 個:Switch label 同 tooltip 等,14/20、16/24、11/16)、`40/44`、`SemiBold`。
- 殘留 raw:Tooltip 箭咀 stroke `#5C4E7B`(12)、Slider hover 氣泡 `#392E52` / `#0D0D0D`、icon `load`(1 fill)、`bug`(11 stroke)、Avatar 另外 12 個 faded 底、Avatar icon 型嘅 vector 顏色(喺 instance 內層,改要入 Icon instance)。
- Gap 10(54 個)未綁:`spacing/control-inset` 語意係 padding,用喺 gap 唔啱;padding 1/42/60/80、radius 1198.8 冇對應 token。
- 125 個 hidden 層(Text Input、Text area 各)冇綁 visible property,應係 slot/prefix/suffix 結構,冇功能問題,但清理前要逐個確認。

**E. 文檔頁(Library 嘅 docs frame)**
- 範本遺留:Avatar 頁文字係 Link 文檔(「On background colors / links」)、Loader 頁同樣;Tooltip 頁示範標籤用 `top-start`… 但 component variant 係 `Arrow/Location`;Slider 示範文字 "words"。
- Avatar、Popup、Internal 冇 meta 文檔 instance。
- Design tokens:Shadow 頁寫「3 個 shadow token」但實際 effect style 係 10 個(`shadow/dark|light/1–5`);Color 頁只示範 Neutrals / Brand,冇 Theme 語意 token;Radius 頁只示範 4 個(共 11 個 token)。
- Description 語言混用:Badge、Tag 係中文,其餘英文。

**F. Icon 命名一致性**
- 行為 icon 冇前綴(`flow`、`math`、`time`、`variable`、`Motion`、`3DModel`、`3D `〔尾隨空格〕、`video`、`string`)、社交 icon 冇前綴、`heart-outlined`、`outline/specialize-object` 放咗喺 Solid frame、字連埋嘅名(`behaviorerror`、`versionwitherror`、`sortdown`)。改名會令消費檔嘅 icon 名變,建議一次過同 dev 對好先做。

## 三、建議優先次序

1. **(高)Publish 今次草稿**,然後喺 PC UI / Workbench / Launcher Update library;留意 icon 名同 text style 連結會出現喺 Inspect。
3. **(中)清走 A 代遺留**:`Button / Dark / 40px`、`48px`、舊 Switch Form、Checkbox 兩個 `(old)` 值——先用 Figma 嘅「Library analytics / 搜尋 instance」睇冇人用,再刪。
4. **(中)統一 property 命名**:`Property N`/`Variant N`/`nomal` 一次過改(最好同 dev 約好,因為 instance override 會重置)。
5. **(中)補狀態**:Focus(Button、Checkbox、Radio、Switch、Menu item、Link)同 Hover(Checkbox、Radio、Switch、Text Input)。
6. **(低)更新 docs**:Shadow/Color/Radius 頁、Avatar/Loader/Tooltip 範本字、Popup 加 meta 同描述、`All Figma files` 轉 frame 並補 Features。
7. **(低)Icon 命名同未整理匯入**:整理 17663:1486、補前綴。

## 四、你要做嘅

1. 喺 Library 檔 **Publish**(Library 草稿有今日 review + 之前未發佈嘅改動)。
2. 用緊 Library 嘅檔(PC UI、Workbench、Launcher…)**Update library**。
3. 回覆上面 B / A 兩組邊啲可以刪、邊啲可以改名,我再逐項處理。


## 五、跟進(2026-10-09,Alan 回覆後)
- 已統一 A 代 `Property N` / `Variant N` / `nomal` 等命名(見 change log「續」段)。40px/48px、舊 Switch Form、Checkbox `(old)` 按指示保留。
- 已補 Focus:Button 六組、Checkbox、Radio、switch;補 Hover:Text Input、text-area、Checkbox、Radio、switch。Link、Menu item 未補(見 change log)。
- 58 個 Medium 字重文字就近連去 Regular style;剩 Avatar 40 個 Bold 10/12 需要你決定係咪加一個 micro style。
- All Figma files 嘅 Features 已填(Main Scene 暫為「Main Scene UI」,請核實)。
