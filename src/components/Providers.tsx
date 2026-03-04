'use client';

import { GameProvider } from '@/context/GameContext';
import { WorldProvider } from '@/context/WorldContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GameProvider>
      <WorldProvider>
        {children}
      </WorldProvider>
    </GameProvider>
  );
}
