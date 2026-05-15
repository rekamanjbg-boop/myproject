import { normalizeReaperEvent } from './reaperSyncAdapter.js';

export function createOscBridgeClient({ url, onEvent, onStateChange }) {
  let socket;

  return {
    connect() {
      if (!url || typeof WebSocket === 'undefined') return;

      onStateChange?.('connecting');
      socket = new WebSocket(url);
      socket.addEventListener('open', () => onStateChange?.('online'));
      socket.addEventListener('close', () => onStateChange?.('offline'));
      socket.addEventListener('error', () => onStateChange?.('error'));
      socket.addEventListener('message', (message) => {
        try {
          onEvent?.(normalizeReaperEvent(JSON.parse(message.data)));
        } catch {
          onEvent?.(normalizeReaperEvent({ type: 'raw', payload: { data: message.data } }));
        }
      });
    },
    disconnect() {
      socket?.close();
      socket = undefined;
    },
    send(payload) {
      if (socket?.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify(payload));
      }
    },
  };
}
