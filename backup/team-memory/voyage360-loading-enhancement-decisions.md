---
name: voyage360-loading-enhancement-decisions
description: Decisions for the Voyage 360 Loading Enhancement redesign (2026-11-09): progress unit is assets, scene strip as checklist, progressive unlock
metadata:
  type: project
  modified: 2026-11-09T07:53:04.154Z
---

Figma file KoJQjDPM4sjwsoMYEvCDkw, page "Voyage 360 Loading Enhancement" (6299:12901). Reviewer comments by unity4.

- Progress unit = assets (Alan, 2026-11-09): "36" means all assets inside all scenes (images, icons, audio, waypoint, video...). Title "Loading assets", count "8 of 36 assets ready".
- Alan (2026-11-09): look past the surface of comments to the real problem; big changes allowed, the goal is good final UI/UX. He approved starting Figma changes on the redesign direction doc /mnt/project-files/reports/20261109-voyage360-loading-redesign-direction.md.
- Direction: scene strip is the checklist (thumb states Ready/Loading with asset progress/Queued/Failed); smaller progress card; pill state-first; progressive unlock (ready scene can Edit and "Play from current scene"; whole Play and Save unlock when loading ends, even with failures); failures counted by file with impact; Review opens a small Recover-List-style panel; reuse lock-icon language from Locked Asset.
- Components: Loading Card/Pill/Scene Thumb are now the LOCAL sets on that page (section 6545:1916); on 2026-11-09 all 60 board instances were swapped off the remote mains (6323:*). Edit the local sets, no Publish needed for this page. New variants: Pill State=Done, Thumb State=Missing files, Scene Card "Add New Scene_locked" (set 1589:36570 on Design Guidelines page).
- Built 2026-11-09: boards 04c (Review missing files, 6563:4112) and 09 (Play from current scene, 6563:4334). Amber = missing file (scene still opens), red = scene couldn't load. Web prototype PR #8 not yet synced to this redesign.
- 2026-11-09 later: 04c and 08 use XRCC Dialog (Warning); new board 10 = Asset Panel filtered to Missing (Replace… target, Cancel→04c, Choose file…→06). Prototype PR #8 synced (commit after 3757137).

**Why:** avoid re-asking Alan settled decisions.
**How to apply:** follow these when touching the Loading boards or the prototype (prototypes/voyage360-loading, PR #8).
- 2026-11-09 final: default is the collapsed pill; boards renumbered 01-12 left to right. Old to new: 04c->08, 09->04, 10->12, 04->06, 04b->07, 03->02, 02->03, 07->05, 06->09, 08->10, 08b->11. Older notes above use old numbers. Prototype demo starts loading at Scene 4; card has scene checklist.
- 2026-11-09: Play button stays purple/enabled during loading; main click = Play from current scene; Play all/VR disabled in menu. Board 03 renamed "Hover on Play while loading". Save is AVAILABLE during loading (Alan chose 2026-11-09; dev must confirm Save keeps references to unloaded assets). Only Play all, VR and New scene wait for loading. Review dialog is centred with scrim; old orphan variable Primary/Sur BG rebound to Voyage surface/base.
- 2026-11-09 (Alan approved review doc items): new boards 10b (placeholder dialog after click), 08b (Retry/Replace result toast), 13 (selected queued scene jumps to front of queue, Play greyed until that scene is ready), 14 (scene whose 360 image failed: Retry/Replace over canvas). Board 10 now shows a dashed in-scene placeholder; dialog only on click. Loading thumb is neutral (no blurred preview). Play menu labels match product: Play in PC, Play from current scene, Play with VR device. Open dev questions: priority loading feasibility, Save with unloaded refs, New scene lock.
- 2026-11-10 (Alan, after dev team feedback that background loading plus Play/Save may lag or bug): Play AND Save are LOCKED again while loading (grey disabled style, tooltip "Play and Save unlock when loading finishes."). This supersedes the 2026-11-09 Save/Play-available decision; it is temporary until dev confirms. Board "Play from current scene while loading" removed (restore from Figma version history if dev approves). Boards renumbered 01-13 left to right with no letters: 04 hover New scene, 05 finished with missing files, 06 expanded, 07 review, 08 asset panel, 09 after replace, 10 all assets ready, 11 scene with missing file, 12 click placeholder, 13 hover scene. Figma section "5 · More states" removed; Overview texts and annotations updated.
