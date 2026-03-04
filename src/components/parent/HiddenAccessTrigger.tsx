'use client';

import { useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function HiddenAccessTrigger() {
  const [tapCount, setTapCount] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const router = useRouter();

  const handleTap = useCallback(() => {
    setTapCount((prev) => {
      const next = prev + 1;

      if (next >= 5) {
        // Reset and navigate
        if (timerRef.current) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        router.push('/parent');
        return 0;
      }

      return next;
    });

    // Reset timer on each tap
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      setTapCount(0);
      timerRef.current = null;
    }, 3000);
  }, [router]);

  return (
    <div
      onClick={handleTap}
      className="fixed top-0 right-0 h-12 w-12"
      style={{ opacity: 0 }}
      aria-hidden="true"
    />
  );
}
