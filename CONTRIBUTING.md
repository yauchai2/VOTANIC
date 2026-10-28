# 工作流程（單人版）

呢個 repo 只有一個人用，所以流程盡量精簡：`main` 永遠穩陣，每件事開一條 Branch，用 PR 合併。

## 基本原則

- 唔好直接 push 去 `main`，所有改動都經 Branch 同 PR。
- 一條 Branch 只做一件事，Commit 細細個、常常 commit。
- 合併用 Squash merge，`main` 每個 PR 只有一個 Commit，歷史易睇。
- 合併後刪走 Branch。
- 唔好 force push 去 `main`。
- 唔好 commit 密碼、token、API key 或任何私人連結。

## 特別 Branch

- `backup/project-memory`：每日自動備份專案記憶用，**唔好手動改、唔好刪、唔好合併入 `main`**。

## Branch 命名

格式：`類型/簡短描述`，用英文小寫加 `-`。

| 類型 | 用途 | 例子 |
| --- | --- | --- |
| `feat/` | 新內容或新功能 | `feat/debug-panel-flow` |
| `fix/` | 修正錯誤 | `fix/token-typo` |
| `docs/` | 文件、筆記、報告 | `docs/typography-audit` |
| `chore/` | 整理、設定、雜項 | `chore/github-workflow` |

## Commit 寫法

- 第一行簡短講做咗乜，英文用動詞開頭（`Add`, `Fix`, `Update`, `Remove`），中文直接寫動作。
- 一個 Commit 只做一件事。
- 例子：`Add debug panel flow handoff`、`Fix spacing token names`。

## PR 流程

1. 由最新 `main` 開 Branch：`git checkout -b docs/xxx origin/main`
2. 做改動，細 Commit，push 上 GitHub。
3. 開 PR（會自動出現 template），寫低「改咗乜」同「點驗證」。
4. 自己睇一次 Files changed，確認冇誤加檔案或敏感資料。
5. Squash and merge，然後刪 Branch。
6. 本機同步：`git checkout main && git pull`。

## 小提示

- 未做完可以開 Draft PR，做完先轉做 Ready。
- 大改動前先開 Branch，唔好喺 `main` 上試。
- 打錯嘢唔使驚，Branch 上隨時可以改，`main` 唔受影響。
