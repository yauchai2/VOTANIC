---
name: voyage360-loading-enhancement-decisions
description: Current decisions and board map for the Voyage 360 Loading Enhancement redesign (state as of 2026-11-10); assets as unit, Play/Save open while loading, stage checklist
metadata:
  type: project
  modified: 2026-11-10T09:34:52.337Z
---

Figma file KoJQjDPM4sjwsoMYEvCDkw, page "Voyage 360 Loading Enhancement" (6299:12901), outer section 6393:91092. Reviewer comments by unity4 (dev). Web prototype: prototypes/voyage360-loading, draft PR https://github.com/yauchai2/VOTANIC/pull/8, keep in sync with Figma. Paste-ready comment replies: /mnt/project-files/reports/20261109-voyage360-loading-comment-replies.md (Claude cannot post Figma comments).

Settled decisions (Alan):
- Progress unit = assets ("8 of 36 assets ready"; 36 = every asset in all scenes plus unused ones). One bar, no percentage.
- Look past the surface of comments to the real problem; big changes allowed.
- Scene row is the per-scene checklist (Ready, Loading with asset count, In queue, amber "1 file missing" = scene still opens, red "Couldn't load" = 360 image failed). Default view is the collapsed pill.
- Loading Card lists loading STAGES only (unity4 idea, 2026-11-10): "Scenes · 3 of 16 ready", then "Unused assets · In queue". Assets not used by any scene load last. Add stage rows only when dev names real processes.
- Play and Save stay OPEN while loading (2026-11-10, final after a short lock): in Play, unloaded assets show as XRCC-style placeholders with a top notice; background loading pauses during Play and resumes on exit (pill shows "Loading resumed"). New scene stays locked until loading ends (lock style, tooltip). After loading ends everything unlocks even with missing files.
- Missing files are counted per file with affected scenes; Review dialog (XRCC Dialog) offers Retry, Replace… (Asset Panel filtered to Missing), Retry all; in-scene amber placeholder opens a dialog on click.
- Asset Panel can open while loading; tiles reuse the scene-row states.
- Information review (2026-11-10, Alan asked to trim duplicates): each fact appears once. Pill = asset count; card = stages plus "New scene unlocks when loading finishes."; footer = one line ("Scenes 1–3 are ready to edit", "2 files missing in 3 scenes", "All 36 assets ready"); tooltips do not repeat counts shown elsewhere. Keep this when adding copy.

Board map (01–16, no letters): section 1 S1, S2, S3, S3b; section 2: 01 collapsed, 02 card expanded, 03 hover New scene, 04 Asset Panel while loading; section 3: 05 hover Play, 06 Play while loading, 07 back from Play; section 4: 08 finished with missing files, 09 expanded, 10 Review, 11 Asset Panel Missing filter, 12 after Replace, 13 all ready; section 5: 14 scene with missing file, 15 click placeholder, 16 hover scene. Alan removed the "More states" boards himself; do not re-add them.

Components (LOCAL, in section 6545:1916 on that page, no Publish needed; Alan allowed new ones 2026-11-10): Loading Card, Pill, Scene Thumb, Status Bar (footer), Placeholder (Missing / Not loaded yet), Loading Asset Tile (Loading / Queued / Missing), Review Row (icon swap). Use instances, not frames, on boards.

Open dev questions: can loading pause during Play and resume; load a scene on demand when reached by waypoint in Play; does Save keep references to unloaded or missing files; must New scene be locked; can Asset Panel open while loading; other loading stages.

**Why:** avoid re-asking Alan settled decisions.
**How to apply:** follow these when touching the Loading boards or the prototype.
