---
name: feedback-delete-irrelevant-annotations-when-copying
description: When copying an existing UI screen to build a new board, delete the annotations that no longer apply (Alan, 2026-10-29)
metadata:
  type: feedback
---

Alan (2026-10-29, Runtime Debug Watch/Log disabled flow thread): "如果你copy其他UI screens, 記得delete返啲不相關的annotation".

**Why:** copied boards carry over annotations/notes from the source screen that have nothing to do with the new board, which clutters the file and misleads dev handoff.
**How to apply:** After cloning any screen, review every annotation/note/label on the copy; remove or rewrite the ones not relevant, keep only notes describing this board. Related: [[debug-feature-new-boards-rules]].
