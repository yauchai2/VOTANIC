# XRCC AI Provider · interactive prototype

[Open the web prototype](https://htmlpreview.github.io/?https://github.com/yauchai2/VOTANIC/blob/prototype/xrcc-ai-provider/prototypes/xrcc-ai-provider/index.html)

This is the permanent preview address. Publish verified prototype updates to the `prototype/xrcc-ai-provider` branch and keep this path unchanged.

This web prototype follows the [XRCC AI Provider flow in Figma](https://www.figma.com/design/ZBOB48n4eLsZABCTnhh5kk/?node-id=1354-2549) using the existing HTML, CSS and JavaScript. Figma artwork and the Roboto font are bundled locally. No build step or external service is required.

Serve the prototype from this directory and open http://localhost:8080:

```sh
python3 -m http.server 8080
```

- Use the sparkle button to go through first-time setup. **Configured project** loads the Models, Providers, Voices and Sessions examples.
- Try **Gate: no keys** to add a key and return to the same project's connection check. **Launcher keys** opens Launcher Connections, including Remote control, AI keys and Wit.ai.
- **Settings Connections** opens the XRCC overview with a sample connected device. **Manage devices** opens Launcher. Use **Back to XRCC** to return to the overview. The retention selector and remote server/link controls use demo state.
- **Voices failed** opens the preset form in its recovery state. Use **Try again** to reload the list without losing the draft.
- The sample Poe key accepts `xrcc`. Key entry, connection tests, voice preview, and launching XRCC simulate the workflow with in-memory data.
