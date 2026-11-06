# Remote Trigger：需求摘要（2026-11-05）

來源（Notion，唯讀）：Remote Trigger — Cross-repository working space（2026-11-05）、Remote Trigger Updates（2026-11-04）、XRCC Scope Meeting（2026-10-30）、Research Team Meeting（2026-10-28、2026-11-04）、舊 wiki「External Connection: Remote Trigger」（2026-07-14，已過時）。
標籤：**已確認**＝Notion 明文；**建議**＝設計建議；**假設**＝待團隊核實。

## 1. 一句話
Remote Trigger 由「單一網頁遠端觸發」發展為「專案 dashboard（12 欄 grid）＋變數遠端控制」。手機或瀏覽器打開 Launcher 提供的網頁，即可按掣、撥 slider、改數值或顏色，直接控制正在 Play 的 XRCC 專案。

## 2. 分工（已確認）
| 區域 | XRCC（Unity） | Launcher |
| --- | --- | --- |
| 定義 | 擁有 dashboard 定義、版面、widget binding、authoring UI | 驗證並儲存 session 註冊的定義，在瀏覽器渲染 |
| 執行期 | 註冊 play session、trigger 目錄、變數；執行指令並發布權威值 | HTTP／WebSocket 服務、session 管理、指令驗證與路由、廣播 |
| 介面 | PC authoring panel（12 欄 grid）；Scene Remote Trigger UI | Local／Public 切換（cloudflared quick tunnel）、動態 QR 與 URL、瀏覽器 dashboard |

流程：remote.hello → session.register → 瀏覽器 subscribe → dashboard.snapshot → widget.command → variable.value／changed → session.end。

## 3. 控件與資料（已確認）
- 控件：triggerButton、booleanToggle、numberInput、numberSlider、vector3Input、vector3Slider、colorInput。
- 變數型別：bool、number、vector3、color；存取：invoke（trigger）、read、readWrite。
- 只有「已放上 dashboard 版面的變數 widget」可遠端控制；沒有逐變數的 exposed 開關。移除 widget 即停止遠端讀寫。
- Palette 分兩區：Project variables、Instance variables（來自當前 scene 全部 instance）。
- Grid：12 欄；上限 128 個 widget、1,000 行；預設行高 48、gap 12、手機斷點 640。Vector3 slider 最小 4×5 格。Slider 不可無限縮小（2026-11-04 會議）。
- Widget 背景色屬 dashboard 外觀，與 color 變數的值是兩回事。
- 編輯 dashboard 會增加 revision 並隨專案儲存；Play 時註冊的是快照，Play 期間的修改不會即時生效。

## 4. 範圍（已確認）
- 4.2：Preset UI、可自訂位置（日後可遷移到 grid）、Variable item。
- 5.0：Grid system、其他 sensor data、multi page。
- 10/28 brainstorm：手機陀螺儀、麥克風、camera、自訂 UI（如控制 RC 車）、microcontroller 等外部裝置；按鈕可有多種 style（11/04）。
- 先支援單一 Remote Trigger，之後再考慮多個（10/30）。

## 5. 連線與狀態（已確認）
- Local（LAN）：延遲約 6ms；需同一網絡，不太穩定但團隊認為可接受。
- Public：cloudflared quick tunnel（*.trycloudflare.com），延遲約 35ms；方便但依賴網絡與 Cloudflare，連線會斷；加密傳輸。
- 瀏覽器列出 session 並有 Refresh；Play 先啟動、瀏覽器後開亦要看到 session。
- 過時指令：layout 版本不符時回 STALE_LAYOUT 並重送快照；其他錯誤碼：SESSION_NOT_FOUND、WIDGET_NOT_FOUND、SESSION_OFFLINE。
- 預設連接埠 3001；XRCC panel 需顯示 link（11/04）。

## 6. 未解風險（影響設計）
1. 手機版面：XRCC 要求 stack，瀏覽器實際是窄寬鏡像 grid。**設計建議**：以窄寬 grid 為準，直向以 6 欄摺疊，橫向保持 12 欄，並訂最小尺寸（slider 最小 4×5）。
2. Session 清理：斷線通知、refresh 重複條目、Play 時序。**設計**：Session 列表顯示 Live／Ended，Refresh 後去重。
3. 安全：目前僅適合 dev／demo；登入 cookie 可預測；Public 連結任何人拿到都能操作。**設計**：Public 啟用前顯示風險說明，QR 區標明「任何人取得連結即可控制」。
4. Vector3 驗證不一致可能誤拒；指令 burst 可能覆蓋。**設計**：控件要有被拒絕時的回彈與提示。
5. 目前沒有存取權限分級；此版本不設計帳戶系統（假設）。

## 7. 設計範圍
1. XRCC：Remote Dashboard authoring panel（grid 編輯、widget palette、變數 binding、widget 設定、預覽、驗證警告、儲存）。
2. XRCC：Play 期間入口（顯示連結與連線狀態）。
3. Launcher：Remote Trigger 面板（Local／Public、QR、URL、啟動中、錯誤、已停止）。
4. 手機／瀏覽器 dashboard：登入、Session 列表、Dashboard、各控件、載入中、斷線重連、過時版面、Session 已結束、空狀態。
5. 全部含 loading、error、斷線、空狀態；Hover 與 tooltip 規格表。

## 8. 未能確認（需團隊核實）
- 手機端是否需要登入畫面的實際欄位（Notion 只提到 login 頁）。
- Public tunnel 是否由用戶手動開啟，還是 Play 時自動開啟（假設：手動切換，預設 Local）。
- 多 page（5.0）的頁籤位置；本版只預留，不設計。
