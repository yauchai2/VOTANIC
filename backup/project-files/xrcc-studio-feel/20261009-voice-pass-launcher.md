# XRCC voice pass: Launcher + Connections (English, 2026-10-09)

Status: draft for Alan. Proposed strings only; nothing applied to the Library. The Launcher concept frame (Workbench node 239:1035) already uses this voice.
Labels: [Existing] = taken from current XRCC copy in the visual language study; [Proposed] = new wording.

## Voice rules (from the Discord research, kept inside XRCC's existing copy rules)
1. One person talking: short, warm, specific. Say what happened, then what to do.
2. Name real things and numbers ("3 attempts recorded", "Quest 3"), not "items" or "devices".
3. Playful only where stakes are low: greetings, empty states, first successes. Plain in delete, licence, credentials and data export.
4. Status words stay honest. For Data Analytics only use Accepted, Saved locally, Queued, Delivered, Failed. Never infer "abandoned" or "passed".
5. Buttons are verb + object. No OK / Submit.

## Strings
| # | Where | Now | Proposed | Why |
|---|---|---|---|---|
| 1 | Launcher home greeting | Welcome to XRCC Launcher [Existing] | Good evening, Alan. (time-aware: morning / afternoon / evening) | Feels like a place that knows you. |
| 2 | Greeting sub line | (none) | Your Quest 3 is awake and waiting. Museum Night Tour was last played 2 hours ago. | Presence plus a next step. |
| 3 | Quick switcher placeholder | (new) | Jump to a project or setting | Says what it does in 6 words. |
| 4 | Continue band eyebrow | (new) | PICK UP WHERE YOU LEFT OFF | Replaces a generic "Recent". |
| 5 | Recent projects heading | Recent projects | Recently touched | Covers edited and played. |
| 6 | Project card activity | Last Saved: 2 days ago [Existing] | Played on Quest 3 · 2h ago | Shows what happened, not just a timestamp. |
| 7 | Never played | (none) | Never played yet | Honest and light. |
| 8 | Project needs connection | Need connection [Existing tooltip] | 1 thing needs setup | Pill uses status/warning. |
| 9 | Project needs nothing | (none) | No connection needed | Removes doubt. |
| 10 | Nearby panel title | (new) | Nearby | One word, like a room. |
| 11 | Device ready | Connected | Ready to launch | Says what you can do. |
| 12 | Device needs pairing | Pairing required | Found, needs pairing | Plain and friendly. |
| 13 | Device off | Disconnected | Off right now | Not an error. |
| 14 | Nearby empty | No nearby VR devices found [Existing] | No headsets nearby. Wake one up and we'll find it. | Gives the next step. |
| 15 | Nearby footnote | (new) | Wake a headset or plug in a board and it will show up here. We keep looking in the background. | Explains the live behaviour. |
| 16 | Up to date | You're up to date! [Existing] | Keep as is | Already the right voice. |
| 17 | Packages empty | (grey two-line text) | Nothing here yet. Add a package to bring in new assets and behaviours. | Icon + bold title + one line + one action. |
| 18 | Download queued | Asset import is queued. It will be processed momentarily. [Existing] | Queued. We'll start as soon as the current import finishes. | Tells what it waits for. |
| 19 | Connections: vault locked | (new in 4.2) | Your keys stay on this computer. | Reassurance first. |
| 20 | Key test passed | Test passed | Tested 2 minutes ago, all good | Time plus outcome. |
| 21 | Key test failed | Test failed | Couldn't reach Poe. Check your key, then try again. | Cause + fix. |
| 22 | Delete profile | Delete? | Delete "Studio OpenAI key"? 3 projects use it and will show "needs setup" until you pick another. | Consequence with a number. |
| 23 | Delete confirm button | OK | Delete anyway | Existing XRCC pattern. |
| 24 | First project launched | (none) | Your first scene is live. Take a look around. | Small first-success moment, shown once. |
| 25 | Offline / no network | (none) | You're offline. Your projects still open, but downloads wait. | Calm, factual. |

## Do not change
Strings for destructive, licence, credential and data-export dialogs keep the plain "what happens + next step" form (rules 3 and 4).
