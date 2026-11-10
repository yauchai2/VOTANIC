# Claude × XRCC Design System:做 UI 工作流程規劃

日期:2026-10-08 · 配合 `20261008-xrcc-design-system-study.md`(現況)與 `20261008-xrcc-library-component-keys.md`(component keys)
狀態:**Alan 已於 2026-10-08 確認「跟 Claude 建議」(見第 7 節);Workbench 已建立**

## 1. 目標與界線
- 目標:Claude 日後按現有 Design system,用 Alan 建立嘅 Components、Tokens、Variables 做出符合 XRCC 風格、可交付開發嘅 UI。
- 權限(Alan 指示):可自由**讀取**同**建立新**嘢(報告、新檔案、新 Figma 檔);**修改現有 Figma / 其他內容前必先問**。Notion 唯讀。
- 原則:唔自創 hex、spacing、radius、字體;冇對應 token 就停低問(見 §5)。

## 2. 工作流程(每次做 UI)

**Step 0 — 取得需求**
Alan 提供:功能名、版本(例:4.2)、目標面板/畫面、PC 或 XR、Standard/Premium 狀態。冇講嘅,Claude 列出預設假設再開工(唔停低等)。

**Step 1 — 讀行為規則(唯讀)**
Notion:Feature Hub / UX Decisions 頁(行為權威)→ Design handoff DB 相關項目 → 相關會議記錄。文案對照 Localization Keyword Glossary(物件、專案、行為/行動/動作、獲取、設置、儲存、傳送)。Notion 同 Figma 有分歧時,行為跟 Notion、視覺跟 Figma。

**Step 2 — 查現有設計**
1. `search_design_system`(`fileKey` 用工作檔;**唔限定 library key**,因 components 分散喺 6 個 library;PC UI library 有 panel 級 pattern)。
2. 先搵相近嘅現有畫面(PC UI 檔對應頁、Launcher、Assets Panel…),截圖睇 layout,再決定沿用 pattern 定新建。
3. 搵到 component → 記低 key 同 variant 屬性。

**Step 3 — 建立工作檔(新檔,唔動現有檔)**
- 新 Figma 檔,名 `YYYYMMDD_<version> <function>`(例:`20261015_4.2 Remote Control QR`)。
- 檔內頁面:`Cover/Spec`(標頭+說明)、`UI`(畫面)、`States`(狀態拆解)、`Archive`(舊版本)。唔加多餘頁。
- 標頭沿用現有畫面:左 VOTANIC logo;Projects / File Name / Date;右 "XRCC <version> UI"。
- **前置條件**:新檔要啟用 6 個 team libraries(Plugin API 無法自行啟用)。見 §7 決定 1。

**Step 4 — 組裝畫面(用 `use_figma`,一次一個 section)**
1. 先 inspect(列頁面/collections),再 build。
2. 容器:Auto Layout;gap/padding/radius **只綁 `spacing/*`、`radius/*`**;控件高度綁 `size/control/height/*`。
3. 顏色:**只綁 XRCC Theme**(Dark mode);唔直接綁 Primitive。
4. Components:`importComponentSetByKeyAsync` → 設 variant;唔 detach。
5. 文字:匯入 PC UI library 嘅 text style(`en/paragraph-2`、`zh-hant/…`);如要用 variable 綁定,family/size/line-height/weight 四項都綁。
6. Icons:`icon/outline/*` 為主,`icon/solid/*` 只用於 active/強調;大小 `size/icon/*`。
7. 每個互動元件都要畫齊狀態:Default / Hover / Focus / Disabled / Loading / Error / Empty(適用者)。
8. 組裝完截圖自查(overlap、cropped text、對齊)。

