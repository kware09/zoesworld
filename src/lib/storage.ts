import {
  PlayerState,
  Session,
  WordMastery,
  Decoration,
  ParentConfig,
} from './types';

// Storage keys
const STORAGE_KEYS = {
  PLAYER: 'zw_player',
  SESSIONS: 'zw_sessions',
  MASTERY: 'zw_mastery',
  DECORATIONS: 'zw_decorations',
  PARENT_CONFIG: 'zw_parent_config',
  CURRENT_SESSION: 'zw_current_session',
} as const;

export { STORAGE_KEYS };

// Type mapping for storage keys
export interface StorageMap {
  zw_player: PlayerState;
  zw_sessions: Session[];
  zw_mastery: Record<string, WordMastery>;
  zw_decorations: Decoration[];
  zw_parent_config: ParentConfig;
  zw_current_session: Session;
}

/**
 * Load a value: try the API first, fall back to localStorage.
 */
export async function loadState<T>(key: string, defaultValue: T): Promise<T> {
  if (typeof window === 'undefined') {
    return defaultValue;
  }

  // Try API first
  try {
    const res = await fetch(`/api/state/${key}`);
    if (res.ok) {
      const { value } = await res.json();
      if (value !== null && value !== undefined) {
        // Update localStorage cache
        localStorage.setItem(key, JSON.stringify(value));
        return value as T;
      }
    }
  } catch {
    // API unavailable, fall through to localStorage
  }

  // Fall back to localStorage
  try {
    const stored = localStorage.getItem(key);
    if (stored !== null) {
      return JSON.parse(stored) as T;
    }
  } catch {
    // ignore
  }

  return defaultValue;
}

// Debounce timers for API writes, keyed by storage key
const apiWriteTimers: Record<string, ReturnType<typeof setTimeout>> = {};
const API_WRITE_DELAY = 1000; // ms — batch rapid changes into one API call

/**
 * Save a value: write to localStorage immediately, debounce the API write.
 */
export function saveState<T>(key: string, value: T): void {
  if (typeof window === 'undefined') {
    return;
  }

  // Immediate localStorage write (fast, synchronous)
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or unavailable
  }

  // Debounced API write — avoids flooding the server during rapid state changes
  clearTimeout(apiWriteTimers[key]);
  apiWriteTimers[key] = setTimeout(() => {
    fetch(`/api/state/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value }),
    }).catch(() => {
      // API unavailable - data is still in localStorage
    });
  }, API_WRITE_DELAY);
}

/**
 * Clear all Zoe's World data from both localStorage and API.
 */
export function clearAll(): void {
  if (typeof window === 'undefined') {
    return;
  }
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
    fetch(`/api/state/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: null }),
    }).catch(() => {});
  });
}
