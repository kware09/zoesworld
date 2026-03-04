'use client';

interface SessionTrackerProps {
  sessionsCompleted: number;
  target: number;
  rewardDescription: string;
  rewardClaimed: boolean;
}

export default function SessionTracker({
  sessionsCompleted,
  target,
  rewardDescription,
  rewardClaimed,
}: SessionTrackerProps) {
  const dots = Array.from({ length: target }, (_, i) => i < sessionsCompleted);
  const rewardUnlocked = sessionsCompleted >= target;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Dots row */}
      <div className="flex flex-wrap justify-center gap-2">
        {dots.map((filled, i) => (
          <div
            key={i}
            className={`h-8 w-8 rounded-full border-2 transition-colors ${
              filled
                ? 'border-star bg-star'
                : 'border-bark/20 bg-white'
            }`}
          />
        ))}
      </div>

      <p className="font-body text-sm text-bark-light">
        {sessionsCompleted}/{target} sessions completed
      </p>

      {/* Status message */}
      {rewardClaimed ? (
        <div className="rounded-2xl bg-meadow-light px-4 py-2 text-center font-body font-semibold text-bark">
          ✅ Reward claimed!
        </div>
      ) : rewardUnlocked ? (
        <div className="animate-slide-up rounded-2xl bg-star/20 px-4 py-3 text-center shadow-soft">
          <p className="font-display text-lg font-bold text-bark">
            🎉 Reward unlocked!
          </p>
          <p className="font-body text-sm text-bark-light">
            {rewardDescription}
          </p>
        </div>
      ) : null}
    </div>
  );
}
