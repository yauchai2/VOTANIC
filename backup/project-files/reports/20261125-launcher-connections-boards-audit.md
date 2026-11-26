# Launcher Connections 畫板檢查（AI keys / Speech commands (Wit.ai) 分類）— 2026-11-25

依據：Alan 已確認的設計是「Connections 摘要列 + 子頁」。Launcher：D3o 總覽（Remote control、AI keys、Speech commands (Wit.ai) 三列）→ D3 AI keys 子頁 → D3w Speech commands 子頁（有「‹ Connections」返回）。Settings：D0 總覽 → D1 AI keys → D1b Speech commands (Wit.ai)。

## 一、已是新版（不用改）

- Settings：D0、D1、D1b、D2、D2a、D2b（Add key／Custom）、D5–D8、D2b/D7b（Wit.ai token）、D1s、D1r、D1d、D1t、D1n、D1w、D1p，標題與內容都按 AI keys 或 Speech commands 分開。
- Launcher：D3o 總覽、D3 AI keys 子頁、D3w Speech commands 子頁（新）。
- Launcher 遠端控制：D3R、D0R（屬 Remote control，不在本次範圍）。

## 二、仍是舊版（Launcher 單頁，同一頁同時列出 AI keys 與 Speech commands，副標題「AI keys and speech tokens stay on this computer.」）

應改為 AI keys 子頁（有返回連結、標題 AI keys、只列 key）：
1. D4k 啟動前新增 Gemini key
2. D4mK 啟動前新增 MiniMax key
3. D4m 啟動前管理 key
4. D2L Launcher Add key
5. D5L Launcher key actions
6. D6L Launcher Change password
7. D7L Launcher Rename key
8. D8L Launcher Remove key
9. D3s Launcher · AI key 已新增
10. D3r Launcher · AI key 已改名
11. D3d Launcher · AI key 已移除
12. D3p Launcher · 密碼已更新
13. D2f 新增 Gemini key · 返回連接（760×700，首次連接流程，同樣是合併列表）

應改為 Speech commands (Wit.ai) 子頁（有返回連結、標題 Speech commands、只列 token）：
14. D5T Launcher token actions
15. D2T Launcher Add Wit.ai token
16. D7T Launcher Rename token
17. D8T Launcher Remove token
18. D3t Launcher · Token 已新增
19. D3w（舊，id 2626:17610）Launcher · Token 已改名
20. D3n Launcher · Token 已移除

## 三、其他發現

- 畫板名稱重複：新舊兩塊都叫「D3w」（Speech commands 子頁與 Token 已改名），建議把舊的改為「D3tr」。
- Alan 截圖內，D3t、D3w（舊）的板名標籤出現文字重疊（同一標籤疊了兩層），改版時一併修正。
- D3 本身是子頁，但內部仍有隱藏的 Speech commands 舊內容，會一併清理。

## 四、做法

以現有 D3、D3w 子頁為模板，逐板複製其外框、返回連結、標題與清單區，保留各板自己的彈窗（Add、Rename、Remove、Change password）與結果狀態；prototype 同步檢查 Launcher Connections 是否已是總覽加子頁；Annotation 與 change log 同步。
