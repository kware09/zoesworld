'use client';

import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { GameProvider } from '@/context/GameContext';
import { WorldProvider } from '@/context/WorldContext';

function ProfileKeyedProviders({ children }: { children: React.ReactNode }) {
  const { activeProfile, profileKeys, isLoaded } = useProfile();

  if (!isLoaded) {
    return null;
  }

  return (
    <GameProvider key={activeProfile.id} profileKeys={profileKeys}>
      <WorldProvider key={activeProfile.id} profileKeys={profileKeys}>
        {children}
      </WorldProvider>
    </GameProvider>
  );
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ProfileProvider>
      <ProfileKeyedProviders>
        {children}
      </ProfileKeyedProviders>
    </ProfileProvider>
  );
}
