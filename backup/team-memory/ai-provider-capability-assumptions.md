---
name: ai-provider-capability-assumptions
description: Provider-to-task support used in the AI Provider flow (assumption, not verified by the team); Gemini counted as image-capable since 2026-11-06
metadata:
  type: project
---

Capabilities used in Figma boards and the web prototype: Gemini = chat, quiz (PDF), speech, image, transcription; MiniMax = chat, speech, music; Poe = chat, quiz, speech, music, image, transcription; OpenRouter = chat, quiz, image; Custom = chat only.

**Why:** Alan (2026-11-06) saw Gemini listed in the Text to image picker yet greyed in Add a provider, and Text to image never turned Ready after adding Gemini. Gemini does offer image generation, so it was changed to image-capable; the table is still an assumption for the team to verify.
**How to apply:** keep Figma tiles (+N chips, info line, B2b note) and prototype data in sync with this table. Related: [[xrcc-launcher-connections-gate]].
