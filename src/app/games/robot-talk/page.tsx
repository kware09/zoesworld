'use client';

import { useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import PageTransition from '@/components/layout/PageTransition';
import RobotTalkGame from '@/components/games/robot-talk/RobotTalkGame';

export default function RobotTalkPage() {
  const { currentSession, startSession } = useGame();

  useEffect(() => {
    if (!currentSession) {
      startSession();
    }
  }, [currentSession, startSession]);

  return (
    <PageTransition>
      <RobotTalkGame />
    </PageTransition>
  );
}
