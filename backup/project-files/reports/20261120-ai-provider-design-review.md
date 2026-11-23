# XRCC AI Provider 設計審查（UI / UX / 排版 / Typography / 層級）

審查日期：2026-11-20　範圍：Workbench「XRCC AI Provider」流程全部畫板（約 100 張）及 prototype。
方法：程式化統計 4,433 個文字節點的 text style、字級、顏色綁定，再逐組檢視代表畫板（Models、Voices、Add provider、Choose who runs、Settings AI keys、Launcher Add key）。本報告只列發現與建議，尚未改動任何畫板。

## 一、整體評價

整體方向一致：頂部標題列、四個分頁、狀態徽章、橘色以外的紫色單一主色、軌道插畫與卡片節奏都有辨識度，Models 頁的「4 of 6 tasks are ready」加進度條是全流程最好的層級示範（先給結論，再給行動）。主要問題集中在三處：各分頁的頁首模式不一致、對話框內的字級層級偏平、以及極少數對比與未綁定樣式的技術債。

## 二、需要處理的問題（按影響排序）

### 高

1. **分頁頁首模式不一致。** Providers 是「標題＋數量＋Add provider」，Models 是結論式標題加進度條，Voices 沒有標題而直接放 provider 條，Sessions 是標題加說明。使用者切換分頁時找不到固定的「這頁是做什麼」位置。建議：每頁統一為「頁標題（16 Bold）＋一句說明（12）＋右側主要動作」，Models 的結論式標題可保留為說明句。
2. **對話框內導語與標題同級。** 對話框標題 16 Bold，導語（例如「Pick a provider and a saved key…」）同樣 16 Regular，欄位標籤反而是 14 Bold，造成「導語比欄位標籤大」的倒置。建議導語改為 14 Regular（body/md）並用次要文字色，欄位標籤維持 14 Bold，標題 16 Bold。
3. **Voices 頁在 640 高度下首屏只見到一排卡片。** 頁面頂部依序是 provider 條、Preview line、說明句、篩選 chip，合共約 340px 才到第一張卡。建議把說明句收進輸入框下方 4px 間距（目前間距過大，像獨立段落），並把 provider 條與 Preview line 併為一列。

### 中

4. **同一組 provider tile 的標籤樣式不同。** Add provider 對話框用「Pick a provider」（14 Bold，句首大寫），Choose who runs 對話框用「PROVIDER／MODEL」（11 全大寫 caption）。同一選擇器應使用同一標籤層級；建議兩處都用 14 Bold，或兩處都用 caption，並維持導語與標籤之間 12 至 16 的固定間距（目前 B2 只有 8）。
5. **次要文字對比偏低。** Voices 的「Tap a voice to hear this line…」、各處 helper 與 11px caption 使用 text/subtle，在深色底上接近對比下限；規則是重要文字不用 subtle。建議：helper 改用 text/secondary，只有純裝飾資訊（如「Optional」）保留 subtle。
6. **鎖定狀態卡片整張變暗。** Models 的「Text to image」標題與說明降到幾乎看不清，但它是使用者最需要行動的卡片（需輸入密碼）。建議只淡化插圖，標題保持正常對比，並讓「Enter your Poe key password」那列用強調色，與「Choose a provider」的行動色一致。
7. **選擇 provider 的兩種模式並存。** App 內用 100px 大 tile（含能力圖示），Launcher 的 Add key 用 28px chip。兩處語境不同可以接受，但 chip 內 logo 只有 12px，辨識度低；建議 chip 至少 16px logo。

### 低

8. **11px 文字共 281 處。** 全部為 caption（狀態、數量、能力圖示後的「+2」），符合樣式規範，但在 Models 與 Voices 的卡片底部集中出現，建議抽查「+2 / +3」是否可放大至 12。
9. **兩套 text style 並存。** body/* 與 heading/* 為新系統（約 3,900 處）；en/paragraph-*、en/heading-* 為舊系統（約 560 處，多在 Launcher 與 Settings 內嵌的元件）。不影響外觀，但日後改字級要改兩處；建議待 Library 整理時統一。
10. **29 個 Dialog 說明文字沒有綁定 text style**（16 Regular，位於共用 Dialog 元件的 Description）。應在 Library 元件內綁定 body/lg。這會在 Library 變更，需你 Publish。
11. **65 處文字填色未綁定變數**，需要逐一找出並綁定到現有 token（不新增 token）。

## 三、做得好的地方（建議保留）

- Models 頁的進度條、Ready 徽章與空卡虛線框，一眼看到「還差什麼」。
- 對話框一律「取消（Tertiary）＋單一主按鈕」，主按鈕文字帶具體對象（Use Gemini 3.1 Flash、Connect Gemini）。
- 密碼狀態用圖示加文字（Password set／No password），不依賴顏色。
- Settings 的 AI keys 列表資訊密度適中，列高與圖示尺寸一致，操作集中在右側。
- 文案已去除 VPN 提示與 Locked 字眼，語氣一致。

## 四、建議的處理順序

1. 統一四個分頁的頁首（問題 1），同步 prototype。
2. 對話框導語改 14 Regular、標籤間距統一（問題 2、4）。
3. Voices 頂部壓縮（問題 3）。
4. 對比與鎖定卡片（問題 5、6）。
5. Library 層面的樣式綁定（問題 9、10、11），完成後由你 Publish。

以上 1 至 4 項只涉及 AI Provider 的畫板與 prototype，我可以按 Figma 先行、prototype 跟隨的順序逐項處理；請告知是否全部進行，或指定先做哪幾項。
