# XRCC 4.2 Data Analytics & Connections — UX 方案(試做)

日期:2026-10-09 · 狀態:草稿,待 Alan 檢視
Figma:XRCC Claude Workbench(`ZBOB48n4eLsZABCTnhh5kk`)→ 新頁 `4.2 Data Analytics & Connections`(畫面清單見 §5)

## 0. 讀咗咩、點分標籤
Notion(只讀,冇改任何內容):Hub、02 Users/Jobs、03 Thesis/Boundaries、04 Domain Model、05 Journeys、06 Capability Map、07 Decisions(D-01 至 D-52)、10 Connections、15 Features Team Briefing。**未細讀**:08 Senior Dev Brief、12/13 Wayfinding、Track A/C/D 報告同 Joint Grilling Pack(未影響 UI 層決定;有需要再補)。

**Notion 狀態**:Stage 1 產品定義已確認,Stage 2 工程探索中,**唔係 implementation spec**,頁面自己都話 mock UI「only illustrates intent」。所以本方案嘅標籤:
- **[Confirmed]** Notion 已接受(附 D-xx / Journey 編號)
- **[Rec]** 合理 UX 建議(Notion 冇寫,係我嘅設計判斷)
- **[Assume]** 需驗證嘅假設(多數係工程可行性未定,例如 implicit attempt start、重連續接)

