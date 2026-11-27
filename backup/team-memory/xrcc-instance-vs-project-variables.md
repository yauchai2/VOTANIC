---
name: xrcc-instance-vs-project-variables
description: XRCC Instance variables vs Project variables (scope, entry points, types, colour token) and how Remote Trigger P1 shows them (2026-11-16)
metadata:
  type: project
---

Source: Notion "XRCC (Unity) — Variables: Instance / Project" (read-only). Instance variables live on one scene object (InstanceData.variables), edited in Behaviour via the instance's "Variable List" panel (InstanceVariablePanel). Project variables are project-wide across all scenes (ProjectData.projectVariableList), opened from the top toolbar Project Variables icon (ProjectVariablePanel), shown with the ochre/"啡黃" identity colour. Both types: Number, Boolean, Color, Vector3, String (instance also JSON). Remote Trigger P1 supports only Number, Bool, Text.

Alan asked 2026-11-16 whether P1 should adopt the colour. Applied: token `behaviour/project-variable` (XRCC Theme, key 4800ffc3…, = color/yellow/400 #907509) on A11 Project variables tab (pressed, text text/primary) and every project-variable row icon (Select Variable + Remote list). Toolbar/header icons keep default colour. Unsupported types shown dimmed "Not in P1"; used ones "Already added".

**How to apply:** project-variable identity = that token only (do not add tokens); instance variables keep the normal purple/neutral. Related: [[remote-trigger-trigger-vs-variable-model]].
