'use client';

import { useGame } from '@/context/GameContext';
import type { WordMastery } from '@/lib/types';

const STATUS_CONFIG: Record<
  WordMastery['status'],
  { label: string; icon: string; pillClass: string }
> = {
  mastered: {
    label: 'Mastered',
    icon: '\u2B50',
    pillClass: 'bg-star/20 text-bark',
  },
  practiced: {
    label: 'Practiced',
    icon: '\u2705',
    pillClass: 'bg-meadow/20 text-bark',
  },
  learning: {
    label: 'Learning',
    icon: '\uD83D\uDCD6',
    pillClass: 'bg-sky/20 text-bark',
  },
  new: {
    label: 'New',
    icon: '\uD83C\uDD95',
    pillClass: 'bg-bark/10 text-bark',
  },
};

const STATUS_ORDER: WordMastery['status'][] = [
  'mastered',
  'practiced',
  'learning',
  'new',
];

export default function WordListManager() {
  const { mastery } = useGame();

  const words = Object.values(mastery);

  const grouped = STATUS_ORDER.map((status) => ({
    status,
    config: STATUS_CONFIG[status],
    words: words.filter((w) => w.status === status),
  })).filter((group) => group.words.length > 0);

  if (words.length === 0) {
    return (
      <p className="text-bark-light text-sm font-body text-center py-6">
        No words attempted yet. Start a session to begin tracking progress!
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-5">
      {grouped.map(({ status, config, words: groupWords }) => (
        <div key={status}>
          <h4 className="font-display text-sm font-bold text-bark mb-2">
            {config.icon} {config.label} ({groupWords.length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {groupWords.map((w) => (
              <span
                key={w.word}
                className={`inline-block rounded-full px-3 py-1 font-body text-xs font-semibold ${config.pillClass}`}
              >
                {w.word}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
