import { useEffect } from 'react';
import { routeSyncEvent } from '../services/syncEventRouter.js';

export function useExternalSyncReceiver({ clientFactory, enabled = false }) {
  useEffect(() => {
    if (!enabled || !clientFactory) return undefined;

    const client = clientFactory({
      onEvent: routeSyncEvent,
    });

    client.connect();
    return () => client.disconnect();
  }, [clientFactory, enabled]);
}
