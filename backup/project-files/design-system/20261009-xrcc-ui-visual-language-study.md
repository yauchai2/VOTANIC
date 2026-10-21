# XRCC UI 視覺語言研讀(Visual Language Study)

日期:2026-10-09 · 應 Alan 要求「讀晒所有現有 UI,詳細研習」
方法:Figma connector **全程唯讀**(`get_metadata`、`get_screenshot`、唯讀 Plugin API 列舉)。冇改動任何 Figma / Notion 內容。
承接:`20261008-xrcc-design-system-study.md`(token / component 結構)同 `20261008-claude-ui-workflow-playbook.md`(流程)。**本文唔重複 token 清單**,專注「睇落去點、點樣先似 XRCC、點樣有人味」。
標示:**Seen** = 睇過截圖;**Read** = 讀過數值/文字;**Inference** = 推論;**Open** = 需 Alan 確認。

Node 連結格式:`https://www.figma.com/design/<fileKey>?node-id=<id 嘅 : 換成 ->`。File key:Brand `ZIHnSrnhw8JnEftwm1BfUG` · Library `De8nKqO81yciw4wH5xfpxA` · PC UI `7SMhpQ4IVhnlA6G6wfwAgO` · Launcher `18RvTL8PypmNuZIszfSRMV` · Assets Panel `OX57GAX6iYmsxNhO5bzMqD` · AI Quiz `60SMqk7vsM74rSwu3Qhmzk` · Runtime Debug `1fAQ8bgTaI2RWLYJRBb3Aw` · Main Scene `M84FtPQGf4odQy2KTdxKIR` · Workbench `ZBOB48n4eLsZABCTnhh5kk`。

---

## 0. 一頁總結:XRCC 點解「有味」

1. **深色、紫調中性底,橙(Citrus)做「活」嘅一點。** 底色係 `#161616` / `#1e1e21`,但 header、side rail、hover 都帶一點紫(`#2a2531`),所以唔係死灰。橙色只喺好細嘅位出現:divider 線、toast 底部進度線、selected 外框、警告 tab、"New here?" 之類提示(Alan 確認:呢個係舊 design 有意保留嘅做法,**唔當問題**)。
2. **角色同插畫撐起個性。** Launcher / Home 有 3D 橙色八爪魚太空人(mascot)、等距霓虹教學插圖、社交媒體有 3D 火箭;Asset Panel 有線稿「Import Assets」插圖同每個 asset 有自己嘅縮圖。空狀態用「線稿大 icon + 一句人話」,唔係灰色一行字。
3. **內容優先於容器。** Asset Panel、Content Library、Project 都係「縮圖 / 預覽 / 真實 3D 渲染」做主角,文字做標籤,唔係 table。
4. **紫色分兩層:** 結構/互動用深紫塊 + 淺紫字(`action/primary/*`、`#392e52` + `#b89afa`);標題、名稱、tab 標籤用淺紫(`#b89afa` / `#9c70ff`)做「呢個係你可以睇/點嘅名」。Gradient 紫(洋紅→靛)只喺 **active 導航 pill** 同 marketing。
5. **文案似同人講嘢:** 「Welcome to **XRCC Launcher**」、「You're up to date!」、「No nearby VR devices found」、「Asset import is queued. It will be processed momentarily.」,中文有「立即save低!」、「5個你必需知道的」。解釋後果、俾下一步,唔責怪用戶。
6. **每個狀態都畫齊。** Default / Hover / Selected / Disabled / Loading / Fail / Empty 逐格擺出嚟,連 hover 顏色(`#2A2531`、`#B89AFA`、`#A32929`)都直接標喺畫面旁。

---

### 0.1 重新 review 視角(Alan 2026-10-09 更正)
Alan 指出:**所有現有 UI 都係舊 design,UI/UX 未必好**。所以本文件嘅「Do」只代表「做得好、值得吸收」,唔等於「舊稿點做就點做」。我重新分咗兩類:

| 值得吸收(做得好) | 舊稿遺留 / 未必好(唔好照抄,有疑問先問) |
|---|---|
| 縮圖 / 預覽做主角(Assets Panel)、三欄結構 | Workbench 嗰類 table-only 畫面;Launcher 純灰兩行字空狀態 |
| 空狀態:圓形線稿 icon + 粗標題 + 一句人話 + 下一步 | Debug/Main Scene 未填標頭、白字落白底 placeholder |
| Dialog 文案:講後果 + 下一步 + 動詞按鈕 | 超長 section 內嘅密集設定列(Launcher Project/Profile/License,資訊層次弱) |
| 狀態畫齊(default/hover/selected/disabled/fail)並標色值 | 同一檔內並存兩種 active 導航、兩種 section 小標樣式 |
| Toast 帶 icon + 橙底線進度;Tag chip 帶上限提示 | 舊 2.1–3.1 畫面(舊色板/舊 icon) |
| 摺疊摘要行(漸進式披露) | 大量 UI 規格板風格不一 |

橙色小點綴、Brand 與產品字體不同、AI Quiz Object 獨立語言:Alan 已確認係**有意**,下面 §5 已移除。

---

## 1. 逐個檔案嘅發現

### 1.1 Votanic Brand Design Guideline(`ZIHnSrnhw8JnEftwm1BfUG`)
頁面:Design(Cover、IG/FB Post、IG Post - XRCC Tips)· Brand Design System · Working Page(IG 背景、3D assets、icon set)· Research & Ideas(Playful / Professional graphic design 參考)。