**Step 5 — 設計自查清單**
- Token:冇 raw hex、冇 raw 數值(用 `get_variable_defs` 抽查)。
- 8px grid(例外見 §4)。Section gap > component gap;高度唔夠先減 24→16 section gap,唔好壓 input/card padding。
- 純紫只用於 primary action(`action/primary/*`);一個 decision area 只得一個 Primary;選取狀態用 border + 淺底。Primary 按鈕保持右下 32px margin。
- Amber/黃只用於警告;紅只用於 error / destructive。
- 對比度:text 對 surface ≥ 4.5:1(避免 `text/subtle` 做重要文字);icon-only 按鈕要有 accessible label/tooltip。
- 錯誤預防:destructive 要確認;錯誤文案說明原因同下一步。
- PC vs XR:PC Play mode 隱藏 cursor、XR 用 wand;列出輸入方式差異。
- Standard / Premium 狀態、empty/loading/error/permission、資料極端值(超長名、0 項、99+)。
- 文案跟 Glossary;新字串附 zh-TW(必要時 zh-CN)。

**Step 6 — 交付**
- Figma:標註圈號(`Design System/Remarks/Numbering`)↔ 文字註解 1:1;標明「Ready for dev」section;註明**不變嘅部分**。
- 文件:按 W4 handoff 模板(Overview、Experience context、Behaviour spec table、Design decisions、Edge cases、Handoff & versioning)+ **Exact copy table**。以 Claude Doc / markdown 交付;**Notion 只建議內容,由 Alan 自己貼**(Notion 唯讀)。
- 回報格式:UX problem → Impact → Recommendation → Priority;標明 Confirmed / Recommendation / Assumption。

## 3. Token 速查(Claude 做 UI 時直接用)

| 用途 | Token |
|---|---|
| 畫布 / 面板 / 標題條 / 輸入框 / 浮層 | `surface/canvas` · `surface/panel` · `surface/header` · `surface/input` · `surface/elevated` |
| 一般字 / 次要 / 停用 / placeholder / 強調 | `text/primary` · `text/secondary` · `text/disabled` · `text/placeholder` · `text/accent` |
| Icon | `icon/default` · `icon/secondary` · `icon/disabled` · `icon/accent` |
| 邊框 | `border/default` · `border/subtle` · `border/strong` · `border/interactive`(hover/focus)· `border/error` |
| Primary 按鈕 | bg `action/primary/background/{default,hover,pressed,focus}`;字 `action/primary/content/{default,hover}` |
| 選取列 | `selection/background/default` + `selection/content/default`;hover 列 `surface/row-hover` |
| 危險操作 | `action/destructive/*` |
| 狀態 | `status/error/*`、`status/success/default`、`status/blue/default`;**warning:暫無(見 §5)** |
| 間距 | `spacing/4,8,12,16,20,24,32,40,48` |
| 圓角 | `radius/sm 4`(tag/緊湊)· `md 8`(預設控件)· `lg 16`(card)· `notification 10` |
| 控件高 | `size/control/height/24,32,40,48`(Input/Select legacy 36) |
| Icon 尺寸 | `size/icon/12,16,20,24,32,48` |
| 字 | Heading 1–5(32/24/20/18/16)、Paragraph 1–4(16/14/12/12);英 Roboto、繁中 Noto Sans TC |

## 4. 版面規則(兩個來源,Claude 一律跟隨)

**A. 版面間距 / 控件尺寸 → 跟 Notion「Figma UI Design Guideline (keep updated)」**(Confirmed,2026-07-07)
- 基準 1922×1080 PC frame;Window 左右邊距 32(最小 24);header → title 24;title → 內容 24;左右兩大欄 gap 48(40–64);footer divider → buttons 16;buttons → window 底 32;Primary 按鈕右下 32px。
- Label → Input 8;Input → 下一 label 16;Heading → helper 4;form group 16;card gap 16;row gap 8;section gap(24)必須大過 component gap(8/16)。
- 控件:Text input 高:Library 為 28/36/48(Alan 確認正常),Notion 寫 40 以 Library 為準,實用 36(Medium)、padding 12/16;Textarea 高 72;Button 高 40、padding 12/24;Tabs/Segmented 高 32;Tag 高 20、padding 4/8;checkbox/tick 16;Package card 高 48、padding 8/12;icon 24。
- Spacing 級別:Micro 4 · XS 8 · S 16 · M 24 · L 32 · XL 48 · XXL 64。**`spacing/64` 暫未有 token**:用 `spacing/48` + 另加 16,或交付時註明「待新增 spacing/64」。
- 高度唔夠:先將 24 section gap 減至 16;唔好壓 input/card padding。
- Tooltip:跟「Tooltip Design Guideline」(預設 top、gap 8、max 320、fade 100–150ms、唔放互動元件);字體與底色同 token 有出入,見研讀報告 §8.3,出現時註明。

