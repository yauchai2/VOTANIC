# Voyage 360 檔案 Token 結構檢視（只讀，未改動任何 Figma）

日期：2026-11-03 · 檔案：⭐202502-Voyage 360 UI-PC+VR（KoJQjDPM4sjwsoMYEvCDkw）· 掃描範圍：Asset Panel 頁（node 6224:17416，約 8,800 個節點）

## 1. 現況
檔案本身沒有任何本地 variable collection 或 paint style；所有 variable 均來自外部 Library，共見 55 個，分三個來源：

| 來源 | 內容 | 用量 |
|---|---|---|
| Voyage Library：`UI colour`（Dark Mode / Light Mode） | 18 個顏色，如 Primary/Sur BG、Primary/Band Colour、Element/icon、Icon&Text/*、Button/*、Inspector/* | 約 3,000 次 |
| Voyage Library：`Full Picture marking`（4 個 mode） | 1 個：Color/delete（#c92e5f，四個 mode 同值） | 22 次 |
| 舊 Brand／Neutrals 集（`Brand/White`、`Brand/ Citrus`、`Neutrals/grey 500` 等） | 舊 kit 變數，共約 600 次 | 見下 |
| XRCC (PC) Library | Theme（text/on-light/primary、surface/*、text/*、icon/*、notification/accent/*）、System（radius/*、spacing/*、typography/*）、Primitive（color/yellow/100） | 約 200 次 |

Text style 為本地 12 個 `Desktop/Heading|BodyText/…`（Inter 系），另有 Drop shadow 01 一個 effect style；959 個文字已套 style，69 個未套。

## 2. 命名規則（Voyage 專屬）
- 以「區域/用途」命名：`Primary/…`、`Inspector/…`、`Button/…`、`Icon&Text/…`、`Element/…`，首字大寫、含空格與 `&`。
- 兩個名稱直接寫色值：`Inspector/D9B0FD(no chage)`、`Inspector/6429A0(no chage)`（含錯字 chage）。
- XRCC 則為全小寫、語義式（`text/primary`、`surface/panel`）。兩邊風格不同，但因來自不同 Library，暫不衝突。

## 3. 與 XRCC 重複或可替換
| 項目 | Voyage 值（Dark） | XRCC 對應 | 判斷 |
|---|---|---|---|
| Primary/Sur BG | #0e0d0d | surface/canvas／panel（#161616） | 差一級，不完全相同，統一需 Alan 決定 |
| Button/Text input-BG | #161616 | surface/panel | 可直接替換 |
| Primary/Placeholder Stroke | #545454 | border/default | 可直接替換 |
| Icon&Text/For inspector、Element/icon | #e5e5e5 | icon/default、text/primary | 可直接替換（Light 值不同，見下） |
| Icon&Text/Disable | #818181 | icon/disabled 為 #676767；#818181 對應 icon/secondary | 語義不同，需確認用途 |
| Icon&Text/For Icon & Text、Button/icon | #d9b0fd | 無完全相同的 Theme token | Voyage 專屬 |
| Primary/Band Colour、Inspector/6429A0 | #6429a0 | 無 | Voyage 專屬（品牌紫），兩個 variable 同值 |
| Inspector/D9B0FD | #d9b0fd | 與 Icon&Text/For Icon & Text 同值 | 重複，可合併 |
| Inspector/Header-Default／Delete Mode、Band Colour-Delete Mode、Button/BG、BG-Selection | #241b38／#1c1a21／#302c35／#56317b／#221d27 | 無 | Voyage 專屬（紫調底色與刪除模式） |
| Color/delete | #c92e5f | status/error 系列（值需另核） | 可能重複，需核對 |
| Icon&Text/For Icon & Text- Hovering | #585454 | 無 | 紅調灰（非中性灰），疑為誤值 |
| `Brand/*`、`Neutrals/*` | 舊 kit | neutral/*、purple/* Primitive | 應逐步改綁 XRCC |

## 4. 硬編碼與未綁定
- 純色填色中，#ffffff 約 1,624 處、#000000 約 102 處、#222222 24、#6429a0 24、#d9d9d9 22；其中 #ffffff 與 #000000 多半為圖示或遮罩內部填色，需再分辨是否必要。
- #6429a0 有 24 處硬編碼，而 variable 已存在，應直接綁定。
- 其餘零星：#e5e5e5、#b1b1b1、#606060、#563b0e、#0d0d0d、#818181、#372d51 各 1–2 處。
- 69 個文字無 style；舊 `Desktop/*` text style 使用 Inter，與 XRCC 的 heading/body/caption 體系並存。

## 5. 依賴與風險
1. 目前同時依賴三套：Voyage Library、XRCC (PC) Library、舊 Brand/Neutrals 集。三套命名風格各異，但 Library key 不同，更新不會互相覆蓋。
2. 風險：XRCC 若改名或改值（例如曾做的 text/subtle 調整），Voyage 內的綁定會跟著變，Voyage 需「Update library」後才檢查，容易被忽略。
3. Voyage 的 `UI colour` 有 Light Mode，而 XRCC 只用 Dark；Voyage 頁面若實際只用 Dark，Light 值是無用維護成本（Alan 先前亦表示 Light 很少用）。
4. `Full Picture marking` 四個 mode 值全同，實質上不需要 mode。

## 6. 建議（UX 問題／影響／建議／優先度）
| # | 問題 | 影響 | 建議 | 優先度 |
|---|---|---|---|---|
| 1 | 三套 variable 來源並存（Voyage／XRCC／舊 Brand） | 改色時不知改哪裡，色值易分叉 | 以「XRCC 管通用、Voyage 管專屬」分工；舊 Brand/Neutrals 改綁 XRCC Primitive／Theme | 高 |
| 2 | 與 XRCC 同值的 Voyage token（見第 3 節「可直接替換」） | 重複維護 | 從 Voyage 檔案改綁 XRCC token，待確認後再從 Voyage Library 移除（建議保留一段過渡期） | 高 |
| 3 | 同值重複：Inspector/D9B0FD 與 Icon&Text/For Icon & Text；Inspector/6429A0 與 Primary/Band Colour | 概念混亂 | 合併為語義名稱各一個 | 中 |
| 4 | 名稱含色值、錯字、空格與 `&` | 與 XRCC 命名不一致，開發難對應 | 改為小寫語義名（例：`brand/band`、`inspector/header`、`icon/accent`）；改名前先確認 Voyage Library 是否亦被其他檔案引用 | 中 |
| 5 | Voyage 專屬紫調底色（Inspector 系列、Button/BG 等） | 屬產品差異，應保留 | 保留，集中放 Voyage Library，不放入 XRCC | 保留 |
| 6 | 硬編碼 #6429a0 等 | 日後改色會漏 | 改綁現有 variable，不新增 | 中 |
| 7 | Light Mode 與 Full Picture marking 多 mode | 無用維護 | 若確認不用，Voyage 只保留 Dark；marking 只保留單一值 | 低 |
| 8 | 69 個文字無 style；Inter 與 Roboto 並存 | 字體不一致 | 先確認 Voyage 是否刻意用 Inter；否則逐步改用 XRCC text style | 低 |
| 9 | Hovering #585454 疑為誤值 | hover 視覺偏紅 | 與 Alan 確認設計意圖 | 低 |

## 7. 建議整理步驟（待 Alan 決定，均不新增 XRCC token）
1. 先決定分工原則（建議：通用的灰階、文字、邊框、圓角、間距、字型用 XRCC；紫調品牌與 Inspector 專屬色留在 Voyage Library）。
2. 在 Voyage 檔案把「可直接替換」的綁定改到 XRCC token，並逐頁截圖檢查。
3. 清理 Voyage Library：合併重複、改語義名稱、移除 Light 與多餘 mode。
4. 舊 Brand/Neutrals 逐個對照 XRCC Primitive，數值相同才改綁；不同者列清單讓 Alan 決定。
5. 補綁硬編碼與無 style 文字。

## 8. 限制
- 只掃描了 Asset Panel 頁；其餘頁（如 💎360 UI、Loading Enhancement）未全面掃描，數字僅供參考。
- Color/delete 與 status/error 的色值未逐一核對；Theme 對照只比對 Dark 值。

---

# 附錄：全部 12 頁完整掃描（2026-11-03，只讀）

「[V]」＝來自 Voyage Library 的變數；「[R]」＝其他遠端變數（XRCC Library 或舊 Brand／Neutrals 集）。

| 頁面 | 節點數 | 文字有／無 style | 主要發現 |
|---|---|---|---|
| cover | 802 | 0／111 | 全用 Voyage 變數；111 個文字完全無 style |
| 💎360 UI (20251030) | 約 64,000 | 7,667／1,211 | 主力頁。Voyage 變數 + 舊 Brand／Neutrals 並存；XRCC token 只佔少數（radius、spacing、少量 surface／border） |
| Asset Panel | 8,785 | 959／69 | 見前文 |
| Voyage 360 Loading Enhancement | 2,011 | 317／87 | 同名變數同時有 [V] 與 [R] 兩份（如 Primary/Band Colour、Icon&Text/For inspector、Inspector/D9B0FD）；另用 XRCC 的 text/secondary、status/error/icon、surface/canvas |
| Research | 214 | 4／80 | 多用舊 Brand／Neutrals；#000000 硬編碼 65 處 |
| Design Guidelines | 約 26,000 | 3,359／516 | 以 Voyage 變數為主，混用 Neutrals；硬編碼 #ffffff 約 1,100、#000000 336 |
| Meeting Ideaboard | 4,901 | 525／460 | 另有一個名為 `Words` 的變數（357 次）；Voyage 變數為主 |
| 🗑️ Old User flow | 10,947 | 305／2,177 | 舊頁，Neutrals 為主 |
| 🗑️ Old UI/test | 17,317 | 1,797／466 | 舊頁，Voyage 變數 |
| 20250225-wireframe- test 3 | 27,538+（未掃完） | 693／2,524 | 舊頁，Neutrals 為主；#6429a0 硬編碼 643 |

## 新增發現
1. **Loading Enhancement 頁出現「雙來源」**：同一名稱的 Voyage 變數同時有本地版與遠端副本（[V] 與 [R]），代表曾複製貼上或換過 Library，更新時其中一份不會跟隨。建議優先統一為單一來源。
2. **💎360 UI 的 XRCC token 使用率很低**：主頁面幾乎沒有 text／surface／border 的 XRCC token，使用的是 Voyage 與舊 Brand／Neutrals。因此「所有 tokens 皆來自 XRCC」並不準確，實際只有 radius、spacing、字型與新頁（Loading Enhancement、Asset Panel）較多採用。
3. **其他 Voyage 專屬變數**：`Primary/List BG`、`Primary/List-Hovering`、`Button/BG-Hovering`、`Element/BG`、`Color/PexeisBrand`、`Icon&Text/Pexels logo`、`Words`、`High light Font & icon`、`Colour/ Deep Purple`、`Light Purple_XR`、`Font Colour-02`，其中 `Light Purple_XR`、`Colour/ Deep Purple` 命名帶 XR，來源待確認。
4. **硬編碼熱點**：主頁面 #ffffff 約 2,200、#d9d9d9 約 1,650、#000000 約 1,180、#6429a0 193、#d9b0fd 138、#0e0d0d 118；以及一批疑似狀態色 #22a4e5（75）、#fa5d6c（70）、#e65869（44），後兩者與 Color/delete（#c92e5f）接近，疑為未綁定的錯誤色。
5. **文字 style**：全檔仍有約 1,200（主頁）至數千（舊頁）文字無 style；cover 全無。

## 修訂後的優先順序
1. 統一 Loading Enhancement 的雙來源變數（高）。
2. 💎360 UI：以「值相同」的 Voyage／舊 Brand 變數改綁 XRCC token，分批截圖驗證（高）。
3. 主頁面 #6429a0、#d9b0fd、#0e0d0d 改綁既有 Voyage 變數；#fa5d6c／#e65869 與 Alan 確認是否改綁 Color/delete 或 XRCC status/error（中）。
4. 舊頁（Old、wireframe）不處理，建議確認後保持原狀或封存（低）。

限制：wireframe 頁未掃完；變數值對照仍只比較 Dark；未逐一核對各硬編碼是否屬圖示內部填色。
