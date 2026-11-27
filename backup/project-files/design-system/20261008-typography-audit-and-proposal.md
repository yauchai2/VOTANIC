# XRCC (PC) Library — Typography 審計與精簡方案

日期:2026-10-08 · 狀態:**只讀審計,未改動任何嘢**。改名/合併/刪除/改值要 Alan 確認。

## 1. 現況(Library `De8nKqO81yciw4wH5xfpxA`)

- 實際 **23 個 text style**:`en/*` 12 個、`zh-hant/*` 11 個(zh-hant 冇 tooltip)。截圖嘅 60/55 唔係 style 數量。
- 每個 style 綁自己專屬 4 個 variable(size/weight/family/line-height),即約 92 個 typography variable,值大量重複。
- Library 內 component 唔用 text style(Alert 93/93、Table 30/30 文字冇 style,直接綁 variable)。**style 嘅使用者只有 PC UI 檔**。

| 現名 | 字體 | 大小/行高 | 字重 | PC UI 檔使用量 |
|---|---|---|---|---|
| en/heading-1 | Roboto | 32/40 | Bold | 82 |
| en/heading-2 | Roboto | 24/32 | Bold | 54 |
| en/heading-3 | Roboto | 20/28 | Bold | 232 |
| en/heading-4 | Roboto | 18/24 | Bold | 131 |
| en/heading-5 | Roboto | 16/24 | Bold | 404 |
| en/paragraph-1 | Roboto | 16/24 | Regular | 2,839 |
| en/paragraph-1-bold | Roboto | 16/24 | Bold | 1,640 |
| en/paragraph-2 | Roboto | 14/20 | Regular | 11,881 |
| en/paragraph-2-bold | Roboto | 14/20 | Bold | 1,163 |
| en/paragraph-3 | Roboto | 12/18 | Regular | 2,100 |
| en/paragraph-4 | Roboto | 12/16 | Regular | 145 |
| en/tooltip | Roboto | 12/16 | Regular | 31 |
| zh-hant/*(11 個) | Noto Sans TC | 同上對應 | 同上 | 合共 1(paragraph-2) |

(統計範圍:PC UI 檔 8 頁,含 instance 內部文字;User Journey 0、Release Notes 未掃。)

## 2. 問題

1. **兩組完全重複**:`heading-5` ≡ `paragraph-1-bold`(16/24 Bold);`tooltip` ≡ `paragraph-4`(12/16 Regular)。
2. **命名方向反直覺**:`heading-1` 最大、`paragraph-1` 亦最大,數字越大越細;heading-5 同 paragraph-1-bold 又係同一款,睇名分唔出。
3. **語言變體近乎冇用**:zh-hant 全套只係字體 family 唔同,使用量得 1;實際 Chinese 文字用緊 en style(Roboto fallback)。多咗 11 個 style 同約 44 個 variable。
4. **未遷移嘅舊 style 仍大量使用**:PC UI 檔仍有約 5,300 個文字連住舊 `PC/Eng/*`(Paragraph 1 約 3,169、Paragraph 2 約 1,197、Heading/Paragraph 3·4 等)、`PC/TC/*`(9)、`Desktop/BodyText/…`(14)、`product/launcher/*`(2)。另有約 4,900 個文字完全冇 style。

## 3. 建議方案(我建議呢個)

**由 23 個減到 10 個,按「角色 + 尺寸」命名,中英文用同一套 style。**

| 新名 | 取代 | 規格 | 備註 |
|---|---|---|---|
| `heading/xl` | en/heading-1 | 32/40 Bold | 原地改名 |
| `heading/lg` | en/heading-2 | 24/32 Bold | 原地改名 |
| `heading/md` | en/heading-3 | 20/28 Bold | 原地改名 |
| `heading/sm` | en/heading-4 | 18/24 Bold | 原地改名 |
| `body/lg` | en/paragraph-1 | 16/24 Regular | 原地改名 |
| `body/lg-bold` | en/paragraph-1-bold **+ heading-5** | 16/24 Bold | 合併:heading-5 嘅 404 個換入(共 2,044) |
| `body/md` | en/paragraph-2 | 14/20 Regular | 原地改名(最常用 11,881) |
| `body/md-bold` | en/paragraph-2-bold | 14/20 Bold | 原地改名 |
| `body/sm` | en/paragraph-3 | 12/18 Regular | 原地改名 |
| `caption` | en/paragraph-4 **+ tooltip** | 12/16 Regular | 合併:tooltip 嘅 31 個換入(共 176) |

**中英文處理(需你決定)**:
- **建議**:`family` variable 加 mode(en = Roboto、zh-hant = Noto Sans TC),同一套 style 用 variable mode 切換語言,唔再需要 `zh-hant/*` 11 個 style 同重複 variable。Typography variable 由約 92 個減到約 40 個(10 style × 4)。
- 保守做法:保留 zh-hant 但同樣改成 10 個、名加前綴 `zh/`。

**舊名 → 新名**:en/heading-1→heading/xl · heading-2→heading/lg · heading-3→heading/md · heading-4→heading/sm · heading-5→body/lg-bold(合併)· paragraph-1→body/lg · paragraph-1-bold→body/lg-bold · paragraph-2→body/md · paragraph-2-bold→body/md-bold · paragraph-3→body/sm · paragraph-4→caption · tooltip→caption(合併)· zh-hant/*→(用 mode,刪除;1 個使用中嘅 paragraph-2 要換成 body/md)。

**影響量**:原地改名 8 個 style 零風險(連結跟隨,約 20,000+ 個文字);合併只動 heading-5(404)+ tooltip(31);zh-hant 只影響 1 個文字。Variable 改名同樣原地做,alias 跟隨。

## 4. 後續(建議第二步,需另批)

把舊 `PC/Eng/*`(約 5,300 個)按字體+大小+行高完全吻合者換成新 style,令 PC UI 檔只剩一套 style。

## 5. 待 Alan 確認

1. 採用上面 10 個 style 同命名?(`heading/xl…`、`body/lg…`、`caption`)
2. 中英文:variable mode(建議)定保留 zh 前綴?
3. 同意合併 heading-5→body/lg-bold、tooltip→caption?
確認後我先原地改名,再合併,再刪除空 style,逐步記入 library-change-log;之後需 Alan 重新發佈 Library。

---
## 補充:Variable 審計(System collection,Alan 指嘅「heading-1 呢堆」)

- `typography/*` 共 122 個 variable:`en` 60(12 組×5)、`zh-hant` 55(11 組×5)、`font-weight` 4、`layout` 3。
- 每組 5 個 = size / line-height / family / weight / letter-spacing。**全部都係 alias**(→ Primitive 嘅 font/size/N、font/line-height/N、font/family/en|zh-hant、font/weight/*、unit/0)。
- 真正有分別嘅只有 **size + line-height**(約 12 組不同值);family、weight、letter-spacing 喺所有組完全相同,等於重複 ~90 次。
- 細瑕疵:`en/tooltip` 嘅 family/weight 指向 `font/family/roboto`、`font/weight/regular`,其他組指向 `font/family/en`、`typography/font-weight/*`。
- System 只有 Base 一個 mode,未用 mode 區分語言。

**建議**:每個 style 只保留 `size`、`line-height` 兩個 variable(10 組×2=20);family 用 2 個共用(en / zh-hant)、weight 用現有 `typography/font-weight/regular|bold`、letter-spacing 用 `typography/layout/letter-spacing/default`。總數 122 → 約 29。保留 en 嘅 variable 原地改名(`typography/heading/xl/size` 等),綁咗嘅 component 同 style 唔會斷;只刪除多餘嘅(zh-hant 55、en 每組 family/weight/letter-spacing、heading-5、tooltip)。刪除前先重綁 style 同 component。