**B. 顏色 / 圓角 / 字體 → 跟 Figma token**(第 3 節)。**Notion 與 Figma 衝突時**:行為同版面跟 Notion,視覺 token 跟 Figma,並於交付列出衝突。

**4px 基底細節**:`2, 4, 12, 20` 可用於 Auto Layout 內部細節;專用值 `control-inset 10`、`radius/notification 10`、`status-track 14`、`height/36` 只限對應 component。

## 5. 缺口處理規則(Alan 已確認採用)
| 情況 | Claude 做法 |
|---|---|
| 要警告色但 PC Library 冇 `status/warning` | **採用 `amber/200 #c7843a`**(Alan 確認)。因 Primitive collection 冇對外發佈,外部檔無法直接綁;所以喺 Workbench **本地**建 collection `Claude Draft (proposed)`,內含 `status/warning/{default,background,text,icon}`(值對應 amber/200),交付時標「待 Library 新增 status/warning」。**唔改 Library。** |
| 同一功能有 A 代(`X / Dark / Y`)同 B 代(通用小寫) | **A 代優先**(Alan 確認);B 代只喺冇 A 代對應時用,並於 spec 標記;用前檢查綁定(部分綁外部 variable / raw hex,見報告 §8.2) |
| Variant 名係 `Property 1` / `Variant2` 等 | 先截圖確認再用,回報列出所選 variant |
| Component 描述寫 "Candidate / Verify hierarchy" | 可用,交付時標「使用候選 component」 |
| 缺少 component | 先用最近 component 組合 + 註明;唔直接喺 Library 新增 |
| Text / Effect styles | **暫時由 PC UI library 匯入**(Alan 確認);長遠由 Alan 搬入 Library |
| Light mode | 一律用 Dark(Alan:Light 好少用) |
| 簡體中文字體 | 未需要(跟建議:暫不加 Noto Sans SC);zh-CN 文案仍按 Glossary 提供 |
| XR / CAVE / HMD 或 Voyage360 畫面 | **用各自 library/token,唔好套用 PC token**(命名邏輯不同) |
| Notion 與 Figma 數值衝突(例:Input 高 36 vs 40) | 版面跟 Notion;於交付列衝突 |

## 6. 分階段計劃
| 階段 | 內容 | 誰做 | 狀態 |
|---|---|---|---|
| A | 研讀報告(含補讀)、token/component 清單、key 表 | Claude | ✅ 完成 |
| B | 試做 **Remote Control QR 入口**(PC)喺 Workbench | Claude | ✅ 完成(Workbench frame 4:995,待 Alan 檢視) |
| C | 清理 library 缺口(warning token、`spacing/64`、Input 40、styles、命名、描述、幽靈 frame、外部 variable) | Alan(Claude 出清單,逐項批准先動) | 待 Alan |
| D | 擴展:Launcher 已讀(見研讀報告補充);XR/CAVE/HMD library 暫緩(Alan 2026-10-08) | Claude | 部分完成 |
| E | 固化成可重用 skill(`xrcc-ui-build`) | Claude 提案,Alan 儲存 | 已提案,待 Alan 儲存 |

