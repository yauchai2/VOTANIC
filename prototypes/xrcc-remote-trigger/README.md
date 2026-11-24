# XRCC Remote Trigger P1 prototype

[Web prototype](https://xrcc-remote-trigger.vercel.app/) · [Figma](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk/XRCC-Claude-Workbench?node-id=1481-10758)

Share the Web prototype URL above for every release. Add a query such as `?screen=B2&present=1` to link directly to a review state. The Vercel project alias forwards to the same address. Build-specific deployment URLs and the archived Claude Artifact refer to historical versions.

The prototype follows the refined Launcher design and simplified Figma flow updated on 17 November 2026. It uses XRCC Library component styling and existing tokens; no Library assets were published.

## Main journey

1. In XRCC, add a Trigger button bound to one Instance, or a Variable control bound to one variable. Select a row directly; reorder within each category.
2. **Connect devices** opens **Launcher › Connections › Remote control**, carrying the originating project and window. Launcher owns QR, Local/Public links, Server, Port and Devices. Switching between the simulated applications preserves Play and configuration. There is no Back to XRCC button.
3. Open the shared link using the prototype test control. A project link skips the project catalog. Local devices can join before Play and wait; controls appear when Play starts. Public links require Play.

Opening Launcher directly uses a Connections summary and **Manage devices**. Its generic link opens the project catalog. Port is always visible. The Public tab remains available before Play, with a reason beside its disabled activation button. Server startup, occupied Port, Reload, Public failure/retry, network loss and stale controls have recovery states. Device rows are read-only in P1.

## Run and verify

Open `index.html`, or serve this directory with any static HTTP server. Editor data is saved in localStorage. The top tabs switch simulated applications; **Review states** exposes individual Figma state fixtures without adding steps to the product flow.

```sh
node prototypes/xrcc-remote-trigger/tests/smoke.cjs
```

Tests require Playwright and Chromium. Coverage includes the scoped and generic connection journeys, pre-Play joining, application switching without restarting Play, server/Port recovery, public revocation, single binding, input validation, ACK/rejection/unknown handling, sensor takeover, responsive layouts and all 80 state fixtures.

## Design and delivery

- Figma: 13 groups, 72 visible canonical screens, 30 flow connections, 19 concise native annotations. Repeated snapshots are archived; state fixtures remain available in the Web QA selector.
- Exact Library wordmark, QR, device art, provider assets and icons are embedded, together with Roboto for matching font metrics. Major Launcher layout bounds are checked against Figma within 1 px.
- Library Notification / Dark, Type=Default is used for feedback. `library-token-map.json` records the source components and token aliases.
- Source: `yauchai2/VOTANIC`, branch `claude/project-thread-pddqur`, draft PR #7. Push only to this branch.
- Deploy `index.html`, `font-license.txt` and `vercel.json` together to the production target of the project recorded in `hosting-vercel.json`. The stable URL is also linked from the Figma page overview. Vercel account access may be required by existing project protection.
- This is an interaction prototype: QR, network, devices, server, sensors and XRCC acknowledgements are simulated. It does not implement real cross-window or cross-device transport.
