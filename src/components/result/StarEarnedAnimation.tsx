'use client';

import { useMemo } from 'react';
import { ENCOURAGEMENT_MESSAGES } from '@/lib/constants';

export default function StarEarnedAnimation() {
  const message = useMemo(
    () => ENCOURAGEMENT_MESSAGES[Math.floor(Math.random() * ENCOURAGEMENT_MESSAGES.length)],
    []
  );

  return (
    <div className="flex flex-col items-center gap-4">
      <span
        className="text-7xl animate-star-burst"
        role="img"
        aria-label="Star earned"
      >
        ⭐
      </span>
      <p className="font-display text-3xl font-bold text-bark text-center">
        {message}
      </p>
    </div>
  );
}
