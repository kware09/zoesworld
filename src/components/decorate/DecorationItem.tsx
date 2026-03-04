'use client';

import type { Decoration } from '@/lib/types';

interface DecorationItemProps {
  decoration: Decoration;
  onPurchase: (id: string) => void;
  canAfford: boolean;
}

export default function DecorationItem({
  decoration,
  onPurchase,
  canAfford,
}: DecorationItemProps) {
  const isUnlocked = decoration.unlocked;
  const isTappable = !isUnlocked && canAfford;

  return (
    <button
      type="button"
      onClick={() => isTappable && onPurchase(decoration.id)}
      disabled={!isTappable}
      className={`flex min-h-[100px] flex-col items-center justify-center gap-2 rounded-2xl p-4 transition-transform ${
        isUnlocked
          ? 'bg-meadow-light'
          : canAfford
            ? 'bg-white shadow-soft hover:scale-105 active:scale-95'
            : 'bg-white/50 opacity-60'
      }`}
    >
      <span className="text-4xl" aria-hidden="true">
        {decoration.emoji}
      </span>
      <span className="font-body text-sm font-semibold text-bark">
        {decoration.name}
      </span>
      {isUnlocked ? (
        <span className="rounded-full bg-meadow px-3 py-0.5 text-xs font-bold text-white">
          Owned!
        </span>
      ) : (
        <span
          className={`rounded-full px-3 py-0.5 text-xs font-bold ${
            canAfford
              ? 'bg-star/20 text-bark'
              : 'bg-bark/10 text-bark-light'
          }`}
        >
          ⭐ {decoration.cost}
        </span>
      )}
    </button>
  );
}
