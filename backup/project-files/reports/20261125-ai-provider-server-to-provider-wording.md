# AI Provider：「Server」改為「Provider」字眼對照（2026-11-25）

範圍：僅 AI Provider（Figma 頁面 XRCC AI Provider 與 prototype）。已先改 Figma，再同步 prototype。Remote Trigger 與 Launcher 遠端控制未動。

## 一、已修改

| # | 原文 | 新文字 | 位置 |
|---|---|---|---|
| 1 | Server endpoint | Provider endpoint | Figma D4c、D4cm；prototype Launcher 檢查窗 |
| 2 | llama-3.3-70b isn't on this server anymore. | llama-3.3-70b isn't available from this provider anymore. | Figma D4cm Helper |
| 3 | Saved server | Saved provider | Figma A3c、A4c；prototype Add provider 與 Provider 卡片 |
| 4 | Choose a saved server or add a custom provider. | Choose a saved provider or add a custom provider. | Figma A3c；prototype Add provider |
| 5 | Choose a server | Choose a provider | Figma A4c 下拉 |
| 6 | CUSTOM SERVERS ON THIS COMPUTER | CUSTOM PROVIDERS ON THIS COMPUTER | Figma A4c 下拉分組 |
| 7 | Studio test server | Studio test provider | Figma A4c 下拉項目（示例資料） |
| 8 | Add at least one model ID your server can run. | Add at least one model ID this provider can run. | Figma A6d；prototype Custom provider 空狀態 |
| 9 | This server has no model with this ID. | This provider has no model with this ID. | Figma A6r、B2m；prototype 測試失敗訊息 |
| 10 | Type it exactly as your server expects. | Type it exactly as your provider expects. | Figma 3346:31432（Model name helper） |
| 11 | A server can have up to 20 models | A provider can have up to 20 models | prototype 錯誤訊息 |
| 12 | Your server does not report usage | This provider does not report usage | prototype Provider 卡片 tooltip |
| 13 | 啟動前只檢查 server 能否回應… | 啟動前只檢查 provider 位址能否回應… | Figma Annotation（D4cm） |
| 14 | 畫板與圖層名稱（A3c、A4c、B2m 板名、Custom server row、Server row 等） | 同步改為 provider | Figma，內部名稱，不顯示給使用者 |

## 二、未改動及理由

| 原文 | 位置 | 理由 |
|---|---|---|
| Server access token | Wit.ai token 窗（D2b、D2T；prototype 同） | 這是 Wit.ai 官方欄位名稱，使用者在 Wit.ai 後台看到的就是這個字，改了會對不上。 |
| Server、Server running、Server off、Remote control server、Start the server so devices can connect. | Launcher 遠端控制（D0R、D3R、D3o；prototype Remote control 區） | 屬 Remote control 功能，指本機執行的伺服器，按指示保留。 |

## 三、待 Alan 決定

- 「Provider endpoint」可接受嗎？備選：「Provider address」。
- 示例資料「Studio test provider」只是假名稱，可保留或改為其他示例。

## 四、狀態

- Figma：已改，已用 Figma 自身讀回確認文字與 Annotation。
- Prototype：已修改並在本地 commit（9c599fe，分支 claude/project-thread-00lm0h），尚未推送、尚未重新部署，待 Alan 批准。
- 核對範圍：已掃描 Figma 該頁全部文字（5,466 個文字節點）與 Annotation，以及 prototype 全部字串；未逐塊目視全部畫板。
