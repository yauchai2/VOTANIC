---
name: feedback-use-library-and-components-first
description: Alan (2026-11-12): in every Figma design use XRCC (PC) Library components wherever one exists, and components wherever possible; no hand-drawn frames
metadata:
  type: feedback
  modified: 2026-11-12T10:53:27.596Z
---

Alan (2026-11-12, Remote Trigger thread): "所有東西可以用XRCC library就用library。所有東西可以用components就用components。請記下！" He first noticed it on a hand-drawn checkbox, then repeated it generally.

**Why:** hand-built frames (checkbox square, pills, 40x40 close/entry frames, row frames) drift from the Library and bypass its states and tokens; he reviews for this.
**How to apply:** Before drawing anything, search the Library (search_design_system): checkbox `Form / Dark / checkbox` (set Check variant AND keep the `value` boolean false, it toggles a label text), select `Form / Dark / Select`, text input, `Switch`, `Tag` (interactive) vs `Badge` (read-only status or counts), `Button / Dark / Button Square` (icon-only, Size 28/36, swap Icon property for close/remove/connect), Slider Bar, dropdown-menu. Variant names list State/Check/Size in the library's own order, so match with properties or setProperties, not by guessing the name string. If a repeated element has no Library match, make a feature component on the file's Components page (e.g. `RT / Instance row`, `RT / Group row`) and use instances. Related: [[library-new-components-allowed]], [[feedback-self-check-after-edits]].
