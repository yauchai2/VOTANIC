# AI Provider：Figma 與 Prototype 位置圖

## Figma

- 檔案：XRCC Claude Workbench `ZBOB48n4eLsZABCTnhh5kk`，頁面「XRCC AI Provider」。
- 流程 Section：node `1354-2549`「XRCC AI Provider · Screen flow」（原 29 塊畫板，審閱 v1 後增加 A3d、D0、D1b，減少 C6 等；實際數量以 Figma 為準）。Logo 節點 `1360-18744`。
- 連線與 Annotations 標準參考：`1333-8666`（READ-FIRST 第 15 節第 1 點要求開工前核實此節點與 `1354-2549` 的關係）；Flow 標準說明頁 `2160:7338`。
- 風格參考：Runtime Debug Panel `6177-31101`（Tabs、head）；Main Scene `M84FtPQGf4odQy2KTdxKIR` 的 `6001-12978`（Header）。
- 畫板分區：Lane 1 入口與首次連接（A）；Lane 2 任務與 Provider（B）；Lane 3 Voice 與試聽（C）；Lane 4 Key 管理與 Launcher（D）；另有 E、M 系列畫板（Settings／Launcher 背景相關，其中 E4、E5、M5、M6 仍用舊 Connections 背景）。畫面逐項說明見 `design-system/20261105-xrcc-ai-provider-handoff.md` 第 2 節，但 Tasks 已改 Models、C6 已刪、D3 Launcher 底部圖示版已標 superseded。
- Feature 元件在 Workbench Components 頁（`85:1541`）：AI Provider Logo（Provider × Size 16／20／24／32／40）、AI Icon 系列 24 個（outline 1px）、AI Task Card、AI Key Row、AI Provider Card、AI Voice Card、AI Task Row、AI Warning、AI Destructive Button、AI Session Card、AI Voice Tile、AI Voice Pick、AI Provider Chip、AI Provider Choice。OpenRouter 與 Custom 的標誌顏色為假設。
- 使用 Library：Dialog、Tab（Full Tabs，Size L，等寬）、dropdown-menu、Form Radio、Text Input、Switch 等。
- Library 缺口：無中性 AI 圖示、無 chat／mic／plus 圖示（已自繪於 Components 頁）、無破壞性按鈕元件（以 action/destructive token 自建）、Alert 在暗色下呈淺色（改以 status/warning token 自建）。
- Library 無改動需要 Publish 的紀錄；change log 在 `design-system/20261008-library-change-log.md`。

## Web prototype

- 檔案：`prototypes/xrcc-ai-provider/index.html`（單檔，無 build，假資料）。
- PR #6（draft）：分支 `claude/project-thread-9oawj5`，首版，base main。預覽：`https://htmlpreview.github.io/?https://github.com/yauchai2/VOTANIC/blob/claude/project-thread-9oawj5/prototypes/xrcc-ai-provider/index.html`。
- PR #9（draft）：分支 `claude/project-thread-hk97f3`，疊在 #6 上，套用 11-13 審閱 v1（無 VPN、顯示／隱藏密碼、Password needed、Connected 方塊、Speech to text、Connections 摘要與子面板）。合併次序：先 #6，再 #9。

## 同步狀態（2026-11-19）

| 項目 | Figma | Prototype |
|---|---|---|
| 審閱 v1（VPN、密碼、Password needed、Connected、Speech to text、Connections 摘要） | 已改 | 已同步（#9） |
| 非 Custom 每 Provider 單一 key | 已改 | **未同步** |
| 移除 Voice clone fallback（C6、複製語音卡片、C7 文案） | 已改 | **未同步**（#6 仍有 clone fallback） |
| Add AI key（D2）已有 key 的 Provider 變灰 | 未做 | 未做 |
| 舊 Connections 背景（D2、D5–D8、E4、E5、M5、M6） | 待 Developer 確認 Connections 範圍後統一 | 待定 |

依 READ-FIRST，prototype 須等 Alan 看過 Figma 後才同步；同步後須完全複刻 Figma 並加入全部 hover 與 tooltips。
