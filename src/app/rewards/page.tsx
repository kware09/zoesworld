'use client';

import { useGame } from '@/context/GameContext';
import { useWorld } from '@/context/WorldContext';
import HomeButton from '@/components/layout/HomeButton';
import StarCounter from '@/components/layout/StarCounter';
import PageTransition from '@/components/layout/PageTransition';
import StarProgress from '@/components/rewards/StarProgress';
import SessionTracker from '@/components/rewards/SessionTracker';
import { STAR_COST_DECORATION, STAR_COST_ANIMAL } from '@/lib/constants';

export default function RewardsPage() {
  const { player, parentConfig, availableStars } = useGame();
  const { unlockedDecorations } = useWorld();

  return (
    <PageTransition>
      <main className="min-h-screen bg-cream p-4 pb-12">
        {/* Header */}
        <header className="mb-6 flex items-center justify-between">
          <HomeButton />
          <h1 className="font-display text-2xl font-bold text-bark">
            My Rewards
          </h1>
          <StarCounter />
        </header>

        <div className="mx-auto flex max-w-lg flex-col gap-6">
          {/* Star Collection */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="mb-4 font-display text-lg font-bold text-bark">
              Star Collection
            </h2>
            <div className="flex items-center justify-center gap-3 py-4">
              <span className="text-5xl">⭐</span>
              <div className="text-center">
                <p className="font-display text-3xl font-bold text-bark">
                  {player.totalStars}
                </p>
                <p className="font-body text-sm text-bark-light">
                  total stars earned
                </p>
              </div>
            </div>
            <p className="text-center font-body text-sm text-bark-light">
              {availableStars} stars available to spend
            </p>
          </section>

          {/* Progress Toward Next Items */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="mb-4 font-display text-lg font-bold text-bark">
              Next Milestones
            </h2>
            <div className="flex flex-col gap-4">
              <StarProgress
                totalStars={availableStars}
                nextMilestone={STAR_COST_DECORATION}
                label="Next decoration"
              />
              <StarProgress
                totalStars={availableStars}
                nextMilestone={STAR_COST_ANIMAL}
                label="Next animal friend"
              />
            </div>
          </section>

          {/* Divider */}
          <hr className="border-bark/10" />

          {/* Session Progress */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="mb-4 font-display text-lg font-bold text-bark">
              Session Progress
            </h2>
            <SessionTracker
              sessionsCompleted={player.sessionsCompleted}
              target={parentConfig.rewardSessionTarget}
              rewardDescription={parentConfig.rewardDescription}
              rewardClaimed={parentConfig.rewardClaimed}
            />
          </section>

          {/* Divider */}
          <hr className="border-bark/10" />

          {/* Unlocked Decorations */}
          <section className="rounded-2xl bg-white p-6 shadow-soft">
            <h2 className="mb-4 font-display text-lg font-bold text-bark">
              My Collection
            </h2>
            {unlockedDecorations.length > 0 ? (
              <div className="grid grid-cols-5 gap-3 sm:grid-cols-7">
                {unlockedDecorations.map((d) => (
                  <div
                    key={d.id}
                    className="flex flex-col items-center gap-1"
                    title={d.name}
                  >
                    <span className="text-3xl">{d.emoji}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center font-body text-sm text-bark-light">
                No decorations yet. Earn stars and visit the shop!
              </p>
            )}
          </section>
        </div>
      </main>
    </PageTransition>
  );
}