## 7. 決定紀錄(2026-10-08)
1. 起稿位置:`XRCC Claude Workbench`(`ZBOB48n4eLsZABCTnhh5kk`),已啟用 10 個 libraries。✅ Alan 已建立。
2. Warning 色:`amber/200`;Library 唔改,Workbench 本地建 proposed token。✅(新增 `status/warning/*` 入 Library 仍由 Alan 決定)
3. A 代 component 優先。✅
4. Text/Effect styles 暫由 PC UI library 匯入,長遠搬入 Library。✅
5. Light mode 不做;簡體字體暫不加。✅
6. 試做題目:Remote Control QR 入口(Claude 揀,依據 Notion Joint Grilling Pack D-JD-02/04/05)。✅
7. Library 修改權限(Alan 2026-10-08:「如果有需要優化,可以改Library」):可改,但先做只新增項目;刪除/改名/改值先列清單俾 Alan。已於 XRCC Theme 新增 `status/warning/{default,text,icon,background}`(alias amber/200;background 為 amber/200 @15% raw rgba)。**Library 檔需由 Alan 發佈,其他檔先至睇到。**
8. Input 高度(Alan 2026-10-08):Library 嘅 28/36/48 係正常,唔加 40。排版用 Medium 36,同 Medium 按鈕(36)配對;Notion 寫 40 嘅地方以 Library 為準。
9. 控件高度(Alan 2026-10-08 更新 Library):Button 與 Text Input 統一為 Large 48 / Medium 36 / Small 28(Library 草稿已改;發佈後 Workbench 才見到)。Notion 寫 Button 40 的地方以 Library 為準。已發佈 `status/warning/*`,Workbench 已改綁正式 token,本地草稿 collection 已刪。
10. Tooltip(Alan 2026-10-08):Notion Tooltip 規格已舊,以現有 Figma 檔(token)為準;不再將 `#1F1F24`、13/19、`#5C4E7B` 當規格。


## 8. 設計質素規則(2026-10-09 加入,出自 `20261009-xrcc-ui-visual-language-study.md`)

**注意(Alan 2026-10-09):所有現有 UI 都係舊 design,未必好;只吸收做得好嘅位,唔好照抄遺留問題(見研讀報告 §0.1)。**

Alan 要求(重要):UI 要有美感、專業、有趣、有**人味**,唔可以似通用 AI 模板。喺 Library token / component 之內,做畫面前後都用下面規則。

**A. 起稿前(揀 pattern)**
1. 先搵最似嘅現有畫面作基準:資源類 → Assets Panel(`OX57GAX6iYmsxNhO5bzMqD`,node 4091:55636);Launcher 類 → Content Library / Project;連線/狀態 modal → VR Connection(PC UI 檔 4071:314696);Dialog → Item Tag UI(4071:293612)。**只用 4.0 畫面做參考,唔好抽 2.1–3.1 舊畫面樣式。**
2. 內容係視覺嘅(資源、專案、場景)→ 用**縮圖 / 預覽 / 三欄**,唔好用 table。

**B. 視覺**
3. 底 = `surface/canvas`/`panel`,header/rail/hover = 紫調 `surface/header`/`row-hover`;唔用純黑或藍灰。
4. 橙(Citrus)沿用舊設計嘅「點睛」用法(Alan 確認保留):細分隔線、toast 底線、選取外框、警告 tab、新手提示;一屏最多 2 處;唔做 primary、唔做大面積。
5. Gradient(洋紅→靛)只限 Assets Panel 現有 active pill / hero / marketing;唔做卡片底、唔做文字。**Active 導航定案用紫 tint + 左豎條(Alan 確認)**(研讀報告 §5.1),因 Library 冇 gradient token / component。
6. 浮動工具離邊 8px;modal 圓角 12–16、控件 8;內容疊喺場景上,唔好滿屏白邊 dashboard。
7. (2026-10-09 補,Claude 建議、待 Alan 定奪)「!」留俾錯誤/警告;「未有資料」空狀態優先用中性 icon(資料夾/下載盤/放大鏡)+ 人話 + 行動。空狀態一律:圓形 / 大線稿 icon + 粗標題 + 灰一句說明(+ 一個行動);失敗/等待用 icon 區分(時鐘、旋轉環、「!」);**唔用**純灰兩行字。
8. 每個互動元件畫齊 Default / Hover / Selected / Disabled / Loading / Fail / Empty,並標 hover 色值。
9. 重要表面至少有 1–2 個「個性」元素(線稿插圖、縮圖、mascot 位、橙線),但**唔自創新插畫風格**;冇現成素材就用線稿 icon + 留位標註「待插圖」,唔好塞 stock icon。
10. Diegetic(場景內)UI(AI Quiz Object 類)係前任 designer **有意獨立**嘅語言同 variable,**唔好混入 PC token**,亦唔當缺口。

