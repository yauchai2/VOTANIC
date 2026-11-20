# Voyage 360 顏色對應 XRCC (PC) Library（分析稿，未改動任何 Figma）

日期：2026-11-05 · 原則：XRCC Library 不新增任何 token；只列出現有 token 的最近對應，色差以 RGB 歐氏距離估算（0 為完全相同，約 10 以內肉眼難辨，30 以上明顯）。對照只比 Dark 值。

## 1. Voyage Theme 的 12 個顏色

| Voyage token | 色值 | 最近 XRCC 現有 token | XRCC 色值 | 色差 | 判斷 |
|---|---|---|---|---|---|
| surface/list | #1d1d1d | surface/canvas | #1e1e21 | 約 4 | 可直接對應 |
| surface/tint-delete | #1c1a21 | surface/canvas | #1e1e21 | 約 5 | 可直接對應 |
| button/background-selected | #221d27 | surface/canvas | #1e1e21 | 約 7 | 可對應，但「選中」與底色會失去區別，需確認 |
| button/background-hover | #413152 | action/primary/background/default | #392e52 | 約 9 | 可對應 |
| brand/band-delete | #302c35 | surface/header | #2a2531 | 約 10 | 可對應 |
| button/background | #56317b | action/primary/background/pressed | #4b387d | 約 13 | 可對應，略偏冷 |
| brand/band | #6429a0 | color/purple/500（Primitive，#582da7） | #582da7 | 約 14 | 接近，但 Theme 層沒有語義貼切的 token，只有 behaviour/user 等不適用 |
| surface/tint | #241b38 | surface/header | #2a2531 | 約 14 | 可對應，紫調略減 |
| surface/base | #0e0d0d | surface/panel | #161616 | 約 15 | 底色變淺一級，全檔最大用量之一（約 410 處），需 Alan 決定 |
| accent/light | #d9b0fd | text/accent、icon/accent | #b89afa | 約 40 | 明顯偏暗偏藍，需決定 |
| marking/delete | #c92e5f | status/error/default | #a32929 | 約 66 | 差異明顯（桃紅變暗紅），需決定 |
| partner/pexels | #05a081 | 無（最近為 cyan/200、green/200） | — | 約 70 | 第三方品牌色，建議不綁定 |

結論：12 個中，7 個色差約 10 以內或接近，可直接改綁；surface/base、brand/band、accent/light、marking/delete、partner/pexels 屬需決定。

## 2. UI 檔仍在使用的舊 kit 變數與硬編碼（主頁 💎360 UI 抽樣，約 7,400 個節點，不含 instance 內部）

| 現況 | 用量 | XRCC 對應 | 色差 |
|---|---|---|---|
| Brand/Ultra Violet #5f4b8b | 140 | surface/accent-muted | 0 |
| Colour/ Deep Purple #392e52 | 39 | action/primary/background/default | 0 |
| Brand/Turkish Sea #195190 | 6 | notification/accent/blue | 0 |
| Neutrals/grey 200 #e5e5e5 | 4 | text/primary、icon/default（按用途） | 0 |
| Brand/ Blue Moon #3686a0 | 27 | color/cyan/200（#369db2） | 約 29，Theme 層無對應 |
| Brand/Silver #a2a2a1 | 4 | color/neutral/500（#818181）或 400（#c8c8c8） | 約 33 至 38 |
| Brand/ Blackenend Pearl #4d4b50 | 3 | border/default（#545454） | 約 12 |
| Icon&Text/For Icon & Text- Hovering #585454 | 17 | border/default（#545454） | 約 4 |
| 硬編碼 #d9d9d9 | 927 | color/neutral/250（Primitive） | 0 |
| 硬編碼 #000000 | 684 | color/neutral/black（Primitive） | 0 |
| 硬編碼 #ffffff | 315 | icon/inverse、text/inverse、surface/inverse（按用途） | 0 |
| 硬編碼 #525252 | 250 | border/default | 約 3 |
| 硬編碼 #222222 | 101 | surface/canvas | 約 4 |
| 硬編碼 #f9ac2f | 55 | notification/accent/citrus | 0 |
| 硬編碼 #fa5d6c / #ee7575 | 86 | status/error/icon（#ff453a）或 color/red/50（#ff8a8a） | 約 40 至 45 |
| 硬編碼 #22a4e5 | 66 | status/info/default（#4589ff）或 color/cyan/accent（#0ec7f0） | 約 35 至 50 |
| 硬編碼 #adadad、#a5a5a5、#d4d4d4 等灰階 | 約 150 | text/secondary、text/placeholder、color/neutral/* | 各約 10 以內至 30 |
| 硬編碼 #684dff、#2b1da6、#5f3cb2、#8163d9 等紫藍 | 約 80 | 無貼切者（最近為 purple/200 #9c70ff、indigo/200 #2c1484） | 視個別 |

## 3. 需注意

- 更正（2026-11-05，Alan 指出 Library 有 color/neutral/black）：先前「Primitive 無法跨檔綁定」的說法來自舊記憶，未經實測，且 Voyage 檔案早已綁定 Primitive（color/yellow/100），故此限制很可能不成立。#d9d9d9、#000000、brand/band 可綁定 Primitive（neutral/250、neutral/black、purple/500），實際改綁前再做一次單點測試確認。
- 此次只抽樣主頁，其餘頁面、instance 內部、84 個 Light Mode frame 未包含。
- 所有改動都沒有執行。
