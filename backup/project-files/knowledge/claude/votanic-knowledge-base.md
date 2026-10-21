# Votanic Knowledge Base (from Notion, read-only snapshot)

> Compiled 2026-09-28 from the Votanic Notion workspace (Research Team + VOTANIC HQ teamspaces). Read-only — nothing in Notion was changed.
> Live Notion is always the source of truth. Treat this as a map + summary; re-check the linked page before relying on details.
> Labels: **Confirmed** = stated in a Notion page · **Proposed/Open** = marked as pending in Notion · **Note** = my summary.

---

## 1. Company, team & people

Alan Chan (alan.chan@votanic.com) is the UI/UX Designer who took over from the previous designer, **Lily Wong** (handover page: "UX/UI Design Handover - Lily Wong").

| Person | Role / what to ask them (Confirmed in Notion) |
|---|---|
| **Tobey Ko** (tobey@votanic.com) | Team lead / product owner. Owner of XRCC 4.2 hub, roadmap, workflow & design decisions. Workforce Portal admin contact (sign-in issues, locked records). |
| **Steven Wong** | Handover contact for **XRCC** and **3D Gaussian Splat Viewer** questions. Co-owner of "Create new project" handoff item. |
| **Vincent Chan** | Handover contact for **Voyage360**. Owner of the XRCC Localization Glossary. |
| **Freddie Cheung** | Works with Alan on AI Quiz prototype-vs-design review; co-owner of design handoff items. |
| **Brian Sze** | Auto-organize Behaviour Blocks PoC. |
| **Leon Chow** | OpenAI-compatible AI connection conversion (XRCC 4.2). |
| **Jace Wong** | AI Quiz general QA (2026-06-23). |
| "Thinker" | Working partner on the XRCC 4.2 discovery hub (likely an AI agent persona). |

Other workspace members include Blake Tam, Charles Chan, Cheryl Leung, Danny Ho, Dennis Lam, Happy Sing, Iris Chan, Leith Chan, Manson Chung, Raymond Law, Samuel Ng, Simon Lee, Viola Lo, William Tam, Zoe Chu (roles not documented).

---

## 2. Products

### XRCC — XR Content Creator (main product)
- **What:** Zero-code XR content creation tool (Unity). Users build interactive scenes, add behaviours (visual node blocks), and play across PC, XR headset (HMD) and CAVE. Optional multiplayer via dedicated server.
- **Platforms:** PC (full editor), XR (headset viewer/editor, OpenXR + vGear wand), Server (headless).
- **Program modes:** Home · Edit · Play · Debug.
- **UI tech:** PC editor = Unity uGUI panel stack (`PCUIController`, `PCPanel`); XR = world-space panels, single active panel, ring menu + Quick Access Menu. Launcher uses UI Toolkit.
- **Scale:** ~600 behaviour nodes in 30+ categories; ~30 instance component types.
- **Version history (design view):**
  - 2.0 → 3.0: UI + structure redesign; added Object pop-up panel, drop-down menu, shortcuts panel, asset tag, project info; merged item/entity/scenes panels into one lower-left panel.
  - 3.0: AI focus — Ready Player Me (removed in 4.0), Wit.ai panel, Micro:bit panel.
  - 4.0: connection management — Poe API key, AI Gen ("Create with AI": image, audio, AI character), Item Tag redesign, Microcontroller Connection (BLE + Serial), Connections setup on project open, Premium vs Standard users, XRCC Launcher, PC play with VR headset.
  - 4.0.1: Sketchfab login flow update, Create New Project packages section.
  - 4.1: **AI Quiz** (Quiz Editor, Create with AI, Character Inspector, Project Sources panel). **Released 2026-09-16.**
  - 4.2 (in discovery): **Data Analytics & Connections** (see §5).
- **Tutorial:** votanic.github.io/XRCC_Tutorial

### XRCC Launcher (ContentCreator_Launcher)
Unity 6 Windows desktop hub (1100×691). Manages XRCC versions side-by-side, projects (`.ccdata`), xrcc.io gallery downloads, asset packages, **launch profiles (PC, XR HMD, XR CAVE)**, QLM licensing/trial, connection credentials (Poe keys, Wit.ai tokens, MCU/BLE/Serial, remote trigger IP), and launches XRCC via CLI/named-pipe. Localized en-HK / zh-HK / zh-CN.

