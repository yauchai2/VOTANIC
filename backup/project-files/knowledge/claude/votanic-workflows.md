# Votanic Workflows for the UI/UX Designer

> Derived 2026-09-28 from Votanic Notion pages (read-only). Each workflow cites its source page. Where Notion is silent, steps are marked **(recommendation)**.

---

## W0. Research protocol — look it up yourself (Notion + Figma)
Alan's standing instruction: when a Votanic question needs facts, Claude searches Notion and Figma on its own before answering, instead of asking Alan to paste content. Read-only, always.

**Order**
1. Project docs: `claude/votanic-knowledge-base.md`, `claude/votanic-workflows.md` (fast map).
2. **Notion** (Votanic workspace, connector already linked): `notion-search` with short keywords → `notion-fetch` the best 1–3 pages. Prefer, in order: authoritative UX Decisions page / Feature Hub → Knowledge base Wiki → latest meeting record → older discussion. For databases (XRCC Design handoff DB, Issue Reporter, Wiki) query rows read-only. Follow Figma links found on Notion pages.
3. **Figma** (connector signed in as the team account on the "Votanic Research Team" plan): Figma has no workspace search here, so start from a file key — from the registry below, a link on a Notion page, or a link Alan gives. Then `get_metadata` (list pages) → `get_screenshot` / `get_design_context` on the relevant node; `search_design_system` for components, variables and styles in the libraries.
4. If still missing, say what was searched and ask Alan for the specific link.

**Answer format**: cite each source (Notion page title + link, Figma file/node); label Confirmed / Recommendation / Assumption; note the page's last-edited date when recency matters; if Notion and Figma disagree, say so — the Notion UX Decisions page wins for behaviour, Figma for visuals.

**Never**: write to Notion; edit Figma; copy credentials or access details; load the whole workspace when 1–3 pages answer the question.

### Figma file registry
Master index: **"All Figma files"** table in XRCC (PC) Library — `De8nKqO81yciw4wH5xfpxA`, node `17463:26139`. Re-read it first when a file isn't listed below (it may have new rows).
All files below verified readable by the Figma connector on 2026-09-28.

| File | Key | Start node | Contents |
|---|---|---|---|
| Votanic Brand Design Guideline | `ZIHnSrnhw8JnEftwm1BfUG` | `3:8501` (Design) | Brand guideline; also "Working Page" |
| XRCC (PC) Library | `De8nKqO81yciw4wH5xfpxA` | pages Cover · Icons · Internal | All main design components, `--xrcc-*` tokens; hosts the master index |
| ⭐ 20251125_XRCC4.0_PC_UI | `7SMhpQ4IVhnlA6G6wfwAgO` | `4072:4` | Legacy all-in-one (v2.1–4.0): home/settings/nav, inspector & side panels, device/VR connectivity (Poe, MCU, Wit.ai, VR play), behaviour editor, old component library. Reference only; slow; don't add features |
| XRCC Launcher | `18RvTL8PypmNuZIszfSRMV` | `0:1`; Components `18001:21733` | Onboarding wizard, projects, content library, packages, profiles, version, licence, settings, connections, download/import manager |
| XRCC4.0 - Assets Panel | `OX57GAX6iYmsxNhO5bzMqD` | `0:1`; Local Components `4057:23648` | Asset Inspector 4.0, Special Object button |
| XRCC4.1 - AI Quiz | `60SMqk7vsM74rSwu3Qhmzk` | UI Design `1:2`; Update (20260720) `1438:18021`; AI Quiz Object Design `64:6558`; Archive `301:17909` | AI Quiz (Quiz Editor, sources, quiz objects) |
| XRCC - Runtime Debug Panel | `1fAQ8bgTaI2RWLYJRBb3Aw` | `0:1`; Local Components `4041:1252` | Runtime Debug Panel MVP |
| AI Workflow — Missing Poe Key Prompt (20260731) | `mSAP5ID9Al3kbWIxJWBYwq` | `0:1` | From Notion "UI/UX update list after meeting on 29/7" (not in master index) |
| ⭐202502-Voyage 360 UI-PC+VR | `KoJQjDPM4sjwsoMYEvCDkw` | cover `0:1`; Design Guidelines `287:56025` | Voyage360 Release 1.0 UI (PC + VR) and its own design guidelines/components (separate from XRCC). Not in master index — link from Alan |

