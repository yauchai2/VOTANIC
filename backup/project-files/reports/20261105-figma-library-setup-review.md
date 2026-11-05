# Figma Library 設定全面檢視（2026-11-05，只讀，未改動任何 Figma）

範圍：📖 XRCC (PC) Library（De8nKqO81yciw4wH5xfpxA）、📖 Voyage 360 Library（DyjGKBd4Z24GgffN1bAnG6）、⭐202502-Voyage 360 UI-PC+VR（KoJQjDPM4sjwsoMYEvCDkw）的 Library 連結。只看 Dark。2026-10-09 Library review 已列過的項目（property 命名、缺少狀態、icon 命名等）不再重複，只列仍存在或新發現的重點。另一個 thread 正在處理的 Voyage 顏色改綁、「?」失效綁定與刪除 Voyage token，本文不涉及。

## 一、現況摘要

| 檔案 | Variables | Styles | 組件 |
|---|---|---|---|
| XRCC (PC) Library | Primitive 120（**未發布**，scope 全空）、Theme 117（已發布）、System 77（已發布，Base／zh-hant） | 13 個 text style（全部綁 variable）、10 個 shadow effect style | 約 50 個 set、354 個 icon |
| Voyage 360 Library | Voyage Theme 12（Dark only，命名與描述完整） | 12 個 Desktop/*（Inter）、Drop shadow 01 | 無 |
| Voyage UI-PC+VR | 無本地 collection | 本地 12 個 Desktop/*、Drop shadow 01 | Voyage 組件全在此檔（此檔本身亦以 Library 形式發布） |

Asset Panel 頁抽樣（9,311 個節點）的綁定來源：XRCC System 4,300、XRCC Theme 2,926、Voyage Theme 1,682、Votanic Brand Design Guideline 123、XRCC Primitive 2。文字樣式：XRCC 1,022、PC UI 檔的 PC/* 24。

## 二、問題與建議

| # | 問題 | 影響 | 建議 | 優先度 |
|---|---|---|---|---|
| 1 | **XRCC Primitive 集合未發布**，且 120 個變數 scope 全空。Voyage 檔仍有 2 處綁定 Primitive（舊時發布遺留）。 | 其他檔案無法綁定 color/neutral/black、neutral/250、purple/500 等；先前「可綁 Primitive」的推論不成立。該 2 處綁定日後可能失效。 | 維持 Primitive 不發布（屬正確做法）。Voyage 的 #000000、#d9d9d9 改用現有 Theme token，或維持硬編碼；不新增 token。 | 高 |
| 2 | **XRCC Library 訂閱了 5 個產品檔**作為 Library（XRCC Launcher、20251125_XRCC4.0_PC_UI、XRCC4.0 - Assets Panel、XRCC Setting Panel、XRCC 3.1.2 In-app Licensing）。 | 共用 Library 反向依賴產品檔，容易形成循環引用，產品檔一改名或刪除，Library 內容便可能失效。 | 清查 Library 內實際引用（見第 3 項），改用本地組件後移除這些訂閱。 | 高 |
| 3 | Library 組件內有**外部遠端引用**：Pagination 內 30 個 `icon/activity`、Alert 內 22 個 `link`、Breadcrumbs 內 icon、button-icon 均來自其他檔；Breadcrumbs、Pagination、Internal、Popover、Text field、Dropdown、Menu item 約 60 處綁定舊的遠端「Theme」集合（例如 `Unit/x1-5`）；Internal 頁有 2 處舊 text style `en/paragraph-2`。 | 消費檔使用這些組件時會帶入舊 Library，顏色與間距不跟隨 XRCC token。 | 改為本地 icon、link 與 XRCC Theme／System token（值相同者直接改綁）。 | 高 |
| 4 | Dialog 頁放了一個 `Debug Confirm Dialog`（Runtime Debug 專屬組件，來自其他檔）的 instance。 | 功能專屬內容出現在共用 Library，並形成 Library 與工作檔互相依賴。 | 移到 Runtime Debug 檔的 Components 頁，Library 只保留通用 Dialog 範例。 | 中 |
| 5 | 文件用組件未設為私有：Internal 頁的 `Design Symbols Header`、`overlay`、`dismissible`、`meta`、`DIY/Table row`、`image 31`、`Notion link`，以及 `All Figma files`（仍是 COMPONENT）都會被發布。 | 消費檔的 Assets 面板出現無用項目，容易誤用。 | 名稱加 `.` 前綴（或轉為 frame），不發布。 | 中 |
| 6 | Logo 頁 14 個組件全無描述，且有預設名稱：`Artboard 19 copy 3 2／3`、`Group 4106`、`VOTANIC_Logo 1`、`sketchfab-logo-text-white 1／2`，3 個 set 仍用 `Property 1`。 | 搜尋困難，重複的白色 logo 不知應用哪個。 | 統一命名為 `logo/<品牌>/<版本>`，合併重複，補一句描述。 | 中 |
| 7 | System 有 `size/control/height/24`、`32`、`40`。 | 與 Alan 定下的 28／36／48 標準衝突，容易被誤用。 | 確認無使用後設為 hiddenFromPublishing（不刪除）。 | 中 |
| 8 | 10 個 shadow effect style 沒有綁定 Theme 內的 `elevation/*` 顏色 token。 | 陰影顏色與 token 脫節，elevation token 形同虛設。 | 將 shadow/dark/* 的顏色綁到 `elevation/dark/*`；或確認 elevation token 不用後隱藏。 | 低 |
| 9 | 組件命名有三種風格：`Button / Dark / *`、`Form / Dark / *`；小寫 kebab（`alert`、`menu-item`、`divider`）；Title Case（`Dialog`、`Switch`、`Tag`）。另有 `New Tooltips`、Radio set 仍叫 `Form`、`Home / Dark / Pattern 05` 放在 File upload 頁。 | Assets 面板分組零散，dev 難以對應。 | 只先處理三個明顯問題：Radio 改名 `Form / Dark / Radio`、`New Tooltips` 改 `Tooltip`、Pattern 05 移到正確頁。整體命名待日後與 dev 一併整理。 | 低 |
| 10 | Theme 有 16 個直接寫值、未引用 Primitive 的 token（avatar/* 11、status 背景 3、faded 2）；`surface/accent-muted` scope 為 ALL_FILLS（含文字）。 | 改 Primitive 時這些不會跟隨；surface 出現在文字顏色選單。 | 維持現狀即可；如日後調色，再把 avatar 改為引用 Primitive。scope 可收窄為 FRAME_FILL、SHAPE_FILL。 | 低 |
| 11 | System 同時有 `font/family/en`、`font/family/zh-hant` 與 `typography/font-family`（實際使用的是後者）。 | 選單出現三個字型 token，易混淆。 | 前兩個設為 hiddenFromPublishing。 | 低 |
| 12 | **Voyage 360 Library 仍有 12 個 Desktop/*（Inter）text style 與 Drop shadow 01**，UI 檔亦有一模一樣的本地副本。批 5 後 Asset Panel 已無文字使用 Desktop/*。 | 兩份重複且可能已無人使用，日後易被誤用。 | 全檔確認無使用後，從 Voyage Library 移除；UI 檔本地副本一併處理。Drop shadow 01（UI 檔 29 處使用）保留一份即可。 | 中 |
| 13 | **Voyage 組件放在 UI 檔，而非 Voyage 360 Library**；UI 檔本身也以 Library 發布，且訂閱了自己。 | 工作檔同時是 Library，改畫面時容易誤改組件；其他檔要用 Voyage 組件必須訂閱整個 UI 檔。 | 日後重整 Voyage Library 時，把共用組件（DropDownList、header、Scene Card、Add New Scene 等）搬入 Voyage 360 Library，UI 檔回歸工作檔。 | 中 |
| 14 | Voyage UI 檔訂閱 6 個 Library，包括舊的 Votanic Brand Design Guideline（Asset Panel 仍有 123 處綁定）、20251125_XRCC4.0_PC_UI（24 個文字用其 PC/* style）、XRCC Setting Panel。 | 依賴過多來源，命名風格不一，更新時容易遺漏。 | 目標只保留 XRCC (PC) Library 與 Voyage 360 Library；PC/* 文字改用 XRCC style，舊 Brand 綁定由進行中的改綁工作一併處理。 | 中 |

## 三、建議次序

1. 先決定第 1 項（Primitive 不發布）並通知改綁 thread，避免它嘗試綁定 Primitive。
2. 處理第 2、3 項，令 XRCC Library 不再依賴產品檔，然後 Publish。
3. 第 4 至 7 項屬小幅整理，可一次做完再 Publish。
4. Voyage 第 12 至 14 項，待 Alan 重整 Voyage Library 時一併處理。
5. 第 8 至 11 項低優先，有空再做。

## 四、限制

- 遠端引用與文字樣式來源只抽樣了 Voyage 的 Asset Panel 頁；XRCC Library 則掃描了全部頁面。
- 無法透過 API 查看 Library 是否有未發布的草稿，以及各組件在消費檔的使用量（需在 Figma 的 Library analytics 查看）。