### Voyage360 (360 Content VR Tour Builder)
Authoring tool for immersive 360° tours. Elements: Text, Info, Waypoint, Audio, Image, Video (+ InfoBox UI). Features: Element Ring (right-click), per-element Inspector, Asset panel (local + Pexels), Scene setting, Scene panel, Scene Map/Mini Map, Event system, Record/Saved sequence → 360 video export, Auto mode, Play Setting panel. File format `.vad`. **Uses its own design guidelines/library — not XRCC's.**
- Status: Release 1.0 (27 Oct 2025); no design updates since. 2026 Q4 plan: finish Future List (custom mini-map background, scene-node position, delete waypoint in mini map, many-waypoints handling; discuss locking node position). Save-corruption bug fixed (Sep 2026).

### VR CAVE 3D Gaussian Splat Viewer (GSViewer, SDK)
VR & CAVE use; design on hold / in progress. Must fit XR users' usage habits.

### VotanicXR Suite (SDK-Suite)
SDK incl. License Manager (before Launcher, users entered XRCC PC/XR keys here).

### Other project hubs in Notion
HKAPA cineDESK, Intern Projects, CAVE Apps, CAVE Utilities, Ad Hoc Projects, 202609_CUHK Maintenance + XRCC.

### Internal tool — VOTANIC Workforce Portal
votanic-workforce-portal.vercel.app — Microsoft SSO. Leave (working days = Mon–Fri excl. HK public holidays; half-day min), compensation leave (expires 180 days after overtime; migrated balances expire 31 Dec 2026), **weekly Work Distribution** (project % must total 100%; reminder Fri 5 pm HKT), room booking, inventory borrowing. Issues → screenshot + note to Tobey.

---

## 3. Notion map — where things live

Research Team Home rules (Confirmed):
- Has deadline/owner/status → **Work & Planning**
- Belongs to one product/initiative → its hub under **Projects & Product Areas**
- Stays useful after the project → **Knowledge & Documentation → Knowledge base Wiki**
- Meeting record → **Meetings & Decisions** (Research Team Meeting Database)
- Keys, licences, access details → only the tools/credentials section (never copy these elsewhere)
- Keep the teamspace root clean.

| Area | Key pages |
|---|---|
| 🎨 Design & Research | UX/UI Design Handover - Lily Wong · UI Design Workspace · XRCC "Create New" Project UI — Design Handoff · Marketing use materials DBs |
| UI Design Workspace | **XRCC Design handoff database** · Figma UI Design Guideline (keep updated) · Global Figma Function Rules of XRCC (currently empty) |
| 🚀 Projects → XRCC | Runtime Debug Panel — Feature Hub · AI Quiz Related Pages · XRCC 4.2 Data Analytics & Connections hub · Debug window · Replace Asset · Asset Detail Panel · Gizmos Update · World Grid · XRCC Content Library · Test Case Catalogue |
| ✅ Work & Planning | Internal Issue Reporter DB · Development & Planning (XRCC, Voyage 360, VotanicXR SDK, CAVE Apps, Launcher, Daily Review, Retrospective…) |
| 📚 Knowledge base Wiki | XRCC (Unity) docs (Overview, UI, Behaviour, Variables, Networking, Character, Asset Mgmt…) · XRCC Launcher docs · Voyage360 (Unity) docs · VotanicXR Suite · **XRCC Localization Keyword Glossary** · UX-design-documentation-guide · Coding Convention · Build & Release Checklist |
| 🗓️ Meetings & Decisions | research team meeting records (latest: 2026-09-16) |
| Workforce Portal | Guide Index → Staff / Manager / Project Manager / Inventory Master guides |

