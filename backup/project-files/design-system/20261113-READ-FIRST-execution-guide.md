# VOTANIC 做任何事先閱讀：執行說明頁

更新日期：2026-11-13。整理者：Claude（應 Alan 要求，整合專案記憶、專案檔案及各 thread 對話）。

**目的**：Alan 多次指出 Claude 忘記他說過的規則。本頁是每個 thread 開工前必讀的單一來源。規則內容以 Alan 的原話為準，每條註明日期與來源，沒有自行發明的規則。

來源簡寫：M＝專案記憶檔（`/tmp/claude/memory/team/silo/` 內同名檔案）；T＝thread 對話（以 thread 標題標示）；D＝專案檔案（`/mnt/project-files/` 內文件）。

---

## 0. 使用方式與優先次序

1. 每次開工先讀本頁第 1 節「開工前必讀清單」，再按任務類型讀對應章節。
2. 優先次序：**Alan 在當前 thread 的最新說話** ＞ 本頁 ＞ 專案記憶檔 ＞ 較舊的文件（例如 playbook）。同一事項有衝突時，以較新者為準；已被取代的舊規則集中列在第 14 節，請勿再依舊規則行事。
3. 本頁只收錄 Alan 明確說過的指示，或他已確認的決定。標示「假設」的內容未經 Alan 確認，不可當作定案。
4. 如發現本頁與 Alan 剛說的話不同，以 Alan 為準，並在完成後更新本頁及記憶。
5. 專案內 Notion、Outlook 等公司系統一律只讀，詳見第 3 節。

---

## 1. 開工前必讀清單（每次都做，順序固定）

做任何工作前，逐項確認，不可跳過：

- [ ] **1. 讀本頁第 2 至 5 節**（語言、權限、工作順序、Figma 標準）。
- [ ] **2. 讀專案記憶索引 `MEMORY.md`**，並開啟與本任務相關的記憶檔（例如 Remote Trigger 任務必讀 `remote-trigger-group-is-button-model`、`remote-trigger-v2-figma-locations`、`remote-trigger-notion-spec-facts`）。
- [ ] **3. 做 Figma 流程、連線箭咀、Annotations 前**：先讀 `figma-flow-standard-connectors-annotations`，再用 Figma 開啟參考頁 Workbench node `1333-8666`（檔案 `ZBOB48n4eLsZABCTnhh5kk`），**量度實際樣式後才動手**。不可自創新方法（Alan 2026-11-13）。
- [ ] **4. 做 Runtime Debug 畫面前**：先讀 `debug-feature-new-boards-rules` 與 `design-system/20261014-debug-panel-flow-handoff.md`。
- [ ] **5. 做 Voyage 360 前**：先讀第 9 節及 `voyage360-token-structure`、`voyage360-loading-enhancement-decisions`。
- [ ] **6. 做 AI Provider 前**：先讀第 10 節、`ai-provider-review-v1-decisions`、`ai-provider-team-feedback-2026-11-06`。
- [ ] **7. 需要事實時先自行唯讀搜尋 Notion 與 Figma**（`knowledge/claude/votanic-workflows.md` 的 W0 研究步驟），不要要求 Alan 貼內容。Remote Trigger 在表達意見前須先重讀 Notion 規格（M：remote-trigger-notion-spec-facts）。
- [ ] **8. 查看 Library 是否已有元件或 token**（先 `search_design_system`），沒有才考慮做 feature 元件。
- [ ] **9. 確認任務範圍**：Alan 有限定範圍時（例如「only Voyage 360 Loading Enhancement page」）只做該範圍；說「先不要做」時只整理意見、不改動（T：統一 Voyage 360 按鈕用 XRCC Library，2026-11-09）。
- [ ] **10. 回覆前確認語言與標點**（見第 2 節）。

---

## 2. 溝通與語言

| 規則 | 來源 |
|---|---|
| 與 Alan 的對話、thread 回覆用**繁體中文（粵語使用者）**。 | 專案指示；M 索引 |
| 匯報、報告、總結一律用**書面語**，不用口語粵語。避免「嘅、咗、冇、唔、係、啲」。例：「已完成」「沒有」「是否」。 | Alan 2026-11-02「匯報也請用書面語」；M：feedback-reports-written-chinese |
| **標點**：英文逗號「,」後加空格；中文用全形標點「，。；：！（）」。「記底，所有地方都應用」，包括報告、UI 文案、回覆、Figma 文字。數字如 12,000、程式碼與路徑不拆。 | Alan 2026-10-14；M：punctuation-rule-zh-en |
| **UI 文案以英文為主**（Roboto，Base mode）。中文「非常少用」，只有 Alan 要求才用中文。文案要具體、真實、有人味，不用 lorem 或「Item 1」。 | Alan 2026-10-09「所有UI都以英文為主, 中文非常少用」；M：ui-copy-english-first |
| **Annotations 文字**：繁體中文書面語，**不是中英對照**；只有術語或 UI 名稱用英文更清楚時才用英文；少而精準。 | Alan 2026-11-05（先說雙語，隨即更正為只用中文）；M 索引 |
| 每週五工作總結：香港時間星期五 17:30（cron `30 9 * * 5` UTC），中英雙語（EN + 中文書面語），**一段**，不用 bullet，**不提 Stream Deck**。此例行任務須 Alan 確認。 | Alan 2026-11-06；M 索引；T：每週五工作總結 |
| 對公司同事的訊息用簡潔專業、香港職場英文；給開發者的訊息著重清晰與實作細節；給主管的訊息著重背景、進度、阻礙、決定、下一步。 | 專案指示 |
| Alan 問「你建議點做？」時：給出**建議方案、原因、取捨、實作建議**，不要只列選項。 | 專案指示 |
| 回覆要說明新資訊與結果，開頭先講結果或需要 Alan 做的事。 | 系統規則 |

