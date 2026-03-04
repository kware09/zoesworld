'use client';

import { useState, useCallback } from 'react';

/**
 * A generic typed localStorage hook.
 * Returns [value, setValue] similar to useState.
 * Initializes from localStorage, falls back to defaultValue.
 * Persists on every setValue call.
 * Handles SSR by checking typeof window.
 */
export function useLocalStorage<T>(
  key: string,
  defaultValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') {
      return defaultValue;
    }
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const nextValue =
          value instanceof Function ? value(prev) : value;
        if (typeof window !== 'undefined') {
          try {
            localStorage.setItem(key, JSON.stringify(nextValue));
          } catch {
            // Storage full or unavailable
          }
        }
        return nextValue;
      });
    },
    [key]
  );

  return [storedValue, setValue];
}
