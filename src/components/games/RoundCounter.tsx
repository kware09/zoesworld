interface RoundCounterProps {
  current: number;
  total: number;
}

export default function RoundCounter({ current, total }: RoundCounterProps) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={`inline-block h-3 w-3 rounded-full ${
            i < current ? 'bg-star' : 'bg-bark/20'
          }`}
          aria-label={i < current ? `Round ${i + 1} completed` : `Round ${i + 1} remaining`}
        />
      ))}
    </div>
  );
}
