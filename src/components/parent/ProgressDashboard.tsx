'use client';

import { useGame } from '@/context/GameContext';

const DIFFICULTY_LABELS: Record<number, string> = {
  1: 'Level 1 - CVC',
  2: 'Level 2 - Digraphs',
  3: 'Level 3 - Blends',
};

export default function ProgressDashboard() {
  const { player, mastery, effectiveDifficulty, availableStars } = useGame();

  const masteryEntries = Object.values(mastery);
  const masteredCount = masteryEntries.filter((w) => w.status === 'mastered').length;
  const practicedCount = masteryEntries.filter((w) => w.status === 'practiced').length;
  const learningCount = masteryEntries.filter((w) => w.status === 'learning').length;

  const stats = [
    { label: 'Sessions Completed', value: player.sessionsCompleted },
    { label: 'Total Stars', value: player.totalStars },
    { label: 'Stars Available', value: availableStars },
    { label: 'Difficulty', value: DIFFICULTY_LABELS[effectiveDifficulty] },
    { label: 'Words Mastered', value: masteredCount },
    { label: 'Words Practiced', value: practicedCount },
    { label: 'Words Learning', value: learningCount },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl bg-white shadow-soft p-4 text-center"
        >
          <p className="font-display text-xs text-bark-light mb-1">
            {stat.label}
          </p>
          <p className="font-display text-xl font-bold text-bark">
            {stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
