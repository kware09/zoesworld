'use client';

import Link from 'next/link';
import type { GameType } from '@/lib/types';
import { GAME_INFO } from '@/lib/constants';

interface GameTileProps {
  gameType: GameType;
  href: string;
}

const COLOR_BG: Record<string, string> = {
  sky: 'bg-sky-light',
  lavender: 'bg-lavender-light',
  meadow: 'bg-meadow-light',
};

export default function GameTile({ gameType, href }: GameTileProps) {
  const info = GAME_INFO[gameType];
  const bgClass = COLOR_BG[info.color] ?? 'bg-sky-light';

  return (
    <Link
      href={href}
      className={`flex min-h-[120px] items-center gap-4 rounded-2xl p-6 shadow-soft transition-transform hover:scale-105 active:scale-95 ${bgClass}`}
    >
      <span className="text-5xl" aria-hidden="true">
        {info.emoji}
      </span>
      <div className="flex flex-col">
        <span className="font-display text-xl font-semibold text-bark">
          {info.title}
        </span>
        <span className="text-sm text-bark-light">{info.description}</span>
      </div>
    </Link>
  );
}
