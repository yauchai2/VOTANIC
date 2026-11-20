# Runtime Debug · Log tab：重複數據處理建議（2026-10-27）

## 問題
同一個變數高頻更新（例如 Timer 每 0.1 秒一條），Log 被一類數據洗版，User 要 scroll 好耐，亦好難搵到其他變數嘅變化。

## 方案
1. **連續更新自動合併（預設開）**：同一變數連續更新合成一行，顯示名稱、x 次數、首值 → 尾值、最新時間同「from 開始時間」。單條變化照舊。
2. **展開睇細節**：點整行展開，內部固定高度滾動區（有 scroll bar）列出全部取樣，唔需要 Show more 分頁；dev 要做虛擬列表。注意外層列表同內層滾動區會有雙重滾動，所以限高約 5 行。
3. **Pause / Resume**：暫停即時更新，列表凍結；banner 顯示「37 new updates are waiting」，Show new 或 Resume 先補返。
4. （已撤回）Pause、Mute、chips 屬額外功能，Alan 認為展開箭咀已足夠，暫不做。
5. **Filter chips**：Group repeats（開關）、Pinned、Muted + 總數。Search 照舊。
6. **Pin**：重要變數釘喺頂部，唔受合併影響（今次只示意 chip，未出畫面）。

## 取捨
- 合併會令「逐條時間線」變抽象；所以保留展開同 Group repeats 關閉返逐條模式。
- 取樣只列最新 5 條，唔係全部；要完整數據應該用 Export（待 dev 確認）。
- Mute 只影響 Log 顯示，唔影響 Watch / 實際記錄（要同 dev 確認係唔係仍然入 history）。
- History limit（500）以合併前嘅更新數計定合併後嘅行數計，要 dev 決定。

## 優先次序
P0：自動合併 + 展開；Pause / Resume。
P1：Mute、Filter chips。
P2：Pin、Show more 逐批載入、取樣數量可調。

## Figma
Workbench 檔 Log tab section（451:2652）新增 Board 7a 至 7d；元件 Debug Log Group / Sample / Group Footer 喺 Components page。
