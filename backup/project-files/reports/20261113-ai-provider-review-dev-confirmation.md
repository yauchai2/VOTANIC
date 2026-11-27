# AI Provider UI：審閱意見處理結果與 Developer 確認清單

日期：2026-11-13　來源：「AI Provider review_v1.docx」（共 12 項）

## 一、已直接修改（Figma 已更新，Prototype 已跟隨）

| # | 意見 | 處理方式 |
|---|------|----------|
| 1 | 不應教人用 VPN | 全部移除 VPN 提示（Add provider 對話框、Provider 卡片、Launcher 連線設定、Tooltip）。連線失敗改為「Couldn't reach Gemini / Check your network connection, then test again.」 |
| 3 | 密碼只打一次 | 所有密碼欄（Add key、Change password、Unlock key）右側加入顯示／隱藏按鈕，不設「確認密碼」欄。 |
| 4 | 「Locked」不直觀 | 改為「Password needed」；按鈕由 Unlock 改為「Enter password」；對話框標題改為「Enter your Poe key password」。 |
| 5（顏色部分） | Connected 狀態灰色 | 已連接的供應商方塊不再灰化，改為綠色勾號加「Connected」，滑鼠停留提示「Already connected. Manage its keys on its provider card.」（Figma 新增 A3d 畫面）。 |
| 6 | 說明句多餘 | 移除「Paste one from Google AI Studio…」（該句對 OpenRouter 也寫錯成 Google AI Studio），由下一步的連結負責。 |
| 10（quota 部分） | 不必提及 quota | 所有 Voice preview 說明及 Tooltip 已移除 quota 字眼。 |
| 12 | Needs Poe 備註不清楚 | 任務卡改為「Enter your Poe key password」；「Transcription」改名為「Speech to text」（假設審閱所指的 Speech to text 即此項）。 |

## 二、設計決定（Alan 授權由 Claude 建議並已套用）

**第 2 項：日後新增 AI Provider 的排版。**
採用「自動換行的方塊網格」：每個供應商是一個方塊，新增供應商只多一個方塊，Custom 固定排最後；超過約 8 個時，在方塊上方加入搜尋欄。理由：現有 5 個方塊已是同一結構，毋須改版；列表式在供應商少的時候反而浪費空間。

**第 8 項：Connections 範圍與列表長度。**
Connections 只顯示摘要：每個連線一行（名稱加簡短狀態），點擊後進入各自的設定面板（頂部有返回 Connections 的連結）。日後加入 MCU 等其他連線，只需多一行。已新增 Figma 畫面 D0（摘要）、D1（AI keys 面板）、D1b（Wit.ai 面板）。理由：長列表混雜不同性質的連線難以掃視，且各連線的設定項目並不相同。

## 三、待 Developer 確認（請勿自行假設）

1. **（Alan 已確認）除 Custom 外，每個 Provider 只有一條 API key。** 非 Custom 的 key 欄改為單一顯示（無下拉），已有 key 的 Provider 在「Add AI key」中不可再選。只有 Custom 可有多條 key。Custom 的 Model name 建議設為必填（可由 /v1/models 提供下拉），仍待 Developer 確認。
2. **Custom Provider 需要哪些欄位？**（第 7 項）目前 Figma 有 Name、Base URL、API key（選填）、Model name，另有 Advanced（請求格式、逾時 30 秒）；Prototype 只有 Name、Base URL、API key。請確認是否還需要 Header、Auth 方式、多個 Model、Task 對應等。
3. **（Alan 已確認：不支援）語音複製（Voice clone）fallback。** Figma 已移除 C6 畫面、所有複製語音卡片及相關文案與連線；C7 的 Unavailable 狀態改為「Voice no longer available」。Prototype 尚待同步。
4. **Voice preview 的行為是否與現行 backend 一致？**（第 10 項）包括：每次播放是否真的把預覽句送到供應商、是否一次只播放一個語音。UI 已不再提及 quota。
5. **有沒有「Profile」層？**（第 11 項）現行設計沒有 Profile，Models 頁是每個任務直接選擇 Provider 與 Model。若之前討論的是 Profile（一組任務設定打包），需要 Alan 與 Developer 確認是否仍要做，以及放在哪一層。
6. **Connections 是否包含 MCU 等其他連線？**（第 8 項）請確認清單，以便摘要頁預留正確的行。
7. **第 12 項「description 未必合適」**：審閱沒有指明是哪一處（推測是 Models 任務卡的一句描述，例如「Turn what visitors say into text」）。請審閱者指出，或由 Developer 提供各任務的準確描述。
8. **「Speech to text」命名**：請確認審閱所指的「漏咗 Speech to text」是否即現有的 Transcription；若是另一個任務，需新增任務卡（現為 6 個任務）。

## 四、仍待跟進（因第 8 項屬待確認，暫未改動）

- Figma 中 D2、D5–D8 以及 E4、E5、M5、M6 的背景仍是舊的合併式 Connections 頁。Developer 確認 Connections 範圍後，再統一同步。
- Add provider 對話框已無 Gemini 的 VPN 提示；Provider 卡片測試失敗時的 Warning 文案適用所有 Provider。