**C. 互動(Alan「XRCC UI Design Rule」12 條,Figma PC UI 檔 4071:211963;Alan 確認只係某 feature 嘅局部規則、未必好,**唔使硬跟**,只當參考,按畫面判斷是否適用)**
11. (參考,非硬性,視畫面適用)填資料後 Confirm 先 enable;自建 list 預設 A–Z;table 顯示 4.5 行 + scrollbar;刪除二次確認 dialog;搜尋按 Search 先開始;無資料「!」+ 說明;無結果放大鏡;純 icon 按鈕有 tooltip;list 有 default/hover/selected/disabled,hover 先出額外按鈕;disabled = gray700 + 70% 黑 overlay + 引導字;箭咀收起 ▶ / 展開 ▼。Disabled 主按鈕要有 hover tooltip 解釋點解。
12. 漸進式披露:次要設定用「摺疊摘要行」(標題 + 灰色一行摘要 + chevron)。

**D. 文案**
13. 講發生咩事 → 後果(俾數字)→ 下一步 / 替代方案;按鈕用「動詞 + 後果」(`Delete anyway`、`Scan Again`、`Retry Connection`),避免 OK / Submit;唔用「Something went wrong」「Invalid input」。
14. UI 字串純 EN / zh-TW(跟 Glossary);口語(「立即save低!」)只限 marketing;交付時附 Exact copy table。
15. 具體、真實嘅內容(「Biology Notes v2 · 3 files · 5 focus areas」),唔用 lorem / 「Item 1」。

**E. 交付前自查**(加落 Step 5)
- 呢個畫面有冇個性元素?有冇 table 其實應該係縮圖?空狀態有冇用 icon + 人話?橙色有冇超過 2 處?有冇出現新 hex / 新 token?有冇畫齊狀態?文案有冇講後果同下一步?
- 截圖自查後,列出「刻意設計選擇」同 Library 缺口。

**F. 已知缺口(見研讀報告 §5)**:Rule 5 input 高度同 Library 不符(跟 Library);Workbench Asset Panel 仍係 table;舊畫面(2.1–3.1)勿參考。Brand/Product 字體不同、橙色點綴、Quiz Object 獨立,Alan 已確認正常,毋須列為問題。

## 9. 2026-10-09 補充:Library 草稿 vs 已發佈(重讀後新增)
- Library 草稿同已發佈版本可能唔同;Workbench 只睇到已發佈。用 `search_design_system` 或 `importComponentSetByKeyAsync` 確認 key 仍可 import,先建畫面。
- 新增可用:`Badge`(狀態/數量,Tag 係可互動標籤)、`Badge indicator`、`breadcrumbs-item`、`Button / Dark / Icon Square`、Popup 系列、Avatar 色 token `avatar/*`。
- 唔好再用:System 舊 `typography/en/*`、`typography/layout/*` 變數(已移除),文字一律用 text style;`icon/outline/check` 已無,勾選用 `icon/solid/check`;Switch 只用 Switch 頁嗰 4 個 variant(細階 `switch` 已刪)。
- Select(Text Input 變種,key 393f5f64…)已發佈,Workbench 已遷移;Switch 只有 4 個 variant,側邊 label 自己放文字。
- 完整 key 清單見 `20261008-xrcc-library-component-keys.md` 最底。

## 10. 2026-10-09 Studio feel(Discord research 融合)
- 方向:XRCC 係「做嘢嘅地方」——穩定 rail/內容/狀態、細而誠實嘅 presence、project 有面孔、一把聲。唔照搬 chat/channel、通知噪音、gamification。
- 8 條原則、誠實規則(只用 Accepted/Saved locally/Queued/Delivered/Failed;唔推斷 abandoned/failed/passed)、pattern 表、文案 5 條:見 `20261009-xrcc-studio-feel-guideline.md`。
- 新畫面自查加一項:有冇偽造狀態?趣味只放喺邊緣(空狀態/首次成功),破壞性/資料 dialog 要樸素?
- 概念 frame 在 Workbench UI page(Launcher 239:1035、Quick switcher 240:1052、Connections 247:1113、Packages empty 247:1396),只係概念。
