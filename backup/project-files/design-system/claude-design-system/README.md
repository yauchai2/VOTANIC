# XRCC (PC) Design System

Design system for **XRCC**, the XR authoring tool by **VOTANIC** (Hong Kong). This package lets Claude design screens, slide decks and prototypes that look and read like XRCC on PC (Launcher, Editor panels, dialogs, Runtime Debug). It was built from the Figma library and the team's own studies, not from guesses.

**Dark mode only.** Light values exist in Figma but are not used. Do not design in Light.

## Sources (read 2026-10-16)
- Figma **XRCC (PC) Library** `De8nKqO81yciw4wH5xfpxA` (variables, 13 text styles, 10 effect styles, 45 component sets, ~330 icons). This is the source of truth for every token here.
- Figma **⭐ 20251125_XRCC4.0_PC_UI** `7SMhpQ4IVhnlA6G6wfwAgO` (legacy all-in-one: screens, panels, flows, product components). Reference only. Old screens (2.1 to 3.1) are not a style guide.
- Figma **XRCC Claude Workbench** `ZBOB48n4eLsZABCTnhh5kk` (current working file, Runtime Debug · Manage debug items is the best finished example), **XRCC Launcher** `18RvTL8PypmNuZIszfSRMV`, **XRCC4.0 Assets Panel** `OX57GAX6iYmsxNhO5bzMqD` (the "fun" reference: thumbnails, three columns).
- Not covered by this system: Voyage360 (separate colour system), XR / CAVE / HMD library (component-first naming, different tokens), in-scene "diegetic" UI such as the AI Quiz Object. Do not mix their tokens into PC screens.

## Products and surfaces
| Surface | What it is |
|---|---|
| Launcher | Home, Projects, Content Library, Packages, Connections, Settings. Rail on the left, big rounded main panel. |
| Editor panels | Floating dark panels over the 3D scene: Inspector, Assets, Behaviour, Debug. 8px from the window edge. |
| Dialogs and toasts | Title bar, large line icon plus plain sentence, Cancel plus one action. Toasts top-centre with an orange progress line. |
| Documents | Specs and flows: VOTANIC logo top-left, Projects / File name / Date, "XRCC 4.0 UI" top-right, annotation circles. |

Start with `ui_kits/xrcc-pc/debug-panel.html` (interactive) and `launcher.html` (concept), then `preview/` for each token and component.

## Content fundamentals
- **English first.** All XRCC UI copy is English. Use Chinese only when explicitly asked, then Traditional Chinese (zh-TW) with Noto Sans TC and the team glossary (物件, 專案, 行為, 獲取, 設置, 儲存, 傳送). Cantonese slang is for marketing only, never UI.
- **One human voice**: plain, warm, specific. Real names and numbers ("Biology Notes v2 · 3 files linked", "Edited 2h ago on this PC"). Never lorem ipsum, "Item 1" or "Something went wrong".
- **Say what happened, then the consequence (with a number), then the next step.** "Asset failed to import. 2 files are over 200 MB. Compress them or pick smaller files."
- **Buttons are verb + object**: Open Biology Notes, Retry connection, Delete anyway, Scan again. Never OK, Submit, Confirm alone.
- **Honest status words only**: Saved locally, Queued, Accepted, Delivered, Failed, Connected, Needs a package update. Never infer "abandoned", "passed" or "away". No fake online counts.
- **Playful only at low stakes** (empty states, first success, loading). Plain in destructive, data, billing and error dialogs.
- Punctuation: English comma plus a space. Chinese text uses full-width punctuation (，。；！).
- Empty state formula: line icon + bold title ("No debug items yet") + one grey sentence + one action. Never two lines of grey text alone.

