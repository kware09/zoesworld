'use client';

import { useProfile } from '@/context/ProfileContext';

interface ProfileAvatarProps {
  onClick: () => void;
}

export default function ProfileAvatar({ onClick }: ProfileAvatarProps) {
  const { activeProfile } = useProfile();

  return (
    <button
      onClick={onClick}
      className="flex min-h-[48px] items-center gap-2 rounded-2xl bg-white px-4 py-2 shadow-soft transition-transform hover:scale-[1.02] active:scale-[0.98]"
      aria-label={`Switch profile (current: ${activeProfile.name})`}
    >
      <span className="text-2xl">{activeProfile.emoji}</span>
      <span className="font-display text-sm font-semibold text-bark">
        {activeProfile.name}
      </span>
    </button>
  );
}
