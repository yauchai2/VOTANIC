# 會議分享稿：Figma Design System × AI（2026-10-14）

> 內容均來自 `design-system/` 與 `reports/` 的紀錄。標註 ⚠️ 者為未完全證實或須說明之處。建議時間：約 8 分鐘（講述 4 分鐘、示範 4 分鐘）。

---

## 開場（一句話）

**我們整理了 Figma Library，使 AI 看得懂每個 component 與 token 的用法，並能以現有零件組出初步的介面，由設計師審核。**

---

## 相關連結

- [All Figma files](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA?node-id=17463-26139)
- [XRCC (PC) Library](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA)
- [XRCC Claude Workbench](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk)
- [Runtime Debug Panel](https://www.figma.com/design/1fAQ8bgTaI2RWLYJRBb3Aw?node-id=4839-25184)

⚠️ Figma 連結需有檔案權限；Library 的改動須 Publish 後，其他檔案才看到。

---

## 一、解決什麼問題 → 怎麼做 → 結果

**問題 1：AI 做出來的畫面，常用錯顏色、字體與間距，不能直接使用**
→ 原因：Library 內有大量未綁定的數值、重複的 component、命名不清
→ 做法：先整理 Library（見下表）
→ 結果：AI 只能選用現有 token 與 component；沒有對應的 token 時，會停下來詢問，不自行新增

**問題 2：AI 不知道各 component 何時該用、怎樣用**
→ 做法：為 component 補寫說明（description），並建立 playbook（作業規則）與 component key 清單
→ 結果：AI 以 key 直接匯入 component，不重畫、不拆開（detach）

**問題 3：AI 的改動難以追查與把關**
→ 做法：每次改動記錄於 change log；Library 的 Publish 只由 Alan 執行
→ 結果：可追溯、可還原，風險由設計師控制

### Library 整理成果（精選）

| 項目 | 結果 |
|---|---|
| Token 綁定 | 舊 kit 的綁定重新綁到 XRCC 變數，約 12,000 處；Library 內 spacing / padding / radius 共 422 處 |
| 文字樣式 | Library 內 557 個文字連結至現有 text style |
| Typography | 由 23 個 style 精簡為 10 個；新增 display 級別（48 / 64 / 80），僅用於文件與封面，不用於實際產品介面 |
| Popup → Dialog（[Dialog](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA?node-id=18194-3805)） | 5 個舊 Popup 合併為一個 Dialog（4 種類型 × 3 種尺寸），並附使用說明頁 |
| [Tag](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA?node-id=17463-37912) | 32 個 variant 減至 24 個，改用 Slot 放內容 |
| 描邊 | 統一為 Inside，與網頁 CSS 的 border-box 一致 |
| Icon 顏色 | 規則：icon 須與相鄰文字使用同一 token；更換 icon 後須重新綁定 |
| 清單頁 | Library 新增 [Color](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA?node-id=18195-411) 與 [Typography](https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA?node-id=18202-2987) 清單頁（只列核心項目） |

---

## 二、AI 如何運作（簡述）

1. **讀取**：Library 的 component、variable、text style 與 description
2. **依規則**：按 playbook 的步驟與版面規則組裝畫面
3. **只用現有**：顏色、間距、字型均綁定現有 token
4. **留紀錄**：所有改動寫入 change log
5. **人把關**：AI 完成後由設計師審核與 Publish

---

## 三、實例示範：Runtime Debug · Manage debug items

> 位置：[Workbench 頁 268:1285](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk?node-id=268-1285)。以下按「問題 → 做法 → 結果」說明。

**問題：使用者在 Play 時加入了許多 debug 項目（Watch / Log），需要一處集中查看、篩選與批量移除，而且不能誤刪。**

→ **第一步：AI 先出初稿**
 依現有 Library 組出第一版：入口選單、項目列表、篩選、搜尋不到、空白、窄 / 闊版面，共 6 個畫面；並建立專用 component（開關、項目列、群組標題）。全部沿用現有 token，未新增任何 token。

→ **第二步：補齊流程與狀態**
 加入確認對話框（全部移除 / Watch / Log）、移除後的 Undo 提示、Play 進行中的提示。破壞性操作須先確認，並可還原。

→ **第三步：依同事意見調整結構**
 依 Toby 的意見，將獨立畫面併入 Debug Panel 的「Debug items」分頁，與 Log、Warnings 並列。AI 同步更新所有畫面。

→ **第四步：簡化與補充**
 刪去重複的說明文字與計數，畫面由 13 個合併為 10 個；補上複雜值（座標、顏色）的顯示、長文字截斷規則、窄版面自動換行（寬度約 360 至 600）。

→ **第五步：交付資料**
 加入 Log 與 Warnings 分頁、可點擊的 prototype、畫面註解、tooltip 清單，以及依流程排列的 user flow 圖。

→ **結果**
 一套完整、可審核的畫面，沿用共用 Library，功能專用的 component 另放於該檔的 Components 頁，不污染共用 Library。

⚠️ 畫面數量以 Figma 實際為準（紀錄中曾由 6 增至 14、再簡化為 10、其後加入 Log / Warnings）。

### 現場示範建議（約 4 分鐘）

1. 開啟 Debug items 主畫面，說明「這是 AI 以 Library 組出，並經我調整」
2. 切換 Log 與 Warnings 分頁（prototype）
3. 示範移除流程：⋯ 選單 → 確認 → Undo 提示
4. 縮窄畫面，示範列表自動換行
5. 開啟 change log 的一段，展示紀錄

備案：若現場操作不順，改用預先截圖。示範前請確認 Library 已 Publish、檔案已 Update library。

---

## 四、限制與風險

- AI 只做初步版本，仍須設計師審核（間距、層級、文案、細節狀態）
- Figma 的限制：
  - 以 instance-swap 更換 icon 後，顏色會重置，須重新綁定
  - Slot 或 variant 的改動，須 Publish 並在各檔 Update library；舊檔的部分覆寫可能遺失
  - 文件清單頁為靜態內容，token 變更後須重新產生
- 淺色模式極少使用，現階段文件僅涵蓋深色模式
- 部分現有介面屬舊設計，僅參考其中做得好的部分
- 尚未完成：部分 component 缺少 Focus / Hover 狀態，icon 命名未統一（⚠️ 若被問及，須如實回答）

---

## 五、對團隊的好處與需要配合的事項

**好處**
- 初稿更快完成，且自動符合現有 token 與 component
- 交付開發時，text style 與 token 名稱清楚
- 每項改動有紀錄，可追溯

**需要大家配合**
1. 命名與 description 規範：屬性採用 Title Case（State / Size / Type）；description 寫明何時使用、何時不用
2. Publish 流程：Library 改動 → Publish → 各檔 Update library
3. 回饋：發現 AI 選錯 component 或 token，請記下畫面與預期，以便補入規則
4. 功能專用的 component 放於該功能檔，通用者才放入 Library

---

## 六、總結

- **問題**：AI 做出的畫面常用錯 token 與 component，原因是 Library 本身不夠清楚。
- **做法**：先整理 Library（token 統一綁定、Typography 精簡、Popup 合併為 Dialog、Tag 改用 Slot），再補上 description 與作業規則。
- **結果**：AI 只使用現有 token 與 component，可組出初步的介面；每項改動有紀錄，Publish 由設計師負責。
- **示範**：Runtime Debug · Manage debug items 由初稿、補齊流程、調整結構到交付，均沿用同一套 Library。
- **提醒**：AI 提供的是初步版本，仍須設計師審核。
- **需要配合**：命名與 description 規範、Publish 流程、使用後的回饋。
