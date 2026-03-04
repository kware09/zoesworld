'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import type { Decoration } from '@/lib/types';
import { DEFAULT_DECORATIONS } from '@/lib/constants';
import { loadState, saveState, type ProfileKeys } from '@/lib/storage';
import { useGame } from '@/context/GameContext';

// --- Context interface ---

interface WorldContextValue {
  decorations: Decoration[];
  purchaseDecoration: (id: string) => boolean;
  unlockedDecorations: Decoration[];
  lockedDecorations: Decoration[];
}

const WorldContext = createContext<WorldContextValue | null>(null);

export function useWorld(): WorldContextValue {
  const context = useContext(WorldContext);
  if (!context) {
    throw new Error('useWorld must be used within a WorldProvider');
  }
  return context;
}

function initializeDecorations(): Decoration[] {
  return DEFAULT_DECORATIONS.map((d) => ({
    ...d,
    unlocked: false,
    placed: false,
  }));
}

export function WorldProvider({ children, profileKeys }: { children: React.ReactNode; profileKeys: ProfileKeys }) {
  const { spendStars } = useGame();
  const [decorations, setDecorations] = useState<Decoration[]>(() =>
    initializeDecorations()
  );
  const [hydrated, setHydrated] = useState(false);

  // Load decorations from API/localStorage on mount
  useEffect(() => {
    async function hydrate() {
      const saved = await loadState<Decoration[]>(
        profileKeys.DECORATIONS,
        initializeDecorations()
      );
      setDecorations(saved);
      setHydrated(true);
    }
    hydrate();
  }, []);

  // Persist decorations when they change
  useEffect(() => {
    if (!hydrated) return;
    saveState(profileKeys.DECORATIONS, decorations);
  }, [decorations, hydrated, profileKeys]);

  // Purchase a decoration by id. Returns false if the player cannot afford it.
  const purchaseDecoration = useCallback(
    (id: string): boolean => {
      const decoration = decorations.find((d) => d.id === id);
      if (!decoration || decoration.unlocked) return false;

      const success = spendStars(decoration.cost);
      if (!success) return false;

      setDecorations((prev) =>
        prev.map((d) =>
          d.id === id ? { ...d, unlocked: true } : d
        )
      );
      return true;
    },
    [decorations, spendStars]
  );

  const unlockedDecorations = useMemo(
    () => decorations.filter((d) => d.unlocked),
    [decorations]
  );

  const lockedDecorations = useMemo(
    () => decorations.filter((d) => !d.unlocked),
    [decorations]
  );

  const value: WorldContextValue = useMemo(
    () => ({
      decorations,
      purchaseDecoration,
      unlockedDecorations,
      lockedDecorations,
    }),
    [decorations, purchaseDecoration, unlockedDecorations, lockedDecorations]
  );

  return (
    <WorldContext.Provider value={value}>
      {children}
    </WorldContext.Provider>
  );
}
