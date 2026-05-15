# Mencari Taman - Show Sequencer

Frontend scaffold for live theater cue monitoring and synchronization, built with React, Vite, React Router, TailwindCSS, Framer Motion, Zustand, and Socket.IO client dependencies.

The web app is not the master playback engine. REAPER owns the master show timeline, audio playback, cue markers, and OSC/MIDI trigger source. This app is the operator dashboard, cue monitor, actor prompter, and realtime synchronization interface.

## Routes

- `/` - dashboard homepage
- `/operator` - main show control surface
- `/prompter` - fullscreen actor prompter
- `/timeline` - visual theatrical timeline
- `/cue/:cueId` - cue inspector
- `/settings` - production configuration
- `/rehearsal` - rehearsal mode

## Run

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## GitHub Pages

This app is configured for GitHub Pages deployment through `.github/workflows/pages.yml`.

1. Push the repository to GitHub.
2. In the GitHub repository, open **Settings > Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Push to `main` or `master`, or run the workflow manually.

The app uses hash routing so deep links work on GitHub Pages.

## Scaffold

The app is split by planned runtime responsibility:

- `src/components` holds reusable layout and cue/operator/prompter/timeline UI.
- `src/features` holds feature-level orchestration components and integration contracts.
- `src/store` holds small Zustand stores for cues, playback display state, timeline state, prompter state, and external sync state.
- `src/services` contains browser-side service adapters for future OSC bridge, websocket sync, REAPER event normalization, and Resolume integration.
- `src/data` contains mock production data.

## Integration Architecture

Planned external systems:

- REAPER: master timeline, audio playback, cue markers, OSC/MIDI triggers.
- Resolume Arena: videotron/media playback via a future bridge.
- Blender: cinematic asset generation outside the web runtime.

Prepared frontend modules:

- `src/features/websocket/syncProtocol.js` defines sync sources, event types, and transport states.
- `src/services/reaperSyncAdapter.js` normalizes future REAPER websocket/OSC bridge events.
- `src/services/oscBridgeClient.js` defines a browser websocket client for an OSC bridge.
- `src/services/websocketSyncClient.js` defines a Socket.IO sync client for local-network sync.
- `src/services/resolumeClient.js` defines the frontend contract for future Resolume bridge calls.
- `src/services/syncEventRouter.js` routes inbound sync events into Zustand stores.
- `src/store/syncStore.js` tracks master source, connection state, active REAPER marker, REAPER time, and Resolume status.

The frontend can receive sync events and update cue focus, prompter text, active marker, and timeline playhead, while REAPER remains the source of truth.
