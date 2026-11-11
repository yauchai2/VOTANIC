# Voyage 360 Loading Enhancement：unity4 留言回覆（可直接貼上）

日期：2026-11-10（更新）
注：Board 編號已按最新流程重排（01 至 16），以本文為準。

## 0a · S3：兩個按鈕難以分辨
已改用 XRCC Library 的按鈕：主要操作用 Primary（紫色底），次要操作用 Secondary（灰色外框），層次清楚。現在 S3 自動嘗試下一個場景，兩個按鈕移到 S3b（Try again 為 Primary，Close project 為 Secondary）。

## 0b · S3：文案不清楚，首個場景失敗應嘗試其他場景
已按建議修改：首個場景載入失敗時，會自動嘗試下一個場景（S3 顯示「Trying scene 2 of 16」）；任何一個場景成功，即進入專案，其餘在背後繼續載入。只有 16 個場景全部失敗，才顯示 S3b「None of the 16 scenes could be opened」。

## 1 · Board 02：22%、進度條、8 of 36 重複
同意，已刪除 22%，只保留一條進度條和「8 of 36 assets ready」。進度單位統一為 assets（所有場景內的圖片、圖示、音訊、waypoint、影片等）。底部狀態列以一句說明現在可以做什麼，例如「Scenes 1–3 are ready to edit」；卡片只說明「New scene unlocks when loading finishes.」，避免同一資訊重覆出現。

## 2 · Board 02：參考 checklist，一眼看到各場景狀態
謝謝參考。我們沒有另加一份清單，而是把底部的場景列直接當作 checklist：每個縮圖顯示 Ready、載入中（附該場景的資源數，例如 5 of 8 assets）、In queue、1 file missing 或 Couldn’t load。這樣不用在兩個地方看同一件事，也不會遮住畫面。失敗時的詳細清單在 Review 面板（Board 08）。

## 3 · Board 01：pill 顯示正在處理的場景
現在正在載入的場景會直接在場景列標示（縮圖顯示進度），展開卡片的 Scenes 階段會顯示已完成的場景數（例如 3 of 16 ready）。pill 本身保持簡短，改為以狀態為先：載入中、有缺失檔案（2 files missing · Review）、完成（All assets ready，數秒後消失）。

## 4 · Board 03：New scene 鎖定狀態不明顯
已新增鎖定外觀：去除紫色底，改為停用底色、虛線框和鎖頭圖示，與可用狀態一眼可分（Board 03）。hover 會說明「New scene unlocks when loading finishes.」。想確認：載入期間新增場景，技術上是否真的必須鎖定？如果不需要，我們可以直接開放。

## 5 · Board 07：「scene failed」如何定義
改為以「檔案」計算，並註明影響範圍，例如「2 files are missing」、「Lobby-tour.mp4 · Scenes 4 and 10」，而不是把共用檔案算成多個場景失敗。分兩級顯示：
- 場景內的檔案缺失：場景仍可開啟，缺失元素以佔位顯示，縮圖標示 amber「1 file missing」（Board 14）。
- 場景本身（360 圖片或影片）載入失敗：場景不能開啟，縮圖顯示紅色「Couldn’t load」。

想確認：後端能否區分這兩種失敗？共用 asset 失敗時，是否所有使用它的場景都受影響？

## 6 · Board 08：彈出失敗清單；Asset Panel 能否開啟
已加入：卡片的「Review」開啟失敗清單（Board 10），列出檔案名稱、類型、受影響的場景和原因（Timed out、File not found），每項可 Retry 或 Replace…，亦可 Retry all。設計上希望 Asset Panel 在載入中和出錯時都可以開啟，失敗項目置頂。想確認：載入或匯入期間，Asset Panel 技術上能否開啟？Replace… 是否可以直接開啟 Asset Panel 的檔案選擇？

## 7 · Board 12：失敗場景令 waypoint 連接的場景無法到達
好提醒。這一輪先不做，已記錄為 backlog。如果後端的可達性檢查可以在載入完成後提供結果，日後可在場景列為受影響的場景加上「Unreachable」標示。想確認這個函數之後能否提供給前端使用。

## 8 · Board 12：不應強制修好所有問題才可 Play
同意，已採納。XRCC 的做法同樣適用於 Voyage 360：載入期間 Play 與 Save 照常開放。Play 時，未載入的素材沿用 XRCC 的 placeholder 顯示，頂部提示數量（例如「28 assets haven’t loaded yet and show as placeholders」），以免誤會為檔案缺失（Board 05、06）。為減少 Lag，Play 期間暫停背景載入，退出 Play 後自動恢復，pill 短暫顯示「Loading resumed」（Board 07）。載入結束後，即使仍有缺失檔案，Play、Edit、Save 亦全部開放。想確認三點：1. Play 期間能否暫停背景載入，退出後再恢復？2. 在 Play 中經 waypoint 進入未載入的場景時，能否先即時載入該場景？3. 載入期間 Save，會否保留對未載入及缺失檔案的引用？

## 9 · Board 09：載入期間開啟 Asset Panel，各種素材如何顯示
已新增 Board 04。載入期間開啟 Asset Panel，素材縮圖沿用場景列的狀態：
- 未載入（In queue）：灰底虛線框加時鐘圖示，顯示檔名，暫時不可拖入場景。
- 載入中（Loading）：中性底色加 spinner，載入完成後自動換成正常縮圖。
- 有問題（Missing）：琥珀色外框加警告圖示，並註明原因（例如 Timed out、File not found），可直接 Replace。

已載入的素材維持正常縮圖，可照常使用。想確認：載入期間 Asset Panel 在技術上能否開啟？未載入的素材能否先顯示檔名？

## 10 · Board 01：未被任何場景使用的素材何時載入
按目前設計，未被任何場景使用的素材排在所有場景之後才載入，並計入總數（36 assets）。展開卡片（Board 02）已列為第二個載入階段「Unused assets」，讓使用者知道最後在載入什麼。New scene 待全部載入完成才解鎖。想確認：後端目前是否會在開啟專案時載入未使用的素材？如果可以改為開啟 Asset Panel 時才載入，載入時間可以更短，New scene 亦可更早解鎖。

## 11 · Board 02：checklist 改為其他用法
同意，這個用法更好。checklist 已改為顯示載入階段：1. Scenes（顯示已完成的場景數，例如 3 of 16 ready）；2. Unused assets。逐個場景的狀態只保留在底部場景列。想確認：除了這兩個階段，載入過程中還有哪些程序值得讓使用者看到？請列出名稱，我們會加入。
