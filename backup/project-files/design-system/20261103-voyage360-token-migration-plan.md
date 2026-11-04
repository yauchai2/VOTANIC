# Voyage 360 Token 整理方案（準備稿，尚未執行任何 Figma 改動）

日期：2026-11-03 · 檔案：KoJQjDPM4sjwsoMYEvCDkw · 前置報告：20261103-voyage360-tokens-review.md
原則：不新增 XRCC token；Voyage 專屬色留在 Voyage Library；先做「視覺零變化」的改綁，其餘由 Alan 決定。對照以 Dark 值為準。

## 1. 現況：來源共 9 個 collection
| 類別 | Collection | 建議 |
|---|---|---|
| Voyage 專屬 | UI colour（Dark/Light，本地＋遠端副本）、Full Picture marking（本地） | 保留並整理 |
| XRCC 正式 | XRCC Primitive／Theme／System | 主要來源 |
| 舊 kit（待淘汰） | Variable collection（Brand／Neutrals）、XRCC_Test、360（High light Font & icon）、Colors（🎨/…）、Colour/XR BG | 逐步改綁後移除引用 |

## 2. 舊 kit → XRCC（色值完全相同，視覺零變化）
| 舊變數 | 色值 | 改綁到 | 備註 |
|---|---|---|---|
| Neutrals/white、Brand/White | #ffffff | color/neutral/white（Primitive）；依角色可為 text/inverse、icon/inverse、surface/inverse | 先綁 Primitive，角色明確再升級為 Theme |
| Neutrals/grey 200 | #e5e5e5 | text/primary 或 icon/default（按用途） | 用量最大，需按文字／圖示分開 |
| Neutrals/grey 300 | #d3d3d3 | color/neutral/300 | |
| Neutrals/grey 400 | #c8c8c8 | text/secondary | |
| Neutrals/grey 500 | #818181 | text/placeholder（文字）／icon/secondary（圖示） | |
| Neutrals/grey 700 | #545454 | border/default | |
| Neutrals/grey 800 | #353535 | surface/elevated | |
| Neutrals/grey 900、Colour/XR BG | #161616 | surface/panel | |
| Brand/Ultra Violet | #5f4b8b | surface/accent-muted | |
| Brand/Turkish Sea | #195190 | notification/accent/blue | |
| Brand/ Citrus、book marked/yellow | #f9ac2f | notification/accent/citrus | |
| Colour/ Deep Purple | #392e52 | action/primary/background/default | |
| Green | #37954b | status/success/default | |
| High light Font & icon | #b89afa | text/accent（文字）／icon/accent（圖示） | |

## 3. 無對應（需 Alan 決定：保留於 Voyage Library，或吸附最近色）
Brand/Silver #a2a2a1、Brand/ Blue Moon #3686a0、Brand/ Blackenend Pearl #4d4b50、Light Purple_XR #c796e6、Neutrals/grey 100 #f6f6f6、Colors 的 🎨/* 五個（疑為貼上殘留）。建議：先查實際用量，用量少者吸附或刪除，用量大者搬入 Voyage Library 並改為語義名。