---

## 3. 權限與工作方式

### 3.1 公司系統（專案指示，Alan 的根本規則）

- **Notion 唯讀**：可搜尋、閱讀、摘要、比較；**不得**新增、編輯、刪除、移動頁面、改屬性、改任務狀態、加留言，除非 Alan 明確要求該項具體變更。想改 Notion 時只可「建議內容」，由 Alan 自己貼。
- **Outlook／電郵**：可搜尋、閱讀、摘要、擬稿；**不得**自行寄出、轉寄、刪除、封存、修改。擬稿不代表自動寄出。
- **Synology／Workforce Portal／XRCC／Voyage360／內部後台**：視為公司機密。不假設帳號、權限、VPN、環境；需要登入或內網時明確告知 Alan。**絕不外洩密碼、token、API key、含憑證的連結。**
- **預設規則**：讀取、搜尋、分析＝允許；新增、編輯、刪除、發送、發佈、改狀態＝需要 Alan 明確指示。拿不準是否改動公司資料時，當作寫入動作處理並先問或建議。
- 非公開的 Votanic 資料視為機密，不放進外部搜尋；公開網頁研究只在真正需要時使用。

### 3.2 設計工作：自動做，事後匯報

- Alan 2026-10-09：「可唔可以唔好次次都問, 自動做」。Library 或 Figma 的明確改善，直接做、記錄、再匯報，**不要每一步都問**。
- 工作紀錄寫入 `/mnt/project-files/design-system/20261008-library-change-log.md`（每次 Library 或 Workbench 改動都要記）。
- 只在以下情況暫停詢問：**不可逆的事**（刪除他人內容、對外發送、改正式環境），或**改變任務目標**的決定。
- Alan 2026-11-05 起多次表示「根你建議做」「由你建議」：他把設計判斷交給 Claude。此時直接決定、套用，並在匯報寫明決定與理由（例：2026-11-13 AI Provider 第 2、8 項）。

### 3.3 Library 修改權限

- Alan 2026-10-08：「如果有需要優化,可以改Library」。**新增**項目直接做並列出差異；**刪除、改名、改值**以往要先列清單（其後 2026-10-09 起，明確值得做的改善可直接做並記錄）。
- **只有 Alan 可以 Publish Library**。凡 Library 有改動，匯報時提醒「請 Update／Publish library」；沒有改動就寫明不需要。
- 新增通用元件可以（尺寸 28／36／48、有描述、記入 change log），並提醒 Alan Publish。

### 3.4 備份例行（每日 VOTANIC 記憶備份）

- Alan 2026-10-25 已批准：週一至週五直接執行（掃描秘密、複製、推送到 GitHub `backup/project-memory` 分支、Drive 加日期快照），**不用每次問**；**星期六、日不跑**，只回報已略過。
- 永遠**不備份秘密或憑證**，不動 `main`，不刪 Drive 檔案。`StreamDeck.zip`（約 224 MB）不納入備份。
- Drive 連接器無法覆蓋檔案內容，只建日期快照資料夾及 HANDOVER-README。
- **現況（2026-11-13）**：當日 GitHub 推送被自動模式安全檢查攔截（2026-11-12、11-13 皆然），Alan **尚未**批准 11-13 的推送；不可繞過。（M：backup-routine-approval-and-weekdays；T：每日 VOTANIC 記憶備份 2026-11-13）

### 3.5 GitHub 與 Prototype 交付

- 單人工作流程：開 branch、開 **draft PR**、Alan 審閱後 Squash merge；不碰 `main` 與 `backup/project-memory`（T：設定 GitHub 單人工作流程，2026-10-28；PR #2 的 CONTRIBUTING）。
- Alan 要求「隨時有一條連結查看設計」：單檔 HTML prototype 可用 `https://htmlpreview.github.io/?https://github.com/yauchai2/VOTANIC/blob/<分支>/prototypes/<名稱>/index.html`（Alan 2026-11-06 指出此做法）；Artifact 連結更新時保持**同一網址**。
- 受限於環境，只可推送到指定分支；疊在其他 PR 之上時要說明。

---

## 4. 工作順序（Alan 最強調的順序）

