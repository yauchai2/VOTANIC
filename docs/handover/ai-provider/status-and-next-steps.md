# AI Provider：進度與待辦

## 已完成

- 設計準備簡報、Notion 摘要、prototype 影片與舊 UI 清單（2026-11-05）。
- Figma 全流程初版與元件（Workbench `1354-2549`），團隊審閱 11-06 的修改（Models、Tabs 次序、Voices 推薦與搜尋等）。
- 審閱 v1（11-13）12 項：已改項目與設計決定見 `decisions-and-rules.md` 第 2 節；原始處理表見 `reports/20261113-ai-provider-review-dev-confirmation.md`。
- 單一 key 與移除 Voice clone（Alan 11-13 確認）已改 Figma。
- Web prototype：#6 首版、#9 審閱 v1 同步。

## 未完成（建議次序）

1. Figma：Add AI key（D2）中已有 key 的 Provider 變灰。
2. Figma：B4b、A4 標為 Obsolete，待 Alan 決定是否刪除（刪除須先問）。
3. Figma：新畫面（A3d、D0、D1、D1b）補 `Flow connectors`、Label、原生 Annotations；依 `1333-8666` 量度。
4. Figma：D2、D5–D8、E4、E5、M5、M6 的舊 Connections 背景，待 Connections 範圍確認後同步。
5. Figma 全部自檢（READ-FIRST 第 13 節）後，請 Alan 檢視。
6. Alan 確認後才同步 prototype：單一 key、移除 Voice clone fallback、D2 變灰、所有 hover 與 tooltips；用 1440、1280、1024 寬度截圖檢查 responsive；更新 PR 並維持同一預覽連結。

## 待 Developer 確認（勿自行假設）

1. Custom Provider 的欄位：現有 Name、Base URL、API key（選填）、Model name、Advanced（請求格式、逾時 30 秒）；是否需要 Header、Auth 方式、多個 Model、Task 對應；Model name 是否必填。
2. Voice preview 行為：是否每次把預覽句送往 Provider、是否一次只播一個。
3. 有無「Profile」層（一組任務設定打包）；現設計沒有。
4. Connections 範圍是否含 MCU 等其他連線。
5. 「description 未必合適」所指的是哪一句；各任務準確描述。
6. 「Speech to text」是否即 Transcription，或是另一個任務。
7. 各 Provider 的 task 支援矩陣、OpenRouter 是否屬 P1、Config 託管位置（NAS 或 GitHub）、MiniMax voices 取得方式、Wit.ai 是否併入新架構、Custom 可做哪些驗證。

## 提醒

- Library 有改動時提醒 Alan Publish；沒有改動寫明不需要。
- 工作紀錄寫入 `design-system/20261008-library-change-log.md`。
- Alan 說出新規則或更正時，同一回合更新 READ-FIRST 與對應記憶檔。
