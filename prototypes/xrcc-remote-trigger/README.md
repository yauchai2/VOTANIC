# XRCC Remote Trigger P1 prototype

[Web prototype](https://xrcc-remote-trigger.vercel.app/) · [Figma](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk/XRCC-Claude-Workbench?node-id=1481-10758)

The prototype follows the simplified Figma flow updated on 17 November 2026. It uses XRCC Library component styling and existing tokens; no Library assets were published.

## Main journey

1. In XRCC, add a Trigger button bound to one Instance, or a Variable control bound to one variable. Select a row directly; reorder within each category.
2. **Connect devices** opens **Launcher › Connections › Remote control**, carrying the originating project and window. Launcher owns QR, Local/Public links, Server, Port and Devices. **Back to XRCC** preserves Play and configuration.
3. Open the shared link using the prototype test control. A project link skips the project catalog. Local devices can join before Play and wait; controls appear when Play starts. Public links require Play.

Opening Launcher directly uses a Connections summary and **Manage devices**. The independent entry has no Back to XRCC button and its generic link opens the project catalog. Server startup, occupied Port, Reload, Public failure/retry, disconnect, stale controls and closed source windows have recovery states.

## Run and verify

Open `index.html`, or serve this directory with any static HTTP server. Editor data is saved in localStorage. The top tabs switch simulated applications; **Review states** exposes individual Figma state fixtures without adding steps to the product flow.

```sh
node prototypes/xrcc-remote-trigger/tests/smoke.cjs
```

Tests require Playwright and Chromium. Coverage includes the scoped and generic connection journeys, pre-Play joining, return without restarting Play, server/Port recovery, public revocation, single binding, input validation, ACK/rejection/unknown handling, sensor takeover, responsive layouts and all 80 state fixtures.

## Design and delivery

- Figma: 13 groups, 72 visible canonical screens, 30 flow connections, 19 concise native annotations. Repeated snapshots are archived; state fixtures remain available in the Web QA selector.
- Library Notification / Dark, Type=Default is used for feedback. `library-token-map.json` records the source components and token aliases.
- Source: `yauchai2/VOTANIC`, branch `claude/project-thread-pddqur`, draft PR #7. Push only to this branch.
- Deploy to the existing Vercel project recorded in `hosting-vercel.json`. The stable URL is also linked from the Figma page overview. Vercel account access may be required by existing project protection.
- This is an interaction prototype: QR, network, devices, server, sensor permissions and XRCC acknowledgements are simulated. It does not implement real cross-window or cross-device transport.
