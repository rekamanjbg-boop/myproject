import { io } from 'socket.io-client';
import { normalizeReaperEvent } from './reaperSyncAdapter.js';

export function createWebsocketSyncClient({ url, onEvent, onStateChange }) {
  let client;

  return {
    connect() {
      if (!url) return;

      onStateChange?.('connecting');
      client = io(url, {
        autoConnect: true,
        transports: ['websocket'],
      });

      client.on('connect', () => onStateChange?.('online'));
      client.on('disconnect', () => onStateChange?.('offline'));
      client.on('connect_error', () => onStateChange?.('error'));
      client.on('reaper:event', (event) => onEvent?.(normalizeReaperEvent(event)));
      client.on('sync:event', (event) => onEvent?.(event));
    },
    disconnect() {
      client?.disconnect();
      client = undefined;
    },
    emit(eventName, payload) {
      client?.emit(eventName, payload);
    },
  };
}
