# Remote Trigger P1 逐組畫板 Review（2026-11-19）

範圍：Workbench「XRCC Remote Trigger (P1)」Flow 01–13 及第 4 節規格。方法：逐組截圖檢視加結構掃描。唯讀，除報告內已註明的修正外沒有改動。

## 整體
- 版面一致：Launcher 各狀態（Server off、Starting、Start failed、Port changed、Reloading、Public link 各狀態、Devices、Turn off）排列整齊，錯誤與空狀態都有插圖和下一步。
- 遙控端 C6–C15、C23–C28 對齊與間距正常，pill 顏色語意正確（C11 已於稍早修正）。
- Dialog、Notification、tab 沿用 Library 元件，未見手畫替代。

## 問題
| # | 問題 | 影響 | 建議 | 優先 |
|---|---|---|---|---|
| 1 | Sensor 流程（C16–C22 共 7 塊）與 Alan 11-16／11-17 的決定不符：當時定為「Sensor 預設啟用、無控制 section、C16 只供查看」，現在有授權、拒絕、接管、停止分享的完整流程。 | P1 範圍擴大，開發要做更多，且與 Notion 規格是否一致未知。 | 請 Alan 決定：保留完整流程，或縮回 C16 只讀。 | 高 |
| 2 | Sensor 示例裝置是 Desktop · Chrome，Gyroscope、Accelerometer 在所有狀態（包括「Sensors active」）都是 Not available，只有 Microphone 可用，Microphone 也被當成 Sensor 列出。C22「Confirm takeover」仍顯示「Permission is required before sharing sensors」。 | 示範的流程與狀態自相矛盾，容易誤導。 | 改用 iPad 或手機作示例，Gyro／Accel 設為 Available；移除與狀態無關的提示句。 | 中 |
| 3 | 第 4 節 Hover／Tooltip 規格沒有 Launcher 內的元素：Server 開關、Reload 圖示、Port 欄、Local／Public 分頁、Manage devices、Devices 列。 | 與「所有 hover 與 tooltips 都要加上」不符，開發缺規格。 | 補表格列（文字以英文，沿用 Library Tooltip）。 | 中 |
| 4 | A8、A9 清單在視窗底部被切到半行，沒有捲動提示。 | 看起來像截斷。 | 加底部淡出或捲軸提示。 | 低 |
| 5 | 畫板命名：A10 為 Project variables 分頁卻只叫「Select a variable」且排在 A11 之後；Launcher 有兩塊相似的「Remote control · Running」（一塊標籤為 Device connected）。 | 查找與溝通易混淆。 | 改名為「… · Project tab」、「… · Device connected」。 | 低 |
| 6 | 我補的虛線標籤「另一狀態」過於籠統（Flow 04、10、12 的並列狀態）。 | 讀不出轉換原因。 | 逐條改為具體事件，或對純並列狀態不畫箭頭。 | 低 |

## 未涵蓋
A、B 系列只看了截圖層級，沒有放大逐像素檢查；prototype 連結逐條點擊未測；Overview 未再核對。
