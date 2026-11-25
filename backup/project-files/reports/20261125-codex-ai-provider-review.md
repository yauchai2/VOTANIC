# XRCC AI Provider：Codex 近期修改 UI/UX Review

# 更正（2026-11-25，開始重做前核對現行 Figma 後）

下列幾點取代本報告其後的對應內容：

1. **Figma 在 11-24 之後有被修改**（新增畫板 A3 副本 `3453:25017`、A4c `3447:24599` 等，編號大於 Claude 最後一次記錄）。誰修改我無法核實（Alan 手改或 Codex，皆有可能），change log 沒有記錄。所以「Figma 沒有跟隨」只對第 1 項成立。
2. 第 1 項（Add a provider 的 Gemini key）：現行 Figma A3 仍是「下拉選單＋Manage keys」，**沒有 Add key 按鈕**。維持 Revert。
3. 第 2 項（Custom 分頁）：現行 Figma A3c（`1715:6681`）正是「Saved provider 靜態名稱與網址＋鉛筆＋Add a custom provider 連結＋API key 區（No API key required＋Add key）」。prototype 與 Figma **一致**，由 Revert 改為 **Keep（跟隨 Figma）**。若 Alan 覺得這設計太重，應先改 Figma。
4. 第 4b 項（Name 位置）：現行 Figma A6（`1366:1195`）、A6b（`1472:3226`）的 Name 在最頂，More options 內是 Request format。prototype 與 Figma 一致，改為 **Keep（跟隨 Figma）**。
5. 第 3 項（Provider 卡展開）：Figma 只有收起狀態的卡，沒有「Key in use」展開卡的畫板，無法以 Figma 判斷，改為 **Needs Alan's decision**。
6. 第 6a 項：D3o（`3315:34913`）確認 Launcher Connections 為摘要列，維持 Keep。
7. 第 5、6b、7 項不變。

---


日期：2026-11-25。範圍：只限 XRCC AI Provider（未涉及 Remote Trigger 與 Voyage 360）。審閱方式：唯讀，沒有改動 Figma、prototype、repo，亦沒有推送任何內容。

已閱讀 READ-FIRST 執行說明（第 1、5、10、13 節）、change log 的 AI Provider 條目、`reports/20261119-codex-takeover-review.md`。

## 一、結論

1. Alan 圖中的改動確認存在，成因是 `prototypes/xrcc-ai-provider/index.html` 內新增的 `apiKeyField()`（commit `86e2e84`，及後 `a0170aa` 擴大套用）。它把 Add a provider、Provider 卡展開、Launcher 等多處的 key 下拉選單，統一改成「靜態文字＋Add key 按鈕」。
2. **Figma 沒有跟隨**：現行 Figma 的 Add a provider（A3d，節點 2060:10383）仍是「API key 下拉選單＋Manage keys」；Custom 表單（A6）仍是 Base URL／API key／Models／More options（Name、format、timeout）。所以這批改動是 prototype 單方面偏離 Figma，違反「Figma 先行」規則（Alan 2026-11-23）。
3. change log 沒有任何 11-24 之後 Codex 的條目，亦沒有說明這批改動的來源或理由。
4. 這批改動已發佈到線上 prototype：`votanic-proto.vercel.app/ai-provider/`（`claude/project-thread-350cjh` 的 `site/` 同步提交，最新 `82b35c4`，11-25 11:28 HKT），同時是 PR #11 的最新 head（`a0170aa`）。
5. 建議：Add a provider 對話框採用**左邊（原設計）**。其餘項目見第四節分類。

## 二、Codex 修改清單（有日期）

識別方法：commit 作者。11-24 08:01 UTC 起的 4 個 commit 作者為 "Alan YC Chan <yauchaichan@gmail.com>"，與 Claude（noreply）及 11-18/19 的 Codex（cyccyccycs@gmail.com）都不同；**這批屬 Codex 為推斷**，我無法核實誰按下 commit。最後一個 Claude commit 為 `840cf80`（11-24 07:48 UTC），其狀態與 Figma 一致，視為「最後良好狀態」。

| 日期（UTC） | Commit | 內容 | 只改 prototype？ |
|---|---|---|---|
| 11-24 08:01 | `565f5ef` | 簡化 Custom provider 表單（拿走三步驟標題，改為 Models 加 Test） | 是 |
| 11-24 10:18 | `2b8704c` | 「Refine custom provider and Connections flows」，約 800 行：Custom 儲存、Connections 子頁、Launcher Custom 檢查、模型失效處理、多個成功 toast | 是 |
| 11-25 03:08 | `86e2e84` | 「Unify provider key controls」：key 下拉變靜態文字＋Add key | 是 |
| 11-25 03:28 | `a0170aa` | 「Unify API key cards」：同樣做法擴及 Provider 卡、Launcher、Custom；新增 demo bar 下拉 | 是 |

