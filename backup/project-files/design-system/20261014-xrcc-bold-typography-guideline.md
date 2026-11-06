# XRCC bold typography guideline (2026-10-14)

Direction from Alan (2026-10-14): outside real application UI, type can be bolder and more creative, with a bigger size contrast. Study: Mobbin (Discord screens and website sections, via the Mobbin connector). Builds on [studio-feel guideline](20261009-xrcc-studio-feel-guideline.md) and the [visual language study](20261009-xrcc-ui-visual-language-study.md); not repeated here.

## What I actually saw (and did not)
- Seen: ~8 Discord app screens (server settings, Onboarding steps, Boost page, welcome screen) and ~8 Discord website sections (hero, feature, footer) on Mobbin.
- Not seen: Discord's real font sizes or font files. discord.com/branding gives no type guidance, so sizes below are my visual estimates and the font name is unconfirmed.

## What Discord does
1. **Two voices.** The website shouts: heavy, all-caps, 3 to 5 line display headlines, roughly 4 to 5 times the body size, left aligned, with a short body paragraph (about 45 characters per line) and one or two buttons. The product whispers: settings and lists use small sizes, one muted description line under a bold title, uppercase muted section labels, and almost no big type.
2. **Contrast comes from the gap, not from many sizes.** A page uses one very large size, one body size and one muted size. Nothing sits in between.
3. **Personality in the headline only.** Sentence-case bold for second-level headings (about 2.5 times body), all-caps heavy only for the hero.
4. **Hierarchy by colour and weight too.** Title = bright and bold, description = same size or smaller in muted grey, section label = small uppercase muted.
5. **Onboarding and empty moments are centred and generous:** one headline, one short line, one button, lots of space, often with an illustration.
6. **Numbers and states get their own treatment** (step counters, "4 of 5", GOOD/REQUIRED tags), not buried in sentences.

## The rule: two zones
| | Real application UI (Launcher, panels, dialogs, forms, tables a user works in) | Documentation, specs, concept screens, empty states, onboarding, section headers |
|---|---|---|
| Posture | Restrained. Chrome recedes (Studio feel P3). | Bold. Let type carry the layout. |
| Sizes in play | body/md 14, body/md-bold, body/sm, caption; heading/sm to heading/lg for titles | heading/xl at the top, heading/lg and heading/sm for sections, body/lg for leads, caption for eyebrows |
| Biggest : smallest | about 1.7 : 1 (heading/lg 24 over body/md 14) | at least 2.7 : 1 (heading/xl 32 over caption 11 / body/sm 12); aim for 3 : 1 or more |
| Hero numerals / counts | No | Yes, heading/xl (e.g. "7 tooltips" band) |
| Eyebrow label | Rare | Caption, uppercase, text subtle |
| Colour layers | text primary + one subtle | same two tokens, never a third grey |

If it can change what the user does or reads while working, it is application UI: stay restrained.

## Recipes (existing text styles and text variables only)
- **Page / board title:** eyebrow (caption, UPPER, subtle) + heading/xl title + body/lg lead. Gap 8.
- **Section header:** heading/lg (docs) or heading/md (dense docs). Keep 64 to 80 between sections so the type has air.
- **Hero fact:** big value heading/lg or heading/xl, label above in caption UPPER subtle, note below in body/sm subtle (Foundations row in the Typography list).
- **Count + title band:** number in heading/xl, centred in a 56 px column; title heading/sm; one-line description body/md subtle. Band padding 16.
- **Group label inside a long list:** caption UPPER subtle, then rows with 20 px vertical padding. Do not use a bold body for group labels.
- **Reading text in docs:** body/md at 14 or body/lg at 16, at most 70 characters per line; 12 px is for notes only.
- **Empty state:** heading/lg headline, body/md line, one verb + object button. Personality lives in the sentence.

## Display level (added 2026-10-14, Alan's explicit exception to "no new tokens")
Styles now go up to `display/4xl`: `display/2xl` 48/56, `display/3xl` 64/72, `display/4xl` 80/88, all Bold, bound to `typography/display/*` variables (Roboto, zh-hant swaps to Noto Sans TC). Units run to `spacing/80` (new 72 and 80). Details in the [change log](20261008-library-change-log.md).
- Use for concept covers, onboarding heroes, big empty-state headlines, hero numerals, docs. One hero per frame, pair with a small muted line (3 : 1 or more).
- Never in real application UI; heading/xl 32 stays the top there.
- Prefer display/2xl for most hero lines; 3xl and 4xl for one or two words or a number.

## Do / Don't
- Do pair every large size with something small and muted next to it; the contrast is the point.
- Do keep one hero per frame.
- Don't enlarge text inside real product screens to look lively.
- Don't use all-caps for sentences; only eyebrows and short tags. Don't add letter spacing (tracking is 0%).
- Don't use status colours or the purple accent to make type bigger-looking.

## Applied as a demo (2026-10-14)
- Library, Design tokens: Typography list (frame 17463:26812, list 18202:2987).
- Workbench, Runtime Debug page: Board 11 Tooltip list (331:1266).
Details in the [change log](20261008-library-change-log.md).
