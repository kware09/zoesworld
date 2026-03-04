'use client';

import type { ReactNode } from 'react';
import HomeButton from '@/components/layout/HomeButton';
import StarCounter from '@/components/layout/StarCounter';
import RoundCounter from '@/components/games/RoundCounter';

const CHARACTER_EMOJIS: Record<string, string> = {
  robot: '🤖',
  ninja: '🥷',
  explorer: '🗺️',
};

interface GameShellProps {
  character: 'robot' | 'ninja' | 'explorer';
  currentRound: number;
  totalRounds: number;
  promptArea: ReactNode;
  answerArea: ReactNode;
  onPlaySound?: () => void;
}

export default function GameShell({
  character,
  currentRound,
  totalRounds,
  promptArea,
  answerArea,
  onPlaySound,
}: GameShellProps) {
  return (
    <div className="flex min-h-screen flex-col p-4 sm:p-8">
      {/* Header */}
      <header className="flex items-center justify-between">
        <HomeButton />
        <RoundCounter current={currentRound} total={totalRounds} />
        <StarCounter />
      </header>

      {/* Character */}
      <div className="mt-6 flex justify-center">
        <span className="text-7xl" role="img" aria-label={character}>
          {CHARACTER_EMOJIS[character]}
        </span>
      </div>

      {/* Prompt area */}
      <div className="mt-6 flex justify-center">{promptArea}</div>

      {/* Answer area */}
      <div className="mt-6 flex flex-1 items-start justify-center">
        {answerArea}
      </div>

      {/* Hear Again button */}
      {onPlaySound && (
        <div className="mt-4 flex justify-center pb-4">
          <button
            type="button"
            onClick={onPlaySound}
            className="touch-target inline-flex items-center gap-2 rounded-2xl bg-sky-light px-6 py-3 font-display text-bark shadow-soft transition-transform hover:scale-105 active:scale-95"
          >
            <span aria-hidden="true">🔊</span>
            Hear Again
          </button>
        </div>
      )}
    </div>
  );
}