1. **先做 Figma，全部畫板做完並自我檢查，之後才做 prototype**。Alan 2026-11-12 動氣重複、11-13 再說：「我講過所有東西先做Figma再做prototype.......」。同一回合內不可一邊改 Figma 一邊改 prototype；Figma 經 Alan 看過（或他說可以）才同步 prototype。（M：feedback-figma-fully-done-before-prototype）
2. 當 Alan 要求收尾時的標準順序（Alan 2026-11-13 原話）：**先做未完成項目 → 詳細 review UI/UX → 在 Figma 加上連線、Annotations、執好全部 screen flow 排位 → prototype → 最後改 web prototype link**。
3. Prototype 要**完全複刻 Figma**，做到自己逐項檢查後是一樣的（Alan 2026-11-13）。
4. **所有 hover 與 tooltips 都要加上**（Alan 2026-11-13「記得加上所有hover和tooltips」），並在規格頁以表格列出（tooltip 為 spec table）。
5. 每次 Figma 改動後的**自我檢查**見第 13 節，**不要等 Alan 問**。

---

## 5. Figma 連線與 Annotations 標準（Alan 因 Claude 反覆忘記而特別強調）

> Alan 2026-11-13：「…原來你用咗新方法做，我好耐之前同你講過一套連線風格同埋標準，annotations是指Figma的annotations功能。」並詢問如何解決經常忘記，建議在某處放指引並要求必讀。本頁就是該指引。

**參考頁**：Workbench（檔案 `ZBOB48n4eLsZABCTnhh5kk`）node **`1333-8666`**（頁面 "XRCC AI Provider" 的連線標準）。做任何連線或 Annotations 前**先開啟並量度**。

**標準（由參考頁量度）**（M：figma-flow-standard-connectors-annotations）：

- **連線箭咀**：放在名為 `Flow connectors` 的 frame 內，向量線，命名如 `A1 to A2`；線寬 **2**，終端 `ARROW_LINES`。**主流程＝實線，顏色綁 accent 變數 `17459:947`；分支或替代路徑＝虛線 `[6,6]`，顏色綁灰色變數 `17459:1128`（border/stroke）。** 畫板之間約 80px；分支線（如 A3 到 A6）用折線繞行。
- **畫板標籤**：每塊畫板上方有 `Label · A2` frame，包含 Board no（11px）、Board title（16px）、Board note（12px），文字色全部綁變數。
- **Annotations＝Figma 原生 Annotations 功能**（`node.annotations` 加 `categoryId`），**不是**畫板下方的文字 Note。類別：`1:0` Development、`1:1` Interaction、`1:2` Accessibility、`1:3` Content、`1237:0` Loading UX。書面語，少而精準，**貼在它描述的元素上**。禁止散落的文字「Note」frame。
- **Prototype 連結不等於「連線」**：畫板之間必須有**可見的流程箭咀**，另外才加 prototype 連結。
- 複製其他畫面時，**刪除不相關的 annotations**（Alan 2026-10-29：「如果你copy其他UI screens, 記得delete返啲不相關的annotation」）。
- 新畫板要放進該 feature 的主 Section，並有 Flow lines、labels（trunk pattern）與 prototype 連結，不可散落在外（M：debug-feature-new-boards-rules）。
- 重複的 annotations 只保留首次出現處（2026-11-12 AI Provider 由 48 則整理至 25 則的做法）。

**現況提醒（2026-11-13）**：Remote Trigger P1 已把 27 條箭咀改為參考頁樣式，並把 30 段 Note 轉為原生 Annotations；**尚缺**分支虛線（如 A3 到 A9）、畫板上方 Label、`Flow connectors` 分組、Overview；Remote Trigger thread 正在補做。

---

## 6. Library、元件與 Token

