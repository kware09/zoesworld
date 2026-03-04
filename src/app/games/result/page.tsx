'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useGame } from '@/context/GameContext';
import { GAME_INFO } from '@/lib/constants';
import type { GameType } from '@/lib/types';
import PageTransition from '@/components/layout/PageTransition';
import StarEarnedAnimation from '@/components/result/StarEarnedAnimation';
import EncouragementMessage from '@/components/result/EncouragementMessage';

function GameResultContent() {
  const searchParams = useSearchParams();
  const gameType = searchParams.get('game') as GameType | null;
  const { availableStars, gamesRemainingInSession, endSession } = useGame();

  const gameInfo = gameType ? GAME_INFO[gameType] : null;
  const sessionEnded = useRef(false);

  // Auto-end session when no games remaining
  useEffect(() => {
    if (gamesRemainingInSession === 0 && !sessionEnded.current) {
      sessionEnded.current = true;
      endSession();
    }
  }, [gamesRemainingInSession, endSession]);

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col items-center justify-center bg-cream p-8 animate-fade-in">
        {/* Star animation */}
        <StarEarnedAnimation />

        {/* Game character */}
        {gameInfo && (
          <div className="mt-6">
            <span className="text-6xl" role="img" aria-label={gameInfo.title}>
              {gameInfo.emoji}
            </span>
          </div>
        )}

        {/* Encouragement */}
        <div className="mt-6">
          <EncouragementMessage />
        </div>

        {/* Star count */}
        <div className="mt-8 flex items-center gap-2 rounded-2xl bg-star-light/30 px-6 py-3">
          <span className="text-2xl" aria-hidden="true">
            ⭐
          </span>
          <span className="font-display text-2xl font-bold text-bark">
            {availableStars} {availableStars === 1 ? 'star' : 'stars'}
          </span>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col items-center gap-4">
          {gamesRemainingInSession > 0 ? (
            <>
              <Link
                href="/games"
                className="touch-target rounded-2xl bg-sky px-8 py-4 font-display text-xl text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
              >
                Play Another Game
              </Link>
              <Link
                href="/"
                className="touch-target rounded-2xl bg-white/80 px-8 py-4 font-display text-lg text-bark shadow-soft transition-transform hover:scale-105 active:scale-95"
              >
                Go Home
              </Link>
            </>
          ) : (
            <>
              <p className="font-display text-2xl font-bold text-meadow">
                Session Complete! 🎉
              </p>
              <Link
                href="/decorate"
                className="touch-target rounded-2xl bg-lavender px-8 py-4 font-display text-xl text-white shadow-soft transition-transform hover:scale-105 active:scale-95"
              >
                Decorate My World
              </Link>
              <Link
                href="/"
                className="touch-target rounded-2xl bg-white/80 px-8 py-4 font-display text-lg text-bark shadow-soft transition-transform hover:scale-105 active:scale-95"
              >
                Go Home
              </Link>
            </>
          )}
        </div>
      </main>
    </PageTransition>
  );
}

export default function GameResultPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-cream">
          <span className="text-5xl animate-pulse">⭐</span>
        </main>
      }
    >
      <GameResultContent />
    </Suspense>
  );
}
