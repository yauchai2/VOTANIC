---
name: feedback-self-check-after-edits
description: After any Figma change, automatically check prototype links, annotations and overall consistency (all affected boards) before reporting; don't wait for Alan to ask (2026-10-29)
metadata:
  type: feedback
---

Alan (2026-10-29, Runtime Debug Scenes/Watch-Log thread), after asking to add "All Scene" and fix other screens: "我叫你做野, 你自動check埋prototype, annotation, 整體等等".

**Why:** he had to ask for follow-up checks separately each time (prototype links, leftover annotations, consistency across other screens).
**How to apply:** When applying a change, propagate it to every affected screen, then without being asked check prototype links (no stale hover/click links, no broken targets), annotations (remove irrelevant ones, see [[feedback-delete-irrelevant-annotations-when-copying]]), token binding, flow lines and overall consistency; fix what you find, then report once. Related: [[debug-feature-new-boards-rules]].
