'use client';

import { useGame } from '@/context/GameContext';

export default function RewardConfig() {
  const { parentConfig, updateParentConfig } = useGame();

  return (
    <div className="flex flex-col gap-5">
      {/* Sessions for reward */}
      <div>
        <label className="block font-display text-sm text-bark-light mb-2">
          Sessions for reward
        </label>
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              updateParentConfig({
                rewardSessionTarget: Math.max(1, parentConfig.rewardSessionTarget - 1),
              })
            }
            className="rounded-2xl bg-white border-2 border-bark/20 w-12 h-12 font-display text-lg font-bold text-bark transition-colors hover:bg-bark/5 active:scale-95"
          >
            -
          </button>
          <span className="font-display text-2xl font-bold text-bark w-12 text-center">
            {parentConfig.rewardSessionTarget}
          </span>
          <button
            onClick={() =>
              updateParentConfig({
                rewardSessionTarget: Math.min(20, parentConfig.rewardSessionTarget + 1),
              })
            }
            className="rounded-2xl bg-white border-2 border-bark/20 w-12 h-12 font-display text-lg font-bold text-bark transition-colors hover:bg-bark/5 active:scale-95"
          >
            +
          </button>
        </div>
      </div>

      {/* Reward description */}
      <div>
        <label className="block font-display text-sm text-bark-light mb-2">
          Reward description
        </label>
        <input
          type="text"
          value={parentConfig.rewardDescription}
          onChange={(e) =>
            updateParentConfig({ rewardDescription: e.target.value })
          }
          className="w-full rounded-2xl bg-white border-2 border-bark/20 px-4 py-3 font-body text-sm text-bark focus:outline-none focus:border-sky transition-colors"
          placeholder="e.g. Special treat, trip to the park..."
        />
      </div>

      {/* Reward claimed toggle */}
      <div className="flex items-center justify-between rounded-2xl bg-white border-2 border-bark/20 px-4 py-3">
        <span className="font-display text-sm text-bark-light">
          Reward claimed
        </span>
        <button
          onClick={() =>
            updateParentConfig({ rewardClaimed: !parentConfig.rewardClaimed })
          }
          className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${
            parentConfig.rewardClaimed ? 'bg-meadow' : 'bg-bark/20'
          }`}
          role="switch"
          aria-checked={parentConfig.rewardClaimed}
        >
          <span
            className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
              parentConfig.rewardClaimed ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>
    </div>
  );
}