- **Read:品牌色**:Ultra Violet `#5F4B8B`(主色)· White · Turkish Sea `#195190` · Blue Moon `#3686A0` · Xenon Blue `#B7C0D7` · **Citrus `#F9AC2F`** · Blackened Pearl `#4D4B50` · Silver `#A2A2A1`。
- **Read:字體**:EN 標題 Univers 67 Bold Condensed、內文 Roboto;中文 Source Sans Pro;base 16、scale 1.25、line-height ×1.5。
- **Seen:Cover**([197:843](https://www.figma.com/design/ZIHnSrnhw8JnEftwm1BfUG?node-id=197-843)):紫→藍 gradient + 粒點波浪(洋紅/青綠點)、超大白色 Bold 全大寫標題、字距寬嘅 VOTANIC wordmark(A 係 chevron 形)。
- **Seen:Social**([389:5933](https://www.figma.com/design/ZIHnSrnhw8JnEftwm1BfUG?node-id=389-5933)、[384:7059](https://www.figma.com/design/ZIHnSrnhw8JnEftwm1BfUG?node-id=384-7059)):海軍藍→紫 gradient + halftone 點紋;**3D 光滑火箭 + 雲 + 四角星(citrus / 紫)**;圓潤厚身展示字;小 pill 標籤(gradient pill「That Save your time」);中文版用**橙黃標籤 + 斜切黑條**(「5個你必需知道的 / XRCC 技巧 »」);「立即save低!」書籤 chip;真人戴 VR 嘅暖色相片 + 底部紫色漸隱承載文字;@Votanic.HK。
- **Seen:Research & Ideas**(Playful graphic design / Nebula / Crypt):近黑底 + 模糊發光 gradient 球體;紫色 3D 角色 carousel。→ 品牌情緒:**playful-professional、發光、3D、帶幽默**。
- **Seen:Brand Design System 內嘅 UI kit** 係**淺色** + 實心 Ultra Violet 按鈕,同而家產品(深色)唔同代。⚠️ 見 §5 缺口。

### 1.2 XRCC (PC) Library(`De8nKqO81yciw4wH5xfpxA`)
結構已喺上份報告詳述。補充視覺觀察(Seen):
- Library 頁面係「左說明 + 右 variant 矩陣(紫虛線框)」,component 預覽用 XRCC 深色主題。
- 最有性格嘅 component:`Notification`(深底、淺紫字、icon 左、X 右、**橙色底線進度**)、`Tag`、`Tabs`(selected = 紫 tint)、`Tooltip`(深色小膠囊 + 箭嘴)、`Popup` 頁 6 款現成彈窗。
- Button 係「深紫底 + 淺紫字」,唔係亮紫;Secondary = 描邊淺紫字;Tertiary = 純字。

### 1.3 ⭐ 20251125_XRCC4.0_PC_UI(`7SMhpQ4IVhnlA6G6wfwAgO`)
13 頁。逐頁:

**Cover / User Journey**(User Journey [4071:15041](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-15041)):用人像 avatar + 步驟編號 component 畫「Create a Q&A bot」流程。(Seen,低解像)

**UI Part 01 / 02(2.1–3.1 舊代畫面)**:Home Page 3.0([4071:31488](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-31488))、Asset Panel 3.0([4071:109990](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-109990))、Shortcuts、Setting、Tool bar、Inspector、Entity/Behaviour/Sketchfab/Networking/360°/Scenes panel。
- **Editor 外殼(Seen,[4071:35228](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-35228)、[4071:29534](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-29534)):** 1922×1080;最頂 OS 式 menu bar(File / Project / Edit / View / Help,`#2a2531`);下一行 project bar:書籤 icon + 專案名(細灰)/ Scene 名(粗)+ **模式 tab Edit / Behaviour(selected = 紫 tint + icon)**;右邊 icon 按鈕組(雲同步、連線、AI 閃光、扳手=Inspector、播放、儲存)+ Play 分裂按鈕 + `Save*`。**3D 場景全幅鋪滿**,所有工具以**深色圓角浮動條**離邊 **8px** 疊上去(左上場景工具、左側「加物件」直條、左下 Item/Entity/Tag/Scene tab、底中 hand/move/rotate/scale/pivot),底部細狀態條「Action: Clear selection」。右上係 RGB 軸 gizmo。被選物件有**亮綠外框**。
- **Panel 浮喺場景上**:深色圓角卡,頂 tab icon,`Find…` + 搜尋/排序/篩選,「Total scene items: 15」,row = eye/lock icon + 外框 input;**selected row 紫 tint,被標記 row 琥珀 tint + 左側琥珀條**。
- **Free 版**:對角浮水印「Free Version / Votanic XRCC」。
- **Marketing 橫幅**([4071:33827](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-33827) 內):傾斜等距「爆開」UI 碎片 + 「BRING YOUR XR VISION TO LIFE **IN UNDER 2 HOURS**」(黑 + 洋紅紫 gradient 大字)+ 字距寬 tagline「YOUR CREATIVITY. YOUR WAY」。
- **Home 3.0**:黑底 + 漂浮粒子;兩張 hero 卡——「Welcome to XRCC!」(Create New 主按鈕 + Open File)+ **八爪魚 mascot 疊出卡邊**;「First Time to Use?」+ 等距插圖 + View More;「Recent」專案卡 = 大縮圖 + 版本 chip(3.1.4、Edit only、皇冠 = Premium)+ 紫色專案名 + 「Last Saved: 2 days ago」。
- **Dialog 樣式(Seen)**:標題條(info icon + 標題 + X,較深)/ 紫調本體 / 底欄右對齊按鈕;左邊**大線稿 icon**(警告文件、齒輪、頭套、tag、垃圾桶);關鍵字用紅色內聯強調(「not work or lose some functionality」)。

**XRCC UI 4.0**(81 個節點,主要係 Launcher + 連線 + 通知 + component):見 §1.4 同 §1.5。

**Item Tag UI**(2026-04-16,[4071:292430](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-292430)):Tag list row = 色塊 + 名稱 input + hover 先出動作(高亮、指派、選取、改名、紅色刪除);Highlight Mode toggle + (i);Add Tag 自動分色、自動命名「New Tag (1)」;Select Color 調色盤(多行色塊)。**Dialog 文案係教科書**:
> Tag Failed — The scene item has reached the maximum allowed number of 5 tags. Unable to add more tags.
> Delete Tag Confirmation — In this project, this tag is **Used by: 10 items / Referenced by: 3 behaviours.** Deleting will remove this tag from items. Behaviours referencing this tag will become "Missing tag"… [Cancel] [Delete anyway]
> Rename Failed — A tag named "New Name" already exists. Would you like to use "New Name (1)" instead? [Cancel] [Rename]
→ 講清楚**後果(數字)**、**俾替代方案**、destructive 按鈕用「Delete anyway」而唔係「OK」。

**Async Importing**(2026-04-30,[4071:302094](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-302094)):文件有「Original Flow vs New Flow」**等距霓虹插圖**對比。Asset tile 狀態:Waiting…(灰)→ Importing(圓形進度環 + 上傳 icon + 紫色 % pill)→ **Fail(實心紅塊 + 白色圓形「!」)** → Imported → Selected(橙外框)。大預覽區空狀態:**線稿 icon 放喺圓內(時鐘 = 排隊、旋轉環 = 匯入中、「!」= 失敗)+ 粗體標題 + 灰色一句解釋**。Toast「Asset import complete!」+ 橙色底線。注意用淺藍(aqua `#d4fbfb`)便利貼放設計理據。

**XRCC Play with VR Headset**(2026-05-20,[4071:314696](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-314696)):`VR Connection` modal——標題條 + **標題下一條細紫線**、右上「New here?」(燈泡 icon + 底線連結)、置中大狀態(旋轉環「Connecting…」紫粗體 + 灰「Searching for your VR headset」)。**失敗狀態改用橙色線稿頭套 icon(? / 時鐘)**:「No nearby VR devices found / Make sure your headset is turned on and within range of your PC.」[Scan Again];「VR headset is busy / Close other apps on your headset and try again.」[Retry Connection]。進入後標題列變**橙色 pill「Playing in VR (View Only)」**。「How to connect your VR headset」教學 modal:Wired (Recommended) / Wireless segmented + **Meta Quest / HTC VIVE / PICO 產品相片卡**(外連 icon)。標註 hover 色:bg `#2A2531`、text `#B89AFA`、關閉 hover `#A32929`、Cancel 字 `#9C70FF`。

**Behaviour 頁**(Seen,[4071:316746](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-316746)):Block 有**彩色 header + 暗灰 body**;分類色:General `#A71313`、Item Event `#A73B08`、Flow Control `#6A601C`、Variable `#3B4F21`、Math `#4F4A2D`、Motion `#084C31`、Effect `#21686A`、Scene `#0C6785`、Light `#0D4F6C`、Sound `#354490`、User `#582DA7`、Time `#7C299A`(其餘洋紅系)。Port:輸入 = 青色小方點、輸出 = 三角形;「Help?」連結。左側 Library rail:大線稿 icon + 標籤,active = 橙色圓角方塊。畫布 = 灰格仔 `#5a5a5a`,breadcrumb「Empty Scene → Main」,浮動直條工具(copy / paste / delete / undo / fit)有 Disabled / Hovering 示範。**呢套係全產品最「繽紛」嘅位,只限 behaviour 用。**

**Components 頁**:9 組(Launcher 用嘅 Step、Usage Card、License option、Download/Import Status、Hovering-function Name…)。Notification 區([4071:115682](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-115682)):`#1f1f23` 卡、淺紫字、左 icon(下載/磁碟/鈴/垃圾桶/地球)、右 X、**底部橙色粗進度線**、圓角約 8。文案:「Project saved」「Item linked」「Asset deleted」「Networking Connected」「New version available: 3.0.2.1 — Click me to download the new version」。

**UI Design Rule(Read,[4071:211963](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211963),標題仍寫 "need global check"):** Alan 自己寫嘅 12 條互動守則——見 §3.3,係最重要嘅「人味」來源之一。

### 1.4 XRCC Launcher(`18RvTL8PypmNuZIszfSRMV`;內容同步喺 PC UI 檔 XRCC UI 4.0 頁)
視窗 1100×691,自繪 title bar「XRCC Launcher」+ 最小化/關閉。

- **殼**:左 rail(深,logo「X R C C」字距寬 + 版本選擇器 `4.0 ▾`)、導航(Projects / Content Library / Packages / Profiles / Version / License;底部 Settings + 連線 icon 按鈕);**右主面板有大圓角(約 60)左上角,浮喺 rail 上**([Project](https://www.figma.com/design/18RvTL8PypmNuZIszfSRMV?node-id=22001-2540)、[Content Library](https://www.figma.com/design/18RvTL8PypmNuZIszfSRMV?node-id=22020-30373))。
- **Active 導航** = 紫 tint 底 + 左邊亮紫豎條。
- **Hero banner**:頂部淺灰圓角橫幅放 Editor 傾斜 UI 拼貼 / 品牌圖,下面一行 `Launch PC`(置中)+ `Import Project`(右)兩個大按鈕。
- **專案卡**:大縮圖 + 左上版本 chip + 右上 Premium 皇冠/綠色狀態 + 紫色專案名 + 「Last Saved: 2 days ago」+ 書籤 + kebab。Content Library 卡:縮圖 + 左上 `4.1.0` + 皇冠 + 右上連線 icon + 圓形課程徽章(科學試管)+ **紫色 pill 分類 `SCIENCE`** + 粗體標題。
- **Segmented 頂 tab**(Online / My Downloads)+ 下一層文字 tab(All / Tutorial / Student Project / STEM,選中有紫底線)+ 搜尋 + 篩選 + 排序。
- **Onboarding Wizard**(2026-04-15,[4071:214994](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-214994)):全幅場景相 + 漸層漸隱做 Welcome;「Welcome to **XRCC Launcher**」(白 + 第二行淺紫),副文「Your gateway to creating and experiencing immersive XR worlds…」;左垂直 **stepper**(圓形編號 1–4,連線,完成 = 剔)、右主面板大插圖(八爪魚抱手提電腦/檔案夾)+ 底部 `Skip to Home`(底線連結)/ `Skip` / `Download & Install`;選項用**大深色卡**(紫 tint icon 方塊 + 粗標題 + 灰副題 + chevron);Usage 三卡(XR Creation on **PC** / Play XR in **CAVE** / Play XR in **VR HMD**,選中橙外框);完成頁「Setup Complete! You are ready to XRCC.」。
- **Settings**(2026-02-23):更新狀態用**旋轉箭咀圈 + 綠剔 / 紅「!」**:「You're up to date!」「Update available」;導航項加**紅色「!」徽章**提示更新;確認 dialog「Restart Launcher」+ 翻譯 icon。
- **Connections**:Poe API Key / Wit.ai Token 表格(紫色表頭行、4.5 行 + scrollbar),`+ Add API Key`,「Clear Unused Connection Information … 90 days」。
- **空狀態**:圓形「!」 + 「You don't have any project yet. Click the "Add" or "Import project" button to start your project directly」。
- **Packages**:Standard / Premium segmented + 計數 pill;過期 Premium 紅「!」+ hover tooltip「Activate an XRCC premium license to use this premium package in your projects」。

### 1.5 連線 / AI 面板(PC UI 檔 4.0 頁)
- **Connections Setup**(2026-01-09,[4071:208567](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208567)):可摺疊分組(Poe AI / Microcontroller / Remote Trigger Server / Wit.ai app),每組右上**紅(未完成)→ 綠剔(完成)徽章**;底部 `Make for Current Project Session`(紅警示 → 常態)/ `Skip` / `Continue`(未齊全 disabled,hover 有 tooltip 解釋點解)。
- **Poe key 流程**:有插圖嘅 modal「Store & Protect your Poe Key」(盒子+鎖 icon)、密碼驗證「Type your password to use the key」、成功「Poe Key Added — You have xxx points available」、重名 key 紅邊 + 內聯錯誤。
- **Create with AI**(2026-05-20,[4071:214361](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-214361)):頂 segmented(2D Image / Audio / AI Character / Quiz);AI Task radio;**附件 chip**(淺紫 pill + x,最多 5 個,A–Z 排列,選取時橙外框);**狀態 pill**:綠剔「Added 1 attachment」、琥珀三角「4 attachments added (2 incompatible)」、紅「Import failed」;disabled `Create`(灰,送出 icon)。
- **AI Character 進階**(2026-03-06,[4071:213941](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-213941)):Overview / Topic Area / Instructions / Motion / Advanced tabs;Motion 表格紫表頭、紅「!」+「Motion missed」tooltip;下拉改向上開。

### 1.6 XRCC4.0 – Assets Panel(`OX57GAX6iYmsxNhO5bzMqD`)— **Alan 嘅「有趣」基準**
(詳見 [4091:55636](https://www.figma.com/design/OX57GAX6iYmsxNhO5bzMqD?node-id=4091-55636)、[4057:3698](https://www.figma.com/design/OX57GAX6iYmsxNhO5bzMqD?node-id=4057-3698)。)
- 三欄 modal(約 950×685,圓角 16,大柔陰影):**左 rail**(`#2a2531` 紫調)頂部放**線稿「Import Assets」插圖**(資料夾 + 飄散嘅圖/星/方塊/播放符號)+ 小按鈕「Select file」;下面**一條細橙色橫線**分隔;分類清單 icon + 右對齊計數(Special Object 14、3D Model 99+…)。
- **Active 分類 = 洋紅紫 → 靛藍 gradient pill**,左圓角、右邊衝出面板邊;**Hover = 同形狀 1px gradient 描邊 + 紫字**;非選取 = 灰。
- **中欄**(純黑):標題 + 搜尋 + 紫色搜尋鍵;4 欄縮圖格,**縮圖本身有畫**(地面線框、巨型「Text」字、藍紫球體 360、人形站綠圈、發光燈、黃線框 cube),**淺紫標籤**喺下面;選中 = 橙外框。
- **右欄**:紫色「Preview」+ 大預覽 + **橙色分隔線** + 名稱粗體紫色置中(「Ground」)+ kebab + 灰「Untagged」chip + 說明 + 灰色腳註「*This model will become colourless when play mode.」;底部兩個等寬按鈕「Center ( 0,0,0 )」/「Add Asset」。
- 非常重要:呢個畫面**有至少 5 種唯一嘅視覺材料**(插圖、縮圖、gradient pill、橙線、紫標籤)——Workbench 現時嘅 table 版係 0 種。

### 1.7 XRCC4.1 – AI Quiz(`60SMqk7vsM74rSwu3Qhmzk`)
兩套截然不同嘅語言:
- **Quiz Editor(PC 面板)**([178:13970](https://www.figma.com/design/60SMqk7vsM74rSwu3Qhmzk?node-id=178-13970)、UI flow 28 步 [165:15032…](https://www.figma.com/design/60SMqk7vsM74rSwu3Qhmzk?node-id=165-15032)):完全跟 PC token——modal 720 寬、標題條、**可摺疊「Runtime Quiz Settings」灰條,右側一行摘要「Score: On Format: Correct/ Total Review: After each question」**(漸進式披露),segmented「Questions `1/20`(琥珀計數 pill)| Source & AI」,「In quiz [Ready 綠 pill]」+ `+ New question`。AI 題目卡有**藍色主題 chip「Photosynthesis basics (Edited)」**、`Add to quiz`、全寬 `Regenerate AI Question`(淺紫字 + 重試 icon)。Project Source 摘要行「Biology Notes v2 · 3 files · 5 focus areas · 3 selected [Ready]」。
- **Quiz Object(場景內 diegetic UI)**([235:2567](https://www.figma.com/design/60SMqk7vsM74rSwu3Qhmzk?node-id=235-2567)、[597:16698](https://www.figma.com/design/60SMqk7vsM74rSwu3Qhmzk?node-id=597-16698)):**語言完全唔同**——近黑格仔背景 + 深灰有機 blob + **洋紅(`#f472f6`)/ 藍(`#0098d4`)玩味星芒同加號**;卡片 `#1b1b24` 大圓角;「QUESTION 1 OF 2」灰細字 + 紫色進度條;大粗體題目;選項 = 圓角描邊行;**答對 = 青綠(teal)tint + 邊 + 右上「Correct answer」**;`Show explanation`(描邊紫字)/ `Next`(實心亮紫 `#7c5cff`)。字級 small/mid/big = 22/26/31,最多 50 字。**唔可以用 PC token**(獨立 variable collection)。
- **Update 20260903** 規格板([2686:43467](https://www.figma.com/design/60SMqk7vsM74rSwu3Qhmzk?node-id=2686-43467)):灰底白板、「SECTION A — BEFORE / AFTER」、編號註解、黃色「changed vs today」標籤、低保真線框 + 真實 UI。呢種「過程文件」風格同較早嘅 VOTANIC 標頭文件唔同(較機械)。

### 1.8 XRCC – Runtime Debug Panel(`1fAQ8bgTaI2RWLYJRBb3Aw`)
- **Cover** [2396:15402](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=2396-15402):淺灰底 + 大灰色圓角標籤「Debug Panel」+ 青藍 pill「4.1」+ 實際截圖(其中一格係空嘅深色方塊 = 未填)。
- **Panel**([4163:14342](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4163-14342)):場景內 overlay;標題 bug icon;3 tab **Watch(眼)/ Log(文件)/ Warnings(三角)**,Warnings active = **琥珀 tint**;row:名稱、「4.25 → 5.50」變化、灰 meta「Item Variable · Exhibit Door · Open interaction」、右側時間戳;**底部快捷鍵列**(`F12` Close · `Tab` Switch tabs · `Ctrl+↑/↓` Scroll · `Ctrl+Del` Clear all,淺紫描邊 keycap)。
- **空狀態有性格**:眼 icon「No watched variables」/ 文件 icon「No changes recorded yet」/ **琥珀剔「All clear so far — No behaviour warnings detected. Any warnings will appear here」**;History 上限橫幅「History Limit Reached」。
- 「Play Mode discovery toast」:頂部小提示帶 keycap。My Setting dialog([4163:14252](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4163-14252)):左導航 + 右內容 + 左下大 X logo 水印 + 版本號;before/after 用**橙色圓角框**圈出改動。

### 1.9 Main Scene(`M84FtPQGf4odQy2KTdxKIR`)
Scene View Toolbar([6001:12952](https://www.figma.com/design/M84FtPQGf4odQy2KTdxKIR?node-id=6001-12952)):左上 chip 工具列 `Global ▾ | Center ▾ | 格仔切換 + 數值 | snap | link`,每個 popover(Global/Local space、Center/Pivot、Grid settings 有 X/Y/Z segmented + Opacity slider、Snap settings 有 checkbox + Move/Rotate/Scale 數值),tooltip 含快捷鍵「Shortcut: Tab」。規格板用「Tools | Tooltips (Hover)」雙欄表,紫表頭。

### 1.10 XRCC Claude Workbench(`ZBOB48n4eLsZABCTnhh5kk`)
未喺今次重讀;現有 pilot(4:995 QR 入口、44:64 Asset Panel table 版)見上份報告與 change log。

### 1.4c Launcher 內頁與彈窗放大 review(2026-10-09;Packages [4071:211282](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211282)、License [4071:211840](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211840)、彈窗 [4071:212051](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212051) / [212068](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212068) / [212009](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212009))
**值得吸收**
- **Launcher 彈窗骨架一致**:標題列(ⓘ + 標題 + X)/ 左邊 64px 線稿大 icon(皇冠、疊層 + 「!」、下載盤)/ 右邊兩句說明 / 右下兩粒按鈕。Icon 直接講出題材,一眼分到係 premium、版本、匯入。
- **文案講後果 + 俾出路**:「This project was created with a newer XRCC version. Would you like to switch to **XRCC version 4.0.5** and open the project?」→ 按鈕「Cancel / Switch Version」(動詞講明做咩);「Leaving now will cancel all unfinished tasks」→「Continue Import/Download / Exit Launcher」(兩個按鈕都講清楚後果,冇 Yes/No)。連結字用淺紫,同普通字分得開。
- **Packages 嘅 Standard / Premium 分頁 + 計數**,Premium 過期時顯示 0 + 紅「!」+ hover tooltip 解釋原因;列有 Normal / Hovering / Selected / Expired 四個狀態逐行擺出。係「狀態畫齊」同「避免誤會」嘅好示範。
- License:啟用輸入框有 Activate → 無效 key 紅框 + 紅字 → 已有 license 時彈「License Replacement」確認,流程完整。
**舊稿遺留 / 未必好(唔好抄)**
- 「Ok」按鈕(Project uses premium resources)同「Cancel Import」+「Ok」並列,語意含糊;應該用動詞(如 `Import anyway`)。連結「Connect us for premium license detail」寫法唔自然。
- Packages / License 空狀態:細「!」圓圈 + 兩行灰字,冇插圖、冇行動重點;License 只得 1–2 行都用 table,視覺偏「後台」,同 Launcher 專案卡嘅縮圖風格唔一致。
- 單頁內大量小字說明 + 箭咀標註(設計文件本身),交付畫面時要拆走。

### 1.4d Onboarding Wizard / Download 面板 / Profile / Version(2026-10-09 放大 review;[Onboarding 4071:214995](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-214995)、[Add Profile 4071:211466](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211466)、[Install More Version 4071:211659](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211659)、[Download 面板 4071:212817](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212817))
**值得吸收(Onboarding 係 Launcher 最有人味嘅一組)**
- **歡迎頁**:「Welcome to **XRCC Launcher**」(產品名用淺紫)+ 一句人話(「Your gateway to creating and experiencing immersive XR worlds…」)+ 單一 `Get Started`;背景係**真實 XR 場景相片每 3 秒 dissolve 輪播**(有交代動效),一入門就見到產品世界。
- **4 步直列步驟**(Download & Install → Usage → License → Complete),每步有「未完成 / 目前 / 完成」三態(空圈 / 實心紫圈 / 剔),旁邊有清楚嘅標註 ①–⑥ 講每個元素行為。
- **Mascot 用得準**:八爪魚太空人喺「Download & Install」同「Your XRCC Download is …」兩頁出現,配閃星,令等待時間冇咁悶;完成狀態用 toast「Download completed」+ 橙色底線。
- **倒數自動前進**(Advancing in 5s → 4s → 3s)+ `Skip` / `Next`;`Skip to Home` 有確認 dialog,明講後果(「You will not be able to fully use XRCC until setup is complete. But, you can add or finish the remaining setup later in launcher.」)——唔嚇人、有出路。
**舊稿遺留 / 未必好(唔好抄)**
- **「!」濫用**:Download 面板「You don't have download task yet.」同 Packages 空狀態都用「!」圓圈,但呢啲唔係錯誤;「!」應留俾失敗/警告,空狀態改用中性 icon(下載盤、資料夾)+ 一句有行動嘅文案。(注意:呢個做法其實係 Design Rule 7「無資料顯示 ! + 文字」;因 Alan 話 12 條只係局部參考,呢點係我嘅判斷,建議改中性 icon,**由 Alan 定奪**。)
- **Add New Profile / Profile Detail 表單**:同一欄位兩個畫面對齊唔一致(dialog 入面值靠左,Update Profile 頁值置中);`Additional Launch Parameter*` 係必填、預填 CLI 字串,對一般用戶太技術,冇說明文字;Update Profile 灰按鈕冇講點解 disabled。
- **Install More Version**:載入中得一個大轉圈 + 空 table 標題列;宜用 skeleton 列或「Fetching versions…」一句,避免大片空白。
- 彈窗尾部有時只得一粒 `OK`(Download Failed),冇下一步(例如 `Free up space` / `Open Settings`)。

### 1.4e Project 卡 / Connections(2026-10-09 放大 review;[Project Card 4071:212145](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212145)、[Launch directly 4071:212126](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212126)、[Connections Setup 4071:208829](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208829)、[XRCC Connections 4071:212738](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212738))
**值得吸收**
- **專案卡 icon tag 系統**:版本 badge、皇冠(Premium)、連結 icon(Need connection)、Play only / Edit only,每個都有深紫 tooltip 解釋;版本比 XRCC 高/低用綠↑/紅↓小方塊。卡片 hover 先出 Edit / Play(按 profile 而定),平時乾淨。
- **「Launch directly」鈕直接顯示預設 profile 名**(Launch PC / Launch XR(HMD) / 自訂名),超過 15 字截斷 + hover tooltip——少一步、資訊在按鈕上。
- **Connections Setup 彈窗**:可摺疊分組(Poe AI / Microcontroller / Remote Trigger / Wit.ai),每組右上綠剔狀態,一次過處理所有連線,有 `Skip` / `Continue`。
**舊稿遺留 / 未必好**
- 專案卡 icon 靠**綠/紅顏色**區分「版本較低/較高」,只靠 hover tooltip 先明白;色盲或未 hover 時難分。
- `Mute for Current Project Session` 用**大面積實心紅**,但呢個唔係破壞性操作;紅色應留俾 Delete。
- 已連線時 `Connected` 灰色 disabled 按鈕 + 綠剔 pill **重複表達同一狀態**。
- XRCC Connections 頁:兩個 table 並排 + 搜尋 / 排序 icon 無文字;placeholder 係「key name 1…」;Token 欄空白;Poe / Wit.ai 兩段視覺權重一樣,頁面冇重點。
- 「Something Went Wrong」彈窗([4071:212548](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212548)):標題泛泛,內文「你冇 profile,要唔要建立?」但按鈕係 `Download`,**文案同按鈕唔對應**。

### 1.4f Download/Import 狀態、版本選擇、Poe key / Auto Connection(2026-10-09;[狀態矩陣 4071:212826](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212826)、[版本選擇 4071:212273](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212273)、[Auto Connection 4071:208854](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208854)、[New Poe API key 4071:208683](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208683)、[Import 清單 4071:212817](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212817))
**值得吸收**
- **Download/Import 狀態矩陣**係全套最完整嘅狀態設計:4 種對象(XRCC Version / Standard Package / Premium Package / Project,各有專屬 icon)× 5 個狀態(排隊 / 進行中 + 進度條 / 完成 ✓ / 失敗無效檔案 / 失敗儲存不足)。**失敗原因用一行紅字寫喺名稱下面**(Invalid XRCC version、Not enough storage),唔使點進去。排隊中字灰、可「置頂」或 ✕ 取消。
- **版本選擇器**:正常 / hover / 展開 / 只有一個版本(唔可點,冇 hover)/ **未裝版本 = 紅描邊 + 「!」+ tooltip「Install your first XRCC version」** / 名太長(>25 字)截斷 + tooltip;清單 4.5 行 + scrollbar。邊界情況想得好細。
- **Auto Connection 彈窗**:「We found previously saved key & token in your system that **match the connection** names used in this project. Would you like us to auto-match them for you?」→ `Cancel` / `Auto-match`。先講發現咗咩、再問、按鈕動詞明確;閃星連結 icon 有少少驚喜。
- **New Poe API key**:標題「Store & Protect your Poe Key」比單純「Add key」有溫度;欄位有眼睛 toggle、「at least 8 characters」提示;主按鈕未填前灰色。
- Sort by 彈出選單(Last Save / Name: A to Z)+ hover 色值標註;Project 排序選項少而清楚。
**舊稿遺留 / 未必好**
- Import 清單 **每行一個鮮紅 ✕**(取消排隊)+ 一堆「置頂」雙箭咀,**紅色太重、重複度高**;取消排隊並非破壞性,可改灰 ✕、hover 先變紅。
- New Poe API key 嘅密碼區:冇標籤嘅 checkbox + 「(i)」+ 「at least 8 characters」,**唔知呢格係咩**(係咪要設密碼保護?)。
- Auto Connection 文案有錯字(「key& token」);「Auto-match」冇講配對咗幾多個、可唔可以再改。
- 版本選擇器收起時只有 chevron、冇 label,新用戶唔知呢個係「用邊個版本開專案」。

### 1.4g Download Manager 主畫面 / Microcontroller / Poe Key Added(2026-10-09;[Packages 空 + 下載鈕 4071:212922](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212922)、[Microcontroller 4071:208908](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208908)、[Poe Key Added 4071:208820](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208820))
**值得吸收**
- **Download/Import 入口**:右上一粒下載 icon,有任務失敗時出**紅點**(同一位置、唔彈窗打斷),點開先見 Download / Import 兩個分頁 + 計數 pill(Import 7 用琥珀色 pill 表示進行中)。低干擾、狀態一眼見。
- **「Poe Key Added」彈窗**:鎖頭 + 剔 icon 切合主題,內文「Poe key "**key name**" is successfully added. You have **xxxx points** available.」——確認之外多俾一個有用資訊(剩餘點數),重點字淺紫。
- Packages 頁 Standard / Premium 分頁 + 計數,三個畫面(空 / 排隊 / 失敗)入口位置一致,學習成本低。
**舊稿遺留 / 未必好**
- **Update Microcontroller Connection 彈窗版面疑似壞咗**:「Select your device type」下面 Micro… / Bluetooth / Serial 三個標籤同按鈕**互相疊住**;「Discover」文字被截;說明文字同搜尋框重疊;狀態「Connected to **none** (!)」用紅字 + 「!」,而「none」其實係未連線嘅正常狀態,似錯誤。建議呢個彈窗重新排版(見 §8 #21)。
- Packages 空狀態同 §1.4d 一樣用「!」圓圈 + 兩行灰字(已列 #4),三個 Download Manager 畫面全部係同一個空畫面,只係右上角下載鈕唔同,**設計文件冇畫出真正有內容嘅 Packages 清單**。

### 1.12 用「只吸收好嘅」角度 re-review:Assets Panel / Runtime Debug / Main Scene(2026-10-09)
**Assets Panel**([4091:55636](https://www.figma.com/design/OX57GAX6iYmsxNhO5bzMqD?node-id=4091-55636))— 結論:仍然係最好嘅參考,但唔係冇瑕疵。
- 值得吸收:三欄結構、縮圖主導、左 rail 計數、插圖入口、Selected / Non-selected / Hovering 三態並排示範、底部兩個等寬主按鈕。
- 未必好:(1) 內文字細(縮圖標籤、計數約 10–11px),喺 1080p 以下難讀;(2) 頂部紅色「Your Package」方鈕冇文字解釋,又係大面積紅(非破壞性);(3) 縮圖風格不一(有真實渲染、有示意線稿、有純色字塊 Text/Button),個別(Option Box、Quiz)細到睇唔清;(4) 非選取項目灰字落近黑底,對比偏低;(5) 右欄「Preview」標題細、同「Ground」名稱層次太近。
**Runtime Debug Panel**([4702:12228](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4702-12228))— 值得吸收:
- 緊湊面板:Watch / Log / Warnings 三分頁(icon + 字)、每條 log 係「**名稱 / 值變化 `4.25 → 5.50` / 來源 `Item Variable · Exhibit Door · Open interaction`** / 右上時間戳」,資訊層次清楚;數值變化用箭咀,顏色變化直接顯示色塊 + hex。
- **底部 keycap 快捷鍵列**(F12 Close · Tab Switch tabs · Ctrl+↑/↓ Scroll · Ctrl+Del Clear all),比隱藏快捷鍵友善。
- 未必好:placeholder 係「Variable 01…」(未示範真實命名);腳註 4 組快捷鍵擠住一行,窄螢幕會爆;冇畫空狀態(未有 log 時)。
**「START HERE」規格方塊**([4202:10925](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4202-10925)):概念好(Feature / Status / Platforms / DRI / Authoritative UX decision / Out of scope 一頁交代),但現時只係一大段黑色粗體純文字,冇層次;宜用小表格或標籤欄位。
**Main Scene(Scene View)**:只有封面同 Out of scope 文字,冇實際 UI 畫面,未有內容可 review。
**Brand**:定位為市場/品牌素材參考,唔當產品 UI 規範;之前結論不變。

### 1.11 Voyage360 / 360 Content VR(`KoJQjDPM4sjwsoMYEvCDkw`,2026-10-09 補睇)
只有 2 張封面(marketing),內容係舊一代 360 編輯器 UI:[5035:106172](https://www.figma.com/design/KoJQjDPM4sjwsoMYEvCDkw?node-id=5035-106172)。
- **值得吸收**:(1) **圓形放射選單**(Text / Info / Video / Waypoint / Image / Audio,各個圓形紫鈕 icon + 小字標籤)夠直觀、有玩味;(2) Play 下拉用 icon + 動詞短句(Play in PC / Play from current scene / Play with VR headset),好似人講嘢;(3) 封面構圖:斜放真實面板 + 縮圖有相片,令產品「睇落有內容」。
- **舊風格,唔好抄**:面板用較鮮嘅紫色標題條 + 灰淺紫混用,同 4.0 嘅深紫底 + 淺紫字唔同代;Asset Panel 內 Local/Icons/Videos/Audio 多層小 tab 擠喺窄位,層次弱;封面左下係 Voyage logo,同 XRCC 品牌分開(唔當缺口)。

### 1.4b Launcher 補充(2026-10-09,[1:10488](https://www.figma.com/design/18RvTL8PypmNuZIszfSRMV?node-id=1-10488))
- Active nav「Projects」= **紫 tint 由左向右漸隱 + 左側細紫豎條 + 淺紫 icon/字**(正正係 §5.1 定案做法)。版本 `4.0` 用深紫圓角 dropdown 放 logo 下面;頂部 hero 橫幅帶產品截圖,`Launch PC` / `Import Project` 係同一條深紫 bar 上兩個按鈕。
- 專案卡:真實場景縮圖 + 左上版本 badge(3.1.4)+ 右上綠色下載箭咀 + 淺紫專案名 + 灰色「Last Saved: 2 days ago」。**好處**:資訊三層(名 > 時間 > badge),縮圖做主角。**未必好**:綠色下載箭咀嘅意思(有更新?可下載?)冇字講,新用戶要估。
- 「Launcher UI design discussion 20260210 / 20260223」A4 筆記入面有好嘅設計理據可吸收:(a) Package tag 上嘅數字只顯示「**而家用得到**」嘅數量,premium license 過期顯示 0,避免用戶以為仲用得;(b) 專案開錯版本(太高/太低)、冇裝版本、冇 profile 都要有明確處理 state;(c) 「Launch directly」直接顯示預設 profile,旁邊加箭咀換 profile——減少一步;(d) filter 改為 sort by,降低概念負擔。呢類「先講後果、少一步」嘅思路比視覺本身更值得學。

---

## 2. 跨產品風格指引(Do / Don't)

### 2.1 顏色與材質
| Do | Don't |
|---|---|
| 底用 `surface/canvas`(`#1e1e21`)/ `panel`(`#161616`);header、rail、hover 用 `surface/header`/`row-hover`(紫調 `#2a2531`) | 純黑 `#000` 或藍灰 slate;AI 常見嘅 `#0f172a` 系 |
| Primary = `action/primary/*`(深紫 `#392e52` + 淺紫字 `#b89afa`);標題/名稱用 `text/accent` | 亮飽和紫實心大按鈕、紫→粉 gradient 卡 |
| **橙(Citrus)**沿用舊做法:細分隔線、toast 底線、選取外框、「附近有新嘢」提示、警告 tab | 大面積橙、橙做 primary、同一屏出現多於 2 處橙 |
| Gradient 紫(洋紅→靛)只用喺**active 導航 pill**、marketing、hero | 每張卡都 gradient、gradient 文字 |
| 狀態:成功綠、錯誤紅(`#a32929` 實心塊 + 白「!」)、警告琥珀 | 用紫表示成功/警告 |
| 用真實相片/縮圖/渲染做視覺主角 | 用灰色 placeholder 方塊、圖標 emoji |

### 2.2 版面
| Do | Don't |
|---|---|
| 內容為先:縮圖格、大預覽、卡片;文字做標籤 | 全部用 table / 一式一樣嘅 card grid |
| 浮動工具離邊 **8px**、圓角深色條;面板疊喺內容上 | 滿屏白邊式 dashboard |
| 三欄(分類 rail / 內容 / 預覽 + 動作)處理資源類畫面 | 單欄長列表 |
| 大圓角承托(Launcher 主面板、modal 12–16),控件 8 | 到處 4px 小圓角 |
| 漸進式披露:摺疊摘要行(「Score: On Format: …」) | 將所有設定攤開 |
| 底部動作區固定:Cancel(描邊)+ Primary(深紫),右對齊;Primary 右下 32 | Primary 放左 / 多個 Primary |

### 2.3 互動:Alan 嘅「XRCC UI Design Rule」12 條
出處:PC UI 檔 XRCC UI 4.0 頁,框名 *XRCC UI Design Rule( need global check)*,[4071:211963](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211963)。**Alan 2026-10-09 確認:呢 12 條只係「某個 feature 嘅局部規則」,未必好,唔使硬跟。** 只當參考:睇番自己做緊嘅畫面係咪適用,適用先用;同 Library 或更好 UX 衝突時以 Library / 更好 UX 為準。
1. 要填 / 改資料 → 「Confirm」先 enable。
2. 用戶自己加嘅 list:預設 **A–Z**(變動最少,易搵位置)。
3. 表格顯示 **4.5 行**,超過 4 項出 scrollbar(提示有更多)。
4. 刪除一律彈「Delete」dialog **二次確認**,講清後果。
5. Text input 填入高度:單行 35、少段落 50、大段落 100(px);Library 現為 28/36/48,以 Library 為準。
6. 搜尋要入完字再按「Search」先開始。
7. 無 item / asset / key / token → 「!」icon + 一段字喺下面。
8. 無搜尋結果 → 放大鏡 icon。
9. 只有 icon 嘅按鈕必須有 tooltip;有字就唔洗。
10. 所有 list / table 有 default / hovering / selected / disabled;hover 先出額外按鈕,選完消失;hover → 揀其他 item → 返回 default。
11. 功能 disabled(無 toggle / 缺 key / 缺前置動作)→ 字用 gray700 + 70% 黑 overlay + 一句引導下一步。
12. List 箭咀:收起 = 向右 ▶、展開 = 向下 ▼。

加上喺畫面實見嘅做法:disabled 按鈕 hover 出 tooltip 解釋點解(Connections `Continue`);紅「!」徽章提示需要處理(導航、Premium 過期);所有 hover 色值標註喺畫面。

### 2.4 Typography
- 產品:EN Roboto、繁中 Noto Sans TC;標題粗體(Heading 全部 Bold);section 小標用**淺紫粗體**(例:Settings 嘅「Launcher Version」「Language」)。
- Brand 文件寫 Univers Condensed / Source Sans Pro——**產品冇用**(見 §5)。
- 大字展示:Launcher Welcome 兩行(白 + 淺紫)、marketing 全大寫粗體 + gradient 強調詞。
- 細字灰(`text/secondary`)做說明,**唔好**拎 `text/subtle` 做重要字。

### 2.5 Icon 與插圖
- Icon:線稿(outline)為主,24px 預設,`icon/solid` 只做 active;**大型空狀態 / dialog 左側用 48–96px 線稿 icon**(單色淺灰/淺紫,關鍵位置用橙描邊,例:VR 頭套 + 橙問號)。
- 插圖:3D 八爪魚 mascot(橙身 + 太空頭盔)、等距霓虹教學圖、3D 火箭;**唔係 stock 向量人**。
- 縮圖:資源縮圖要有「畫」,唔係 icon on grey。

### 2.6 動效線索(畫面中標註)
Toast 底線進度條;環形 loop 動畫(importing);圖片每 3 秒 dissolve(Onboarding hero);Ease-out 500ms 出現、700ms 消失(chip 提示);tooltip fade 100–150ms(Notion);倒數「Advancing in 5s」。

---

## 3. 畫面模式目錄(Patterns)

| # | 模式 | 結構 | 參考 node |
|---|---|---|---|
| P1 | Editor 外殼 | menu bar → project bar(tab + 動作)→ 全幅場景 + 8px 浮動工具 + 狀態條 | 4071:35228 |
| P2 | 浮動 panel | 深色圓角卡 + tab icon + Find/排序/篩選 + 計數 + row | 4071:108994 |
| P3 | 資源三欄 modal | rail(插圖 + 分隔線 + 分類計數)/ 縮圖格 / 預覽 + 動作 | 4091:55636 |
| P4 | Dialog | 標題條(icon + 標題 + X)· 大線稿 icon + 說明 · 右對齊 Cancel + Primary/Destructive | 4071:293612 |
| P5 | 狀態型 modal(連線/搜尋) | 標題條 + 細紫線 + 置中大狀態 + 一個行動 + 「New here?」教學連結 | 4071:314696 |
| P6 | Toast | 深卡 + icon + 文字 + X + 橙底線進度 | 4071:115682 |
| P7 | Launcher 殼 | 左 rail + 大圓角主面板 + hero banner + 卡片格 | 22001:2540 |
| P8 | Wizard | 垂直 stepper + 大插圖 + 選項大卡 + Skip 連結 | 4071:214994 |
| P9 | 設定頁 | 左分類導航 + 右內容;小標淺紫;資料有 (i) | 4163:14252 |
| P10 | 空狀態 | 圓形線稿 icon + 粗標題 + 灰說明(+ 1 個行動) | 4071:302094 |
| P11 | 狀態矩陣 | Waiting / Importing % / Fail / Done / Selected 逐格 | 4071:302094 |
| P12 | 內聯狀態 pill | 綠剔 / 琥珀三角 / 紅「!」+ 簡短文字 | 4071:214361 |
| P13 | Tag/Chip 列 | 淺紫 pill + x;上限提示;選取橙框 | 4071:292430 |
| P14 | 摺疊摘要行 | 標題 + 灰色一行摘要(右)+ chevron | 60SMq… 178:13970 |
| P15 | Diegetic 場景內 UI | 獨立 token、玩味色(洋紅/藍/青綠)、blob + 星芒 | 60SMq… 597:16698 |
| P16 | Debug overlay | 3 tab(琥珀 = Warnings)+ 列表 + 快捷鍵列 | 1fAQ8… 4163:14342 |
| P17 | 設計文件頁 | 標頭(logo | Projects/File Name/Date | 右 "XRCC 4.0 UI")+ 紫色大標題 + 流程 + 狀態拆解 + 橙引線註解 | 4071:302094 |

---

## 4. 品牌語氣(Voice & microcopy)

**原則(由現有文案歸納):**
1. **先講發生咩事,再講點做。** 「Asset failed to import. Error details are shown below.」
2. **講後果、俾數字。** 「Used by: 10 items / Referenced by: 3 behaviours.」
3. **俾替代方案,唔只係「失敗」。** 「Would you like to use "New Name (1)" instead?」
4. **按鈕用動詞 + 後果**:`Delete anyway`、`Scan Again`、`Retry Connection`、`Open Anyway`、`Remind me later`、`Update Now`,避免 `OK`/`Submit`。
5. **鼓勵式空狀態**:「All clear so far — No behaviour warnings detected. Any warnings will appear here」。
6. **英文:短、友善、主動**("You're up to date!"、"Welcome to XRCC!"、"First Time to Use?"、"New here?")。
7. **Marketing:自信、具體、有節奏**("Bring your XR vision to life in under 2 hours"、"Your creativity. Your way.");中文社交用港式口語(「立即save低!」、「5個你必需知道的」)。
8. **UI 內中文**跟 Glossary(物件、專案、行為/行動/動作…),**唔好**用社交媒體口語;口語只限 marketing 同 Alan 內部註解。
9. 避免:「Something went wrong」(除非後面跟原因 + 下一步)、「Invalid input」、「Please try again later」。
10. 文件內註解混合粵語/英文(Alan 工作文件風格);**交付俾 UI 嘅字串要純 EN / zh-TW**。

**文案模板(可直接套用):**
- 空:`<icon>` + **No <things> yet** + `<一句點解 + 點開始>`
- 失敗:**<What> failed to <verb>.** + `<原因/細節在下方>` + [Retry <noun>]
- 確認刪除:**Delete <thing>?** + `<被引用/使用數字>` + `<後果一句>` + [Cancel] [Delete anyway]
- 成功 toast:`<Thing> <past tense>`(例:「Project saved」「Item linked」)

---

## 5. 缺口與不一致(今次新發現,按影響排序)

| # | 發現 | 影響 | 建議 |
|---|---|---|---|
| 1 | ~~Brand 與產品字體/風格不同~~ → Alan:**正常**,Brand 與 Product 分開處理(只留一個提示:Brand 文件淺色 UI kit 唔好當產品參考) | — | 已結案,毋須處理 |
| 2 | ~~Quiz Object 新色~~ → Alan:前任 designer **有意獨立**;唔當缺口。Brand 副色(Turkish Sea / Blue Moon / Xenon Blue)產品幾乎冇用,只係觀察 | — | 已結案 |
| 3 | Active 導航兩種並存(Assets Panel gradient pill / Launcher 紫 tint + 左豎條) | 見 §5.1 建議 | **建議採用紫 tint + 左豎條**,gradient pill 不擴散(§5.1) |
| 4 | **Workbench Asset Panel(44:64)用 table**,同 Alan 基準(縮圖 + 三欄)相差甚遠 | Alan 已點出「冇趣」 | 按 §6 重做 |
| 5 | 大量規格板同「過程文件」風格各異:(a) 早期 VOTANIC 標頭 + 紫大標題 + 橙引線(最有品牌感);(b) 2026-09 AI Quiz 灰底白板 + 黃「changed vs today」標籤;(c) Debug/Main Scene 標頭欄位仍係「—」 | 文件質素不一;(c) 未填標頭 | 新文件統一用 (a);(c) 補標頭。 |
| 6 | **Section 小標題顏色/字級不一**:有淺紫粗體(Settings)、白粗體(Content Library)、紫色大標(文件) | 跨畫面節奏唔穩 | 指定:面板內小標 = `text/accent` + Paragraph 2 Bold;面板主標 = Heading 4/5 白 |
| 7 | **空狀態有兩種做法**:圓形線稿 icon + 粗標題 + 灰說明(Async / Debug),同純灰兩行字(Launcher Packages/Projects 空狀態) | 個性不一 | 統一用前者 |
| 8 | Tag UI / VR 文件部分文字係**白字落白底**(placeholder 標題)、部分「Preview」佔位圖未填(Debug cover 空深色方塊、Onboarding 白色圖框) | 截圖/交付時像未完成 | 清理或標明 placeholder |
| 9 | UI Design Rule 框名仍寫 "need global check";Rule 5 嘅 input 高度(35/50/100)與 Library(28/36/48)不符 | 兩個來源 | 以 Library 為準;待 Alan 決定是否更新 Rule 5。**Open** |
| 10 | Launcher / Onboarding 圖框中文 UI 同英文並存(`Skip to Home`、CJK 註解),成稿語言策略未明 | 本地化範圍 | 沿用 Glossary;註解保持內部語言 |
| 11 | PC UI 舊畫面(2.1–3.1)用舊色板同圖標(Old UI 頁),與 4.0 並存 | Claude 搜尋時可能抽到舊樣式 | 只以 4.0 畫面 + Library 為參考(見 playbook 新增 §8) |
| 12 | 紅色用途:Debug/Free Trial 用鮮紅 `#A71313`(behaviour General block)同 destructive `#a32929` 外觀接近但語意不同 | 易混淆 | Behaviour 色只限 behaviour 區 |

### 5.1 Active 導航建議(美感 + UX 優先)
**已定案(Alan 確認「好」):Launcher 式「紫 tint 底 + 左側 3px 豎條」,配實心 icon + 粗字。**
- **UX**:豎條 + 底色 + 字重三重提示,細螢幕/低對比都一眼睇到;唔靠 gradient 對比,文字喺平面深紫上最易讀;hover/selected/disabled 狀態少一個變數。
- **美感**:豎條右邊做圓角、tint 用 `surface/header`(`#2a2531`)再加淺紫字 `#b89afa`,同 Library 紫調一致;比 gradient 更耐睇、唔搶內容。
- **可行性**:全部用現有 token,**唔需新 token / 新 component**(符合「唔好加新 token」)。
- **Gradient pill**:好有性格,但 Library 冇 component 也冇 gradient token;每個導航都 gradient 容易「AI 味」。建議只保留喺 Assets Panel 現有位置,唔推廣;日後如 Alan 想做,先開 component,再決定 token。
- 想多一點「人味」:active 項目 icon 由 outline 轉 solid,右邊顯示計數,而唔係加 gradient。

---

## 6. 依呢份研讀,Workbench Asset Panel 可以點改(建議,**未動手**)
1. 三欄結構:左 rail(線稿插圖 +「Select file」+ 橙細線 + 分類計數,active = Launcher 式紫 tint + 左豎條,見 §5.1)。
2. 中欄縮圖格取代 table;縮圖用 `Thumbnail` 實例 + 真實預覽圖;標籤淺紫。
3. 右欄預覽 + 橙分隔線 + 紫色名稱 + `Untagged` chip + 底部 `Center` / `Add Asset`。
4. 保持:只用 Library component + 現有 token(**不新增 token**);新 component 可建(28/36/48,記入 change log)。
5. 空狀態/匯入失敗按 §3 P10/P11 + 文案模板。

---

## 7. 未涵蓋 / 需要 Alan 補充
- **已睇但低解像**(超長 section 縮到約 1:4):Launcher Project / Profile / Version / License / Download Manager 內部細節;Poe / Wit.ai Connection 長 section;User Journey。需要時我可逐個視窗放大再補。
- **未睇**:PC UI 檔 Release Notes Image 頁(只有 1 個節點,未開);上份報告提過嘅 Old UI / Lily Prototype / Memes 頁今次頁面清單已冇(13 頁),可能已移除;Launcher Archive、Prototype;Voyage360 檔(`KoJQjDPM4sjwsoMYEvCDkw`,獨立系統,Alan 未要求);XR/CAVE/HMD library(未知檔案連結)。
- **缺連結**:索引表冇列 URL;今次所有 file key 均由專案檔(`knowledge/claude/votanic-workflows.md`)搵到,冇缺失。
- **Open 問題**:§5 只剩 #9(Rule 5 高度,Alan 已話 12 條只係局部參考)同 #4(Workbench table 重做,待 Alan 叫先做)。

- **2026-10-09 補睇**:Voyage360(只有 2 張封面,見 §1.11)、Launcher 封面同討論筆記(§1.4b)。Launcher Packages / License / 三個彈窗已放大 review(§1.4c);Onboarding / Download 面板 / Profile / Version 已放大 review(§1.4d);Project 卡 / Connections(§1.4e)、Download/Import 狀態 / 版本選擇 / Poe key(§1.4f)已睇。Launcher 範圍基本睇完(§1.4g 補 Download Manager 主畫面 / Microcontroller);Download Manager 內其餘重複畫面只係同一頁嘅狀態切換。


---

## 8. 「未必好」位置 Link 清單(俾 Alan review)
全部係 Claude 嘅判斷,**由 Alan 決定係咪問題、點改**。冇改動任何 Figma。

| # | 位置 | 點解覺得未必好 | Link |
|---|---|---|---|
| 1 | 「Something Went Wrong」彈窗 | 標題泛泛;內文問建立 profile,按鈕卻係 Download | [4071:212548](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212548) |
| 2 | 「Project uses premium resources」彈窗 | 按鈕 `Ok` 同 `Cancel Import` 並列,語意含糊 | [4071:212051](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212051) |
| 3 | Download 面板空狀態 | 「未有任務」用「!」圓圈,似錯誤 | [4071:212817](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212817) |
| 4 | Packages 頁(空狀態 + Expired) | 同上;空狀態冇行動重點 | [4071:211282](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211282) |
| 5 | Add New Profile 彈窗 | 必填 CLI 字串、技術味重、冇說明 | [4071:211466](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211466) |
| 6 | Update Profile 頁 | 值對齊同彈窗唔一致;灰按鈕冇解釋 | [4071:211366](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211366) |
| 7 | Install More Version(載入中) | 大轉圈 + 空 table,大片空白 | [4071:211659](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211659) |
| 8 | License 頁 | 1–2 行都用 table,偏後台、同專案卡風格唔一致 | [4071:211840](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211840) |
| 9 | Connections Setup 彈窗 | 非破壞性「Mute」用大紅;Connected 狀態重複 | [4071:208829](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208829) |
| 10 | XRCC Connections 頁 | 兩個 table 權重一樣、icon 無文字、placeholder 文案 | [4071:212738](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212738) |
| 11 | 專案卡 icon tag | 版本高/低靠綠紅顏色區分 | [4071:212145](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212145) |
| 12 | Onboarding(Download Failed 彈窗只得 OK) | 失敗後冇下一步 | [4071:214995](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-214995) |
| 13 | Launcher 封面(Active nav 同 Assets Panel 做法不同) | 兩種 active 導航並存(已定案用 Launcher 式) | [Launcher 1:10488](https://www.figma.com/design/18RvTL8PypmNuZIszfSRMV?node-id=1-10488) / [Assets Panel 4091:55636](https://www.figma.com/design/OX57GAX6iYmsxNhO5bzMqD?node-id=4091-55636) |
| 14 | Workbench Asset Panel | table-only,同 Assets Panel 縮圖三欄差距大 | [Workbench 44:64](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk?node-id=44-64) |
| 15 | UI Design Rule 框 | Rule 5 高度同 Library 唔同;Rule 7「!」空狀態(Alan 話 12 條只係局部) | [4071:211963](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-211963) |
| 16 | Voyage360 封面內舊面板 | 較鮮紫標題條 + 多層小 tab,同 4.0 唔同代 | [Voyage360 5035:106172](https://www.figma.com/design/KoJQjDPM4sjwsoMYEvCDkw?node-id=5035-106172) |
| 17 | Import 清單(每行鮮紅 ✕) | 取消排隊用大量鮮紅,視覺過重 | [4071:212817](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212817) |
| 18 | New Poe API key 彈窗(密碼 checkbox) | 冇標籤 checkbox + (i),用途唔清 | [4071:208683](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208683) |
| 19 | Auto Connection 彈窗 | 文案錯字「key& token」、冇講配對咗幾多個 | [4071:208854](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208854) |
| 20 | 版本選擇器(收起狀態) | 只有 chevron、冇 label,唔知係「用邊個版本」 | [4071:212273](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-212273) |
| 21 | Update Microcontroller Connection 彈窗 | 裝置類型標籤 / 按鈕互相疊住、文字被截;「Connected to none」用紅字 + 「!」 | [4071:208908](https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO?node-id=4071-208908) |
| 22 | Assets Panel 細字 + 紅色「Your Package」鈕 + 縮圖風格不一 | 可讀性、紅色用途、一致性(整體仍係好參考) | [4091:55636](https://www.figma.com/design/OX57GAX6iYmsxNhO5bzMqD?node-id=4091-55636) |
| 23 | Runtime Debug Panel(placeholder / 腳註擠 / 缺空狀態) | 未示範真實內容與空狀態;窄屏快捷鍵列易爆 | [4702:12228](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4702-12228) |
| 24 | 「START HERE」規格方塊 | 概念好,但純文字無層次 | [4202:10925](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4202-10925) |
