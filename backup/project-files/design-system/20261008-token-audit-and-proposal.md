# XRCC (PC) Library — 全部 Token 審計與改動建議

日期:2026-10-08 · 範圍:XRCC Primitive(110 → 111)/ XRCC Theme(101,Dark+Light)/ XRCC System(161 → 161)· 方式:只讀審計 + 已做的新增項目
結論先講:**架構(Primitive → Theme / System)大致乾淨**,主要問題在 ① B 代 component 仍綁外部 kit 變數、② 少量對比度/Light mode 值、③ 命名小不一致。

## 1. 已做(只新增,未發佈)
| 項目 | 內容 |
|---|---|
| spacing/64 | System 新增;並在 Primitive 新增 `unit/64`,`spacing/64` 改為 alias 到它(同其他 spacing 一致) |
| status/warning/* | Theme 已有 4 個(已發佈);今次補上 WEB/ANDROID/iOS codeSyntax,格式同 status/error 一致 |
| Text/effect styles | 23 + 10 個,綁 System 變數(見改動日誌) |

## 2. 審計結果

### 2.1 結構與 alias 層級
- **Primitive**:110 個全是原始值(70 色、34 數值、6 字串),無 alias。✅
- **Theme**:198 個值 alias 到 Primitive,2 個 alias+透明度,2 個原始值(我加嘅 `status/warning/background`,因 API 限制)。✅ 無跨層錯亂。
- **System**:116 個 alias 到 Primitive,44 個 alias 到 System(typography 鏈)。✅
- 全部三個 collection 名稱全小寫、無空格/底線,深度 2–4 層一致。✅

### 2.2 重複 / 未使用
- Primitive 有 10 組「同值不同名」:`unit/N`、`font/size/N`、`font/line-height/N`(例:unit/40 = font/size/40 = font/line-height/40)。這是分角色命名,屬刻意設計,**建議保留**。
- Primitive 有 14 個沒有被任何 alias 引用:`color/cyan/100、300、500`、`color/magenta/100`、`color/magenta/600`、`color/yellow/200`、`color/blue/100`、`color/indigo/200`、`color/cyan/accent`、`color/neutral/250`、`color/neutral/black`、`font/size/40`、`font/line-height/48`、`unit/56`。其中部分可能被 component 直接綁定(Primitive 在 Library 內有 300 次直接綁定),**建議保留,不刪**,待逐個確認。
- Primitive `color/blue/status` 無描述;`color/cyan/500` 被設為不發佈。

### 2.3 命名不一致(建議改,需你批准)
| # | 現況 | 建議 |
|---|---|---|
| N1 | `border/disable` vs `text/disabled`、`icon/disabled`、`surface/disabled` | `border/disable` → `border/disabled` |
| N2 | `status/blue/default`(用顏色名,不是語義) | 保留(已被使用);新增語義時用 info/ 等語義名 |
| N3 | `text/on-dark/*`、`text/on-light/*` 與 `text/inverse` 並存 | 保留;在描述註明用途 |
| N4 | `elevation/legacy/shadow-25` | 標為 legacy,不新用 |

### 2.4 對比度(Dark mode,文字 vs surface/canvas·panel)
| Token | 色值 | canvas | panel | 評語 |
|---|---|---|---|---|
| text/primary | #e5e5e5 | 13.2 | 14.4 | ✅ |
| text/secondary | #c8c8c8 | 9.9 | 10.8 | ✅ |
| text/accent | #b89afa | 7.2 | 7.8 | ✅ |
| text/placeholder、icon/secondary、text/on-dark/muted | #818181 | 4.24 | 4.62 | 接近 4.5,canvas 上略低 |
| text/disabled、icon/disabled | #676767 | 2.94 | 3.20 | 停用狀態可接受 |
| **text/subtle** | **#545454** | **2.20** | **2.39** | ❌ 不合格(連 3:1 都未達) |

**建議 C1**:`text/subtle` Dark 值由 neutral/700 改為 neutral/500(#818181,canvas 4.24、panel 4.62),Light 值已是 5.3:1 不變。副作用:subtle 與 placeholder 同色,階層變平;若要保持差異,另加一級灰色 Primitive。
**建議 C2(Light mode)**:`text/debug/status` Light 值是 #e5e5e5(淺底 1.2:1),應改為深色(例:text/primary 同值);Light mode 的 `text/placeholder`、`text/disabled`、`icon/secondary` 都是 #818181(3.6:1),如日後要用 Light 才需處理。你已說 Light 好少用,建議只改 `text/debug/status`。
另外 53 個 Theme 變數的 Light 與 Dark 值完全相同(多為 behaviour/*、hierarchy/marker/* 等刻意不分模式的顏色),無須處理。

### 2.5 缺漏
- 無 `status/warning`:✅ 已補。
- Theme 缺 `status/info`(只有 status/blue/default)、`status/success` 只有 default(error 有 default/hover/text/icon/background)。**建議(新增)**:補 `status/success/{text,icon,background}`,結構同 error/warning 對齊。
- System 有 `size/control/height/24,32,36,40,48`,但 Button/Input 已統一為 48/36/28:`size/control/height/28` 已存在(Alan 更新);40 仍被其他 component 用,保留。

### 2.6 Component 仍綁外部 kit 變數(重點)
掃描 Library 內 6,661 個節點:System 4,722 次、Theme 1,618 次、Primitive 300 次綁定 ✅。但 B 代 component 仍綁**非本檔變數**,主要來自 Reshaped「Slate」kit 同舊版 XRCC 變數:

| 外部變數 | 解析值 | 次數(約) | 建議對應 | 注意 |
|---|---|---|---|---|
| `Unit/x1,x2,x3,x4,x5,x6,x8,x10,x12,x16` | 4,8,12,16,20,24,32,40,48,64 | 3,000+ | `spacing/4,8,12,16,20,24,32,40,48,64` | 值相同,視覺不變 ✅ |
| `Unit/x7,x9,x14,x1-5,x0-5` | 28,36,56,6,2 | 600+ | `spacing/2`(x0-5);其餘無 token | 28/36/56/6 無對應,需你決定保留或補 token |
| `Radius/Small` | 4 | 500+ | `radius/sm` | 視覺不變 ✅ |
| `Radius/Circular`、`Radius/None` | 999、0 | 1,100+ | `radius/full`、`radius/none` | ✅ |
| `Radius/Medium` | **6** | 1,050+ | `radius/md`(8) | ⚠️ 會由 6 變 8,視覺有改變 |
| `Radius/Large` | **10** | 480+ | `radius/notification`(10) 或 `radius/lg`(16) | ⚠️ 語義不符,需你決定 |
| `Font/Styles/Body 2`(14/20)、Featured 6(18/24)、Featured 5(20/28)、Caption 1(12/16) | 同左 | 600+ | `typography/en/paragraph-2`、`heading-4`、`heading-3`、`paragraph-4` | ✅ |
| `Font/Styles/Caption 2`(10/12)、Featured 1(40/44) | | 60+ | 無對應 | 需你決定 |
| `Font/Weight/Regular,Medium,Bold` | | 390 | `typography/font-weight/*` | Medium 有 ✅ |
| `Color/Foreground/*`、`Color/Background/* faded`、`Color/Border/* faded` 等 | alias(Reshaped 色板) | 900+ | 按角色對應 Theme(text/*、surface/*、border/*、status/*) | 需逐個核對色值再對應 |
| `typography/en/paragraph-*/…`、`typography/layout/*` | 與本檔同名 | 數千 | 已是 XRCC 變數,但屬「遠端副本」(舊 ID),重綁到本檔同名變數 | 視覺不變 ✅ |
| `Color/Surface/canvas`、`Radius/md`(來自 "XRCC Semantic")、`icon/status/*`、`elevation/*`(舊 XRCC Theme 副本) | | 300+ | 重綁到本檔 Theme/System | 部分名稱本檔已不存在(`icon/status/white`/`strong`/`default`),需對應新名 |

受影響最大嘅 component:avatar、menu-item、Text Input/text-area(只剩 layout 同 border faded)、alert、switch、pin-field、progress-indicator、loader、New Tooltips、table 相關、Tag、pagination 等。A 代 Button 只有 typography 遠端副本同 `Radius`/`Unit` 少量。
Raw hex:avatar 276 處,Tag 7,progress-bar 2,其餘各 1。

## 3. 改動清單(待你批准後逐批做)
**批 1(視覺不變,可直接批准)**
1. 將上表「值相同」嘅外部變數重綁到 XRCC 變數(Unit→spacing、Radius Small/Circular/None→radius、Font/Styles Body 2/Featured 6/Featured 5/Caption 1→typography、遠端副本→本檔同名)。
2. `N1`:`border/disable` → `border/disabled`。
3. 新增(已做):`status/success/{text,icon}`(同 default 值);`status/success/background` 因 API 做不到「alias 加透明度」暫未建,可由你手動建或接受固定色值。

**批 2(視覺有輕微改變,要你揀)**
4. `Radius/Medium` 6 → `radius/md` 8?(或保留 6、新增 `radius/6`)
5. `Radius/Large` 10 → `radius/notification`、`radius/lg` 16,或新增 token?
6. `Unit/x7,x9,x14` 28/36/56 與 `Font/Styles/Caption 2/Featured 1`:新增 token 還是吸附到最近值?
7. `Color/*`(Reshaped)逐個對應 Theme:我先出對照表(色值對色值)再等你批准。

**批 3(對比度,要你批准改值)**
8. C1:`text/subtle` Dark → neutral/500。
9. C2:`text/debug/status` Light 改深色。
10. Avatar 276 處、Tag 7 處 raw hex 改綁 token(avatar 顏色語義待確認)。

**不建議做**:刪除 Primitive 同值重複項、刪除 14 個未被 alias 嘅 Primitive(可能被 component 直接綁定)。