## 4. Voyage UI colour → XRCC 或保留
| Voyage 變數（Dark） | 判斷 | 建議 |
|---|---|---|
| Primary/Placeholder Stroke #545454 | 同值 | 改綁 border/default |
| Icon&Text/For inspector、Element/icon #e5e5e5 | 同值 | 改綁 icon/default（文字處用 text/primary） |
| Button/Text input-BG #161616 | 同值 | 改綁 surface/panel |
| Element/BG #1e1e21 | 同值 | 改綁 surface/canvas |
| Primary/Selected Border & Font #b89afa | 同值 | 改綁 text/accent、border/interactive |
| Icon&Text/Disable #818181 | 語義不同（XRCC disabled 為 #676767） | 值相同處用 icon/secondary；若真為停用狀態，需決定是否改 #676767 |
| Primary/List BG #1d1d1d | 與 canvas／panel 差 1–3 級 | 建議吸附 surface/panel（輕微變化，需確認） |
| Primary/Sur BG #0e0d0d | XRCC 最暗為 #161616 | Voyage 專屬（更深底色），保留；若要統一則改 surface/panel（變化明顯） |
| Primary/Band Colour #6429a0、Inspector/6429A0 | 重複，XRCC 無此色 | 合併為一個，保留 |
| Icon&Text/For Icon & Text、Button/icon、Inspector/D9B0FD #d9b0fd | 三個同值，XRCC 無此色 | 合併為一個，保留 |
| Inspector/Header-Default #241b38、Primary/List-Hovering #241b38 | 同值重複 | 合併，保留 |
| Button/BG #56317b、BG-Hovering #413152、BG-Selection #221d27、Band Colour-Delete #302c35、Header-Delete #1c1a21 | Voyage 專屬 | 保留 |
| Color/delete #c92e5f | 與 status/error（#a32929／#ff453a）不同 | Alan 決定：改用 XRCC status/error，或保留 |
| For Icon & Text- Hovering #585454 | 疑誤值 | 確認意圖 |
| Color/PexeisBrand、Pexels logo、Words、Color | 第三方品牌／標記用 | 保留，移入「marking」類 |

## 5. 命名建議（Voyage Library，僅在 Alan 同意後改）
小寫、斜線分層、語義式，與 XRCC 一致。例：
Primary/Band Colour → brand/band；Inspector/D9B0FD(no chage) → brand/accent-light；Inspector/Header- Default → inspector/header；Primary/List BG → list/background；Button/BG-Selection → button/background-selected；Color/delete → marking/delete。
改名會讓已綁定者自動跟隨（同一 variable），但仍要確認 Voyage Library 沒有被第三個檔案引用。

## 6. 分批執行計畫（每批做完截圖自查、記錄 change log）
- **批 0（準備）**：確認 Voyage Library 的引用檔案；在 XRCC 與 Voyage 檔案各 Update library；備份（複製檔案或建 branch）。
- **批 1（視覺零變化）**：第 2 節與第 4 節「同值」項目改綁；統一 Loading Enhancement 的 [V]／[R] 雙來源；#6429a0、#d9b0fd 硬編碼改綁 Voyage 變數。
- **批 2（需確認）**：第 3 節無對應項、List BG、Disable、Color/delete、疑誤值 Hovering、#fa5d6c／#e65869 等紅色硬編碼。
- **批 3（Library 清理）**：合併重複 variable、改名、移除 Light mode 與多餘 marking mode、移出舊 kit 引用。
- **批 4（文字）**：約 1,200 個主頁面未套 style 的文字，先確認 Voyage 字型（Inter 或 Roboto）再統一。
- 舊頁（🗑️ Old、wireframe、Research、Meeting）不處理。

## 7. 分工原則（建議寫入 Voyage Library 說明）
1. 灰階、文字、邊框、圓角、間距、字型、狀態色：一律用 XRCC。
2. Voyage 只保留「紫調品牌／Inspector／Button／標記」專屬色，名稱前綴統一，且不得複製 XRCC 同值色。
3. XRCC 更新後，Voyage 必須 Update library 並檢查；新增色先查 XRCC 是否已有。
4. 顏色一律綁變數，不使用純色硬編碼。

## 8. 風險
- 多數單純改綁無視覺變化，但按角色分開（文字／圖示）時要逐處檢查，否則會觸發過去「圖示顏色錯誤」問題。
- 變數量龐大（主頁約 64,000 節點），建議用腳本分頁批次，每批 ≤ 40 秒並抽樣截圖。
- Light mode 的 Voyage 值與 XRCC Light 不同，若 Voyage 實際會用 Light，需另行核對。

## 9. 待 Alan 決定
1. Sur BG（更深底色）保留還是統一為 XRCC 面板色。
2. Color/delete 是否改用 XRCC status/error。
3. 無對應舊 kit 色（第 3 節）取捨。
4. 是否同意改名（第 5 節）與移除 Light mode。
5. 是否授權先做批 1（零視覺變化）。