四個 commit 只改 `index.html`，沒有動 Remote Trigger 或 Voyage 360 檔案。更早的 Codex 改動（11-18／19，Custom server、Settings Connections、voice picker 等）已在 `20261119-codex-takeover-review.md` 審過，其後 Claude 於 11-20 起按 Figma 逐項對齊，這份不再重複。

## 三、逐項 UX Review

### 1. Add a provider：API key 下拉變靜態文字＋Add key（Alan 圖中的改動）
- 截圖：`20261125-codex-ai-provider-review/1-add-provider-gemini-before-vs-after.png`（左＝原，右＝現）
- UX problem：下拉是 Alan 確認的「多個 key、同一時間只用一個」的切換方式。現版單 key 時變成不可操作的文字，多 key 才變下拉，同一位置的控件隨資料改變形態。「Manage keys」連結與「Add key」按鈕並排，兩個入口做近似的事；原下拉內已有「+ Add another key…」。間距也縮小（標籤與值之間變得擠迫），與 11-24 Alan 批准的間距規則（padding 24、group gap 20）不一致。
- Impact：互動成本上升、畫面比原本多一個按鈕、與 Figma 不一致，Alan 要求的「最少元件、只留必要輸入」被推翻。
- Recommendation：回復原設計（下拉＋Manage keys）。沒有 key 時沿用現有「No X keys here yet＋Add a key」空狀態即可。
- Priority：高。**分類：Revert。**

### 2. Add a provider：Custom 分頁
- 截圖：`2-add-provider-custom-before-vs-after.png`
- 改動：「Saved server」下拉＋鉛筆＋「+ Add a custom provider…」→「Saved provider」靜態名稱與網址、「Add a custom provider」連結、鉛筆，並多出 API key 區（「No API key required」＋Add key 按鈕）。
- UX problem：「No API key required」旁邊放「Add key」按鈕自相矛盾；對話框因而加高，Connect Custom 需要看更多內容才按；多個 saved provider 時才變下拉，同樣是控件形態不穩定。
- Impact：Custom 路徑是最少人用的路徑，卻變成最重的一頁。
- Recommendation：回復原設計；Custom 的 key 在 Custom 表單內貼上即可（Alan 11-23 已確認），不需要在此再放 Add key。
- Priority：高。**分類：Revert。**

### 3. Provider 卡展開：Key in use 下拉變靜態列
- 截圖：`3-provider-card-expanded-before-vs-after.png`
- 改動：「Key in use」下拉變成帶 key 圖示的列＋Add key；「Last test replied in 0.8 s · today 14:32」在此狀態變成「No connection test yet.」。
- UX problem：卡片內原本可直接切換使用中的 key，現在只能經 Manage keys，等於移除了「一個 provider 多個 key、一次只用一個」最直接的操作。測試結果被「尚未測試」取代，資訊倒退（推斷：為狀態重置所致，未逐行驗證成因）。
- Priority：高。**分類：Revert。**

### 4. Custom provider 表單
- 截圖：`4-custom-provider-form-before-vs-after.png`；Figma 最後狀態：`figma-last-custom-form.png`
- 4a（`565f5ef`）拿走「1 Connection／2 Models／3 Test」步驟標題，改為 Models 標題旁一個小 Test 按鈕：與 Figma A6（11-24「Alan: too complex」後的簡化）一致。**分類：Keep。**
- 4b（`2b8704c` 起）Name 欄位放回主畫面最頂；More options 只剩「Format, timeout」。Figma 的 More options 是「Name, format, timeout」，Alan 11-20 的決定是 Name 可選、自動命名「Custom provider」。UX problem：多一個非必要輸入、佔最顯眼位置。Recommendation：Name 回到 More options。Priority：中。**分類：Revert（僅 Name 位置）。**
- 4c 每個 model 的 Default／Retry／錯誤列、20 個上限、重複 ID 提示：與 Figma A6m／A6r／A6x 相符。**分類：Keep。**

### 5. Launcher 啟動檢查（Gate）：Custom provider 列
- 截圖：`5-launcher-gate-custom-before-vs-after.png`
- 改動：「Studio LLM · Custom provider · Server endpoint 輸入框」→「Local LLM · Text chat · llama-3.3-70b＋網址文字」；新增「Choose another model」、選擇 key 的對話框；範例資料由 Studio LLM／192.168.1.20 改為 Local LLM／localhost。
- 評語：「模型已不在伺服器」處理與 Figma D4c／D4cm 方向相同，值得保留；但範例資料、列結構與 Figma 不同，未逐板核對。
- Priority：中。**分類：Needs Alan's decision**（先對照 Figma D4c／D4cm，再決定 prototype 或 Figma 跟隨哪一邊）。

