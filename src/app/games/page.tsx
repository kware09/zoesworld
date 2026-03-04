'use client';

import { useGame } from '@/context/GameContext';
import type { GameType } from '@/lib/types';
import { GAME_INFO, GAMES_PER_SESSION } from '@/lib/constants';
import GameTile from '@/components/games/GameTile';
import HomeButton from '@/components/layout/HomeButton';
import StarCounter from '@/components/layout/StarCounter';
import PageTransition from '@/components/layout/PageTransition';

const GAME_TYPES: { type: GameType; href: string }[] = [
  { type: 'robot-talk', href: '/games/robot-talk' },
  { type: 'sound-ninja', href: '/games/sound-ninja' },
  { type: 'word-explorer', href: '/games/word-explorer' },
];

export default function GameSelection() {
  const { currentSession, gamesRemainingInSession } = useGame();

  return (
    <PageTransition>
      <main className="flex min-h-screen flex-col bg-cream px-4 pb-8">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <HomeButton />
          <StarCounter />
        </div>

        {/* Title */}
        <h1 className="mb-2 text-center font-display text-3xl font-bold text-bark md:text-4xl">
          Choose a Game
        </h1>

        {/* Session progress indicator */}
        {currentSession && (
          <p className="mb-4 text-center text-sm text-bark-light">
            {gamesRemainingInSession} game{gamesRemainingInSession !== 1 ? 's' : ''} remaining this session
          </p>
        )}

        {/* Game tiles */}
        <div className="mx-auto mt-4 flex w-full max-w-lg flex-col gap-4">
          {GAME_TYPES.map(({ type, href }) => (
            <GameTile key={type} gameType={type} href={href} />
          ))}
        </div>
      </main>
    </PageTransition>
  );
}
