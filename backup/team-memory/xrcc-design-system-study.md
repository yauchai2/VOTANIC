---
name: xrcc-design-system-study
description: Where the 2026-10-08 XRCC Figma design-system study, UI workflow playbook and component-key table live, plus key findings and Alan's rules for Figma access
metadata:
  type: reference
---

Study of XRCC (PC) Library + ⭐20251125_XRCC4.0_PC_UI done 2026-10-08, files in /mnt/project-files/design-system/ (study, workflow playbook, component keys). Library = 3 variable collections (Primitive/Theme Dark+Light/System), ~45 component sets, 312 icons, no text/effect styles; PC UI file has 25 text + 10 effect styles, no variables. Primary button = purple/700 bg + purple/100 text. No status/warning token exists (amber only as primitive).

**Why:** future UI work should use Alan's components/tokens/variables; gaps and open decisions are listed in the playbook §5/§7.
**How to apply:** Light mode is rarely used (Alan, 2026-10-08) so always build in Dark. Read the playbook before building UI. Alan's rule: reading Figma and creating new files/reports is free; modifying existing Figma or other existing content needs his approval first; Notion stays read-only. Figma use_figma read-only scripts work for enumeration (collections, components). Related: [[votanic-xr]].

**Update 2026-10-08:** Alan now allows editing the Library when it helps ("如果有需要優化,可以改Library"). Policy: additive changes directly, then list the diff; deletions/renames/value changes listed for his OK first. Added status/warning/* to XRCC Theme (unpublished until Alan publishes). Pilot screen lives in XRCC Claude Workbench (ZBOB48n4eLsZABCTnhh5kk), frame 4:995.

**Correction 2026-10-08:** Text Input heights 28/36/48 are intentional (Alan). Do NOT add a 40 size; use Medium 36 with Medium buttons (36). Notion's "Input 40" yields to the Library. I had added then removed 8 size=40 variants in the Library.

**Update 2026-10-08 (heights):** Alan unified Button + Text Input heights: Large 48 / Medium 36 / Small 28 (unpublished at time of check; published Button Large was still 40). Follow Library over Notion's 40. status/warning/* is now published and used in the Workbench pilot.

**Decision 2026-10-08:** Tooltip → follow the existing Figma file, Notion's Tooltip spec is outdated. Library changes are logged in /mnt/project-files/design-system/20261008-library-change-log.md (descriptions cleaned, State/Type property renames, stray Tabs instance removed). Alan approved the cleanup list generically ("批准").
