# XRCC "Studio feel" guideline (2026-10-09)

Source: Discord feel research (/mnt/project-files/research/20261009-xrcc-discord-feel-research.html) + Workbench concept frames (Launcher 239:1035, Quick switcher 240:1052, Connections 247:1113, Packages empty 247:1396). Voice strings: /mnt/project-files/xrcc-studio-feel/20261009-voice-pass-launcher.md.

Status: direction from Alan ("好似Discord咁但唔boring", "有美感、有趣、有圖像化"). Concepts only, not shipped UI. Judge on merits; old UI is not gospel.

## One-line direction
XRCC is a place you work in, not a list of pages: stable shell, honest small presence, projects with a face, one human voice. Borrow Discord's place-feel; never its chat model, noise or gamification.

## Eight principles
1. **Places, not pages.** Stable rail (left) / content (middle) / status (right or bottom). Where you are never changes under you.
2. **Small, honest presence.** Tiny dots and one-line activity ("Edited 2h ago on this PC"). Presence is about devices and projects, not people watching people.
3. **Chrome recedes, content glows.** Neutral shell; colour and illustration spend on the user's content. Only one purple Primary per decision area (Linear: structure felt, not seen).
4. **Informal by default, structure on demand.** Open to the last project; folders, filters and settings appear when asked.
5. **Give projects a face.** Cover/illustration + name + real activity line, instead of grey table rows.
6. **One voice.** Plain, warm, specific English. Real names and numbers.
7. **Delight at the edges, convention in the core.** Playfulness in empty states, first success, loading, onboarding. Plain in destructive, data, billing and error dialogs.
8. **Honest status over fun status.** Never invent state to look alive.

## Honesty rule (hard)
- Record/delivery states only: Accepted / Saved locally / Queued / Delivered / Failed (Data Analytics D-16).
- Never infer abandoned, failed or passed (D-22); no pass/fail (D-27).
- Presence dots: only states XRCC can actually measure (device connected, project open on this PC, package syncing). No "away", no "typing", no fake online counts.
- Status colour tokens only: status/success, status/warning, status/error, status/info. Do not repurpose behaviour/* for status.

## Borrow / adapt / don't
- **Borrow:** stable rail with status dots; Ctrl K quick switcher; project identity; continue band; one-line activity.
- **Adapt:** server icons → project covers; "online friends" → Nearby devices; channels → project sections; notification badge → a quiet count only for things that need action.
- **Don't:** chat or channels, notification noise, XP/streaks/badges, public presence, big blurple surfaces, dense lists in XR world-space panels (XR needs large targets).

## Pattern catalogue
| Pattern | Rule |
|---|---|
| Rail | Icon + label; active = Launcher style (purple tint + left bar), not gradient pill. Status dot only for real states. |
| Continue band | Top of Launcher: last project, cover illustration, one primary "Open <name>". |
| Project card | Cover, name, activity line ("Edited 2h ago · 14 scenes"), status pill. No lorem. |
| Nearby panel | Devices on the network with honest state; empty = a friendly line and a "Pair a headset" action. |
| Quick switcher | Ctrl K; projects, scenes, commands; recent first; keyboard-first; one Esc to leave. |
| Empty state | Illustration + human sentence + one action. This is where personality lives. |
| Connection / package states | Verb+object buttons; say what happened, consequence, next step. |

## Copy voice (5 rules)
1. One human voice, not marketing and not system-speak.
2. Real names and numbers ("Biology Notes v2 · 3 files").
3. Playful only at low stakes; plain when data or money is at risk.
4. Honest status words from the allowed list.
5. Buttons are verb + object ("Open Biology Notes", "Retry connection"), never OK / Submit.
English first; Chinese only when explicitly asked.

## Build rules (inherit existing)
Library components and existing tokens only (no new tokens); sizes 28/36/48; Auto Layout with Hug/Fill/min-max; check narrow/default/wide (1000/1440/1920); self-built pieces go on the feature file's Components page, not the shared Library; log in the change log.

## Open assumptions / risks
- Illustrations: Alan (2026-10-09) allows free creative direction, as long as the look and feel aligns with XRCC. They are decorative, so they don't need token binding; still no new tokens in the Library, and never use status colours as decoration.
- Presence in schools/enterprise: keep private by default; no cross-user visibility without an explicit product decision.
- Not validated with users; 800px and Packages-empty narrow not checked.
- Notion behaviour specs still win over concept layouts when they conflict; list conflicts at handoff.

## Rollout
Alan (2026-10-09): leave the current old XRCC UI untouched for now; it will be updated step by step to be more fun. Apply this guideline to new work only, until he says otherwise.
