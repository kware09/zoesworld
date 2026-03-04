interface PhonemeDisplayProps {
  phonemes: string[];
  highlightIndex?: number;
}

export default function PhonemeDisplay({
  phonemes,
  highlightIndex,
}: PhonemeDisplayProps) {
  return (
    <div className="flex items-center gap-2 font-display text-2xl sm:text-3xl">
      {phonemes.map((phoneme, index) => (
        <span key={index} className="flex items-center gap-2">
          {index > 0 && (
            <span className="text-bark-light" aria-hidden="true">
              -
            </span>
          )}
          <span
            className={`rounded-full px-4 py-2 font-semibold ${
              index === highlightIndex
                ? 'bg-sky text-bark'
                : 'bg-sky-light text-bark'
            }`}
          >
            {phoneme}
          </span>
        </span>
      ))}
    </div>
  );
}