| 規則 | 日期與來源 |
|---|---|
| **能用 XRCC (PC) Library（檔案 `De8nKqO81yciw4wH5xfpxA`）就用 Library；能用 component 就用 component。** 不要手畫 checkbox、pill、40x40 關閉鈕、列 frame。先 `search_design_system`。 | Alan 2026-11-12、11-13 重複；M：feedback-use-library-and-components-first |
| 常用 Library 元件：`Form / Dark / checkbox`（設 Check variant，`value` 保持 false）、`Form / Dark / Select`、Text Input、`Switch`、`Tag`（可互動）與 `Badge`（唯讀狀態或數量）、`Button / Dark / Button Square`（純 icon，Size 28／36）、Slider Bar、dropdown-menu、Dialog、Tab。Variant 名稱順序以 Library 為準，用 property 設定，不要猜名稱字串。 | M：feedback-use-library-and-components-first |
| **新元件放哪裡**：feature 專用元件放**該 feature 檔案自己的 `Components` 頁**（例如 Workbench page `85:1541`）；只有真正通用、跨 feature 重用的才放 Library，並提醒 Alan Publish。 | Alan 2026-10-09；M：library-new-components-allowed |
| 新元件要有描述、沒有未使用的 component property，並記入 change log。 | 同上 |
| **不新增 token**：套用 token 時只綁已存在的 Primitive／Theme／System；對不上的值留未綁定並列出原因，**不要主動提議新增**（例：不加 status/info/*）。 | Alan 2026-10-08「唔好幫我加新token」；M：no-new-tokens-when-applying |
| **唯一例外**：unit 與 typography 延伸到 80（`unit/72`、`unit/80`、display 2xl 至 4xl、`spacing/72|80`）；Voyage Library 的 Voyage 專屬顏色 token。`status/warning/*` 已由 Alan 同意加入並發佈。 | Alan 2026-10-14；2026-11-03；2026-10-08 |
| **你自己畫的東西也要綁 token**：流程線、labels、chips（如「Start here」）、Notes、Section 框的顏色、radius、spacing、字體一律綁 Library 變數，不用 raw 值。沒有對應 token 時選最近的並說明，**不新增 token**；匯報前跑一次未綁定值掃描。 | Alan 2026-10-15「你做既嘢要用返我地啲 Tokens，mark底」；M：feedback-own-drawn-elements-use-tokens |
| 文字一律用 Library text style（heading/xl·lg·md·sm、body/lg·lg-bold·md·md-bold·sm、caption）；不要再用舊 `typography/en/*`。 | M：xrcc-typography-system |
| 控件高度：Button 與 Text Input 統一 **Large 48／Medium 36／Small 28**；不加 40。Notion 寫 40 的地方以 Library 為準。 | Alan 2026-10-08；M：xrcc-design-system-study |
| Tooltip 以現有 Figma 檔為準，Notion 的 Tooltip 規格已舊。 | Alan 2026-10-08 |
| **只有 Dark mode**：Light 在 XRCC 極少使用，清單、規格、畫面只列 Dark，不並排列 Light。 | Alan 2026-10-14；M：light-mode-rarely-used |
| 元件有 A 代（`X / Dark / Y`）與 B 代時，A 代優先。 | Alan 2026-10-08；playbook §5 |
| 圖示用 `icon/outline/*` 為主；AI Provider 流程的 icon 統一 **outline 1px** 與統一視覺大小（行內 16、tile 內 20）。 | Alan 2026-11-05 |
| Library 的 `Primitive` collection 不對外發佈：其他檔案只能綁 Theme tokens，不能綁 Primitive。 | M：library-setup-review-2026-11-05 |
| Library 元件重用 Debug Confirm Dialog 等已存在元件；`Asset card` 頁刻意搬出 Library，不要還原。 | M：library-full-review-2026-10-09 |

---

## 7. 設計質素與視覺細節

- **最高質素標準（Alan 2026-10-09，標示「重要」）**：「我需要有美感和專業的UI/UX, 介面要有趣而非一般AI味, 我要有人味」。在 Library token 與 component 之內精心設計：層次與節奏清楚、重點明確、間距對齊有考慮、內容真實具體、空狀態／錯誤／載入狀態周全。避免千篇一律卡片、預設紫色漸層感、填充文案。交付前用截圖自我檢視，說明哪些是刻意的設計選擇。（M：ui-quality-human-not-generic-ai）
- **視覺化、簡約、易理解**；內容是視覺的（資源、專案、場景）用縮圖／預覽，不用 table（Alan 2026-10-09、11-05）。次要或進階設定收起或視覺上次要。
- **Mobbin MCP 可隨時使用**查 UI/UX 參考；只吸收想法，仍用 XRCC Library 元件與 token（Alan 2026-11-05；M：mobbin-ui-reference-allowed）。
- **現有 UI 都是舊設計，未必好**：吸收做得好的位置，不照抄遺留問題；只參考 4.0 畫面，不抽 2.1 至 3.1 舊畫面。例外：Alan 指定某階段要**先複刻舊 UI**（Remote Trigger P1）時，先複刻、再優化。「XRCC UI Design Rule」12 條只是某 feature 的局部規則，不必硬跟。（M：xrcc-visual-language-study）
- **文字對齊 baseline**：水平 Auto Layout 列內若全是文字且字級或字重不同（例如 "API key" 14 bold 旁邊 "Optional" 12），必須 `counterAxisAlignItems = 'BASELINE'`；與 icon 並排或同字級的維持置中。Prototype 用 `align-items: baseline`。（Alan 2026-11-05：「請review all text 是align baseline 如有需要。也請記下」；M：feedback-align-text-baseline）
- **Icon 顏色必須綁與旁邊文字相同的 token，每個狀態都一樣**（Alan 2026-10-13：「icon顏色錯誤問題已發生多次, 請fix和記下」）。換 icon（`swapComponent`）或新建 icon instance 後，顏色會重置為 Library 預設白色，必須**重新綁定**所有 vector 的 fill 與 stroke；選取＝text/accent、一般＝text/primary 或 icon/default、停用＝text/disabled，並逐狀態截圖。裝飾性狀態 icon（警告琥珀色）保留狀態 token。（M：feedback-icon-colour-follows-text-token）
- **行動色**：純紫只用於 Primary action，一個決策區只有一個 Primary；選取用 border 加淺底；琥珀只用於警告；紅只用於 error 與 destructive；橙（Citrus）只作「點睛」，一屏最多 2 處。**Cancel 用 Tertiary。**（playbook §5、§8；Alan 2026-11-05）
- **Active 導航**：Launcher 用紫色 tint 加左豎條；漸層只限 Assets Panel 現有 active pill。（Alan 已確認）
- **Studio feel**：XRCC 是「做嘢嘅地方」；狀態必須誠實（只用 Accepted／Saved locally／Queued／Delivered／Failed，不推斷）；趣味放在邊緣（空狀態、首次成功），破壞性與資料 dialog 保持樸素。這是**未來／新工作**的指引；**不要改動現有舊 XRCC UI**，Alan 說會逐步更新。（M：xrcc-studio-feel-direction）
- **文檔區可以更大膽**：文件、規格、概念畫面、空狀態可用大字級對比（eyebrow＋heading/xl，最大與最小至少 2.7:1）；真正的產品 UI 保持克制。（Alan 2026-10-14；M：xrcc-bold-typography-docs-zone）
- 插畫可自由設計，只要與 XRCC 風格一致，不需綁 token，不新增 Library token，不用狀態色做裝飾。（Alan 2026-10-09）
- 「轉化落 XRCC」指把研究所得融入**記憶與 guideline**，不是再出畫面。（Alan 2026-10-09；M：integrate-research-into-memory-not-screens）
- 文案：講發生什麼、後果（附數字）、下一步或替代；按鈕用「動詞＋後果」（`Delete anyway`、`Retry connection`），避免 OK／Submit；不用 "Something went wrong"。遵守 Localization Keyword Glossary（物件、專案、行為／行動／動作、獲取、設置、儲存、傳送；品牌名保持英文）。（playbook §8；M：votanic-xr）

---

## 8. 平台與版面限制

- **XRCC PC 與 Voyage 360 畫面：只做固定 1920x1080，不要做 responsive、窄版或寬版畫板**（舊 Unity client 不能 responsive）。Alan 2026-11-02；單一桌面 frame 即可。（M：ui-responsive-required 的例外段）
- **Web 或其他交付物**（例如 web prototype）仍須 responsive：Auto Layout 到底、wrap、`minWidth`，並用約 1440、1280、1024 寬度截圖檢查。（Alan 2026-10-09、11-06「responsive」）
- 版面間距跟 playbook §4（Window 左右邊距 32；header → title 24；label → input 8 等），8px grid；Section gap 大於 component gap。
- Auto Layout 建立的 frame 預設白色 fill，需設 `fills = []`；Figma 檔名格式 `YYYYMMDD_<version> <function>`；不要在 `20251125_XRCC4.0_PC_UI` 加新功能。
- Remote Trigger 視窗尺寸：全部 Remote Triggers 視窗固定 **640 × 680**（超出時視窗內捲動）。更早曾定 800px 為上限，已被取代。（Alan 2026-11-13）

---

## 9. 專案別規則：Voyage 360

- Voyage 360 有**自己的 Figma Library**（`DyjGKBd4Z24GgffN1bAnG6`）與舊 UI 檔 `KoJQjDPM4sjwsoMYEvCDkw`。**一般 token、字體、顏色以 XRCC (PC) Library 為主**；Voyage Library 只放 Voyage 專屬顏色。重新設計貼近舊 UI，重用 Voyage 元件；工具列只有 **Play + Save***。（Alan 2026-11-03）
- 保留的 Voyage 專屬色：surface/base `#0e0d0d`、brand/band `#6429a0`、accent/light `#d9b0fd`、marking/delete `#c92e5f`、partner/pexels `#05a081`；其餘連結 XRCC Theme token。文件：`design-system/20261105-voyage360-colour-to-xrcc-mapping.md`。
- Voyage 畫面的 button 要用 **XRCC Library**（Alan 2026-11-09，範圍只限 Loading Enhancement 頁）。Voyage 檔案級 component（Header Play／Save、Scene Map 等）內部按鈕牽動所有頁面，未經 Alan 要求不在 component 層級更動。
- **Loading Enhancement 已定決定**（Alan，詳見 M：voyage360-loading-enhancement-decisions）：進度單位是 assets；Play 與 Save 在載入期間保持開放；缺檔逐檔計算，Review 對話框提供 Retry／Replace…／Retry all；資訊審視後**每項資訊只出現一次**；「More states」畫板已由 Alan 自己移除，**不要再加**。首個 scene 載入失敗時：先試下一個 scene，任一成功即進入專案、其餘背景載入；全部失敗才顯示失敗頁（Alan 2026-11-09）。
- Claude 無法讀取 Figma 留言：需要時請 Alan 貼文字或截圖；回覆留言的建議文字寫入報告供 Alan 貼上。
- Voyage 的元件是檔案內 local component，不需要 Publish。

---

## 10. 專案別規則：XRCC AI Provider

- Notion 唯讀；摘要 `reports/20261105-notion-xrcc-ai-provider-summary.md`；簡報 `design-system/20261105-xrcc-ai-provider-ui-brief.md`；Figma 流程位於 Workbench node **`1354-2549`**（29 塊畫板，Alan 2026-11-05 搬移後的位置）。Web prototype：draft PR #6，審閱修改為 PR #9（疊在 #6 上）；**Figma 與 prototype 保持同步**。
- **AIProviderPanel.mp4 只是 developer 測試**，不跟它的 UI/UX，只取功能與資料，重新設計得更好（Alan 2026-11-05）。
- 必備（Alan 2026-11-05）：Custom Provider；Key 從 Key Management 選取，不在卡片內輸入；voices 載入與錯誤狀態；voice clone 失效後備；voice 試聽；視覺化簡約。
- **Launcher 是另一個程式**；Connections 是啟動前的關卡（版本檢查 → 專案是否需要 connections → ConnectionSetupPanel → 啟動）；License 只是設定頁，與 AI key 無關。（Alan 2026-11-05；M：xrcc-launcher-connections-gate）
- 團隊審閱（Alan 2026-11-06 轉達）：分頁順序 Providers、Models、Voices、Sessions；「Tasks」改稱 **Models**（2026-11-12 統一）；不做 Play all；Voices 先顯示推薦並有搜尋與 Show all；用「Bring your own key」。
- **2026-11-13 審閱 v1 決定**（較新，覆蓋較早的 brief）：**不再有任何 VPN 提示**（連線失敗寫「請檢查網絡連線」）；「Locked」改為「Password needed」／「Enter password」；密碼欄有顯示／隱藏切換，不設確認欄；不提 quota；「Transcription」改為「Speech to text」（假設）；已連接的 provider 用綠色勾與「Connected」；Provider 以可換行網格，超過約 8 個加搜尋；Connections 是摘要列，每個連線開自己的面板（Figma D0、D1、D1b）。開發確認清單：`reports/20261113-ai-provider-review-dev-confirmation.md`。
- 各 provider 支援哪些 task 是**假設**，待團隊核實（Gemini 自 2026-11-06 起視為支援 image）。
- Icon outline 1px、Cancel＝Tertiary；Tabs 與 head 跟隨 Runtime Debug Panel（`6177-31101`）；Header 跟隨 Main Scene（`M84FtPQGf4odQy2KTdxKIR` 的 `6001-12978`）；多個 popup 疊放時下層變暗；tooltips 做成規格表；要有 Hover states。

---

## 11. 專案別規則：Remote Trigger

**先讀**：M：remote-trigger-group-is-button-model、remote-trigger-v2-figma-locations、remote-trigger-notion-spec-facts；Notion 頁面 "XRCC (Unity) External Connection: Remote Trigger" 與 "Remote Trigger Implementation Spec"（**唯讀**，表達意見前先重讀，因為規格於 2026-11-12 被大幅改寫）。

**模型（Alan 2026-11-13，標示「重要」，覆蓋所有較早說法）**：

- 每一個 "New Remote Trigger" box（分組）＝手機上**一個按鈕**；按下就執行該分組內**所有項目已連好的 flow**。
- 項目列的「連線按鈕」開啟一頁 Behaviour 連線頁，**起點是 Remote Start**，再連其他 behaviour。
- 本階段（P1「精簡設定」）：只有分組按鈕；Number、Text、Toggle 等變數輸入本階段移除（Alan 選「本階段只做分組按鈕」）；Color control 與 Label Text 為未來階段。A8 Phone sensors 保留；A9 是完整 Behaviour 連線頁（Library 面板加 Remote Start 畫布）。
- **先複刻舊 UI**（PC UI 檔 `7SMhpQ4IVhnlA6G6wfwAgO` node `4071-324500`；Workbench node `2071-10529`），再優化。
- **跟隨 Alan 手改的畫板**：Workbench `2018-11026`（A4）與 `2018-11300`（phone preview）；Scene Bar 已更新，Remote Trigger 入口是它的**手機圖示按鈕**；A4（`1497:4620`）是母版（真 XRCC header、背景 `#111116`、對話框頂 y=140）。
- 版面與互動細節：分組列＝card（radius 8）加 Library Text Input 名稱（無外框）；色塊只代表分組顏色；列與分組的操作 icon **只在 hover 時出現**（每畫板同時只一列 hover）；列高 44；**XRCC editor 畫面不顯示 phone preview**；所有 Intro 區塊可關閉；Footnote 放在 Remote list **最底**（Alan 2026-11-13 更正先前說法）；圓圈 icon 顏色只跟 Button Colour（跟 Notion 規格），分組顏色只用於編輯端；Text Input 無外框；Instance 行高 44；Select Instance 用樹狀分支線，父節點粗體。
- 手機端 web 自動由左至右、由上至下排列；Notion 規格列出的設定才做（Button colour、Number Min／Max／Decimal、Text 最大字數）。
- 已知差異待 Alan 決定：prototype 視窗置中，但 Figma A4 視窗偏左（Alan 手改）。Prototype artifact `Dmz56CF3MEQNn2saZUCaeM`（v35，PR #7，draft）。
- 輔助腳本注意：`_helpers`、`_rt_lib*` 內 `gp`／`pad` 找不到 spacing token 時曾靜默變 0，已改為取最近 token。

---

## 12. 專案別規則：Runtime Debug 與其他功能

**Runtime Debug（Workbench page `268:1285`）**（M：debug-feature-new-boards-rules；Alan 2026-10-27：「你好似唔記得哂啲記憶, 你review返成個Debug feature同埋之前啲記憶」）：

- 不要縮放或硬塞畫板進既有 lane Section（如 Log tab `451:2652`）；新建議畫板放在**自己的巢狀 Section**（空位，x < 900），原畫板不動。
- 自畫 frame 一律綁 spacing／radius／顏色 token；`createAutoLayout` 預設白底要清除。
- feature 專用元件放 Components 頁（`85:1541`）的 Runtime Debug 區，附描述；沿用 Debug Log Entry／Warning Entry 模式（Warnings 已有 xN 計數）。
- 接 prototype 如其餘畫面（tab 導航；Smart animate／Ease out／0.1s）、加 change log。
- 複製畫板會連 `flowStartingPoints` 與 reactions 一併複製：刪除多出的起點；清除會抵消新狀態的 hover 反應；對話框畫板清除遮罩背後的 reactions。
- Disabled toggle＝Debug Toggle State=Disabled＋Library "New Tooltips"「Only for the current scene」。
- 開放給開發的問題：Log 上限 500、Warnings 上限 100、Remove 是否清除 Log 歷史。Locate／Review variable 點擊目標仍待開發回覆，**不要改 Locate 連結**（M：debug-review-variable-click-target-pending）。

**其他**：
- XRCC 4.2 Data Analytics & Connections：文件在 `xrcc-4.2-data-analytics-connections/`。
- XRCC Claude Design System 套件：`design-system/claude-design-system/`；Library 改動後要更新 `colors_and_type.css` 與 `reference/components-full.md`；DesignSync 無法建立專案，須 Alan 自行上傳；每週一 09:47 HKT 有例行刷新（M：xrcc-claude-design-system）。

---

## 13. 完成前自查清單（每次 Figma 改動後，匯報前必做）

Alan 2026-10-29：「我叫你做野, 你自動check埋prototype, annotation, 整體等等」。以下**不要等他問**：

1. **傳播**：改動已套用到所有受影響的畫板（Overview、規格頁、其他相關畫板、規格表）。
2. **Prototype 連結**：沒有失效目標（CHANGE_TO 目標在 Components 頁不算失效）；清除複製來的起點；清除會抵消新狀態的 hover；補回因換元件而遺失的連結。
3. **可見連線**：箭咀符合第 5 節標準（Flow connectors、實線／虛線、Label）。
4. **Annotations**：全部是原生 Annotations；已刪除不相關或重複的；書面語；少而精準。
5. **Token 與元件**：沒有 raw hex、raw spacing、raw radius、raw 字體；沒有可以用 Library 元件卻手畫的 frame；跑一次未綁定值掃描。
6. **Icon 顏色**：逐狀態（selected／unselected／hover／disabled）與相鄰文字同 token。
7. **文字對齊**：混合字級的純文字列用 baseline。
8. **狀態齊全**：Default／Hover／Selected／Disabled／Loading／Error／Empty（適用者）；所有 hover 與 tooltips 已加入規格頁。
9. **截圖檢查**：重疊、截斷文字、對齊、按鈕是否缺失（2026-11-13 A10 曾漏 Cancel／Remove 按鈕）。
10. **文案**：英文為主、書面語 annotations、標點規則、Glossary。
11. **記錄**：寫入 change log；說明 Library 有沒有改動、是否需要 Publish。
12. **範圍**：只動 Alan 指定的範圍；沒有動不該動的檔案（Notion 沒有被寫入）。
13. **匯報**：開頭先講結果；列出假設與待 Alan 決定的事；不重複舊資訊。

---

## 14. 已被取代的舊規則（請勿再依舊文行事）

| 舊說法 | 取代者 | 備註 |
|---|---|---|
| Annotations 用中英雙語 | 只用繁體中文書面語，英文只用於術語（Alan 2026-11-05） | |
| 修改現有 Figma 前必先問（playbook §1） | 自動做、事後匯報（Alan 2026-10-09） | 仍須避免不可逆動作 |
| Library 改名、刪除、改值先列清單 | 明確值得做的改善可直接做並記錄（Alan 2026-10-09） | Publish 仍只有 Alan |
| Button 高 40（Notion） | Library 48／36／28 | Alan 2026-10-08 |
| UI 文案用自然粵語（早期記憶） | UI 英文為主（Alan 2026-10-09 稍後） | |
| 畫面必須 responsive（2026-10-09） | XRCC PC 與 Voyage 只做 1920x1080（2026-11-02）；web 交付物仍 responsive | |
| Gemini VPN 提示必備（2026-11-05） | 不得出現任何 VPN 提示（2026-11-13 審閱 v1） | |
| AI Provider flow 在 node 1333-8666 | 搬至 1354-2549（2026-11-05） | 注意：Alan 2026-11-13 仍以 1333-8666 作連線標準參考頁，見第 15 節待確認 |
| Remote Trigger：每個項目是一個手機格子、Number／Text／Toggle 設定 | 分組＝一個按鈕（2026-11-13 重要） | 見第 11 節 |
| Remote Trigger 視窗最高 800px | 固定 640 × 680（2026-11-13 稍後） | |
| Footnote 位置（Alan 先前說法） | 全部放在 Remote list 最底（2026-11-13，Alan 自己更正） | |
| Remote Trigger Notion 規格：12 欄、列高 48、breakpoint 640、七種 widget kind、128 上限 | 規格 2026-11-12 改寫：list-view editor、3 種輸入類型、固定方格 | 見 M：remote-trigger-notion-spec-facts |
| Stream Deck 風格（Remote Trigger P2） | P1 先複刻舊 UI；Stream Deck 版保留在 P2（`2014:14903`），為下一階段 | 每週總結不提 Stream Deck |
| Light／Dark 並排列出 | 只列 Dark | |
| Text Input 加 40 尺寸 | 只有 28／36／48 | |

---

## 15. 待確認事項（未經 Alan 確認，不可當作定案）

1. 參考頁 node `1333-8666` 與 AI Provider 流程 node `1354-2549` 的關係：Alan 11-05 說已把 AI Provider 搬到 1354-2549，11-13 卻以 1333-8666 為連線標準參考頁。**開工前請用 Figma 開啟兩個 node 核實**，若 1333-8666 才是標準頁，維持現有寫法；若不是，請告知 Alan 並更新本頁。
2. Remote Trigger prototype 視窗置中或跟 Figma A4 偏左：待 Alan 決定。
3. 每日備份 2026-11-13 推送：待 Alan 批准；需要他在該 thread 回覆「批准推送今日備份至 backup/project-memory 分支」。
4. 每週五工作總結的例行任務：需 Alan 確認。
5. AI Provider 開發確認清單（多 key、Custom 欄位、voice clone fallback、Profile 層、Connections 範圍）：待開發回覆。
6. 每週總結 routine 顯示時區為 Asia/Taipei 17:30（與香港同為 UTC+8，等同香港 17:30）。

---

## 16. 常用位置速查

| 項目 | 位置 |
|---|---|
| XRCC (PC) Library | Figma `De8nKqO81yciw4wH5xfpxA`（所有 Figma 檔案總表 node `17463-26139`） |
| Workbench（XRCC Claude Workbench） | Figma `ZBOB48n4eLsZABCTnhh5kk`；Components 頁 `85:1541` |
| 連線／Annotations 標準參考 | Workbench node `1333-8666`；說明頁 `2160:7338` |
| AI Provider flow | Workbench node `1354-2549`；Logo 節點 `1360-18744` |
| Remote Trigger P1／P2 | Workbench `1481:10758`／`2014:14903`；舊版 `1454:2615`；A4 母版 `1497:4620` |
| Runtime Debug | Workbench `268:1285`；Debug Panel 檔 `1fAQ8bgTaI2RWLYJRBb3Aw` |
| 舊 XRCC PC UI | Figma `7SMhpQ4IVhnlA6G6wfwAgO` |
| Voyage 360 UI／Library | `KoJQjDPM4sjwsoMYEvCDkw`／`DyjGKBd4Z24GgffN1bAnG6` |
| Change log | `/mnt/project-files/design-system/20261008-library-change-log.md` |
| Playbook | `/mnt/project-files/design-system/20261008-claude-ui-workflow-playbook.md` |
| Studio feel guideline | `/mnt/project-files/design-system/20261009-xrcc-studio-feel-guideline.md` |
| 專案知識庫與流程 | `/mnt/project-files/knowledge/claude/votanic-knowledge-base.md`、`votanic-workflows.md` |
| GitHub | `yauchai2/VOTANIC`（PR #6 AI Provider、#7 Remote Trigger、#8 Voyage Loading、#9 AI Provider 審閱） |
| Prototype artifact（Remote Trigger） | `https://claude.ai/artifact/Dmz56CF3MEQNn2saZUCaeM` |

---

## 17. 如何確保每個 thread 都會讀（建議）

單靠「記憶」不可靠，因為 Claude 不一定逐檔讀取。建議多層保險，由強到弱：

1. **寫入專案指示（Project instructions）一行必讀指令**（建議措辭：「任何工作開始前，先讀 `/mnt/project-files/design-system/20261113-READ-FIRST-execution-guide.md` 的第 1 節與相關章節，並在回覆中確認已讀。」）。專案指示每個 thread 都會載入，是最可靠的位置。**改專案指示需要 Alan 同意，Claude 不會自行修改。**
2. **記憶索引置頂一行**指向本頁（已加入 `MEMORY.md`）。
3. **每個 thread 的第一個動作**是重讀本頁第 1 節，並把「已讀本頁」寫進檢查表第一行，讓 Alan 一眼看到。
4. **Figma 內「Flow 標準」說明頁**（Alan 2026-11-13 已同意「全做」，已建立）：Workbench 頁面「⭐ Flow 標準 · READ FIRST」（node `2160:7338`，位於 Cover 之後），內容是第 5 節；做連線與 Annotations 前先開啟此頁，再到 `1333:8666` 量度。變數實名：主流程線 `border/interactive`，分支虛線 `border/default`，Label 文字 `text/subtle`、`text/primary`、`text/secondary`。（註：該頁範例線的 ARROW_LINES 端點在兩端都顯示；參考頁的實際箭頭方向以 `1333:8666` 為準。）
5. **專案指示已由協調者加入「READ FIRST — MANDATORY」一節**（指向本頁第 1、5、13 節）。
6. **每次完成後逐項核對第 13 節再匯報**，並在匯報末尾簡述「已自查項目」。
7. 當 Alan 說出新規則或更正時，Claude 須在**同一回合**更新本頁與對應記憶檔，不留到下次。

---

## 附：資料來源

專案記憶 49 個檔案（含 `imported/files/areas/votanic-xr.md`）；專案檔案 `design-system/`、`reports/`、`knowledge/`、`INDEX.md`；thread：Design new Remote Trigger UI/UX、整理 XRCC AI Provider annotations、按審閱意見修改 AI Provider UI、統一 Voyage 360 按鈕用 XRCC Library、XRCC AI provider、設定 GitHub 單人工作流程、每日 VOTANIC 記憶備份、每週五工作總結，及 Alan 2026-11-13 提供的截圖（連線與 Annotations 標準的對話）。其餘早期 thread 的規則已由記憶檔涵蓋，未逐字重讀。