Notes: the connector only lists pages it can see; if a page is missing, open the start node from the index link. Library tokens use the `--xrcc-*` prefix (e.g. `--xrcc-action-primary-background-default` #392e52, `--xrcc-surface-canvas` #1e1e21, `--xrcc-text-primary` #e5e5e5).

---|---|---|
| XRCC (PC) Library | `De8nKqO81yciw4wH5xfpxA` | Pages: Cover, Icons, Internal. Component library (unfinished per handover). |
| AI Workflow — Missing Poe Key Prompt (20260731) | `mSAP5ID9Al3kbWIxJWBYwq` | Linked from "UI/UX update list after meeting on 29/7". |
| 20251125_XRCC4.0_PC_UI | (key not yet captured) | Legacy main file & old component library — reference only, very slow. |
| XRCC folder (per-function files, 7 Aug 2026) | (keys not yet captured) | Current home for XRCC UI. |
| ⭐202502-Voyage 360 UI-PC+VR | (key not yet captured) | Voyage360 Release 1.0. |

---

## W1. Feature lifecycle — where design fits
Source: "09 — XRCC AI-Assisted Engineering Workflow (Pilot)", "Roadmap Feature Hub — Template & Agent Guide", meeting 2026-09-16.

```
Product discovery in Notion (Tobey)
  → Engineering wayfinding  ← designer runs a parallel current-experience audit
  → Joint grilling            ← designer joins when users see / configure / recover
  → Bounded feature shaping   ← designer defines flow, entry points, states, terms, a11y, prototypes
  → Feature-readiness gate
  → Implementation spec (GitHub issue, links to Notion)  ← designer reviews interaction fidelity & state coverage
  → Vertical tickets (link approved UX artifacts + required states)
  → Implement → Review        ← designer validates the WORKING BUILD, not just mockups
  → Update Notion only for user-visible changes
```

Source-of-truth contract:
- Accepted user-visible behaviour, journeys, terminology, states → **Notion** (product authority page)
- Detailed wireframes / prototypes → **Figma / MagicPatterns**, linked from Notion — not a second source of truth
- Implementation spec & tickets → **GitHub**
- Prototypes = alignment aids unless explicitly approved as final spec.

Designer rules:
- Keep current-UX observations separate from proposed designs.
- Mark lanes "not applicable" instead of inventing design work for non-UI features.
- Label everything Confirmed / Proposed / Open / Assumption.

---

## W2. Feature Hub (single source of truth)
Source: "Create Roadmap Feature Hub", worked example "Runtime Debug Panel — Feature Hub".

Minimum intake: feature name, product, roadmap item, stage, requesting owner, decision owner, target users, problem, outcome, in/out of scope, sources, preferred location.

Hub structure: Status snapshot · Start here · Feature at a glance · Delivery boundary & non-goals · Success & acceptance · Authority & working rules · Confirmed / Proposed / Open decisions · Journeys & states · Data & system behaviour · Handoffs · Dependencies & risks · Release validation · History · Intake / missing info.

Typical child pages: **Product & UX Decisions (authoritative)**, Engineering Handoff, Frontend handoff, QA & Release Validation, Prototype Export, Decision Log.

Quality gate before "implementation-ready": one authoritative decisions page; stage/owner/users/problem clear; MVP & non-goals explicit; observable acceptance criteria; platforms/roles/states/data/retention/network/privacy/perf/a11y covered where relevant; handoffs assigned by function; missing info has owner + date.

> Claude never writes to Notion — draft hub content in chat/doc; Alan pastes it himself.

---

## W3. UX Decisions page (the pattern used in Debug Panel & AI Quiz)
Source: "Runtime Debug Panel — UX Design Decisions", "XRCC AI Quiz — Unified Source Grounding Model".

1. Changelog callout at top (dated).
2. Purpose + link to discussion prototype (state it is not final visual spec).
3. Confirmed product direction.
4. Per-surface sections (e.g. Variable Panel, PC runtime, Debug Review, XR) with exact dimensions, states, copy, keyboard map.
5. Value formatting / long-content rules.
6. Prototype frame-flow table: Frame · Trigger · Result.
7. Data / network / retention decisions (mark "pending engineering").
8. "Decisions for lead-engineer discussion" checklist.
9. Out of scope / non-goals.
10. Related meetings.

---

## W4. Design handoff to engineering
Sources: "XRCC Design handoff database", "UX-design-documentation-guide", "XRCC 'Create New' Project UI — Design Handoff".

1. Alan creates/tracks the item in **XRCC Design handoff database** (Claude only suggests field values) — status flow: Draft → Backlog → Designing → In review → (Designing R2) → Engineering handoff → Done; set Priority P0–P3, Owner, Target update version, QA checkbox.
2. Figma file named `YYYYMMDD_<version> <function>`; mark Ready-for-dev sections.
3. Handoff page contents (documentation guide template):
   - Overview (owner, status/version, problem, users, goals, scope/non-goals)
   - Experience context (entry points, flow, dependencies, design links)
   - Behaviour spec table: Area/state · Expected behaviour · Rules · Visual ref
   - Design decisions table: Decision · Rationale · Alternatives · Confidence
   - Edge cases: empty, loading, error/recovery, permissions (Standard vs Premium), responsive/a11y, data extremes
   - Handoff & versioning: ready for dev, out of scope, risks, change log
4. Include an **exact copy table** (Where · Text) — and zh-TW/zh-CN per the glossary when strings are new.
5. Use numbered annotation pins on mockups mapping 1:1 to written notes (Create New handoff pattern).
6. State what is NOT changing.
7. After build: review the working build; log deviations; return behaviour changes to product.

---

## W5. Prototype vs build QA review
Source: "AI Quiz 2026/09/10-11 Prototype vs Design to Tobey", "20260818 Quiz Testing Build QA", "20260702-XRCC Quiz UI QA (for Engineering)".

1. Collect evidence: Figma prototype exports + latest Beta capture set (dated).
2. Comparison table: Area · Figma prototype · Beta / intended direction · Check item.
3. "Already aligned" list.
4. For each difference, mark **confirmed / needs design change / needs implementation change**.
5. Condense into a short final note to Tobey.

---

## W6. UI review format (project instruction)
For each finding: **UX problem → Impact → Recommendation → Priority**. Prefer small-team-feasible fixes; don't redesign for aesthetics alone. Check against: existing XRCC patterns (two-line variable rows, top-centre toast, ring menu, amber = warning only, solid purple = primary only), 8px grid, Premium/Standard states, PC vs XR input (cursor hidden in Play, wand in XR).

---

## W7. Localization / UX copy
Source: "XRCC Localization Keyword Glossary".
1. Write English copy first (short, consistent with existing node titles `*_Label`).
2. Translate with the glossary keywords; zh-CN = Simplified of zh-TW wording.
3. Check context-conflict terms by screen (Play Mode, Image, False).
4. Never translate brands/APIs or `{0}` placeholders.
5. Edits go to the SharePoint workbook (worksheet `XRCC`), then ContentCreator → Localization sync (engineering).

---

## W8. Meetings → decisions
Source: Meetings & Decisions hub, Research Team Meeting (2026-09-16).
- Meeting notes live in the meeting database; durable conclusions must be copied to the relevant project hub or knowledge page.
- After a meeting: extract UI/UX follow-ups into a list page (pattern: "UI/UX update list after meeting on 29/7") with meeting decision, UI checklist per surface, Figma link, "Discuss later" tags.

---

## W9. Reporting issues
Internal Issue Reporter DB: Title, Type, Priority, Frequency, Version, Detail, Attachments/Log data → engineering links GitHub issue. Workforce Portal problems → screenshot + short note to Tobey.

---

## W10. Weekly admin
- **Workforce Portal Work Distribution** every week (Mon–Fri), total 100% across projects, due by the Friday 5 pm HKT reminder; flag overtime for compensation leave there.
- Leave via portal; supervisor endorses → manager approves.

---

## Guardrails for Claude in this project
- **Notion: never create, edit, delete, move, comment or change status/properties — read and search only (Alan's standing rule).**
- Figma: read-only; do not edit files unless Alan explicitly asks for that specific change.
- Outlook and internal systems: read/search freely; any create/edit/delete/send/status change needs Alan's explicit instruction.
- Never reproduce credentials, keys, licence data or private access details (the tools/credentials section exists — don't copy from it).
- Distinguish Confirmed (Notion) vs Recommendation vs Assumption in every answer.
- Reply in Traditional Chinese / Cantonese when Alan writes in Cantonese; developer-facing deliverables may be English.