## 1. 設計重點(由 Notion 推出嚟嘅 UX 原則)
1. **誠實嘅狀態語言**[Confirmed 03 #13, D-16]:記錄狀態只有五種——Accepted · Saved locally · Queued · Delivered · Failed。UI 永遠唔寫「已儲存」除非真係 persisted;外部目的地冇確認就唔寫 Delivered。
2. **唔推斷嘅 Browser**[Confirmed D-22]:Start 冇 Finish 只顯示 "No Finish recorded",唔寫 abandoned/failed/passed。冇 score 欄、冇 pass/fail 篩選(D-27 scope ceiling)。
3. **唔靜默**[Confirmed]:export 範圍只由明確揀選決定,filter 永不代表 export 範圍(D-30)。外部目的地要明講失去咩(D-36)。
4. **漸進披露**:普通創作者只見「Data Tools · Protected」預設路徑;External 係進階選擇。
5. **兩個模組、一個旅程**[Confirmed D-46]:Data Analytics 擁有 route/語意/mapping;Connections 擁有 profile/credential/test/health;兩邊用 summary + "Manage" 連結互通,**唔重複 editor**。

## 2. 資訊架構(Surface map)
| Surface | 在哪裡 | Owner | 內容 |
|---|---|---|---|
| **Data Analytics setup** | XRCC Editor(項目設定內) | DA | Destination、Protection、Participant policy、Readiness |
| **Capture inventory** | Editor | DA | 全部 capture 點(preset / Behaviour)集中檢視 + 驗證 |
| **Capture Data 定義** | Editor(Behaviour node 側欄) | DA | Action、Object/target、flat metadata |
| **Import dataset** | Editor | DA | 驗證 → 預覽 → mapping(CSV/JSON/Excel) |
| **Operator panel** | 運行時(PC / Launcher) | DA | Preflight、capture health、狀態 |
| **Data Browser**(獨立 app) | Launcher 啟動 | DA | Project 選擇 → Attempt list → Attempt trail → Export / Delete |
| **Launcher › Connections** | Launcher | Conn | Access Vault、profiles、test、health |
| **Project Connections** | Editor | Conn | 項目需求 inventory、binding、readiness、usages |
| **Launcher 最近項目卡** | Launcher | Launcher | Form / Protection / Connections 三個獨立維度 |

## 3. 主要流程(畫面對應)
**F1 Creator 設定 analytics**(Journey 1, 7):Enable → Destination(預設 Data Tools)→ Protection 必揀(Protected 推薦,D-42)→ Participant policy → Readiness 檢查 → 加 capture → Inventory 驗證 → Test attempt。
**F2 揀外部目的地**(Journey 7, D-36):揀 External → 警告 dialog(失去 history/Browser/export)→ 交 Connections 揀 profile → 返 DA 做 mapping → 手動 Test → 顯示狀態。
**F3 Operator 運行**(Journey 2):Preflight(Data Tools 就緒?capture token?participant?)→ Start → capture health 常駐 → 異常時狀態變化,**唔打斷 XR**。
**F4 Trainer 驗證**(Journey 4):Launcher "Browse Data" → Attempt list(最新優先)→ 開 Attempt 睇時間線 → 明確揀 attempt → Export CSV/JSON/Excel。
**F5 Creator 用返資料**(Journey 5):Import → 驗證(解釋問題)→ 預覽 → mapping 到 variable。
**F6 Connections 設定**(Journey 6):Vault unlock → 新增 profile → Test → 項目要求 binding → 未解決時 skip 不阻擋。

## 4. 畫面清單與狀態(Figma 對應)
| ID | 畫面 | 必畫狀態 | 主要標籤 |
|---|---|---|---|
| DA-1 | Data Analytics setup | Default(Data Tools+Protected)· External 已揀 · 未揀 Protection(阻擋 Ready) | Confirmed D-36/D-42 |
| DA-2 | 揀 External 警告 dialog | — | Confirmed D-36 |
| DA-3 | Capture inventory | 有警告列(缺名、無 object、高頻)· 空 | Confirmed Journey 1;高頻門檻 Assume |
| DA-4 | Capture Data 定義 | 填寫中 · 驗證錯誤 | Confirmed D-13 |
| DA-5 | Operator preflight + health | Healthy · Degraded(queued)· Capture 未授權 · Local store unavailable | Confirmed D-16/D-40/D-41 |
| DB-1 | Data Browser 項目選擇 | 有項目 · Connection-only 項目不出現 | Confirmed D-25 |
| DB-2 | Attempt list | 預設 · 揀咗 attempts(export bar)· 空 · 篩選冇結果 | Confirmed D-26/27/30 |
| DB-3 | Attempt trail | 展開 event · No Finish · Unattributed | Confirmed Journey 4 |
| DB-4 | Export / Delete dialog | Export 格式 · Delete 二次確認 | Confirmed D-30/D-44 |
| IM-1 | Import dataset | 驗證失敗 · 通過+預覽+mapping | Confirmed D-33 |
| CN-1 | Launcher Connections | Vault locked · unlocked + profile list | Confirmed 10 |
| CN-2 | AI profile 詳細 | Model 列表、Test 結果、自訂 model 標 user-declared | Confirmed 10 |
| CN-3 | Project Connections | Configured · Unresolved · usages | Confirmed 10 |
| CN-4 | Launcher 項目卡 | 各種組合 | Confirmed 10 |
| CN-5 | Google Sheets 目的地 test | 通過 · 結構不符 | Preferred candidate,**未承諾**(PoC) |

## 5. 設計決定(Rec)
- **Destination 用兩張大選項卡**,Data Tools 預設已揀並標 "Recommended";External 寫明代價。唔用 dropdown,因為呢個係會改變成個 data 命運嘅決定。
- **Protection 必揀,無預設**:兩個 radio 卡,Protected 標 recommended 但**唔預先揀**,Readiness 顯示 "Choose a protection mode" 直至揀咗(D-42「唔靜默揀」)。
- **Readiness 清單**取代「儲存」:每項 Ready / Needs attention,點擊跳去對應區;全綠先有 "Run a test attempt" 主按鈕。
- **Attempt list 用 table**(呢度係真正嘅操作型資料,有 checkbox / 多欄對比);其他 visual 內容唔用 table。
- **記錄狀態用 icon+文字 chip**,唔單靠顏色。紅色只用於 Failed;琥珀用於 Queued/Degraded。
- **Operator health** 係細而常駐嘅條,點開先見詳情;唔做 full modal(唔打擾運行)。
- **Export dialog 重申範圍**:"Exporting 3 selected attempts (filters don't change this)"。
- **人味文案**:用真實場景(Equipment inspection、Valve lockout drill),錯誤講後果+下一步。

## 6. Edge cases(畫面或標註已涵蓋 ✓ / 只標註 ○)
✓ Data Tools 未安裝 → preflight 提示 Install(Launcher) · ✓ Capture token 缺 → 運行繼續但 Capture 停用+顯著警告,無記錄保留 · ✓ Start 無 Finish · ✓ 未識別 participant(問題狀態,≠ Anonymous)· ✓ Local store 運行中失敗 → queued/degraded · ✓ 外部測試結構不符 → 阻擋 delivery · ✓ Locked vault · ○ 超長 participant ID/專案名 → 截斷+tooltip · ○ 0 attempts · ○ 99+ events · ○ Excel 過大導入失敗 · ○ 搜尋重複 ID 跨項目唔合併。

## 7. 需驗證/未決(唔在 UI 度假裝已決定)
1. Implicit attempt start 嘅 fallback 顯示(D-21 provisional)→ DB-3 只用 "Started implicitly" chip 示意 [Assume]。
2. 多人重連續接 / 新 attempt(D-23)→ 暫不畫專屬 UI。
3. 高頻 capture 警告門檻(D-45 待 PoC)→ DA-3 警告文字用「Capture volume looks high」,不寫數字 [Assume]。
4. Google Sheets 係否最終 provider(PoC 未做)→ CN-5 標 "Candidate"。
5. Token/Access package 管理(owner key、expiry)細節 UI → 本輪只畫入口同 locked/unlocked,完整 token 管理畫面留下一輪。
6. Remote Control editor:已有 QR 入口試做(`20261008-4.2-remote-control-qr-handoff.md`),本輪 Project Connections 只放其 summary 行。
7. Leaderboard、Periodic sampling:Notion 列為 conditional/低優先,**本輪不畫**。
8. Windows 防火牆 UX、HMD 連接:Notion 未決,不畫。

## 8. 技術/交付規則
- 只用 XRCC (PC) Library 現有 component / token / text style;**冇新增 token**。Feature 專屬 component 放 Workbench `Components` 頁(見 Figma log)。
- 全 Auto Layout;1440 默認,核對 1280、1024 同 1920。
- UI 文案全英文。

## 9. Figma 對應(Workbench `ZBOB48n4eLsZABCTnhh5kk`,頁 `4.2 Data Analytics & Connections`)
| ID | Node | ID | Node |
|---|---|---|---|
| DA-1a/b/c | 175:22 · 175:313 · 175:700 | DB-1 | 191:21 |
| DA-2 | 182:463 | DB-2a / b / c | 191:86 · 191:218 · 191:363 |
| DA-3 | 182:640 | DB-3 | 191:388 |
| DA-4a / b | 182:914 · 182:1136 | DB-4 | 191:464 |
| DA-5 | 183:674 | CN-1a / b | 196:144 · 196:164 |
| IM-1a / b | 183:851 · 183:926 | CN-2 · CN-3 | 196:236 · 196:341 |
| | | CN-4 · CN-5 | 196:420 · 196:487 |

Components 頁:Record State Chip 168:1096、Choice Card 168:1147。
Responsive:所有畫面 1440 默認;DB-2b / CN-2 / CN-3 已驗 1024,DB-2b 已驗 1920。
未畫:DA-5 嘅 Local store unavailable 同 Capture 未授權用同一 panel 示意;CN-4 縮圖係佔位;token 管理 UI、Leaderboard、Periodic sampling 如 §7。

## 10. 中文版(zh-hant)切換
Workbench 本地變數集 `4.2 Copy`(STRING,mode:Base / zh-hant,376 條),4.2 頁 22 個畫面所有文字已綁定。切換:揀畫面 → Appearance/Variables → 將 `4.2 Copy` 同 `XRCC System` 都設做 zh-hant(後者換 Noto Sans TC 字體)。Library 同 token 冇改。對照表:`20261009-copy-zh-tw.md`。
