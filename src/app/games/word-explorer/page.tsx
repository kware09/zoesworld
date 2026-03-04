'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import PageTransition from '@/components/layout/PageTransition';
import WordExplorerGame from '@/components/games/word-explorer/WordExplorerGame';

export default function WordExplorerPage() {
  const { currentSession, startSession } = useGame();

  useEffect(() => {
    if (!currentSession) {
      startSession();
    }
  }, [currentSession, startSession]);

  return (
    <PageTransition>
      <WordExplorerGame />
    </PageTransition>
  );
}
