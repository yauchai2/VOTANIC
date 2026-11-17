# XRCC Remote Trigger P1 · web prototype and handover

Single-file, dependency-free prototype (`index.html`) that follows the Figma flow. Figma is the source of truth: change Figma first, self-check it, then make the prototype follow.

## Read before you start

1. `design-system/20261113-READ-FIRST-execution-guide.md` in the project's shared files (`/mnt/project-files/`, not in this repo). Read its section 1 checklist and the section for your task type, and run its section 13 self-check before reporting.
2. `design-system/20261008-library-change-log.md` in the same place: every Figma and prototype change is logged there (latest entries: 2026-11-17).
3. Project memory: `remote-trigger-launcher-flow-boards` and `remote-trigger-trigger-vs-variable-model`.

Working rules in short: reply to Alan in Cantonese, write reports in formal written Chinese. UI copy is English-first, short, no filler. Use XRCC (PC) Library components and existing tokens only, never add tokens. Dark mode only, single desktop frame. Annotations are Figma's native Annotations, written in Traditional Chinese. After any Figma edit, self-check prototype links, annotations and consistency. Connected devices are not always phones (desktop and iPad too), so the UI says "Remote control" and "Devices", never "Phone".

## Branch and files

- Repo `yauchai2/votanic`, branch `claude/project-thread-pddqur`, draft PR #7. Push only to this branch.
- `prototypes/xrcc-remote-trigger/index.html`: the whole prototype (CSS, markup, JS, no build step).
- `prototypes/xrcc-remote-trigger/README.md`: this file.
- The published Artifact is the same file. Republish with the Artifact tool using the same file path and URL so the link stays the same. Repo source and the latest Artifact version must stay identical.

## Run locally

Open `index.html` in a browser, or run `python3 -m http.server` in this folder. Editor configuration is saved in localStorage. This prototype does not implement cross-tab transport or a real XRCC connection.

Smoke test with Playwright: open the page, click "B2 Remote control window", switch to tab 3, and check there are no console errors.

## Prototype map

- **1 · XRCC editor**: Remote Triggers window (Remote List). Add New, trigger and variable pickers, settings, issues, rename, remove, connect to Behaviour. Drag the grip handle to reorder a section (keyboard: Space to pick up, arrow keys to move, Esc to cancel). Triggers and variable controls are reordered within their own kind. The title bar has a "Connect devices" button that opens the Remote control window.
- **Play**: the XRCC top-right device icon opens a slim popover (status plus "Open"), which opens the Remote control window: QR, Local network / Public link tabs, device list with Disconnect. Footer buttons "B1 Play popover" and "B2 Remote control window" jump there.
- **2 · Play & Launcher**: opens the Launcher straight on Connections. Remote control section is server only (switch, Reload icon, Port, address, Copy). Footer buttons B9–B16 jump to each state.
- **3 · Remote**: the controller web page (picker, deck, sheets). Tap the connection pill for "This device" (sensor availability). Test controls switch Phone / iPad / Desktop (Desktop has no gyroscope or accelerometer), rotate, simulate a network drop.

## Figma map

File "XRCC Claude Workbench" (key `ZBOB48n4eLsZABCTnhh5kk`), page "XRCC Remote Trigger (P1)" (node `1481:10758`). Do not touch the "Notes" sections or the old UI frame; they belong to Alan.

- **A series, XRCC editor (section `1497:3722`)**: A1 empty list, A2 choose what to add, A3 select one Instance, A4 trigger added, A5 button colour, A6 hover a row, A7 reorder a section (dragging), A8 needs attention, A9 configuration locked while playing, A10–A12 and A23–A25 variable pickers and states, A13 connect an instance (Remote Start), A14 and A18 remove, A15 and A16 settings, A17 rename, A19–A22 empty states.
- **B series, Play and Launcher (section `1501:5114`)**: B1 Play popover, B2–B8 Remote control window states (ready, device joined, public link on/opening/on/failed, waiting for Play), B9–B16 Launcher Connections (running, device joined, turn off, server off, reloading, port changed, port in use, link copied).
- **C series, controller (section `1506:5871`)**: C2–C15 connecting, project list, deck, key sent, slider, text, reconnecting, deck changed, play ended, orientations, empty deck; C16 This device; C17–C22 sensor permission, ownership and takeover; C23–C25 server/public/host disconnection; C26–C28 rejected, unknown and invalid input; C29 desktop deck.
- Section `1510:7606` holds the micro-interaction and tooltip specs, section `1510:7721` the Overview.

## Decisions to keep

- Launcher (server control) and XRCC window (join and monitor) are separate: no QR or device list in the Launcher. Settings has no Remote Trigger item.
- Two entries to the Remote control window: Play popover "Open", and editor "Connect devices".
- No orientation toggle in the Remote List; layout follows the device.
- Sensor permission is requested by a user gesture. Availability, permission and active source are separate. One source at a time; takeover requires confirmation; losing the source pauses data. Permission and transport are simulated here.
- Public link is off by default and ends when Play ends.

## 2026-11-17 implementation update

The latest user decision replaces the old multi-Instance model: each Trigger button binds one Instance; each Variable control binds one Instance or Project variable. Trigger buttons and Variable controls are separate categories, sorted within their category. Editor selectors are 640×680. Remote control sharing windows are 960×680, sized for QR, links and devices. Confirmation dialogs remain compact.

The recommendations requested by Alan are implemented as reviewable design proposals: 50 ms slider throttling plus final release value, confirmation based on XRCC acknowledgement, width-based 3/6/8 columns, read-only configuration during Play, snapshot refresh before stale controls resume, and explicit sensor ownership. These are not claims about the current Unity implementation.

See [implementation-20261117.md](implementation-20261117.md) for changes, tests, and engineering dependencies. Regression checks: `node prototypes/xrcc-remote-trigger/tests/smoke.cjs` (requires Playwright; `CHROMIUM_PATH` optionally selects Chromium).

## Publication and integration status

- Update only branch `claude/project-thread-pddqur`, existing draft PR #7.
- The original Claude Artifact has not been republished by this update: no Artifact publishing tool is available in this session. The repository source is newer; do not present the Artifact URL as this revision.
- Figma uses the current Library; no new design tokens and no Library Publish.
- Only Alan can Publish the Figma Library.
- This is a frontend simulation. QR/address, latency, acknowledgement, sensor capability/permission and device/server operations are mocked. Real browser permission prompts, sensor streams, Unity ACK/revision handling and public tunnel behavior require integration.
- Existing multi-target local demo data is backed up under `xrcc-rt6-before-single` and split into single-target examples. This is not an approved migration for production projects.
- The shared execution guide and Library change log referenced above are absent from this workspace. This local implementation report records the update; the shared log has not been edited.

## Latest alignment correction — 2026-11-17

Select Instance uses a highlighted row, with no Radio. P1 has no Change/Replace instance action: remove the trigger and add it again; Instance and Behaviour remain. The attached historical export is identical to the repository copy; current user decisions supersede historical alternatives.

The prototype has a **Figma screen** selector covering all 69 A/B/C boards. Each state can be opened directly with `?screen=A3`, `?screen=B3`, etc. The A/B/C review controls are outside the product canvas. Native Figma flow now uses 23 short arrows and 116 event/destination indexes instead of long crossing paths. See [alignment-20261117.md](alignment-20261117.md).

Web prototype: https://xrcc-remote-trigger.vercel.app/ (Vercel account access applies; temporary review share links are provided separately). The deployed HTML is from commit `0024d9f`.
