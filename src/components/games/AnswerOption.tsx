'use client';

import { useState } from 'react';

interface AnswerOptionProps {
  word: string;
  imageSrc?: string;
  onClick: () => void;
  state: 'default' | 'correct' | 'incorrect';
}

export default function AnswerOption({ word, imageSrc, onClick, state }: AnswerOptionProps) {
  const [imgError, setImgError] = useState(false);

  const baseClasses =
    'touch-target flex items-center justify-center rounded-2xl px-6 py-4 font-display font-semibold text-bark transition-transform cursor-pointer select-none';

  const stateClasses: Record<typeof state, string> = {
    default:
      'bg-white shadow-soft border-2 border-transparent hover:scale-105 active:scale-95',
    correct:
      'bg-meadow-light border-2 border-meadow animate-star-burst shadow-soft',
    incorrect:
      'bg-white shadow-soft border-2 border-transparent animate-gentle-shake',
  };

  const hasImage = imageSrc && !imgError;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={word}
      className={`${baseClasses} ${stateClasses[state]} ${hasImage ? 'flex-col gap-1 py-3' : ''}`}
    >
      {hasImage ? (
        <img
          src={imageSrc}
          alt={word}
          className="w-20 h-20 object-contain"
          draggable={false}
          onError={() => setImgError(true)}
        />
      ) : (
        <span className="text-2xl">{word}</span>
      )}
    </button>
  );
}