### Databases worth knowing
- **XRCC Design handoff database** — fields: Task, Status (Draft · Backlog · Designing · In review · Designing R2 · Engineering handoff · Done), Priority P0–P3, Owner, QA ☑, Target update version, Target release, Summary.
- **Internal Issue Reporter** — Type (Suggestion · Issue · Crash/Bug · Documentation · Performance), Priority (Low–Critical), Frequency, Status (New · Viewed · Need discussion · In Progress · Resolved · Closed · Duplicate · Won't Fix), GitHub issue link/number, Version, Log data.
- **Knowledge base Wiki** — tags: XRCC, XRCC Launcher, Voyage360, VotanicXR, VXR1, VXR2, Package Creator, Localization, Engineering, Overview, Reference, Guide, Troubleshooting, Convention, Testing.

---

## 4. Figma

> Full file registry with keys & start nodes: `claude/votanic-workflows.md` → W0. Master index = "All Figma files" table in XRCC (PC) Library (node 17463:26139).

- **Main legacy file:** `20251125_XRCC4.0_PC_UI` — overview of most XRCC PC UI (not AI Quiz) and the XRCC component library. Very slow; **don't add new features here.**
- **XRCC folder:** all XRCC UI reorganised into per-function files (7 Aug 2026), linked to the 4.0 file. XRCC (PC) and XRCC (XR/CAVE/HMD) libraries & guidelines **not finished**.
- Other folders: XRCC research (IA, questionnaire, content-creator study, 2023), Voyage 360 (⭐202502-Voyage 360 UI-PC+VR), SDK (GS Viewer), Brand Design & Print art.
- **File naming:** `YYYYMMDD_<Software version> <function name>` e.g. `20260303_XRCC 4.0 AI Gen Feature (3rd design)`.
- Old XRCC design guideline is obsolete. Designs labelled removed / deprecated / not recommended = reference only.
- Lily's recommendation: finish XRCC (PC) library (4.0) and XRCC (XR/CAVE/HMD) library; create a new UI kit linkable from other Figma projects; import it into Figma Make.
- Full design-process records: Microsoft Teams → Research Team/XRCC/Design/01_UI Design/3.0-4.0 PC/ and Research Team/Voyage360/Design Record.

### PC layout rules (Figma UI Design Guideline — Confirmed)
- 8px grid; spacing tokens Micro 4 · XS 8 · S 16 · M 24 · L 32 · XL 48 · XXL 64.
- Base frame 1920×1080 (XRCC frame 1922×1080 treated the same).
- Window side padding 32 (min 24). Input & button height 40. Tabs/segmented 32. Package card 48. Label→input 8; form groups 16; sections 24.
- Section gap must exceed component gap. If height is short, reduce 24→16 section gaps first; never squeeze input/card padding.
- **Solid purple only for the primary Create button**; selected cards = border + soft fill. Primary button keeps 32px bottom-right margin.

---

## 5. Current work & status (as of 2026-09-28)

### Pending decisions from the handover (Confirmed list, status may have moved)
| Item | Status | Next step |
|---|---|---|
| AI Workflow / Poe Key UI updates (show missing-key warning early, Poe Key panel alongside AI panel, Connections button next to AI button) | Designed, not handed off | Review with dev → handoff |
| XRCC Debug Mode UI | → became Runtime Debug Panel feature hub | See below |
| Asset Replace / Variant UI (Replace = A removed; Variant = A & B kept; right-click entry preferred) | Waiting for decision | Confirm scope with Tobey |
| Lighting Inspector (Ambient vs Directional controls) | Discuss later | Tobey decides |
| Setting panel — Devices input/output (mic for Poe AI) | Waiting for design | Confirm whether to proceed |
| Voyage360 Scene Map | Waiting for design | Confirm scope first |
| GS Viewer UI | Waiting for design | Fit XR requirements |

### Runtime Debug Panel (MVP) — authoritative page: "Runtime Debug Panel — UX Design Decisions"
- Watch / Log toggled independently per variable via a neutral **Debug** button + popover in the Variable Panel; `[W]` `[L]` badges.
- PC runtime panel: F12, bottom-left 24px, 400w × max 360h, cursor stays hidden, keyboard-only (Tab / Shift+Tab / Ctrl+↑↓ — pending conflict check). Tabs Watch · Log · Warnings.
- Warnings collapse by type+block with ×count; amber only for warnings.
- PC **Debug Review** (between runs): top-bar icon left of AI button, amber dot when content; Variables · Log · Warnings tabs; Locate buttons; cleared on next Play run.
- XR: Main Menu → Tool → Debug Panel; world-space, grabbable; reselect to reset position. No XR post-play review.
- Proposed retention: 500 log events; 100 warning identities with least-recently-occurred eviction (pending engineering).
- 4.1 backlog: show watched items grouped by instance.

### AI Quiz (XRCC 4.1, released) — hub: "AI Quiz Related Pages"
- **Unified Source Grounding Model** (UX decision doc, draft for engineering): quiz-level Source; one axis Grounded / Not grounded; one verb "Check against Source"; no manual Focus/Coverage-Unit picker; No-Source quiz stays fully silent; amber = can't run, grey = grounding; never auto-run re-checks; never auto-edit/delete committed questions.
- AI Quiz Update 2026-09-01: Needs Review chip on source-version change; validation on open Quiz Editor / In Quiz tab; Invalid chip → delete only; Pending Validation when no Poe key; AI-added questions get verified icon and become non-editable.
- Prototype vs Design review (2026-09-10/11, for Alan & Freddie → Tobey): Inspector shows only `Not runnable` / `No match` chips; batch check only in unchecked-question banner; check results only assign/accept or not-covered/keep-as-is.
- 4.1 backlog: Tooltip in UI Toolkit panels; project-source toggle UX in Quiz Editor; imported-assets data flow.

### XRCC 4.2 — Data Analytics & Connections (owner Tobey)
- Stage 1 product readiness confirmed; Stage 2 engineering wayfinding in progress (tracks C: AI profile/adapter; D: Device & Remote Control migration; plus Data Analytics, Launcher).
- Journey: Creator defines activity & evidence (xAPI-inspired action + target) → Owner configures Launcher profiles/bindings → shares via **Access Vault** → Operator preflights & launches → Participant attempt → Trainer inspects/exports evidence (Data Browser).
- Topics from 2026-09-16 meeting: local data capture then export (e.g. Google Sheets); credential Vault with master password / access tokens; OpenAI-compatible multi-provider with per-model profiles; legacy Poe key auto-migration (~6 months support); Remote Control via web (QR/IP, room/password, disconnect UX, hosted by XRCC/Launcher); Launcher default profiles → templates, allow delete but keep ≥1.
- **Do not create implementation specs/tickets until wayfinding & joint decisions are done.**

### Other active threads
- XRCC Design handoff DB: Sketchfab flow update (Eng handoff, 4.0.1); Create new project with packages (Done); AI Quiz UI after 4.0.1 Beta 5 (In review); tooltip alignment after 4.0.2 (Draft); AI Quiz Source Preview (P1).
- Behaviour Auto-organize (Tidy layout) PoC → likely next release.
- Localization cleanup applied 2026-09-24 (Get/Set/Save/Project/String/Teleport standardisation).

---

## 6. Terminology & copy (XRCC Localization Glossary — key rules)
- Keep English: XRCC, Poe, WitAI/Wit.ai, Sketchfab, Micro:bit, BLE, JSON, IP, 2D/3D/360, `{0}` placeholders.
- Item/object = **物件** (not 物品) · Project = **專案/专案** (not 項目) · Behaviour = **行為** · Action = **行動** · Motion = **動作** · Asset = 資產 · Inspector = 檢視器 · Variable = 變數 · String = 字串 · Boolean = 布林值 · Token = 憑證 · Debug mode = 調試模式.
- Get = **獲取**, Set = **設置**, Save = **儲存**, Teleport = **傳送** (取得/設定/保存/瞬移 are data-entry errors; "Settings" noun stays 設定).
- Play Mode: app mode = 遊玩模式; media port = 播放模式.
- zh-CN = Simplified of the same zh-TW wording. Empty Chinese cell is better than English text in it.
- Source of truth: SharePoint localization workbook, worksheet `XRCC` → sync to Unity StringTables.

---

## 7. Gaps noticed (suggestions only — not changed in Notion)
- "Global Figma Function Rules of XRCC (keep updated)" is empty.
- Teamspace Home (VOTANIC HQ) is still the default template.
- 2026 roadmap page is blank (only a PDF attachment in legacy archive).
- Handover "Things I want to remind" section is empty.
