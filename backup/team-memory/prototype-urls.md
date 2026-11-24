---
name: prototype-urls
description: Permanent prototype links (2026-11-24): votanic-proto.vercel.app with /remote-trigger, /ai-provider, /voyage360; how to update
metadata:
  type: reference
---

Links: https://votanic-proto.vercel.app/ (index), /remote-trigger/, /ai-provider/, /voyage360/. Old https://xrcc-remote-trigger.vercel.app/ keeps working (same site; its root redirects to /remote-trigger/).

Setup: Vercel project xrcc-remote-trigger, Root Directory `site`, production built from branch claude/project-thread-350cjh (site/ folder holds copies of each prototype, site/vercel.json). Ignored-build command only builds that branch. Updating a prototype means copying it into site/<name>/, pushing that branch (Alan approves each push) and redeploying with target production. Direct Promote of a preview returned 422, so redeploy from git instead. Vercel SSO protection exempts the production domains.

**Why:** Alan wanted one short permanent link per feature.
**How to apply:** after a prototype changes (Figma first), refresh its site/ folder; state the link in the reply. Do not rename the Vercel project.
