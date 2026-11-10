# Voyage 360 Loading Enhancement：unity4 留言回覆（可直接貼上）

日期：2026-11-09
注：Board 編號已按預設收合 pill 的閱讀順序重排（01 至 12），以本文為準。

## 0a · S3：兩個按鈕難以分辨
已改用 XRCC Library 的按鈕：主要操作用 Primary（紫色底），次要操作用 Secondary（灰色外框），層次清楚。現在 S3 自動嘗試下一個場景，兩個按鈕移到 S3b（Try again 為 Primary，Close project 為 Secondary）。

## 0b · S3：文案不清楚，首個場景失敗應嘗試其他場景
已按建議修改：首個場景載入失敗時，會自動嘗試下一個場景（S3 顯示「Trying scene 2 of 16」）；任何一個場景成功，即進入專案，其餘在背後繼續載入。只有 16 個場景全部失敗，才顯示 S3b「None of the 16 scenes could be opened」。

## 1 · Board 02：22%、進度條、8 of 36 重複
同意，已刪除 22%，只保留一條進度條和「8 of 36 assets ready」。進度單位統一為 assets（所有場景內的圖片、圖示、音訊、waypoint、影片等）。空出來的位置改為說明「現在可以做什麼」，例如「Scenes 1–8 are ready to edit」。

## 2 · Board 02：參考 checklist，一眼看到各場景狀態
謝謝參考。我們沒有另加一份清單，而是把底部的場景列直接當作 checklist：每個縮圖顯示 Ready、載入中（附該場景的資源數，例如 5 of 8 assets）、In queue、1 file missing 或 Couldn’t load。這樣不用在兩個地方看同一件事，也不會遮住畫面。失敗時的詳細清單在 Review 面板（Board 07）。

## 3 · Board 01：pill 顯示正在處理的場景
現在正在載入的場景會直接在場景列標示（縮圖顯示進度），展開卡片亦會顯示「Scene 9 of 16」。pill 本身保持簡短，改為以狀態為先：載入中、有缺失檔案（2 files missing · Review）、完成（All assets ready，數秒後消失）。

## 4 · Board 03：New scene 鎖定狀態不明顯
已新增鎖定外觀：去除紫色底，改為停用底色、虛線框和鎖頭圖示，與可用狀態一眼可分（Board 04）。hover 會說明「New scene unlocks when loading finishes. 28 assets left.」。想確認：載入期間新增場景，技術上是否真的必須鎖定？如果不需要，我們可以直接開放。

## 5 · Board 06：「scene failed」如何定義
改為以「檔案」計算，並註明影響範圍，例如「2 files are missing」、「Lobby-tour.mp4 · Scenes 4 and 10」，而不是把共用檔案算成多個場景失敗。分兩級顯示：
- 場景內的檔案缺失：場景仍可開啟，缺失元素以佔位顯示，縮圖標示 amber「1 file missing」（Board 11）。
- 場景本身（360 圖片或影片）載入失敗：場景不能開啟，縮圖顯示紅色「Couldn’t load」。

想確認：後端能否區分這兩種失敗？共用 asset 失敗時，是否所有使用它的場景都受影響？

## 6 · Board 07：彈出失敗清單；Asset Panel 能否開啟
已加入：卡片的「Review」開啟失敗清單（Board 07），列出檔案名稱、類型、受影響的場景和原因（Timed out、File not found），每項可 Retry 或 Replace…，亦可 Retry all。設計上希望 Asset Panel 在載入中和出錯時都可以開啟，失敗項目置頂。想確認：載入或匯入期間，Asset Panel 技術上能否開啟？Replace… 是否可以直接開啟 Asset Panel 的檔案選擇？

## 7 · Board 11：失敗場景令 waypoint 連接的場景無法到達
好提醒。這一輪先不做，已記錄為 backlog。如果後端的可達性檢查可以在載入完成後提供結果，日後可在場景列為受影響的場景加上「Unreachable」標示。想確認這個函數之後能否提供給前端使用。

## 8 · Board 11：不應強制修好所有問題才可 Play
同意，已改：載入結束後，即使仍有缺失檔案，Play、Edit、Save 全部開放，不必先修好缺失檔案。經開發團隊反映，載入期間同時使用 Play 與 Save 可能造成 Lag 或 bug，因此暫時維持鎖定：載入期間 Play 與 Save 停用，hover 會說明「Play and Save unlock when loading finishes」（Board 03）。已載入的場景仍可編輯。想確認：若日後開放，載入期間 Play from current scene 與 Save 在技術上是否可行？部分檔案缺失時，Play 對缺失元素的處理（略過或顯示佔位），以及 Save 是否保留對缺失檔案的引用？
