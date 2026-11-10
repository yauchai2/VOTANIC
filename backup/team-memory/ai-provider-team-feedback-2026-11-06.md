---
name: ai-provider-team-feedback-2026-11-06
description: Dev/team review comments on the XRCC AI Provider design that Alan relayed on 2026-11-06 and how each was resolved
metadata:
  type: project
  modified: 2026-11-06T08:22:13.872Z
---

Alan relayed the team's comments on 2026-11-06. They apply to the Figma page 1354:2549 and to prototype PR #6.
- Sessions are used by Behaviour, AI character and Quiz setup, not only for roleplay. Widen the description.
- Voices: drop "Play all" because it costs too many tokens. Real projects have 10 to 50 voices, so show the recommended ones first, with search and "Show all".
- Rename Tasks to "Models" (AI model). Hide models a task cannot use rather than showing them disabled. Text chat can have many models, so the list needs search or scroll.
- Key Management: show the password field after a key is chosen or confirmed. Wit.ai tokens have no password.
- Providers: show the token count used. A Custom provider cannot test its connection.
- Reorder the tabs to match setup order: Providers, Models, Voices, Sessions.
- Use the phrase "Bring your own key".
- Show the active provider in the Voices tab.

**Why:** these come from the developers who will build the feature, so they override earlier design guesses.
**How to apply:** keep these rules when touching any AI Provider board or the prototype. Related: [[xrcc-ai-provider-ui-requirements]], [[ai-provider-capability-assumptions]].
