'use client';

import HomeButton from '@/components/layout/HomeButton';
import PageTransition from '@/components/layout/PageTransition';
import ProgressDashboard from '@/components/parent/ProgressDashboard';
import DifficultySelector from '@/components/parent/DifficultySelector';
import RewardConfig from '@/components/parent/RewardConfig';
import WordListManager from '@/components/parent/WordListManager';
import { useGame } from '@/context/GameContext';

export default function ParentPanel() {
  const { resetProgress } = useGame();

  const handleReset = () => {
    if (
      window.confirm(
        'Are you sure you want to reset all progress? This cannot be undone.'
      )
    ) {
      resetProgress();
    }
  };

  return (
    <PageTransition>
      <main className="min-h-screen bg-cream">
        {/* Header */}
        <header className="flex items-center justify-between px-4 py-4 border-b border-bark/10 bg-white">
          <HomeButton />
          <h1 className="font-display text-xl font-bold text-bark">
            Parent Panel
          </h1>
          <div className="w-[88px]" /> {/* spacer to center title */}
        </header>

        <div className="max-w-2xl mx-auto px-4 py-6 flex flex-col gap-8">
          {/* Progress Dashboard */}
          <section>
            <h2 className="font-display text-base font-bold text-bark mb-3">
              Progress Overview
            </h2>
            <ProgressDashboard />
          </section>

          <hr className="border-bark/10" />

          {/* Difficulty Settings */}
          <section>
            <h2 className="font-display text-base font-bold text-bark mb-3">
              Difficulty Settings
            </h2>
            <DifficultySelector />
          </section>

          <hr className="border-bark/10" />

          {/* Reward Settings */}
          <section>
            <h2 className="font-display text-base font-bold text-bark mb-3">
              Reward Settings
            </h2>
            <RewardConfig />
          </section>

          <hr className="border-bark/10" />

          {/* Word Progress */}
          <section>
            <h2 className="font-display text-base font-bold text-bark mb-3">
              Word Progress
            </h2>
            <WordListManager />
          </section>

          <hr className="border-bark/10" />

          {/* Reset */}
          <section className="pb-8">
            <button
              onClick={handleReset}
              className="w-full rounded-2xl border-2 border-red-300 bg-white px-4 py-3 font-display text-sm font-bold text-red-500 transition-colors hover:bg-red-50 active:scale-[0.98]"
            >
              Reset All Progress
            </button>
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
