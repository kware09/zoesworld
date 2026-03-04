'use client';

import { useCallback } from 'react';
import { useGame } from '@/context/GameContext';
import { GameType } from '@/lib/types';
import { GAMES_PER_SESSION } from '@/lib/constants';

export function useGameSession() {
  const { currentSession, startSession, completeGame, endSession, gamesRemainingInSession } = useGame();

  const isSessionActive = currentSession !== null && !currentSession.completed;
  const isSessionComplete = currentSession?.games.length === GAMES_PER_SESSION;

  const gamesPlayed = currentSession?.games.map(g => g.gameType) ?? [];

  // Check if a specific game has been played in this session
  const hasPlayedGame = useCallback((gameType: GameType) => {
    return gamesPlayed.includes(gameType);
  }, [gamesPlayed]);

  return {
    isSessionActive,
    isSessionComplete,
    gamesPlayed,
    gamesRemaining: gamesRemainingInSession,
    hasPlayedGame,
    startSession,
    completeGame,
    endSession,
  };
}
