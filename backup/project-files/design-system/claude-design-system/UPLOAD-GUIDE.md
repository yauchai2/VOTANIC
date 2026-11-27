# 點樣將 XRCC 放入 claude.ai「設計系統」

我冇辦法代你喺 claude.ai 設定入面撳「新增設計系統」，因為呢個操作要喺你自己嘅帳戶登入；我嘅環境亦未有設計系統嘅登入授權。所以我預備咗成包內容，你按下面做就得。

## 步驟
1. 打開 claude.ai，去「設定」，再去「設計系統」，撳「新增設計系統」。（畫面名稱可能同我描述有少少出入，以你見到嘅為準。）
2. 名稱填：`XRCC (PC) Design System`。
3. 如果有 Figma 連結欄位，貼呢兩條：
   - Library：https://www.figma.com/design/De8nKqO81yciw4wH5xfpxA/XRCC--PC--Library
   - PC UI：https://www.figma.com/design/7SMhpQ4IVhnlA6G6wfwAgO/XRCC4.0_PC_UI
   （想包括 Debug Panel 範例，可以再加 Workbench：https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk/）
4. 上載檔案：將 `claude-design-system.zip` 解壓後，整個資料夾上載（或者逐個上載 `README.md`、`SKILL.md`、`colors_and_type.css`，再加 `preview/`、`ui_kits/`、`reference/`、`assets/`）。
5. 「其他說明」欄貼 `NOTES-TO-PASTE.txt` 嘅內容。
6. 提交後，等 Claude 生成預覽，再按下面「檢查清單」睇一次。

## 檢查清單（生成後）
- 底色係紫調深灰（`#1e1e21` / `#161616`），唔係純黑。
- 主按鈕係深紫底 `#392e52` 加淺紫字，唔係亮紫實心。
- 字體係 Roboto，冇出現 Univers / Source Sans。
- 試叫 Claude 做一個畫面（例如 Launcher Packages 空狀態），睇文案係咪英文、動詞加對象、有冇「Something went wrong」。
- 有問題嘅話，叫我改 `README.md` 或 `colors_and_type.css`，再重新上載。

## 已知限制（請留意）
- 圖示：預覽用嘅係替代圖示；Figma Library 嘅真 icon 要靠 Figma 連結匯入，或者你另外匯出 SVG 上載。
- 淺色模式、簡體字體、Voyage360、XR/CAVE/HMD 係刻意冇包括。
- Library 嘅 Primitive 色板冇對外發佈，所以 token 係由 Theme / System 讀出嚟，數值已核對。
- 我今次冇改任何 Figma 檔案。
