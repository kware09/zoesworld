'use client';

import { useEffect } from 'react';

interface FeedbackOverlayProps {
  type: 'correct' | 'incorrect';
  message: string;
  onDismiss: () => void;
}

export default function FeedbackOverlay({
  type,
  message,
  onDismiss,
}: FeedbackOverlayProps) {
  useEffect(() => {
    const delay = type === 'correct' ? 1500 : 1000;
    const timeout = setTimeout(onDismiss, delay);
    return () => clearTimeout(timeout);
  }, [type, onDismiss]);

  const isCorrect = type === 'correct';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 animate-fade-in">
      <div
        className={`mx-4 flex flex-col items-center gap-3 rounded-2xl px-10 py-8 shadow-soft ${
          isCorrect ? 'bg-meadow-light' : 'bg-sunset-light'
        }`}
      >
        <span className="text-5xl" aria-hidden="true">
          {isCorrect ? '⭐' : '💪'}
        </span>
        <p className="text-center font-display text-xl font-semibold text-bark">
          {message}
        </p>
      </div>
    </div>
  );
}
