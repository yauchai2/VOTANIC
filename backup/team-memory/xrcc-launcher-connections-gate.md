---
name: xrcc-launcher-connections-gate
description: XRCC Launcher is a separate program; Connections (not License) is the pre-launch gate that collects AI keys (Alan, 2026-11-05)
metadata:
  type: project
---

Alan (2026-11-05, via Notion AI): XRCC Launcher is another program. Launch flow: version check, project needs connections?, if yes show ConnectionSetupPanel to collect credentials, then start XRCC. Connections is both a Launcher tab (POE key, Wit.ai token, auto-delete policy) and this pre-launch gate. License is only a settings tab (QLM activation), unrelated to AI keys.

**Why:** AI keys are entered before XRCC opens when a project needs them.
**How to apply:** Design Launcher AI key UI as Connections tab plus a pre-launch Connection setup dialog (board D4); share key store and Add key flow with XRCC Settings. Per-provider task support is an assumption until the team verifies. AI Provider screens live at Workbench node 1354:2549. Related: [[xrcc-ai-provider-ui-requirements]], [[ai-provider-prototype-not-ux-reference]].
