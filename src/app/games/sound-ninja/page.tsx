'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import PageTransition from '@/components/layout/PageTransition';
import SoundNinjaGame from '@/components/games/sound-ninja/SoundNinjaGame';

export default function SoundNinjaPage() {
  const { currentSession, startSession } = useGame();

  useEffect(() => {
    if (!currentSession) {
      startSession();
    }
  }, [currentSession, startSession]);

  return (
    <PageTransition>
      <SoundNinjaGame />
    </PageTransition>
  );
}
