# Standing rules and decisions

## Working rules
- Reply to Alan in Cantonese / Traditional Chinese; reports in 書面語 (avoid 嘅/咗/冇/唔/係/啲). Results first, short.
- UI copy is English-first, short, no filler. Dark mode only, single desktop frame.
- Use XRCC (PC) Library (De8nKqO81yciw4wH5xfpxA) components and existing tokens only; never add tokens.
- Figma is the source of truth: finish and self-check Figma first, then the prototype follows. Log every change in the change log.
- Annotations are Figma native Annotations, Traditional Chinese 書面語, few and precise. Read Workbench node 1333-8666 before adding connections or annotations; follow its connection style.
- Do not touch Alan's Notes sections or copies, or the old UI frame 2071:10529.
- Punctuation: English "," plus space; Chinese full-width punctuation.
- Connected devices are not only phones: UI says "Remote control" and "Devices".
- Never write secrets to memory, GitHub or backups. Keep PR #7 a draft; push only to `claude/project-thread-pddqur`.

## Current Remote Trigger update — 2026-11-17

The user's latest explicit decision supersedes the historical model below: each Trigger button binds exactly one Instance; each Variable control binds one Instance variable or Project variable. Trigger buttons and Variable controls are separate categories, reordered within their own kind.

The requested recommendations are implemented as reviewable proposals: slider throttling at 50 ms plus final release value; success only on XRCC acknowledgement; responsive 3/6/8 columns; structural editing after Stop; stale snapshot refresh; gesture-based sensor permission, one source and confirmed takeover. They are not evidence of released Unity behavior.

Figma selectors are 640×680; sharing windows are 960×680. Select Instance uses highlighted rows without Radio. P1 removes Change/Replace instance: delete the trigger and add it again, preserving Instance/Behaviour. Flow uses short local arrows and explicit event/destination indexes for cross-row references. See [the implementation report](../../prototypes/xrcc-remote-trigger/implementation-20261117.md) for tests, original Artifact publication limits and engineering dependencies.

## Historical Remote Trigger P1 decisions (superseded where noted above)
- Model (2026-11-16): Trigger sections (many instances, one button, colour) versus Variable control sections (exactly one variable); separate pickers.
- Launcher (server control) and XRCC window (join and monitor) are separate: no QR or device list in the Launcher.
- Two entries to the Remote control window: Play popover "Open", and editor "Connect devices".
- No orientation toggle in the Remote List; custom order by drag handle (keyboard: Space, arrows, Esc), within each kind.
- Sensors on by default; C16 "This device" and device rows only show availability; one device uses sensors at a time (Notion spec).
- Public link off by default and ends when Play ends.
- Window size 640x680; row height 44; no phone preview in XRCC editor screens.

## Historical open items (consult the implementation report for current status)
- Figma allows trigger and variable sections to mix; prototype keeps triggers first.
- No visible A1 to B8 flow arrow (prototype link and annotation only).
- Help card icon in Remote Triggers window is still phone-shaped.
- Behaviours, timings and sensor handling are assumptions; check the Notion spec "Remote Trigger Implementation Spec" (read-only).
- Export gap: the thread export covers 2026-11-09 onward; messages from 2026-11-05 to 11-08 are not in it.
