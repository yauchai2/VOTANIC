---
name: backup-routine-approval-and-weekdays
description: Daily VOTANIC backup routine is pre-approved (copy, secret scan, push to backup/project-memory, Drive update) and should skip Saturday and Sunday
metadata:
  type: feedback
  modified: 2026-10-25T12:54:53.878Z
---

Alan (2026-10-25): approved the 每日 VOTANIC 記憶備份 routine after the auto-mode classifier blocked the secret scan and the copy into `backup/` ("批准，照做。之後都唔使我批准照做"). He also said weekends are not needed ("星期六日唔需要").

**Why:** The routine is his own scheduled backup, so he does not want to be asked each run. Weekends have no meaningful changes.
**How to apply:** On Monday to Friday, run the backup straight away without asking for approval. On Saturday and Sunday, skip the run and just report that it was skipped. Still never write secrets or credentials, never touch main, and never delete Drive files.

**Drive limit (found 2026-11-05):** the Google Drive connector's `update_file` only changes metadata (title, parent, star), it cannot overwrite file content. So the four main Drive files (HANDOVER-README.md, MEMORY.md, INDEX.md, UPGRADE-NOTES.md in folder 1UQlKexLY49G2pmu09ZcFhecF4CyH91C5) stay at their 2026-10-21 version. Creating duplicates would clutter and deleting is forbidden, so each run only creates the dated snapshot folder with a fresh HANDOVER-README.md. The full, current backup lives in the GitHub `backup/project-memory` branch.
