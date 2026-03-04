'use client';

import { useProfile } from '@/context/ProfileContext';

interface ProfilePickerProps {
  onClose: () => void;
}

export default function ProfilePicker({ onClose }: ProfilePickerProps) {
  const { profiles, activeProfile, switchProfile } = useProfile();

  const handleSelect = (id: string) => {
    switchProfile(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-bark/30 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-soft">
        <h2 className="mb-4 text-center font-display text-xl font-bold text-bark">
          Who&apos;s playing?
        </h2>

        <div className="flex flex-col gap-3">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => handleSelect(profile.id)}
              className={`flex min-h-[80px] items-center gap-4 rounded-2xl px-6 py-4 transition-transform hover:scale-[1.02] active:scale-[0.98] ${
                profile.id === activeProfile.id
                  ? 'bg-sky-light ring-2 ring-sky-dark'
                  : 'bg-cream'
              }`}
            >
              <span className="text-4xl">{profile.emoji}</span>
              <span className="font-display text-xl font-semibold text-bark">
                {profile.name}
              </span>
              {profile.id === activeProfile.id && (
                <span className="ml-auto text-sm text-bark/60">Playing</span>
              )}
            </button>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-4 w-full rounded-2xl bg-bark/10 px-4 py-3 font-display text-sm font-semibold text-bark transition-colors hover:bg-bark/20"
        >
          Close
        </button>
      </div>
    </div>
  );
}