### 6. Launcher／Settings Connections：改為摘要列＋子頁
- 截圖：`6-launcher-connections-before-vs-after.png`
- 現版 Launcher Connections 是摘要列（AI keys／Speech commands），開啟後才見 key 清單。這與 Figma D3o／D3w 及 Alan 2026-11-13 決定（Connections 是摘要列，每個連線開自己的面板）一致。**分類：Keep。**
- 配套新增 5 個成功 toast（Key saved／renamed／removed、Password saved、Provider saved）。Remote Trigger 的「沒有成功 toast」是該功能的規則，**不可直接套用到 AI Provider**（功能分開）；但 AI Provider 的 Figma 沒有這些 toast，亦沒有規格列。Priority：低。**分類：Needs Alan's decision。**

### 7. Demo bar 新增「No API key required」下拉
- 截圖中右邊審閱列多了一個原生下拉。這是 QA 用的場景切換，沒有人要求，也沒有放入 Figma；審閱列變雜亂，原生下拉樣式與整體不一致。Priority：低。**分類：Revert（或收起到 Reset 旁）。**

### 8. 流程與交付
- UX／流程問題：Figma 沒有更新、change log 沒有記錄、未經 Alan 檢視就發佈到線上 prototype（Alan 2026-11-24 規定每次推送需其批准）。Impact：Alan 審閱的 Figma 與他打開的 prototype 不一致，無法判斷哪個是準的。Recommendation：之後任何 AI 改 prototype 前先改 Figma；本次以 Figma 為準。Priority：高。

## 四、分類總表

| # | 項目 | 分類 |
|---|---|---|
| 1 | Add a provider：key 靜態文字＋Add key | **Revert** |
| 2 | Add a provider：Custom 分頁 Saved provider＋No API key＋Add key | **Revert** |
| 3 | Provider 卡展開：Key in use 靜態列、測試結果被覆蓋 | **Revert** |
| 4a | Custom 表單去步驟標題、Models＋Test | Keep |
| 4b | Name 放回主畫面最頂 | **Revert** |
| 4c | Model 列 Default／Retry／重複 ID／上限 | Keep |
| 5 | Launcher Gate Custom 列與模型失效流程 | Needs Alan's decision |
| 6a | Connections 摘要列＋子頁 | Keep |
| 6b | 新增成功 toast | Needs Alan's decision |
| 7 | Demo bar 新下拉 | **Revert** |

## 五、Add a provider 建議採用哪一個

建議：**左邊（原設計）**。理由：(1) 與 Figma 和 Alan 確認過的規則一致；(2) 只有一個控件、一個管理入口，互動成本最低；(3) 單 key 與多 key 外觀一致，不會因資料變形；(4) 「Add another key」已在下拉內，不需要第三個入口。取捨：單 key 用戶也要多按一下才見到 key 名，但顯示的預設值已是使用中的 key，可接受。

## 六、建議的處理方式（供 Alan 決定，我未動手）

- 方案 A（建議）：以 `840cf80`（最後一個與 Figma 一致的 Claude 版本）為基礎，只保留第 4a、4c、6a 的改動，回復第 1、2、3、4b、7 項。Vercel 線上版本需重新發佈（需 Alan 批准）。
- 方案 B：整個 prototype 回到 `840cf80`，再由 Figma 逐項決定是否重做 Launcher 與 toast。較安全但要重做 5、6a。
- 無論哪個方案，另請 Alan 決定第 5、6b 項，以及是否在 PR #11 加註來源。

## 七、未能核實

- Figma 版本歷史沒有工具可查，所以「Codex 沒有改 Figma」只由對照推斷：A3d（2060:10383）與 A6 的截圖仍等於 11-24 Claude 的版本。
- 11-24 之後 Alan 與其他 thread 的對話沒有放在專案檔案（匯出只到 11-17），所以無法確認這批改動中有沒有哪項是 Alan 另行要求；第 4a、6a 與 Figma 一致，故判為 Keep。
- 沒有逐一點過全部 29 塊 Figma 畫板，也沒有跑 smoke test；截圖由本機以 Chromium 載入各 commit 的 `index.html` 取得（Configured project 狀態）。

## 八、第 13 節自查

範圍（只限 AI Provider、唯讀、未動 Notion）：通過。Token／元件：不適用（無 Figma 改動）。記錄：change log 缺 Codex 條目已列出。文案：英文 UI 文字原樣引用。匯報格式：先講結論，假設已標明（作者識別、Figma 未改為推斷）。Figma、prototype、annotation 沒有被改動，因此傳播、連結、Annotations 與截圖檢查項不適用。

附圖目錄：`/mnt/project-files/reports/20261125-codex-ai-provider-review/`（六組 before／after 對比圖，及 Figma 現行 Add a provider、Custom 表單截圖）。
