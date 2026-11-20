---
name: feedback-auto-check-prototype-annotations-overall
description: After any Figma change, Alan expects Claude to self-check prototype links, annotations, flow lines and the overall file without being asked (2026-10-29)
metadata:
  type: feedback
---

Alan (2026-10-29, Runtime Debug W/L disabled thread): "我叫你做野, 你自動check埋prototype, annotation, 整體等等".

**Why:** each change (clone boards, swap states, add flow) left stale reactions, dangling flow lines, outdated notes and annotations that he had to find himself.
**How to apply:** after every edit, before reporting: (1) scan NAVIGATE reactions for missing destinations (CHANGE_TO targets live on the Components page, so do not count those as broken); (2) check flowStartingPoints copied by clones; (3) clear inherited hover reactions that undo a new state; (4) review annotations and Notes on touched or cloned boards for outdated text; (5) remove dangling flow lines and labels after any board is deleted; (6) screenshot and audit unbound fills; (7) when Alan says a board is "暫時唔要", revert that board only, keep the rest. Related: [[debug-feature-new-boards-rules]], [[feedback-delete-irrelevant-annotations-when-copying]].
