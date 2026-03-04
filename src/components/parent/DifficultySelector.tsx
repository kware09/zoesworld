'use client';

import { useGame } from '@/context/GameContext';
import type { DifficultyLevel } from '@/lib/types';

const LEVELS: { value: DifficultyLevel | null; label: string; description: string }[] = [
  { value: null, label: 'Auto', description: 'Adjusts automatically based on performance' },
  { value: 1, label: 'Stage 1', description: 'CVC Words (cat, dog, sun...)' },
  { value: 2, label: 'Stage 2', description: 'Initial Digraphs (ship, chat, thin...)' },
  { value: 3, label: 'Stage 3', description: 'Final Digraphs (duck, ring, fish...)' },
  { value: 4, label: 'Stage 4', description: 'Consonant Blends (frog, trap, spin...)' },
  { value: 5, label: 'Stage 5', description: 'Simple Sentences (The cat ran...)' },
];

export default function DifficultySelector() {
  const { player, setDifficultyOverride } = useGame();

  const currentOverride = player.parentDifficultyOverride;

  return (
    <div className="flex flex-col gap-3">
      {LEVELS.map((level) => {
        const isSelected = currentOverride === level.value;
        return (
          <button
            key={level.label}
            onClick={() => setDifficultyOverride(level.value)}
            className={`rounded-2xl px-5 py-4 text-left font-display transition-colors ${
              isSelected
                ? 'bg-sky text-white shadow-soft'
                : 'bg-white border-2 border-bark/20'
            }`}
            style={{ minHeight: 48 }}
          >
            <span className="block text-sm font-bold">{level.label}</span>
            <span
              className={`block text-xs mt-0.5 ${
                isSelected ? 'text-white/80' : 'text-bark-light'
              }`}
            >
              {level.description}
            </span>
          </button>
        );
      })}
    </div>
  );
}
