const DB_NAME = 'zw_audio_cache';
const STORE_NAME = 'audio';
const DB_VERSION = 1;

// In-memory fallback if IndexedDB is unavailable
const memoryCache = new Map<string, Blob>();

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

function isIndexedDBAvailable(): boolean {
  try {
    return typeof indexedDB !== 'undefined';
  } catch {
    return false;
  }
}

export async function getCachedAudio(key: string): Promise<Blob | null> {
  // Try memory cache first
  const memHit = memoryCache.get(key);
  if (memHit) return memHit;

  if (!isIndexedDBAvailable()) return null;

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const request = store.get(key);
      request.onsuccess = () => resolve(request.result ?? null);
      request.onerror = () => resolve(null);
    });
  } catch {
    return null;
  }
}

export async function setCachedAudio(key: string, blob: Blob): Promise<void> {
  // Always store in memory cache
  memoryCache.set(key, blob);

  if (!isIndexedDBAvailable()) return;

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.put(blob, key);
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // Silently fail - memory cache is still available
  }
}

export async function clearAudioCache(): Promise<void> {
  memoryCache.clear();

  if (!isIndexedDBAvailable()) return;

  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      store.clear();
      tx.oncomplete = () => resolve();
      tx.onerror = () => resolve();
    });
  } catch {
    // Silently fail
  }
}
