'use client';

interface AnswerOptionProps {
  word: string;
  emoji?: string;
  onClick: () => void;
  state: 'default' | 'correct' | 'incorrect';
}

export default function AnswerOption({ word, emoji, onClick, state }: AnswerOptionProps) {
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

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseClasses} ${stateClasses[state]} ${emoji ? 'flex-col gap-1 py-3' : ''}`}
    >
      {emoji && <span className="text-5xl leading-none">{emoji}</span>}
      <span className={emoji ? 'text-lg' : 'text-2xl'}>{word}</span>
    </button>
  );
}
