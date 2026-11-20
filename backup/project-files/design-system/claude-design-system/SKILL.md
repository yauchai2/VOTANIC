---
name: xrcc-design
description: Design XRCC (VOTANIC) PC interfaces, decks and prototypes in the XRCC dark visual language: Launcher, editor panels, dialogs, Runtime Debug, specs. Use for any XRCC screen, slide or HTML prototype.
---

# Using the XRCC design system

1. Read `README.md` for voice and visual rules. Import `colors_and_type.css`, and `ui_kits/xrcc-pc/xrcc-ui.css` plus `icons.js` for components.
2. **Dark only.** Bind every colour to a semantic token (`--surface-*`, `--text-*`, `--border-*`, `--action-*`, `--status-*`). No raw hex, no new tokens. Palette `--p-*` is reference, not for UI.
3. Pick the closest pattern first: Launcher shell (`launcher.html`), floating panel with segmented tabs (`debug-panel.html`), dialog, toast, empty state. Copy structure, then change content.
4. Copy is English, specific, real-sounding. Buttons verb + object. Errors say what happened, the consequence, the next step. Status words: Saved locally, Queued, Accepted, Delivered, Failed.
5. One Primary button per decision area (deep purple block, light purple text). Destructive is the red block with white text, only for delete or remove. Amber for warning, red for error, never for decoration. Citrus orange at most twice per screen.
6. Sizes: controls 48 / 36 / 28. Radius 8 controls, 16 dialogs and cards. Spacing from the 4px scale. Window side margin 32.
7. Visual content (projects, assets, scenes) is thumbnails and cards, not tables. Add one touch of personality on important surfaces (illustration slot, activity line, a human empty-state sentence).
8. Typography: restrained in product UI (heading/sm to heading/lg for titles). Bold display sizes only in documents, covers, onboarding and empty-state heroes, with a small muted line beside them.
9. Draw states: default, hover, selected, disabled, loading, failed, empty. Show long-text behaviour (single-line … truncation) for list rows.
10. Before delivering: no pure black, no gradient cards, no lorem, no "Something went wrong", no invented state, contrast of important text at least 4.5:1, icon colour matches its text. Check 1000, 1440 and 1920 widths.
11. Out of scope: Light mode, Voyage360, XR/CAVE/HMD tokens, diegetic scene UI. Say so if asked.
