# Voyage 360 · Loading Enhancement (interactive prototype)

Open `index.html` in a browser (no build step). Fixed 1920x1080 stage, scaled to fit the window.
Source: Figma node 1233:2277 (XRCC Claude Workbench).

Logic: styles.css + app.js. Scenes actually load one by one (about 1 s each); counts, pill, card, footer and the Play/Save lock follow that state.

Keys: in S2 press F (first scene fails). In the editor press F (asset fails), N (network lost), A (all scenes ready).
