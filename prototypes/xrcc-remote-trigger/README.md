# XRCC Remote Trigger web prototype

Single-file, dependency-free prototype that mirrors the Figma flow (Workbench page "XRCC Remote Trigger").
Open `index.html` in a browser. It is responsive: phone view fills the screen on narrow widths, and editor and phone sit side by side on wide screens.

- **1 · Editor**: drag or click variables onto the deck, tune labels, see issues. Dial, stepper and vector keys work live against the scene preview.
- **2 · Play & Launcher**: Start Play to get a 6-digit code, QR, local and public link (confirm dialog), joined phones and a Play console log.
- **3 · Phone**: join with the code, pick a project, press keys, drag dials (others dim), colour sheet, network drop, stale deck refresh, Play ended, landscape.

State is shared across tabs of the same browser (BroadcastChannel), so a second tab acts as a real phone.
The QR is decorative. Behaviour, timings and the access-code login are assumptions, see the Figma Overview.