## Visual foundations
- **Colour**: purple-tinted dark neutrals. Canvas `#1e1e21`, panel `#161616`, header and rails `#2a2531`. Never pure black, never blue-grey slate. Primary action is a **deep purple block `#392e52` with light purple text `#b89afa`**, not a saturated purple button. Names you can click and section labels use `text/accent #b89afa`. One Primary per decision area.
- **Status**: green success, amber warning, red error (text `#ff453a`, fills `#a32929`), blue info. Tinted backgrounds are the colour at 15%. Behaviour block colours (olive, magenta, indigo and so on) belong to the behaviour editor only.
- **Citrus orange** (`#f9ac2f`) is a tiny accent inherited from the old design: toast progress line, selected outline, divider, "new here" hints. Two uses per screen at most, never a button, never a large area.
- **Gradient** (magenta to cyan) is only the active pill in the Assets Panel and marketing heroes. No gradient cards or text.
- **Typography**: Roboto. Heading xl 32/40, lg 24/32, md 20/28, sm 18/24 (Bold); body lg 16/24, md 14/20, sm 12/18 (Regular and Bold); caption 11/16. Display 2xl 48/56, 3xl 64/72, 4xl 80/88 are for docs, concept covers, onboarding and empty-state heroes only. Real application UI stays restrained: biggest to smallest about 1.7 : 1. Docs and heroes can go 3 : 1 or more. No letter-spacing. All caps only for short eyebrows.
- **Spacing**: 4px base (0, 2, 4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 48, 56, 64, 72, 80). Window side margin 32 (min 24), header to title 24, title to content 24, two big columns gap 48, label to input 8, form group 16, card gap 16, row gap 8, buttons to window bottom 32. Section gap must be larger than component gap.
- **Radius**: 8 for controls, 16 for dialogs, cards and panels, 4 for tags and compact bits, 10 for notifications, full for pills.
- **Control heights**: Large 48, Medium 36, Small 28 for Button, Text Input and Select. Tabs and segmented 32 to 40, tag 20.
- **Elevation**: five shadow levels, dark (`--shadow-1` to `--shadow-5`). Dialogs use level 5. Panels use a 1px `border/default` instead of a shadow.
- **Layout**: content first. Visual things (assets, projects, scenes) are thumbnails and cards, not tables. Stable shell: rail left, content middle, status right or bottom. Floating tools 8px from the edge over the scene. Not a full-bleed white-margin dashboard.
- **Icons**: outline, 24px grid, `size/icon` 12 to 48. Solid only for active or emphasis. Large empty-state icons 48 to 96px, single colour. Icon colour binds to the same token as the text beside it in every state.
- **Illustration**: 3D orange octopus astronaut mascot and neon isometric tutorial art in Launcher and Home; line illustrations in Assets Panel. No stock vector people. If no asset exists, use a line icon and mark the slot "illustration to come".
- **Motion**: ease-out, 100 to 150 ms for hover and tooltip fade, 500 ms for chips appearing, toast progress line as its own timer. No bounce, no parallax.
- **States**: draw Default, Hover, Selected, Disabled, Loading, Failed and Empty wherever they apply. Disabled primary buttons explain why on hover.
- **Responsive**: build with Auto Layout thinking: Hug/Fill/min-max, deliberate truncation (single-line names end with …, messages wrap to 2 lines then …). Check narrow 1000, default 1440, wide 1920. Design frame 1922×1080.

## Components (essentials)
See `reference/components.md`. Always prefer the A-generation components (`Button / Dark / *`, `Form / Dark / *`, `Dialog`, `Notification / Dark`). Generic lowercase ones (alert, avatar, menu-item, table) are kit-derived: use them when nothing else fits and check the colours.

## Patterns
Rail with Launcher-style active state (purple tint plus 3px left bar, solid icon), continue band, project card (cover, name, activity line, honest status badge), quick switcher (Ctrl K), nearby-devices panel, segmented panel tabs with count pills, W/L toggles, collapsible summary row, state matrix, toast with orange progress line. See `ui_kits/` and `reference/patterns.md`.

## Known gaps (do not invent around them, say so)
- No Pressed variant on Button, so pressed uses the Focus look. No Focus/Hover on every control yet.
- `text/subtle` `#818181` is only 4.2:1 on canvas: captions and meta, never important copy.
- Icon sprite in `ui_kits/xrcc-pc/icons.js` is a stand-in for the Figma icons (names listed in `reference/icons.md`).
- Light mode, Simplified Chinese font, XR/CAVE/HMD tokens are intentionally out of scope.

## Index
`colors_and_type.css` all tokens · `SKILL.md` how Claude should use this system · `preview/` token and component cards · `ui_kits/xrcc-pc/` Debug Panel and Launcher plus `xrcc-ui.css` · `reference/` component, pattern, icon and rule details · `assets/` logo and 96px icons.
