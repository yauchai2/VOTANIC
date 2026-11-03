# Voyage 360 Loading · 鎖定規則與 GitHub prototype 同步清單（2026-11-03）

## 規則（Alan 已同意）
1. 專案一律先從本機載入，不依賴網絡。本機載入未完成（載入中、失敗、Skip for now 之後仍有未載入的場景）：Play、Edit、Save 全部鎖定，tooltip：「Finish loading to play, edit and save.」。
4. Pill 與 Card 的「36」代表 assets（場景及其他資源），文案使用 "assets"。

## Figma 畫板對應
- 01、02、03、07（載入中）、04、04b（失敗）、08、08b（Skip 後）：Play、Edit、Save 鎖定。
- 06：全部載入完成。

## GitHub prototype 需同步的變更
1. Skip for now：不再解鎖 Save；只收起卡片，Play、Edit、Save 維持鎖定。
2. 鎖定時 hover 或 focus Play、Edit、Save，統一顯示 "Finish loading to play, edit and save."（附剩餘 assets 數）。
3. 已移除離線及「無 scene」情境：請刪除 N、O、E 模擬鍵、Offline 的 Pill／Card、empty project 畫面及 "Add a scene to play, edit and save." 文案；保留 F、A 鍵。
4. S3 "Open without Lobby" 保留，改為進入編輯器（01），其餘場景繼續載入，Play、Edit、Save 鎖定。
5. 文案：Loading scenes → Loading assets；8 of 36 scenes ready → 8 of 36 assets ready；All 36 scenes ready → All 36 assets ready。
6. Card 標題列整條可點擊收合；Pill 整條可點擊展開；Scene Map／Outline 補 hover。
