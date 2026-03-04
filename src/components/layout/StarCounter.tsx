'use client';

import { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';

export default function StarCounter() {
  const { availableStars } = useGame();
  const [pulse, setPulse] = useState(false);
  const prevStars = useRef(availableStars);

  useEffect(() => {
    if (availableStars !== prevStars.current) {
      setPulse(true);
      prevStars.current = availableStars;
      const timeout = setTimeout(() => setPulse(false), 600);
      return () => clearTimeout(timeout);
    }
  }, [availableStars]);

  return (
    <div
      className={`inline-flex items-center gap-1.5 rounded-full bg-star/20 px-4 py-2 font-display text-bark transition-transform duration-300 ${
        pulse ? 'scale-110' : 'scale-100'
      }`}
    >
      <span aria-hidden="true">⭐</span>
      <span className="font-semibold">{availableStars}</span>
    </div>
  );
}
